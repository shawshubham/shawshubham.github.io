---
title: "API Versioning & Backward Compatibility"
description: "Evolve payment APIs safely using versioning strategies, backward-compatible changes, and deprecation policies to avoid breaking clients."
keywords:
  - api versioning strategies
  - backward compatibility api
  - schema evolution backend
  - payment api evolution
weight: 8
layout: "topic-content"
---

## 1. Why Versioning Matters

---

APIs evolve over time:

- new fields are added
- business rules change
- response formats evolve

> ❗ **If changes break existing clients, your system becomes unreliable in production.**

---

## 2. What This Article Focuses On

---

We focus on:

- how to evolve APIs safely
- how to avoid breaking existing clients
- practical versioning strategies

---

## 3. Backward Compatibility — Core Idea

---

> 🧠 **New changes must not break existing consumers.**

---

### Safe Changes

- adding new optional fields
- adding new endpoints

---

### Breaking Changes

- removing fields
- changing field types
- changing response structure

---

👉 Avoid breaking changes whenever possible.

---

## 4. Versioning Strategies

---

### 1. URL Versioning

```text
/v1/payments
/v2/payments
```

---

### Pros

- simple and explicit

---

### Cons

- version spread across endpoints

---

### 2. Header Versioning

```http
Accept: application/vnd.payment.v1+json
```

---

### Pros

- cleaner URLs

---

### Cons

- harder to debug

---

### 3. Query Param Versioning

```text
/payments?version=1
```

---

👉 Less common in modern systems.

---

## 5. Recommended Approach

---

For most backend APIs:

👉 **Use URL versioning** for simplicity and clarity

---

Example:

```text
/api/v1/payments
/api/v2/payments
```

---

## 6. Schema Evolution Rules

---

### Adding Fields

```json
{
  "paymentId": "123",
  "status": "SUCCESS",
  "newField": "optional"
}
```

---

👉 Safe if optional

---

### Removing Fields

❌ Breaking change

---

### Changing Field Type

```text
amount: string → number
```

❌ Breaking change

---

### Renaming Fields

❌ Breaking change

---

## 7. Consumer Tolerance Principle

---

> 🧠 **Clients should ignore fields they don’t understand.**

---

This allows:

- adding fields safely

---

## 8. Versioning in Our Payment API

---

Example:

```text
v1 → basic payment response
v2 → includes additional metadata
```

---

👉 Both versions can coexist.

---

## 9. Deprecation Strategy

---

When introducing new versions:

- keep old version active for some time
- communicate deprecation timeline
- provide migration path

---

Example:

```text
v1 deprecated → sunset in 6 months
```

---

## 10. Versioning Internal vs External APIs

---

### External APIs

- must be stable
- require strict backward compatibility

---

### Internal APIs

- more flexibility
- can evolve faster

---

👉 Still avoid breaking changes when possible.

---

## 11. Database Schema Evolution

---

Backend changes must align with DB changes.

---

### Safe DB Changes

- adding nullable columns

---

### Risky Changes

- dropping columns
- changing column types

---

👉 Use migration strategies carefully.

---

## 12. Versioning & Feature Flags

---

Instead of versioning everything:

- use feature flags to control rollout

---

Example:

```text
New logic enabled only for selected users
```

---

👉 Reduces need for frequent versioning.

---

## 13. Common Mistakes

---

### ❌ Breaking changes without versioning

- client failures

---

### ❌ Removing fields abruptly

- backward incompatibility

---

### ❌ No deprecation plan

- chaos for clients

---

### ❌ Over-versioning

- unnecessary complexity

---

## 14. Design Insight

---

> 🧠 **APIs are contracts — once published, they must be honored.**

---

A good system:

- evolves safely
- communicates changes clearly
- avoids breaking clients

---

## Conclusion

---

API versioning ensures that:

- systems evolve without breaking consumers
- new features can be introduced safely
- clients have time to migrate

---

### 🔗 What’s Next?

👉 **[Feature Flags & Safe Rollouts →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/11_phase-11/11_9_feature-flags-and-rollouts)**

---

> 📝 **Takeaway**:
>
> - Avoid breaking changes whenever possible
> - Use versioning only when necessary
> - Prefer additive changes
> - Treat APIs as long-term contracts
