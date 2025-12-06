---
title: "DRY (Don't Repeat Yourself) - Avoiding code duplication"
description: "Learn the DRY Principle in Low-Level Design with real-world examples. Avoid code duplication and build maintainable, scalable, and modular software systems."
keywords:
  - dry principle java
  - low level design
  - avoid code duplication
  - software design principles
  - clean code practices
  - faang interview preparation
  - oop design principles
weight: 3
date: 2025-12-04
layout: "topic-content"
---

## 1. What is the DRY Principle?

---

> **Definition**: _"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."_ — **Andy Hunt & Dave Thomas**, _The Pragmatic Programmer_

The **DRY (Don't Repeat Yourself)** principle is about **eliminating duplication** in your codebase — whether it's logic, configuration, data structures, or documentation. Every meaningful piece of logic should exist **only once**.

## 2. Why is DRY Important?

---

Repetition may seem harmless initially, but as systems grow, it becomes a liability.

**Benefits of DRY:**

- ✅ **Easier maintenance** – Fixing or updating logic in one place.
- ✅ **Fewer bugs** – Avoids inconsistency in business logic.
- ✅ **Increased readability** – Code is concise and clear.
- ✅ **Improved reusability** – Encourages modular, shareable components.
- ✅ **Faster development** – Less time writing/testing similar code repeatedly.

## 3. Violation Example ❌

---

### 🔴 Example: Code Duplication in Multiple Classes

```java
class UserService {
    public void saveUser(String name, String email) {
        if (email.contains("@") && name.length() > 3) {
            // Save user to database
        }
    }
}

class AdminService {
    public void saveAdmin(String name, String email) {
        if (email.contains("@") && name.length() > 3) {
            // Save admin to database
        }
    }
}
```

### 👉 Problem:

- Email and name validation logic is duplicated.
- If the validation rule changes, we must update it in multiple places.
- Risk of logic drift if changes are not synced everywhere.

## 4. Refactored Design ✅

---

### ✅ Apply DRY with a Utility Class

```java
class ValidationUtil {
    public static boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }

    public static boolean isValidName(String name) {
        return name != null && name.length() > 3;
    }
}
```

### ✅ Updated UserService & AdminService

```java
class UserService {
    public void saveUser(String name, String email) {
        if (ValidationUtil.isValidEmail(email) && ValidationUtil.isValidName(name)) {
            // Save user to DB
        }
    }
}

class AdminService {
    public void saveAdmin(String name, String email) {
        if (ValidationUtil.isValidEmail(email) && ValidationUtil.isValidName(name)) {
            // Save admin to DB
        }
    }
}
```

### ✅ Benefit:

- Centralized validation logic.
- Any changes to rules are done in one place.
- Easier to test and maintain.

## 5. How to Enforce DRY in Projects?

---

| Technique                  | Description                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| Utility/Helper classes     | Extract reusable logic like validation, formatting, parsing.                    |
| Abstraction (OOP)          | Use interfaces, inheritance, or composition to share behavior.                  |
| Common configurations      | Use config files, properties, or constants for repeated values.                 |
| Shared services/components | Centralize shared behavior (logging, error handling, DB access) across modules. |
| Templates and Generics     | Use generic classes or method templates where appropriate.                      |

> ⚠️ Note: DRY doesn’t mean abstracting too early — if something is duplicated only once and might change differently later, it may not be worth extracting just yet. Use judgment.

## 6. DRY Beyond Code

---

The DRY principle also applies to:

- ❌ Duplicated SQL queries or schema definitions
- ❌ Repetitive API contract definitions
- ❌ Repeated documentation or test cases

✅ Use code generation tools, schema-first APIs, documentation templates, or shared libraries wherever possible.

## Conclusion

---

The **DRY principle** is about more than reducing lines of code — it’s about building systems that are **cohesive, adaptable, and error-resistant**.

Always scan your codebase for repetition, especially in:

- ✅ Business logic
- ✅ Validation
- ✅ Configuration
- ✅ Infrastructure code (like logging, DB connections)

And refactor where repetition leads to **fragility or clutter**.

### 🔗 What’s Next?

Let’s now explore the KISS Principle — another foundational mindset in designing simple, clean, and maintainable software.

👉 **[KISS Principle →](/learning/advanced-skills/low-level-design/1_core-design-principles/1_4_KISS-principle-overview)**

---

> 📝 **Takeaway**:
>
> - DRY = Don’t Repeat Yourself
> - Duplicated logic → maintenance nightmare
> - Extract shared logic into functions, classes, or modules
> - Improves consistency, readability, and maintainability
> - Don’t over-abstract — refactor when needed, not just because you can
