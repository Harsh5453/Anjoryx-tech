package com.anjoryx.repository;

import com.anjoryx.entity.ContactInquiry;
import com.anjoryx.entity.InquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {

    // Used by the (Phase 3) admin dashboard to filter/search enquiries.
    Page<ContactInquiry> findByStatus(InquiryStatus status, Pageable pageable);

    Page<ContactInquiry> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String name, String email, Pageable pageable);
}
