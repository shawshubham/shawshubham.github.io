---
title: "How Do Microservices Share Data? (API vs Events vs Read Models)"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-117"
  phase: "Core"
  topic: "Data Management"
  round: "Technical"
  company: ""
  tags:
    [
      "microservices",
      "data sharing",
      "api composition",
      "event driven",
      "read models",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Microservices share data using APIs (synchronous calls), events (asynchronous communication), or read models (pre-computed data views), depending on consistency, latency, and scalability requirements.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how microservices collaborate
- trade-offs between sync and async communication
- real-world system design decisions
- data consistency vs performance

👉 This is a very practical system design question.

---

## 3. Problem — Data is Distributed

---

In microservices:

```text
Order Service → Order DB
Customer Service → Customer DB
```

👉 Data is split across services
👉 No direct joins

---

👉 So how do we combine data?

---

## 4. Three Main Approaches

---

### 1. API Composition (Synchronous)

---

One service calls other services and combines results.

### Example

```text
API Gateway / Aggregator
→ calls Order Service
→ calls Customer Service
→ merges response
```

---

### Pros:

- simple to implement
- real-time data
- no duplication

---

### Cons:

- multiple network calls
- higher latency
- tightly coupled at runtime

---

👉 Best for:

- real-time queries
- low-latency systems with few dependencies

---

## 5. Event-Driven Approach (Asynchronous)

---

Services communicate using events.

---

### Example

```text
Customer Service → publishes event
Order Service → consumes event and stores customer data
```

---

👉 Order Service keeps a local copy

---

### Pros:

- loose coupling
- high scalability
- fewer runtime dependencies

---

### Cons:

- eventual consistency
- more complex design
- debugging is harder

---

👉 Best for:

- high-scale systems
- decoupled architectures

---

## 6. Read Model (CQRS Style)

---

Create a separate data store optimized for queries.

---

### Example

```text
Reporting Service
→ combines data from multiple services
→ stores aggregated view
```

---

### Pros:

- very fast queries
- optimized for read-heavy systems

---

### Cons:

- data duplication
- eventual consistency
- extra infrastructure

---

👉 Best for:

- dashboards
- reporting
- analytics

---

## 7. Comparison (VERY IMPORTANT)

---

| Approach    | Consistency   | Latency  | Complexity | Coupling         |
| ----------- | ------------- | -------- | ---------- | ---------------- |
| API Calls   | Strong (near) | High     | Low        | Runtime coupling |
| Events      | Eventual      | Low      | Medium     | Loose coupling   |
| Read Models | Eventual      | Very Low | High       | Loose coupling   |

---

## 8. Real-World Strategy (MOST IMPORTANT)

---

👉 Real systems use a **combination**:

```text
User API → sync call (API)
Order processing → async (events)
Dashboard → read model
```

---

👉 There is no single solution

---

## 9. Common Mistakes

---

❌ Using only synchronous calls everywhere  
❌ Ignoring eventual consistency  
❌ Over-engineering with events too early  
❌ Not choosing approach based on use case

---

## 10. Important Interview Points

---

- APIs = simple but tightly coupled at runtime
- Events = scalable but eventually consistent
- Read models = optimized for queries
- real systems use hybrid approach

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How do microservices share data?

Answer like this:

> Microservices share data using three main approaches: API composition, where services call each other synchronously; event-driven communication, where services publish and consume events asynchronously; and read models, where data is pre-aggregated for efficient queries. The choice depends on consistency, latency, and scalability requirements, and most real systems use a combination of these approaches.
