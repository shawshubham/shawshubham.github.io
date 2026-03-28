---
title: "Concepts Hub — Correctness & Reliability Toolkit (Phase 3)"
description: "A navigation hub for Phase 3 concepts: ACID, idempotency, replication, consistency, distributed transactions, processing guarantees, sagas, and CAP—linked back to the Payment System example."
keywords:
  - system design correctness concepts
  - reliability toolkit distributed systems
  - idempotency replication saga concepts hub
  - payment system design concepts
  - processing guarantees outbox inbox
  - cap theorem consistency models
weight: 1
date: 2026-03-16
layout: "topic-content"
---

## 1. Concepts Hub — Correctness & Reliability Toolkit

---

Phase 3 (Payment System) showed a repeated pattern:

> the system works under normal conditions,  
> then reality introduces ambiguity (retries, lag, concurrency, partial failures),  
> and correctness becomes the main design problem.

This Concepts section is the reusable toolkit behind Phase 3.

- Example articles (Phase 3) stay practical and architecture-focused.
- Concepts explain the deeper theory and patterns you can reuse across systems.

---

## 2. How to Use This Concepts Section

---

There are two good ways to read these pages.

### 2.1 Option A — Read in order (structured learning)

If you want a guided path, read in order:

> ACID → Idempotency → Replication → Consistency → Distributed Transactions → Processing Guarantees → Saga → CAP

### 2.2 Option B — Jump in when you hit a problem (reference mode)

If you’re actively designing a system, jump to the concept that matches your current pain:

- duplicates and retries → **Idempotency**
- stale reads → **Replication** and **Consistency Models**
- race conditions → **ACID / Isolation / Atomic Updates**
- multi-service partial failures → **Saga**
- “DB commit but message lost” → **Outbox (Processing Guarantees)**
- “why can’t we have everything?” → **CAP (synthesis)**

---

## 3. Concept Map: Phase 3 Articles → Concepts

---

Use this map to connect the Payment System evolution to the deeper topics.

- **Duplicate requests** → Idempotency
- **Scaling reads** → Replication + Consistency
- **Concurrent writes** → ACID, Isolation, Atomic Updates
- **Partial failures** → Distributed Tx + Processing Guarantees + Saga
- **Saga orchestration** → Saga + Outbox/Inbox + Guarantees
- **Synthesis lens** → CAP Theorem

---

## 4. What We Cover in Phase 3 Concepts (TOC)

---

### 4.1 ACID Transactions

- **[1. ACID Transactions — What Transactions Guarantee](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_2_acid-transactions-what-they-guarantee)**
- **[2. ACID Transactions — Isolation Levels & Read Phenomena](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_3_acid-isolation-levels-and-read-phenomena)**
- **[3. ACID Transactions — Locking, Contention, and Deadlocks](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_4_locking-contention-deadlocks)**
- **[4. ACID Transactions — Atomic Money Updates (Single-statement patterns)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_5_atomic-money-updates)**

### 4.2 Idempotency

- **[1. Idempotency — Why Retries Create Duplicates](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_6_idempotency-why-retries-create-duplicates)**
- **[2. Idempotency — API Edge vs Step-level vs Workflow-level](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_7_idempotency-where-it-live)**
- **[3. Idempotency — Storage Patterns (DB-first vs Redis/KV)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_8_idempotency-storage-patterns)**
- **[4. Idempotency — Cross-store Consistency Trap (DB + Redis)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_9_idempotency-cross-store-consistency-trap)**
- **[5. Idempotency — Idempotency vs Dedup vs Exactly-Once](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_10_idempotency-vs-dedup-vs-exactly-once)**

### 4.3 Database Replication

- **[1. Database Replication — Leader/Replica Basics](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_11_database-replication-basics)**
- **[2. Database Replication — Replication Lag & Stale Reads](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_12_database-replication-lag-stale-reads)**
- **[3. Database Replication — Read Strategies (Critical vs Non-critical)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_13_database-replication-read-strategies)**
- **[4. Database Replication — Monitoring Lag & Safe Degradation](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_14_database-replication-monitoring-safe-degradation)**
- **[5. Database Replication — Synchronous Replication & Quorum Reads (Advanced)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_15_database-sync-replication-quorum-reads)**

### 4.4 Consistency Models

- **[1. Consistency Models — Vocabulary That Actually Matters](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_16_consistency-models-vocabulary)**
- **[2. Consistency Models — Stale Reads vs Lost Updates vs Inconsistency](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_17_consistency-stale-reads-lost-updates-inconsistency)**
- **[3. Consistency Models — Designing UX Around Consistency](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_18_consistency-designing-us-around-consistency)**
- **[4. Consistency Models — Consistency With Caches (Bridge)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_19_consistency-with-caches)**

### 4.5 Distributed Transactions

- **[1. Distributed Transactions — Why “Global ACID” is Hard](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_20_districuted-transactions-why-global-acid-is-hard)**
- **[2. Distributed Transactions — Two-Phase Commit (2PC) in Plain English](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_21_distributed-transactions-two-phase-commit)**
- **[3. Distributed Transactions — Practical Alternatives](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_22_distributed-transaction-2pc-practical-alternatives)**
- **[4. Distributed Transactions — When 2PC Still Makes Sense](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_23_distributed-transactions-when-2pc-makes-sense)**

### 4.6 Processing Guarantees

- **[1. Processing Guarantees — At-most vs At-least vs Exactly-Once](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_24_processing-guarantees-atmost-atleast-exactly-once)**
- **[2. Processing Guarantees — Why Duplicates Happen](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_25_processing-guarantees-why-duplicates-happen)**
- **[3. Processing Guarantees — Idempotent Consumers (Exactly-once Effects)](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_26_processing-guarantees-idempotent-consumers)**
- **[4. Processing Guarantees — Transactional Outbox Pattern](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_27_processing-guarantees-transactional-outbox-pattern)**
- **[5. Processing Guarantees — Inbox / Dedup Store Pattern](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_28_processing-guarantees-inbox-dedup-store)**
- **[6. Processing Guarantees — Ordering, Reprocessing, and DLQs](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_29_processing-guarantees-ordering-reprocessing-dlqs)**

### 4.7 Saga Pattern & Distributed Coordination

- **1. Saga Pattern — Core Idea (Local Tx + Compensation)**
- **2. Saga Pattern — Orchestration vs Choreography**
- **3. Saga Pattern — Durable Workflow State Machine**
- **4. Saga Pattern — Compensation Design (Rules & Pitfalls)**
- **5. Saga Pattern — Choreography Reliability (Deep Dive)**
- **6. Saga Pattern — Reconciliation as a First-class Component**

### 4.8 CAP Theorem (Synthesis)

- **1. CAP Theorem — Correct Interpretation (No Myths)**
- **2. CAP Theorem — Applying CAP to Phase 3 Decisions**
- **3. CAP Theorem — CAP + Consistency Models (Synthesis)**

---

## Suggested Starting Point

---

If you’re coming straight from Phase 3 example articles, start here:

1. **Idempotency**
2. **Processing Guarantees + Outbox/Inbox**
3. **Saga**

Then circle back to ACID / Replication / Consistency / Distributed Transactions / CAP as needed.

---

### 🔗 What’s Next

We’ll begin the toolkit with the foundation of local correctness:

- what ACID transactions guarantee
- what they don’t guarantee
- why payments start with strong transactional boundaries

👉 **Up Next: →**  
**[ACID Transactions — What Transactions Guarantee](/learning/advanced-skills/high-level-design/8_concepts-phase3/8_2_acid-transactions-what-they-guarantee)**
