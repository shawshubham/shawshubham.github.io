---
title: "Payments Table Design"
description: "Design the payments table with fields, constraints, and rationale to support correctness, idempotency, and lifecycle management in a payment system."
keywords:
  - payments table design
  - payment schema design
  - database design payments
  - payment status lifecycle
weight: 2
layout: "topic-content"
---

## 1. Purpose of Payments Table

---

The **Payments** table represents the core business entity of the system.

It answers:

> ❓ _What is the current state of a payment?_

It must support:

- lifecycle tracking
- idempotent operations
- concurrency-safe updates
- reliable reads for clients

---

## 2. Core Schema (Recommended)

---

```text
PAYMENTS
- id (UUID, PK)
- order_id (string)
- amount (decimal)
- currency (string)
- status (string)
- created_at (timestamp)
- updated_at (timestamp)
- version (int)            -- for optimistic locking (optional)
```

---

## 3. Field-by-Field Explanation

---

### 1. `id` (Primary Key)

- unique identifier for the payment
- typically UUID

👉 Used across all APIs (`/payments/{id}`)

---

### 2. `order_id`

- links payment to business entity (order/cart)

👉 Used to prevent **logical duplicates** (same order paid twice unintentionally)

---

### 3. `amount`

- payment amount

👉 Must be immutable after creation in most designs

---

### 4. `currency`

- ISO currency code (e.g., GBP, USD)

---

### 5. `status`

- represents lifecycle state

Typical values:

```text
CREATED
PROCESSING
SUCCEEDED
FAILED
```

👉 Drives all business logic and validations

---

### 6. `created_at`

- timestamp when payment is created

---

### 7. `updated_at`

- last state update timestamp

---

### 8. `version` (Optional but Recommended)

- used for **optimistic locking**

👉 Useful if you choose version-based concurrency instead of strict DB locks

---

## 4. Payment Lifecycle in DB

---

```text
CREATED → PROCESSING → SUCCEEDED / FAILED
```

---

### Important Rules

- `CREATED` → only initial state
- `PROCESSING` → set before gateway call
- `SUCCEEDED` → terminal state
- `FAILED` → may be retryable

👉 Invalid transitions must be rejected at service layer

---

## 5. Uniqueness & Business Constraints

---

### Problem: Duplicate Payments for Same Order

Two scenarios:

- same idempotency key → handled by idempotency table
- different idempotency keys → must be handled here

---

### Options

#### Option 1: Unique Constraint on `order_id`

```text
UNIQUE(order_id)
```

**Pros**

- prevents duplicates strictly

**Cons**

- does not allow retries/new attempts

---

#### Option 2: Partial / Logical Constraint (Recommended)

Allow multiple rows but restrict active ones.

```text
One ACTIVE payment per order
(status IN CREATED, PROCESSING)
```

**Pros**

- supports retries
- more flexible

---

👉 Enforced via application logic or partial index (if DB supports it)

---

## 6. Indexing Strategy

---

Indexes are critical for performance.

### Required Indexes

- Primary key on `id`

---

### Recommended Indexes

```text
INDEX(order_id)
INDEX(status)
```

---

### Why?

- `order_id` → lookup payments for a business entity
- `status` → filtering active/processing payments

---

## 7. Concurrency Considerations

---

### Pessimistic Locking (Current Design)

```sql
SELECT * FROM payments WHERE id = ? FOR UPDATE;
```

**Used in confirm flow**

👉 Prevents multiple threads from processing same payment

---

### Optimistic Locking (Optional)

Using `version` column:

```text
UPDATE payments
SET status = PROCESSING, version = version + 1
WHERE id = ? AND version = ?;
```

👉 Fails if another update already happened

---

## 8. What This Table Does NOT Store

---

The payments table should **not** store:

- gateway raw responses
- retry history
- idempotency data

👉 These belong to:

- payment_attempts table
- idempotency table

---

## 9. Example Record

---

```json
{
  "id": "pay_001",
  "order_id": "ORD-123",
  "amount": 100.0,
  "currency": "GBP",
  "status": "SUCCEEDED",
  "created_at": "2026-01-01T10:00:00Z",
  "updated_at": "2026-01-01T10:00:10Z"
}
```

---

## Conclusion

---

The Payments table is the **source of truth for payment state**.

It must:

- track lifecycle accurately
- prevent logical duplication
- support concurrency control
- enable reliable reads and updates

---

### 🔗 What’s Next?

👉 **[Payment Attempts Table →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/7_phase-7/7_3_payment-attempt-table/)**

---

> 📝 **Takeaway**:
>
> - Payments table stores the current state of the system
> - Business constraints are critical to avoid duplicate payments
> - Proper indexing and locking ensure performance and correctness
