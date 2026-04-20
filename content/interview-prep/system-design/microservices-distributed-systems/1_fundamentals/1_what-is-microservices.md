---
title: "What is Microservices?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-101"
  phase: "Core"
  topic: "Fundamentals"
  round: "Technical"
  company: ""
  tags:
    [
      "microservices",
      "architecture",
      "distributed systems",
      "scalability",
      "services",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Microservices is an architectural style where an application is built as a collection of small, independent services that communicate over APIs. Each service is responsible for a specific business capability and can be developed, deployed, and scaled independently.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- system design fundamentals
- separation of concerns at system level
- scalability and flexibility
- real-world architecture decisions
- trade-offs in distributed systems

This is a very common interview question in backend, system design, and lead-level interviews.

---

## 3. Problem — Why Microservices?

---

Traditional applications are often built as **monoliths**, where:

- all modules are tightly coupled
- single codebase
- single deployment unit

### Example Problem

```text
Order Service + Payment + User + Notification → One Application
```

### Problems:

- hard to scale specific components
- slow deployments
- one bug can bring down entire system
- difficult to maintain as system grows

---

## 4. Microservices Solution

---

Microservices solve this by:

- breaking application into **small independent services**
- each service handles **one business capability**
- services communicate via **APIs (REST/Async)**

### Example

```
Order Service
Payment Service
User Service
Notification Service
```

Each service:

- has its own codebase
- can be deployed independently
- can scale independently

---

## 5. Real-World Example

---

### E-commerce System

Instead of:

```
Single application handling everything
```

Use:

```
User Service → manages users
Order Service → handles orders
Payment Service → processes payments
Inventory Service → manages stock
```

#### 👉 If payment service fails:

- only payment is impacted
- rest of system continues working

---

## 6. Key Characteristics

---

- **Independently deployable**
- **Loosely coupled**
- **Focused on single responsibility**
- **Own data (database per service)**
- **Communicate over network**

---

## 7. Advantages

---

- better scalability
- faster deployments
- independent development
- fault isolation
- technology flexibility

---

## 8. Disadvantages (VERY IMPORTANT)

---

- increased complexity
- network latency
- difficult debugging
- data consistency challenges
- distributed system issues

---

👉 Interviewers LOVE when you mention trade-offs.

---

## 9. Monolith vs Microservices

---

| Monolith          | Microservices             |
| ----------------- | ------------------------- |
| Single codebase   | Multiple services         |
| Single deployment | Independent deployments   |
| Tightly coupled   | Loosely coupled           |
| Hard to scale     | Easy to scale selectively |
| Easier initially  | Complex to manage         |

---

## 10. When NOT to Use Microservices

---

- small applications
- small teams
- simple business logic
- early-stage startup

---

👉 Start with monolith, then evolve.

---

## 11. Important Interview Points

---

- Microservices is **architecture**, not a framework
- Requires **DevOps + monitoring + infra maturity**
- Needs **good service boundaries**
- Introduces **distributed system challenges**

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Microservices?

Answer like this:

> Microservices is an architectural style where an application is divided into small, independent services, each responsible for a specific business function. These services communicate via APIs and can be developed, deployed, and scaled independently. While microservices improve scalability and flexibility, they also introduce challenges like distributed data management and increased system complexity.
