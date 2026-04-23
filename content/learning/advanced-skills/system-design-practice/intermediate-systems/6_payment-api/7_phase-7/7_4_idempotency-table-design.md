---
title: "Idempotency Table Design"
description: "Design the idempotency table to safely handle retries, prevent duplicate processing, and support consistent request-response behavior in a payment system."
keywords:
  - idempotency table design
  - idempotency schema payments
  - retry safe api design
  - idempotency key storage
weight: 4
layout: "topic-content"
---

## 1. Why Idempotency Needs Persistence

---

In Phase 5, we discussed **idempotency as a concept**.

Now we make it concrete.

> ❗ Idempotency only works if it is **persisted reliably**.

Without a database-backed idempotency store:

- duplicate requests cannot be detected
- retries can cause duplicate execution
- system becomes unsafe under failure

---

## 2. Purpose of Idempotency Table

---

The idempotency table answers:

> ❓ _Have we already processed this exact request?_

It enables:

- safe retries
- duplicate prevention
- consistent responses

---

## 3. Core Schema (Recommended)

---

```text
IDEMPOTENCY_RECORDS
- idempotency_key (string)
- operation_type (string)
- request_hash (string)
- status (string)
- response_payload (json/text)
- resource_id (string)        -- e.g., payment_id
- created_at (timestamp)
- expires_at (timestamp)
```

---

## 4. Field-by-Field Explanation

---

### 1. `idempotency_key`

- unique key provided by client

---

### 2. `operation_type`

- identifies the API operation

Examples:

```text
CREATE_PAYMENT
CONFIRM_PAYMENT
```

👉 Prevents cross-operation conflicts

---

### 3. `request_hash`

- hash of request payload

👉 Used to detect incorrect key reuse

---

### 4. `status`

Represents processing state of the request.

```text
IN_PROGRESS
COMPLETED
```

---

### 5. `response_payload`

- stored API response

👉 Enables returning the same response for retries

---

### 6. `resource_id`

- reference to business entity

Example:

```text
payment_id
```

---

### 7. `created_at`

- when record was created

---

### 8. `expires_at`

- TTL for cleanup

---

## 5. Unique Constraint (Critical)

---

```text
UNIQUE(operation_type, idempotency_key)
```

---

### Why?

- ensures only one request can reserve a key
- prevents race conditions

---

## 6. Lifecycle of an Idempotency Record

---

### Step 1: Reservation

```text
status = IN_PROGRESS
```

- inserted before side effects

---

### Step 2: Processing

- business logic executes

---

### Step 3: Completion

```text
status = COMPLETED
response_payload = <response>
```

---

## 7. Flow Example

---

### First Request

```text
Insert key → IN_PROGRESS
Process request
Update → COMPLETED
```

---

### Retry Request

```text
Find key
If COMPLETED → return stored response
If IN_PROGRESS → return processing/409
```

---

## 8. Handling Edge Cases

---

### Case 1: Same Key, Same Request

- return stored response

---

### Case 2: Same Key, Different Request

- compare request hash
- reject if mismatch

---

### Case 3: Concurrent Requests

- only one insert succeeds
- others detect existing record

---

### Case 4: System Crash

- record remains in DB
- allows safe recovery/retry

---

## 9. Indexing Strategy

---

### Required

```text
INDEX(operation_type, idempotency_key)
```

---

### Optional

```text
INDEX(resource_id)
```

---

### Why?

- fast idempotency lookup
- linking to payment

---

## 10. Storage Considerations

---

### Full Response vs Partial Storage

#### Option 1: Store full response

**Pros**

- exact replay

**Cons**

- higher storage cost

---

#### Option 2: Store minimal data

**Pros**

- lightweight

**Cons**

- need to rebuild response

---

👉 Recommended: store essential response fields

---

## 11. TTL & Cleanup

---

- idempotency records are temporary
- use `expires_at` for cleanup

Typical TTL:

```text
24–48 hours
```

---

## 12. How This Supports System Design

---

### Phase 5 — Idempotency

- core implementation layer

---

### Phase 6 — Processing Flow

- first gate in request handling

---

### Phase 7 — Persistence

- ensures durable retry protection

---

## Conclusion

---

The idempotency table is critical for:

- safe retries
- duplicate prevention
- consistent API behavior

It acts as the **first line of defense** in request processing.

---

### 🔗 What’s Next?

👉 **[Relationships Between Tables →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/7_phase-7/7_5_relationships-between-tables)**

---

> 📝 **Takeaway**:
>
> - Idempotency requires persistent storage
> - Unique constraints prevent race conditions
> - IN_PROGRESS → COMPLETED lifecycle ensures safe execution
