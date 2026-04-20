---
title: "How Do You Reduce Latency in a System?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-103"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags: ["latency", "performance", "optimization", "system design", "backend"]
---

## 1. Short Answer (Interview Style)

---

> **To reduce latency in a system, we minimize processing time, reduce network calls, use caching, optimize database queries, and design efficient communication patterns. The goal is to respond to requests as quickly as possible.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- performance optimization
- real-world system bottlenecks
- how to design fast systems

👉 Very common follow-up in system design interviews.

---

## 3. What is Latency?

---

Latency = **time taken to respond to a request**

```text
Client → Request → System → Response → Client
```

👉 Goal: reduce this total time

---

## 4. Where Latency Comes From

---

- network calls
- database queries
- downstream services
- computation time
- serialization/deserialization

---

👉 You must identify the bottleneck first

---

## 5. Step-by-Step Approach (VERY IMPORTANT)

---

```text
1. Reduce network calls
2. Reduce data access time
3. Optimize processing
4. Use caching
5. Improve communication
```

---

## 6. Key Techniques to Reduce Latency

---

### 1. Caching (MOST IMPORTANT)

- store frequently used data
- avoid repeated DB calls

👉 Example:

```text
Cache → return response instantly
```

---

### 2. Reduce Network Calls

- avoid multiple service-to-service calls
- use aggregation

👉 Instead of:

```text
Service A → B → C → D
```

👉 Try:

```text
Service A → Aggregator → combined response
```

---

### 3. Asynchronous Processing

- move non-critical work to background

Examples:

- email sending
- notifications

---

### 4. Database Optimization

- add indexes
- optimize queries
- avoid full table scans

---

### 5. Use Read Replicas

- reduce load on primary DB
- improve read performance

---

### 6. Efficient Data Transfer

- send only required fields
- use compression if needed

---

### 7. Connection Pooling

- reuse DB connections
- reduce connection setup time

---

## 7. Real-World Example

---

### Scenario: Slow API

```text
Client → Service → DB
```

Fix:

- add caching → reduces DB calls
- optimize query → faster execution
- reduce response size → faster transfer

👉 Latency drops significantly

---

## 8. Common Mistakes

---

❌ Too many synchronous calls  
❌ No caching  
❌ Unoptimized DB queries  
❌ Fetching unnecessary data  
❌ Ignoring network latency

---

## 9. Important Interview Points

---

- caching is the biggest latency reducer
- reduce network hops
- optimize DB queries
- move non-critical work async

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How do you reduce latency?

Answer like this:

> To reduce latency, I first identify the bottleneck in the system, whether it’s network, database, or processing. Then I reduce network calls, optimize database queries, use caching for frequently accessed data, and move non-critical work to asynchronous processing. The goal is to minimize response time and improve user experience.
