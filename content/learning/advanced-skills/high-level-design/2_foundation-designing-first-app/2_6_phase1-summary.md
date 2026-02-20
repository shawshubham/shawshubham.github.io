---
title: "Phase 1 Summary: Concepts Introduced"
description: "A summary of the High-Level Design concepts introduced in Phase 1 through the Simple Web System example."
keywords:
  - high level design concepts
  - system design foundations
  - monolithic architecture
  - stateless applications
  - hld phase summary
weight: 6
date: 2026-02-19
layout: "topic-content"
---

## 1. Why This Summary Exists

---

Phase 1 focused on designing the **simplest meaningful system**.

Rather than learning concepts in isolation, we encountered them **naturally while solving a real problem**.  
This summary consolidates those concepts so you can:

- reinforce what you learned,
- recognize them when they reappear,
- and build on them in later phases.

---

## 2. Concepts Introduced in Phase 1

---

### 2.1 High-Level Design (HLD)

#### What you learned

- HLD is about **system structure and decisions**, not code.
- It focuses on components, interactions, and trade-offs.

#### Where it appeared

- Throughout the entire example, from requirements to limitations.

---

### 2.2 Client–Server Architecture

#### What you learned

- Systems are composed of clients that initiate requests and servers that process them.
- Clear separation of responsibilities simplifies reasoning.

#### Where it appeared

- The basic request flow of the Simple Web System.

---

### 2.3 Monolithic Architecture

#### What you learned

- A monolith is a single deployable application containing core responsibilities.
- It is often the **right starting point**, not a mistake.

#### Where it appeared

- Chosen as the primary architecture for simplicity and speed.

---

### 2.4 Layered (N-Tier) Architecture

#### What you learned

- Logical separation of concerns improves maintainability.
- Layering is independent of physical deployment.

#### Where it appeared

- Used within the monolithic application to structure responsibilities.

---

### 2.5 Stateless Application Servers

#### What you learned

- Stateless servers do not store user-specific data in memory.
- Statelessness enables horizontal scaling and fault tolerance.

#### Where it appeared

- Application server design decisions.

---

### 2.6 Synchronous Request Processing

#### What you learned

- Synchronous flows are predictable and easy to reason about.
- They are suitable for low to moderate traffic systems.

#### Where it appeared

- Request handling between client, application, and database.

---

### 2.7 Single Database as Source of Truth

#### What you learned

- A single database simplifies consistency and debugging.
- Strong consistency is favored over distribution early on.

#### Where it appeared

- Data storage strategy for the Simple Web System.

---

### 2.8 Architectural Trade-offs

#### What you learned

- Every architectural choice has benefits and costs.
- Good design is about **appropriate decisions**, not perfect ones.

#### Where it appeared

- Architecture choices and scaling limitation discussions.

---

### 2.9 Early Scaling Signals

#### What you learned

- Systems show warning signs before they fail.
- Observing these signals helps guide evolution.

#### Where it appeared

- The scaling limitations article.

---

## 3. How These Concepts Will Evolve

In later phases:

- monoliths will be stressed and extended,
- synchronous flows will introduce bottlenecks,
- single databases will become scaling constraints.

These concepts are **not abandoned** — they are **refined and evolved**.

---

### 🔗 What’s Next?

With a strong foundation in place, we are ready to design systems that **must scale**.

👉 **Next Phase:**  
**Phase 2 — Scaling for Reads: Designing a News Feed System**

---

### Want to Dive Deeper?

If you’d like to explore these concepts in more detail, you can visit the **Concepts** section:

- [Monolithic Architecture](/learning/advanced-skills/high-level-design/6_concepts-for-reference/6_1_monolithic-architecture)
- [Layered (N-Tier) Architecture](/learning/advanced-skills/high-level-design/concepts/layered-architecture)
- [Stateless vs Stateful Applications](/learning/advanced-skills/high-level-design/concepts/stateless-vs-stateful)
- [Client–Server Architecture](/learning/advanced-skills/high-level-design/concepts/client-server)

---

> 📝 **Takeaway**:
>
> - Concepts are best learned in context.
> - Simple architectures are intentional, not naive.
> - Scaling decisions should respond to real signals.
> - HLD is about reasoning under constraints.
