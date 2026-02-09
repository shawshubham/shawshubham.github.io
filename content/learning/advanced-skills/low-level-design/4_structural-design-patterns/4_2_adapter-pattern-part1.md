---
title: Adapter Pattern – Bridging Incompatible Interfaces (Part 1)
description: Learn how the Adapter Pattern helps integrate incompatible or legacy APIs without breaking clean design. Understand when adapters are necessary and how they preserve SRP and OCP in real systems.
keywords:
  - adapter pattern java
  - structural design patterns
  - adapter vs wrapper
  - legacy integration design
  - low level design interview
weight: 2
date: 2025-02-06
layout: "topic-content"
---

## 1. Why Structural Patterns Start with Adapter

---

In the previous phase, we focused on **creating objects correctly**:

- Builder → safe construction
- Factory Method → implementation selection
- Abstract Factory → compatible object families

Now a different problem appears:

> **Objects already exist — but they don’t fit together.**

This is where **Structural Design Patterns** begin.

And the first, most fundamental one is **Adapter**.

---

## 2. The Problem: Clean Code Meets Reality

---

In textbooks, systems are designed end-to-end.

In real systems:

- APIs already exist
- libraries evolve independently
- legacy code cannot be rewritten
- third-party contracts are fixed

You often face this situation:

```text
Your system expects: Interface A
The dependency provides: Interface B
You cannot change either
```

Yet… they must work together.

This is not a failure of design.  
It is **normal system evolution**.

---

## 3. A Concrete EMS Scenario

---

In EMS, suppose we already have this clean abstraction:

```java
public interface EmployeePersistenceStrategy {
    void save(Employee employee);
}
```

And our system uses it everywhere:

```java
persistenceStrategy.save(employee);
```

Now a new requirement arrives:

> **“We must integrate with an external HR system.**  
> **They provide an API client we cannot modify.”**

That external client looks like this:

```java
public class ExternalHRClient {
    public void persistEmployeeData(HRUserRecord record) {
        // calls external system
    }
}
```

#### The mismatch

| Our System Expects | External System Provides |
| ------------------ | ------------------------ |
| Employee           | HRUserRecord             |
| save()             | persistEmployeeData()    |
| Strategy contract  | Concrete API client      |

They are **conceptually compatible**, but **technically incompatible**.

---

## 4. Naive Solutions (and Why They’re Wrong)

---

### ❌ Option 1: Modify the existing interface

```java
void save(Employee employee, ExternalHRClient client);
```

This breaks:

- SRP
- OCP
- every existing implementation

### ❌ Option 2: Add conditionals everywhere

```java
if (type == EXTERNAL_HR) {
    // call ExternalHRClient
} else {
    // normal save
}
```

This introduces:

- branching logic
- tight coupling
- cascading changes

### ❌ Option 3: Rewrite the external client

Not possible.  
Not allowed.  
Not realistic.

---

## 5. The Adapter Insight

---

The core insight of Adapter is simple:

> **Don’t change either side. Translate between them.**

The adapter:

- implements your expected interface
- internally delegates to the incompatible API
- performs any required translation

---

## 6. Adapter Pattern Definition (Practical)

---

> **Adapter Pattern** converts the interface of a class into another interface the client expects.

Key idea:

- Client code stays unchanged
- Existing abstractions stay intact
- Integration logic is isolated

---

## 7. Adapter Implementation (EMS Example)

---

### Step 1: Keep your abstraction unchanged

```java
public interface EmployeePersistenceStrategy {
    void save(Employee employee);
}
```

### Step 2: Create an Adapter

```java
public class ExternalHRPersistenceAdapter implements EmployeePersistenceStrategy {

    private final ExternalHRClient externalHRClient;

    public ExternalHRPersistenceAdapter(ExternalHRClient externalHRClient) {
        this.externalHRClient = externalHRClient;
    }

    @Override
    public void save(Employee employee) {
        HRUserRecord record = mapToHRRecord(employee);
        externalHRClient.persistEmployeeData(record);
    }

    private HRUserRecord mapToHRRecord(Employee employee) {
        return new HRUserRecord(
            employee.getId(),
            employee.getName(),
            employee.getDepartment().name()
        );
    }
}
```

### Step 3: Use it like any other strategy

```java
EmployeePersistenceStrategy strategy =
        new ExternalHRPersistenceAdapter(new ExternalHRClient());

strategy.save(employee);
```

No caller knows — or cares — that an external system is involved.

---

## 8. Why Adapter Is a Structural Pattern

---

Adapter does **not**:

- create objects
- change behavior
- add business logic

Instead, it focuses on:

- **how objects are connected**
- **how responsibilities are bridged**
- **how systems evolve without breaking**

This is the essence of **structural design**.

---

## 9. Adapter vs “Just a Wrapper” (Interview Trap)

---

Adapters are often dismissed as “just wrappers”.

That’s incomplete.

| Wrapper          | Adapter                |
| ---------------- | ---------------------- |
| Delegates calls  | Translates interfaces  |
| Same abstraction | Different abstractions |
| Convenience      | Compatibility          |

> **All adapters wrap something, but not all wrappers are adapters.**

---

## 10. When You Should Use Adapter

---

### ✅ Use Adapter when:

- integrating legacy or third-party APIs
- interfaces are incompatible
- you cannot modify one or both sides
- you want to preserve clean abstractions

### ❌ Avoid Adapter when:

- you control both interfaces
- the mismatch is conceptual, not technical
- you’re hiding poor domain modeling

---

## 11. Interview Perspective

---

If asked:

> “Why not change the interface?”

A strong answer:

> Because interfaces represent **contracts**.  
> Adapters allow systems to evolve without breaking those contracts.

---

## Conclusion

---

Adapter Pattern is not about elegance.

It is about **survival** in real systems.

It allows you to:

- integrate without refactoring
- preserve clean design
- isolate change
- respect existing contracts

This is why Adapter is often the **first structural pattern engineers actually use**.

---

### 🔗 What’s Next?

In the next article, we’ll go deeper:

👉 **[Adapter Pattern – Object Adapter vs Class Adapter + Trade-offs (Part 2) →](/learning/advanced-skills/low-level-design/4_structural-design-patterns/4_3_adapter-pattern-part2)**

We’ll cover:

- object vs inheritance-based adapters
- where adapters should live in package structure
- how adapters relate to DIP and anti-corruption layers

---

> 📝 **Takeaway**:
>
> - Adapter bridges incompatibility, not behavior
> - It preserves existing contracts
> - It isolates integration pain
> - Most real systems need adapters — whether named or not
