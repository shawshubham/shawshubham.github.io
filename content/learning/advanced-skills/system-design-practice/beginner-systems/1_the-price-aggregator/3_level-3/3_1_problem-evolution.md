---
title: "Level 3 — Problem Evolution: Scaling Beyond a Single Node"
description: "Evolve the Price Aggregator from a single-instance service to a distributed, highly available system handling real-world trading workloads."
keywords:
  - distributed system design
  - price aggregator scaling
  - system design trading systems
  - kafka streaming design
  - high availability architecture
weight: 1
layout: "topic-content"
---

## 1. Why We Need to Evolve Further

---

So far, we have built a `PriceTracker` that is:

- functionally correct
- optimized using prefix sums
- thread-safe using proper locking

But it still assumes:

```text
Single JVM
Single machine
Shared memory
```

> ❗ This assumption does not hold in real-world trading systems.

---

## 2. The Real-World Scenario

---

Let’s evolve the problem again:

> “Your Price Aggregator is now deployed in production for a global trading platform.”

New constraints:

- Users are located across regions (e.g., London, Singapore)
- Price feeds are coming from multiple exchanges
- System must handle **millions of price updates per second**
- System must be **highly available (HA)**

---

## 3. What Breaks in Our Current Design?

---

Our current system has major limitations:

---

### ❌ 1. Single Point of Failure

```text
One JVM crashes → system is down
```

No redundancy.

---

### ❌ 2. Limited Scalability

```text
One machine = limited CPU + memory
```

Cannot handle:

- high-frequency tick data
- multiple instruments

---

### ❌ 3. No Data Persistence

```text
All data is in-memory
```

If system restarts:

```text
All price history is lost
```

---

### ❌ 4. No Horizontal Scaling

We cannot simply add more instances because:

```text
State is local to each instance
```

👉 Different nodes will have inconsistent data

---

### ❌ 5. No Fault Tolerance

```text
If one instance fails → no recovery
```

---

## 4. New System Requirements

---

We now need to design a system that supports:

### Scalability

- handle high throughput
- distribute load across multiple nodes

---

### High Availability (HA)

- system should survive node failures
- no downtime

---

### Data Durability

- price data should not be lost
- support recovery after crash

---

### Low Latency

- real-time price aggregation
- fast moving average queries

---

### Consistency

- correct ordering of price updates
- accurate moving averages

---

## 5. Key Insight — We Must Break the Monolith

---

Our current design tightly couples:

```text
data ingestion
state management
query handling
```

To scale, we must separate these concerns.

---

## 6. New Direction

---

Instead of:

```text
threads updating shared memory
```

We move toward:

```text
event-driven architecture
```

---

High-level idea:

```text
Producers (price feeds)
        ↓
Message Queue (Kafka)
        ↓
Aggregator Service (consumes events)
        ↓
Storage / Cache
        ↓
Clients (queries)
```

---

## 7. Concept Shift

---

We are moving from:

```text
in-memory object design
```

To:

```text
distributed streaming system
```

---

## 8. Questions We Now Need to Answer

---

As we design the system, we must think about:

- How do we distribute price updates across nodes?
- How do we ensure ordering of events?
- Where do we store aggregated data?
- How do we serve fast queries?
- What happens if a node crashes?
- How do we recover state?

---

## 9. Interview Transition

---

At this stage, in an interview, you would say:

> “So far, we have built a thread-safe in-memory solution. However, this won’t scale for a real trading system. I would now evolve this into a distributed system using an event-driven architecture, where price updates are streamed through a message broker like Kafka, processed by aggregator services, and stored in a combination of in-memory cache and persistent storage.”

---

## Conclusion

---

Our Level 1 and Level 2 solutions are building blocks.

But to handle real-world workloads, we must:

```text
move from single-node thinking → distributed system design
```

---

### 🔗 What’s Next?

👉 **[Level 3 — High-Level Architecture Design →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/3_level-3/3_2_high-level-architecture/)**

---

> 📝 **Takeaway**:
>
> - Single-instance systems do not scale for real-world workloads
> - We need horizontal scaling and fault tolerance
> - Event-driven systems are a natural fit for streaming data
> - System design now shifts from code → architecture
