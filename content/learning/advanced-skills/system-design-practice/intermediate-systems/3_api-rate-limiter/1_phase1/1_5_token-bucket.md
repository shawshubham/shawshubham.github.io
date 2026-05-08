---
title: "Phase 1 — Token Bucket & Leaky Bucket"
description: "Understand Token Bucket and Leaky Bucket algorithms for rate limiting, how they allow controlled bursts, and why they are widely used in production systems."
keywords:
  - token bucket rate limiter
  - leaky bucket algorithm
  - api rate limiting algorithms
  - backend rate limiting
  - system design interview
weight: 5
layout: "topic-content"
---

## 1. Why Do We Need Another Algorithm?

---

So far we have seen:

```text
Fixed Window → simple but bursty
Sliding Window → accurate but memory heavy
```

We now want a solution that:

```text
- allows small bursts
- enforces a steady rate
- uses minimal memory
```

---

> 📝 **Goal:**  
> Balance flexibility (bursts) with control (rate limiting).

---

## 2. What is Token Bucket?

---

Token Bucket is one of the most widely used rate limiting algorithms in production systems.

### Core Idea

```text
- Tokens are added to a bucket at a fixed rate
- Each request consumes one token
- If no tokens are available → reject request
```

---

### Example

```text
Bucket capacity = 10 tokens
Refill rate = 1 token per second
```

Scenario:

```text
At time 0 → bucket has 10 tokens
User sends 5 requests → allowed (5 tokens left)

After 5 seconds → 5 tokens added → bucket back to 10
```

---

## 3. Key Properties

---

### ✔ Allows Burst Traffic

```text
If bucket is full → multiple requests allowed instantly
```

---

### ✔ Enforces Average Rate

```text
Over time, requests are limited by token refill rate
```

---

### ✔ Memory Efficient

```text
No need to store individual request timestamps
```

---

## 4. Algorithm

---

```text
allowRequest():

    refill tokens based on elapsed time

    if tokens >= 1:
        tokens--
        allow

    else:
        reject
```

---

## 5. Java Implementation

---

```java
package com.theshubhamco.apiratelimiter.tokenbucket;

public class RateLimiter {

    private final int capacity;
    private final double refillRatePerMillis;

    private double tokens;
    private long lastRefillTime;

    public RateLimiter(int capacity, int refillRatePerSecond) {
        if (capacity <= 0 || refillRatePerSecond <= 0) {
            throw new IllegalArgumentException("Invalid configuration");
        }

        this.capacity = capacity;
        this.refillRatePerMillis = refillRatePerSecond / 1000.0;
        this.tokens = capacity;
        this.lastRefillTime = System.currentTimeMillis();
    }

    public boolean allowRequest() {
        refill();

        if (tokens >= 1) {
            tokens -= 1;
            return true;
        }

        return false;
    }

    private void refill() {
        long now = System.currentTimeMillis();
        long elapsed = now - lastRefillTime;

        double tokensToAdd = elapsed * refillRatePerMillis;

        tokens = Math.min(capacity, tokens + tokensToAdd);
        lastRefillTime = now;
    }
}
```

---

## 6. Complexity

---

```text
Time Complexity → O(1)
Space Complexity → O(1)
```

---

## 7. Pros and Cons

---

### Pros

```text
- Allows controlled bursts
- Smooth traffic over time
- Memory efficient
- Widely used in production systems
```

---

### Cons

```text
- Slightly more complex than fixed window
- Requires time-based calculations
```

---

## 8. What is Leaky Bucket?

---

Leaky Bucket is another rate limiting algorithm with a slightly different behavior.

### Core Idea

```text
- Requests enter a queue (bucket)
- Requests are processed at a fixed rate
- If queue is full → reject new requests
```

---

### Analogy

```text
Water flows into a bucket
Water leaks out at a constant rate
```

---

## 9. Token Bucket vs Leaky Bucket

---

```text
Token Bucket:
- allows bursts
- flexible

Leaky Bucket:
- constant output rate
- smooth but rigid
```

---

## 10. When to Use Token Bucket

---

Use Token Bucket when:

```text
- burst traffic should be allowed
- system needs flexibility
- APIs expect short spikes in traffic
```

---

## 11. Interview Explanation

---

> “Token Bucket allows bursts by accumulating tokens over time and consuming one per request. It ensures that the average rate is maintained while still allowing short bursts. Compared to sliding window, it is more memory efficient and widely used in real-world systems.”

---

## Conclusion

---

Token Bucket provides a balance between:

```text
burst handling + rate control + efficiency
```

This makes it one of the most practical rate limiting algorithms.

---

### 🔗 What’s Next?

👉 **[Phase 2 — Concurrency & Atomicity →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/2_phase-2/2_1_problem-evolution/)**

---

> 📝 **Takeaway**:
>
> - Token Bucket is the most practical rate limiting algorithm
> - Allows bursts while enforcing average rate
> - Memory efficient and widely used in production
> - Better suited than fixed/sliding window for many real-world APIs
