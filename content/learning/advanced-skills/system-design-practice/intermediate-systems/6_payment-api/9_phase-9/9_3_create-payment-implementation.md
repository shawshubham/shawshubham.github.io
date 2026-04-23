---
title: "Create Payment — Clean Implementation"
description: "Implement the create payment flow with idempotency, validation, and clean service orchestration using a layered architecture."
keywords:
  - create payment implementation
  - idempotency create api
  - spring service layer payment
  - backend clean code payments
weight: 3
layout: "topic-content"
---

## 1. Why This Article

---

We already designed the **create payment API** and discussed idempotency.

Now we implement it cleanly in code using:

- Controller → Service → Repository
- Idempotency as a first-class concern

> 🧠 Goal: **Translate the create flow into safe, readable, and production-ready code.**

---

## 2. What This Article Does NOT Repeat

---

We are NOT re-explaining:

- full API design
- domain model
- idempotency theory

👉 We focus on **how to implement the flow correctly**.

---

## 3. Create Payment Flow (Implementation View)

---

```text
1. Receive request + idempotency key
2. Check existing idempotency record
3. Reserve idempotency (IN_PROGRESS)
4. Validate request (input + business)
5. Create Payment entity
6. Persist payment
7. Complete idempotency (store response + paymentId)
8. Return response
```

---

## 4. Controller Layer

---

```java
@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<CreatePaymentResponse> createPayment(
            @RequestBody CreatePaymentRequest request,
            @RequestHeader("Idempotency-Key") String key) {

        return ResponseEntity.ok(paymentService.createPayment(request, key));
    }
}
```

👉 Controller only delegates — no business logic.

---

## 5. Service Layer (Core Logic)

---

```java
@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final IdempotencyService idempotencyService;
    private final PaymentMapper paymentMapper;

    @Transactional
    public CreatePaymentResponse createPayment(CreatePaymentRequest request, String key) {

        // 1. Check existing idempotency
        Optional<IdempotencyRecord> existing = idempotencyService.find(key, Operation.CREATE);

        if (existing.isPresent()) {
            return existing.get().getResponse(CreatePaymentResponse.class);
        }

        // 2. Reserve idempotency EARLY
        idempotencyService.reserve(key, Operation.CREATE, request);

        // 3. Validate request
        validate(request);

        // 4. Map DTO → Entity
        Payment payment = paymentMapper.toEntity(request);
        payment.setId(UUID.randomUUID());
        payment.setStatus(PaymentStatus.CREATED);

        // 5. Persist
        paymentRepository.save(payment);

        // 6. Build response
        CreatePaymentResponse response = new CreatePaymentResponse(payment.getId());

        // 7. Complete idempotency
        idempotencyService.complete(key, Operation.CREATE, payment.getId(), response);

        return response;
    }

    private void validate(CreatePaymentRequest request) {
        if (request.getAmount() == null || request.getAmount().signum() <= 0) {
            throw new IllegalArgumentException("Amount must be > 0");
        }
        if (request.getCurrency() == null) {
            throw new IllegalArgumentException("Currency is required");
        }
        if (request.getOrderId() == null || request.getOrderId().isBlank()) {
            throw new IllegalArgumentException("orderId is required");
        }
    }
}
```

---

## 6. Why Idempotency is Reserved Early

---

> ❗ **Critical rule:** Reserve idempotency BEFORE side effects

---

### ❌ Wrong

```text
validate → create payment → store idempotency
```

👉 Race condition possible

---

### ✅ Correct

```text
reserve idempotency → validate → create payment
```

👉 Ensures only one request proceeds

---

## 7. Idempotency Service (Simplified)

---

```java
@Service
public class IdempotencyService {

    private final IdempotencyRepository repository;

    public Optional<IdempotencyRecord> find(String key, Operation op) {
        return repository.findByKeyAndOperation(key, op);
    }

    public void reserve(String key, Operation op, Object request) {
        IdempotencyRecord record = new IdempotencyRecord(key, op, Status.IN_PROGRESS);
        repository.save(record); // unique constraint protects duplicates
    }

    public void complete(String key, Operation op, UUID resourceId, Object response) {
        IdempotencyRecord record = repository.findByKeyAndOperation(key, op)
                .orElseThrow();

        record.complete(resourceId, response);
        repository.save(record);
    }
}
```

---

## 8. Repository Layer

---

```java
@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByOrderId(String orderId);
}
```

👉 Used only for persistence — no business logic.

---

## 9. Mapping with MapStruct

---

```java
@Mapper(componentModel = "spring")
public interface PaymentMapper {

    Payment toEntity(CreatePaymentRequest request);
}
```

---

## 10. Transaction Boundary

---

- Entire create flow runs in a **single transaction**
- If anything fails → rollback
- Idempotency + payment stay consistent

---

## 11. Common Mistakes

---

### ❌ Late idempotency reservation

- causes duplicate creation

---

### ❌ Business logic in controller

- breaks layering

---

### ❌ Manual mapping everywhere

- leads to boilerplate

---

### ❌ Skipping validation

- invalid data enters system

---

## 12. Design Insight

---

> 🧠 **Create API is simpler than confirm, but still requires strict ordering of operations.**

---

## Conclusion

---

A clean create payment implementation:

- reserves idempotency early
- validates input
- persists safely
- returns consistent responses

---

### 🔗 What’s Next?

👉 **[Confirm Payment Implementation →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/9_phase-9/9_4_confirm-payment-implementation)**

---

> 📝 **Takeaway**:
>
> - Idempotency must be handled before side effects
> - Service layer controls the flow
> - Clean layering ensures maintainability
