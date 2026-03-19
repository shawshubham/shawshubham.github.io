---
title: "Phase 4: Real-Time & Event-Driven Systems — Introduction"
description: "Phase 4 introduces real-time system design using an example-driven evolution (Notifications + Chat). Learn what changes in real-time, what pressures appear, and how this phase is structured."
keywords:
  - real-time system design
  - event-driven architecture
  - websocket chat system design
  - notification system design
  - pub sub system design
  - backpressure consumer lag
weight: 1
date: 2026-03-16
layout: "topic-content"
---

## 1. Why This Phase Exists

---

In earlier phases, most systems could be explained with a simple mental model:

> **Client sends a request → server processes it → server returns a response.**

This works well for:

- CRUD APIs
- dashboards and reporting
- most “read-heavy” platforms

But real-time systems change the rules.

In real-time systems:

- users expect updates **instantly**
- traffic arrives in **bursts**
- the number of recipients can be **large**
- failures are normal (disconnects, retries, duplicates)
- the system must keep moving even when parts are slow

A real-time system is less like “one request” and more like:

> **a continuous stream of events that must be delivered safely.**

This phase teaches that mental shift.

---

## 2. What We Are Building in Phase 4 (Example 4)

---

Phase 4 is example-driven like Phase 3.

We will evolve a realistic real-time product:

### Example 4: Real-Time Messaging System — Notifications + Chat

This example is intentionally chosen because it forces you to solve the hardest “real-time” pressures:

- fanout (one event → many recipients)
- ordering expectations (chat conversation order)
- delivery guarantees (duplicates and retries)
- backpressure (slow consumers and queue buildup)
- offline delivery (reconnect + replay)
- reprocessing (bugs, backfills, DLQ)

The system we evolve will support:

- **Notifications** (one-to-one / one-to-many)
- **Chat** (many-to-many with ordering constraints)

---

## 3. What Changes in Real-Time Systems

---

Real-time systems introduce a different set of constraints than classic request/response APIs.

### 3.1 Latency becomes a product feature

The user does not tolerate “eventually”.

- chat messages feel broken if delayed by seconds
- notification delays reduce trust and engagement

So you start thinking in:

- p50/p95/p99 latency for delivery
- connection setup time
- tail latency under load

### 3.2 Fanout becomes your scaling bottleneck

A single event can require delivery to:

- multiple devices for the same user
- multiple users in a conversation
- thousands or millions in large groups (advanced)

This is not “one request = one response” anymore.

### 3.3 Failures are part of the normal path

Real-time systems must expect:

- client disconnects
- reconnect storms
- retries and duplicates
- out-of-order delivery (when distributed)

So reliability becomes a design requirement, not a “later fix”.

### 3.4 Backpressure becomes a first-class problem

In real-time delivery, slow consumers are unavoidable:

- mobile devices on poor networks
- overloaded gateway nodes
- downstream services under incident

If you don’t design for backpressure, queues grow until the system collapses.

---

## 4. How This Phase Is Structured (Example-Driven Evolution)

---

Like earlier phases, Phase 4 evolves the system one pressure at a time:

1. Start with the simplest baseline
2. Show normal flow
3. Introduce a real design pressure
4. Reveal the hidden problem
5. Add one architectural “upgrade”
6. Repeat until mature

This keeps the learning grounded in practical evolution rather than theory dumps.

---

## 5. What We’ll Learn in Phase 4 (Concept Map)

---

Phase 4 evolves a **Real-Time Messaging System (Notifications + Chat)** and, along the way, we’ll touch the core concepts that make real-time systems work in production:

- **Real-time transports**  
  WebSockets vs SSE vs Long Polling, connection lifecycle, heartbeats

- **Event-driven architecture**  
  why we introduce an event bus, decoupling producers from consumers

- **Messaging models**  
  Pub/Sub vs Queue (and where streams fit conceptually)

- **Delivery guarantees (reality of duplicates)**  
  at-most-once vs at-least-once, why “exactly once” is rarely the baseline

- **Idempotent consumers & deduplication**  
  handling retries safely in event pipelines

- **Ordering and sequencing**  
  what “ordered chat” really means, ordering scopes (per conversation vs global)

- **Fanout and scalability**  
  delivering one event to many recipients, hot keys, burst handling

- **Backpressure and overload control**  
  consumer lag, queue growth, rate limiting, load shedding, graceful degradation

- **Offline delivery & replay**  
  store-and-forward, last-seen cursors, bounded replay on reconnect

- **Operational resilience**  
  reprocessing, DLQs, poison messages, safe replay after bugs/outages

Phase 4 is where your HLD toolkit becomes “real-time ready”.

---

## 6. Concepts vs Examples (Important Boundary)

---

In Phase 4, the example articles stay practical and architecture-focused.

Deep theory lives in Phase 4 Concepts pages, such as:

- Pub/Sub vs queues vs streams
- delivery guarantees and duplicates
- ordering and partitioning
- outbox/inbox patterns
- backpressure mechanics
- DLQs and reprocessing playbooks

We will cross-link concepts from example articles as we go.

---

## 7. Key Takeaways

---

- Real-time systems require a different mental model: **continuous event delivery**, not request/response.
- The hardest real-time pressures are: **latency**, **fanout**, **failures**, and **backpressure**.
- Phase 4 will evolve a real system (Notifications + Chat) step-by-step.
- Concepts will be deep-dive references; examples will stay practical.

---

## TL;DR

---

Phase 4 teaches real-time design by evolving a Notifications + Chat system.

You’ll learn how event-driven architectures handle fanout, ordering, delivery guarantees, backpressure, offline delivery, and reprocessing — without turning the example into a theory dump.

---

### 🔗 What’s Next

In the next article, we’ll define the system properly:

- scope (notifications + chat)
- functional requirements
- non-functional requirements (latency, durability, scale)
- and the pressures we will solve in later chapters

👉 **Up Next: →**  
**[Real-Time System — Problem & Requirements](/learning/advanced-skills/high-level-design/5_realtime-event-driven-systems/5_2_problem-and-requirements)**
