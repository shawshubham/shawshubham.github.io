---
title: "Data Retention & Cleanup"
description: "Manage data lifecycle in payment systems with retention policies, TTLs, archival, and cleanup jobs to control storage growth and meet compliance requirements."
keywords:
  - data retention backend
  - ttl cleanup jobs
  - archival strategy payments
  - log retention policy
weight: 7
layout: "topic-content"
---

## 1. Why Data Retention Matters

---

Production systems generate data continuously:

- payments
- idempotency records
- audit logs
- metrics and traces

> ❗ **If data is never cleaned up, systems become slower, more expensive, and harder to operate.**

---

## 2. What This Article Focuses On

---

We focus on:

- defining retention policies
- cleaning up short-lived data
- archiving long-term data
- keeping the system performant and compliant

---

## 3. Types of Data in Our System

---

### 1. Core Transactional Data

- payments
- payment attempts

👉 Usually retained long-term

---

### 2. Operational Data

- idempotency records
- temporary states

👉 Short-lived

---

### 3. Observability Data

- logs
- metrics
- traces

👉 Retention depends on debugging needs and cost

---

## 4. Core Principle

---

> 🧠 **Different data has different lifetimes — treat it accordingly.**

---

Do NOT apply a single retention rule to everything.

---

## 5. Idempotency Data Cleanup

---

Idempotency records are temporary by nature.

---

### Why clean them?

- prevent table bloat
- reduce lookup cost

---

### Strategy

```text
TTL = 24–72 hours (example)
```

---

### Implementation

- `expiresAt` column
- periodic cleanup job

---

### Example Query

```sql
DELETE FROM idempotency_keys
WHERE expires_at < now()
LIMIT 1000;
```

---

👉 Use batch deletes to avoid load spikes.

---

## 6. Logs Retention

---

Logs grow extremely fast.

---

### Strategy

- keep recent logs (e.g., 7–30 days)
- archive older logs
- delete after retention window

---

### Trade-off

```text
More logs → better debugging
Less logs → lower cost
```

---

👉 Balance based on system needs.

---

## 7. Metrics & Traces Retention

---

### Metrics

- keep aggregates longer

---

### Traces

- short retention (e.g., hours to days)

---

👉 High-cardinality data should have shorter retention.

---

## 8. Archival Strategy

---

Instead of deleting important data:

```text
Hot Storage → Archive Storage
```

---

### Example

- move old payments to cold storage (S3, blob storage)
- compress and store

---

👉 Keeps primary DB fast while preserving history.

---

## 9. Soft Delete vs Hard Delete

---

### Soft Delete

```text
deleted = true
```

---

### Hard Delete

```text
row removed permanently
```

---

### Recommendation

- soft delete for critical data
- hard delete for temporary data

---

## 10. Data Retention Policies

---

Define clear policies per data type.

---

### Example

```text
Idempotency → 48 hours
Logs → 14 days
Traces → 3 days
Payments → long-term / archived
```

---

👉 Make policies explicit and configurable.

---

## 11. Cleanup Job Design

---

Cleanup jobs should:

- run periodically
- process in batches
- avoid locking large tables

---

### Example

```text
Run every 10 minutes
Delete 1000 expired records
```

---

👉 Similar to reconciliation jobs.

---

## 12. Indexing for Cleanup

---

Ensure queries are efficient:

```sql
CREATE INDEX idx_expiry
ON idempotency_keys (expires_at);
```

---

👉 Prevent full table scans.

---

## 13. Compliance Considerations (High-Level)

---

- do not retain sensitive data longer than necessary
- ensure deletion policies exist
- support audit requirements where needed

---

👉 Especially important for payment systems.

---

## 14. Common Mistakes

---

### ❌ No cleanup strategy

- unbounded data growth

---

### ❌ Deleting everything aggressively

- loss of debugging/audit capability

---

### ❌ Large batch deletes

- DB performance impact

---

### ❌ No indexing on cleanup fields

- slow queries

---

## 15. Design Insight

---

> 🧠 **Data lifecycle management is as important as data design.**

---

A production system must manage:

- creation
- usage
- archival
- deletion

---

## Conclusion

---

Data retention and cleanup ensure that the system:

- remains performant over time
- controls storage costs
- complies with data policies

---

### 🔗 What’s Next?

👉 **[API Versioning & Backward Compatibility →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/11_phase-11/11_8_api-versioning-and-backward-compatibility)**

---

> 📝 **Takeaway**:
>
> - Define retention policies per data type
> - Use TTL and batch cleanup jobs
> - Archive important data instead of deleting
> - Keep cleanup efficient and safe
