---
title: "Why Can't We Use Joins Across Microservices?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-115"
  phase: "Core"
  topic: "Data Management"
  round: "Technical"
  company: ""
  tags:
    [
      "microservices",
      "joins",
      "data management",
      "distributed systems",
      "database per service",
    ]
---

## 1. Short Answer (Interview Style)

---

> **We generally cannot use joins across microservices because each service is expected to own its own database and data model. Direct joins would tightly couple services at the database level, break service independence, and create deployment and scaling problems.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- database-per-service principle
- service independence in microservices
- distributed data challenges
- trade-offs in microservices architecture

👉 This is a very common practical microservices interview question.

---

## 3. Problem — Why Joins Work in Monoliths

---

In a monolith:

- all modules usually share one database
- data lives in the same schema or instance
- SQL joins are easy and natural

---

Example:

```sql
SELECT o.id, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id;
```

---

👉 This works because both tables are in the same database.

---

## 4. Why Joins Do Not Fit Microservices

---

In microservices:

- `Order Service` owns order data
- `Customer Service` owns customer data
- each service has its own database

---

Example:

```text
Order Service DB → orders
Customer Service DB → customers
```

---

👉 A direct SQL join across these databases is not a good design because it breaks service boundaries.

---

## 5. Why It Is a Problem (VERY IMPORTANT)

---

### 1. Tight Coupling

If one service directly joins another service’s DB:

- schemas become dependent
- one service change can break another

---

### 2. Breaks Service Ownership

Each service should own and control its data.

Direct joins mean:

- another service is depending on internal database structure

---

### 3. Deployment Becomes Risky

If Customer Service changes a table or column:

- Order Service queries may fail

---

### 4. Scaling Becomes Hard

Services should scale independently.

Shared query patterns create:

- operational dependencies
- more complex performance tuning

---

### 5. Security and Access Issues

Giving one service direct DB access to another service:

- increases attack surface
- violates encapsulation

---

## 6. Real-World Example

---

Suppose:

- Order Service stores `customerId`
- Customer Service stores customer details

If UI wants:

```text
Order ID + Customer Name
```

You should NOT do:

```text
Order Service DB JOIN Customer Service DB
```

---

Instead:

- Order Service calls Customer Service API
- or use pre-computed/read models
- or use event-driven duplication where needed

---

## 7. What to Use Instead of Joins

---

### 1. API Composition

One service calls multiple services and combines results.

Example:

```text
API Gateway / Aggregator
→ calls Order Service
→ calls Customer Service
→ merges response
```

---

### 2. Event-Driven Data Duplication

A service keeps a local copy of required external data.

Example:

- Customer Service publishes customer events
- Order Service stores needed customer snapshot

---

### 3. Read Model / Query Service

Build separate read-optimized data model for reporting/query use cases.

---

## 8. Trade-Offs of Alternatives

---

### API Composition

Pros:

- simple
- keeps ownership clear

Cons:

- more network calls
- can increase latency

---

### Data Duplication

Pros:

- fast reads
- less runtime dependency

Cons:

- eventual consistency
- duplicated data management

---

## 9. Important Design Insight

---

👉 In microservices, we optimize for:

- service autonomy
- independent deployment
- loose coupling

---

👉 That means we give up some monolith conveniences like easy SQL joins.

---

## 10. Common Mistakes

---

❌ Sharing the same database across services  
❌ Writing cross-service SQL joins  
❌ Treating microservices like distributed monoliths  
❌ Ignoring data ownership boundaries

---

## 11. Important Interview Points

---

- joins are easy in monolith because of shared DB
- in microservices, each service owns its own data
- cross-service joins create tight coupling
- alternatives include API composition, events, and read models

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> Why can’t we use joins across microservices?

Answer like this:

> In microservices, each service is supposed to own its own database and internal data model. If we use joins across services, we create tight database-level coupling, break service independence, and make deployments and schema changes risky. Instead of joins, we usually use API composition, event-driven data duplication, or separate read models depending on the use case.
