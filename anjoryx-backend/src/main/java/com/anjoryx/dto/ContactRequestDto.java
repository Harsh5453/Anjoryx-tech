package com.anjoryx.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload accepted by POST /api/contact.
 * Field-level validation enforces the "reasonable input" rules from the spec
 * before anything touches the service layer.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 120, message = "Name must be between 2 and 120 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 160)
    private String email;

    @Pattern(regexp = "^$|^[0-9+()\\-\\s]{6,20}$", message = "Please provide a valid phone number")
    private String phone;

    @Size(max = 160)
    private String company;

    @Size(max = 60)
    private String service;

    @Size(max = 60)
    private String budget;

    @NotBlank(message = "Please describe your project")
    @Size(min = 20, max = 5000, message = "Message must be between 20 and 5000 characters")
    private String message;
}
