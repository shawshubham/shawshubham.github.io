---
title: "Phase 2 — Atomic Operations & Their Limitations"
description: "Understand what atomic operations are, how they help in concurrent systems, and why they are not sufficient for compound rate limiting logic."
keywords:
  - atomic operations java
  - compare and set
  - concurrenthashmap limitations
  - rate limiter concurrency
  - system design interview
weight: 4
layout: "topic-content"
---

## 1. Why Talk About Atomic Operations?

---

So far in Phase 2, we solved concurrency using:

```text
- synchronized (global lock)
- per-client locks (fine-grained locking)
```

These approaches ensure correctness, but they introduce **locking overhead**.

---

> 📝 **Goal:**  
> Explore whether we can avoid locks using atomic operations.

---

## 2. What Are Atomic Operations?

---

An atomic operation is one that:

```text
- executes completely
- cannot be interrupted
- is thread-safe by itself
```

---

### Example

```java
AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet(); // atomic
```

This ensures that:

```text
Multiple threads can safely update the value
```

---

## 3. Compare-And-Set (CAS)

---

Atomic classes in Java use a technique called:

```text
Compare-And-Set (CAS)
```

---

### How it works

```text
1. Read current value
2. Try to update it only if it has not changed
3. If changed → retry
```

---

### Example

```java
AtomicInteger counter = new AtomicInteger(100);

boolean success = counter.compareAndSet(100, 101);
```

---

### Benefit

```text
Lock-free thread safety
```

---

## 4. Can We Use AtomicInteger for Rate Limiting?

---

At first glance, it looks promising.

We can try:

```text
clientId → AtomicInteger counter
```

Then:

```text
if counter < limit → increment → allow
```

---

## 5. The Real Problem — Compound Operations

---

Rate limiting is not a single operation.

It involves multiple steps:

```text
1. Cleanup old entries (time window)
2. Read current count
3. Check against limit
4. Update state
```

---

### ❗ Key Issue

```text
AtomicInteger only makes ONE operation atomic
```

But we need:

```text
MULTIPLE operations to be atomic together
```

---

## 6. Example — Why AtomicInteger Fails

---

Assume:

```text
Limit = 100
Current count = 99
```

We use:

```java
if (counter.get() < limit) {
    counter.incrementAndGet();
    return true;
}
```

### Step-by-step execution

Two threads arrive at the same time:

```text
Thread A → counter.get() → 99
Thread B → counter.get() → 99
```

Both evaluate:

```text
99 < 100 → true
```

#### Both proceed to increment

```text
Thread A → increment → counter = 100
Thread B → increment → counter = 101 ❌
```

#### Final result

```text
counter = 101
Allowed requests = 2
But only 1 request should have been allowed
```

### ❗ What actually went wrong?

AtomicInteger guarantees:

```text
✔ get() is atomic
✔ incrementAndGet() is atomic
```

But it does NOT guarantee:

```text
❌ (get < limit) + increment happens atomically
```

### 🔥 Core Issue

This logic is a **compound operation**:

```text
1. Read value
2. Check condition
3. Update value
```

These steps can interleave across threads:

```text
Thread A → reads 99
Thread B → reads 99
Thread A → increments
Thread B → increments
```

> **🧠 Key Insight:**
>
> AtomicInteger protects single operations,  
> but NOT multi-step business logic

---

## 7. What About ConcurrentHashMap?

---

`ConcurrentHashMap` provides thread-safe operations like:

```java
computeIfAbsent()
put()
get()
```

---

### But it does NOT solve this

```text
get → modify → put
```

Because this is still a compound operation.

---

> 🧠 **Important Insight:**  
> Thread-safe collections protect individual operations, not your business logic.

---

## 8. Where Atomic Operations Help

---

Atomic operations are useful when:

```text
- single value update is enough
- no multi-step logic required
```

---

### Example — Token Bucket (partial fit)

```text
tokens = tokens + refill
if tokens >= 1 → consume
```

Even here, multiple steps are involved, so full atomicity is still tricky.

---

## 9. Lock-Free vs Lock-Based

---

### Lock-Based (what we used)

```text
✔ simple
✔ correct
❌ blocking
```

---

### Lock-Free (atomic/CAS)

```text
✔ high performance
✔ non-blocking
❌ complex
❌ hard to guarantee correctness for compound logic
```

---

## 10. When to Use What?

---

### Use Locks When:

```text
- logic is multi-step
- correctness is critical
- system is not extremely high contention
```

---

### Use Atomic Operations When:

```text
- operations are simple (increment, set)
- high-performance systems required
- you can design around single-variable state
```

---

## 11. Interview Explanation

---

> “Atomic operations like AtomicInteger provide lock-free thread safety for single operations. However, rate limiting involves compound logic—cleanup, check, and update—which must be executed atomically together. Atomic variables alone cannot guarantee correctness in such cases. Therefore, we still need locks or other coordination mechanisms to protect the full operation.”

---

## Conclusion

---

Atomic operations are powerful, but they are not a silver bullet.

For rate limiting:

```text
correctness of multi-step logic > lock-free optimization
```

---

### 🔗 What’s Next?

👉 **[Phase 2 — Trade-offs & Design Decisions →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/2_phase-2/2_5_trade-offs-and-design-decision/)**

---

> 📝 **Takeaway**:
>
> - Atomic operations guarantee single-step safety
> - They do not protect multi-step business logic
> - Rate limiting requires atomicity across multiple steps
> - Locks remain necessary for correctness in most designs
