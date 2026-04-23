---
title: "Concurrent Confirm Requests"
description: "Understand how to handle concurrent confirm requests safely using idempotency, locking, and state validation to prevent duplicate payment execution."
keywords:
  - concurrent requests payments
  - double execution prevention
  - payment confirm race condition
  - idempotency vs locking
weight: 2
layout: "topic-content"
---

## 1. Why This Problem Matters

---

In real systems, multiple confirm requests can arrive for the same payment:

- user double clicks
- client retries due to timeout
- network duplication

> ❗ If not handled properly, this can lead to **double charging**.

---

## 2. What We Are NOT Repeating

---

We already covered:

- confirm flow
- idempotency basics
- payment states

👉 This article focuses only on **what happens when requests collide**.

---

## 3. Scenario Setup

---

Assume:

```text
payment.status = CREATED
```

Two requests arrive:

```text
Request A
Request B
```

---

## 4. Case 1 — Same Idempotency Key

---

### Flow

```mermaid
sequenceDiagram
    participant A as Request A
    participant B as Request B
    participant API
    participant DB

    A->>API: Confirm (Key K)
    API->>DB: Insert Idempotency(K, IN_PROGRESS)

    B->>API: Confirm (Key K)
    API->>DB: Insert fails (duplicate key)
    API->>DB: Fetch Idempotency(K)

    alt IN_PROGRESS
        API-->>B: Return 409 / PROCESSING
    else COMPLETED
        API-->>B: Return stored response
    end
```

---

### Key Behavior

- only **one request (A)** proceeds
- B is stopped at idempotency layer
- no need to read or lock payment for B

---

> 📝 **Insight:**  
> Idempotency alone is sufficient for **same-key duplicates**.

---

## 5. Case 2 — Different Idempotency Keys

---

Now both requests use different keys:

```text
A → Key K1
B → Key K2
```

---

### Flow

```mermaid
sequenceDiagram
    participant A
    participant B
    participant API
    participant DB

    A->>API: Confirm (K1)
    API->>DB: Insert Idempotency(K1)
    API->>DB: Lock Payment
    API->>DB: Update → PROCESSING

    B->>API: Confirm (K2)
    API->>DB: Insert Idempotency(K2)
    API->>DB: Try Lock Payment
    Note right of DB: waits for lock

    A->>DB: Complete → SUCCEEDED

    DB-->>B: Lock acquired
    B->>DB: Read status = SUCCEEDED
    B-->>Client: Return already processed
```

---

### Key Behavior

- idempotency does NOT stop B
- locking ensures only one execution
- state validation prevents duplicate processing

---

> 📝 **Insight:**  
> For different keys, **locking + state validation** become critical.

---

## 6. Layered Protection Model

---

Concurrency is handled using multiple layers:

### Layer 1: Idempotency

- blocks same-key duplicates

---

### Layer 2: Locking

- ensures only one thread processes payment

---

### Layer 3: State Validation

- prevents invalid transitions

---

### Layer 4: Gateway Safety (Optional)

- gateway-level idempotency

---

## 7. Decision Matrix

---

| Scenario                 | Protection                   |
| ------------------------ | ---------------------------- |
| Same key retry           | Idempotency                  |
| Different key concurrent | Locking + State validation   |
| Unknown state retry      | Idempotency + Reconciliation |

---

## 8. Common Mistakes

---

### ❌ Only relying on idempotency

- fails for different keys

---

### ❌ No locking

- allows parallel execution

---

### ❌ No state validation

- allows invalid transitions

---

### ❌ Late idempotency reservation

- race condition risk

---

## Conclusion

---

Handling concurrent confirm requests requires **layered protection**:

- idempotency for request safety
- locking for execution safety
- state validation for correctness

---

### 🔗 What’s Next?

👉 **[Locking Strategies →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/8_phase-8/8_3_locking-strategies)**

---

> 📝 **Takeaway**:
>
> - Idempotency alone is not enough
> - Concurrency must be handled at multiple layers
> - Correct systems prevent double execution even under race conditions
