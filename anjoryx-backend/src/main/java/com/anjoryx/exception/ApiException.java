package com.anjoryx.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown deliberately by service/controller code for expected error cases
 * (e.g. rate limit exceeded) so GlobalExceptionHandler can map it to the
 * right HTTP status without leaking internals.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
