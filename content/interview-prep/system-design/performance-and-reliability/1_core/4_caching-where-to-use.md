---
title: "What is Caching and Where Should You Use It?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-104"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags: ["caching", "performance", "latency", "system design", "backend"]
---

## 1. Short Answer (Interview Style)

---

> **Caching is a technique used to store frequently accessed data in a fast-access storage layer so that future requests can be served quickly without hitting the main data source. It significantly reduces latency and improves system performance.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- performance optimization
- reducing database load
- real-world system design decisions

👉 Caching is one of the most important techniques in system design interviews.

---

## 3. Problem — Why Caching Is Needed

---

```text
Client → Service → Database
```

Every request hits the database:

- high latency
- increased DB load
- scalability issues

👉 Database becomes the bottleneck

---

## 4. What Caching Does

---

```text
Client → Service → Cache → Database
```

Flow:

- check cache first
- if data exists → return immediately
- else → fetch from DB and store in cache

---

👉 This reduces DB calls and improves response time

---

## 5. Where to Use Caching (VERY IMPORTANT)

---

### 5.1 Read-Heavy Data

- frequently accessed data
- rarely changes

Examples:

- product details
- user profile

---

### 5.2 Expensive Computation

- results that take time to compute

Examples:

- reports
- analytics results

---

### 5.3 External API Responses

- avoid repeated external calls

---

### 5.4 Session Data

- user sessions
- authentication tokens

---

### 5.5 Configuration Data

- feature flags
- system configs

---

## 6. Types of Caching

---

### 6.1 Application Cache (In-Memory)

- stored in application memory
- very fast

---

### 6.2 Distributed Cache

- shared across multiple services

Examples:

- Redis
- Memcached

---

### 6.3 CDN Cache

- caches static content at edge

---

### 6.4 Database Cache

- query results stored for reuse

---

## 7. Common Caching Strategies

---

### 7.1 Cache Aside (Lazy Loading)

Flow:

- check cache
- if miss → fetch from DB → update cache

👉 Most commonly used

---

### 7.2 Write Through

- write to cache and DB together

---

### 7.3 Write Back

- write to cache first, DB updated later

---

### 7.4 Read Through

- cache fetches data automatically

---

## 8. Cache Invalidation (CRITICAL)

---

👉 Hardest problem in caching

Approaches:

- TTL (time-based expiry)
- manual invalidation
- event-driven updates

---

## 9. Real-World Example

---

### Scenario: Product API

Without cache:

```text
Every request → DB hit
```

With cache:

```text
First request → DB
Next requests → Cache
```

👉 Significant latency reduction

---

## 10. Common Mistakes

---

❌ Caching everything blindly  
❌ No cache invalidation strategy  
❌ Stale data issues  
❌ Cache memory overuse

---

## 11. Important Interview Points

---

- caching reduces latency and DB load
- best for read-heavy data
- cache invalidation is critical
- Redis is commonly used

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is caching and where should you use it?

Answer like this:

> Caching is a technique where frequently accessed data is stored in a fast-access layer like Redis to reduce latency and avoid repeated database calls. It is typically used for read-heavy data, expensive computations, and external API responses. A proper cache invalidation strategy is important to ensure data consistency.
