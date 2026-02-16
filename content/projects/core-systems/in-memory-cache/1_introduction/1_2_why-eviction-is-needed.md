---
title: "In-Memory Cache — Why Eviction Is Needed"
description: "Understand why a bounded cache must evict entries, what eviction means, why random eviction fails, and what properties a good eviction policy must satisfy."
date: 2026-02-13
keywords:
  - projects
  - core-systems
  - cache
  - lru
  - lfu
  - concurrency
  - java
  - system-design
weight: 2
layout: "projects-topic-content"
---

## 1. The Core Constraint: Memory Is Finite

A cache exists to store data in memory for fast access — but memory is not unlimited.

If the cache grows without bounds:

- memory usage increases continuously
- latency becomes unstable (GC pressure in managed runtimes)
- the process risks out-of-memory failures
- overall system reliability degrades

So a production-grade cache must be **bounded**.

A bounded cache implies a hard truth:

> **When the cache is full, something must be removed.**

That removal process is called **eviction**.

---

## 2. What Eviction Means (In Practice)

Eviction is the cache’s mechanism for choosing **which entry to discard** when:

- a new key must be inserted, and
- capacity has already been reached.

Eviction is not a “nice to have”.  
It is the defining behavior of a bounded cache.

---

## 3. Why “Random Eviction” Is a Bad Idea

A naive approach might be:

> “If full, remove any random entry.”

That fails because caches work by exploiting _locality_:

- **Temporal locality:** recently accessed items are likely to be accessed again
- **Frequency locality:** frequently accessed items are likely to be accessed again

Random eviction ignores both.

### 3.1 What goes wrong with random eviction?

- You may evict the hottest key under load
- Hit-rate becomes unstable and hard to predict
- Performance improvements become accidental, not engineered
- Debugging becomes difficult: “Why did the cache stop helping?”

In short, random eviction makes cache performance **non-deterministic**.

---

## 4. What Properties a Good Eviction Policy Must Have

At this stage, we are not picking a specific policy yet.  
We are defining what “good” means.

### 1) Deterministic and explainable

Given the same access pattern, the cache should behave consistently.

### 2) Encourages high hit-rate

Eviction should preferentially remove entries that are:

- least likely to be reused soon, or
- contributing least to overall cache value

### 3) Efficient to maintain

Eviction should not make the cache slow.

A key engineering goal for this project is:

- `get()` should be fast
- `put()` should be fast
- eviction should not require scanning all keys

### 4) Testable

The eviction choice must be verifiable:

- unit tests should be able to assert which key gets evicted
- behavior should not depend on timing accidents

### 5) Stable under load

Under heavy traffic, eviction should not cause chaotic behavior:

- not thrash (evict and re-load the same items constantly)
- not degrade performance unpredictably

---

## The Natural Next Step

We have reached the key design question:

> **How do we define “least valuable entry” in a cache?**

There are multiple strategies to answer that question.

In the next chapter, we introduce two widely used eviction strategies conceptually and compare when each one works best — without writing code yet.
