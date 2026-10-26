package com.anjoryx.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Value("${app.mail.to:anjoryx.tech@gmail.com}")
    private String contactEmail;

    @Bean
    public OpenAPI anjoryxOpenApi() {
        return new OpenAPI().info(new Info()
                .title("ANJORYX Technologies API")
                .description("REST API powering the ANJORYX Technologies website — "
                        + "contact form submissions and (from Phase 3) admin enquiry management.")
                .version("v1")
                .contact(new Contact().email(contactEmail)));
    }
}
