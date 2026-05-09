---
title: "CAP Theorem — Applying CAP to Phase 3 Decisions"
description: "Apply CAP as a practical lens to Phase 3 (Payment System): leader reads for critical paths, read-your-writes windows, replica usage for non-critical views, and why NEEDS_REVIEW is a CAP-friendly engineering response to uncertainty."
keywords:
  - cap theorem applied
  - cap payments system design
  - leader reads critical paths
  - read your writes cap
  - needs review cap
  - consistency availability tradeoffs
weight: 37
date: 2026-03-16
layout: "topic-content"
---

# CAP Theorem — Applying CAP to Phase 3 Decisions

---

In 8.36 we clarified what CAP really says:

- CAP matters under **partition-like conditions**
- under partitions, you choose between:
  - **Consistency** (fresh reads or error)
  - **Availability** (always respond, possibly stale)

Now we apply CAP to Phase 3 (Payment System).

The goal here is not to label the whole system “CP” or “AP”.

The goal is to show:

> **each Phase 3 decision is a CAP decision under failure.**

---

## 1. The Payment System Has Both CP and AP Surfaces

---

Payments are a great CAP teaching example because different parts of the product tolerate very different consistency levels.

### CP-style surfaces (correctness-first)

- payment confirmation status immediately after charge
- account balance checks
- idempotency key checks
- workflow step transitions (orchestrator state)

These surfaces must not lie.

If the system cannot guarantee freshness, it should:

- route to the leader, or
- return a controlled “processing/unknown” state

### AP-style surfaces (availability-first)

- transaction history views
- notification inbox pages
- analytics summaries

These can tolerate staleness.

If the system is degraded, it can still respond with:

- stale-but-reasonable results
- eventual convergence

This split is the core practical way CAP shows up in products.

---

## 2. Leader Reads for Critical Paths = CP Behavior

---

Phase 3 chose:

- **Writes → Leader**
- **Critical reads → Leader**

Why this is CP-style:

- if the system is partitioned from replicas, replicas may be stale
- leader reads preserve freshness (C)
- if leader is unavailable, the system may reject/block the operation rather than return stale state

This is a direct CAP trade-off:

> Prefer correctness (C) over “always respond” (A) for critical reads.

---

## 3. Replica Reads for Non-critical Views = AP Behavior

---

Phase 3 also chose:

- **Non-critical reads → Replicas**

Why this is AP-style:

- under lag/partition, replicas can still respond
- the system stays responsive (A)
- the data might be slightly stale (C sacrificed for those endpoints)

This is the product-friendly CAP trade-off:

> For history/feeds, availability is more valuable than perfect freshness.

---

## 4. Read-your-writes Window = Practical CAP Mitigation

---

Read-your-writes (RYW) is not a CAP escape hatch.

It is a pragmatic engineering technique that improves UX by routing specific reads to a fresher path.

Phase 3 used:

- **RYW for a short window after payment**

What this achieves:

- for the user who just wrote, we prefer consistency (leader reads)
- for everyone else browsing history, we still allow replicas

So RYW is an example of:

> **making CAP decisions per user/session, not per system.**

---

## 5. Sagas vs 2PC: Availability vs Global Atomicity

---

2PC pushes toward strong global coordination.

During partitions, coordination protocols can block, reducing availability.

Phase 3 moved toward:

- **sagas + durable workflow state**

Why this aligns with CAP reality:

- sagas tolerate partial failures and keep progress moving
- they avoid global blocking waits across services
- correctness is achieved via recovery (retry/compensation), not global atomic commit

This is the microservices-friendly trade:

> Prefer availability and resilience over global atomicity.

---

## 6. `NEEDS_REVIEW` Is a CAP-friendly Outcome

---

One of the most important Phase 3 ideas is:

- `NEEDS_REVIEW` / “in doubt” states

Why this is CAP-friendly:

During partition-like failures, you often cannot know the truth instantly.

Example:

- ledger might have processed a command, but response/event was lost

The system must choose:

- pretend it failed (risk double processing)
- pretend it succeeded (risk lying)
- or admit uncertainty

`NEEDS_REVIEW` is the correct engineering response because it:

- preserves user trust (no lying)
- prevents unsafe automation (no blind retries forever)
- creates a controlled operational workflow (reconciliation)

So `NEEDS_REVIEW` is essentially:

> **returning a safe “unknown” rather than violating consistency.**

---

## 7. A Simple Mapping Table (Phase 3 Decisions → CAP Lens)

---

| Phase 3 decision              | CAP lens under partitions    | Why it matters                        |
| ----------------------------- | ---------------------------- | ------------------------------------- |
| Critical reads → leader       | CP-style                     | freshness for correctness-critical UX |
| Non-critical reads → replicas | AP-style                     | stay responsive under lag             |
| RYW window after write        | per-session CP               | avoid confusing stale results         |
| Sagas instead of 2PC          | availability-first           | avoid global blocking coordination    |
| `NEEDS_REVIEW` terminal state | consistency-safe uncertainty | don’t lie when truth is unknowable    |
| Reconciliation jobs           | healing mechanism            | resolve drift and in-doubt outcomes   |

---

## Key Takeaways

---

- CAP decisions are not global labels; they are made per endpoint and per workflow.
- Phase 3 intentionally mixed CP and AP behavior:
  - CP for payment correctness
  - AP for history/feeds
- RYW is a practical way to apply stronger consistency only where UX needs it.
- Sagas acknowledge CAP reality: distributed coordination must tolerate partial failures.
- `NEEDS_REVIEW` is a CAP-friendly, trust-preserving response to uncertainty.

---

## TL;DR

---

Phase 3 is full of CAP decisions.

Payments choose correctness-first behavior for critical paths (leader reads, safe uncertainty) while allowing availability-first behavior for non-critical views (replicas).

Sagas and `NEEDS_REVIEW` are how real systems stay correct when partitions make truth temporarily unknowable.

---

### 🔗 What’s Next

Next we’ll synthesize CAP with everything we covered in Phase 3:

- replication + stale reads
- idempotency + duplicates
- sagas + recovery

We’ll end with a practical checklist you can use in system design interviews.

👉 **Up Next: →**  
**[CAP Theorem — CAP + Consistency Models (Synthesis)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_38_cap-consistency-synthesis/)**
