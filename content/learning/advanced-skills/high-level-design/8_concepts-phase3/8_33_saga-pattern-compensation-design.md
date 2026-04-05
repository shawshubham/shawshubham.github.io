---
title: "Saga Pattern — Compensation Design (Rules & Pitfalls)"
description: "Compensation is not a perfect undo. Learn how to design compensations for payment workflows, choose refund vs reversal, handle non-compensatable steps, and avoid common saga pitfalls."
keywords:
  - compensating transactions
  - saga compensation design
  - refund vs reversal
  - payment compensation pitfalls
  - needs review saga
  - distributed workflow invariants
weight: 33
date: 2026-03-29
layout: "topic-content"
---

# Saga Pattern — Compensation Design (Rules & Pitfalls)

---

In a saga, local transactions commit step-by-step.

That means once a step commits, you cannot “roll back globally”.

So if the workflow fails later, you need a recovery action.

That recovery action is called **compensation**.

The most important thing to internalize is:

> compensation is not a perfect undo.  
> it is a domain-specific action that restores correctness invariants.

This article explains how to design compensations for payment workflows and avoid the pitfalls that cause real incidents.

---

## 1. Compensation vs Rollback (The Critical Difference)

---

### Rollback (local transaction)

- happens inside one DB transaction
- restores the exact previous state
- automatic and precise

### Compensation (distributed workflow)

- happens after local commits already happened
- cannot guarantee returning to the exact previous state
- may require new writes (refund, reversal, release)
- may fail itself and require retries/recovery

Rollback is a database feature.

Compensation is a system design feature.

---

## 2. Identify What You’re Protecting: Invariants

---

Before writing compensations, define invariants that must hold end-to-end.

Payment examples:

- money must not disappear
- money must not be created
- ledger must reconcile with balances
- user-visible status must not lie (or must clearly express uncertainty)

Compensation is designed to restore these invariants even when the workflow cannot complete.

---

## 3. Refund vs Reversal vs Release (Common Payment Compensations)

---

Compensation is not one thing. It depends on what already happened.

### 3.1 Release (undo a reservation / hold)

If you reserved funds but did not capture:

- move funds from `reserved` back to `available`

This is the cleanest compensation because money never left the account.

### 3.2 Reversal (undo a ledger posting)

If you already posted to the ledger:

- create a reversing ledger entry (not delete history)

Reversal is preferred because it preserves auditability:

- you don’t erase records; you offset them.

### 3.3 Refund (money already moved externally)

If you already captured funds and moved money:

- you may need a refund workflow

Refund is often not instantaneous:

- it can be delayed
- it can fail
- it may require external settlement rails

So refund compensation is often itself a saga.

---

## 4. Design Rule: Compensations Must Be Idempotent

---

Compensation steps are still steps.

They can be retried.

So they must be idempotent just like forward steps.

Examples:

- `paymentId:RELEASE_RESERVATION`
- `paymentId:POST_REVERSAL`
- `paymentId:ISSUE_REFUND`

This avoids “double refund” incidents.

---

## 5. Not Everything Is Compensatable (And That’s OK)

---

Some steps cannot be undone cleanly:

- sending an email/SMS (you can send a correction, but not “unsend”)
- notifying downstream systems (you can send a follow-up event)
- external third-party API calls that already took effect

So you classify steps:

### 5.1 Compensatable steps

- holds/reservations
- ledger entries (via reversal)
- state transitions (via compensating transitions)

### 5.2 Non-compensatable steps

- notifications
- external irreversible side effects

For non-compensatable steps, the design approach is:

- make them last (after core correctness is finalized), or
- make them safe to repeat / send corrections, or
- treat them as “best effort” with retry/DLQ

---

## 6. Partial Compensation and `NEEDS_REVIEW`

---

Sometimes compensation fails or becomes ambiguous:

- you attempted reversal, but the ledger service timed out
- you cannot tell if it succeeded
- repeated retries are risky

This is where `NEEDS_REVIEW` is a correct outcome.

A good saga design includes:

- a terminal “in doubt” state
- reconciliation tooling
- manual operations path

It is better to be explicitly uncertain than to lie.

---

## 7. Common Pitfalls (What Breaks Real Systems)

---

### Pitfall A — Treating compensation as “delete the record”

Deleting payment/ledger records destroys auditability and makes reconciliation impossible.

Prefer:

- offsetting entries (reversal)
- explicit state transitions

### Pitfall B — Compensating after irreversible steps

If you send irreversible side effects early (notifications, third-party calls), compensation becomes messy.

Fix:

- reorder steps so irreversible actions happen last.

### Pitfall C — Non-idempotent compensations

If compensation can run twice, you can double-refund or over-correct.

Always use idempotency keys and durable step state.

### Pitfall D — No timeouts / no terminal uncertainty state

If you retry forever, incidents never end.

If you guess outcomes, you create silent money mismatches.

Always have:

- bounded retries
- escalation to `NEEDS_REVIEW`

---

## 8. Phase 3 Connection (Payment System)

---

Phase 3’s payment workflow evolution naturally leads here:

- partial failures across services require a saga
- sagas require compensations
- compensations require idempotency and auditability

A robust payment system is defined by:

- how well it handles failure paths
- not just by how well it handles the happy path

---

## Key Takeaways

---

- Compensation is not rollback; it is a domain-specific recovery action after commits.
- Design compensations around invariants (money conservation, auditability, truthful status).
- Prefer release/reversal over deletion; refund is often its own workflow.
- Compensations must be idempotent and retry-safe.
- Some steps are not compensatable—place them late or make them correctable.
- Include `NEEDS_REVIEW` and reconciliation for ambiguous outcomes.

---

## TL;DR

---

Sagas recover from partial failures using compensation steps, not global rollbacks.

Design compensations to restore invariants, keep them idempotent, avoid irreversible side effects early, and treat “in doubt” as a first-class outcome (`NEEDS_REVIEW`) with reconciliation support.

---

### 🔗 What’s Next

Next we’ll go deeper on choreography reliability:

- how choreography-based sagas remain correct under at-least-once delivery
- outbox/inbox per service
- why observability is harder and how teams mitigate it

👉 **Up Next: →**  
**[Saga Pattern — Choreography Reliability (Deep Dive)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_34_saga-pattern-choreography-reliability)**
