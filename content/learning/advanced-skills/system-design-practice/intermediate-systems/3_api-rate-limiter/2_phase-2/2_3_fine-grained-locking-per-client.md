---
title: "Phase 2 — Fine-Grained Locking Per Client"
description: "Improve the thread-safe rate limiter by replacing one global lock with per-client locking, allowing independent clients to be processed concurrently."
keywords:
  - fine grained locking
  - per client locking
  - rate limiter concurrency
  - java reentrantlock
  - system design interview
weight: 3
layout: "topic-content"
---

## 1. Why Do We Need Fine-Grained Locking?

---

In the previous article, we made the rate limiter thread-safe using `synchronized`.

That solved correctness, but introduced one major limitation:

```text
All clients share the same lock
```

So even if two requests belong to different clients, they still block each other.

---

### Example

```text
Client A request → holds lock
Client B request → waits
Client C request → waits
```

This is safe, but inefficient.

---

> 📝 **Goal:**  
> Allow requests for different clients to proceed concurrently, while still protecting each client’s own rate-limit state.

---

## 2. Key Idea

---

Instead of one global lock, use a separate lock per client.

```text
Client A → Lock A
Client B → Lock B
Client C → Lock C
```

This means:

```text
same client → synchronized

different clients → can run in parallel
```

---

## 3. Why This Works

---

Rate limiting state is independent per client.

Example:

```text
Client A timestamps do not affect Client B timestamps
```

So we do not need to block Client B while processing Client A.

We only need to ensure that requests for the **same client** are processed atomically.

---

## 4. Data Structures

---

We need two maps:

```java
Map<String, Deque<Long>> requestLogs;
Map<String, ReentrantLock> clientLocks;
```

Where:

- `requestLogs` stores timestamps per client
- `clientLocks` stores one lock per client

---

## 5. Java Implementation

---

```java
package com.theshubhamco.apiratelimiter.threadsafe.perclientlock;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

public class RateLimiter {

    private final int requestLimit;
    private final long timeWindowInMillis;

    private final Map<String, Deque<Long>> requestLogs = new ConcurrentHashMap<>();
    private final Map<String, ReentrantLock> clientLocks = new ConcurrentHashMap<>();

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

    public boolean allowRequest(String clientId) {
        if (clientId == null || clientId.isBlank()) {
            throw new IllegalArgumentException("clientId cannot be null or empty");
        }

        ReentrantLock lock = clientLocks.computeIfAbsent(
                clientId,
                key -> new ReentrantLock()
        );

        lock.lock();
        try {
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
        } finally {
            lock.unlock();
        }
    }
}
```

---

## 6. Why `ConcurrentHashMap` Is Used

---

We use `ConcurrentHashMap` because multiple threads may access the maps at the same time.

```java
private final Map<String, Deque<Long>> requestLogs = new ConcurrentHashMap<>();
private final Map<String, ReentrantLock> clientLocks = new ConcurrentHashMap<>();
```

This makes map-level operations safe, such as:

```java
computeIfAbsent(...)
```

---

## 7. Why We Still Need Locks

---

`ConcurrentHashMap` protects the map structure, but it does not protect the full rate-limit operation.

The operation is still compound:

```text
get queue → cleanup → check size → add timestamp
```

So we still need a per-client lock around that logic.

> 🧠 **Important:**  
> Thread-safe data structures protect individual operations, not your full business rule.

---

## 8. Why `try/finally` Is Required

---

When using explicit locks, we must always release the lock.

```java
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();
}
```

If an exception occurs and the lock is not released, future requests for that client may block forever.

---

## 9. What Improved?

---

With global synchronization:

```text
Client A blocks Client B
```

With per-client locking:

```text
Client A request → Lock A
Client B request → Lock B
```

Both can proceed concurrently.

---

## 10. What Is Still Serialized?

---

Requests for the same client are still serialized.

That is intentional.

```text
Client A request 1
Client A request 2
Client A request 3
```

These must be processed one at a time to avoid exceeding the limit incorrectly.

---

## 11. Limitation — Lock Map Growth

---

This design introduces another memory concern.

```text
New client → new lock entry
```

If many unique clients appear, `clientLocks` can grow over time.

Possible cleanup strategies:

- remove inactive client entries periodically
- use TTL-based cleanup
- use weak references carefully
- use striped locks instead of one lock per client

---

## 12. Alternative — Striped Locking

---

Instead of one lock per client, we can maintain a fixed number of locks.

```text
Client ID → hash → one of N locks
```

Example:

```text
1024 locks shared across all clients
```

This reduces memory usage but introduces some lock sharing.

---

### Trade-off

```text
Per-client lock → more concurrency, more memory
Striped lock → less memory, possible contention
```

---

## 13. Complexity

---

Algorithmic complexity remains:

```text
allowRequest(clientId) → amortized O(1)
```

Concurrency behavior improves:

```text
Different clients can be processed in parallel
```

---

## 14. Interview Explanation

---

> “The synchronized version is correct but uses one global lock, so all clients block each other. Since rate-limit state is independent per client, I can improve throughput by using a separate lock per client. This allows different clients to be processed concurrently while still serializing requests for the same client. I would use ConcurrentHashMap for safe map access and ReentrantLock with try/finally to protect the per-client critical section.”

---

## Conclusion

---

Fine-grained locking improves concurrency by reducing unnecessary blocking.

It changes the design from:

```text
one global lock → many client-specific locks
```

This keeps correctness while improving throughput for multi-client traffic.

---

### 🔗 What’s Next?

👉 **[Atomic Operations & Their Limitations →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/2_phase-2/2_4_atomic-operations-and-limitations/)**

---

> 📝 **Takeaway**:
>
> - Global locking is safe but restrictive
> - Per-client locking improves concurrency
> - `ConcurrentHashMap` is not enough by itself
> - Compound business logic still needs locking
> - Lock cleanup must be considered
