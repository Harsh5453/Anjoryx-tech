package com.anjoryx.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

/**
 * Lightweight, dependency-free rate limiter scoped to the public contact
 * endpoint, to reduce spam/abuse risk. Tracks request timestamps per client
 * IP in memory (a sliding window), which is sufficient for a single-instance
 * deployment. For multi-instance deployments, swap this for a shared store
 * (e.g. Redis + Bucket4j) — the filter boundary stays the same.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final String LIMITED_PATH = "/api/contact";

    private final int maxRequests;
    private final long windowMillis;

    private final ConcurrentHashMap<String, Deque<Long>> requestLog = new ConcurrentHashMap<>();
    private volatile long lastCleanup = System.currentTimeMillis();

    public RateLimitFilter(
            @Value("${app.rate-limit.contact.max-requests:5}") int maxRequests,
            @Value("${app.rate-limit.contact.window-minutes:10}") long windowMinutes
    ) {
        this.maxRequests = maxRequests;
        this.windowMillis = windowMinutes * 60_000L;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        if (!request.getRequestURI().startsWith(LIMITED_PATH) || !"POST".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(request, response);
            return;
        }

        evictStaleEntries();

        String clientIp = resolveClientIp(request);
        long now = Instant.now().toEpochMilli();

        Deque<Long> timestamps = requestLog.computeIfAbsent(clientIp, k -> new ConcurrentLinkedDeque<>());
        synchronized (timestamps) {
            while (!timestamps.isEmpty() && now - timestamps.peekFirst() > windowMillis) {
                timestamps.pollFirst();
            }
            if (timestamps.size() >= maxRequests) {
                response.setStatus(429);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                response.getWriter().write(
                    "{\"success\":false,\"message\":\"Too many requests. Please try again later.\",\"data\":null}"
                );

                return;
            }
            timestamps.addLast(now);
        }

        chain.doFilter(request, response);
    }

    /** Drops IPs whose whole window has expired so the in-memory map cannot grow without bound. */
    private void evictStaleEntries() {
        long now = Instant.now().toEpochMilli();
        if (now - lastCleanup < windowMillis) {
            return;
        }
        lastCleanup = now;
        requestLog.entrySet().removeIf(entry -> {
            Long newest = entry.getValue().peekLast();
            return newest == null || now - newest > windowMillis;
        });
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
