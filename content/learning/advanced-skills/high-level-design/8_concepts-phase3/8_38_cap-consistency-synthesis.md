---
title: "CAP Theorem — CAP + Consistency Models (Synthesis)"
description: "Close Phase 3 with a unified mental model: CAP under partitions, consistency models in normal operation, and the practical toolkit (idempotency, leader reads, sagas, outbox/inbox, reconciliation) that produces correct outcomes. Includes an interview-ready checklist."
keywords:
  - cap synthesis
  - cap consistency models
  - system design interview checklist
  - leader reads read your writes
  - saga idempotency outbox inbox
  - correctness reliability toolkit
weight: 38
date: 2026-03-16
layout: "topic-content"
---

# CAP Theorem — CAP + Consistency Models (Synthesis)

---

Phase 3 (Payment System) taught one core truth:

> correctness in distributed systems is not one feature.

It is a layered set of decisions and patterns that handle:

- duplicates (retries)
- stale reads (replication + caches)
- concurrent writes (lost updates)
- partial failures across services
- partitions and uncertain outcomes

CAP is the final lens because it explains why these trade-offs are unavoidable.

This article ties everything together into one mental model and ends with a practical checklist you can use in interviews.

---

## 1. CAP vs Consistency Models (The Clean Relationship)

---

A simple way to connect them:

- **Consistency models** describe normal behavior (no partition):
  - strong / eventual / causal / read-your-writes

- **CAP** describes forced choices under partition-like failures:
  - either return stale/possibly divergent results (A)
  - or reject/block to avoid violating freshness (C)

So:

> Consistency models are the day-to-day contract.
> CAP is the failure-mode constraint.

(If you’ve heard of PACELC: it adds the “no partition” latency vs consistency trade-off, but Phase 3 doesn’t require it.)

---

## 2. The Phase 3 “Correctness Stack” (One Page Map)

---

Phase 3 problems and their primary tools:

1. **Retries → duplicates**
   - Idempotency (API, step, workflow)

2. **Scaling reads → stale reads**
   - Leader reads for critical paths
   - Non-critical reads on replicas
   - Read-your-writes window

3. **Concurrency → lost updates**
   - Locks / optimistic versioning
   - Atomic update patterns

4. **Multi-service workflows → partial failures**
   - Sagas (durable orchestration)
   - Compensation design

5. **Messaging reliability**
   - Transactional outbox (producer)
   - Inbox/dedup store (consumer)
   - DLQ + replay playbooks

6. **Drift and uncertainty**
   - `NEEDS_REVIEW`
   - Reconciliation as first-class component

Each layer solves a different failure class.

Trying to use one tool for all problems is the fastest way to design something fragile.

---

## 3. CAP Applied to the Payment System (What We Actually Choose)

---

During partition-like conditions, we intentionally mix CP and AP surfaces.

### 3.1 CP-style behavior (correctness-first)

- payment confirmation/status right after write
- balance checks
- idempotency checks
- workflow step transitions

Behavior under uncertainty:

- route to leader
- fail fast when necessary
- return safe “unknown” (`NEEDS_REVIEW`) rather than lie

### 3.2 AP-style behavior (availability-first)

- history views
- notification inbox
- analytics summaries

Behavior under lag/partition:

- serve from replicas/caches
- allow eventual convergence
- degrade UX rather than returning errors

This is how mature systems stay both trustworthy and usable.

---

## 4. The Two Golden Rules (If You Remember Nothing Else)

---

### Rule 1 — Make writes safe under retries

Assume at-least-once behavior:

- clients retry
- services retry
- brokers redeliver

So enforce exactly-once effects where it matters:

- idempotency keys
- atomic DB constraints
- inbox/outbox patterns

### Rule 2 — Make reads explicit about freshness

Replicas and caches create staleness windows.

So decide per endpoint:

- leader reads for correctness-critical UX
- replicas/caches for non-critical views
- read-your-writes window for post-write screens

---

## 5. Interview Checklist (Phase 3 Correctness & Reliability)

---

Use this checklist in any system design interview where correctness matters.

### 5.1 Writes & retries

- What operations are non-idempotent by default?
- What is the idempotency key and where is it stored?
- How do you avoid duplicates across API retries and internal retries?

### 5.2 Concurrency & invariants

- What invariants must never break? (balance >= 0, legal state transitions)
- Which writes are hot/contended?
- Do you need locks, optimistic versioning, or atomic updates?

### 5.3 Read freshness

- Which endpoints must be fresh (leader)?
- Which can be stale (replicas)?
- Do you need RYW or monotonic reads?

### 5.4 Cross-service correctness

- What is the workflow state machine?
- What are compensations?
- What is the strategy for “in doubt” outcomes (`NEEDS_REVIEW`)?

### 5.5 Messaging reliability (if events are involved)

- How do you ensure DB commit + publish consistency? (outbox)
- How do consumers dedupe? (inbox)
- What is your DLQ and replay plan?

### 5.6 Reconciliation and operations

- What do you reconcile (payment vs ledger, workflow vs service state)?
- What is the auto-heal strategy vs manual review path?
- What metrics define success (mismatch rate, time-to-reconcile)?

---

## 6. Final Takeaway

---

CAP doesn’t give you a design.

It reminds you that under partitions you must choose between:

- freshness (C)
- always responding (A)

Phase 3’s real achievement is the toolkit that makes those choices safe:

- idempotency
- leader reads + RYW
- atomic updates
- sagas + compensation
- outbox/inbox
- reconciliation + NEEDS_REVIEW

That is what “correct and reliable systems” actually means.

---

## TL;DR

---

Consistency models describe your normal contract.

CAP describes what you must trade off under partition-like failures.

Phase 3 succeeds by using a layered toolkit (idempotency, leader reads, sagas, outbox/inbox, reconciliation) to achieve correct outcomes despite retries, lag, concurrency, and partial failures.

---

### 🔗 What’s Next

---
