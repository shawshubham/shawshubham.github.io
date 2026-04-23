---
title: "Idempotency Handling in Code"
description: "Implement idempotency as a first-class component in backend systems, including request deduplication, state tracking, and safe retries."
keywords:
  - idempotency implementation
  - idempotency table design
  - safe retries backend
  - payment api idempotency code
weight: 5
layout: "topic-content"
---

## 1. Why This Article

---

In previous articles, we used idempotency in both:

- Create Payment
- Confirm Payment

Now we formalize it as a **reusable backend component**.

> 🧠 Goal: Design idempotency handling as a **first-class system feature**, not scattered logic.

---

## 2. What This Article Does NOT Repeat

---

We already covered:

- why idempotency is needed
- where to use it

👉 This article focuses on:

- how to implement idempotency cleanly in code
- how to structure the idempotency service and model

---

## 3. Core Responsibilities of Idempotency Layer

---

An idempotency component must handle:

1. request deduplication
2. in-progress tracking
3. response caching
4. safe retries

---

## 4. Idempotency Record Model

---

```java
@Entity
public class IdempotencyRecord {

    @Id
    private String key;

    private String operation; // CREATE / CONFIRM

    private String requestHash;

    @Enumerated(EnumType.STRING)
    private Status status; // IN_PROGRESS / COMPLETED

    private UUID resourceId; // paymentId

    @Lob
    private String responsePayload;

    private Instant createdAt;
    private Instant updatedAt;
}
```

---

## 5. Status Lifecycle

---

```text
IN_PROGRESS → COMPLETED
```

---

### Meaning

- **IN_PROGRESS** → request is being processed
- **COMPLETED** → final response is available

---

## 6. Idempotency Flow

---

```text
1. Request arrives with key
2. Lookup record
3. If exists:
   - COMPLETED → return stored response
   - IN_PROGRESS → return "processing"
4. If not exists:
   - insert IN_PROGRESS record
   - process request
   - store response
```

---

## 7. Idempotency Service (Detailed)

---

```java
@Service
public class IdempotencyService {

    private final IdempotencyRepository repository;

    public Optional<IdempotencyRecord> find(String key, Operation operation) {
        return repository.findByKeyAndOperation(key, operation);
    }

    public void reserve(String key, Operation operation, Object request) {

        IdempotencyRecord record = new IdempotencyRecord();
        record.setKey(key);
        record.setOperation(operation.name());
        record.setStatus(Status.IN_PROGRESS);
        record.setRequestHash(hash(request));
        record.setCreatedAt(Instant.now());

        try {
            repository.save(record);
        } catch (DataIntegrityViolationException ex) {
            // another request already reserved
            throw new DuplicateRequestException();
        }
    }

    public void complete(String key, Operation operation, UUID resourceId, Object response) {

        IdempotencyRecord record = repository.findByKeyAndOperation(key, operation)
                .orElseThrow();

        record.setStatus(Status.COMPLETED);
        record.setResourceId(resourceId);
        record.setResponsePayload(serialize(response));
        record.setUpdatedAt(Instant.now());

        repository.save(record);
    }

    private String hash(Object request) {
        return request.toString(); // simplified
    }

    private String serialize(Object response) {
        return response.toString(); // simplified
    }
}
```

---

## 8. Handling Duplicate Requests

---

### Case 1 — COMPLETED

```text
Return stored response
```

---

### Case 2 — IN_PROGRESS

```text
Return 409 or "Processing"
```

---

👉 Prevents duplicate execution

---

## 9. Request Hash Validation (Important)

---

Same key should represent same request.

---

### Problem

```text
Same key, different payload
```

---

### Fix

```java
if (!existing.getRequestHash().equals(hash(request))) {
    throw new IllegalStateException("Request mismatch for same idempotency key");
}
```

---

## 10. DB Constraint (Critical)

---

Ensure uniqueness:

```sql
UNIQUE (key, operation)
```

---

👉 This guarantees only one reservation succeeds.

---

## 11. Response Storage

---

Why store response?

- allows replay of exact response
- ensures consistency across retries

---

## 12. Retry Safety

---

Idempotency ensures:

```text
Retry → same result → no duplicate execution
```

---

## 13. Common Mistakes

---

### ❌ No request hash check

- allows misuse of key

---

### ❌ Late reservation

- race conditions

---

### ❌ Not storing response

- inconsistent retries

---

### ❌ Ignoring IN_PROGRESS

- concurrent execution risk

---

## 14. Design Insight

---

> 🧠 **Idempotency is not just a check — it is a state machine for request processing.**

---

## Conclusion

---

A robust idempotency implementation:

- prevents duplicate execution
- ensures safe retries
- maintains consistent responses

---

### 🔗 What’s Next?

👉 **[Exception Handling & Error Design →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/9_phase-9/9_6_exception-handling)**

---

> 📝 **Takeaway**:
>
> - Idempotency must be centralized
> - Use DB constraints for safety
> - Track request state explicitly
> - Store responses for consistent retries
