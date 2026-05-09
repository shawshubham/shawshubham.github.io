---
title: "Saga Pattern — Reconciliation as a First-class Component"
description: "Even with sagas, idempotency, and outbox/inbox patterns, distributed systems drift. Learn why reconciliation is inevitable, what to reconcile, how to detect mismatches, and how to heal safely."
keywords:
  - saga reconciliation
  - distributed systems reconciliation
  - payment reconciliation workflow
  - mismatch detection distributed systems
  - needs review operations
  - outbox inbox reconciliation
weight: 35
date: 2026-03-16
layout: "topic-content"
---

# Saga Pattern — Reconciliation as a First-class Component

---

Sagas reduce the risk of distributed inconsistency.

But they do **not** eliminate it.

Even with:

- idempotency at API + step + workflow level
- durable orchestration state
- transactional outbox + inbox dedup
- bounded retries and compensations

real systems still drift.

Why?

Because the world includes:

- outages
- deployments
- operator actions
- schema/event version mismatches
- rare edge cases where outcomes are **in doubt**

So mature systems treat reconciliation as a first-class capability:

> **detect mismatches and heal them reliably.**

This article explains what reconciliation is, why it is unavoidable, and how to design it safely.

---

## 1. What Reconciliation Means (Practical Definition)

---

**Reconciliation** is a periodic or triggered process that:

1. compares state across services/sources
2. detects mismatches
3. repairs them automatically or escalates to manual review

The key is that reconciliation operates **after the fact**.

It is the safety net that closes the gap between:

- what your workflow _intended_
- and what actually happened in production

---

## 2. Why Reconciliation Is Necessary (Even With Sagas)

---

Sagas are designed for failures you can handle inline:

- retry
- compensate
- move to terminal state

But there are still failure classes sagas cannot fully prevent.

### 2.1 In-doubt outcomes (timeouts create ambiguity)

Example:

- orchestrator sends `PostLedger(paymentId=123)`
- ledger processes it
- response/event is lost

Now the orchestrator doesn’t know whether ledger posted or not.

You can retry (idempotently), but after a bounded window you may still be uncertain.

This is where `NEEDS_REVIEW` exists.

Reconciliation is how you resolve these safely.

### 2.2 Operational drift

- manual fixes
- hot patches
- backfills

These can create valid local states that no longer match global expectations.

### 2.3 Data pipeline issues

- delayed event delivery
- consumer downtime
- DLQ backlog

Even with outbox/inbox, downstream projections can fall behind or miss updates until replay.

### 2.4 Rare edge cases you didn’t model

Every real system has them.

Reconciliation ensures those become:

- measurable
- repairable
- auditable

---

## 3. What To Reconcile (Payments Example)

---

Reconciliation works best when you define explicit “truth sources” and invariants.

For a payment workflow, common reconciliation targets are:

### 3.1 Payment status vs ledger status

Invariant (conceptual):

- if payment is `CONFIRMED`, ledger must have a matching posting

Mismatch examples:

- payment confirmed, ledger missing
- ledger posted, payment still pending

### 3.2 Balance/account invariants

Invariant:

- the balance changes implied by ledger entries must match the computed balance

This is why many systems treat the ledger as source-of-truth and balances as derived.

### 3.3 Orchestrator workflow state vs service state

Invariant:

- orchestrator step state (LEDGER_POSTED) should match ledger service step state

This catches:

- orchestrator progressed incorrectly
- service executed but orchestrator missed the result

### 3.4 Notification side effects (best-effort)

These are typically lower criticality:

- user didn’t get notified

Fix:

- send notification again (idempotent)

Reconciliation distinguishes:

- correctness-critical mismatches
  n- UX/ops mismatches

---

## 4. How Reconciliation Detects Mismatches

---

There are two common approaches.

### 4.1 Compare two sources (dual-read)

Example:

- read payment record from Payments DB
- read ledger record from Ledger DB
- compare expected invariants

This is simple and effective.

### 4.2 Build a workflow projection (event-sourced view)

In event-driven systems, you can maintain a “workflow view” table:

- consumes events
- maintains a current workflow snapshot

Reconciliation checks the projection against source-of-truth stores.

Projection is not truth.

It is an observability surface that makes mismatches easier to detect.

---

## 5. Healing Strategies (How to Repair Safely)

---

Once you detect a mismatch, you need deterministic actions.

### 5.1 Retry missing step (preferred)

If the missing step is retryable and idempotent:

- re-issue `PostLedger(paymentId, stepKey)`

This is why step-level idempotency is mandatory.

### 5.2 Run compensation (when completion is impossible)

If the workflow cannot complete safely:

- reverse reservation
- post ledger reversal
- issue refund (possibly another saga)

### 5.3 Rebuild projections / replay DLQ

If mismatch is caused by pipeline delay:

- replay events
- reprocess DLQ
- rebuild projection

### 5.4 Escalate to manual review

Some cases should not be auto-fixed:

- repeated ambiguity after bounded retries
- external provider disputes
- inconsistent third-party settlement

So reconciliation should produce:

- a review item with full evidence
- a safe “operator action” workflow

---

## 6. A Practical Reconciliation Loop (Design Pattern)

---

A common pattern is a periodic job:

1. query “candidates” (recent payments, or workflows in NEEDS_REVIEW)
2. compute expected invariants
3. compare against actual states
4. decide repair action
5. execute repair idempotently
6. record audit trail

Candidates are chosen deliberately to keep the process scalable.

Example candidate sets:

- workflows stuck in `RECOVERING` for > X minutes
- workflows in `NEEDS_REVIEW`
- high-value payments
- a random sample for continuous correctness validation

---

## 7. Observability: Reconciliation as an SLO

---

If you build reconciliation, you can measure correctness.

Useful metrics:

- mismatch rate (per type)
- time-to-reconcile (p95)
- number of workflows entering NEEDS_REVIEW
- auto-heal success rate
- manual review backlog

A mature system does not hide drift.

It treats it as a measurable operational reality.

---

## 8. Common Pitfalls

---

### Pitfall A — No clear source of truth

If you don’t define truth sources, reconciliation becomes subjective.

### Pitfall B — Non-idempotent repair actions

Reconciliation runs repeatedly.

If repairs are not idempotent, reconciliation creates new incidents.

### Pitfall C — Repair without audit trail

Payments require auditability.

Every reconciliation action should be recorded:

- what was detected
- what action was taken
- why it was taken
- who/what triggered it

### Pitfall D — Treating reconciliation as a “rare emergency tool”

Reconciliation should be routine and safe.

If it is only used in emergencies, it won’t be reliable when you need it most.

---

## Key Takeaways

---

- Sagas reduce inconsistency risk but do not eliminate drift.
- Reconciliation detects mismatches and heals them safely.
- Define invariants and truth sources (payments vs ledger vs workflow state).
- Healing relies on idempotent repair actions and bounded policies.
- `NEEDS_REVIEW` is a valid terminal state; reconciliation is how you resolve it.
- Treat reconciliation as an operational metric, not an afterthought.

---

## TL;DR

---

Distributed workflows drift in production.

Reconciliation is the safety net: detect mismatches, retry/compensate safely, rebuild projections when needed, and escalate truly ambiguous cases to review.

---

### 🔗 What’s Next

Next we’ll close Phase 3 Concepts with the synthesis lens:

- what CAP actually says (no myths)
- how it explains the trade-offs we made (leader reads, RYW, sagas, NEEDS_REVIEW)

👉 **Up Next: →**  
**[CAP Theorem — Correct Interpretation (No Myths)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_36_cap-theorem-correct-interpretation/)**
