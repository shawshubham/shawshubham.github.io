---
title: "Level 2 — Trade-offs & Advanced Considerations"
description: "Understand trade-offs between synchronization approaches, read vs write patterns, and practical concurrency considerations in the PriceTracker design."
keywords:
  - concurrency trade-offs
  - synchronized vs readwritelock
  - java concurrency design
  - system design trade-offs
  - backend performance considerations
weight: 3
layout: "topic-content"
---

## 1. Why Trade-offs Matter

---

At this stage, we already have a **correct thread-safe implementation**.

But in real systems, correctness alone is not enough.

We also need to think about:

- performance
- scalability
- contention
- system behavior under load

> 📝 **Key Point:**  
> Good engineers make systems work. Great engineers choose the right trade-offs.

---

## 2. Recap of Available Approaches

---

We explored three approaches:

1. `synchronized` methods
2. `synchronized` blocks
3. `ReentrantReadWriteLock`

---

## 3. `synchronized` vs `ReentrantLock`

---

Both provide **mutual exclusion**.

### `synchronized`

- built-in language feature
- simple to use
- automatically releases lock

### `ReentrantLock`

- more control (tryLock, fairness, interruptible)
- explicit lock/unlock

### Trade-off

```text
synchronized → simpler
ReentrantLock → more flexible but more code
```

In our problem, both behave similarly because both allow only **one thread at a time**.

---

## 4. `ReentrantLock` vs `ReentrantReadWriteLock`

---

### `ReentrantLock`

```text
Single lock for both read and write
```

- one reader blocks other readers
- writer blocks everyone

---

### `ReentrantReadWriteLock`

```text
Separate read and write locks
```

- multiple readers allowed simultaneously
- writers get exclusive access

---

### Trade-off

| Feature          | ReentrantLock | ReadWriteLock      |
| ---------------- | ------------- | ------------------ |
| Multiple readers | ❌ No         | ✅ Yes             |
| Write safety     | ✅ Yes        | ✅ Yes             |
| Complexity       | Medium        | Higher             |
| Best for         | balanced load | read-heavy systems |

---

## 5. Read-Heavy vs Write-Heavy Systems

---

### Read-heavy system

```text
many getMovingAverage calls
few addPrice calls
```

👉 Best choice:

```text
ReentrantReadWriteLock
```

---

### Write-heavy system

```text
frequent price updates
few reads
```

👉 Simpler approach is often enough:

```text
synchronized or ReentrantLock
```

---

### Balanced workload

👉 Either approach can work depending on contention.

---

## 6. Lock Contention

---

Lock contention happens when multiple threads compete for the same lock.

With `synchronized`:

```text
all threads wait in a single queue
```

With `ReadWriteLock`:

```text
readers can proceed in parallel
writers still block
```

---

## 7. Latency vs Throughput

---

### `synchronized`

- lower complexity
- higher latency under contention
- lower throughput

---

### `ReadWriteLock`

- better throughput for reads
- slightly higher complexity

---

## 8. Why Thread-Safe Collections Alone Are Not Enough

---

You might think of using:

```java
Collections.synchronizedList(...)
CopyOnWriteArrayList
ConcurrentLinkedQueue
```

These protect **individual operations**, but our logic is a **compound operation**:

```text
read prefix → compute → write prefix
```

Without a lock, this sequence can still break.

👉 So we still need explicit synchronization.

---

## 9. Can We Avoid Locks Completely?

---

In advanced systems, yes — using:

- lock-free algorithms
- atomic variables
- immutable snapshots

But these approaches are:

- complex
- error-prone
- hard to reason about

👉 Not expected in most interviews unless specifically asked.

---

## 10. Real-World System Thinking

---

In a real trading system, we might:

- separate write pipeline (price ingestion)
- maintain precomputed aggregates
- expose read-optimized views

Instead of sharing mutable structures directly.

---

## 11. Interview Answer Strategy

---

A strong answer sounds like this:

> “I would first ensure correctness using synchronized methods. Then I would analyze the workload. Since getMovingAverage is a read operation and likely to be called more frequently, I would switch to ReentrantReadWriteLock to allow multiple concurrent readers while still protecting writes.”

---

## 12. Summary

---

| Decision Area              | Recommendation        |
| -------------------------- | --------------------- |
| Simple correctness         | synchronized          |
| More control               | ReentrantLock         |
| Read-heavy workload        | ReadWriteLock         |
| Complex/high-scale systems | redesign architecture |

---

## Conclusion

---

Concurrency is not just about adding locks.

It is about:

```text
choosing the right locking strategy for the workload
```

---

### 🔗 What’s Next?

👉 **[Level 2 — Advanced: Lock-Free Thinking (Optional) →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/2_level-2/2_4_advanced-lock-free-approach/)**

👉 **Level 2 — Advanced Lock-Free Approach**

---

> 📝 **Takeaway**:
>
> - Start simple, then optimize
> - Understand read vs write patterns
> - Choose locks based on system behavior
> - Thread-safe collections are not enough for compound operations
