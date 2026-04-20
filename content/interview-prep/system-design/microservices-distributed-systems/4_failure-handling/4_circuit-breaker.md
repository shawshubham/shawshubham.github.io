---
title: "What is Circuit Breaker and How Does It Prevent Failures?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-110"
  phase: "Core"
  topic: "Failure Handling"
  round: "Technical"
  company: ""
  tags:
    [
      "circuit breaker",
      "microservices",
      "resilience",
      "failure handling",
      "distributed systems",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Circuit Breaker is a resilience pattern that stops sending requests to a failing service after repeated failures, preventing system overload and allowing the service time to recover.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how to prevent cascading failures
- system stability under failure
- advanced resilience patterns
- production-grade system design

👉 This is one of the most important microservices interview topics.

---

## 3. Problem — Why Circuit Breaker is Needed

---

Consider:

```text
Order Service → Payment Service
```

If Payment Service is down:

- Order Service keeps calling it
- requests keep failing
- retries increase load
- system gets overloaded

👉 This leads to cascading failure.

---

## 4. What Circuit Breaker Does

---

Circuit Breaker:

- monitors failures
- stops calls after threshold
- allows system to recover

---

👉 Instead of:

```text
Call → Fail → Retry → Fail → Retry → Fail
```

👉 It becomes:

```text
Call → Fail → Fail → Fail → Circuit Opens → Stop Calls
```

---

## 5. Circuit Breaker States (VERY IMPORTANT)

---

### 1. Closed State (Normal)

- requests flow normally
- failures are monitored

---

### 2. Open State (Failure Mode)

- calls are blocked immediately
- no request sent to service

---

### 3. Half-Open State (Recovery Check)

- allow limited requests
- if success → close circuit
- if fail → open again

---

## 6. Real-World Flow

---

```text
Normal traffic → Closed

Failures increase → Threshold reached

Circuit opens → All subsequent calls fail fast (no downstream call)

Cooldown period (e.g., 30s) → Circuit remains Open

After cooldown → Half-open (allow limited test requests)

Test request succeeds → Circuit closes (normal traffic resumes)

Test request fails → Circuit re-opens (back to fail-fast)
```

### Important Clarifications (Interview-Level)

- When the circuit is **Open**, all incoming requests **fail fast** — no calls are made to the downstream service.
- The circuit **does NOT reset per request** — it remains open for a configured cooldown duration.
- After the cooldown, the circuit moves to **Half-open**, where only a **limited number of trial requests** are allowed.
- If the trial succeeds → circuit **closes**  
  If it fails → circuit **re-opens immediately**
- Circuit breaker is typically applied **per downstream dependency or API call path**, not always for the entire microservice.
- Circuit state is maintained on the **caller side (client/service making the call)**, not the downstream service.

---

## 7. Real-World Example

---

```text
Client → Order Service → Payment Service
```

If Payment fails repeatedly:

- Circuit breaker opens
- Order Service stops calling Payment
- fallback response is returned

👉 System remains responsive

---

## 8. Benefits

---

- prevents cascading failures
- reduces load on failing service
- improves system stability
- enables graceful degradation

---

## 9. Common Mistakes

---

❌ Not using circuit breaker in distributed systems  
❌ Setting wrong failure threshold  
❌ No fallback mechanism  
❌ Not monitoring circuit state

---

## 10. Circuit Breaker + Retry + Timeout

---

👉 Together they work as:

```text
Request → Timeout → Retry (with backoff)
→ still failing → Circuit Breaker opens
→ fallback response returned
```

---

👉 Roles:

- Timeout → limits waiting time
- Retry → handles temporary failures
- Circuit Breaker → stops repeated failures

---

## 11. Important Interview Points

---

- circuit breaker protects system from overload
- works based on failure threshold
- has three states (closed, open, half-open)
- must be combined with timeout and retry

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Circuit Breaker?

Answer like this:

> Circuit Breaker is a resilience pattern that prevents repeated calls to a failing service by stopping requests after a failure threshold is reached. It helps avoid cascading failures and allows the system to recover by temporarily blocking requests and retrying after a cooldown period.
