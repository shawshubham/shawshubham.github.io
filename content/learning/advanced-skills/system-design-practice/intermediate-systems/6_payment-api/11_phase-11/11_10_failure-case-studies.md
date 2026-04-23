---
title: "Failure Case Studies & Real-World Incidents"
description: "Analyze common failure scenarios in payment systems and how design patterns like idempotency, retries, circuit breakers, and reconciliation mitigate them."
keywords:
  - payment system failures
  - incident analysis backend
  - retry circuit breaker reconciliation
  - production failure scenarios
weight: 10
layout: "topic-content"
---

## 1. Why Study Failures

---

Real systems are defined by how they behave under failure.

> ❗ **Design quality is best evaluated when things go wrong.**

---

This article connects all prior concepts by walking through realistic failure scenarios.

---

## 2. What This Article Focuses On

---

We focus on:

- real-world failure scenarios
- how failures propagate
- which design decisions prevent or mitigate them

---

## 3. Case 1 — Gateway Timeout After Charge

---

### Scenario

```text
Confirm Payment → Gateway call
Gateway processes payment successfully
Response times out
```

---

### Problem

```text
Gateway = SUCCESS
System = UNKNOWN (timeout)
```

---

### Risk

- duplicate charge on retry
- inconsistent state

---

### Solution

- **Idempotency** → safe retries
- **Retry with backoff**
- **Reconciliation job** → fetch final status

---

### Final Outcome

```text
Eventually consistent → SUCCEEDED
```

---

## 4. Case 2 — DB Write Fails After Gateway Success

---

### Scenario

```text
Gateway = SUCCESS
DB update fails (network / crash)
```

---

### Problem

```text
External success, internal state not updated
```

---

### Risk

- payment appears stuck (PROCESSING)
- customer confusion

---

### Solution

- **Reconciliation job** detects mismatch
- **Idempotent update** sets SUCCEEDED

---

## 5. Case 3 — Duplicate Client Requests

---

### Scenario

```text
Client retries (timeout / network issue)
Same request sent multiple times
```

---

### Risk

- duplicate payments

---

### Solution

- **Idempotency key**
- **Request hash validation**

---

### Outcome

```text
Multiple requests → single execution
```

---

## 6. Case 4 — Retry Storm During Outage

---

### Scenario

```text
Gateway down
All clients retry aggressively
```

---

### Problem

```text
Traffic spike → system overload → cascading failure
```

---

### Solution

- **Exponential backoff + jitter**
- **Circuit breaker (OPEN)** → fail fast
- **Rate limiting**

---

### Outcome

```text
Controlled degradation instead of system collapse
```

---

## 7. Case 5 — Long-Running Processing State

---

### Scenario

```text
Payment stuck in PROCESSING
(no response from gateway or system crash)
```

---

### Problem

- no final state

---

### Solution

- **Reconciliation job** scans stuck records
- queries gateway
- resolves state

---

## 8. Case 6 — Slow Dependency Causes Thread Exhaustion

---

### Scenario

```text
Gateway latency increases
Threads block waiting
```

---

### Problem

```text
Thread pool exhausted → system slowdown
```

---

### Solution

- **Timeouts**
- **Circuit breaker**
- **Bulkhead isolation**

---

## 9. Case 7 — Schema Change Breaks Clients

---

### Scenario

```text
API field removed or type changed
```

---

### Problem

- client parsing fails

---

### Solution

- **Backward compatibility**
- **API versioning**
- **Feature flags for rollout**

---

## 10. Case 8 — Bad Deployment Breaks Flow

---

### Scenario

```text
New confirm flow deployed
Bug in production
```

---

### Risk

- large-scale payment failures

---

### Solution

- **Feature flags** → disable quickly
- **Canary rollout** → limited exposure
- **Monitoring & alerts**

---

## 11. Case 9 — Data Growth Degrades Performance

---

### Scenario

```text
Idempotency table grows indefinitely
```

---

### Problem

- slow queries
- increased latency

---

### Solution

- **TTL + cleanup jobs**
- **indexing**

---

## 12. Case 10 — Missing Observability

---

### Scenario

```text
System failure but no logs/metrics
```

---

### Problem

- cannot debug
- long recovery time

---

### Solution

- **logs + metrics + tracing**
- correlation IDs

---

## 13. Cross-Cutting Patterns (Summary)

---

| Problem             | Solution        |
| ------------------- | --------------- |
| Duplicate execution | Idempotency     |
| Temporary failures  | Retry + Backoff |
| Dependency failure  | Circuit Breaker |
| Unknown state       | Reconciliation  |
| Traffic spikes      | Rate Limiting   |
| Breaking changes    | Versioning      |
| Risky deployments   | Feature Flags   |
| Debugging issues    | Observability   |

---

## 14. Mental Model

---

```text
Failure → Detection → Containment → Recovery → Observability
```

---

👉 Every robust system follows this loop.

---

## 15. Design Insight

---

> 🧠 **Failures are not edge cases — they are the main cases in distributed systems.**

---

A strong design:

- anticipates failures
- limits impact
- recovers safely

---

## Conclusion

---

These case studies show how all system design components work together:

- correctness (idempotency)
- resilience (retry, breaker)
- recovery (reconciliation)
- safety (versioning, flags)
- visibility (observability)

---

### 🔗 What’s Next?

👉 **[Final Summary & System Recap →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/summary)**

---

> 📝 **Takeaway**:
>
> - Design for failure from day one
> - Combine multiple patterns to handle real-world issues
> - Always ensure safe recovery paths
> - Observability is essential for managing failures
