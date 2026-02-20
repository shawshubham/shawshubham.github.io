---
title: "Example 1: Simple Web System — Architecture Choices & Trade-offs"
description: "Understand the architectural choices made in a simple web system, the alternatives considered, and the trade offs involved in early High-Level Design decisions."
keywords:
  - architecture trade-offs
  - monolithic architecture
  - layered architecture
  - high level design decisions
  - system design fundamentals
weight: 4
date: 2026-02-19
layout: "topic-content"
---

## 1. Introduction

---

Designing a system is not about finding the _perfect_ architecture.

It is about choosing an architecture that:

- satisfies current requirements,
- respects constraints,
- and leaves room for future evolution.

In this article, we examine the **key architectural choices** made for our Simple Web System, explore **alternatives**, and understand **why we did not choose them yet**.

This is where High-Level Design thinking truly begins.

---

## 2. Architecture Choice 1: Monolithic Application

---

### 2.1 What We Chose

We chose a **monolithic application** for our initial system.

All core responsibilities:

- request handling,
- business logic,
- data access

live within a single deployable unit.

---

### 2.2 Why This Choice Makes Sense Now

- **Low complexity**: fewer moving parts
- **Faster development**: simpler workflows
- **Easier debugging**: everything in one place
- **Low operational overhead**

For a small system with limited traffic, a monolith is often the **most responsible choice**.

---

### 2.3 Alternatives Considered

#### Microservices Architecture

Not chosen because:

- adds network complexity
- requires service discovery
- increases operational overhead
- provides no immediate benefit at this scale

Microservices solve _scaling and ownership problems_ — problems we do not have yet.

---

## 3. Architecture Choice 2: Layered Structure (N-Tier)

---

### 3.1 What We Chose

Even within a monolith, we logically separate responsibilities into layers:

- presentation layer
- application/business logic layer
- data access layer

---

### 3.2 Why Layering Matters

- improves readability
- enforces separation of concerns
- simplifies future refactoring
- makes eventual extraction of services easier

This is a **design discipline**, not a deployment decision.

---

## 4. Architecture Choice 3: Stateless Application Server

---

### 4.1 What We Chose

We designed the application server to be **stateless**.

Each request:

- is processed independently
- does not rely on server memory for user-specific data

---

### 4.2 Trade-offs

**Benefits**

- enables horizontal scaling
- simplifies load balancing
- improves fault tolerance

**Costs**

- requires external storage for state
- slightly more database or cache interaction

This is a long-term win with minimal short-term cost.

---

## 5. Architecture Choice 4: Single Database

---

### 5.1 What We Chose

A **single database instance** handles all reads and writes.

---

### 5.2 Why This Works Now

- strong consistency by default
- no replication complexity
- simpler schema management
- easier debugging

---

### 5.3 Alternatives Not Chosen (Yet)

- read replicas
- database sharding
- distributed databases

These optimizations introduce complexity that is unjustified at this stage.

---

## 6. Architecture Choice 5: Synchronous Communication

---

### 6.1 What We Chose

Requests are handled **synchronously**:

- client waits for a response
- application waits for database operations

---

### 6.2 Why Synchronous Is Acceptable

- predictable behavior
- easier error handling
- simpler reasoning

Asynchronous processing will appear only when throughput or latency demands it.

---

## 7. Trade-offs Summary

---

| Decision         | Benefit         | Cost                        |
| ---------------- | --------------- | --------------------------- |
| Monolith         | Simplicity      | Limited independent scaling |
| Layered design   | Maintainability | Slight structural overhead  |
| Stateless server | Scalability     | Externalized state          |
| Single DB        | Consistency     | Single point of failure     |
| Sync flow        | Predictability  | Limited throughput          |

Every decision is a **conscious trade-off**, not a mistake.

---

## 8. What This Architecture Optimizes For

---

This system is optimized for:

- clarity
- correctness
- ease of change
- fast learning

It is **not** optimized for:

- massive scale
- global availability
- extreme performance

And that is intentional.

---

## 9. Concepts Reinforced in This Article

---

- Monolithic architecture
- Layered (N-tier) design
- Stateless services
- Synchronous request handling
- Architectural trade-offs

These concepts form the **baseline mental model** for HLD.

---

## Conclusion

---

In this article, we:

- examined why each architectural choice was made
- evaluated alternatives
- understood trade-offs involved

Good system design is not about complexity —  
it is about **appropriate decisions at the right time**.

---

### 🔗 What’s Next?

With the baseline system designed, we are ready to **stress it**.

In the next article, we will explore:

- where this architecture will start to break
- early scaling pressure points
- signals that tell us it’s time to evolve the design

👉 **Next:**  
**[Example 1: Simple Web System — Early Scaling Signals & Limitations](/learning/advanced-skills/high-level-design/2_foundation-designing-first-app/2_5_early-scaling-signals-and-limitations)**

---

> 📝 **Takeaway**:
>
> - Simpler architectures are often the correct starting point.
> - Every architectural decision has a cost.
> - Designing for change is more valuable than designing for scale.
> - HLD is about reasoning, not tools.
