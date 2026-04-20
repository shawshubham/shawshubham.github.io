---
title: "What is Retry and When Should You Use It in Microservices?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-109"
  phase: "Core"
  topic: "Failure Handling"
  round: "Technical"
  company: ""
  tags:
    [
      "retry",
      "microservices",
      "resilience",
      "failure handling",
      "distributed systems",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Retry is a mechanism where a failed request is attempted again, usually after a short delay, to handle transient failures such as network issues or temporary service unavailability.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- transient vs permanent failures
- how to improve system reliability
- risks of retrying blindly
- real-world resilience patterns

👉 Retry is commonly used but also commonly misused.

---

## 3. Problem — Why Retry is Needed

---

In distributed systems, failures are often temporary:

- network glitches
- temporary service overload
- short-lived downtime

Example:

```text
Order Service → Payment Service (fails once due to network)
```

👉 Without retry:

- request fails immediately

👉 With retry:

- second attempt may succeed

---

## 4. What Retry Does

---

Retry allows:

- automatic re-attempt of failed requests
- handling temporary issues
- improving success rate without user intervention

---

## 5. Real-World Example

---

```text
Client → Order Service → Payment Service
```

If Payment fails due to a temporary issue:

### Without Retry

- order fails

### With Retry

- system retries after short delay
- request may succeed

---

## 6. When to Use Retry (VERY IMPORTANT)

---

### Use Retry For:

- network failures
- timeout errors
- temporary service unavailability

---

### Do NOT Retry For:

- validation errors
- business logic failures
- permanent failures (e.g., invalid input)

> 👉 Retrying wrong failures can make system worse.

---

## 7. Retry Strategies

---

### 1. Fixed Retry

- retry after fixed interval

---

### 2. Exponential Backoff (Recommended)

- increase delay between retries

Example:

```text
1s → 2s → 4s → 8s
```

👉 prevents system overload

---

### 3. Limited Retries

- retry only a fixed number of times

---

## 8. Retry Problem — Retry Storm (VERY IMPORTANT)

---

If many services retry simultaneously:

```text
Service A → fails
All clients retry
Traffic increases
Service becomes more overloaded
```

👉 System gets worse instead of recovering

---

## 9. Retry + Timeout (Critical Relationship)

---

- each retry is a **new request with its own timeout**
- total latency ≈ timeout × number of retries
- retries can significantly increase overall response time
- must always consider **total request time budget**

👉 Example:

```text
Timeout per call = 2s
Retries = 3
Total possible wait ≈ 6s
```

👉 Best Practices:

- keep timeout small and realistic
- limit number of retries
- use exponential backoff between retries
- avoid long blocking chains of retries

---

## 10. Retry + Circuit Breaker

---

- retry handles **temporary/transient failures**
- circuit breaker **handles persistent failures**

#### 👉 Flow:

```text
Request → Timeout → Retry (with backoff)
→ still failing → Circuit Breaker opens
→ stop calling service
```

- prevents **retry storms**
- protects downstream service from overload
- avoids cascading failures across system

#### 👉 Important:

- retries should always be limited
- circuit breaker should stop repeated failed calls
- both should be used together in real systems

#### 👉 Together they provide:

- reliability (retry)
- system stability (circuit breaker)

---

## 11. Common Mistakes

---

❌ Blind retries without limits  
❌ Retrying permanent failures  
❌ No delay between retries  
❌ Ignoring downstream health

---

## 12. Important Interview Points

---

- retry helps handle transient failures
- must be controlled and limited
- exponential backoff is preferred
- improper retry can cause system overload

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is retry and when should you use it?

Answer like this:

> Retry is a mechanism to re-attempt failed requests, usually used for transient failures like network issues or temporary service unavailability. It improves reliability but must be used carefully with limits and backoff strategies to avoid overloading the system. It should not be used for permanent failures like validation errors.
