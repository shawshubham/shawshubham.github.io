---
title: "Distributed Transactions — Practical Alternatives"
description: "Most microservices avoid 2PC. Learn the modern toolkit used instead: sagas, idempotency, outbox/inbox patterns, and reconciliation—plus when to use which."
keywords:
  - distributed transaction alternatives
  - saga pattern vs 2pc
  - outbox inbox pattern
  - idempotent workflow
  - reconciliation job distributed systems
  - payment system coordination
weight: 22
date: 2026-03-16
layout: "topic-content"
---

# Distributed Transactions — Practical Alternatives

---

2PC can provide global atomicity, but it blocks under failures and tightly couples services.

That’s why most modern microservice systems use a different approach:

> accept that the workflow is distributed,  
> commit locally per service,  
> and build reliability through patterns.

This article introduces the practical toolkit engineers actually use:

- sagas
- idempotency at every boundary
- outbox/inbox for message + DB correctness
- reconciliation for mismatch repair

---

## 1. The Modern Goal: “Correct Outcomes”, Not “Global ACID”

---

Distributed systems shift the goal:

- you rarely get one global transaction
- you instead build a workflow that can survive:
  - retries
  - duplicates
  - partial failures
  - restarts

So the objective becomes:

> produce correct end-to-end outcomes despite partial failures.

This is exactly what Phase 3 moved toward.

---

## 2. Saga Pattern (The Core Replacement for 2PC)

---

A **saga** is a distributed workflow composed of:

- multiple local transactions (one per service)
- plus compensations or recovery steps when something fails

Instead of trying to commit everything at once:

- each service commits locally
- the workflow advances step-by-step

If a later step fails, you either:

- retry
- compensate (reverse/undo effect)
- route to manual review (`NEEDS_REVIEW`)

Sagas are covered deeply in the Saga Concepts cluster (later in this concepts section).

---

## 3. Idempotency Everywhere (Make Retries Safe)

---

Retries are unavoidable.

So every boundary that can be retried must be idempotent:

- API edge idempotency (same user intent)
- step-level idempotency (ledger/notify)
- workflow-level idempotency (saga replay)

This prevents “recovery” from creating duplicates (already covered in Idempotency Concepts cluster).

---

## 4. Outbox Pattern (DB Commit + Event Publish Consistency)

---

Many workflows involve messaging:

- service updates DB
- service publishes an event for downstream services

The dangerous gap:

- DB commit succeeds
- publish fails (or vice versa)

The **outbox pattern** fixes this by:

- writing the event into an outbox table in the same DB transaction
- using a relay to publish from the outbox reliably

This converts a distributed correctness problem into:

- local ACID transaction + reliable replay

(Outbox deep dive: later in this concepts section.)

---

## 5. Inbox / Dedup Store Pattern (Consumer-side Safety)

---

Even with outbox, delivery is often **at-least-once**.

So consumers must tolerate duplicates.

The inbox pattern stores:

- `eventId → processed`

If the same event arrives again:

- consumer detects duplicate and skips side effects

This is the consumer-side mirror of idempotency.

(Inbox deep dive: later in this concepts section.)

---

## 6. Reconciliation (Reality: Systems Drift)

---

Even with sagas, idempotency, outbox/inbox:

- incidents happen
- manual interventions happen
- edge cases leak

So production systems include **reconciliation**:

- periodically compare states across services
- detect mismatches
- repair automatically or send to manual queue

Reconciliation is not a sign of failure.

It is an explicit acknowledgement that:

> distributed systems can become inconsistent, and we must heal them.

(We’ll cover reconciliation again under Saga concepts.)

---

## 7. A Practical “Which Tool When?” Guide

---

Use this guide to decide quickly:

### If you need atomicity inside one DB

- use ACID

### If retries can cause duplicates

- use idempotency

### If you have multi-service workflows

- use sagas + durable state machine (later in this concepts section)

### If you publish events after DB writes

- use transactional outbox (later in this concepts section)

### If you consume at-least-once events

- use inbox/dedup store (later in this concepts section)

### If you need long-term correctness under incidents

- add reconciliation (later in this concepts section)

---

## Key Takeaways

---

- Modern systems avoid global ACID and aim for correct outcomes under partial failures.
- The replacement toolkit is:
  - sagas (coordination)
  - idempotency (safe retries)
  - outbox/inbox (DB + messaging correctness)
  - reconciliation (healing mismatches)
- This toolkit matches Phase 3’s evolution path for payment correctness.

---

## TL;DR

---

Instead of global transactions, microservices use sagas, idempotency, outbox/inbox, and reconciliation to keep workflows correct under failures and retries.

---

### 🔗 What’s Next

Next we’ll answer a balanced question:

> when is 2PC still worth it?

We’ll outline the rare scenarios where distributed transactions make sense and how to evaluate the trade-offs.

👉 **Up Next: →**  
**[Distributed Transactions — When 2PC Still Makes Sense](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_23_distributed-transactions-when-2pc-makes-sense)**
