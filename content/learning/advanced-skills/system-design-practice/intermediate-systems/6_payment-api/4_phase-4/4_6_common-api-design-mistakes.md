---
title: "Common API Design Mistakes in Payment Systems"
description: "Learn the most common API design mistakes in payment systems and how to avoid them to build reliable and scalable APIs."
keywords:
  - api design mistakes
  - payment api pitfalls
  - rest api anti patterns
  - backend api mistakes
weight: 6
layout: "topic-content"
---

## 1. Why This Matters

---

Understanding mistakes is just as important as understanding best practices.

> 📝 **Key Insight:**  
> Many production failures happen not because of missing features, but because of **poor API design decisions**.

---

## 2. Combining Create and Execute

---

### ❌ Bad Design

```text
POST /payments → creates and executes payment
```

### Why This is a Problem

- no control over lifecycle
- hard to retry safely
- high risk of duplicate execution

### ✅ Correct Approach

- `POST /payments` → create
- `POST /payments/{id}/confirm` → execute

---

## 3. Ignoring Idempotency

---

### ❌ Bad Design

- no idempotency key support

### Why This is a Problem

- duplicate payments on retry
- inconsistent system state

### ✅ Correct Approach

- require `Idempotency-Key`
- return same response for repeated requests

---

## 4. Designing Action-Based APIs

---

### ❌ Bad Design

```text
/createPayment
/confirmPayment
/getPaymentStatus
```

### Why This is a Problem

- inconsistent naming
- not scalable
- harder to understand

### ✅ Correct Approach

```text
POST /payments
POST /payments/{id}/confirm
GET  /payments/{id}
```

---

## 5. Not Validating Payment State

---

### ❌ Bad Design

- allowing confirm on any state

### Why This is a Problem

- invalid state transitions
- inconsistent behavior

### ✅ Correct Approach

- enforce state machine
- allow only valid transitions

---

## 6. Exposing Internal Details

---

### ❌ Bad Design

- returning raw gateway responses
- exposing DB fields

### Why This is a Problem

- security risk
- tight coupling with internal systems

### ✅ Correct Approach

- return clean, abstracted response models

---

## 7. Weak Error Handling

---

### ❌ Bad Design

```json
{
  "error": "Something went wrong"
}
```

### Why This is a Problem

- not actionable
- difficult for clients to handle

### ✅ Correct Approach

```json
{
  "error": {
    "code": "INVALID_STATE",
    "message": "Payment cannot be confirmed in current state"
  }
}
```

---

## 8. Using Incorrect HTTP Status Codes

---

### ❌ Bad Design

- always returning `200 OK`

### Why This is a Problem

- hides errors
- breaks retry logic

### ✅ Correct Approach

- use 4xx for client errors
- use 5xx for server errors

---

## 9. Not Designing for Retries

---

### ❌ Bad Design

- system breaks on repeated requests

### Why This is a Problem

- unreliable under real-world conditions

### ✅ Correct Approach

- design idempotent endpoints
- ensure safe retry behavior

---

## 10. Overloading API Responses

---

### ❌ Bad Design

- returning too many fields

### Why This is a Problem

- increases complexity
- unnecessary data transfer

### ✅ Correct Approach

- return only essential data

---

## 11. Ignoring Business Constraints

---

### ❌ Bad Design

- allowing multiple active payments for same order without control

### Why This is a Problem

- duplicate or conflicting payments

### ✅ Correct Approach

- enforce business rules (e.g., one active payment per order)

---

## 12. Tight Coupling with External Gateway

---

### ❌ Bad Design

- API design directly mirrors gateway API

### Why This is a Problem

- hard to switch providers
- leaks external complexity

### ✅ Correct Approach

- keep gateway integration internal
- expose stable API contract

---

## Conclusion

---

Avoiding these mistakes ensures your Payment API is:

- reliable
- maintainable
- scalable

These are the qualities expected in real-world systems.

---

### 🔗 What’s Next?

👉 **[Phase 5: Idempotency & Safe Retries →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/5_phase-5/5_1_introduction-idempotency-and-retires/)**

---

> 📝 **Takeaway**:
>
> - Avoid combining responsibilities in APIs
> - Always design for retries and failures
> - Keep APIs clean, consistent, and business-driven
