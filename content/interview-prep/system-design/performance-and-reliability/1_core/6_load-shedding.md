---
title: "What is Load Shedding and Why Is It Important?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-106"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags:
    [
      "load shedding",
      "traffic control",
      "reliability",
      "system design",
      "overload",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Load shedding is a technique where a system intentionally drops or rejects some incoming requests when it is overloaded, in order to protect critical functionality and maintain overall system stability.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how systems behave under extreme load
- prioritization of critical vs non-critical requests
- real-world reliability strategies

👉 This is a key concept for high-traffic production systems.

---

## 3. Problem — What Happens Without Load Shedding

---

```text
Client → Service → DB / Downstream
```

If traffic exceeds system capacity:

- all requests are accepted
- resources (CPU, memory, threads) get exhausted
- system becomes slow
- eventually crashes

👉 Complete system failure

---

## 4. What Load Shedding Does

---

Instead of processing all requests:

- system drops low-priority requests
- preserves resources for important requests

---

👉 Goal:

> Keep the system partially functional instead of fully down

---

## 5. How Load Shedding Works (VERY IMPORTANT)

---

```text
High traffic → System overloaded
→ Identify non-critical requests
→ Drop or reject them
→ Process critical requests
```

---

👉 Key idea:

> Not all requests are equally important

---

## 6. Common Load Shedding Strategies

---

### 1. Priority-Based Shedding

- assign priority to requests
- drop low-priority ones first

Example:

- checkout → high priority
- analytics/logging → low priority

---

### 2. Rate-Based Dropping

- reject requests beyond a certain threshold

---

### 3. Queue-Based Shedding

- limit queue size
- drop requests when queue is full

---

### 4. Feature Degradation

- disable non-essential features under load

Example:

- hide recommendations
- skip logging or analytics

---

## 7. Real-World Example

---

### Scenario: E-commerce Sale

```text
Traffic spike during sale
```

System behavior:

- process checkout requests
- drop recommendation service calls
- disable analytics temporarily

👉 Critical functionality continues

---

## 8. Load Shedding vs Backpressure

---

- **Backpressure** → slow down or control incoming traffic
- **Load Shedding** → drop requests when overload happens

---

👉 Backpressure tries to manage load, load shedding sacrifices some requests to survive

---

## 9. HTTP Response Codes

---

- `503 Service Unavailable` → system overloaded
- `429 Too Many Requests` → rate limit exceeded

---

## 10. Common Mistakes

---

❌ Treating all requests equally  
❌ No prioritization strategy  
❌ Dropping critical requests  
❌ No monitoring of dropped traffic

---

## 11. Important Interview Points

---

- load shedding protects system during extreme load
- prioritization is key
- used in high-scale systems
- ensures partial availability instead of full failure

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is load shedding?

Answer like this:

> Load shedding is a technique where the system intentionally drops or rejects less important requests when it is overloaded. This ensures that critical functionality continues to work and prevents the entire system from failing under high traffic.
