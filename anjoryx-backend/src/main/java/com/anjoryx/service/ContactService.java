package com.anjoryx.service;

import com.anjoryx.dto.ContactRequestDto;
import com.anjoryx.dto.ContactResponseDto;
import com.anjoryx.entity.ContactInquiry;
import com.anjoryx.repository.ContactInquiryRepository;
import com.anjoryx.util.InputSanitizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactInquiryRepository repository;
    private final EmailService emailService;

    public ContactService(ContactInquiryRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    /**
     * Persists a sanitised contact inquiry and fires a best-effort email
     * notification. The submission is considered successful as soon as it's
     * saved to the database — email delivery never affects this outcome.
     */
    @Transactional
    public ContactResponseDto submitInquiry(ContactRequestDto request) {
        ContactInquiry inquiry = ContactInquiry.builder()
                .name(InputSanitizer.clean(request.getName()))
                .email(InputSanitizer.clean(request.getEmail()))
                .phone(InputSanitizer.clean(request.getPhone()))
                .company(InputSanitizer.clean(request.getCompany()))
                .service(InputSanitizer.clean(request.getService()))
                .budget(InputSanitizer.clean(request.getBudget()))
                .message(InputSanitizer.clean(request.getMessage()))
                .build();

        ContactInquiry saved = repository.save(inquiry);
        log.info("Contact inquiry saved with id={}", saved.getId());

        emailService.sendContactNotification(saved);

        return ContactResponseDto.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .service(saved.getService())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}
