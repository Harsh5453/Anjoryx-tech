package com.anjoryx.dto;

import com.anjoryx.entity.InquiryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * What we return to the client after a successful submission.
 * Deliberately excludes internal-only fields (phone, company, budget) that
 * the caller doesn't need echoed back.
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponseDto {
    private Long id;
    private String name;
    private String email;
    private String service;
    private InquiryStatus status;
    private LocalDateTime createdAt;
}
