---
title: "Phase 2 — Trade-offs & Design Decisions"
description: "Compare concurrency strategies for rate limiters and understand how to choose between correctness, performance, and complexity in real-world systems."
keywords:
  - rate limiter trade offs
  - concurrency design decisions
  - synchronized vs locks vs atomic
  - system design interview
  - backend concurrency patterns
weight: 5
layout: "topic-content"
---

## 1. Why This Article Matters

---

In Phase 2, we explored multiple ways to make the rate limiter thread-safe.

Each approach solved correctness, but introduced different trade-offs.

> 📝 **Goal:**  
> Understand how to choose the right approach based on system requirements.

---

## 2. What We Solved So Far

---

We started with an unsafe implementation and improved it step by step:

```text
Naive → Race Condition
synchronized → Correct but slow
Per-client locking → Better concurrency
Atomic operations → Limited applicability
```

---

## 3. The Core Trade-off

---

All concurrency decisions revolve around this:

```text
Correctness vs Performance vs Complexity
```

---

## 4. Approach Comparison

---

### 1. Global Lock (`synchronized`)

```text
✔ Correct
✔ Simple
❌ Low throughput
❌ All clients block each other
```

---

### 2. Fine-Grained Locking (Per Client)

```text
✔ Correct
✔ Higher throughput
✔ Independent clients run in parallel
❌ Extra memory (locks per client)
❌ Slightly more complex
```

---

### 3. Atomic Operations

```text
✔ High performance
✔ Lock-free
❌ Not suitable for multi-step logic
❌ Hard to reason about correctness
```

---

## 5. Decision Matrix

---

| Requirement                  | Recommended Approach |
| ---------------------------- | -------------------- |
| Low traffic                  | synchronized         |
| Moderate traffic             | per-client locking   |
| High performance requirement | atomic (if possible) |
| Complex multi-step logic     | locking required     |

---

## 6. Real-World Thinking

---

In production systems, we rarely jump directly to the most complex solution.

Instead, we evolve:

```text
Step 1 → Make it correct
Step 2 → Identify bottlenecks
Step 3 → Optimize selectively
```

---

### Example

```text
Start → synchronized
High latency observed → move to per-client locking
Extreme scale → consider lock-free or distributed design
```

---

## 7. Hidden Trade-offs

---

### Memory vs Concurrency

```text
Per-client locking → more memory
Global lock → less memory
```

---

### Simplicity vs Performance

```text
synchronized → simple but slow
locks → faster but complex
```

---

### Correctness vs Optimization

```text
Always prioritize correctness first
```

---

## 8. What Interviewers Look For

---

They do NOT expect you to jump to the perfect solution immediately.

They expect:

```text
✔ Identify the problem (race condition)
✔ Apply a simple fix (synchronized)
✔ Improve it (fine-grained locking)
✔ Discuss trade-offs
```

---

## 9. Interview Explanation

---

> “I would first ensure correctness using synchronized. This guarantees atomicity but limits concurrency because all clients share the same lock. To improve throughput, I would introduce fine-grained locking per client, allowing independent clients to be processed in parallel. Atomic operations can help in simple cases, but since rate limiting involves multi-step logic, locks are still required. The final choice depends on traffic patterns, performance requirements, and system complexity.”

---

## 10. What We Are Still Missing

---

So far, everything is:

```text
Single-node
```

But real systems are:

```text
Distributed
```

Problems we have NOT solved:

```text
❌ multiple instances
❌ shared state across servers
❌ consistency across nodes
```

---

## Conclusion

---

There is no one-size-fits-all solution.

Good system design is about choosing the right trade-off:

```text
correctness → performance → scalability
```

---

### 🔗 What’s Next?

👉 **Phase 3 — Distributed Rate Limiting →**

---

> 📝 **Takeaway**:
>
> - Start with correctness, then optimize
> - Use synchronized for simplicity
> - Use per-client locking for better concurrency
> - Atomic operations are limited to simple cases
> - Always reason about trade-offs before choosing a design
