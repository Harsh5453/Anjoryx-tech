# ANJORYX Technologies — Backend (Phase 2)

Spring Boot REST API backing the contact form. Phase 3 will add the admin
dashboard endpoints on top of this same service.

## Stack

Java 17 · Spring Boot 3.3 · Spring Web · Spring Data JPA · Spring Security ·
Spring Boot Mail · Bean Validation · MySQL · springdoc-openapi (Swagger UI) · Maven

## Folder structure

```
src/main/java/com/anjoryx/
├── controller/    ContactController — POST /api/contact
├── service/       ContactService (business logic), EmailService (best-effort mail)
├── repository/    ContactInquiryRepository (Spring Data JPA)
├── entity/        ContactInquiry, InquiryStatus
├── dto/           ContactRequestDto, ContactResponseDto, ApiResponse<T>
├── exception/      ApiException, GlobalExceptionHandler
├── config/        CorsConfig, SecurityConfig, OpenApiConfig
├── security/       RateLimitFilter (per-IP sliding window on /api/contact)
└── util/           InputSanitizer
```

## Local setup

### 1. MySQL

```sql
CREATE DATABASE anjoryx_db CHARACTER SET utf8mb4;
CREATE USER 'anjoryx_user'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL PRIVILEGES ON anjoryx_db.* TO 'anjoryx_user'@'localhost';
FLUSH PRIVILEGES;
```

Table creation is handled automatically by Hibernate (`DDL_AUTO=update`) on
first run — no manual schema migration needed for this phase.

### 2. Environment variables

Copy `.env.example` and export the values (or configure them in your IDE's
run configuration / your process manager). **Never commit real credentials.**

Minimum to run locally:
```
DB_URL=jdbc:mysql://localhost:3306/anjoryx_db?useSSL=false&serverTimezone=UTC
DB_USERNAME=anjoryx_user
DB_PASSWORD=change-me
```

Email is optional for local dev — leave `MAIL_ENABLED=false` (the default)
and submissions will be saved to MySQL and logged to the console instead of
emailed. Once you have real SMTP credentials, set:
```
MAIL_ENABLED=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-app-password
MAIL_FROM=no-reply@anjoryx.com
CONTACT_EMAIL=anjoryx.tech@gmail.com
```

### 3. Run

```bash
mvn spring-boot:run
```

API is available at `http://localhost:8080`.
Swagger UI: `http://localhost:8080/swagger-ui.html`
OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## API

### `POST /api/contact`

```json
{
  "name": "Jane Founder",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "company": "Example Startup",
  "service": "MVP",
  "budget": "₹15,000–₹50,000",
  "message": "We need an MVP built for our marketplace idea within the next two months."
}
```

Success → `201 Created`:
```json
{
  "success": true,
  "message": "Thanks — we've received your enquiry and will be in touch soon.",
  "data": { "id": 1, "name": "Jane Founder", "email": "jane@example.com", "service": "MVP", "status": "NEW", "createdAt": "..." },
  "timestamp": "..."
}
```

Validation error → `400 Bad Request` with a `data` object of field → message.
Rate limit exceeded → `429 Too Many Requests` (default: 5 requests / 10 minutes per IP).

## Testing the contact form end-to-end

1. Start MySQL and this backend (`mvn spring-boot:run`).
2. Start the frontend (`npm run dev` in `anjoryx-frontend`), with
   `VITE_API_BASE_URL=http://localhost:8080/api` in its `.env`.
3. Go to `http://localhost:5173/contact`, fill in the form, submit.
4. Confirm the row appears in `contact_inquiries` in MySQL, and check the
   backend console log for either a sent-email confirmation or the
   "[MAIL DISABLED]" log line.

## Security notes

- All secrets (DB, mail, future admin credentials) come from environment
  variables — nothing is hardcoded in source or committed to Git.
- CORS is restricted to the origins listed in `CORS_ALLOWED_ORIGINS`.
- The contact endpoint is rate-limited per IP (in-memory; swap for a shared
  store like Redis if you run multiple backend instances).
- Free-text fields are sanitised (HTML tags / control characters stripped)
  before being persisted or emailed.
- `SecurityConfig` already requires authentication on any endpoint outside
  `/api/contact` and the Swagger docs — Phase 3 will add the actual admin
  login flow.

## Deployment (Render/Railway/AWS-ready)

- Build a runnable jar: `mvn clean package` → `target/anjoryx-backend-0.1.0.jar`
- Set the same environment variables from `.env.example` in your host's
  dashboard (Render/Railway/AWS all support environment variable injection).
- Point `DB_URL`/`DB_USERNAME`/`DB_PASSWORD` at your managed MySQL instance.
- Set `CORS_ALLOWED_ORIGINS` to your deployed frontend's real domain.
