---
title: "Phase 1 — Requirement Clarification"
description: "Clarify the API Rate Limiter requirements before designing algorithms, including client identity, limits, windows, rejection behavior, and scope."
keywords:
  - api rate limiter requirements
  - rate limiter clarification
  - system design interview
  - rate limiting rules
  - backend design
weight: 1
layout: "topic-content"
---

## 1. Why Clarification Matters

---

Before choosing an algorithm, we must clarify what kind of rate limiter we are building.

A rate limiter can behave very differently depending on:

- who is being limited
- what limit is applied
- how the time window is calculated
- what happens when the limit is exceeded

> 📝 **Key Point:**  
> Rate limiting is not just about counting requests — it is about enforcing a clear traffic policy.

---

## 2. Clarification Questions (Interview Conversation)

---

### Q1 — Who are we limiting?

**You:** Are we limiting requests by user, IP address, API key, tenant, or endpoint?

**Interviewer:** Assume we limit by client ID or API key.

**Decision:**

```text
rate limit key = clientId / apiKey
```

This means each client gets its own independent quota.

---

### Q2 — What is the rate limit?

**You:** What limit should we enforce?

**Interviewer:** Start with 100 requests per minute per client.

**Decision:**

```text
limit = 100 requests
window = 1 minute
```

Example:

```text
Client A → max 100 requests/minute
Client B → max 100 requests/minute
```

---

### Q3 — What happens when the client exceeds the limit?

**You:** Should we reject the request, delay it, or queue it?

**Interviewer:** Reject requests immediately once the limit is exceeded.

**Decision:**

Return:

```text
HTTP 429 Too Many Requests
```

Optionally include:

```text
Retry-After header
```

---

### Q4 — Is this a hard limit or soft limit?

**You:** Should the limit be strict, or can we allow short bursts?

**Interviewer:** Start with a strict limit for Phase 1.

**Decision:**

```text
Hard limit: more than 100 requests/minute should be rejected
```

Later algorithms like Token Bucket can support controlled bursts.

---

### Q5 — Is the limiter single-node or distributed?

**You:** Should I assume this runs inside one application instance, or across multiple servers?

**Interviewer:** Start with a single-node design. We can evolve it later.

**Decision:**

For Phase 1:

- in-memory data structure
- no Redis
- no database
- no multi-instance coordination

Distributed rate limiting will be handled later.

---

### Q6 — Where is the rate limiter applied?

**You:** Is this applied at the API Gateway, load balancer, or inside the application service?

**Interviewer:** For now, implement the core logic as a reusable component.

**Decision:**

```text
RateLimiter.allowRequest(clientId)
```

Later, we can place it at:

- API Gateway
- edge layer
- service middleware/filter

---

### Q7 — Are limits same for all clients?

**You:** Do all clients have the same limit, or do premium clients get higher limits?

**Interviewer:** For Phase 1, assume same limit for all clients.

**Decision:**

```text
Default limit = 100 requests/minute per client
```

Later, we can support client-specific plans.

---

### Q8 — What is the expected response format?

**You:** Should the rate limiter return only allowed/denied, or include metadata like remaining requests?

**Interviewer:** Start with allowed/denied, but mention useful response metadata.

**Decision:**

Core method:

```java
boolean allowRequest(String clientId)
```

Future metadata:

```text
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
Retry-After
```

---

## 3. Final Assumptions for Phase 1

---

For Phase 1, we will assume:

- limit by `clientId` / `apiKey`
- same limit for all clients
- 100 requests per minute
- hard reject after limit is exceeded
- return `false` or HTTP 429 equivalent when rejected
- single-node in-memory design
- no Redis or distributed coordination yet
- core API: `allowRequest(clientId)`

---

## 4. Interview-Style Summary

---

In an interview, you could say:

> “Before choosing an algorithm, I’d like to clarify the policy. Are we limiting by user, IP, or API key? What is the limit and time window? Should requests be rejected or delayed after the limit is exceeded? Is this a single-node limiter or distributed across many servers? For the first version, I’ll assume a single-node in-memory limiter by client ID, with a hard limit of 100 requests per minute, returning false or HTTP 429 once exceeded.”

---

## Conclusion

---

Requirement clarification defines the rate limiting policy.

Once the policy is clear, we can choose the right algorithm.

---

### 🔗 What’s Next?

👉 **[Naive Approach →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/1_phase1/1_2_naive-approach)**

---

> 📝 **Takeaway**:
>
> - Clarify who is being limited
> - Define limit and time window
> - Decide rejection behavior
> - Keep Phase 1 single-node and in-memory
> - Algorithm choice depends on policy
