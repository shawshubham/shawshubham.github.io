---
title: "Response Models"
description: "Design consistent and predictable response models for a Payment API including success, failure, and status responses."
keywords:
  - payment api response models
  - api response design payments
  - rest api responses backend
  - error handling api design
weight: 3
layout: "topic-content"
---

## 1. Why Response Models Matter

---

Response models define **what the client receives from the system**.

A well-designed response ensures:

- consistency across endpoints
- clear communication of state
- easy client integration
- predictable error handling

> 📝 **Key Insight:**  
> Good APIs are not just about accepting requests — they must **respond clearly and consistently**.

---

## 2. Types of Responses

---

In our Payment API, responses fall into three categories:

1. Success responses
2. Failure responses
3. Status responses

---

## 3. Create Payment Response

---

### Example

```json
{
  "paymentId": "pay_001",
  "status": "CREATED",
  "amount": 2500,
  "currency": "GBP",
  "createdAt": "2026-04-20T10:00:00Z"
}
```

### Key Points

- always return `paymentId`
- include current `status`
- return essential fields only

---

## 4. Confirm Payment Response

---

### Success Example

```json
{
  "paymentId": "pay_001",
  "status": "SUCCEEDED",
  "processedAt": "2026-04-20T10:01:10Z",
  "gatewayReference": "txn_789"
}
```

### Failure Example

```json
{
  "paymentId": "pay_001",
  "status": "FAILED",
  "failureReason": "CARD_DECLINED"
}
```

### Key Points

- response must reflect **final state**
- include failure reason when applicable
- avoid exposing raw gateway responses

---

## 5. Get Payment Response

---

### Example

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

### Key Points

- reflects current system state
- used for polling and monitoring

---

## 6. Standard Response Structure (Recommended)

---

To maintain consistency, responses can follow a standard structure:

```json
{
  "data": {
    "paymentId": "pay_001",
    "status": "SUCCEEDED"
  },
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-04-20T10:01:10Z"
  }
}
```

---

### Benefits

- consistent response shape
- easier client parsing
- supports metadata and tracing

---

## 7. Error Response Design

---

### Example

```json
{
  "error": {
    "code": "INVALID_STATE",
    "message": "Payment cannot be confirmed in current state"
  }
}
```

---

### Key Principles

- always return structured errors
- include machine-readable `code`
- include human-readable `message`

---

## 8. Response Design Principles

---

### 1. Consistency

All endpoints should follow a predictable structure.

---

### 2. Minimalism

Return only required fields.

---

### 3. No Internal Leakage

Do NOT expose:

- DB schema details
- internal flags
- raw gateway payloads

---

### 4. State Visibility

Always return current payment state.

---

## 9. Common Mistakes to Avoid

---

### ❌ Inconsistent response formats

- difficult for clients to integrate

---

### ❌ Missing status field

- client cannot understand lifecycle

---

### ❌ Returning raw gateway response

- security risk
- tight coupling

---

### ❌ Overloading response payload

- unnecessary complexity

---

## Conclusion

---

Response models define how clearly your system communicates with clients.

A good response model:

- is consistent
- reflects system state
- handles success and failure cleanly

---

### 🔗 What’s Next?

👉 **[HTTP Status Codes & API Behavior →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/4_phase-4/4_4_http-status-code-and-behaviour/)**

---

> 📝 **Takeaway**:
>
> - Responses must be consistent and predictable
> - Always include payment state
> - Use structured error handling
