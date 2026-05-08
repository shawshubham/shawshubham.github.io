---
title: "Phase 2 — Thread-Safe Using synchronized"
description: "Make the Sliding Window Log rate limiter thread-safe using synchronized and understand why correctness comes before performance."
keywords:
  - synchronized rate limiter
  - java thread safety
  - sliding window concurrency
  - rate limiter race condition
  - system design interview
weight: 2
layout: "topic-content"
---

## 1. Goal of This Article

---

In the previous article, we saw that the rate limiter can break when multiple threads call `allowRequest()` at the same time.

The core issue was:

```text
read → check → update
```

This must be executed atomically.

In this article, we will make the **Sliding Window Log** implementation thread-safe using the simplest approach:

```java
synchronized
```

> 📝 **Goal:**  
> Make the implementation correct under concurrent access before optimizing performance.

---

## 2. Reminder — Unsafe Sliding Window Log

---

Our Sliding Window Log stores request timestamps per client:

```java
Map<String, Deque<Long>> requestLogs;
```

The core logic is:

```text
1. Get client queue
2. Remove expired timestamps
3. Check queue size
4. Add current timestamp if allowed
```

These steps must happen together.

---

## 3. Why `synchronized` Works

---

In Java, `synchronized` ensures that only one thread can enter the synchronized method/block at a time for the same object.

If we make `allowRequest()` synchronized:

```java
public synchronized boolean allowRequest(String clientId)
```

then only one thread can execute the rate limit check at a time.

---

### Example

```text
Thread A enters allowRequest()
Thread B waits
Thread A completes update
Thread B enters after state is consistent
```

This prevents race conditions.

---

## 4. Thread-Safe Implementation

---

```java
package com.theshubhamco.apiratelimiter.threadsafe.synchronizedmethod;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

public class RateLimiter {

    private final int requestLimit;
    private final long timeWindowInMillis;
    private final Map<String, Deque<Long>> requestLogs = new HashMap<>();

    public RateLimiter(int requestLimit, int timeWindowInSeconds) {
        if (requestLimit <= 0) {
            throw new IllegalArgumentException("requestLimit must be greater than 0");
        }

        if (timeWindowInSeconds <= 0) {
            throw new IllegalArgumentException("timeWindowInSeconds must be greater than 0");
        }

        this.requestLimit = requestLimit;
        this.timeWindowInMillis = timeWindowInSeconds * 1000L;
    }

    public synchronized boolean allowRequest(String clientId) {
        if (clientId == null || clientId.isBlank()) {
            throw new IllegalArgumentException("clientId cannot be null or empty");
        }

        long now = System.currentTimeMillis();
        Deque<Long> requestTimestamps = requestLogs.computeIfAbsent(
                clientId,
                key -> new ArrayDeque<>()
        );

        long windowStart = now - timeWindowInMillis;

        while (!requestTimestamps.isEmpty()
                && requestTimestamps.peekFirst() <= windowStart) {
            requestTimestamps.pollFirst();
        }

        if (requestTimestamps.size() < requestLimit) {
            requestTimestamps.addLast(now);
            return true;
        }

        return false;
    }
}
```

---

## 5. What Is Protected Now?

---

The full critical section is protected:

```text
get queue → cleanup → check size → add timestamp
```

This means two threads cannot simultaneously:

- read the same queue size
- both decide the request is allowed
- both add timestamps beyond the limit

---

## 6. Why We Synchronize the Whole Method

---

At first, synchronizing the whole method is acceptable because almost all meaningful work touches shared state.

Shared state includes:

```java
requestLogs
requestTimestamps
```

So this is clear and correct.

---

## 7. Can We Use a `synchronized` Block Instead?

---

Yes.

We can validate input before locking and synchronize only the shared-state logic.

```java
public boolean allowRequest(String clientId) {
    if (clientId == null || clientId.isBlank()) {
        throw new IllegalArgumentException("clientId cannot be null or empty");
    }

    synchronized (this) {
        // access and update requestLogs safely
    }
}
```

This reduces the synchronized scope slightly.

---

## 8. Synchronized Block Version

---

```java
public boolean allowRequest(String clientId) {
    if (clientId == null || clientId.isBlank()) {
        throw new IllegalArgumentException("clientId cannot be null or empty");
    }

    synchronized (this) {
        long now = System.currentTimeMillis();
        Deque<Long> requestTimestamps = requestLogs.computeIfAbsent(
                clientId,
                key -> new ArrayDeque<>()
        );

        long windowStart = now - timeWindowInMillis;

        while (!requestTimestamps.isEmpty()
                && requestTimestamps.peekFirst() <= windowStart) {
            requestTimestamps.pollFirst();
        }

        if (requestTimestamps.size() < requestLimit) {
            requestTimestamps.addLast(now);
            return true;
        }

        return false;
    }
}
```

---

## 9. Complexity

---

Algorithmic complexity remains the same:

```text
allowRequest(clientId) → amortized O(1)
```

But concurrency behavior changes:

```text
Only one thread can execute rate limit logic at a time
```

---

## 10. Limitation of This Approach

---

`synchronized` gives correctness, but it limits throughput.

With one global lock:

```text
Client A request blocks Client B request
Client B request blocks Client C request
```

Even if different clients are independent, they still wait for the same object lock.

---

### Example

```text
Client A → allowRequest()
Client B → allowRequest()
Client C → allowRequest()
```

All requests are serialized.

This is safe, but not scalable under high traffic.

---

## 11. Why This Is Still a Good First Fix

---

In interviews, correctness comes first.

A simple synchronized solution shows that you understand:

- shared mutable state
- race conditions
- atomicity
- critical sections

Then you can improve from there.

---

## 12. Interview Explanation

---

> “The Sliding Window Log implementation performs multiple operations: cleanup old timestamps, check the queue size, and add the current timestamp. These must be atomic. The simplest fix is to synchronize `allowRequest()` so only one thread can modify the in-memory state at a time. This makes the limiter correct, but it uses a global lock, so different clients block each other. That is acceptable as a first fix, but we can improve it using finer-grained locking.”

---

## Conclusion

---

Using `synchronized` gives us a correct thread-safe baseline.

But it also introduces a scalability limitation:

```text
safe but serialized
```

---

### 🔗 What’s Next?

👉 **[Fine-Grained Locking Per Client →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/2_phase-2/2_3_fine-grained-locking-per-client/)**

---

> 📝 **Takeaway**:
>
> - `synchronized` makes the rate limiter thread-safe
> - It protects the full read-check-update operation
> - It is simple and correct
> - It serializes all requests, even for different clients
