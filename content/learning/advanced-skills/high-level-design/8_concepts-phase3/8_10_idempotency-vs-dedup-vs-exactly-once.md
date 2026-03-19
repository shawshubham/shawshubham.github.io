---
title: "Idempotency vs Deduplication vs Exactly-Once (What They Really Mean)"
description: "Clear up the most common reliability confusion: idempotency vs deduplication vs delivery guarantees. Learn what “exactly once” can and cannot mean in real distributed systems."
keywords:
  - idempotency vs deduplication
  - exactly once semantics
  - at least once delivery
  - idempotent consumers
  - distributed systems guarantees
  - payment system duplicates
weight: 10
date: 2026-03-16
layout: "topic-content"
---

# Idempotency vs Deduplication vs Exactly-Once (What They Really Mean)

---

These three terms are often used interchangeably:

- idempotency
- deduplication
- exactly-once

They are not the same.

Mixing them leads to common design mistakes:

- assuming “Kafka gives exactly once” so duplicates cannot happen
- thinking “dedupe store = idempotency”
- believing “transactions” automatically imply exactly-once behavior across services

This article gives clean, practical definitions and how to apply them.

---

## 1. Delivery vs Processing vs Effects (The Most Important Split)

---

Before definitions, separate three layers:

1. **Delivery** — how many times a message/request arrives
2. **Processing** — how many times your code runs
3. **Effects** — how many times the external side effect happens (DB write, ledger entry, charge)

Most reliability work is about ensuring:

> delivery can be at-least-once,  
> processing can happen multiple times,  
> but **effects happen once**.

This is “exactly-once effects”, and it’s what real systems actually aim for.

---

## 2. Idempotency (What It Is)

---

**Idempotency** is a property of an operation:

> executing it multiple times produces the same outcome as executing it once.

Examples:

- `POST /payments` with an idempotency key
- “post ledger entry for paymentId X” with a step idempotency key
- “mark notification as read” (usually naturally idempotent)

Idempotency answers:

- “If I repeat this, do I create another side effect?”

In other words:

- idempotency makes retries safe.

---

## 3. Deduplication (What It Is)

---

**Deduplication** is a mechanism:

> detect duplicates and drop/ignore them.

Dedup can be implemented as:

- a “seen message IDs” store
- an inbox table (`messageId → processed`)
- consumer-side dedupe based on an eventId

Dedup answers:

- “Have I seen this message/event before?”

Dedup is often a tool used to implement idempotent processing, but it is not identical:

- you can dedupe deliveries
- but still perform a non-idempotent side effect if your boundary is wrong

---

## 4. Exactly-Once (The Most Misunderstood)

---

“Exactly-once” is not one thing.

It can mean:

### 4.1 Exactly-once delivery (rare, expensive)

- the message is delivered exactly once to the consumer

In distributed systems, this is hard to guarantee end-to-end because:

- networks fail
- consumers crash after processing but before ack
- brokers redeliver to stay reliable

Most systems choose at-least-once delivery because it is safer than losing messages.

### 4.2 Exactly-once processing (fragile without constraints)

- your code runs exactly once

This is hard unless:

- your processing is tied to transactional boundaries
- you can atomically “mark processed” with the side effect

### 4.3 Exactly-once effects (what systems actually aim for)

- the external side effect happens once, even if delivery/processing repeats

This is achieved using:

- idempotency keys
- dedupe/inbox stores
- atomic writes / unique constraints
- outbox pattern for publish consistency

---

## 5. How These Fit Together (Practical Mapping)

---

A useful mapping:

- **Idempotency** = property of the operation
- **Deduplication** = technique to filter repeats
- **Exactly-once effects** = outcome we want

Example: event-driven consumer

- delivery may be at-least-once
- consumer may process message twice
- but effects are once because:
  - consumer writes `eventId` into an inbox table with a unique constraint
  - if insert fails, it’s a duplicate and side effects are skipped

So:

> Dedup is the mechanism; idempotency is the safety property; exactly-once effects is the goal.

---

## 6. Common Confusions (And the Correct Mental Model)

---

### Confusion A — “At-least-once means duplicates are a bug”

No.

At-least-once means:

- duplicates are expected
- your system must handle them

### Confusion B — “Kafka / broker gives exactly-once, so we’re done”

Even if a broker supports certain exactly-once semantics internally, end-to-end systems still involve:

- external databases
- external APIs
- downstream retries
- out-of-order events

So you still design for duplicates unless your full pipeline is strictly constrained and transactional.

### Confusion C — “Idempotency = dedupe table”

A dedupe table helps, but idempotency is about the _right boundary_.

If you dedupe too late, you may still create duplicate side effects.

---

## 7. Phase 3 Connection (Payments)

---

Payments cannot tolerate duplicate effects.

So the Phase 3 reliability toolkit is:

- API idempotency (same user intent)
- step idempotency (ledger/notify)
- atomic update patterns (balance invariants)
- saga coordination (multi-service workflows)
- outbox/inbox patterns (when messaging is involved)

Together, these produce:

> at-least-once delivery + retries + reprocessing  
> but **exactly-once effects** where it matters (money).

---

## Key Takeaways

---

- Separate **delivery**, **processing**, and **effects**.
- **Idempotency** makes repeats safe (same outcome).
- **Deduplication** is a technique to detect and ignore repeats.
- “Exactly-once” is ambiguous—most systems aim for **exactly-once effects**, not exactly-once delivery.
- In production, expect at-least-once delivery and design idempotent boundaries.

---

## TL;DR

---

Idempotency is a property, deduplication is a mechanism, and “exactly-once” is often misused.

Design for at-least-once delivery and retries, then enforce **exactly-once effects** using idempotency keys, dedupe/inbox stores, and atomic writes.

---

### 🔗 What’s Next

Now that retries and duplicates are clear, we move to the next correctness pressure:

- scaling reads using replicas
- replication lag
- stale reads and consistency trade-offs

👉 **Up Next: →**  
**[Database Replication — Leader/Replica Basics](/learning/advanced-skills/high-level-design/4_correct-reliable-systems/concepts/8_11_replication-leader-replica-basics/)**
