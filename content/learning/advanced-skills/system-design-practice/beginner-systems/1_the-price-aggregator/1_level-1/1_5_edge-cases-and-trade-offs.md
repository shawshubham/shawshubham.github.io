---
title: "Level 1 — Edge Cases & Trade-offs"
description: "Handle edge cases and understand trade-offs in the PriceTracker design, including validation, precision, and time vs memory considerations."
keywords:
  - price tracker edge cases
  - moving average edge cases
  - system design trade-offs
  - prefix sum vs naive
  - interview preparation backend
weight: 5
layout: "topic-content"
---

## 1. Why Edge Cases Matter

---

A solution is not complete until it handles **unhappy paths** and **real-world constraints**.

In interviews, edge cases are where candidates usually get evaluated for **depth of thinking**.

> 📝 **Key Point:**  
> Correct logic is expected. Handling edge cases is what differentiates strong candidates.

---

## 2. Edge Case 1 — `k <= 0`

---

```text
getMovingAverage(0)
getMovingAverage(-5)
```

These are invalid requests.

### Decision

```java
throw new IllegalArgumentException("k must be greater than 0");
```

---

## 3. Edge Case 2 — No Prices Available

---

```text
getMovingAverage(5) → ? (when no prices added)
```

### Decision

```java
throw new IllegalStateException("No prices available");
```

---

## 4. Edge Case 3 — `k > available prices`

---

```text
prices = [100, 200]
getMovingAverage(5)
```

### Decision

Use all available prices.

```text
(100 + 200) / 2 = 150
```

### Implementation

```java
int count = Math.min(k, prices.size());
```

---

## 5. Edge Case 4 — Negative Price Input

---

```text
addPrice(-100)
```

In most trading systems, price cannot be negative.

### Decision

```java
throw new IllegalArgumentException("price must be greater than or equal to 0");
```

---

## 6. Edge Case 5 — Precision Handling

---

The problem uses:

```java
addPrice(double price)
```

But floating-point arithmetic can introduce inaccuracies.

Example:

```text
0.1 + 0.2 ≠ exactly 0.3
```

### Options

1. `double` (simple, but imprecise)
2. `BigDecimal` (precise, but heavier)
3. scaled `long` (store in cents, e.g., 123.45 → 12345)

### Decision (Level 1)

- Use `double` for simplicity
- Use `BigDecimal` only during division/rounding

> 🧠 In production systems, prefer `BigDecimal` or scaled `long`.

---

## 7. Trade-off 1 — Naive vs Optimized

---

| Approach   | addPrice | getMovingAverage | Space |
| ---------- | -------- | ---------------- | ----- |
| Naive      | O(1)     | O(k)             | O(n)  |
| Prefix Sum | O(1)     | O(1)             | O(n)  |

### Insight

- Naive → simple but slow for large `k`
- Prefix sum → fast queries, avoids repeated computation

---

## 8. Trade-off 2 — Variable `k` vs Fixed Window

---

### Variable `k` (our current design)

```text
getMovingAverage(5)
getMovingAverage(100)
getMovingAverage(1000)
```

✔ Best handled using **prefix sums**

---

### Fixed Window (alternative problem)

```text
Always last 100 prices
```

✔ Better handled using:

- queue (sliding window)
- running sum

---

### Key Insight

```text
Variable k → Prefix Sum
Fixed window → Queue + Running Sum
```

---

## 9. Trade-off 3 — Time vs Memory

---

Prefix sum improves time complexity but increases memory usage:

```text
Time: O(1)
Space: O(n)
```

### Implication

- Faster queries
- Memory grows with number of prices

---

## 10. Interview Summary

---

In an interview, you can summarize like this:

> “I’ve handled edge cases such as invalid `k`, no data, and negative inputs. I also ensured that when `k` is larger than available data, we gracefully fallback to available values. From a design perspective, I discussed precision handling and the trade-off between naive and prefix sum approaches. Prefix sum gives `O(1)` query time at the cost of `O(n)` space.”

---

## Conclusion

---

Handling edge cases ensures the solution is robust.

Understanding trade-offs ensures the solution is scalable.

Together, they elevate a basic solution into a **production-ready design mindset**.

---

### 🔗 What’s Next?

Level 1 is now complete.

👉 Next: **[Level 2 — Concurrency & Thread Safety →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/2_level-2/2_1_problem_evolution/)**

---

> 📝 **Takeaway**:
>
> - Always validate inputs
> - Think about empty and boundary conditions
> - Understand precision limitations
> - Know when to trade memory for performance
> - Communicate trade-offs clearly in interviews
