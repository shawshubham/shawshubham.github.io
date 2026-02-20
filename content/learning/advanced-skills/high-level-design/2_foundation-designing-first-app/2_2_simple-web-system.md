---
title: "Example 1: Simple Web System — Problem & Requirements"
description: "Define the problem and requirements for designing a simple web system and establish the baseline for learning High-Level Design through real examples."
keywords:
  - high level design example
  - simple web system architecture
  - system design requirements
  - hld fundamentals
  - software architecture basics
weight: 2
date: 2026-02-19
layout: "topic-content"
---

## 1. Introduction

---

Every complex system starts as a **simple system**.

Before we talk about scalability, caching, sharding, or distributed systems, we first need to understand how to design a **clean, minimal, and correct baseline system**.

In this article, we define the **problem and requirements** for our first High-Level Design example: a **Simple Web System**.  
This system will act as the **foundation** for all future examples in this HLD section.

---

## 2. Problem Statement

---

We want to design a **basic web application** that allows users to access content over the internet.

Think of this as:

- a blog
- a documentation site
- a learning platform
- or any simple content-driven website

At this stage, the goal is **not scale** — the goal is **clarity**.

We want to understand:

- what components are required
- how they interact
- and why each component exists

---

## 3. System Scope

---

### In Scope

The system should:

- allow users to access content via a web browser
- handle incoming HTTP requests
- fetch data from persistent storage
- return responses reliably

### Out of Scope (For Now)

The system will **not** handle:

- user authentication or authorization
- real-time updates
- heavy traffic or global scale
- advanced performance optimizations

These concerns will be introduced gradually in later phases.

---

## 4. Requirements

---

### 4.1 Functional Requirements

The system must be able to:

- receive requests from users via a web browser
- serve web pages or API responses
- retrieve data from a database
- return responses within a reasonable time

---

### 4.2 Non-Functional Requirements

At this stage, our non-functional requirements are intentionally simple.

#### 1. Simplicity

- The system should be easy to understand and reason about.
- Avoid unnecessary components or abstractions.

#### 2. Reliability

- The system should handle normal user requests without crashing.
- Basic fault tolerance is sufficient.

#### 3. Performance (Baseline)

- Responses should be reasonably fast for a small number of users.
- No strict latency SLAs are required yet.

#### 4. Scalability (Limited)

- The system should not block future scaling.
- We are **not** designing for millions of users yet.

---

## 5. Assumptions

---

To keep the design focused, we make the following assumptions:

- Traffic volume is low to moderate.
- Data size is small.
- Reads and writes are balanced.
- Users access the system via standard web browsers.
- The system runs in a single region.

These assumptions will be challenged and revised in later examples.

---

## 6. Constraints

---

Every system design is shaped by constraints.  
For this example, our constraints are:

- limited system complexity
- small development team
- faster development over perfect scalability
- preference for clarity over optimization

These constraints justify a **simple architectural approach**.

---

## 7. Why This Example Matters

---

This example is deliberately simple — and that is its strength.

Most system design mistakes happen because:

- systems are over-engineered too early
- complexity is introduced without need
- fundamentals are skipped

By starting here, we build a **mental model** of how systems are structured — a model that will scale naturally as requirements evolve.

---

## 8. What We Are Not Solving Yet

---

It’s important to be explicit about what we are **not** solving in this example:

- caching layers
- load balancing strategies
- sharding or replication
- asynchronous processing
- consistency trade-offs

Each of these will appear **only when the problem demands it**.

---

## Conclusion

---

In this article, we defined:

- the problem we are solving
- the scope of the system
- functional and non-functional requirements
- assumptions and constraints

This gives us a **clear foundation** to move forward.

Before drawing diagrams or choosing technologies, understanding the problem correctly is the most important step in High-Level Design.

---

### 🔗 What’s Next?

In the next article, we will design the **High-Level Architecture** for this system.

We will:

- identify the core components
- draw a system-level diagram
- explain how requests flow through the system
- justify each architectural decision

👉 **Next:**  
**[Example 1: Simple Web System — High-Level Architecture](/learning/advanced-skills/high-level-design/2_foundation-designing-first-app/2_3_high-level-architecture)**

---

> 📝 **Takeaway**:
>
> - High-Level Design starts with **clarity**, not complexity.
> - Requirements and constraints drive architecture.
> - Simple systems are intentional, not naive.
> - Over-engineering early creates long-term problems.
