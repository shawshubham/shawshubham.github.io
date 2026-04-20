---
title: "What is Cascading Failure and How to Prevent It?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-112"
  phase: "Core"
  topic: "Failure Handling"
  round: "Technical"
  company: ""
  tags:
    [
      "cascading failure",
      "microservices",
      "distributed systems",
      "resilience",
      "failure handling",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Cascading failure is a situation where failure in one service spreads to other services, eventually causing large parts of the system to become slow or unavailable.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- real-world failure propagation
- distributed system risks
- importance of resilience patterns
- system stability under load

👉 This is a key concept in designing reliable microservices.

---

## 3. Problem — How Cascading Failure Happens

---

Consider:

```text
Client → Order Service → Payment Service → Inventory Service
```

If `Payment Service` becomes slow:

- Order Service waits
- threads get blocked
- request queue builds up
- Order Service becomes slow
- clients retry
- load increases further

👉 Eventually, entire system slows down or crashes

---

## 4. Step-by-Step Failure Flow

---

```text
Payment Service slows down
→ Order Service threads get blocked
→ Thread pool exhausted
→ New requests queue up
→ Clients retry
→ Traffic spikes
→ Other services impacted
→ System-wide degradation
```

---

## 5. Real-World Example

---

### Scenario: Payment Service Outage

```text
Client → Order Service → Payment Service
```

Without protection:

- Order keeps calling Payment
- retries increase load
- threads remain blocked
- Order becomes unresponsive

👉 Entire system becomes unavailable

---

## 6. Why It Is Dangerous

---

- spreads quickly across services
- difficult to detect early
- can bring down entire system
- amplifies small issues into major outages

---

## 7. How to Prevent Cascading Failure (VERY IMPORTANT)

---

### 1. Timeout

- fail fast
- prevent long blocking

---

### 2. Retry (with limits)

- handle temporary failures
- avoid retry storms

---

### 3. Circuit Breaker

- stop calling failing service
- reduce load

---

### 4. Fallback

- return alternative response
- maintain user experience

---

### 5. Bulkhead Pattern (Advanced)

- isolate resources (thread pools, connections)
- prevent one service from consuming all resources

---

### 6. Asynchronous Communication

- reduce synchronous dependency chains
- decouple services

---

## 8. Key Insight (VERY IMPORTANT)

---

👉 Cascading failure is usually caused by:

- tight synchronous coupling
- no timeout
- uncontrolled retries

---

## 9. Common Mistakes

---

❌ No timeout configured  
❌ Unlimited retries  
❌ No circuit breaker  
❌ Shared resources without isolation  
❌ Long synchronous dependency chains

---

## 10. Important Interview Points

---

- cascading failure spreads across services
- often caused by slow service, not just failure
- prevention requires multiple resilience patterns
- designing for failure is critical in microservices

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is cascading failure?

Answer like this:

> Cascading failure occurs when failure or slowdown in one service propagates to other services, eventually impacting the entire system. It is usually caused by tight coupling, lack of timeouts, and uncontrolled retries. It can be prevented using resilience patterns like timeout, retry with limits, circuit breaker, and fallback.
