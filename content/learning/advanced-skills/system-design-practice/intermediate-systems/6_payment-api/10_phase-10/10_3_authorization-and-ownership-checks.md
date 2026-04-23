---
title: "Authorization & Ownership Checks"
description: "Enforce who can access and operate on which payments using role-based and resource-level authorization in a payment API."
keywords:
  - authorization backend api
  - ownership checks payments
  - rbac vs abac
  - resource level authorization
weight: 3
layout: "topic-content"
---

## 1. Why Authorization Matters

---

After authentication answers **who the caller is**, we must answer:

> ❗ **What is this caller allowed to do on this resource?**

In payment systems, this is critical because:

- users must not access others’ payments
- merchants must be isolated (multi-tenant safety)
- sensitive operations (confirm/refund) must be restricted

---

## 2. What This Article Focuses On

---

We are NOT re-explaining:

- authentication
- business flows

👉 This article focuses on:

- enforcing access rules
- implementing ownership checks
- placing authorization correctly in the backend

---

## 3. Types of Authorization

---

### 1. Role-Based Access Control (RBAC)

```text
Role → Permissions
```

Examples:

- MERCHANT_ADMIN → create, confirm payments
- SUPPORT → read-only access

---

### 2. Resource-Level Authorization (Ownership)

```text
User/Merchant → Resource (Payment)
```

Examples:

- user can access only their own payment
- merchant can access only their own orders

---

👉 In payment systems, **ownership checks are mandatory**.

---

## 4. Where Authorization Fits in Flow

---

```text
Request
  → Authentication
  → Authorization
  → Idempotency
  → Business Logic
```

---

👉 Authorization must happen **before state-changing operations**.

---

## 5. Example: Confirm Payment

---

```text
User tries to confirm payment P1

Check:
- Does user belong to merchant M1?
- Does payment P1 belong to merchant M1?
```

---

👉 If mismatch → reject request

---

## 6. Authorization Context (From JWT)

---

After authentication, we typically have:

```text
userId = U123
merchantId = M456
roles = [MERCHANT_ADMIN]
```

---

👉 This context drives authorization decisions.

---

## 7. Implementing Ownership Check

---

### Service Layer Example

```java
public Payment getAuthorizedPayment(UUID paymentId, AuthContext auth) {

    Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

    if (!payment.getMerchantId().equals(auth.getMerchantId())) {
        throw new AuthorizationException("Access denied");
    }

    return payment;
}
```

---

👉 This ensures only the correct tenant can access the resource.

---

## 8. Role-Based Checks Example

---

```java
public void validateRole(AuthContext auth) {

    if (!auth.getRoles().contains("MERCHANT_ADMIN")) {
        throw new AuthorizationException("Insufficient permissions");
    }
}
```

---

👉 Combine role + ownership checks for stronger control.

---

## 9. Where to Place Authorization Logic

---

### ❌ Bad

- Controller layer (too early, lacks context)
- Repository layer (mixes concerns)

---

### ✅ Good

- Service layer (has full context)

---

👉 Service layer is the **right boundary for authorization**.

---

## 10. Multi-Tenant Safety (Critical)

---

Payment systems are typically multi-tenant.

---

### Rule

```text
Tenant A must NEVER access Tenant B data
```

---

### Enforce using

- merchantId in JWT
- merchantId in Payment entity
- strict equality checks

---

## 11. Defensive Query Design (Optional Enhancement)

---

Instead of fetching then checking:

```java
findById(paymentId)
```

You can enforce at DB level:

```java
Optional<Payment> findByIdAndMerchantId(UUID id, String merchantId);
```

---

👉 Adds an extra layer of protection.

---

## 12. Common Mistakes

---

### ❌ Only role-based checks

- ignores ownership → security gap

---

### ❌ Missing tenant validation

- cross-tenant data leak

---

### ❌ Authorization after processing

- too late → system already affected

---

### ❌ Hardcoding roles everywhere

- poor maintainability

---

## 13. Design Insight

---

> 🧠 **Authorization is not optional validation — it is core business logic.**

---

For payment systems:

- ownership checks are mandatory
- role checks are supplementary

---

## Conclusion

---

A robust authorization design:

- ensures users access only allowed resources
- prevents cross-tenant data leaks
- protects critical operations

---

### 🔗 What’s Next?

👉 **[Idempotency Abuse & Security →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/10_phase-10/10_4_idempotency-abuse-and-security)**

---

> 📝 **Takeaway**:
>
> - Authorization answers “what can you do?”
> - Always enforce ownership checks
> - Place authorization in service layer
> - Combine role-based and resource-level checks for safety
