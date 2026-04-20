---
title: "Functional Requirements"
description: "Define the core functional requirements for a Payment API including creating payments, confirming payments, fetching status, and handling safe retries."
keywords:
  - payment api requirements
  - system design functional requirements
  - payment lifecycle operations
  - payment api endpoints
  - backend system design
weight: 2
layout: "topic-content"
---

## 1. What Are Functional Requirements?

---

Functional requirements define **what the system should do**.

They describe the **capabilities and operations** the system must support, without going into implementation details.

> 📝 **Key Point:**  
> Functional requirements focus on _behavior_, not _how it is implemented_.

---

## 2. Core Operations of a Payment API

---

For our Payment API, we need to support a minimal but realistic set of operations.

### 1. Create a Payment

The client should be able to create a payment request.

This typically includes:

- amount
- currency
- customer or order reference
- payment method details (tokenized)

> This step only creates a **payment record**, it does not execute the payment.

---

### 2. Confirm / Process a Payment

The client confirms that the payment should be executed.

At this stage:

- our system initiates payment execution
- delegates the actual transaction to the external gateway
- updates payment state based on response

> 📝 Important:  
> We **do not directly process payments** — we coordinate execution through a payment gateway.

---

### 3. Fetch Payment Details

Clients should be able to retrieve:

- payment status
- amount and currency
- timestamps
- gateway response details

This is important for:

- UI updates
- reconciliation
- debugging

---

### 4. Fetch Payment Status

A lightweight operation to check:

- current state (CREATED, PROCESSING, SUCCEEDED, FAILED)

This is often used by:

- frontend polling
- backend workflows

---

## 3. Optional Operations (Out of Scope for Now)

---

In real-world systems, payment APIs also support:

- cancel a payment (before processing)
- refund a payment (after success)
- partial refunds
- list payments for a user

For this intermediate design, we **intentionally exclude these** to keep focus on core concepts.

---

## 4. Constraints We Must Consider

---

Even at the functional level, some constraints must be acknowledged.

### 1. Safe Retries (Idempotency)

Clients may retry requests due to:

- network failures
- timeouts
- lost responses

The system must ensure:

> ❗ The same payment is not processed multiple times.

---

### 2. Clear State Visibility

Clients should always be able to determine:

- whether payment is pending
- completed
- or failed

---

### 3. External Dependency Handling

Since we rely on a payment gateway:

- responses may be delayed
- failures may occur
- outcomes may not be immediately known

---

## 5. What We Are NOT Defining Yet

---

At this stage, we are **not** deciding:

- API endpoint structure
- database schema
- idempotency implementation
- concurrency control
- failure handling logic

These will be covered in later phases.

---

## Conclusion

---

Functional requirements define the **foundation of the system**.

For our Payment API, the core responsibilities are:

- creating payments
- confirming payments
- fetching payment details and status
- ensuring safe retries

These operations will guide all future design decisions.

---

### 🔗 What’s Next?

👉 **[Non-Functional Requirements →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/1_phase-1/1_3_non-functional-requirements/)**

---

> 📝 **Takeaway**:
>
> - Functional requirements define **what the system does**
> - A Payment API must support **create, confirm, and fetch operations**
> - Even at this stage, **idempotency and reliability concerns are visible**
