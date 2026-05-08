---
title: "Phase 2 — Problem Evolution (Why Concurrency Matters)"
description: "Understand how a correct rate limiter breaks under concurrent access and why atomicity is critical in multi-threaded systems."
keywords:
  - rate limiter concurrency
  - race condition example
  - thread safety system design
  - atomic operations
  - system design interview
weight: 1
layout: "topic-content"
---

## 1. From Correct Logic to Real-World Systems

---

In Phase 1, we built a correct rate limiter using different algorithms.

Those implementations assumed:

```text
Single-threaded execution
```

Which means:

```text
Only one request is processed at a time
```

---

> 📝 **Reality Check:**  
> In production systems, thousands of requests can hit the rate limiter **simultaneously**.

---

## 2. What Changes in Phase 2?

---

We move from:

```text
Correct logic
```

to:

```text
Correct behavior under concurrency
```

---

## 3. The Core Problem

---

Consider this logic from our Sliding Window implementation:

```text
1. Read current request count
2. Check if limit is exceeded
3. Add new request
```

This is a **multi-step operation**.

---

### ❗ Problem: Not Atomic

These steps are not executed as a single unit.

```text
read → check → update
```

Between these steps, another thread can modify the state.

---

## 4. Race Condition Example

---

Assume:

```text
Limit = 100 requests
Current count = 99
```

Two threads arrive at the same time:

```text
Thread A → sees count = 99
Thread B → sees count = 99
```

---

### What happens next?

```text
Thread A → allows request → count becomes 100
Thread B → allows request → count becomes 101 ❌
```

---

### Result

```text
We allowed more requests than the limit
```

This is called a:

```text
Race Condition
```

---

## 5. Why This Happens

---

Because multiple threads are:

```text
- reading shared state
- modifying shared state
- without coordination
```

---

### Key Issue

```text
No synchronization
No atomicity
```

---

## 6. Where This Appears in Our Code

---

In Sliding Window Log:

```text
- remove expired timestamps
- check queue size
- add new timestamp
```

All of these together form one logical operation.

---

But in a multi-threaded environment:

```text
Thread A modifies queue
Thread B reads stale data
Thread C updates simultaneously
```

👉 This leads to inconsistent results.

---

## 7. Key Concept — Atomicity

---

To fix this, we need:

```text
Atomic operations
```

---

### Definition

```text
An operation is atomic if it is executed completely or not at all,
with no interference from other threads.
```

---

### In our case

```text
read → check → update
```

must become:

```text
one atomic operation
```

---

## 8. What We Will Do Next

---

In the next articles, we will:

```text
1. Make the rate limiter thread-safe using synchronized
2. Improve concurrency using locks
3. Explore atomic operations and their limitations
4. Understand trade-offs between performance and correctness
```

---

## 9. Important Scope Clarification

---

In this phase, we are still working within:

```text
Single-node system
```

We are NOT solving:

```text
❌ distributed rate limiting
❌ Redis-based coordination
❌ multiple server consistency
```

That will be handled in Phase 3.

---

## 10. Interview Explanation

---

> “In a single-threaded environment, our rate limiter works correctly. However, in real systems, multiple threads can call the limiter simultaneously. Since our logic involves multiple steps—read, check, and update—it is not atomic. This leads to race conditions where more requests than allowed can pass through. To fix this, we need to make the operations thread-safe using synchronization or locking mechanisms.”

---

## Conclusion

---

Correct logic is not enough.

In concurrent systems, we must ensure:

```text
correctness under simultaneous access
```

---

### 🔗 What’s Next?

👉 **[Making the Rate Limiter Thread-Safe (synchronized) →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/2_phase-2/2_2_thread-safe-using-synchronized/)**

---

> 📝 **Takeaway**:
>
> - Single-threaded correctness is not enough
> - Multi-step operations cause race conditions
> - Atomicity is critical for correctness
> - Concurrency control is required before scaling systems
