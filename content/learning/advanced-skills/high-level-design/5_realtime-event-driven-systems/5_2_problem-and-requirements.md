---
title: "Example 4: Real-Time Messaging System — Problem & Requirements"
description: "Define the scope, requirements, and constraints for a real-time system that supports Notifications + Chat, and preview the design pressures we will solve across Phase 4."
keywords:
  - real-time messaging system requirements
  - chat system requirements
  - notification system requirements
  - websocket requirements
  - event-driven system requirements
  - delivery guarantees ordering backpressure
weight: 2
date: 2026-03-16
layout: "topic-content"
---

## 1. What We Are Building

---

In Phase 4, we are building **Example 4: Real-Time Messaging System — Chat + Notifications**.

Why this example?

- **Chat** forces ordering expectations, low latency, and connection management.
- **Notifications** force fanout, retries, and offline delivery.

Together, they cover the real-time + event-driven pressures you will repeatedly see in interviews and production systems.

---

## 2. Problem Statement

---

We need a system that can:

- support **real-time chat** (1:1 and small groups)
- deliver **real-time updates** to users across devices
- deliver **notifications** (alerts) that often originate from chat activity
- remain reliable under bursty traffic, partial failures, and slow clients

Users should feel:

- messages arrive quickly when both users are online
- if they are offline, they still see what they missed after reconnect
- “new message” alerts show up consistently (without duplicates)
- duplicates (if they happen internally) do not become duplicate user-visible effects

---

## 3. Scope (What’s In)

---

### 3.1 Clarifying “Message” vs “Notification”

A **message** is the source of truth for chat.

A **notification** is an alert that something happened — often **derived from a message** — used for attention and offline UX.

For example, when a new chat message is created:

- recipients who are **in the conversation** should receive the **message**
- recipients who are **offline** (or not actively viewing the conversation) may receive a **notification** like: “New message from X”

In this phase, we will treat notifications as two categories:

- **Message-driven notifications** (derived from chat messages) ✅ primary focus
- **System notifications** (security/product/system alerts) (supported as a category, but not the main driver of complexity)

### 3.2 Notifications (Derived Alerts)

We will support:

- message-driven notifications (e.g., “New message”, “Mention”, “Unread count update”)
- system notification types: `SYSTEM`, `SECURITY`, `PRODUCT` (conceptual categories)
- delivery channels:
  - **in-app** (real-time)
  - **push** (optional integration boundary; we focus on in-app delivery semantics)
- multi-device delivery (same user may have multiple active sessions)

### 3.3 Chat

We will support:

- 1:1 chat and small group chat
- real-time delivery when users are online
- offline delivery on reconnect (recent history + missed messages)
- read receipts / typing indicators are _optional_ (we will treat them as non-critical events)

---

## 4. Out of Scope (For This Phase)

---

To keep Phase 4 focused, we explicitly defer:

- end-to-end encryption
- massive group chat (10k+ members) and “broadcast” channels
- complex search (full-text, advanced filters)
- advanced anti-abuse/spam systems
- multi-region active-active real-time routing

(These are all great topics, but they belong in later phases or Large-Scale System Design deep dives.)

---

## 5. Functional Requirements

---

### 5.1 Chat

- Send a message to a conversation.
- Deliver messages in real-time to online participants.
- Store messages durably.
- Allow clients to fetch conversation history.
- Support reconnect + replay of missed messages.

### 5.2 Notifications (Derived Alerts)

- Generate a notification for a user (or set of users) when an event happens.
  - primary event: **new chat message for a recipient**
  - optional: system/security/product events
- Deliver notifications in real-time to online users.
- Store notifications durably so users can:
  - see them later
  - receive them after reconnect
- Support marking notifications as `READ`.

---

## 6. Non-Functional Requirements (The Real Design Constraints)

---

### 6.1 Latency

- Real-time delivery should feel instant.
- Target: low p95 end-to-end latency (exact number depends on product; design for low tail latency).

### 6.2 Reliability

- The system must tolerate:
  - retries
  - timeouts
  - partial failures
  - duplicate delivery attempts

### 6.3 Ordering Expectations

- Chat requires a clear ordering expectation.
- We will aim for:
  - **per-conversation ordering** (not global ordering across the entire system)

### 6.4 Scalability

- Handle bursty traffic (spikes during launches/incidents).
- Scale fanout for notifications.
- Scale concurrent connections for chat.

### 6.5 Backpressure Safety

- Slow clients must not collapse the system.
- We need a plan for:
  - queue growth
  - consumer lag
  - load shedding for non-critical events

### 6.6 Operability

- We must be able to:
  - measure delivery latency
  - detect stuck delivery and consumer lag
  - replay safely (when needed)

---

## 7. Core Entities (Minimal Data Model)

---

We will keep entities minimal in the example and evolve details later.

### 7.1 Conversation + Message

**Conversation**

- `conversationId`
- `participantIds[]`
- `createdAt`

**Message**

- `messageId`
- `conversationId`
- `senderId`
- `content`
- `createdAt`
- `sequence` (ordering within a conversation — introduced later)

### 7.2 Notification (Derived Alert)

- `notificationId`
- `userId`
- `type` (e.g., `NEW_MESSAGE`, `MENTION`, `SYSTEM`)
- `payload`
- `createdAt`
- `status` (`UNREAD`, `READ`)
- `sourceType` (e.g., `MESSAGE`, `SYSTEM`) ✅
- `sourceId` (e.g., `messageId`) ✅

### 7.3 Session / Connection (conceptual)

- `userId`
- `deviceId`
- `connectionId`
- `connectedAt`
- `lastSeenCursor` (for replay)

---

## 8. The Design Pressures We Will Solve (Preview)

---

This section is intentionally a preview — we do not solve these yet.

### 8.1 Polling does not scale

- frequent polling wastes resources
- creates thundering herds
- increases latency and cost

We’ll evolve to **push** (WebSockets/SSE) in the baseline architecture.

### 8.2 Once you go real-time, you need an event bus

- producers and consumers must be decoupled
- fanout should not happen inside request threads

We’ll introduce **Pub/Sub vs Queue** decisions.

### 8.3 Delivery guarantees: duplicates are normal

- at-least-once delivery is common
- duplicates must be handled safely

We’ll use:

- idempotency keys
- dedupe patterns (Deep dive sits in Concepts.)

### 8.4 Ordering: what users expect vs what systems provide

- chat needs ordering semantics
- global ordering is unrealistic

We’ll design **per-conversation ordering**.

### 8.5 Fanout under bursts creates hot spots

- many recipients
- many devices per user
- sudden spikes

We’ll cover fanout models and hot-key mitigation.

### 8.6 Backpressure and overload control

- consumer lag increases
- queues grow
- retries can create storms

We’ll add:

- backpressure signals
- rate limits
- load shedding policies

### 8.7 Offline delivery and reconnect

- users disconnect often
- we must replay missed events safely

We’ll evolve toward:

- store-and-forward
- last-seen cursors
- bounded replay

### 8.8 Reprocessing and DLQs

- bugs happen
- outages happen
- poison messages exist

We’ll design safe replay + DLQ handling.

---

## 9. Key Takeaways

---

- Phase 4 builds a real-time system that supports **Chat** plus **message-driven Notifications**.
- **Messages are the source of truth**; **notifications are derived alerts** used for attention and offline UX.
- The core non-functional constraints are: **latency, ordering, reliability, fanout, backpressure, and operability**.
- The example will evolve one pressure at a time:
  - **push transport** → **event bus** → **delivery guarantees** → **ordering** → **fanout** → **backpressure** → **offline replay** → **reprocessing**.

---

## TL;DR

---

We’re designing a real-time messaging system where **messages are the core**, and **notifications are derived alerts** (often generated from new messages).

Low latency, ordering, duplicates, fanout, backpressure, offline replay, and reprocessing are unavoidable.

This article defines the scope and requirements. Next, we start with the simplest baseline architecture and evolve from there.

---

### 🔗 What’s Next

Next we’ll start from the simplest workable real-time baseline:

- polling → long polling
- then evolve to a push model (WebSockets/SSE)
- define the first end-to-end message/notification flow

👉 **Up Next: →**  
**[Real-Time System — Baseline Architecture (Polling → Simple Push)](/learning/advanced-skills/high-level-design/5_realtime-event-driven-systems/5_3_baseline-architecture)**
