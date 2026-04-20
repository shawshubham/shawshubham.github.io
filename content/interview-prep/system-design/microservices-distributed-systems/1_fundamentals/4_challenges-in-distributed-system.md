---
title: "What are Challenges in Distributed Systems?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-113"
  phase: "Core"
  topic: "Fundamentals"
  round: "Technical"
  company: ""
  tags:
    ["distributed systems", "challenges", "latency", "consistency", "failures"]
---

## 1. Short Answer (Interview Style)

---

> **Distributed systems introduce challenges like network latency, partial failures, data consistency issues, and coordination complexity because multiple services run on different machines and communicate over a network.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- why distributed systems are complex
- real-world system limitations
- trade-offs in system design
- foundational concepts behind microservices

👉 This is a high-level thinking question often asked in system design interviews.

---

## 3. Why Distributed Systems Are Hard

---

In a single application (monolith):

- everything runs in one process
- communication is fast (in-memory)
- failures are easier to handle

---

In distributed systems:

- services run on different machines
- communication happens over network
- failures are unpredictable

👉 This introduces complexity.

---

## 4. Key Challenges in Distributed Systems

---

### 4.1 Network Latency

- network calls are slower than in-memory calls
- response time depends on network

👉 Example:

```text
Service A → Service B (network call)
```

---

### 4.2 Partial Failures (VERY IMPORTANT)

- some services may fail while others work
- system is neither fully up nor fully down

👉 Example:

```text
Order Service works, Payment Service fails
```

---

### 4.3 Data Consistency

- data is spread across services
- keeping it consistent is difficult

👉 Example:

```text
Order created but Payment failed
```

---

### 4.4 Network Reliability

- packets can be lost
- requests may timeout
- retries may duplicate requests

---

### 4.5 Scalability Complexity

- scaling multiple services independently
- managing load distribution

---

### 4.6 Coordination & Synchronization

- services must coordinate with each other
- managing workflows becomes complex

---

### 4.7 Debugging & Monitoring

- logs are distributed
- tracing requests across services is difficult

---

### 4.8 Security Challenges

- multiple services expose APIs
- more attack surface

---

## 5. Real-World Example

---

```text
Client → Order → Payment → Inventory
```

Possible issues:

- Payment is slow → latency increases
- Inventory fails → partial failure
- network delay → timeout

👉 System behavior becomes unpredictable

---

## 6. Why These Challenges Matter

---

👉 These challenges lead to:

- need for timeout
- need for retry
- need for circuit breaker
- need for fallback

👉 All resilience patterns exist because of these challenges

---

## 7. Common Mistakes

---

❌ Assuming network calls are reliable  
❌ Ignoring partial failures  
❌ Expecting strong consistency everywhere  
❌ Not designing for failure

---

## 8. Important Interview Points

---

- distributed systems are inherently complex
- failures are normal, not exceptional
- network is unreliable
- consistency is hard to maintain
- requires resilience patterns

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are challenges in distributed systems?

Answer like this:

> Distributed systems face challenges like network latency, partial failures, data consistency issues, and coordination complexity because services communicate over a network. Unlike monolithic systems, failures are not always total, and handling these scenarios requires careful design using resilience patterns like timeouts, retries, and circuit breakers.
