---
title: "Phase 1 — Fixed Window Counter"
description: "Understand the Fixed Window Counter algorithm for rate limiting, how it works, and why it suffers from boundary burst issues."
keywords:
  - fixed window counter
  - rate limiter algorithm
  - api rate limiting
  - system design interview
  - rate limiting strategies
weight: 3
layout: "topic-content"
---

## 1. What is Fixed Window Counter?

---

Fixed Window Counter is one of the simplest rate limiting algorithms.

It works by dividing time into **fixed intervals (windows)** and counting the number of requests in each window.

```text
For each client:
Count requests in a fixed time window
Reset the counter when the window changes
```

---

## 2. How It Works

---

Assume:

```text
Limit = 100 requests per minute
```

Time is divided into windows like:

```text
12:00:00 → 12:00:59  → Window 1
12:01:00 → 12:01:59  → Window 2
```

For each window:

- count starts at 0
- increments with each request
- resets when a new window starts

---

## 3. Example

---

```text
Client A (Limit = 5 requests per minute)

12:00:10 → request 1 → allowed (count = 1)
12:00:20 → request 2 → allowed (count = 2)
12:00:30 → request 3 → allowed (count = 3)
12:00:40 → request 4 → allowed (count = 4)
12:00:50 → request 5 → allowed (count = 5)
12:00:55 → request 6 → rejected ❌

12:01:00 → new window → counter resets
12:01:01 → request → allowed (count = 1)
```

---

## 4. Data Model

---

We maintain state per client:

```text
clientId → (count, windowStartTime)
```

Example:

```text
ClientA → (count = 3, windowStart = 12:00:00)
```

---

## 5. Algorithm

---

```text
allowRequest(clientId):

    if no record exists:
        create new window
        count = 1
        allow

    else if current time is outside window:
        reset window
        count = 1
        allow

    else if count < limit:
        increment count
        allow

    else:
        reject
```

---

## 6. Simple Implementation Idea

---

This is conceptually very close to our naive approach.

Instead of storing `remaining`, we store `count`:

```java
class RequestWindow {
    int count;
    long windowStartTime;
}
```

---

## 7. Complexity

---

```text
Time Complexity → O(1)
Space Complexity → O(number of clients)
```

---

## 8. The Major Problem — Boundary Burst Issue

---

This is the most important limitation of Fixed Window Counter.

### Scenario

```text
Limit = 100 requests per minute
```

Client sends:

```text
12:00:59 → 100 requests (end of window)
12:01:00 → 100 requests (start of next window)
```

### Result

```text
200 requests in ~1 second ❌
```

This breaks the intent of rate limiting.

---

### Why this happens

Because the system treats windows independently:

```text
Window 1 → full quota
Window 2 → full quota
```

There is **no smoothing across windows**.

---

## 9. Pros and Cons

---

### Pros

```text
- Very simple to implement
- Fast (O(1))
- Low memory usage
```

---

### Cons

```text
- Boundary burst problem
- Not smooth (requests cluster at edges)
- Can allow sudden traffic spikes
```

---

## 10. When is it acceptable?

---

Fixed Window Counter is acceptable when:

- strict accuracy is not required
- small traffic bursts are acceptable
- system simplicity is more important than precision

---

## 11. Interview Explanation

---

> “Fixed Window Counter divides time into fixed intervals and counts requests per interval. It is simple and efficient, but suffers from boundary burst issues where a client can send double the allowed traffic across two adjacent windows. Because of this limitation, we usually move to sliding window or token bucket algorithms.”

---

## Conclusion

---

Fixed Window Counter improves our naive approach by formalizing the idea of time windows, but it is still not suitable for production systems where smooth rate limiting is required.

---

### 🔗 What’s Next?

👉 **Sliding Window Algorithm →**

---

> 📝 **Takeaway**:
>
> - Fixed Window Counter uses time-based request counting
> - It is simple but inaccurate near window boundaries
> - Boundary burst is its biggest limitation
> - Sliding Window solves this problem
