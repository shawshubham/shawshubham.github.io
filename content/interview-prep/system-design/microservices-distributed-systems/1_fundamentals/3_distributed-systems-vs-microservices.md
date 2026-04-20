---
title: "Distributed Systems vs Microservices — What is the Difference?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-103"
  phase: "Core"
  topic: "Fundamentals"
  round: "Technical"
  company: ""
  tags:
    [
      "distributed systems",
      "microservices",
      "architecture",
      "system design",
      "scalability",
    ]
---

## 1. Short Answer (Interview Style)

---

> **A distributed system is a system where multiple components run on different machines and communicate over a network, whereas microservices is an architectural style used to design distributed systems by splitting them into small, independent services.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- system-level vs architecture-level concepts
- how modern systems are structured
- foundational distributed system thinking
- clarity in terminology

This is a common follow-up question in system design interviews.

---

## 3. What is a Distributed System?

---

A distributed system is:

- multiple machines (nodes)
- working together
- communicating over a network

---

### Example

```text
Frontend → Backend → Database
```

Even this is:

- running on different machines
- communicating over network

👉 This is a **distributed system**

---

## 4. What is Microservices?

---

Microservices is:

- an architectural approach
- where system is divided into small services
- each service handles one business capability

---

### Example

```text
User Service
Order Service
Payment Service
```

---

## 5. Key Difference

---

| Aspect     | Distributed System    | Microservices               |
| ---------- | --------------------- | --------------------------- |
| Type       | System concept        | Architectural style         |
| Scope      | Broad                 | Specific                    |
| Includes   | Any multi-node system | Service-based systems       |
| Dependency | Independent concept   | Built on distributed system |

---

## 6. Important Relationship

---

```text
Distributed System → Bigger concept
Microservices → Subset of it
```

> 👉 All **microservices systems** are distributed  
> 👉 But **not** all **distributed systems** are microservices

---

## 7. Real-World Examples

---

### Distributed System (NOT Microservices)

```text
Frontend → Backend → Database
```

- separate machines
- but still one application

### Microservices System

```text
User Service → Order Service → Payment Service
```

- independent services
- communicate over network

---

## 8. Why This Matters in Practice

---

Distributed systems introduce:

- network latency
- partial failures
- data consistency issues

---

Microservices adds:

- service-level complexity
- inter-service communication
- operational overhead

---

## 9. Common Mistakes

---

❌ Thinking microservices = distributed system  
❌ Ignoring distributed system challenges  
❌ Assuming microservices are always better

---

## 10. Important Interview Points

---

- Distributed system is a **broader concept**
- Microservices is a **design approach**
- Microservices always involve network communication
- Understanding this helps in system design discussions

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> Are microservices and distributed systems the same?

Answer like this:

> Microservices are a type of distributed system, but they are not the same. A distributed system refers to any system where components run on multiple machines and communicate over a network. Microservices is an architectural style that structures such systems into small, independent services. So all microservices systems are distributed, but not all distributed systems are microservices.
