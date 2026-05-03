---
title: "Level 1 - Requirements & Clarification"
description: "Understand and clarify the Price Aggregator requirements before designing the solution, including k behavior, storage assumptions, precision, and scope."
keywords:
  - requirement clarification
  - price aggregator design
  - moving average problem
  - system design practice
  - interview preparation
weight: 2
layout: "topic-content"
---

## 1. Why Clarification Matters

---

Before jumping into code, we should clarify the requirements.

In interviews, this shows that we are not blindly implementing the first thing that comes to mind.

> 📝 **Key Point:**  
> Good candidates solve the problem. Strong candidates first make sure they are solving the right problem.

---

## 2. Clarification Questions (Interview Conversation)

---

### Q1 — What if `k` is greater than available prices?

**You:** If fewer than `k` prices have been received, what should `getMovingAverage(k)` return?

```text
addPrice(10)
addPrice(20)
getMovingAverage(5) → ?
```

**Interviewer:** Return the average of whatever data is available.

**Decision:**

```text
getMovingAverage(5) with [10, 20] → 15
```

---

### Q2 — Is this in-memory or database-backed?

**You:** Should I treat this as an in-memory class, or is the data coming from a database/external source?

**Interviewer:** For now, assume it’s an in-memory class.

**Implication:**

- `addPrice(...)` updates local data structures
- `getMovingAverage(...)` reads from local memory
- no DB/API concerns in Level 1

---

### Q3 — How should we handle financial precision?

**You:** The method uses `double`. In financial systems, should we use `BigDecimal` or scaled `long` instead?

**Interviewer:** For this round, you can keep `double`, but call out the trade-off.

**Decision:**

- Use `double` for implementation
- Mention production alternatives: `BigDecimal` or scaled `long` (e.g., `123.45 → 12345`)

---

### Q4 — Is this only a class or a full API?

**You:** Should I design just a class, or a full API/service?

**Interviewer:** Start with a class. We can evolve it later.

**Decision:**

- Implement `PriceTracker` as a class
- Defer APIs/services to later levels

---

### Q5 — Can `k` vary per request?

**You:** Will `k` be fixed, or can it vary across calls?

**Interviewer:** Assume it can vary.

**Implication:**

- Must support queries like `k = 5, 100, 1000`
- Design should handle variable window sizes efficiently

---

### Q6 — What about invalid `k` values?

**You:** What should we do for `k <= 0`?

**Interviewer:** Treat it as invalid input.

**Decision:**

- Throw `IllegalArgumentException` for `k <= 0`

---

## 3. Final Assumptions for Level 1

---

For Level 1, we will assume:

- the solution is an **in-memory class**
- `k` can vary per request
- if `k` is greater than available prices, use all available prices
- if `k <= 0`, throw an exception
- keep the provided `double` signature for now
- discuss financial precision as a trade-off
- ignore concurrency for now

---

## 9. Interview-Style Summary

---

In an interview, you could say:

> “Before implementing, I’d like to clarify a few things: if `k` is larger than the number of prices, should we average whatever is available? Is this expected to be an in-memory class or backed by a database? Also, since this is financial data, should we keep the given `double` signature for simplicity, or should we use `BigDecimal` / scaled long values for precision? Finally, can `k` vary per request?”

---

## Conclusion

---

Clarifying requirements helps us avoid designing the wrong solution.

For now, we will focus on a clean in-memory implementation and handle advanced concerns like concurrency, APIs, and distributed scaling in later levels.

---

### 🔗 What’s Next?

👉 **[Naive Approach →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/1_level-1/1_3_naive-implementation/)**

---

> 📝 **Takeaway**:
>
> - Clarify edge cases before coding
> - Confirm whether the problem is class-level or system-level
> - Financial precision should be discussed even if the signature uses `double`
> - The assumptions define the solution direction
