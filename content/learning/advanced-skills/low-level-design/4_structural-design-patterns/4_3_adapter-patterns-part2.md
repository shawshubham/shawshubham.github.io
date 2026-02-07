---
title: Adapter Pattern – Object vs Class Adapter and Design Trade-offs (Part 2)
description: Go deeper into the Adapter Pattern by understanding Object Adapter vs Class Adapter, real-world trade-offs, package placement, and common interview traps.
keywords:
  - adapter pattern java
  - object adapter vs class adapter
  - structural design patterns
  - legacy integration design
  - adapter pattern interview questions
weight: 3
date: 2025-02-06
layout: "topic-content"
---

## 1. Recap: What Adapter Actually Solves

---

In **Part 1**, we established a key reality:

> Adapter exists because **systems evolve independently**.

Adapter is not about elegance.
It is about **integration without damage**.

You use it when:

- interfaces don’t match
- contracts cannot change
- refactoring is risky or impossible

Now we go deeper.

---

## 2. Two Variants of Adapter (Often Confused)

---

There are **two legitimate forms** of Adapter:

1. **Object Adapter** (composition-based)
2. **Class Adapter** (inheritance-based)

Most engineers know only one.
Interviewers expect you to know **why one is preferred**.

---

## 3. Object Adapter (Preferred in Practice)

---

### 3.1 Structure

- Adapter implements the target interface
- Adapter wraps the adaptee
- Uses composition

```java
public class ExternalHRPersistenceAdapter
        implements EmployeePersistenceStrategy {

    private final ExternalHRClient externalHRClient;

    public ExternalHRPersistenceAdapter(ExternalHRClient externalHRClient) {
        this.externalHRClient = externalHRClient;
    }

    @Override
    public void save(Employee employee) {
        HRUserRecord record = map(employee);
        externalHRClient.persistEmployeeData(record);
    }
}
```

### 3.2 Why Object Adapter Is Preferred

- Works with **final classes**
- Works with **third-party libraries**
- Respects **composition over inheritance**
- Easy to test and mock
- No inheritance constraints

> This is the version you should default to.

---

## 4. Class Adapter (Rare, but Interview-Relevant)

---

### 4.1 Structure

- Adapter inherits from adaptee
- Adapter implements target interface
- Uses inheritance

```java
public class ExternalHRClassAdapter
        extends ExternalHRClient
        implements EmployeePersistenceStrategy {

    @Override
    public void save(Employee employee) {
        HRUserRecord record = map(employee);
        persistEmployeeData(record);
    }
}
```

### 4.2 Limitations

| Limitation          | Why it matters                   |
| ------------------- | -------------------------------- |
| Single inheritance  | Cannot extend another class      |
| Tight coupling      | Bound to concrete implementation |
| Not always possible | Adaptee may be final             |
| Less flexible       | Harder to evolve                 |

---

## 5. Object Adapter vs Class Adapter (Comparison)

---

| Aspect                   | Object Adapter | Class Adapter |
| ------------------------ | -------------- | ------------- |
| Technique                | Composition    | Inheritance   |
| Flexibility              | High           | Low           |
| Works with final classes | ✅             | ❌            |
| Multiple adapters        | Easy           | Hard          |
| Real-world usage         | ✅ Common      | ❌ Rare       |
| Interview relevance      | ✅             | ✅            |

> **Interview rule:**  
> Mention class adapter, but recommend object adapter.

---

## 6. Adapter Placement in Package Structure

---

A subtle but important design point.

### ❌ Where adapters should NOT live

- inside domain models
- inside strategy implementations
- mixed with core business logic

### ✅ Correct placement

Adapters belong at **integration boundaries**.

Typical locations:

```text
integration/
adapters/
external/
infrastructure/
```

Example:

```text
persistence/
  ├── EmployeePersistenceStrategy
  ├── EmployeeDBPersistenceStrategy
  ├── EmployeeFilePersistenceStrategy
  └── adapter/
       └── ExternalHRPersistenceAdapter
```

> Adapter is **not domain logic**.  
> It is **translation logic**.

---

## 7. Adapter and SOLID Principles

---

Adapter is a **SOLID enabler**, not a violation.

#### Single Responsibility Principle (SRP)

✔ Adapter has exactly one reason to change:

> external API changes

#### Open/Closed Principle (OCP)

✔ New integrations added without modifying existing code

#### Dependency Inversion Principle (DIP)

✔ High-level modules depend on abstractions  
✔ Adapter depends on concrete external APIs

---

## 8. Adapter vs Facade (Common Interview Trap)

---

These two are often confused.

| Adapter               | Facade                   |
| --------------------- | ------------------------ |
| Fixes incompatibility | Simplifies complexity    |
| Interface translation | Interface simplification |
| One-to-one            | One-to-many              |
| Structural mismatch   | Usability improvement    |

> **Key line:**  
> Adapter makes things fit.  
> Facade makes things easy.

---

## 9. Adapter vs Anti-Corruption Layer (ACL)

---

Adapter is often a **building block** of ACL.

- Adapter → technical translation
- ACL → boundary protecting your domain model

In large systems:

> Multiple adapters may live inside a single anti-corruption layer.

---

## 10. When Adapter Is a Smell

---

Adapter can hide **bad modeling**.

🚫 Red flags

- Adapters inside domain entities
- Adapters doing business logic
- Adapter chains growing uncontrollably
- Adapter used to “fix” poor abstractions

If you see this, stop and ask:

> Is the interface wrong, or is integration genuinely required?

---

## 11. Interview-Grade Summary

---

**If asked:**

> “Why Adapter and not refactor?”

**Strong answer:**

> Because contracts represent stability boundaries.  
> Adapter allows evolution without breaking those boundaries.

**If asked:**

> “Which adapter should I use?”

**Strong answer:**

> Object Adapter by default.  
> Class Adapter only when inheritance is unavoidable and safe.

---

## Conclusion

---

Adapter Pattern is not optional in real systems.

It is how:

- legacy meets modern
- third-party meets clean architecture
- evolution happens without breakage

If you understand Adapter deeply, you understand **real software**.

---

### 🔗 What’s Next?

With **Part 1 and Part 2**, the Adapter Pattern is **conceptually complete**.

If you’re feeling a gap at this point, that’s expected.
You understand how the pattern works — now you need to recognize **where it already exists in real systems**.

The natural next step is not more theory or UML.

It’s pattern recognition.

👉 **[Part 3: Real-World Adapter Pattern Applications →](/learning/advanced-skills/low-level-design/4_structural-design-patterns/4_4_adapter-patterns-part3)**  
A hands-on walkthrough of Adapter in libraries, platforms, aggregators, and systems you already use — the “oh… I’ve seen this before” moments.

---

> 📝 **Takeaway**:
>
> - Adapter fixes incompatibility, not complexity
> - Prefer object adapters
> - Place adapters at boundaries
> - Adapters protect clean architecture, not pollute it
