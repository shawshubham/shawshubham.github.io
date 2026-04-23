---
title: "Common Race Conditions & Anti-Patterns"
description: "Understand the most common race conditions and design anti-patterns in payment systems, and how to avoid them using correct concurrency and state protection strategies."
keywords:
  - race conditions payments
  - system design anti patterns
  - concurrency bugs payment api
  - backend mistakes payments
weight: 8
layout: "topic-content"
---

## 1. Why This Article Matters

---

In this phase, we discussed:

- concurrency handling
- locking
- atomic transitions
- unknown state recovery

Now we consolidate everything into:

> ❗ **What actually goes wrong in real systems**

---

## 2. What This Article Focuses On

---

We are NOT introducing new concepts.

👉 This article focuses on:

- common failure patterns
- incorrect implementations
- how systems break under pressure

---

## 3. Race Condition 1 — Check-Then-Act

---

### Problem

```text
1. Read state
2. Decide
3. Update state
```

---

### Failure Scenario

```text
A reads CREATED
B reads CREATED
A updates → PROCESSING
B also updates → PROCESSING
```

---

### Why It Breaks

- state read and update are not atomic
- race window exists

---

### Fix

- use locking OR
- use compare-and-update

---

## 4. Race Condition 2 — Late Idempotency Write

---

### Problem

```text
Validate request
Process payment
Then store idempotency
```

---

### Failure Scenario

```text
Two requests pass validation
Both execute payment
Then idempotency is written
```

---

### Why It Breaks

- idempotency is not protecting execution

---

### Fix

- reserve idempotency BEFORE side effects

---

## 5. Race Condition 3 — No Locking on Critical Path

---

### Problem

```text
Multiple requests process same payment concurrently
```

---

### Failure Scenario

```text
A executes payment
B executes payment
→ double charge
```

---

### Fix

- use pessimistic locking

---

## 6. Race Condition 4 — Ignoring Terminal States

---

### Problem

```text
Allowing re-processing after SUCCEEDED
```

---

### Failure Scenario

```text
Payment already succeeded
Retry triggers execution again
```

---

### Fix

- enforce strict state validation

---

## 7. Race Condition 5 — Timeout Misinterpretation

---

### Problem

```text
Treat timeout as failure
```

---

### Failure Scenario

```text
Payment succeeded externally
System retries → duplicate charge
```

---

### Fix

- treat as PROCESSING
- verify before retry

---

## 8. Race Condition 6 — Missing Reconciliation

---

### Problem

```text
System never resolves PROCESSING state
```

---

### Failure Scenario

- stuck payments
- inconsistent system

---

### Fix

- implement reconciliation job

---

## 9. Anti-Pattern 1 — Single Layer Protection

---

### Problem

```text
Only using idempotency OR only locking
```

---

### Why It Breaks

- different failure modes bypass single layer

---

### Fix

- use layered protection

---

## 10. Anti-Pattern 2 — Long Transactions

---

### Problem

```text
Holding DB locks during gateway call
```

---

### Impact

- blocking
- poor scalability

---

### Fix

- keep transactions short
- split flow into phases

---

## 11. Anti-Pattern 3 — Blind Retries

---

### Problem

```text
Retry without idempotency or verification
```

---

### Impact

- duplicate execution

---

### Fix

- always retry safely (idempotency + checks)

---

## 12. Anti-Pattern 4 — Overtrusting External Systems

---

### Problem

```text
Assuming gateway response always arrives correctly
```

---

### Reality

- network failures
- delayed responses

---

### Fix

- design for uncertainty
- use reconciliation

---

## 13. Summary Table

---

| Problem                | Root Cause         | Fix                   |
| ---------------------- | ------------------ | --------------------- |
| Check-then-act         | Non-atomic updates | Lock / compare-update |
| Late idempotency       | Wrong ordering     | Reserve early         |
| No locking             | Parallel execution | Locking               |
| Terminal state ignored | Missing validation | Enforce lifecycle     |
| Timeout misread        | Wrong assumption   | PROCESSING + verify   |
| No reconciliation      | No recovery path   | Background job        |

---

## 14. Design Philosophy

---

> 🧠 **Systems fail at the edges — concurrency, retries, and failures.**

---

A good design:

- anticipates race conditions
- prevents unsafe execution
- recovers from uncertainty

---

## Conclusion

---

Race conditions and anti-patterns are inevitable risks in payment systems.

A robust system:

- prevents them using safeguards
- detects them early
- recovers safely

---

### 🔗 What’s Next?

👉 **[Phase 9: Clean Backend Implementation →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/9_phase-9/9_1_overview)**

---

> 📝 **Takeaway**:
>
> - Most failures come from race conditions
> - Correct design is about prevention, not reaction
> - Layered safeguards are essential
