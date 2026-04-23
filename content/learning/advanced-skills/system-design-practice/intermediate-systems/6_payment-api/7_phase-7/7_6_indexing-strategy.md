---
title: "Indexing Strategy"
description: "Design an effective indexing strategy for payments, payment attempts, and idempotency tables to ensure low-latency queries, scalability, and correctness in a payment system."
keywords:
  - database indexing payments
  - indexing strategy system design
  - payment api performance indexing
  - sql index design payments
weight: 6
layout: "topic-content"
---

## 1. Why Indexing Matters

---

In a payment system, most operations are **read-heavy and latency-sensitive**.

Examples:

- fetching payment status
- checking idempotency keys
- retrieving payment attempts

> 📝 **Key Insight:**  
> Without proper indexing, even a correct system can become **slow and unusable at scale**.

---

## 2. How to Think About Indexing

---

Indexing should always be driven by **query patterns**, not guesswork.

Ask:

- What queries are most frequent?
- Which fields are used in `WHERE`, `JOIN`, or `ORDER BY`?

👉 Index those fields.

---

## 3. Payments Table Indexing

---

### Primary Index

```text
PRIMARY KEY (id)
```

Used for:

```sql
SELECT * FROM payments WHERE id = ?;
```

---

### Index on `order_id`

```text
INDEX(order_id)
```

Used for:

- finding payment for an order
- enforcing business constraints

---

### Index on `status`

```text
INDEX(status)
```

Used for:

- filtering active payments
- operational monitoring

---

### Optional Composite Index

```text
INDEX(order_id, status)
```

Useful for:

```sql
SELECT * FROM payments
WHERE order_id = ? AND status IN ('CREATED', 'PROCESSING');
```

---

## 4. Payment Attempts Table Indexing

---

### Index on `payment_id`

```text
INDEX(payment_id)
```

Used for:

```sql
SELECT * FROM payment_attempts
WHERE payment_id = ?;
```

---

### Index on `gateway_reference`

```text
INDEX(gateway_reference)
```

Used for:

- reconciliation with gateway

---

### Optional Composite Index

```text
INDEX(payment_id, created_at)
```

Used for:

- fetching attempts in order

---

## 5. Idempotency Table Indexing

---

### Unique Composite Index (Critical)

```text
UNIQUE(operation_type, idempotency_key)
```

Used for:

```sql
SELECT * FROM idempotency_records
WHERE operation_type = ? AND idempotency_key = ?;
```

---

### Index on `resource_id`

```text
INDEX(resource_id)
```

Used for:

- linking idempotency records to payments

---

### Index on `expires_at`

```text
INDEX(expires_at)
```

Used for:

- cleanup jobs (TTL deletion)

---

## 6. Read vs Write Trade-off

---

Indexes improve reads but slow down writes.

### Why?

Every insert/update must also update indexes.

---

### In Payment Systems

- reads are frequent → need indexes
- writes are critical → keep indexes minimal

👉 Balance is important.

---

## 7. Common Query Patterns and Index Mapping

---

| Query                 | Index                                   |
| --------------------- | --------------------------------------- |
| Fetch payment by ID   | PRIMARY KEY (id)                        |
| Find payment by order | INDEX(order_id)                         |
| Check active payment  | INDEX(order_id, status)                 |
| Fetch attempts        | INDEX(payment_id)                       |
| Reconciliation        | INDEX(gateway_reference)                |
| Idempotency check     | UNIQUE(operation_type, idempotency_key) |

---

## 8. Advanced Considerations

---

### 1. Hot Keys (Idempotency)

- same idempotency key accessed frequently

👉 Use caching carefully (optional optimization)

---

### 2. Partitioning (Future Scale)

- large tables may need partitioning

Example:

```text
Partition by created_at
```

---

### 3. Covering Indexes

- include frequently selected fields in index

👉 reduces table lookups

---

## 9. Common Mistakes to Avoid

---

### ❌ Indexing everything

- increases write cost
- wastes memory

---

### ❌ Missing idempotency index

- leads to duplicate processing

---

### ❌ Wrong column order in composite index

```text
INDEX(status, order_id) ❌
INDEX(order_id, status) ✅
```

---

### ❌ Ignoring real query patterns

- leads to ineffective indexes

---

## Conclusion

---

Indexing ensures that your system is:

- fast
- scalable
- efficient

It directly impacts performance and user experience.

---

### 🔗 What’s Next?

👉 **[Consistency & Transactions →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/7_phase-7/7_7_consistency-and-transactions)**

---

> 📝 **Takeaway**:
>
> - Indexes should be driven by query patterns
> - Composite indexes are powerful when used correctly
> - Balance read performance with write cost
> - Proper indexing is essential for scalability
