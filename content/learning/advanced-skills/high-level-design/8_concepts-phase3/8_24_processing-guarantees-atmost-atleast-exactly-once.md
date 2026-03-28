---
title: "Processing Guarantees — At-most vs At-least vs Exactly-Once"
description: "Understand the three delivery/processing guarantees used in distributed systems, why at-least-once is the common default, and what “exactly-once” can realistically mean."
keywords:
  - at most once vs at least once
  - exactly once semantics
  - processing guarantees distributed systems
  - message delivery guarantees
  - retries duplicates guarantees
  - system design reliability guarantees
weight: 24
date: 2026-03-16
layout: "topic-content"
---

# Processing Guarantees — At-most vs At-least vs Exactly-Once

---

In distributed systems, failures are normal:

- network timeouts
- consumer crashes
- broker failover
- server restarts

So every system that delivers requests/messages must choose a guarantee for what happens under failure.

The three common guarantees are:

1. **At-most-once** (may lose messages, no duplicates)
2. **At-least-once** (no loss, duplicates possible)
3. **Exactly-once** (the most misunderstood)

This article gives the practical meaning of each and what systems actually target in production.

---

## 1. A Critical Distinction: Delivery vs Effects

---

Before definitions, remember:

- **delivery/processing** can happen multiple times
- but **effects** (money moved, ledger entry, DB update) should often happen once

In practice, many systems accept:

- at-least-once delivery
- but enforce **exactly-once effects** with idempotency/dedup

That is the realistic reliability target.

---

## 2. At-most-once

---

### What it means

The system attempts to deliver/process once.

If failures happen, it may drop the message/request.

So:

- duplicates are unlikely
- loss is possible

### Where it appears

- best-effort notifications
- telemetry where occasional loss is acceptable
- low-latency systems that prefer dropping to blocking

### Trade-off

- ✅ low overhead, low latency
- ❌ you must tolerate loss

---

## 3. At-least-once (Most common baseline)

---

### What it means

The system guarantees the message is eventually delivered/processed at least once.

If it cannot confirm delivery, it retries.

So:

- loss is unlikely
- duplicates are normal

### Where it appears

- payment workflows (you cannot lose “charge request”)
- event-driven systems (Kafka consumers)
- most critical business processing pipelines

### Trade-off

- ✅ strong durability (don’t lose work)
- ❌ duplicates must be handled

This is why idempotency and dedup patterns exist.

---

## 4. Exactly-once (What it can and cannot mean)

---

“Exactly-once” can refer to different layers:

### 4.1 Exactly-once delivery (rare)

Guarantee: the message arrives exactly once.

Hard because:

- consumer can crash after processing but before ack
- brokers retry to avoid losing messages
- networks are unreliable

Most real systems do not guarantee this globally.

### 4.2 Exactly-once processing (also hard)

Guarantee: your code runs exactly once.

Hard unless:

- processing + “mark processed” is atomic
- failures cannot happen between those steps

### 4.3 Exactly-once effects (realistic goal)

Guarantee: even if processing repeats, the external effect happens once.

This is achieved via:

- idempotency keys
- inbox/dedup stores (unique event IDs)
- atomic DB constraints/updates

This is the most practical and widely used meaning.

---

## 5. A Simple Mental Model

---

Use this mental model:

- If you cannot lose work → choose **at-least-once**
- If duplicates are unacceptable → enforce **idempotent effects**
- If you truly need global exactly-once delivery → be prepared for significant complexity and constraints

---

## 6. Phase 3 Connection (Why This Matters)

---

Phase 3 built payment correctness using:

- idempotency for retries
- atomic updates and transactions for local correctness
- sagas/outbox/inbox for multi-step workflows

All of this assumes a reality:

- retries happen
- duplicates happen
- “exactly once delivery” is not the baseline assumption

So the design goal becomes:

> at-least-once delivery + exactly-once effects.

---

## Key Takeaways

---

- At-most-once can lose messages but avoids duplicates.
- At-least-once avoids loss but creates duplicates (common baseline).
- “Exactly-once” is ambiguous; in practice systems aim for exactly-once **effects**.
- Exactly-once effects require idempotency/dedup + atomic persistence boundaries.
- Phase 3’s reliability toolkit is built on the at-least-once reality.

---

## TL;DR

---

Most real systems choose at-least-once delivery and then make processing idempotent so side effects occur once.

That combination is how you get reliability without pretending duplicates don’t exist.

---

### 🔗 What’s Next

Next we’ll answer the practical question:

> why do duplicates happen so often?

We’ll walk through the exact failure points that cause redelivery and repeated processing, and what that implies for design.

👉 **Up Next: →**  
**[Processing Guarantees — Why Duplicates Happen](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_25_processing-guarantees-why-duplicates-happen)**
