---
title: "How Do You Protect APIs from Request Storms and Abuse?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-102"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags:
    [
      "api protection",
      "rate limiting",
      "throttling",
      "ddos",
      "system design",
      "reliability",
    ]
---

## 1. Short Answer (Interview Style)

---

> **To protect APIs from request storms or abusive traffic, we use rate limiting, authentication, API gateway controls, payload validation, and infrastructure-level protections like WAF and CDN. The goal is to reject or control bad traffic early and protect backend systems from overload.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how to protect public-facing APIs
- real-world production challenges
- system stability under malicious or heavy load
- layered defense strategy

👉 This is a very common follow-up after rate limiting or high traffic questions.

---

## 3. Problem — What Can Go Wrong

---

```text
Client → API Gateway → Services
```

If a client sends excessive or malicious traffic:

- backend services get overloaded
- legitimate users face latency or failures
- system may crash

👉 One bad client can affect the entire system.

---

## 4. Defense-in-Depth Strategy (VERY IMPORTANT)

---

👉 Always think in layers:

```text
Client
→ CDN / WAF
→ API Gateway
→ Application Layer
→ Backend Services
```

👉 Each layer protects the next one.

---

## 5. Key Protection Techniques

---

### 5.1 Rate Limiting

- restrict number of requests per client
- prevents overload

---

### 5.2 Throttling

- slows down traffic instead of rejecting immediately
- smoothens spikes

---

### 5.3 Authentication & Identification

- API keys / OAuth tokens
- identify each client

👉 Enables per-client limits

---

### 5.4 API Gateway Controls

API Gateway can enforce:

- rate limits
- authentication
- request validation
- IP filtering

👉 First line of defense inside system

---

### 5.5 Payload Validation & Size Limits

- restrict request body size
- reject malformed requests early

👉 Prevents memory and CPU abuse

---

### 5.6 WAF, CDN & DDoS Protection (Edge Layer)

These protections sit **before your API Gateway** and act as the **first line of defense**.

#### 1. CDN (Content Delivery Network)

A CDN caches and serves content from edge locations closer to users.

👉 Role in protection:

- absorbs large volumes of traffic
- reduces load on backend services
- blocks repeated requests using caching

👉 Example:

```text
Client → CDN → API Gateway → Services
```

If requests are cacheable, CDN serves them directly without hitting your system.

---

#### 2. WAF (Web Application Firewall)

WAF filters and monitors HTTP traffic based on rules.

👉 It protects against:

- SQL injection
- XSS (Cross-Site Scripting) attacks
- malformed payloads
- bot traffic

👉 Works by:

- inspecting incoming requests
- blocking suspicious patterns
- allowing only valid traffic

---

#### 3. DDoS Protection

DDoS (Distributed Denial of Service) attacks try to overwhelm your system with massive traffic.

👉 Protection mechanisms:

- traffic rate analysis
- IP reputation filtering
- geo-blocking
- automatic traffic scrubbing

---

#### 🔥 Combined Flow (VERY IMPORTANT)

```text
Client
→ CDN (caching + absorb traffic)
→ WAF (filter malicious requests)
→ DDoS Protection (block attack patterns)
→ API Gateway (rate limiting, auth)
→ Backend Services
```

---

👉 Key Idea:

- CDN reduces load
- WAF filters bad requests
- DDoS protection blocks large-scale attacks

👉 Together, they ensure **only valid and manageable traffic reaches your system**.

---

### 5.7 Timeouts & Connection Limits

- prevent slow clients from holding resources
- release threads quickly

---

### 5.8 Backpressure & Load Shedding

- reject or delay requests when overloaded
- protect system from collapse

---

## 6. Real-World Example

---

### Scenario: Client Abuse

```text
Client sends 10,000 requests/minute
```

System behavior:

- API Gateway applies rate limiting → rejects excess requests
- WAF blocks suspicious patterns
- backend services remain stable

👉 Legitimate users are unaffected

---

## 7. Handling Legitimate High Traffic

---

Sometimes traffic is not malicious, just high.

👉 Then:

- allow bursts (token bucket)
- use exponential backoff
- apply per-tier limits (premium vs normal users)

---

## 8. HTTP Response Codes

---

- `429 Too Many Requests` → rate limit exceeded
- `403 Forbidden` → blocked client
- `503 Service Unavailable` → system overloaded

---

## 9. Common Mistakes

---

❌ No client identification  
❌ Only relying on autoscaling  
❌ No payload validation  
❌ No monitoring of abusive traffic  
❌ Applying same limit to all users

---

## 10. Important Interview Points

---

- use layered protection (edge → gateway → app)
- reject bad traffic early
- rate limiting + authentication is essential
- autoscaling alone is not enough

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How do you protect APIs from request storms?

Answer like this:

> I would use a layered defense approach. At the edge, I’d use CDN or WAF for DDoS protection. At the API gateway, I’d enforce authentication, rate limiting, and request validation. I’d also apply payload size limits and timeouts to prevent resource exhaustion. Inside the system, I’d use backpressure and load shedding if needed. This ensures bad traffic is blocked early and backend services remain stable.
