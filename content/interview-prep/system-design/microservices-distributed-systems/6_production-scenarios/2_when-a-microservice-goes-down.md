---
title: "What Happens When One Microservice Goes Down?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-119"
  phase: "Core"
  topic: "Production Scenarios"
  round: "Technical"
  company: ""
  tags: ["microservices", "failure", "downtime", "resilience", "production"]
---

## 1. Short Answer (Interview Style)

---

> **When one microservice goes down, the impact depends on how other services depend on it. In synchronous flows, requests may fail or become slow; in asynchronous systems, processing may be delayed. Proper resilience mechanisms like timeouts, retries, circuit breakers, and fallbacks help contain the impact.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- dependency impact in distributed systems
- difference between sync vs async behavior
- real production failure handling
- resilience design decisions

👉 Very common in senior backend and system design interviews.

---

## 3. Failure Impact Depends on Communication Style

---

### Synchronous Flow

```text
Client → Order Service → Payment Service
```

If `Payment Service` is down:

- Order Service waits (until timeout)
- request fails or becomes slow
- user sees error or delay

👉 Direct and immediate impact

---

### Asynchronous Flow

```text
Order Service → publishes event → Payment Service
```

If `Payment Service` is down:

- event remains in queue
- processing is delayed
- system continues working

👉 Delayed impact, not immediate failure

---

## 4. Typical Failure Scenarios

---

### 1. Hard Down (Service Unavailable)

- connection refused
- 5xx errors

---

### 2. Slow Service

- high latency
- timeouts in upstream services

---

### 3. Partial Failure

- some requests succeed, some fail

---

## 5. What Happens Internally (VERY IMPORTANT)

---

```text
Service B goes down
→ Service A keeps calling B
→ threads get blocked (waiting)
→ thread pool exhaustion
→ Service A becomes slow
→ clients retry
→ load increases
→ cascading failure risk
```

---

## 6. How Real Systems Handle It

---

### 1. Timeout

- fail fast instead of waiting indefinitely

---

### 2. Retry (with limits)

- handle transient issues

---

### 3. Circuit Breaker

- stop calling failing service

---

### 4. Fallback

- return alternative response

---

### 5. Asynchronous Processing

- decouple critical flows

---

## 7. Real-World Example

---

### E-commerce Flow

```text
User places order
→ Order Service → Payment Service
```

If Payment is down:

### Without resilience

- order fails

### With resilience

- order marked as "PENDING"
- payment retried later
- user notified asynchronously

👉 Business continues

---

## 8. Observability Signals (What You’ll See)

---

- spike in 5xx errors
- increased latency
- timeout exceptions
- retry counts increase
- circuit breaker opens

---

## 9. Common Mistakes

---

❌ No timeout configured  
❌ Unlimited retries  
❌ No circuit breaker  
❌ Tight synchronous dependency chains  
❌ No fallback for critical flows

---

## 10. Important Interview Points

---

- impact depends on sync vs async design
- failures can propagate (cascading)
- resilience patterns are essential
- design should favor graceful degradation

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What happens when one microservice goes down?

Answer like this:

> When a microservice goes down, the impact depends on how other services depend on it. In synchronous systems, requests may fail or become slow due to timeouts. In asynchronous systems, processing is delayed but the system continues functioning. To handle this, we use resilience patterns like timeouts, retries, circuit breakers, and fallbacks to prevent cascading failures and maintain system stability.
