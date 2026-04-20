---
title: "What is Database per Service and Why Is It Important?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-116"
  phase: "Core"
  topic: "Data Management"
  round: "Technical"
  company: ""
  tags:
    [
      "database per service",
      "microservices",
      "data ownership",
      "distributed systems",
      "architecture",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Database per Service is a design principle where each microservice owns its own database and manages its own data, ensuring loose coupling, independent deployment, and better scalability.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- service independence in microservices
- data ownership principles
- how to avoid tight coupling
- real-world architecture design

👉 This is a foundational principle in microservices architecture.

---

## 3. Problem — Shared Database Approach

---

In many systems, teams initially use a shared database:

```text
User Service → Shared DB
Order Service → Shared DB
Payment Service → Shared DB
```

---

### Problems:

- tight coupling between services
- schema changes affect multiple services
- difficult deployments
- scaling becomes complex

👉 This leads to a **distributed monolith**.

---

## 4. Database per Service Solution

---

Each service owns its own database:

```text
User Service → User DB
Order Service → Order DB
Payment Service → Payment DB
```

---

👉 Each service:

- controls its schema
- manages its data independently
- evolves without impacting others

---

## 5. Key Principles (VERY IMPORTANT)

---

### 1. Data Ownership

- only the owning service can modify its data

---

### 2. No Direct DB Access

- other services must NOT directly query the database

---

### 3. API-Based Access

- communication happens via APIs/events

---

### 4. Independent Schema Evolution

- services can change schema without breaking others

---

## 6. Real-World Example

---

```text
Order Service stores:
- orderId
- customerId

Customer Service stores:
- customer details
```

If Order Service needs customer info:

👉 It should call Customer Service API

---

NOT:

```text
Direct DB query to Customer Service DB
```

---

## 7. Benefits

---

- loose coupling
- independent deployments
- better scalability
- clear ownership
- improved maintainability

---

## 8. Challenges

---

- no direct joins
- data duplication required
- eventual consistency
- more complex data management

---

## 9. How Data is Shared (Alternatives)

---

### 1. API Calls

- fetch data on demand

---

### 2. Event-Driven Updates

- services publish events
- other services update local data

---

### 3. Read Models

- build aggregated view for queries

---

## 10. Common Mistakes

---

❌ Sharing the same database across services  
❌ Allowing direct DB access between services  
❌ Ignoring data ownership boundaries  
❌ Treating microservices like monolith with multiple APIs

---

## 11. Important Interview Points

---

- database per service ensures loose coupling
- each service owns its data
- communication happens via APIs/events
- introduces eventual consistency

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is database per service?

Answer like this:

> Database per service is a design principle where each microservice owns and manages its own database. This ensures loose coupling, independent deployment, and better scalability. Instead of sharing databases, services communicate via APIs or events, even though it introduces challenges like eventual consistency.
