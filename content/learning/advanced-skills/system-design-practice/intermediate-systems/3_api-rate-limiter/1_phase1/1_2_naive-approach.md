---
title: "Phase 1 — Naive Approach"
description: "Build a simple single-node API Rate Limiter using an in-memory map and fixed request window, then understand its limitations."
keywords:
  - api rate limiter naive approach
  - fixed window counter
  - in memory rate limiter
  - java rate limiter
  - system design interview
weight: 2
layout: "topic-content"
---

## 1. Why Start with a Naive Approach?

---

Before jumping into advanced algorithms like sliding window or token bucket, we should first build a simple working solution.

The goal is to understand the core idea:

```text
For each client, count how many requests they have made in the current time window.
```

> 📝 **Key Point:**  
> A naive solution is useful because it gives us a correct baseline before we improve the design.

---

## 2. Naive Idea

---

For each client, maintain:

- request limit
- remaining requests
- reset time

Example:

```text
Client A → 100 requests per minute
```

State:

```text
clientId = ClientA
limit = 100
remaining = 99
timeWindow = 60 seconds
resetTime = currentTime + 60 seconds
```

---

## 3. How It Works

---

When a request arrives:

1. Check if the client already has an active window
2. If no window exists, create a new window and allow the request
3. If the window expired, reset the counter and allow the request
4. If remaining requests are available, decrement and allow
5. Otherwise, reject the request

---

```text
allowRequest(clientId)
    if no record exists:
        create new window
        allow

    else if window expired:
        reset window
        allow

    else if remaining > 0:
        decrement remaining
        allow

    else:
        reject
```

---

## 4. Java Implementation

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/apiratelimiter/naive">See Code in Git Repo</a>
</div>

```java
package com.theshubhamco.apiratelimiter.naive;

import java.util.HashMap;
import java.util.Map;

public class RateLimiter {
    //Request Limit
    private final int requestLimit;
    private final long timeWindowInMillis;
    private final Map<String, RequestLimit> requestLimits = new HashMap<>(); //limit needed OOM

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

        RequestLimit current = requestLimits.get(clientId);

        if (current == null || now >= current.getResetTimeMillis()) {
            requestLimits.put(clientId, createNewWindow(now));
            return true;

        }

        if (current.getRemaining() > 0) {
            requestLimits.put(clientId, current.consumeOne());
            return true;
        }

        return false;
    }

    private RequestLimit createNewWindow(long now){
        return RequestLimit.builder()
                .limit(this.requestLimit)
                .remaining(this.requestLimit - 1)
                .resetTimeMillis( now+ timeWindowInMillis)
                .build();
    }
}

```

---

```java
package com.theshubhamco.apiratelimiter.naive;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class RequestLimit {
    private final int limit;
    private final int remaining;
    private final long resetTimeMillis;

    public RequestLimit consumeOne(){
        return new RequestLimit(limit, remaining - 1, resetTimeMillis);
    }
}

```

> 📝 **Note:**  
> This example uses Lombok annotations (`@AllArgsConstructor`, `@Getter`, `@Builder`) to reduce boilerplate code.

---

## 5. Example Usage

---

```java
package com.theshubhamco.apiratelimiter.naive;

public class Application {
    public static void main(String[] args) {
        RateLimiter rateLimiter = new RateLimiter(5, 60);

        for (int i = 0; i < 10; i++) {
            System.out.println(rateLimiter.allowRequest("Client1"));
        }

        System.out.println(rateLimiter.allowRequest("Client2"));
    }
}
```

---

## 6. Code Walkthrough

---

### 1. Store rate-limit state per client

```java
private final Map<String, RequestLimit> requestLimits = new HashMap<>();
```

Each client gets its own rate-limit record.

Example:

```text
Client1 → remaining requests + reset time
Client2 → remaining requests + reset time
```

---

### 2. Validate configuration

```java
if (requestLimit <= 0) {
    throw new IllegalArgumentException("requestLimit must be greater than 0");
}
```

A limiter with zero or negative limit is invalid.

---

### 3. Validate client ID

```java
if (clientId == null || clientId.isBlank()) {
    throw new IllegalArgumentException("clientId must not be blank");
}
```

Rate limiting needs a valid identity key.

---

### 4. Create new window

```java
if (current == null || now >= current.getResetTimeMillis()) {
    requestLimits.put(clientId, createNewWindow(now));
    return true;
}
```

If no active window exists, or the existing window expired, start a new window.

---

### 5. Consume remaining quota

```java
if (current.getRemaining() > 0) {
    requestLimits.put(clientId, current.consumeOne());
    return true;
}
```

If quota is available, consume one request and allow.

---

### 6. Reject when limit exceeded

```java
return false;
```

At the API layer, this would become:

```text
HTTP 429 Too Many Requests
```

---

## 7. Complexity Analysis

---

### `allowRequest(clientId)`

```text
Time: O(1)
```

HashMap lookup and update are constant time on average.

---

### Space Complexity

```text
Space: O(number of active clients)
```

Each client needs one entry in the map.

---

## 8. Why This Is Naive

---

This solution is simple and works for a single-node system, but it has important limitations.

---

### Limitation 1 — Fixed Window Boundary Problem

A client can send requests at the end of one window and the start of the next window.

Example:

```text
Limit = 100 requests/minute

12:00:59 → 100 requests
12:01:00 → 100 requests
```

Result:

```text
200 requests in ~1 second
```

This violates the spirit of rate limiting.

---

### Limitation 2 — Memory Growth

The map can keep growing if many clients appear.

```text
new clientId → new map entry
```

Without cleanup, this can cause memory issues.

---

### Limitation 3 — Not Thread-Safe

This implementation uses:

```java
HashMap
```

and performs compound operations:

```text
read → check → update
```

Multiple threads can corrupt the state.

---

### Limitation 4 — Not Distributed

This works only inside one application instance.

If there are multiple servers:

```text
Server A has one counter
Server B has another counter
```

A client can bypass the limit by hitting different servers.

---

## 9. Interview Explanation

---

In an interview, you could explain it like this:

> “I would start with a simple in-memory map keyed by client ID. Each client record stores the remaining request count and reset time. When a request arrives, I check whether the window has expired. If expired, I reset the window; otherwise, I decrement the remaining count. This gives O(1) checks but has limitations like boundary bursts, memory growth, no thread safety, and no distributed coordination.”

---

## Conclusion

---

The naive approach gives us a simple working baseline.

It is useful because it introduces the core rate-limiting idea:

```text
client → request count → time window
```

But it is not good enough for production.

---

### 🔗 What’s Next?

👉 **[Fixed Window Counter →](/learning/advanced-skills/system-design-practice/intermediate-systems/3_api-rate-limiter/1_phase1/1_3_fixed-window-counter)**

---

> 📝 **Takeaway**:
>
> - Naive rate limiting can be built with a map and reset time
> - `allowRequest` is O(1) on average
> - Fixed windows can allow boundary bursts
> - The design is not thread-safe or distributed yet
