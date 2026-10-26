package com.anjoryx.entity;

/**
 * Lifecycle status of a contact inquiry, used by the (Phase 3) admin dashboard
 * to triage and track leads.
 */
public enum InquiryStatus {
    NEW,
    CONTACTED,
    IN_PROGRESS,
    CLOSED
}
