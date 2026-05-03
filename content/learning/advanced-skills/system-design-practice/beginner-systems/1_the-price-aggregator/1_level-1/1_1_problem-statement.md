---
title: "Level 1 - Problem Statement"
description: "Understand the Price Aggregator problem in an interview-style format before moving to solution approaches."
keywords:
  - problem statement
  - price aggregator design
  - moving average system design
  - system design practice
  - concurrency design
  - trading systems backend
  - system design interview
weight: 1
layout: "topic-content"
---

## 1. Problem Statement

---

You are building a monitoring component for a trading system that receives a continuous stream of **price updates (ticks)** for a stock.

Design a class `PriceTracker` that supports the following operations:

- `addPrice(double price)` → Record a new incoming price
- `getMovingAverage(int k)` → Return the average of the **last k prices received**

---

## 2. Requirements

---

Your implementation should:

- Handle a continuous stream of price updates
- Efficiently compute the moving average for the last **k elements**
- Avoid unnecessary recomputation for every query

---

## 3. Example

---

```text
addPrice(10)
addPrice(20)
addPrice(30)

getMovingAverage(2) → (20 + 30) / 2 = 25
getMovingAverage(3) → (10 + 20 + 30) / 3 = 20
```

---

## 4. Constraints & Expectations

---

- The number of incoming prices can be large (high-frequency data stream)
- `getMovingAverage(k)` should be efficient even for large values of `k`
- Memory usage should be controlled — avoid storing unnecessary data

---

## 5. Interview Context

---

In a real interview, this problem may evolve in multiple directions:

- optimizing performance (time complexity)
- handling concurrent updates and reads
- scaling the system to handle high throughput

For now, focus only on:

> ❗ Understanding the problem clearly before jumping into implementation

---

## Next Step

---

Start by thinking about the problem and asking clarification questions before designing the solution.

👉 **[Level 1: Requirement Clarificaition Questions →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/1_level-1/1_2_requirement-clarification/)**
