package com.anjoryx.service;

import com.anjoryx.entity.ContactInquiry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Sends a notification email for each new contact inquiry.
 *
 * Email is treated as a best-effort side effect: if MAIL_* environment
 * variables aren't configured (app.mail.enabled=false), or if sending fails
 * for any reason, we log the enquiry instead of throwing — a contact
 * submission must never be lost or fail just because mail isn't set up yet.
 */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final boolean mailEnabled;
    private final String mailFrom;
    private final String mailTo;

    public EmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.mail.enabled:false}") boolean mailEnabled,
            @Value("${app.mail.from:no-reply@anjoryx.com}") String mailFrom,
            @Value("${app.mail.to:anjoryx.tech@gmail.com}") String mailTo
    ) {
        this.mailSenderProvider = mailSenderProvider;
        this.mailEnabled = mailEnabled;
        this.mailFrom = mailFrom;
        this.mailTo = mailTo;
    }

    public void sendContactNotification(ContactInquiry inquiry) {
        if (!mailEnabled) {
            log.info("[MAIL DISABLED] New contact inquiry received (id={}, email={}). "
                    + "Configure MAIL_HOST/MAIL_USERNAME/MAIL_PASSWORD to enable email notifications.",
                    inquiry.getId(), inquiry.getEmail());
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("app.mail.enabled=true but no JavaMailSender is configured (set MAIL_HOST). "
                    + "Inquiry id={} was saved but not emailed.", inquiry.getId());
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailFrom);
            message.setTo(mailTo);
            message.setSubject("New project enquiry — " + inquiry.getName());
            message.setText(buildBody(inquiry));
            mailSender.send(message);
            log.info("Contact notification email sent for inquiry id={}", inquiry.getId());
        } catch (MailException ex) {
            // Never let a mail failure surface to the caller — the enquiry
            // is already safely persisted in the database.
            log.error("Failed to send contact notification email for inquiry id={}: {}",
                    inquiry.getId(), ex.getMessage());
        }
    }

    private String buildBody(ContactInquiry inquiry) {
        return """
                New project enquiry received via anjoryx.com

                Name: %s
                Email: %s
                Phone: %s
                Company: %s
                Service: %s
                Budget: %s

                Message:
                %s
                """.formatted(
                inquiry.getName(),
                inquiry.getEmail(),
                nullToDash(inquiry.getPhone()),
                nullToDash(inquiry.getCompany()),
                nullToDash(inquiry.getService()),
                nullToDash(inquiry.getBudget()),
                inquiry.getMessage()
        );
    }

    private String nullToDash(String value) {
        return (value == null || value.isBlank()) ? "—" : value;
    }
}
