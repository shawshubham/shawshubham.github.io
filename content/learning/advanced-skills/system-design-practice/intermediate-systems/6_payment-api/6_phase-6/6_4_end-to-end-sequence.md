---
title: "End-to-End Sequence Diagrams"
description: "Visualize complete payment flows including success and retry scenarios using end-to-end sequence diagrams that tie together API design, idempotency, and processing logic."
keywords:
  - payment sequence diagram
  - system design payment flow diagram
  - idempotency sequence flow
  - retry flow payment api
weight: 4
layout: "topic-content"
---

## 1. Why Sequence Diagrams Matter

---

So far, we have explained each part of the system separately:

- Create flow
- Confirm flow
- Idempotency
- Failure handling

Now we connect everything together.

> 📝 **Key Insight:**  
> Sequence diagrams help visualize **how components interact over time**, especially in the presence of retries and failures.

---

## 2. Components in the Flow

---

All diagrams use the same core components:

- **Client**
- **Payment API**
- **Database (DB)**
- **Payment Gateway**

---

## 3. Happy Path (Successful Payment)

---

```mermaid
sequenceDiagram
    participant Client
    participant API as PaymentAPI
    participant DB
    participant GW as Gateway

    %% Create Payment
    Client->>API: POST /payments (Idempotency-Key: Kc)
    API->>API: Validate + hash
    API->>DB: Insert Idempotency(Kc, IN_PROGRESS)
    API->>DB: Create Payment (status=CREATED)
    API->>DB: Update Idempotency(Kc, COMPLETED + response)
    API-->>Client: 200 Created (paymentId)

    %% Confirm Payment
    Client->>API: POST /payments/{id}/confirm (Idempotency-Key: Kf)
    API->>API: Validate + hash
    API->>DB: Insert Idempotency(Kf, IN_PROGRESS)
    API->>DB: Fetch + Lock Payment
    API->>DB: Validate state (CREATED)
    API->>DB: Update Payment -> PROCESSING
    API->>GW: Execute Payment
    GW-->>API: Success
    API->>DB: Update Payment -> SUCCEEDED
    API->>DB: Update Idempotency(Kf, COMPLETED + response)
    API-->>Client: 200 OK (SUCCEEDED)
```

---

## 4. Retry Flow (Same Idempotency Key)

---

Client retries the **same confirm request** using the same idempotency key.

```mermaid
sequenceDiagram
    participant Client
    participant API as PaymentAPI
    participant DB

    %% First request
    Client->>API: Confirm (Kf)
    API->>DB: Insert Idempotency(Kf, IN_PROGRESS)
    Note right of API: Processing starts

    %% Retry arrives
    Client->>API: Confirm (Kf)
    API->>DB: Insert fails (exists)
    API->>DB: Fetch Idempotency(Kf)

    alt IN_PROGRESS
        API-->>Client: 409 / PROCESSING
    else COMPLETED
        API-->>Client: Return stored response
    end
```

👉 No duplicate execution happens.

---

## 5. Concurrent Confirm (Different Keys)

---

Two confirm requests arrive with **different idempotency keys**.

```mermaid
sequenceDiagram
    participant A as Request A
    participant B as Request B
    participant API
    participant DB

    A->>API: Confirm (K1)
    API->>DB: Insert Idempotency(K1, IN_PROGRESS)
    API->>DB: Lock Payment
    API->>DB: Update Payment -> PROCESSING

    B->>API: Confirm (K2)
    API->>DB: Insert Idempotency(K2, IN_PROGRESS)
    API->>DB: Try Lock Payment
    Note right of DB: Waits for lock

    API->>DB: A completes (SUCCEEDED)

    DB-->>API: Lock granted to B
    API->>DB: Read Payment status (SUCCEEDED)
    API-->>B: Return already processed response
```

👉 Idempotency does not stop B here — **locking + state validation does**.

---

## 6. Gateway Timeout + Retry

---

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB
    participant GW

    Client->>API: Confirm (Kf)
    API->>DB: Insert Idempotency(Kf, IN_PROGRESS)
    API->>DB: Lock Payment
    API->>DB: Update -> PROCESSING
    API->>GW: Execute Payment
    GW-->>API: Timeout

    API->>DB: Keep status PROCESSING
    API-->>Client: 202 / PROCESSING

    %% Retry
    Client->>API: Confirm (Kf)
    API->>DB: Fetch Idempotency(Kf)
    API-->>Client: PROCESSING or final (if completed later)
```

👉 This shows how **unknown state** is handled safely.

---

## 7. Key Learnings from Diagrams

---

### 1. Idempotency is the First Gate

- stops duplicate requests early

---

### 2. Payment Locking is the Second Gate

- prevents concurrent execution

---

### 3. State Machine Controls Valid Flow

- ensures correct transitions

---

### 4. Gateway is Unreliable

- must handle timeouts and retries

---

### 5. Different Problems, Different Solutions

| Problem              | Solution               |
| -------------------- | ---------------------- |
| Same request retry   | Idempotency            |
| Concurrent execution | Locking                |
| Invalid flow         | State validation       |
| Unknown result       | Retry + reconciliation |

---

## Conclusion

---

End-to-end diagrams bring together all aspects of the system:

- API design
- idempotency
- concurrency control
- failure handling

They provide a clear picture of how a payment flows through the system under both normal and failure conditions.

---

### 🔗 What’s Next?

👉 **[Service Layer Design →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/6_phase-6/6_5_service-layer-design)**

---

> 📝 **Takeaway**:
>
> - Sequence diagrams clarify system behavior under real conditions
> - Idempotency and locking work together to ensure correctness
> - Always design for retries, failures, and concurrency
