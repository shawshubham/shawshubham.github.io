---
title: "Introduction"
description: "Learn how systems evolve when traffic increases and read workloads dominate. This phase introduces techniques for improving performance and scalability."
keywords:
  - system scaling
  - high level design scaling
  - read heavy systems
  - caching and load balancing
weight: 1
date: 2026-03-06
layout: "topic-content"
---

## 1. Why This Phase Exists

---

In Phase 1, we designed a **simple web system** that handled requests correctly.

The architecture was intentionally simple:

- a monolithic application
- a single database
- synchronous communication

This architecture works well when traffic is low.

However, real systems eventually face **growing traffic and increased demand**.

When this happens, the system begins to experience new problems:

- slower response times
- database bottlenecks
- overloaded application servers

Phase 2 focuses on **how systems evolve when traffic increases**, particularly when systems experience **read-heavy workloads**.

---

## 2. Why Read Scaling Matters

---

Many large systems are dominated by **read operations**.

Examples include:

- social media feeds
- product catalogs
- news websites
- video platforms

In these systems:

```text
Reads >> Writes
```

Millions of users may request data simultaneously while only a small portion of users create new content.

This imbalance creates pressure on the system's architecture.

---

## 3. Example System in This Phase

---

To explore these challenges, we will design a **News Feed System**.

This system allows users to:

- view posts from other users
- scroll through a feed of content
- refresh frequently for updates

Because millions of users may read the feed simultaneously, the system must handle **extremely high read traffic**.

---

## 4. What We Will Learn

---

In this phase, we will explore techniques that improve system performance and scalability, including:

- load balancing
- caching strategies
- content delivery networks (CDNs)
- latency optimization
- consistency trade-offs

These techniques allow systems to handle large numbers of users without overwhelming the database or application servers.

---

## 5. Phase 2 Learning Goal

---

By the end of this phase, you should understand:

- why simple architectures struggle under heavy load
- how systems scale to support millions of users
- how caching and load balancing improve performance
- how scalability introduces new architectural trade-offs

---

### 🔗 What’s Next?

We begin by defining the **problem and requirements** for the new system.

👉 **Up Next →**  
**[Example 2: News Feed System — Problem & Requirements](/learning/advanced-skills/high-level-design/3_scaling-for-reads/3_2_problem-and-requirement)**
