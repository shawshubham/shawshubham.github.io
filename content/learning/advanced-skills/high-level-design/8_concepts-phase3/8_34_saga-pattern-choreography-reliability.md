---
title: "Saga Pattern — Choreography Reliability (Deep Dive)"
description: "Choreography-based sagas can work, but reliability moves into event contracts, outbox/inbox patterns, correlation IDs, and workflow projections. Learn how teams keep choreography correct under at-least-once delivery."
keywords:
  - choreography saga reliability
  - event driven saga outbox inbox
  - correlation id tracing sagas
  - workflow projection view
  - choreography compensation events
  - distributed saga observability
weight: 34
date: 2026-03-29
layout: "topic-content"
---

# Saga Pattern — Choreography Reliability (Deep Dive)

---

Choreography-based sagas remove the central orchestrator.

Instead:

- services publish events after local commits
- other services react and publish their own events
- compensations are also triggered via events

This can be a good fit for highly event-driven platforms.

But the trade-off is clear:

> orchestration centralizes reliability logic,  
> choreography distributes reliability logic across services and event contracts.

So reliability in choreography depends on discipline:

- outbox/inbox everywhere
- explicit correlation IDs
- clear event contracts and versions
- workflow projection for observability
- compensation events as first-class messages

This article shows what “reliable choreography” looks like in practice.

---

## 1. The Core Reliability Problem: At-least-once + No Central State

---

In choreography:

- delivery is often at-least-once
- duplicates happen
- events can arrive out of order
- there is no single component that “knows the workflow state”

So each service must be able to answer:

- “have I already processed this event?”
- “what do I do if I see it again?”
- “how do I trigger compensation safely?”

That’s why outbox/inbox patterns are not optional.

---

## 2. Outbox/Inbox per Service (Non-negotiable)

---

Choreography requires:

### 2.1 Producer safety (Outbox)

Each service must publish events reliably:

- commit local state
- write event to outbox in same transaction
- relay publishes to event bus

This prevents missing/ghost events.

### 2.2 Consumer safety (Inbox / dedup)

Each service must handle duplicates:

- store `eventId` in inbox table
- apply side effects only if `eventId` is new
- commit atomically

This prevents duplicate side effects.

In other words:

> choreography works only if each service is independently reliable.

---

## 3. Event Design: Make Commands and Compensations Explicit

---

In orchestration, the orchestrator sends commands.

In choreography, “commands” often appear as events.

A common mistake is to rely on implicit “triggering”.

Instead, make events explicit:

- forward progress events:
  - `PaymentCompleted`
  - `InventoryReserved`
  - `ShipmentPrepared`

- compensation request events:
  - `ReleaseInventoryRequested`
  - `RefundPaymentRequested`

- compensation completion events:
  - `InventoryReleased`
  - `PaymentRefunded`

This makes the workflow legible and reduces accidental loops.

---

## 4. Correlation IDs (How You Debug Anything)

---

Without a central coordinator, debugging relies on correlation.

Every event should carry:

- `workflowId` (e.g., paymentId/orderId)
- `eventId` (unique)
- `causationId` (what caused this event)
- `correlationId` (trace across services)

This enables:

- tracing across services
- workflow reconstruction
- post-incident auditing

Without correlation IDs, choreography becomes “distributed mystery”.

---

## 5. Workflow Projection (A Practical Observability Upgrade)

---

Because no service owns global state, teams often build a projection:

- a “workflow view” service or table
- built by consuming events and updating a read model

This projection answers:

- where is paymentId=123 in the workflow?
- which step failed?
- what compensations ran?
- is it stuck?

Projection is not the source of truth.

It is an observability tool and support surface.

---

## 6. Failure Handling in Choreography (Practical Rules)

---

### 6.1 Duplicates are normal

- inbox/dedup store required

### 6.2 Out-of-order is possible

- enforce monotonic state transitions (versioning)
- ignore invalid transitions

### 6.3 Compensation must be idempotent

Compensation events can be replayed too.

So:

- refund/release steps must be idempotent
- compensation completion events must be idempotent for downstream consumers

### 6.4 Avoid accidental loops

Loops happen when:

- events trigger each other cyclically

Mitigations:

- explicit state machines
- causationId checks
- workflow projection audits
- “only react once per workflowId + step” constraints

---

## 7. Example: Event-driven Compensation Chain (Payment + Inventory + Shipping)

---

Below is an event-message based choreography flow:

```mermaid id="choreo834"
flowchart TD
    subgraph Event_Bus [Distributed Event Log / Message Bus]
        EB[("Events / Topics")]
    end

    subgraph Service_A [Payment Service]
        A[Process Payment]
        RA["Refund Payment (Compensation)"]
    end

    subgraph Service_B [Inventory Service]
        B[Reserve Items]
        RB["Release Items (Compensation)"]
    end

    subgraph Service_C [Shipping Service]
        C[Prepare Shipment]
    end

    %% Happy Path (event-driven)
    A -->|"1) Publish: PaymentCompleted"| EB
    EB -->|"2) Consume: PaymentCompleted"| B
    B -->|"3) Publish: InventoryReserved"| EB
    EB -->|"4) Consume: InventoryReserved"| C
    C -->|"5) Publish: ShipmentPrepared"| EB

    %% Failure Signal (event-driven)
    C -->|"6) Publish: ShippingFailed"| EB

    %% Compensation Chain (still event-driven)
    EB -.->|"7) Consume: ShippingFailed"| RB
    RB -.->|"8) Publish: InventoryReleased"| EB
    EB -.->|"9) Consume: InventoryReleased"| RA
    RA -.->|"10) Publish: PaymentRefunded"| EB

    %% Styling
    style EB fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style A fill:#e8f5e9,stroke:#2e7d32
    style B fill:#e8f5e9,stroke:#2e7d32
    style C fill:#fff3e0,stroke:#ef6c00
    style RA fill:#ffebee,stroke:#c62828
    style RB fill:#ffebee,stroke:#c62828
```

### Need to complete this section
