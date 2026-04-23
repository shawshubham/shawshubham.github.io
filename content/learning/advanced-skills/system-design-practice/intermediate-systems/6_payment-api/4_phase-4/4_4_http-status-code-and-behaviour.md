---
title: "HTTP Status Codes & API Behavior"
description: "Understand how to design correct HTTP status codes and API behavior for a Payment API to ensure predictable and reliable client interactions."
keywords:
  - http status codes api design
  - payment api status codes
  - rest api error handling
  - api behavior design backend
  - system design api responses
weight: 4
layout: "topic-content"
---

## 1. Why Status Codes Matter

---

HTTP status codes are the **first signal** a client receives about the outcome of a request.

They help clients quickly understand:

- whether the request succeeded
- whether it failed
- whether it should retry

> 📝 **Key Insight:**  
> Status codes should reflect **what happened**, while the response body explains **why it happened**.

---

## 2. Categories of Status Codes

---

| Category | Meaning      |
| -------- | ------------ |
| 2xx      | Success      |
| 4xx      | Client error |
| 5xx      | Server error |

---

## 3. Success Status Codes

---

### 201 Created

Used for:

- `POST /payments`

👉 Indicates a new resource was successfully created.

---

### 200 OK

Used for:

- `GET /payments/{id}`
- `POST /payments/{id}/confirm` (when returning result)

👉 Indicates request was processed successfully.

---

### 202 Accepted (Optional for Async)

Used when:

- request is accepted but processing is not complete yet

👉 Useful for async flows (future extension).

---

## 4. Client Error Status Codes (4xx)

---

### 400 Bad Request

Used when:

- invalid input format
- missing required fields

Example:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Amount must be greater than zero"
  }
}
```

---

### 404 Not Found

Used when:

- payment does not exist

---

### 409 Conflict

Used when:

- invalid state transition
- duplicate operation attempted

Example:

```json
{
  "error": {
    "code": "INVALID_STATE",
    "message": "Payment cannot be confirmed in current state"
  }
}
```

---

### 422 Unprocessable Entity (Optional)

Used when:

- request is valid but business rules fail

Example:

- insufficient balance
- unsupported currency

---

## 5. Server Error Status Codes (5xx)

---

### 500 Internal Server Error

Used when:

- unexpected failure occurs

👉 Should not expose internal details.

---

### 502 / 503 (Gateway Errors)

Used when:

- external gateway fails or is unavailable

---

## 6. Mapping Status Codes to Payment API

---

| Scenario                       | Status Code |
| ------------------------------ | ----------- |
| Payment created                | 201         |
| Payment fetched                | 200         |
| Payment confirmed successfully | 200         |
| Invalid input                  | 400         |
| Payment not found              | 404         |
| Invalid state transition       | 409         |
| Business validation failure    | 422         |
| Internal failure               | 500         |

---

## 7. API Behavior Design

---

Status codes alone are not enough — API behavior must be **consistent and predictable**.

---

### 1. Idempotent Behavior

- repeated requests should return same result
- no duplicate side effects

---

### 2. Consistent Error Structure

Always return:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

### 3. State-Aware Responses

- response must reflect current payment state
- do not rely only on status code

---

### 4. Safe Retries

- client should know when retry is safe
- avoid ambiguous responses

---

## 8. Retry Strategy (Important)

---

| Status Code | Retry?              |
| ----------- | ------------------- |
| 2xx         | ❌ No               |
| 4xx         | ❌ No (fix request) |
| 5xx         | ✅ Yes              |

---

👉 Clients should retry only when failure is **temporary**.

---

## 9. Common Mistakes to Avoid

---

### ❌ Using 200 for everything

- hides real errors

---

### ❌ Exposing internal error messages

- security risk

---

### ❌ Inconsistent status usage

- confuses clients

---

### ❌ Mixing business errors with 500

- misleads retry logic

---

## Conclusion

---

HTTP status codes and API behavior define how clients interact with your system.

A well-designed API:

- uses correct status codes
- provides clear error messages
- behaves predictably under retries

---

### 🔗 What’s Next?

👉 **[API Design Best Practices →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/4_phase-4/4_5_api-best-practices/)**

---

> 📝 **Takeaway**:
>
> - Use status codes to reflect outcome clearly
> - Keep error handling consistent
> - Design APIs that are predictable and retry-safe
