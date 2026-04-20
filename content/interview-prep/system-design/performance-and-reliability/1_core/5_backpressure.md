---
title: "What is Backpressure and Why Is It Important?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-105"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags:
    [
      "backpressure",
      "traffic control",
      "system design",
      "distributed systems",
      "performance",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Backpressure is a mechanism used to control the rate of incoming requests when a system is overloaded, by slowing down or rejecting new requests to prevent system failure.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- handling overload situations
- protecting system stability
- controlling request flow in distributed systems

👉 This is a key concept for building resilient systems.

---

## 3. Problem — What Happens Without Backpressure

---

```text
Client → Service → DB / Downstream
```

If incoming traffic exceeds system capacity:

- requests keep piling up
- thread pools get exhausted
- memory usage increases
- system becomes slow or crashes

👉 System collapses under load.

---

## 4. What Backpressure Does

---

Instead of accepting all requests:

- system slows down intake
- rejects excess requests
- signals clients to reduce traffic

---

👉 Prevents overload and keeps system stable

---

## 5. How Backpressure Works (VERY IMPORTANT)

---

```text
Incoming requests > System capacity
→ Apply limits
→ Slow down or reject requests
→ System remains stable
```

---

👉 Key idea:

> System should handle only what it can process.

---

## 6. Common Backpressure Techniques

---

### 6.1 Queue Limits

- limit size of request queue
- reject requests when queue is full

---

### 6.2 Thread Pool Limits

- restrict number of concurrent requests
- prevents resource exhaustion

---

### 6.3 Rate Limiting

- limit incoming request rate

---

### 6.4 Load Shedding

- drop low-priority requests under load

---

### 6.5 Circuit Breaker

- stop calling overloaded downstream services

---

## 7. Real-World Example

---

### Scenario: Traffic Spike

```text
Client → Order Service → Payment Service
```

If Payment Service is slow:

- Order Service queues requests
- queue fills up

With backpressure:

- Order Service stops accepting new requests
- returns `503 Service Unavailable`

👉 Prevents cascading failure

---

## 8. Backpressure vs Rate Limiting

---

- **Rate Limiting** → controls traffic at entry
- **Backpressure** → reacts when system is overloaded

---

👉 Both are complementary

---

## 9. Common Mistakes

---

❌ Accepting unlimited requests  
❌ No queue limits  
❌ No rejection strategy  
❌ Ignoring system capacity

---

## 10. Important Interview Points

---

- backpressure prevents system overload
- protects resources like threads and memory
- works with rate limiting and load shedding
- essential for high-traffic systems

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is backpressure?

Answer like this:

> Backpressure is a mechanism used to control incoming traffic when a system is overloaded. Instead of accepting all requests, the system slows down or rejects excess requests to prevent resource exhaustion and maintain stability. It is commonly implemented using queue limits, thread pool limits, and load shedding.
