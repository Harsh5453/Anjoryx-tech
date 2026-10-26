package com.anjoryx;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/**
 * Smoke test confirming the application context loads with an in-memory
 * config profile (no real database required for this check to fail fast
 * on wiring mistakes — a real MySQL instance is still required to actually
 * run the app).
 */
@SpringBootTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;MODE=MySQL",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class AnjoryxApplicationTests {

    @Test
    void contextLoads() {
    }
}
