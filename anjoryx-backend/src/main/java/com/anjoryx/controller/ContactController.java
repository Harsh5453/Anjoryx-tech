package com.anjoryx.controller;

import com.anjoryx.dto.ApiResponse;
import com.anjoryx.dto.ContactRequestDto;
import com.anjoryx.dto.ContactResponseDto;
import com.anjoryx.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contact", description = "Public contact form submissions")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @Operation(summary = "Submit a project enquiry",
            description = "Validates, sanitises and persists a contact form submission, "
                    + "then sends a best-effort email notification to the ANJORYX team.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201", description = "Enquiry received"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400", description = "Validation failed"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "429", description = "Too many requests")
    })
    public ResponseEntity<ApiResponse<ContactResponseDto>> submitContactForm(
            @Valid @RequestBody ContactRequestDto request) {

        ContactResponseDto response = contactService.submitInquiry(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Thanks — we've received your enquiry and will be in touch soon.", response));
    }
}
