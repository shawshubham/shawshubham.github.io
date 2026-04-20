---
title: "What is API Gateway and Why is it Needed in Microservices?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-106"
  phase: "Core"
  topic: "Communication"
  round: "Technical"
  company: ""
  tags:
    [
      "api gateway",
      "microservices",
      "routing",
      "authentication",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **API Gateway is a single entry point for all client requests in a microservices architecture. It routes requests to appropriate services and handles cross-cutting concerns like authentication, logging, rate limiting, and request aggregation.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how clients interact with microservices
- system design simplification
- handling cross-cutting concerns
- real-world production architecture

👉 Very common in system design and backend interviews.

---

## 3. Problem — Without API Gateway

---

In a microservices system without gateway:

```text
Client → User Service
Client → Order Service
Client → Payment Service
```

Problems:

- client must know all service URLs
- multiple network calls from client
- duplicated logic (auth, logging)
- tight coupling between client and services

---

## 4. API Gateway Solution

---

Introduce a gateway:

```text
Client → API Gateway → Microservices
```

👉 Gateway acts as:

- router
- mediator
- central control layer

---

## 5. Responsibilities of API Gateway

---

### 1. Routing

- routes request to correct service

---

### 2. Authentication & Authorization

- validates tokens
- enforces security rules

---

### 3. Request Aggregation

- combines multiple service responses

---

### 4. Rate Limiting

- prevents overload

---

### 5. Logging & Monitoring

- centralized logging

---

### 6. Load Balancing (basic)

- distributes requests

---

## 6. Real-World Example

---

### Without Gateway

```text
Mobile App → User Service
Mobile App → Order Service
Mobile App → Payment Service
```

### With Gateway

```text
Mobile App → API Gateway → All Services
```

👉 Client makes ONE call instead of many

---

## 7. Real-World API Gateway Examples

---

Common API Gateway implementations include:

- **Nginx** → routing, load balancing, SSL termination
- **Spring Cloud Gateway** → Java-based gateway for microservices
- **Netflix Zuul** → legacy gateway used in microservices
- **AWS API Gateway** → cloud-based gateway for APIs
- **Kong / Apigee** → enterprise API management solutions

👉 In many real-world systems, API Gateway may not be explicitly named, but any centralized entry point handling routing and security acts as a gateway.

---

## 8. Benefits

---

- simplifies client interaction
- centralizes cross-cutting concerns
- reduces client complexity
- improves security

---

## 9. Drawbacks

---

- single point of failure (if not designed well)
- adds latency
- becomes bottleneck if overloaded

---

## 10. Common Mistakes

---

❌ Putting business logic in gateway  
❌ Making gateway too complex  
❌ Not scaling gateway properly

---

## 11. Important Interview Points

---

- API Gateway is entry point to microservices
- handles cross-cutting concerns
- reduces client-service coupling
- should NOT contain business logic

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is API Gateway and why is it used?

Answer like this:

> API Gateway is a single entry point for client requests in a microservices architecture. It routes requests to appropriate services and handles cross-cutting concerns like authentication, logging, and rate limiting. It simplifies client interaction and reduces coupling, but should be kept lightweight and not contain business logic.
