---
title: "Example 1: Simple Web System — Early Scaling Signals & Limitations"
description: "Identify early scaling signals and limitations in a simple web system, and learn when architectural evolution becomes necessary."
keywords:
  - system design scaling
  - early scaling signals
  - hld limitations
  - when to scale systems
  - system design fundamentals
weight: 5
date: 2026-02-19
layout: "topic-content"
---

## 1. Introduction

---

A good High-Level Design does not stop at **what works today**.

It also asks:

- _Where will this system start to struggle?_
- _What signals tell us it’s time to evolve the architecture?_

In this article, we examine the **limitations** of our Simple Web System and identify the **early scaling signals** that indicate when changes are needed.

This is a crucial skill in system design:  
**knowing when to change — and when not to.**

---

## 2. Recap: Our Current Architecture

---

Our baseline system consists of:

- a stateless application server
- a single database
- synchronous request processing
- a monolithic, layered application

This design is intentionally simple and correct for early-stage systems.

---

## 3. Early Scaling Signals

---

As usage grows, the system will begin to show **observable symptoms**.

These signals appear **before** the system completely breaks.

### 3.1 Increased Response Time

#### What You’ll Notice

- Pages load more slowly
- API responses take longer under load

#### Why It Happens

- application server handles more concurrent requests
- database becomes a shared bottleneck

#### What This Signals

- need for horizontal scaling
- need to separate read-heavy traffic

---

### 3.2 Application Server Resource Saturation

#### What You’ll Notice

- CPU or memory usage spikes
- request queues start building up

#### Why It Happens

- single application instance processes all traffic
- synchronous request handling blocks threads

#### What This Signals

- need for multiple application instances
- introduction of a load balancer

---

### 3.3 Database Bottlenecks

#### What You’ll Notice

- slow queries
- increased connection wait times
- database CPU or I/O saturation

#### Why It Happens

- all reads and writes hit the same database
- no caching layer exists

#### What This Signals

- need for caching
- potential read replicas later

---

### 3.4 Reduced Availability

#### What You’ll Notice

- system goes down during deployments
- single instance failure affects all users

#### Why It Happens

- single application server
- single database instance

#### What This Signals

- need for redundancy
- fault isolation

---

### 3.5 Deployment Friction

#### What You’ll Notice

- deployments cause downtime
- rollbacks are risky

#### Why It Happens

- monolithic deployment unit
- no redundancy

#### What This Signals

- need for multiple instances
- gradual deployment strategies (later phases)

---

## 4. Why We Do NOT Fix These Yet

---

It is tempting to solve all these problems immediately.

But doing so too early:

- increases complexity
- slows development
- introduces operational burden

At this stage:

- the system still meets requirements
- complexity would be premature

Good design evolves **in response to real pressure**, not anticipation.

---

## 5. Design Philosophy: Signals Before Solutions

---

A core HLD principle emerges here:

> **We scale systems when signals appear — not before.**

This prevents:

- unnecessary abstractions
- wasted effort
- brittle architectures

---

## 6. What This Phase Has Taught Us

---

By reaching these limitations, we now:

- understand where systems break first
- can justify future architectural changes
- have a concrete reason to introduce new components

This prepares us perfectly for the next phase.

---

## Conclusion

---

In this article, we:

- identified early scaling signals
- understood why the baseline system will struggle
- resisted premature optimization

Recognizing limitations is just as important as designing solutions.

---

### 🔗 What’s Next?

The scaling signals we identified now demand **architectural evolution**.

In the next phase, we will redesign this system to:

- handle heavy read traffic
- improve performance
- scale horizontally

👉 **Next Phase:**  
**Phase 2 — Scaling for Reads: Designing a News Feed System**

---

> 📝 **Takeaway**:
>
> - Every architecture has limits — even good ones.
> - Scaling signals appear gradually, not suddenly.
> - Premature optimization is a design smell.
> - Constraints drive architecture evolution.
