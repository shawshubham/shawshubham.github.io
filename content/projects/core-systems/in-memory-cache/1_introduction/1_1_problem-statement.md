---
title: "In-Memory Cache — Problem Statement"
description: "Define the real-world problem an in-memory cache solves, its constraints, and why we need a deliberate approach before choosing eviction strategies."
date: 2026-02-13
keywords:
  - projects
  - core-systems
  - cache
  - lru
  - lfu
  - concurrency
  - java
weight: 1
layout: "projects-topic-content"
---

## 1. Context

In many backend systems, the same pieces of data are requested repeatedly:

- user profiles
- permissions / entitlements
- reference data (currencies, countries, configs)
- product metadata
- frequently queried aggregates

If every request fetches this data from a database or remote service, latency and cost quickly become unacceptable.

This project starts from a simple request:

> **We need a fast, in-memory cache for frequently accessed data.**

At this stage, we intentionally avoid jumping to specific eviction algorithms.  
First we define the problem clearly — like a real engineering task.

---

## 2. Why Database / API Calls Are Expensive

Even in a well-designed system, database or remote API calls usually involve several layers of overhead:

### 1) Network latency (and variability)

- Requests leave the process boundary (often across machines)
- Latency is not just higher — it is less predictable (p95/p99 matter)

### 2) Serialization and protocol overhead

- HTTP/gRPC framing, encoding/decoding
- object mapping, validation, parsing

### 3) Contention and throughput limits

- Database connection pools
- shared DB resources (locks, IO, CPU)
- rate limits on external services

### 4) Failure amplification

- When the database/service is slow, callers queue up
- retries can cause cascading load (self-inflicted overload)

---

## 3. Why Memory Is Faster

Memory access stays inside the process boundary:

- no network hop
- no serialization cost
- minimal context switching
- predictable access patterns (especially for hot keys)

The goal of an in-memory cache is not “zero latency”.  
It is **lower, more predictable latency** and **reduced load** on downstream systems.

---

## 4. Constraints We Must Respect

A cache looks simple until you place real constraints on it.

### 1) Limited memory

A cache cannot grow forever.

- memory is a finite resource
- unbounded growth leads to GC pressure (in managed runtimes), OOM risk, and instability

So we must assume a **fixed capacity**.

### 2) Multiple threads

In real services, caches are accessed concurrently:

- many reads in parallel
- writes and updates happening simultaneously
- race conditions can corrupt internal state or return incorrect values

So we must assume **concurrent access** from day one.

### 3) Predictable behavior

When the cache is full, behavior must be deterministic.

- it must not “sometimes evict useful items”
- it must not degrade unpredictably under load
- it must be explainable and testable

So we need **a clear policy** for what happens when capacity is exceeded.

---

## 5. Project Scope (What We Mean by “In-Memory Cache”)

For this project, we are building an **in-process, in-memory cache**:

- running inside the application instance
- storing entries in memory
- providing fast reads/writes with bounded capacity

We are **not** building a distributed cache (like Redis) here.
That becomes a separate capstone because it introduces networking, replication, partitioning, and consistency concerns.

---

## 6. Success Criteria for This Project

By the end of this project, the cache should:

- provide fast access for hot data
- enforce a fixed capacity safely
- behave predictably under concurrency
- be extensible for different eviction policies
- be testable in a deterministic way

---

### 🔗 What’s Next?

We now have a bounded memory constraint.

The next logical question becomes:

> **When the cache is full, what should be removed — and why?**

Up next:  
**👉 [In-Memory Cache — Why Eviction Is Needed](/learning/intermediate-skills/problem-solving/2_problem-solving-core-patterns/2_4_stack-based-pattern)**  
In the next chapter, we define what eviction means, why random eviction is harmful, and what properties a good eviction policy should have.
