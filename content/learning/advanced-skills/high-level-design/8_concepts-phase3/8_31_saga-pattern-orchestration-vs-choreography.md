---
title: "Saga Pattern — Orchestration vs Choreography"
description: "Compare the two ways to implement sagas: orchestration (central coordinator) and choreography (event-driven). Learn trade-offs around complexity, observability, failure handling, and why Phase 3 uses orchestration as the baseline."
keywords:
  - saga orchestration vs choreography
  - distributed coordination patterns
  - event driven saga choreography
  - saga coordinator workflow engine
  - compensating transactions orchestration
  - microservices saga tradeoffs
weight: 31
date: 2026-03-28
layout: "topic-content"
---

# Saga Pattern — Orchestration vs Choreography

---

Once you accept that “global ACID” is not the baseline, a saga becomes the coordination pattern.

But sagas can be implemented in two major ways:

1. **Orchestration** — one component coordinates the workflow
2. **Choreography** — services coordinate by reacting to events (no central coordinator)

Both are valid.

But they have very different operational profiles.

This article explains the trade-offs and clarifies why Phase 3 uses orchestration as the baseline.

---

## 1. Orchestration (Central Coordinator)

---

### 1.1 What it means

In orchestration:

- a **saga orchestrator** owns the workflow state machine
- it tells each participant what to do next
- it decides retries, timeouts, and compensations

Participants are “workers” from the saga point of view.

### 1.2 Conceptual flow

```mermaid id="orch831"
flowchart LR
    subgraph Client_Layer [Initiator]
        App[API / Client]
    end

    subgraph Orchestrator [Orchestrator]
        O["<b>Saga Manager</b><br/>(Durable State Machine)"]
    end

    subgraph Persistence [Durability]
        WF[(Workflow State DB)]
    end

    subgraph Participants [Participants]
        A[Payment Service]
        B[Inventory Service]
        C[Shipping Service]
    end

    %% Start
    App -->|1. Start Saga| O

    %% Durability: every transition is persisted
    O <-->|"Persist step state<br/>(step, status, retries)"| WF

    %% Step-by-step commands (solid)
    O -->|2. Command: Reserve Funds| A
    A -.->|3. Result: Success| O

    O -->|4. Command: Deduct Stock| B
    B -.->|5. Result: Fail| O

    %% Compensation path (solid)
    O -->|6. Compensate: Release Funds| A

    %% Shipping is not executed in this run
    O -.->|"Not executed (blocked by failure)"| C

    %% Styling
    style O fill:#fff8e1,stroke:#f57f17,stroke-width:2px
    style WF fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px

    style A fill:#e8f5e9,stroke:#2e7d32
    style B fill:#ffebee,stroke:#c62828
    style C fill:#eceff1,stroke:#607d8b
```

Orchestrator responsibilities:

- track workflow state durably
- emit commands (step execution)
- handle retries/timeouts
- trigger compensations
- route uncertain outcomes to NEEDS_REVIEW

### 1.3 Why teams like orchestration

- single place to understand workflow progress
- easier debugging and observability
- explicit control over timeouts and retries
- compensations are centralized and consistent

---

## 2. Choreography (Event-driven Coordination)

---

### 2.1 What it means

In choreography:

- there is no central coordinator
- each service publishes events after local commits
- other services react to those events

The workflow emerges from event subscriptions.

### 2.2 Conceptual flow

```mermaid
flowchart TD
    subgraph EB [<b>Distributed Message Broker</b>]
        direction LR
        Topics[(Topic: Orders / Payments / Shipping)]
    end

    subgraph S_A [<b>Payment Service</b>]
        A[Process Payment]
        RA[Refund Payment]
    end

    subgraph S_B [<b>Inventory Service</b>]
        B[Reserve Items]
        RB[Release Items]
    end

    subgraph S_C [<b>Shipping Service</b>]
        C[Prepare Shipment]
    end

    %% Forward Path
    A -->|"1. Pub: PaymentCompleted"| Topics
    Topics -.->|"2. Sub"| B
    B -->|"3. Pub: InventoryReserved"| Topics
    Topics -.->|"4. Sub"| C

    %% Failure path
    C --x|"5. Pub: ShippingFailed"| Topics

    %% Compensation Path
    Topics -.->|"6. Sub"| RB
    RB -->|"7. Pub: InventoryReleased"| Topics
    Topics -.->|"8. Sub"| RA

    %% Styling
    style EB fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style S_A fill:#e8f5e9,stroke:#2e7d32
    style S_B fill:#e8f5e9,stroke:#2e7d32
    style S_C fill:#fff3e0,stroke:#ef6c00
    style RA fill:#ffebee,stroke:#c62828
    style RB fill:#ffebee,stroke:#c62828

    %% Red dashed lines for failure/compensation
    linkStyle 4,5,6,7 stroke:#c62828,stroke-width:2px,stroke-dasharray: 5 5
```

Choreography relies heavily on:

- outbox/inbox patterns
- idempotent consumers
- clear event contracts

### 2.3 Why teams choose choreography

- no central coordinator service
- participants remain loosely coupled
- can scale naturally with event-driven architectures

---

## 3. Trade-offs (The Real Comparison)

---

### 3.1 Observability and debugging

- **Orchestration:** easier (one place has the workflow state)
- **Choreography:** harder (workflow is distributed across services/events)

Choreography often requires extra tooling:

- correlation IDs
- tracing
- workflow projection services

### 3.2 Complexity distribution

- **Orchestration:** complexity centralized
- **Choreography:** complexity distributed across services

In choreography, each service must implement:

- retry rules
- dedup logic
- compensation triggers (or publish compensation events)

### 3.3 Coupling and change management

- **Orchestration:** orchestrator knows participants (some coupling)
- **Choreography:** coupling shifts into event contracts (versioning becomes critical)

### 3.4 Failure handling

- **Orchestration:** explicit timeouts and recovery logic in one place
- **Choreography:** failure handling emerges via events; harder to guarantee completeness

### 3.5 “Workflow loops” risk

Choreography can accidentally create loops:

- service A emits event → triggers B → triggers A again

Orchestration avoids this because it controls the step sequence explicitly.

---

## 4. What We Choose in Phase 3 (Baseline)

---

For Phase 3 (Payment System), we choose **orchestration** as the baseline because:

- correctness-critical workflows need a clear owner of progress
- it is easier to explain and reason about in interviews
- it gives a natural place for:
  - durable workflow state
  - retry/timeout policy
  - compensation design
  - `NEEDS_REVIEW` handling

We still cover choreography as a valid approach (and it often appears in large event-driven platforms), but orchestration is the clean baseline for learning and correctness.

---

## 5. A Practical Decision Guide

---

Choose **orchestration** when:

- workflow is correctness-critical (payments, orders)
- you want explicit control over retries/timeouts
- you need strong observability and auditability
- compensation logic is non-trivial

Choose **choreography** when:

- your platform is heavily event-driven already
- workflows are loosely coupled and can tolerate eventual coordination
- you have mature observability and event versioning discipline
- teams want autonomy without a centralized coordinator

---

## Key Takeaways

---

- Orchestration uses a central coordinator with a durable workflow state machine.
- Choreography uses events and distributed reactions (no central coordinator).
- Orchestration centralizes complexity and observability; choreography distributes both.
- Phase 3 chooses orchestration as the baseline for correctness-critical payments.

---

## TL;DR

---

Both orchestration and choreography can implement sagas.

Orchestration is easier to reason about and operate for correctness-critical workflows (payments), while choreography fits event-driven platforms but requires stronger discipline around events, tracing, and distributed failure handling.

---

### 🔗 What’s Next

Next we’ll go deeper into what makes orchestration reliable:

- durable workflow state machines
- step statuses and transitions
- retry + timeout policy
- `NEEDS_REVIEW` as a first-class state

👉 **Up Next: →**  
**[Saga Pattern — Durable Workflow State Machine](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_32_saga-pattern-durable-workflow-state-machine)**
