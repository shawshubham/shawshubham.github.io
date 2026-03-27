---
title: "Consistency Models — Designing UX Around Consistency"
description: "Learn how to choose consistency per user experience: which screens must be strongly consistent, which can be eventual, and how to design product flows that stay trustworthy under replication lag."
keywords:
  - designing ux around consistency
  - strong vs eventual consistency ux
  - read your writes user experience
  - payment status consistency
  - stale reads mitigation ux
  - system design consistency decisions
weight: 18
date: 2026-03-27
layout: "topic-content"
---

# Consistency Models — Designing UX Around Consistency

---

Consistency is not just a database choice.

It is a **product choice**.

Two screens in the same app can legitimately require different consistency guarantees:

- payment confirmation screen must be correct immediately
- transaction history list can be eventual

If you treat all reads the same, you either:

- overload the leader (too strict)
- or show confusing stale state (too loose)

This article gives a practical UX-driven framework for consistency decisions.

---

## 1. Start From User Expectations, Not From Databases

---

Users don’t think in “leader vs replica”.

They think:

- “I paid — did it work?”
- “Did my message send?”
- “Why did it disappear after refresh?”
- “Why is my balance wrong?”

So the correct design approach is:

> classify reads by user expectation and business risk.

---

## 2. UX Categories for Consistency (A Practical Framework)

---

### 2.1 Immediate confirmation screens (must not be stale)

These screens appear right after an action and must reflect the action.

Examples:

- payment confirmation / payment status
- balance after debit
- order placed / booking confirmed

Consistency requirement:

- **strong / read-your-writes**
- leader reads for a short window after write

If this screen shows stale results, users retry, and retries become incidents.

---

### 2.2 “Inbox / feed / history” screens (can be eventual)

These screens are browsing-oriented:

- transaction history pages
- notification inbox
- activity feed

Users tolerate small delays as long as:

- it converges reasonably quickly
- it doesn’t “time travel” (monotonic reads help)

Consistency requirement:

- eventual is acceptable
- replicas are fine for most reads
- still prefer RYW for very recent items (first page after action)

---

### 2.3 Aggregations and analytics (eventual by default)

Examples:

- “Total spent this month”
- “Daily summary”
- dashboards

Consistency requirement:

- eventual is expected
- correctness is defined by eventual convergence and periodic recompute

---

### 2.4 Workflows that depend on correctness (must be fresh)

Some reads are internal but correctness-critical:

- fraud check decisions based on latest state
- idempotency checks
- workflow step transitions

Consistency requirement:

- leader reads or strong consistency paths
- avoid making workflow decisions from replicas during lag

---

## 3. Concrete Example: Payment UX With Replication

---

A payment flow commonly has two user-facing reads:

### 3.1 “Payment succeeded” screen (critical)

Right after payment:

- user refreshes
- user checks status
- user expects to see it

Design choice:

- route this to leader
- apply RYW for a short window (e.g., 30s)

### 3.2 “Transaction history” screen (mostly non-critical)

History list:

- can be served from replicas
- can be paginated
- stale reads are acceptable as long as it converges

Design choice:

- first page after payment can be leader (RYW window)
- older pages can be replicas

This is the pattern Phase 3 used explicitly.

---

## 4. UX Patterns That Prevent Retry Spirals

---

Stale reads don’t just confuse users—they trigger retries.

So a good UX design includes “anti-retry” patterns.

### 4.1 Avoid showing “NOT FOUND” immediately after success

Instead of:

- “payment not found”

Use:

- “Payment is processing. Refresh in a moment.”

This reduces panic retries during lag windows.

### 4.2 Use clear state models

States like:

- `PENDING`
- `CONFIRMED`
- `FAILED`
- `NEEDS_REVIEW`

help you communicate uncertainty safely.

This is particularly important in distributed workflows.

### 4.3 Use monotonic reads on critical screens

Once the UI shows `CONFIRMED`, it should not show `PENDING` on refresh.

Sticky routing (to leader or same replica) prevents “time travel”.

---

## 5. How to Turn This Into an Engineering Policy

---

Convert UX expectations into a routing policy.

Example baseline policy:

- **critical endpoints** → leader
- **non-critical endpoints** → replicas
- **RYW window** after write → leader for that user/session
- **monotonic reads** for critical screens (avoid time travel)
- during lag incidents → degrade safely by routing more reads to leader

This ties together:

- replication concepts
- consistency vocabulary
- practical product behavior

---

## 6. Common Mistakes (UX + Consistency)

---

### Mistake A — Treating all screens equally

Result:

- either too strict (leader overload)
- or too loose (stale confirmation screens)

### Mistake B — Using eventual consistency for confirmations

This creates:

- distrust
- retries
- duplicate requests (even if idempotent, you still pay load and risk)

### Mistake C — Ignoring monotonic reads

Users see “time travel” and assume the system is broken.

---

## Key Takeaways

---

- Consistency is a product decision: choose per UX surface.
- Confirmation screens must be strong / RYW; history screens can be eventual.
- Good UX prevents retry spirals by communicating uncertainty safely.
- Convert UX expectations into routing policies: leader for critical reads, replicas for non-critical reads, RYW window after writes.
- Monotonic reads prevent “time travel” and reduce user confusion.

---

## TL;DR

---

Don’t choose one consistency model for your whole product.

Make confirmation screens strongly consistent (leader/RYW), allow history/feeds to be eventual (replicas), and use UX patterns that reduce retries and confusion during lag windows.

---

### 🔗 What’s Next

Next we’ll bridge replication consistency with caching consistency:

- why caches create another stale-read layer
- how cache staleness differs from replica lag
- the mental model to avoid mixing them up

👉 **Up Next: →**  
**[Consistency Models — Consistency With Caches (Bridge)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_19_consistency-with-caches)**
