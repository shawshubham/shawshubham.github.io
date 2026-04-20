---
title: "Non-Functional Requirements"
description: "Define the key non-functional requirements for a Payment API including reliability, consistency, idempotency, latency, observability, and security."
keywords:
  - payment api non functional requirements
  - system design reliability
  - idempotency in payments
  - consistency in distributed systems
  - backend observability
weight: 3
layout: "topic-content"
---

## 1. What Are Non-Functional Requirements?

---

Non-functional requirements (NFRs) define **how well the system should behave** under real-world conditions.

They capture qualities such as:

- reliability
- consistency
- performance
- scalability
- security
- observability

> 📝 **Key Point:**  
> Functional requirements tell us _what the system does_.  
> Non-functional requirements define _how the system should behave under stress, failure, and scale_.

---

## 2. Reliability — The Most Critical Requirement

---

In a payment system, **reliability is non-negotiable**.

The system must behave correctly even when things go wrong.

### Expectations

- A payment should **not be processed more than once** unintentionally
- The system should **not lose payment state**
- Failures should be handled in a **predictable and recoverable way**

### Why it matters

A single reliability issue can lead to:

- duplicate charges
- lost transactions
- user trust issues
- financial discrepancies

> ❗ In payment systems, correctness under failure is more important than performance under success.

---

## 3. Consistency — Accurate Payment State

---

The system must always reflect the **true state of a payment**.

### Expectations

- Clients should see a **consistent and accurate payment status**
- State transitions should be **valid and controlled**
- Partial or conflicting states must be avoided

### Example concern

- Payment is marked `SUCCEEDED` in DB, but client sees `FAILED`

This kind of inconsistency is unacceptable.

> 📝 **Key Point:**  
> Payment systems prioritize **strong consistency for critical state**.

---

## 4. Idempotency — Safe Retries

---

In real systems, clients **will retry requests** due to:

- network timeouts
- gateway delays
- lost responses

Without protection, retries can cause:

> ❗ Duplicate payment execution

### Requirement

- The system must ensure that **the same request does not produce multiple effects**

### High-level expectation

- A repeated request with the same identity should return the **same result**, not trigger a new operation

> 📝 This is achieved using **idempotency keys**, which we will design in later phases.

---

## 5. Latency & Performance

---

Payment APIs are user-facing and should respond within a **reasonable time**.

### Expectations

- API responses should typically be within **hundreds of milliseconds to a few seconds**
- The system should handle **concurrent requests efficiently**

### Important note

Latency is important, but it should **never compromise correctness**.

> 📝 In payment systems, we prefer **slightly slower but correct** over **fast but unsafe**.

---

## 6. Scalability — Handling Growth

---

The system should handle increasing load over time.

### Expectations

- Support **high request volume** (e.g., sale events, peak traffic)
- Handle **concurrent payment requests safely**
- Scale horizontally where needed

### Example scenarios

- flash sales
- ticket booking rush
- subscription billing cycles

---

## 7. Observability — Visibility Into the System

---

We must be able to **monitor and debug** the system.

### Expectations

- Track payment lifecycle events
- Log important actions (without exposing sensitive data)
- Monitor failures and retries
- Provide traceability for each payment

### Why it matters

When something goes wrong, we should be able to answer:

- What happened to this payment?
- Was it retried?
- What did the gateway return?

> 📝 Observability is critical for **debugging and production support**.

---

## 8. Security — Protecting Sensitive Data

---

Payment systems deal with sensitive information.

### Expectations

- Use **HTTPS** for all communication
- Avoid storing raw card details directly
- Use **tokenized payment methods**
- Mask sensitive data in logs
- Validate request authorization

### Scope note

We are not implementing full PCI compliance here, but the design must be **security-aware**.

---

## 9. External Dependency Handling

---

Our system depends on an external **payment gateway**.

### Expectations

- Handle **slow responses** gracefully
- Manage **timeouts and retries**
- Avoid blocking the system unnecessarily

### Key insight

> ❗ External systems are unreliable — your system must be resilient to that.

---

## 10. Trade-offs to Keep in Mind

---

In system design, trade-offs are inevitable.

For payment systems:

- **Correctness > Performance**
- **Consistency > Availability (for critical operations)**
- **Safety > Speed**

These trade-offs will guide design decisions in later phases.

> 🎯 **Priority Order for Payment Systems**
>
> 1. Correctness
> 2. Consistency
> 3. Reliability
> 4. Observability
> 5. Performance

---

## Conclusion

---

Non-functional requirements define the **quality and reliability** of the system.

For a Payment API, the most critical concerns are:

- reliability
- consistency
- idempotency
- observability
- security

These requirements ensure that the system behaves correctly under **real-world failures and scale**.

---

### 🔗 What’s Next?

👉 **[Core Challenges in Payment Systems →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/1_phase-1/1_4_core-challenges/)**

---

> 📝 **Takeaway**:
>
> - Non-functional requirements define **how the system behaves under stress**
> - Payment systems prioritize **correctness, consistency, and reliability**
> - Idempotency and observability are key to handling real-world failures
