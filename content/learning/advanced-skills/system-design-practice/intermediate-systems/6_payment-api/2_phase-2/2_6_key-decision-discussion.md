---
title: "Key Design Decisions & Trade-offs"
description: "Understand the key design decisions in a Payment API system including separation of create/confirm, use of external gateways, idempotency, and trade-offs."
keywords:
  - payment api design decisions
  - system design tradeoffs payments
  - idempotency payments design
  - create vs confirm api design
  - backend architecture decisions
weight: 6
layout: "topic-content"
---

## 1. Why Design Decisions Matter

---

System design is not just about components and diagrams. It is about making **intentional decisions with clear trade-offs**.

> 📝 **Key Insight:**  
> Good design is a set of **well-justified decisions**, not just implementation details.

---

## 2. Decision 1 — Separate Create and Confirm

---

### What we did

- `POST /payments` → create payment (CREATED)
- `POST /payments/{id}/confirm` → execute payment

### Why?

- clean lifecycle control
- easier retry handling
- avoids duplicate execution

### Trade-off

- slightly more API complexity
- two-step flow for clients

👉 **Decision Outcome:**  
Prefer separation for **correctness and control**

---

## 3. Decision 2 — Use External Payment Gateway

---

### What we did

- delegated payment execution to providers like Stripe

### Why?

- avoids complex financial compliance
- leverages proven infrastructure
- reduces engineering overhead

### Trade-off

- dependency on external system
- added latency
- less control over execution

👉 **Decision Outcome:**  
Use gateway to focus on **orchestration, not processing**

---

## 4. Decision 3 — Introduce Idempotency

---

### What we did

- require `Idempotency-Key` for critical operations

### Why?

- prevents duplicate payments
- handles retries safely

### Trade-off

- additional storage and logic
- complexity in request handling

👉 **Decision Outcome:**  
Mandatory for **reliable payment systems**

---

## 5. Decision 4 — Stateful Payment Model

---

### What we did

- model payment as a state machine

### Why?

- tracks lifecycle clearly
- supports retries and failures

### Trade-off

- more complexity vs stateless APIs

👉 **Decision Outcome:**  
Stateful design is required for **real-world correctness**

---

## 6. Decision 5 — Start with Synchronous Flow

---

### What we did

- API waits for gateway response

### Why?

- simpler to implement
- easier to reason about

### Trade-off

- higher latency
- risk of timeouts

👉 **Decision Outcome:**  
Start simple → evolve to async when needed

---

## 7. Decision 6 — Database as Source of Truth

---

### What we did

- all payment state stored in DB

### Why?

- ensures consistency
- supports recovery and debugging

### Trade-off

- requires careful concurrency control

👉 **Decision Outcome:**  
Single source of truth for **system reliability**

---

## 8. Summary of Decisions

---

| Decision                | Why                | Trade-off            |
| ----------------------- | ------------------ | -------------------- |
| Separate create/confirm | control lifecycle  | extra API step       |
| External gateway        | reduce complexity  | dependency           |
| Idempotency             | prevent duplicates | added logic          |
| Stateful model          | correctness        | complexity           |
| Sync processing         | simplicity         | latency              |
| DB as source            | consistency        | concurrency handling |

---

## Conclusion

---

These decisions define the **foundation of our system design**.

Each choice:

- solves a real problem
- introduces a trade-off

Understanding these trade-offs is what makes a design **robust and scalable**.

---

### 🔗 What’s Next?

👉 **[Phase 3: Domain Model & Payment Lifecycle →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/3_phase-3/3_1_identifying-core-entities/)**

---

> 📝 **Takeaway**:
>
> - Every design decision has a trade-off
> - Focus on **correctness and reliability first**
> - Start simple, then evolve the system over time
