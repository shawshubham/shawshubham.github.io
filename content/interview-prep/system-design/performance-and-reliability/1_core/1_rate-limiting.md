---
title: "What is Rate Limiting and Why Is It Important?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-101"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags:
    [
      "rate limiting",
      "api protection",
      "performance",
      "reliability",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Rate limiting is a mechanism used to restrict how many requests a client can make to an API within a given time window. It is important because it protects the system from abuse, prevents overload, and helps ensure fair usage across clients.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- API protection basics
- traffic control in distributed systems
- overload prevention
- fairness and system stability under load

👉 This is a very common backend and system design interview question.

---

## 3. Problem — Why Rate Limiting Is Needed

---

Suppose your API is exposed to external clients:

```text
Clients → API Gateway → Services
```

If one client sends too many requests:

- backend services become overloaded
- legitimate clients suffer
- latency increases
- failure rates rise

👉 A single noisy client can degrade the whole system.

---

## 4. What Rate Limiting Does

---

Rate limiting enforces a request quota.

Examples:

- 100 requests per minute per API key
- 1000 requests per hour per customer
- 10 login attempts per minute per IP

---

If the limit is exceeded:

- request is rejected
- server typically returns:

```text
429 Too Many Requests
```

---

## 5. Why It Is Important

---

### 1. Protects the System

- prevents overload
- reduces risk of traffic storms

---

### 2. Ensures Fair Usage

- stops one client from consuming all capacity

---

### 3. Improves Reliability

- keeps services stable under high traffic

---

### 4. Helps Security

- reduces brute-force attempts
- limits abusive behavior

---

## 6. Common Places to Apply Rate Limiting

---

### 1. API Gateway

Most common place.

👉 Good because requests are blocked early.

---

### 2. Load Balancer / Edge Layer

Can protect services before traffic reaches app layer.

---

### 3. Application Layer

Useful when limits depend on business logic.

---

## 7. Common Dimensions for Limiting

---

Rate limits can be applied per:

- API key
- user
- tenant
- IP address
- endpoint

---

👉 In real systems, limits are often different for different clients or APIs.

---

## 8. Real-World Example

---

Suppose payment API supports external clients.

Limit:

```text
100 requests/minute per client
```

If one client sends 1000 requests in a minute:

- first 100 may be accepted
- rest are rejected with `429`

👉 This protects the backend and keeps service available for others.

---

## 9. Common Rate Limiting Algorithms

---

### 1. Fixed Window

Example:

```text
100 requests per minute
```

Simple, but may allow bursts near window boundaries.

---

### 2. Sliding Window

Tracks requests over a rolling time period.

More accurate than fixed window.

---

### 3. Token Bucket

Requests consume tokens from a bucket.

- tokens refill over time
- allows controlled bursts

👉 Very common in real systems.

---

### 4. Leaky Bucket

Processes requests at a fixed rate.

Useful for smoothing traffic.

---

## 10. Rate Limiting vs Throttling

---

- **Rate limiting** → hard cap on request count
- **Throttling** → controls speed/flow of requests

---

👉 Rate limiting rejects excess requests; throttling may delay or slow them.

---

## 11. Important Design Considerations

---

### Burst Handling

- some APIs should allow short bursts
- token bucket works well here

---

### Different Limits for Different Clients

- premium clients may get higher limits
- internal APIs may have different policies

---

### Retry Behavior

- clients should back off after `429`
- `Retry-After` header can help

---

## 12. Common Mistakes

---

❌ Applying same limit to every endpoint  
❌ Not identifying clients properly  
❌ No monitoring of rejected requests  
❌ Ignoring retries after `429`  
❌ Using only autoscaling without traffic control

---

## 13. Important Interview Points

---

- rate limiting protects APIs from abuse and overload
- it is commonly implemented at API gateway level
- `429 Too Many Requests` is the standard response
- token bucket is a popular real-world algorithm

---

## 14. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is rate limiting and why is it important?

Answer like this:

> Rate limiting is a mechanism that restricts how many requests a client can make within a defined time window. It is important because it protects the system from abuse, prevents overload, ensures fair usage among clients, and improves overall reliability. It is commonly implemented at the API gateway layer and typically returns HTTP 429 when limits are exceeded.
