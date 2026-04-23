---
title: "Confirm Payment — Clean Implementation"
description: "Implement the confirm payment flow with concurrency control, locking, idempotency, and safe interaction with external gateways."
keywords:
  - confirm payment implementation
  - select for update spring
  - idempotency confirm api
  - concurrency payment backend
weight: 4
layout: "topic-content"
---

## 1. Why This Article

---

The **confirm payment API** is the most critical part of the system.

Unlike create:

- it interacts with external gateway
- it involves concurrency risks
- it must prevent double execution

> 🧠 Goal: Implement confirm flow **safely under concurrency and failures**.

---

## 2. What This Article Does NOT Repeat

---

We already covered:

- idempotency concepts
- locking strategies
- state transitions

👉 This article focuses on **how to implement them together in code**.

---

## 3. Confirm Flow (Implementation View)

---

```text
1. Receive request + idempotency key
2. Check existing idempotency record
3. Reserve idempotency (IN_PROGRESS)
4. Start transaction
5. Lock payment row (SELECT FOR UPDATE)
6. Validate state
7. Move to PROCESSING
8. Commit (release lock)

9. Call external gateway

10. Start new transaction
11. Update final state (SUCCEEDED / FAILED)
12. Complete idempotency
13. Return response
```

---

## 4. Controller Layer

---

```java
@PostMapping("/{paymentId}/confirm")
public ResponseEntity<ConfirmPaymentResponse> confirmPayment(
        @PathVariable UUID paymentId,
        @RequestHeader("Idempotency-Key") String key) {

    return ResponseEntity.ok(paymentService.confirmPayment(paymentId, key));
}
```

---

## 5. Service Layer — Step 1 (Idempotency)

---

```java
public ConfirmPaymentResponse confirmPayment(UUID paymentId, String key) {

    Optional<IdempotencyRecord> existing = idempotencyService.find(key, Operation.CONFIRM);

    if (existing.isPresent()) {
        return existing.get().getResponse(ConfirmPaymentResponse.class);
    }

    idempotencyService.reserve(key, Operation.CONFIRM, paymentId);

    return processConfirm(paymentId, key);
}
```

---

## 6. Service Layer — Step 2 (Lock + Validate + Move to PROCESSING)

---

```java
@Transactional
public void prepareForProcessing(UUID paymentId) {

    Payment payment = paymentRepository.findByIdForUpdate(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

    if (payment.getStatus() == PaymentStatus.SUCCEEDED) {
        return; // already processed
    }

    if (payment.getStatus() != PaymentStatus.CREATED) {
        throw new IllegalStateException("Invalid state for confirm");
    }

    payment.setStatus(PaymentStatus.PROCESSING);
    paymentRepository.save(payment);
}
```

👉 Lock ensures only one request reaches PROCESSING.

---

## 7. Repository with Lock

---

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT p FROM Payment p WHERE p.id = :id")
Optional<Payment> findByIdForUpdate(@Param("id") UUID id);
```

---

## 8. Service Layer — Step 3 (External Call)

---

```java
public GatewayResponse callGateway(Payment payment) {
    return paymentGatewayClient.charge(payment);
}
```

👉 No transaction here → avoids long locks.

---

## 9. Service Layer — Step 4 (Final State Update)

---

```java
@Transactional
public ConfirmPaymentResponse finalizePayment(UUID paymentId, String key, GatewayResponse gwResponse) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow();

    if (payment.getStatus() == PaymentStatus.SUCCEEDED) {
        return new ConfirmPaymentResponse(paymentId, "SUCCESS");
    }

    if (gwResponse.isSuccess()) {
        payment.setStatus(PaymentStatus.SUCCEEDED);
    } else {
        payment.setStatus(PaymentStatus.FAILED);
    }

    paymentRepository.save(payment);

    ConfirmPaymentResponse response = new ConfirmPaymentResponse(paymentId, payment.getStatus().name());

    idempotencyService.complete(key, Operation.CONFIRM, paymentId, response);

    return response;
}
```

---

## 10. Orchestrating the Flow

---

```java
public ConfirmPaymentResponse processConfirm(UUID paymentId, String key) {

    // Step 1: Prepare
    prepareForProcessing(paymentId);

    // Step 2: Fetch updated state
    Payment payment = paymentRepository.findById(paymentId).orElseThrow();

    // Step 3: Call gateway
    GatewayResponse gwResponse = callGateway(payment);

    // Step 4: Finalize
    return finalizePayment(paymentId, key, gwResponse);
}
```

---

## 11. Why Two Transactions?

---

### ❌ Bad (single long transaction)

```text
Lock → Gateway call → Commit
```

👉 blocks system

---

### ✅ Correct

```text
Tx1: Lock + update → PROCESSING → commit
Gateway call (no lock)
Tx2: Update final state
```

---

## 12. Common Mistakes

---

### ❌ No locking

- leads to double execution

---

### ❌ Lock during gateway call

- blocks threads

---

### ❌ No state validation

- invalid transitions

---

### ❌ No idempotency

- duplicate execution

---

## 13. Design Insight

---

> 🧠 **Confirm API is where correctness matters most — every safeguard must be applied together.**

---

## Conclusion

---

A safe confirm implementation:

- uses idempotency early
- locks before state change
- avoids long transactions
- ensures correct final state

---

### 🔗 What’s Next?

👉 **[Idempotency Handling in Code →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/9_phase-9/9_5_idempotency-handling)**

---

> 📝 **Takeaway**:
>
> - Lock before execution
> - Keep transactions short
> - Separate gateway calls from DB locks
> - Combine idempotency + locking + state validation
