---
title: "Distributed Transactions — Why “Global ACID” is Hard"
description: "Understand why a single atomic transaction across multiple services/databases is difficult, what failure modes appear, and why modern systems prefer sagas, outbox, and reconciliation."
keywords:
  - distributed transactions explained
  - global transaction why hard
  - microservices transaction problem
  - two phase commit motivation
  - saga vs distributed transaction
  - partial failure consistency
weight: 20
date: 2026-03-16
layout: "topic-content"
---

# Distributed Transactions — Why “Global ACID” is Hard

---

Inside a single database, ACID gives you a clean correctness boundary.

But real systems rarely live inside one database.

A payment workflow often spans:

- Payments DB
- Ledger DB
- Fraud/Risk DB
- Notification system
- message bus / event stream

The moment you span multiple services, a natural question arises:

> Why can’t we just use one transaction across everything?

This article answers that question.

---

## 1. What a Distributed Transaction Tries to Achieve

---

A distributed transaction tries to provide the same guarantee ACID gives you locally:

> all participants commit or all participants roll back

Across multiple independent participants such as:

- different databases
- different services owning their own storage
- message brokers + DB combinations

In other words:

- “global atomicity”

---

## 2. Why It’s Hard: The System Is No Longer One Failure Domain

---

Inside one DB, the database controls:

- locking
- logging
- commit order
- crash recovery

Across multiple services, you now have:

- multiple processes
- multiple logs
- multiple failure modes
- network partitions

This means a “commit decision” must travel over an unreliable network.

So the system must answer:

- what if a participant crashes after “prepare”?
- what if the coordinator crashes mid-decision?
- what if the network partitions?

This is where complexity explodes.

---

## 3. The Core Failure Mode: Partial Commit Risk

---

The nightmare scenario is:

- Service A commits
- Service B does not

Example:

- Payments DB marks payment `CONFIRMED`
- Ledger DB never records the ledger entry

Each service is locally consistent.

Globally, the system is inconsistent.

This is the exact “partial failure across services” pressure from Phase 3.

---

## 4. Why “Just Retry” Doesn’t Fix It

---

A common naive response is:

- “if something fails, retry the step”

But retries don’t remove ambiguity:

- a timeout does not tell you if the step succeeded
- repeated retries can create duplicates unless the step is idempotent
- retry storms amplify incidents

Retries are necessary, but they are not sufficient.

---

## 5. The Distributed Systems Tax: Coordination Costs Availability or Latency

---

To enforce global atomicity, you need coordination.

Coordination usually costs:

- latency (waiting for acknowledgements)
- availability (blocking when a participant is down)
- throughput (global locks / global commit protocols)

This is why global transactions are not the default in microservices:

> they trade away the very properties microservices are built for.

---

## 6. What Systems Use Instead (The Modern Toolkit)

---

Modern systems usually replace “global ACID” with a toolkit of patterns:

### 6.1 Sagas

- each service commits its local transaction
- workflow progresses step-by-step
- failures are handled with compensation or recovery

### 6.2 Outbox / Inbox

- ensure DB commit and event publication are consistent
- handle at-least-once delivery safely

### 6.3 Idempotency everywhere

- safe retries at API, step, and workflow levels

### 6.4 Reconciliation

- detect mismatches between services
- repair or route to manual review

These are the patterns Phase 3 evolves toward.

---

## 7. When Distributed Transactions Are Still Used

---

Distributed transactions are not “wrong”.

They are used when:

- strong global atomicity is truly required
- the operational cost is acceptable
- the participant set is controlled and stable

Classic example:

- Two-Phase Commit (2PC)

We’ll cover 2PC next, but treat it as an advanced tool rather than a default.

---

## Key Takeaways

---

- Distributed transactions attempt to provide global atomicity across multiple services/databases.
- They are hard because the system spans multiple failure domains and unreliable networks.
- The main risk is partial commit: one service commits while another fails.
- Coordination protocols introduce latency/availability costs.
- Modern systems often prefer sagas + idempotency + outbox/inbox + reconciliation.
- 2PC exists, but it’s rarely the default in microservice architectures.

---

## TL;DR

---

Global ACID is hard because networks fail and services crash independently.

Distributed transactions require coordination that costs latency and availability, so most modern systems instead use sagas, idempotency, outbox/inbox, and reconciliation to achieve correct outcomes without global blocking commits.

---

### 🔗 What’s Next

Next we’ll examine the classic distributed transaction protocol:

- Two-Phase Commit (2PC)
- how it works
- why it blocks under failures
- when it’s worth considering

👉 **Up Next: →**  
**[Distributed Transactions — Two-Phase Commit (2PC) in Plain English](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_21_distributed-transactions-two-phase-commit)**
