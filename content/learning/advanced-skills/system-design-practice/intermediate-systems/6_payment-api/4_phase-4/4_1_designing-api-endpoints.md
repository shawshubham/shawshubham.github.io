---
title: "Designing API Endpoints"
description: "Design the core REST endpoints for a Payment API including create, confirm, and fetch operations, along with behavior, constraints, and best practices."
keywords:
  - payment api endpoints
  - rest api design payments
  - system design api contracts
  - payment api create confirm
  - backend api design
weight: 1
layout: "topic-content"
---

## 1. Why API Design Matters

---

APIs are the **interface between clients and the Payment API service**. A well-designed API should be:

- clear and predictable
- aligned with the payment lifecycle
- safe under retries
- explicit about success and failure

> 📝 **Key Insight:**  
> Good APIs expose **business intent**, not internal implementation details.

---

## 2. What We Need from Our Payment API

---

From the earlier phases, we already know the system must support three core actions:

1. **Create a payment**
2. **Confirm a payment**
3. **Fetch payment details**

These actions map naturally to the payment lifecycle:

```text
Create Payment → Confirm Payment → Track Status
```

This is why our endpoint design should follow the same flow.

---

## 3. Core Endpoints

---

For our intermediate design, we define the following endpoints:

| Endpoint                             | Purpose                                |
| ------------------------------------ | -------------------------------------- |
| `POST /payments`                     | Create a new payment                   |
| `POST /payments/{paymentId}/confirm` | Confirm and initiate payment execution |
| `GET /payments/{paymentId}`          | Retrieve payment details and status    |

These three endpoints are enough to support the basic payment lifecycle while keeping the API focused and easy to understand.

---

## 4. Endpoint 1 — Create Payment

---

### Endpoint

```java
POST /payments
```

---

### Purpose

This endpoint creates a new payment resource in the **CREATED** state.

It does **not** execute the payment.

### Why keep creation separate?

Separating create from confirm gives us:

- better lifecycle control
- clearer state transitions
- safer retry handling

### Example Request

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

### Example Response

```json
{
  "paymentId": "pay_001",
  "status": "CREATED",
  "amount": 2500,
  "currency": "GBP",
  "createdAt": "2026-04-20T10:00:00Z"
}
```

### Key Behavior

- Validates input
- Stores payment in DB
- Does not call payment gateway

---

## 5. Endpoint 2 — Confirm Payment

---

### Endpoint

```java
POST /payments/{paymentId}/confirm
```

### Purpose

This endpoint confirms the payment and initiates execution through the external payment gateway.

### What happens here?

- validate current payment state
- move payment to PROCESSING
- call external gateway
- update final state (SUCCEEDED or FAILED)

> **📝 Important:**  
> This endpoint coordinates payment execution — it does not directly process money itself.

### Example Success Response

```json
{
  "paymentId": "pay_001",
  "status": "SUCCEEDED",
  "processedAt": "2026-04-20T10:01:10Z",
  "gatewayReference": "txn_789"
}
```

### Example Failure Response

```json
{
  "paymentId": "pay_001",
  "status": "FAILED",
  "failureReason": "CARD_DECLINED"
}
```

### Key Behavior

- should only work for valid states like CREATED or retryable FAILED
- must reject invalid transitions
- must be safe under retries

---

## 6. Endpoint 3 — Get Payment Details

---

### Endpoint

```java
GET /payments/{paymentId}
```

### Purpose

This endpoint returns the current payment details and lifecycle state.

### Example Response

```json
{
  "paymentId": "pay_001",
  "status": "PROCESSING",
  "amount": 2500,
  "currency": "GBP",
  "createdAt": "2026-04-20T10:00:00Z",
  "updatedAt": "2026-04-20T10:01:00Z"
}
```

### Use Cases

- frontend polling
- backend workflow checks
- debugging and reconciliation

---

## 7. Why These Endpoints Work Well

---

This endpoint design is effective because it aligns with both:

- the **payment lifecycle**
- the **responsibilities of our service**

### Benefits

- clear separation of intent and execution
- easier retry handling
- better state control
- cleaner API surface

---

## 8. Endpoint Design Principles Used Here

---

### 1. Resource-Oriented Design

- `/payments` represents the payment collection
- `/payments/{id}` represents a specific payment

---

### 2. Explicit Business Action

- `/confirm` clearly communicates intent
- better than overloading `POST /payments` to also execute payment

---

### 3. Lifecycle Alignment

Each endpoint matches a stage in the lifecycle:

- create
- confirm
- fetch

---

### 4. Minimal Surface Area

We expose only what is needed for the core flow.

---

## 9. Common Mistakes to Avoid

---

### ❌ Combining create and confirm into one endpoint

This makes:

- retries harder
- lifecycle less clear
- duplicate execution risk higher

---

### ❌ Designing endpoints without lifecycle awareness

This can lead to:

- invalid transitions
- confusing client behavior

---

### ❌ Exposing gateway details directly as API design drivers

The API should reflect **business workflow**, not gateway internals.

---

## Conclusion

---

Designing API endpoints is not just about naming URLs — it is about exposing the **right business operations** in a way that aligns with the system lifecycle.

For our Payment API, the three key endpoints are enough to support the core flow:

- create payment
- confirm payment
- fetch payment state

This gives us a clean and extensible API surface before we dive deeper into request and response modeling.

---

### 🔗 What’s Next?

👉 **[Request Models →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/4_phase-4/4_2_request-models/)**

---

> 📝 **Takeaway**:
>
> - Design endpoints around **business intent and lifecycle**
> - Separate creation and execution for better control
> - Keep the API small, clear, and predictable
