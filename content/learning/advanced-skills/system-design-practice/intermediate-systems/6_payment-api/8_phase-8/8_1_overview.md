---
title: "Concurrency, Consistency & State Protection — Overview"
description: "Understand how payment systems remain correct under concurrent requests, retries, and failures by using locking, state validation, and consistency strategies."
keywords:
  - concurrency payments
  - consistency system design
  - race conditions payment api
  - state protection backend
weight: 1
layout: "topic-content"
---

## 1. Why This Phase Exists

---

In previous phases, we designed:

- APIs and flows
- Idempotency handling
- Persistence and transactions

Those designs work well under **ideal conditions**.

Now we focus on a harder question:

> ❗ _What happens when multiple things happen at the same time?_

---

## 2. What Changes in This Phase

---

⚠️ Important clarification:

This phase does **NOT** re-explain:

- idempotency basics
- payment lifecycle
- API design

👉 These were already covered in earlier phases.

Instead, this phase focuses on:

- how those concepts behave under **concurrency and race conditions**

---

## 3. Real Problems We Are Solving

---

### 1. Concurrent Confirm Requests

```text
Two requests try to confirm the same payment at the same time
```

---

### 2. Retry During Processing

```text
Client retries while original request is still running
```

---

### 3. Double State Transition

```text
Two threads try to move payment from CREATED → PROCESSING
```

---

### 4. Unknown State + Retry

```text
Gateway timeout + retry + concurrent execution
```

---

> 📝 **Key Insight:**  
> The system must guarantee that **only one valid execution path succeeds**, regardless of how many requests arrive.

---

## 4. Layers of Protection (Recap, Not Repetition)

---

We already introduced these mechanisms earlier. Here we see how they work **together under stress**.

### 1. Idempotency

- protects against duplicate requests

---

### 2. Locking

- prevents concurrent execution on same payment

---

### 3. State Validation

- ensures only valid transitions happen

---

### 4. Transactions

- ensure atomic updates

---

👉 This phase focuses on **how these interact**, not what they are.

---

## 5. Mental Model for This Phase

---

Think of this phase as answering:

> “How do we make the system correct under pressure?”

---

### System Under Pressure Means

- high traffic
- retries
- concurrent requests
- partial failures

---

## 6. What We Will Cover Next

---

### 8.2 Concurrent Confirm Requests

- same key vs different key behavior

---

### 8.3 Locking Strategies

- pessimistic vs optimistic locking

---

### 8.4 Atomic State Transitions

- preventing invalid updates

---

### 8.5 Double Execution Protection

- layered safeguards

---

### 8.6 Consistency vs Availability

- handling timeouts and ambiguity

---

### 8.7 Unknown State Handling

- recovery and reconciliation thinking

---

### 8.8 Common Race Conditions

- real-world anti-patterns

---

## 7. What This Phase Will NOT Do

---

To avoid redundancy, this phase will NOT:

- repeat full create/confirm flows
- redefine idempotency concepts
- restate database schemas

👉 Instead, it will **build on them**.

---

## Conclusion

---

This phase focuses on making the system:

- correct under concurrency
- safe under retries
- reliable under race conditions

---

### 🔗 What’s Next?

👉 **[Concurrent Confirm Requests →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/8_phase-8/8_2_concurrent-confirm-requests)**

---

> 📝 **Takeaway**:
>
> - Concurrency introduces the hardest problems in system design
> - Multiple safeguards must work together
> - This phase focuses on behavior under real-world pressure
