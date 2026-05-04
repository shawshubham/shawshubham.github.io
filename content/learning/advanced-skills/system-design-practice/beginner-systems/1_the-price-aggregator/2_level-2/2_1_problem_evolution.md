---
title: "Level 2 — Problem Evolution: Concurrency & Thread Safety"
description: "Understand how the PriceTracker breaks under concurrent access and why thread-safety becomes critical in real-world systems."
keywords:
  - concurrency problem evolution
  - thread safety java
  - race conditions example
  - system design concurrency
  - price aggregator concurrency
weight: 1
layout: "topic-content"
---

## 1. Why Concurrency Matters

---

So far, we have designed a solution that works correctly in a **single-threaded environment**.

However, real-world systems are rarely single-threaded.

In a trading system:

- multiple **price feeds** may push updates simultaneously
- multiple **clients (UI / risk systems)** may query data at the same time

> ❗ This means `addPrice()` and `getMovingAverage()` can be called concurrently.

---

## 2. Problem Evolution

---

Let’s evolve the problem:

> “Now assume 50 threads are calling `addPrice()` and 100 threads are calling `getMovingAverage()` at the same time.”

At this point, our Level 1 solution is no longer safe.

---

## 3. What Breaks in Our Current Design?

---

Our current implementation uses:

```java
List<Double> prices;
List<BigDecimal> prefixPriceSums;
```

These are **not thread-safe**.

---

### Problem 1 — Race Conditions

---

Consider two threads executing `addPrice()`:

```text
Thread A → reads last prefix sum
Thread B → reads same last prefix sum
Thread A → writes new prefix sum
Thread B → writes new prefix sum
```

👉 One update is lost.

---

### Problem 2 — Data Inconsistency

---

Our logic depends on:

```text
prefix[n] = prefix[n-1] + price
```

If operations interleave incorrectly, the prefix sum chain breaks.

Example:

```text
Expected:
[0, 100, 200, 300]

Actual (due to race):
[0, 100, 200, 200]
```

👉 Now all future calculations are wrong.

---

### Problem 3 — Non-Atomic Operations

---

This line looks simple:

```java
prefixPriceSums.add(...)
```

But internally it involves multiple steps:

1. read last value
2. compute new value
3. append to list

👉 These steps are not atomic.

---

### Problem 4 — Visibility Issues

---

Even if one thread updates the list, another thread may not immediately see the updated value.

This happens due to:

- CPU caching
- Java Memory Model behavior

👉 Leads to stale reads.

---

### Problem 5 — Concurrent Reads During Writes

---

While one thread is updating:

```java
prefixPriceSums.add(...)
```

Another thread may execute:

```java
getMovingAverage(k)
```

👉 It may read:

- partially updated data
- inconsistent prefix values

---

## 4. Example Scenario (Critical)

---

```text
Initial:
prefix = [0, 100]

Thread A → addPrice(50)
Thread B → addPrice(60)
```

Execution:

```text
Thread A reads 100
Thread B reads 100

Thread A writes 150
Thread B writes 160
```

Final state:

```text
prefix = [0, 100, 150, 160]
```

👉 Correct value should have been:

```text
[0, 100, 150, 210]
```

---

## 5. Why This Is Dangerous

---

In a trading system:

- incorrect averages → wrong signals
- wrong signals → financial loss

> ❗ Concurrency bugs are not just technical issues — they have real-world impact.

---

## 6. Summary of Issues

---

| Problem Type       | Impact                |
| ------------------ | --------------------- |
| Race condition     | Lost updates          |
| Data inconsistency | Incorrect prefix sums |
| Non-atomic ops     | Partial updates       |
| Visibility issues  | Stale reads           |

---

## 7. Interview Question

---

At this point, the interviewer will ask:

> ❓ “How would you make this implementation thread-safe?”

---

## Conclusion

---

Our Level 1 solution is correct **only in a single-threaded environment**.

Once concurrency is introduced, it becomes:

```text
Incorrect + unsafe
```

---

### 🔗 What’s Next?

👉 **[Making It Thread-Safe →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/2_level-2/2_2_making-thread-safe/)**

---

> 📝 **Takeaway**:
>
> - Code that works in isolation can break under concurrency
> - Prefix sum logic is especially sensitive to race conditions
> - Thread-safety must be explicitly designed
