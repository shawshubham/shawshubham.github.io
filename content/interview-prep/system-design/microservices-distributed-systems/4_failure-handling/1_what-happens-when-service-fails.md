---
title: "What Happens When a Service Fails in Microservices?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-107"
  phase: "Core"
  topic: "Failure Handling"
  round: "Technical"
  company: ""
  tags:
    [
      "microservices",
      "failure handling",
      "service failure",
      "distributed systems",
      "resilience",
    ]
---

## 1. Short Answer (Interview Style)

---

> **When a service fails in a microservices architecture, the impact depends on how tightly other services depend on it. Without proper failure handling, one failed or slow service can cause request failures, high latency, retries, and even cascading failures across the system.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- real-world distributed system behavior
- dependency failures in microservices
- resilience thinking
- production impact of downstream issues

👉 This is one of the most important microservices interview questions because real systems fail at service boundaries.

---

## 3. Why Service Failure Is a Big Deal

---

In a monolith, a failure is usually inside one application process.

In microservices:

- services call each other over network
- calls can fail due to timeout, crash, or network issue
- one service may depend on multiple downstream services

👉 Failure in one place can affect many requests.

---

## 4. Basic Failure Flow

---

Example:

```text
Client → Order Service → Payment Service
```

If `Payment Service` fails:

- `Order Service` may not complete request
- client may receive error
- request may become slow if timeout is long

---

## 5. Real-World Example

---

Suppose user places an order:

```text
Client → Order Service → Payment Service → Notification Service
```

If `Payment Service` is down:

- order cannot be confirmed
- notification may never be triggered
- user may see failure or delayed response

👉 One downstream failure affects the business flow.

---

## 6. Types of Service Failure

---

### 1. Hard Failure

Service is completely unavailable.

Examples:

- service crashed
- pod/container stopped
- server unreachable

---

### 2. Slow Failure

Service is running but responding too slowly.

Examples:

- high CPU
- DB slowness
- thread pool exhaustion

👉 Slow failure is often more dangerous than complete failure because it causes request buildup.

---

### 3. Partial Failure

Some requests succeed, some fail.

Examples:

- one node unhealthy
- intermittent network issue
- specific endpoint broken

👉 This is very common in distributed systems.

---

## 7. What Happens Without Failure Handling?

---

Without resilience mechanisms:

- request waits too long
- threads remain blocked
- retries overload downstream
- upstream services become slow
- users see errors

👉 This can turn one failure into a system-wide problem.

---

## 8. Cascading Failure (VERY IMPORTANT)

---

A cascading failure happens when failure in one service spreads to others.

Example:

```text
Order Service waits for Payment Service
Payment Service is slow
Order threads get blocked
Order Service becomes slow
Clients retry
Traffic increases further
System degrades more
```

👉 One slow service causes many services to struggle.

---

## 9. How Real Systems Handle This

---

To reduce impact, systems use:

- timeout
- retry (carefully)
- circuit breaker
- fallback response
- queue-based async design where possible

👉 These are the core resilience patterns in microservices.

---

## 10. Common Production Symptoms

---

When a service fails, you may see:

- API latency spike
- increase in 5xx errors
- timeout exceptions
- connection pool exhaustion
- thread pool saturation
- message backlog

---

## 11. Common Mistakes

---

❌ No timeout configured  
❌ Blind retries on already overloaded service  
❌ Tight synchronous dependency chain  
❌ No graceful fallback  
❌ Treating slow service as healthy service

---

## 12. Important Interview Points

---

- in microservices, failures are normal, not exceptional
- downstream failure can impact upstream services
- slow failures are often more dangerous than hard failures
- resilience patterns are required to avoid cascading failure

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What happens when a service fails in microservices?

Answer like this:

> When a service fails in microservices, the impact depends on how other services depend on it. If the failed service is part of a synchronous request path, upstream services may become slow or fail as well. Without proper resilience mechanisms like timeouts, retries, circuit breakers, and fallbacks, one failure can lead to cascading failures across the system.
