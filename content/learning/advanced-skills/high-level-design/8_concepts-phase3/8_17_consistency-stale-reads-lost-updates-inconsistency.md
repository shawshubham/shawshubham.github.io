---
title: "Consistency Models — Stale Reads vs Lost Updates vs Inconsistent State"
description: "Differentiate three commonly confused failure classes: stale reads from lag/caches, lost updates from concurrency, and inconsistent state across services from partial failures."
keywords:
  - stale reads vs lost updates
  - concurrency lost update
  - replication lag stale read
  - distributed inconsistency partial failure
  - system design correctness taxonomy
  - payment system inconsistency
weight: 17
date: 2026-03-16
layout: "topic-content"
---

# Consistency Models — Stale Reads vs Lost Updates vs Inconsistent State

---

In system design discussions, three different problems are often mixed together:

- “stale reads”
- “lost updates”
- “inconsistency”

They sound similar, but they come from different causes and require different fixes.

If you can separate these clearly, you’ll make better design decisions faster.

This article gives you a practical taxonomy:

1. **Stale reads** (replication/caching visibility delay)
2. **Lost updates** (concurrency write conflicts)
3. **Inconsistent state across services** (partial failures/workflow correctness)

---

## 1. Stale Reads (Visibility Delay)

---

### What it is

A **stale read** happens when you read an older value even though a newer value has already been committed somewhere.

Common causes:

- replication lag (leader → replicas)
- cache staleness (cache not updated/invalidated yet)
- read routing to a behind replica

### Payment example

- payment is confirmed on leader
- status read goes to replica
- replica still shows `PENDING`

### What fixes it

- critical reads → leader
- read-your-writes window
- version-based reads (LSN/binlog position)
- cache invalidation strategies (for caches)

**Key point:** stale reads are a _read-path_ problem.

---

## 2. Lost Updates (Concurrency Write Conflicts)

---

### What it is

A **lost update** happens when two concurrent transactions write based on stale reads, causing one update to overwrite another.

This is a _write-path_ problem.

### Payment example

Two concurrent debits read balance 100:

- T1 debits 80 → expects balance 20
- T2 debits 30 → expects balance 70
- final balance becomes 70 (T1 lost) or overspend occurs

### What fixes it

- pessimistic locking (`SELECT ... FOR UPDATE`)
- optimistic concurrency (version/CAS)
- atomic updates (`UPDATE ... WHERE balance >= amount`)

**Key point:** replication read freshness does not fix lost updates. This is about concurrent writes.

---

## 3. Inconsistent State Across Services (Partial Failure)

---

### What it is

This inconsistency is not “stale” and not “lost update”.

It happens when:

- multiple services/databases must agree on a workflow outcome
- but one step succeeds and another fails

Result:

- each service is locally correct
- globally, the system is inconsistent

### Payment example

- Payment DB: payment marked `CONFIRMED`
- Ledger service: ledger entry missing (timeout/failure)
- Notification: user never notified
- downstream systems see different realities

This is the “partial failure across services” problem (introduced in Phase 3).

### What fixes it

- saga orchestration/choreography
- durable workflow state machine
- step-level idempotency
- compensations
- reconciliation jobs

**Key point:** this is a _workflow coordination_ problem.

---

## 4. A Simple Decision Table (What You’re Actually Dealing With)

---

| Symptom                                       | Likely problem              | Where it happens | Common fixes                                           |
| --------------------------------------------- | --------------------------- | ---------------- | ------------------------------------------------------ |
| “I wrote, but I can’t read it yet”            | Stale reads                 | read path        | leader reads, RYW, version routing, cache invalidation |
| “Final value is wrong after concurrency”      | Lost updates                | write path       | locks, optimistic versioning, atomic updates           |
| “Service A says success, service B disagrees” | Cross-service inconsistency | workflow         | saga, outbox/inbox, compensations, reconciliation      |

This table is useful in interviews because it quickly reveals which toolkit to apply.

---

## 5. Phase 3 Connection (Why This Taxonomy Matters)

---

Phase 3 evolved the payment system by solving these in order:

- duplicates/retries → idempotency
- stale reads → replication strategy + RYW
- lost updates → atomic money updates / locking
- inconsistent state across services → saga + durable workflow

The mistakes happen when teams apply the wrong fix:

- trying to solve stale reads with locks
- trying to solve lost updates with read-your-writes
- trying to solve workflow inconsistency with “just use transactions”

Different problems, different tools.

---

## Key Takeaways

---

- **Stale reads** are visibility delays on the read path (replication/caching).
- **Lost updates** are concurrency conflicts on the write path.
- **Cross-service inconsistency** is a workflow/coordination problem caused by partial failures.
- Correctness starts by identifying which class you’re dealing with, then applying the right toolkit.

---

## TL;DR

---

Stale reads, lost updates, and inconsistent cross-service state are different failure classes.

Diagnose the class first, then apply the right tool:

- leader reads/RYW for stale reads,
- locks/atomic updates for lost updates,
- sagas/outbox/reconciliation for workflow inconsistency.

---

### 🔗 What’s Next

Next we’ll make consistency practical for product design:

- how to decide what must be strongly consistent
- what can be eventual
- how Phase 3 chose consistency for payment UX

👉 **Up Next: →**  
**[Consistency Models — Designing UX Around Consistency](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_18_consistency-designing-us-around-consistency)**
