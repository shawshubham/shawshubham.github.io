---
title: "Law Of Demeter (LoD) - Minimizing Object Dependencies"
description: "Learn the Law of Demeter (LoD) — a core principle to reduce object coupling and improve code maintainability by avoiding deep object navigation."
keywords:
  - low level design
  - law of demeter
  - lod principle
  - software design principles
  - object-oriented programming
  - train wreck code
  - clean code
  - clean architecture
  - faang interview preparation
weight: 6
date: 2025-12-06
layout: "topic-content"
---

## 1. What is the Law of Demeter (LoD)?

---

The **Law of Demeter (LoD)** — also known as the **Principle of Least Knowledge** — states that:

> “A class should only talk to its immediate friends and not to strangers.”

In simpler terms: **avoid chaining too many method calls** across different objects. Each object should delegate work, not dig into the internal structure of others.

## 2. Why is LoD Important?

---

- ✅ **Reduces Tight Coupling**  
  Less dependency on other objects’ internal structure.

- ✅ **Improves Encapsulation**  
  Promotes well-defined APIs and cleaner responsibilities.

- ✅ **Boosts Maintainability**  
  Easier to refactor or replace individual components.

- ✅ **Enhances Readability**  
  Avoids complex "train-wreck" method chains.

## 3. Violating LoD ❌

---

### 🔴 Example: “Train Wreck” Code (Deep Object Traversal)

```java
class OrderProcessor {
    public void processOrder(Order order) {
        String email = order.getCustomer().getContactInfo().getEmail();
        sendConfirmationEmail(email);
    }
}
```

### ❌ What’s wrong?

- OrderProcessor depends on Order → Customer → ContactInfo → Email
- Too many layers of knowledge — fragile and tightly coupled
- A small change in internal structure (e.g., renaming ContactInfo) breaks this code

## 4. Applying LoD

---

### ✅ Refactored Code with LoD Principle

```java
class OrderProcessor {
    public void processOrder(Order order) {
        String email = order.getCustomerEmail();
        sendConfirmationEmail(email);
    }
}

class Order {
    private Customer customer;

    public String getCustomerEmail() {
        return customer.getEmail(); // Internally handles traversal
    }
}
```

### ✅ Benefits:

- OrderProcessor is no longer dependent on internal structure of Customer or ContactInfo
- Easy to maintain and extend

## ​5. How to Enforce LoD in Your Projects

---

1. **Avoid Deep Chains**  
   Don’t write a.getB().getC().getD() — that’s a sign of violation.
2. **Use Delegation Methods**  
   Add methods that encapsulate internal traversal logic.
3. **Expose Only What’s Necessary**  
   Don’t leak internal models across layers.
4. **Prefer Dependency Injection**  
   Don’t fetch dependencies manually via navigation.
5. **Follow Principle of Least Knowledge**  
    Each class should only know about:
   - Itself
   - Its fields
   - Method arguments
   - Objects it creates

## Conclusion

---

The Law of Demeter improves modularity and flexibility by reducing how much your code depends on internal object graphs. By keeping interactions shallow and encapsulated, your design becomes more maintainable, readable, and robust.

### 🔗 What’s Next?

You’ve now completed the Core Design Principles Series (SOLID, DRY, KISS, YAGNI, LoD).
Up next, it’s time to put these principles into action.

👉 **[SOLID Principles in Action →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_1_SOLID-in-action-intro)**  
We’ll apply each SOLID principle step-by-step to a real-world evolving system:
an Employee Management System with changing business requirements.

You’ll see:

- How SRP fixes tangled responsibilities
- How OCP keeps the system extendable
- How LSP applies to employee subtypes
- How ISP prevents fat interfaces
- How DIP decouples high-level modules from low-level implementations

This section transforms theory into practical system design skills.

---

> 📝 **Takeaway**:
>
> - LoD = “Talk to friends, not strangers”
> - Avoid deep method chains (a.b().c().d())
> - Delegate responsibilities to reduce dependency depth
> - Enhance encapsulation and modularity for long-term maintainability
