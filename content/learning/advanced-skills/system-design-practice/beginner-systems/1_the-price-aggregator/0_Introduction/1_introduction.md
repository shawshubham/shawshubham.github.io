---
title: "Design a Price Aggregator"
description: "Learn how to approach layered system design problems by evolving from a simple algorithm to a production-ready system."
keywords:
  - price aggregator design
  - moving average system design
  - system design practice
  - concurrency design
  - trading systems backend
  - system design interview
weight: 1
layout: "topic-content"
---

## 1. What is a Price Aggregator?

---

A Price Aggregator is a system that continuously receives **price updates (ticks)** for financial instruments and computes derived values such as **moving averages**.

It acts as a core building block for:

- trading dashboards
- risk management systems
- algorithmic trading strategies

At a high level, the system:

- ingests a stream of price updates
- maintains a rolling window of recent data
- computes aggregates efficiently

> 📝 **Key Point:**  
> This is not just a data structure problem — it is a **real-time, performance-critical system**.

---

## 2. Why This Problem Matters

---

On the surface, calculating a moving average seems simple.

However, in real-world systems:

- data arrives at **extremely high frequency**
- multiple components access the data concurrently
- latency requirements are strict

This introduces key challenges:

- **Performance** → naive solutions do not scale
- **Concurrency** → multiple readers and writers
- **Correctness** → financial calculations must be precise

> 📝 In simple terms:  
> The challenge is not computing an average — it is computing it **efficiently, safely, and at scale**.

---

## 3. Problem Statement

---

Design a class `PriceTracker` that supports the following operations:

- `addPrice(price)` → record a new price update
- `getMovingAverage(k)` → return the average of the last **k prices**

The system should:

- process a continuous stream of prices
- efficiently compute moving averages
- avoid unnecessary recomputation

---

## 4. What Makes This Problem Interesting?

---

This problem represents a **layered system design exercise**.

We start with a simple class and progressively evolve it into a production system.

Real-world challenges include:

- handling large volumes of incoming ticks
- avoiding repeated computation
- ensuring thread-safe updates
- scaling across multiple machines

> ❗ **How do we design a system that remains fast, correct, and scalable under continuous data flow?**

---

## 5. How This Practice Is Structured

---

We will approach this problem in **three levels**, each representing a deeper layer of engineering.

### Level 1 — Algorithmic Baseline (LLD)

- understand the problem clearly
- implement a correct solution
- identify inefficiencies and optimize them

👉 _How do we solve the problem efficiently?_

---

### Level 2 — Concurrency (Thread Safety)

- multiple producers (price feeds)
- multiple consumers (readers)
- race conditions and synchronization

👉 _How does the system behave under concurrent access?_

---

### Level 3 — System Design (HLD)

- high-throughput streaming (ticks)
- distributed systems
- fault tolerance and recovery

👉 _How does this system work in production at scale?_

---

## 6. How to Approach This Problem (Interview Thinking)

---

In real interviews, the problem may not be clearly classified.

> ❗ You are expected to **detect and guide the direction**.

### Step 1 — Clarify Scope

Ask early:

- Is this expected as a coding solution or system design?
- Should I start with a class-level implementation?

---

### Step 2 — Propose a Structured Approach

You can say:

> “I’ll start with a simple implementation, then optimize it, then discuss concurrency and scaling—does that work?”

---

### Step 3 — Evolve the Solution

```text
Understand → Naive → Optimize → Concurrency → Scale
```

---

> 💡 **Interview Tip:**  
> Strong candidates don’t jump to the final answer — they **evolve the solution step by step**.

---

## 7. Industrial Context (Why This Matters)

---

In trading systems:

- price updates can exceed **100,000 per second**
- latency must be extremely low
- even small errors can have financial impact

> ❗ A simple “moving average” becomes a **critical real-time computation problem**.

---

## Conclusion

---

This problem demonstrates how a simple requirement can evolve into a complex system.

It combines:

- data structures
- performance optimization
- concurrency handling
- distributed system thinking

---

### 🔗 What’s Next?

Let’s begin with the foundation.

👉 **[Level 1: The Algorithmic Baseline →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/1_level-1/1_1_problem-statement)**

---

> 📝 **Takeaway**:
>
> - Start simple, then optimize
> - Handle concurrency carefully
> - Think beyond code into system behavior
> - Structured thinking is key in interviews
