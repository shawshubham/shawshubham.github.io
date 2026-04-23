---
title: "Request Models"
description: "Design request payloads for Payment API including validation rules, required fields, and best practices for safe and reliable input handling."
keywords:
  - payment api request models
  - api input validation payments
  - idempotency key request design
  - rest api request structure
  - backend api validation
weight: 2
layout: "topic-content"
---

## 1. Why Request Models Matter

---

Request models define **what the client must send** to the system.

A well-designed request model ensures:

- correct data enters the system
- invalid requests are rejected early
- retries behave safely
- APIs remain predictable

> 📝 **Key Insight:**  
> Request design is the first line of defense for **correctness and reliability**.

---

## 2. Core Request Types

---

Our Payment API supports two main write operations:

1. Create Payment
2. Confirm Payment

Each requires a carefully designed request model.

---

## 3. Create Payment Request

---

### Endpoint

```java
POST /payments
```

### Request Body

```json
{
  "orderId": "ORD-123",
  "amount": 2500,
  "currency": "GBP",
  "paymentMethod": {
    "type": "CARD",
    "token": "tok_abc123"
  }
}
```

### Field Breakdown

| Field               | Type   | Required | Description                                |
| ------------------- | ------ | -------- | ------------------------------------------ |
| orderId             | string | ✅       | Business reference for the payment         |
| amount              | number | ✅       | Payment amount (in smallest currency unit) |
| currency            | string | ✅       | Currency code (ISO format like GBP, USD)   |
| paymentMethod.type  | string | ✅       | Type of payment method (CARD, etc.)        |
| paymentMethod.token | string | ✅       | Tokenized payment method                   |

### Why Token Instead of Card Details?

We never send raw card data to our backend.

👉 Instead:

- frontend collects card details
- gateway (e.g., Stripe) generates a token
- backend uses the token

> 🔒 This ensures **PCI compliance and security**

---

## 4. Idempotency Key (Critical)

---

### Header

```java
Idempotency-Key: <unique-key>
```

### Why Needed?

Clients may:

- retry requests
- double-click buttons
- experience network failures

Without idempotency:

❌ Multiple payment records may be created

---

### Behavior

- Same request + same key → same response
- Different key → treated as new request

---

> **📝 Key Insight:**  
> Idempotency ensures **safe retries without duplicate side effects**

---

## 5. Preventing Duplicate Payment Creation

---

Even with idempotency, we should consider **business-level duplicates**.

### Example

- same `orderId` sent multiple times
- different idempotency keys

---

### Solution Approaches

- allow only one **active payment per order**
- validate if payment already exists for `orderId`
- reject or return existing payment

---

> 📝 **Design Principle**  
> Combine **idempotency + business validation** for strong protection.

---

## 6. Confirm Payment Request

---

### Endpoint

```java
POST /payments/{paymentId}/confirm
```

### Request Body

```json
{}
```

👉 Usually empty (all required data already exists)

### Header

```java
Idempotency-Key: <unique-key>
```

## Why Idempotency is Needed Here Too

---

If confirm is retried:

- multiple gateway calls may happen
- payment may be processed multiple times

👉 This is extremely dangerous

---

## Required Behavior

---

- same confirm request should not trigger multiple executions
- system should return consistent result

---

## 7. Validation Rules

---

### Input Validation

- `amount > 0`
- valid currency code
- `orderId` must not be empty
- payment method must be valid

---

### Business Validation

- payment must exist before confirm
- payment must be in a valid state (`CREATED`, retryable `FAILED`)

---

### State Validation

- reject confirm if already `SUCCEEDED`
- reject invalid transitions

---

## 8. Request Design Principles

---

### 1. Keep Requests Minimal

Only include what is necessary.

---

### 2. Use Clear Field Names

Avoid ambiguity:

- `orderId` instead of `id`
- `amount` instead of `value`

---

### 3. Avoid Derived Data

Do NOT include:

- calculated fields
- internal state

---

### 4. Validate Early

Reject invalid input before:

- DB writes
- external calls

---

## 9. Common Mistakes to Avoid

---

### ❌ Sending raw card details

- security risk
- violates compliance

---

### ❌ Missing idempotency support

- leads to duplicate payments

---

### ❌ Weak validation

- invalid data enters system
- leads to downstream failures

---

### ❌ Overloading request payload

- harder to maintain
- increases coupling

---

## Conclusion

---

Request models define how safely and correctly clients interact with your system.

A good request model:

- enforces correctness
- supports safe retries
- prevents duplicate processing

This lays the foundation for reliable payment execution.

---

### 🔗 What’s Next?

👉 **[Response Models →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/4_phase-4/4_3_response-models/)**

---

> 📝 **Takeaway**:
>
> - Validate all incoming data strictly
> - Use idempotency for safe retries
> - Never trust client input blindly
