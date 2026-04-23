---
title: "Exception Handling & Error Design"
description: "Design clean, consistent, and production-ready error handling for payment APIs, including validation errors, idempotency conflicts, and system failures."
keywords:
  - exception handling spring boot
  - api error design backend
  - global exception handler
  - payment api error handling
weight: 6
layout: "topic-content"
---

## 1. Why This Article

---

So far, we implemented:

- Create Payment
- Confirm Payment
- Idempotency handling

But one critical aspect is still missing:

> ❗ **How does the system behave when something goes wrong?**

---

## 2. What This Article Focuses On

---

We are NOT re-explaining:

- business logic
- flows

👉 This article focuses on:

- designing clean error responses
- structuring exception handling
- mapping exceptions to HTTP responses

---

## 3. Goals of Good Error Design

---

A good error handling system should:

- be consistent
- be predictable
- expose useful information (without leaking internals)
- help debugging and observability

---

## 4. Standard Error Response Format

---

```json
{
  "timestamp": "2026-04-23T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "code": "INVALID_INPUT",
  "message": "Amount must be greater than 0",
  "path": "/payments"
}
```

---

### Fields Explained

- `status` → HTTP status code
- `code` → internal error code
- `message` → human-readable message
- `path` → API endpoint

---

## 5. Exception Types in Our System

---

We classify errors into categories:

---

### 1. Validation Errors

- invalid input
- missing fields

---

### 2. Business Errors

- invalid state transition
- duplicate orderId

---

### 3. Idempotency Errors

- duplicate request with different payload
- request already in progress

---

### 4. System Errors

- database failure
- network issues

---

## 6. Custom Exceptions

---

```java
public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}

public class IdempotencyException extends RuntimeException {
    public IdempotencyException(String message) {
        super(message);
    }
}
```

---

## 7. Global Exception Handler (Spring Boot)

---

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex, HttpServletRequest req) {
        return buildResponse(HttpStatus.BAD_REQUEST, "INVALID_INPUT", ex.getMessage(), req);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException ex, HttpServletRequest req) {
        return buildResponse(HttpStatus.CONFLICT, "BUSINESS_ERROR", ex.getMessage(), req);
    }

    @ExceptionHandler(IdempotencyException.class)
    public ResponseEntity<ErrorResponse> handleIdempotency(IdempotencyException ex, HttpServletRequest req) {
        return buildResponse(HttpStatus.CONFLICT, "IDEMPOTENCY_ERROR", ex.getMessage(), req);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest req) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "Something went wrong", req);
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String code, String message, HttpServletRequest req) {
        ErrorResponse response = new ErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                code,
                message,
                req.getRequestURI()
        );
        return new ResponseEntity<>(response, status);
    }
}
```

---

## 8. ErrorResponse Model

---

```java
public class ErrorResponse {

    private Instant timestamp;
    private int status;
    private String error;
    private String code;
    private String message;
    private String path;

    // constructor, getters
}
```

---

## 9. Mapping Exceptions to HTTP Status

---

| Exception Type       | HTTP Status               |
| -------------------- | ------------------------- |
| ValidationException  | 400 Bad Request           |
| BusinessException    | 409 Conflict              |
| IdempotencyException | 409 Conflict              |
| System Exception     | 500 Internal Server Error |

---

## 10. Handling Idempotency Errors Properly

---

### Case: Same key, different payload

```text
Throw → IdempotencyException
Return → 409 Conflict
```

---

### Case: Request in progress

```text
Return → 409 or 202 (Processing)
```

---

👉 Avoid duplicate execution

---

## 11. What NOT to Expose

---

### ❌ Stack traces

- security risk

---

### ❌ Internal DB errors

- leaks implementation details

---

### ❌ Sensitive data

- violates compliance

---

## 12. Logging Strategy

---

Errors should be logged with:

- request ID / idempotency key
- payment ID
- stack trace (internally)

---

Example:

```java
log.error("Error processing payment {} with key {}", paymentId, key, ex);
```

---

## 13. Design Insight

---

> 🧠 **Error handling is part of API design, not an afterthought.**

---

Clients depend on:

- consistent error codes
- predictable responses

---

## Conclusion

---

A robust error handling system:

- standardizes responses
- separates error types clearly
- protects internal details

---

### 🔗 What’s Next?

👉 **[Gateway Abstraction →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/9_phase-9/9_7_gateway-abstraction)**

---

> 📝 **Takeaway**:
>
> - Use global exception handling
> - Keep error responses consistent
> - Never leak internal details
> - Map exceptions to proper HTTP status codes
