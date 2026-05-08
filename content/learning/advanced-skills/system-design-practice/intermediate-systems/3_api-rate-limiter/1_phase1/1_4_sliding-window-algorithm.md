---
title: "Phase 1 — Sliding Window Algorithm"
description: "Understand the Sliding Window rate limiting algorithm, how it smooths traffic compared to fixed windows, and its variants with trade-offs."
keywords:
  - sliding window rate limiter
  - api rate limiting algorithms
  - sliding window log
  - sliding window counter
  - system design interview
weight: 4
layout: "topic-content"
---

## 1. Why Do We Need Sliding Window?

---

In the previous approach (Fixed Window Counter), we saw a major issue:

```text
Boundary Burst Problem
```

Example:

```text
12:00:59 → 100 requests
12:01:00 → 100 requests
```

Result:

```text
200 requests in ~1 second ❌
```

This happens because each window is treated independently.

---

> 📝 **Goal:**  
> Smooth out request distribution across time instead of resetting abruptly.

---

## 2. What is Sliding Window?

---

Sliding Window removes the concept of rigid boundaries.

Instead of fixed intervals, it considers a **rolling time window**.

```text
At any point in time:
Only consider requests in the last N seconds
```

---

Example:

```text
Limit = 100 requests per 60 seconds

At time T:
Count requests between (T - 60 seconds) → T
```

---

## 3. How It Works

---

For each request:

1. Remove requests that are older than the window
2. Count remaining requests
3. If count < limit → allow
4. Else → reject

---

```text
allowRequest(clientId):

    remove requests older than (now - window)

    if current request count < limit:
        add current request timestamp
        allow

    else:
        reject
```

---

## 4. Sliding Window Log (Exact Approach)

---

We store timestamps of all requests.

```text
clientId → list of timestamps
```

---

### Example

```text
Limit = 3 requests / 10 seconds

Timestamps:
[10, 12, 15]

New request at time = 20

Remove timestamps < (20 - 10 = 10)
Remaining → [10, 12, 15]

Count = 3 → reject ❌
```

---

### Data Structure

```java
Deque<Long> timestamps;
```

We use a queue because:

- oldest request at front
- newest request at back

---

## 5. Simple Implementation Idea

---

```java
Map<String, Deque<Long>> requestLogs;
```

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/apiratelimiter/slidingwindowrequestlog">See Code in Git Repo</a>
</div>

```java
package com.theshubhamco.apiratelimiter.slidingwindowrequestlog;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

public class RateLimiter {
    //Request Limit
    private final int requestLimit;
    private final long timeWindowInMillis;
    private final Map<String, Deque<Long>> requestLogs = new HashMap<>(); //limit needed OOM

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
        if (clientId == null || clientId.isEmpty()) {
            throw new IllegalArgumentException("clientId cannot be null or empty");
        }

        long now = System.currentTimeMillis();
        Deque<Long> requestTimeStamps = requestLogs.computeIfAbsent(clientId, k -> new ArrayDeque<>());

        while (!requestTimeStamps.isEmpty() && requestTimeStamps.peekFirst() <= now - timeWindowInMillis){
            requestTimeStamps.pollFirst();
        }

        if (requestTimeStamps.size() < requestLimit) {
            requestTimeStamps.addLast(now);
            return true;
        }

        return false;
    }
}

```

---

## 6. Complexity

---

### Time Complexity

```text
Worst-case: O(n) (cleanup of old timestamps)
Average: amortized O(1)
```

---

### Space Complexity

```text
O(number of requests in window per client)
```

This can be large under heavy traffic.

---

## 7. Pros and Cons

---

### Pros

```text
- Accurate rate limiting
- No boundary burst problem
- Smooth request distribution
```

---

### Cons

```text
- High memory usage (store all timestamps)
- Cleanup overhead
- Not ideal for very high traffic systems
```

---

## 8. Sliding Window Counter (Optimized Variant)

---

The Sliding Window Log approach is accurate but can consume significant memory because it stores every request timestamp.

To optimize this, we can use an **approximation technique** called **Sliding Window Counter**.

### 💡 Core Idea

Instead of storing every request timestamp, we:

```text
- Track request count for current window
- Track request count for previous window
- Estimate current usage using a weighted combination
```

### 📊 Formula

```text
estimatedCount =
    currentWindowCount +
    (previousWindowCount × overlapRatio)
```

Where:

```text
overlapRatio =
    remaining time in current window / full window size
```

---

Example:

```text
Limit = 100 requests / 60 seconds

Previous window count = 80
Current window count = 30
Current window elapsed = 30 seconds

Remaining time = 30 seconds
overlapRatio = 30 / 60 = 0.5

Estimated count = 30 + (80 × 0.5)
                = 70
```

```text
70 < 100 → allow request
```

### 🔧 Full Java Implementation (For Learning)

> ⚠️ Note:  
> This implementation is provided for conceptual understanding.
> In interviews, you are usually expected to implement Sliding Window Log, not this optimized version.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/apiratelimiter/slidingwindowcounter">See Code in Git Repo</a>
</div>

```java
package com.theshubhamco.apiratelimiter.slidingwindowcounter;

import java.util.HashMap;
import java.util.Map;

public class RateLimiter {

    private final int requestLimit;
    private final long windowSizeInMillis;
    private final Map<String, ClientWindow> clientWindows = new HashMap<>();

    public RateLimiter(int requestLimit, int timeWindowInSeconds) {
        this.requestLimit = requestLimit;
        this.windowSizeInMillis = timeWindowInSeconds * 1000L;
    }

    public boolean allowRequest(String clientId) {
        long now = System.currentTimeMillis();
        long currentWindowStart = getWindowStart(now);

        ClientWindow window = clientWindows.get(clientId);

        if (window == null) {
            clientWindows.put(clientId, new ClientWindow(currentWindowStart, 1, 0));
            return true;
        }

        // Same window
        if (window.currentWindowStart == currentWindowStart) {

            double estimated = calculateEstimatedCount(window, now);

            if (estimated >= requestLimit) {
                return false;
            }

            window.currentWindowCount++;
            return true;
        }

        // Previous window → shift window
        if (window.currentWindowStart == currentWindowStart - windowSizeInMillis) {
            clientWindows.put(clientId,
                    new ClientWindow(currentWindowStart, 1, window.currentWindowCount));
            return true;
        }

        // Completely new window
        clientWindows.put(clientId, new ClientWindow(currentWindowStart, 1, 0));
        return true;
    }

    private long getWindowStart(long now) {
        return (now / windowSizeInMillis) * windowSizeInMillis;
    }

    private double calculateEstimatedCount(ClientWindow window, long now) {
        long elapsed = now - window.currentWindowStart;
        long remaining = windowSizeInMillis - elapsed;

        double overlapRatio = (double) remaining / windowSizeInMillis;

        return window.currentWindowCount +
               (window.previousWindowCount * overlapRatio);
    }
}
```

```java
class ClientWindow {

    long currentWindowStart;
    int currentWindowCount;
    int previousWindowCount;

    public ClientWindow(long start, int current, int previous) {
        this.currentWindowStart = start;
        this.currentWindowCount = current;
        this.previousWindowCount = previous;
    }
}
```

---

### Trade-off

```text
Sliding Window Log:
✔ Accurate
❌ High memory

Sliding Window Counter:
✔ Lower memory
❌ Approximate results
```

### 🎯 When to Use

Use Sliding Window Counter when:

```text
- traffic is very high
- memory is constrained
- slight approximation is acceptable
```

### 📝 Interview Guidance

```text
- Implement Sliding Window Log (expected)
- Explain Sliding Window Counter (bonus)
- Avoid coding this unless explicitly asked
```

---

## 9. Fixed Window vs Sliding Window

---

```text
Fixed Window:
- simple
- fast
- bursty ❌

Sliding Window:
- smooth
- accurate ✅
- higher memory cost
```

---

## 10. When to Use Sliding Window

---

Use Sliding Window when:

- fairness is important
- traffic smoothing is required
- bursts must be controlled strictly

---

## 11. Interview Explanation

---

> “Sliding Window solves the boundary burst issue by considering a rolling time window instead of fixed intervals. The simplest implementation uses a log of timestamps per client and removes expired entries before counting. This provides accurate rate limiting but increases memory usage, so optimized versions use bucket-based approximation.”

---

## Conclusion

---

Sliding Window provides more accurate and fair rate limiting compared to fixed window approaches.

However, it introduces memory and cleanup overhead.

---

### 🔗 What’s Next?

👉 **[Token Bucket / Leaky Bucket →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/1_phase1/1_5_token-bucket/)**

---

> 📝 **Takeaway**:
>
> - Sliding Window uses a rolling time window
> - Eliminates boundary burst issue
> - More accurate but memory-intensive
> - Can be optimized using bucket-based approximation
