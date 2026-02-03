---
title: "Factory Method Pattern – Solving Type Explosion in a Real System"
description: "Learn the Factory Method pattern by fixing a real design problem in the Employee Management System. Eliminate conditionals, reduce coupling, and apply OCP and DIP correctly."
keywords:
  - factory method pattern java
  - factory method design pattern example
  - avoid if else java design
  - creational design patterns
  - low level design interview
weight: 4
date: 2025-12-22
layout: "topic-content"
---

## 1. Why Factory Method Still Matters (Even After Strategy)

---

In earlier sections of the Employee Management System (EMS), we already applied the **Strategy Pattern** to solve problems like:

- Salary calculation per employee type
- Persistence behavior per destination

In both cases, we achieved:

- Open/Closed Principle (OCP)
- Polymorphic behavior
- Clean separation of responsibilities

However, there is still an **important gap**.

### The Hidden Problem

Even though behavior is abstracted, **creation responsibility still leaks into client code**.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/factory/existing/MainClient.java">See Code in Git Repo</a>
</div>

```java
new EmployeeFilePersistenceStrategy()
new EmployeeDBPersistenceStrategy()
new EmployeeAPIPersistenceStrategy()
```

This means:

- Client code still knows **which concrete class to create**
- Creation logic is **duplicated or leaked**
- Adding a new implementation requires touching client code

This is where **Factory Method complements Strategy**.

> **Strategy encapsulates behavior.**  
> **Factory encapsulates object creation.**

---

## 2. Recognizing the Same Problem We Solved Before

---

If this feels familiar, that’s intentional.

Earlier, in the **salary calculation** section, we already used a **factory-style lookup** to choose the correct salary strategy based on EmployeeType.

This section formalizes that idea and applies it to **persistence strategies**.

Different context — **same design pressure**.

---

## 3. Naive Factory Method (Baseline)

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/factory/naive/persistence/EmployeePersistenceFactory.java">See Code in Git Repo</a>
</div>

We begin with a simple factory.

```java
public class EmployeePersistenceFactory {

    public static EmployeePersistenceStrategy create(String destinationType) {
        switch (destinationType) {
            case "FILE":
                return new EmployeeFilePersistenceStrategy("employee.txt");
            case "DATABASE":
                return new EmployeeDBPersistenceStrategy();
            case "API":
                return new EmployeeAPIPersistenceStrategy();
            default:
                throw new IllegalArgumentException("Unknown persistence type: " + destinationType);
        }
    }
}

```

#### What This Improves

- Removes new from business logic
- Centralizes creation logic
- Improves readability

#### What’s Still Wrong

- String-based selection is fragile
- Switch grows over time
- Factory itself is not truly closed for modification

This is a **good first step**, but not the final design.

---

## 4. Improving the Factory with Enums

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/factory/improved/persistence">See Code in Git Repo</a>
</div>

#### Step 1: Introduce a Strongly Typed Enum

```java
public enum PersistenceType {
    FILE,
    DATABASE,
    API
}
```

#### Step 2: Update the Factory Signature

```java
public class EmployeePersistenceFactory {
    public static EmployeePersistenceStrategy create(PersistenceType type) {
        switch (type) {
            case FILE:
                return new EmployeeFilePersistenceStrategy("employee.txt");
            case DATABASE:
                return new EmployeeDBPersistenceStrategy();
            case API:
                return new EmployeeAPIPersistenceStrategy();
            default:
                throw new IllegalArgumentException("Unknown persistence type: " + type);
        }
    }
}
```

#### What Improved

- Compile-time safety
- Clear intent
- No magic strings

But we still have a growing switch statement.

---

## 5. Final Evolution: Map-Based Factory (OCP-Friendly)

---

To fully align with OCP, we remove conditional logic entirely.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/factory/finalrefactoredversion/persistence/EmployeePersistenceFactory.java">See Code in Git Repo</a>
</div>

```java
//Lazy Initialization Factory Pattern, supplier will create object only when required
public class EmployeePersistenceFactory {
    private final Map<PersistenceType, Supplier<EmployeePersistenceStrategy>> supplierMap;

    public EmployeePersistenceFactory (String fileName) {
        this.supplierMap = Map.of(
                PersistenceType.FILE, () -> new EmployeeFilePersistenceStrategy(fileName),
                PersistenceType.DATABASE, EmployeeDBPersistenceStrategy::new,
                PersistenceType.API, EmployeeAPIPersistenceStrategy::new);
    }

    public EmployeePersistenceStrategy create(PersistenceType type) {
        Supplier<EmployeePersistenceStrategy> supplier = supplierMap.get(type);
        if (supplier == null) {
            throw new IllegalArgumentException("Unknown persistence type: " + type);
        }
        return supplier.get();
    }
}


```

#### Why This Design Is Better

- No switch / if-else chains
- Adding new persistence types does not modify client code
- Configuration is centralized
- Factory becomes a configuration concern, not a logic concern

This mirrors the approach already used in the **salary strategy** section — now applied deliberately and consistently.

---

## 6. Where Does Configuration Come From?

---

Notice that **EmployeeFilePersistenceStrategy** requires a **file name**.

A common question is:

> **Who should provide configuration like file names or DB URLs?**

#### The Correct Answer

> Configuration belongs in the composition root — the place where objects are assembled.  
> This keeps business logic free from environment-specific decisions, prevents configuration leakage into domain logic, and prepares the system for dependency injection frameworks.

Not in:

- business services
- client code
- strategy implementations

> In this design, the strategy is resolved during application wiring.  
> If strategy selection must vary per request, the factory can instead be injected into the service.

#### Example: Application Wiring

```java
public class EMSApplication {
    private static final String persistenceFileName = "employees.txt";

    public static void main(String args[]) {
        EmployeeFormatter formatter = new EmployeeFormatter();
        SalaryCalculator salaryCalculator = new SalaryCalculator();

        EmployeePersistenceFactory persistenceFactory = new EmployeePersistenceFactory(persistenceFileName);

        EmployeeService employeeService = new EmployeeService(formatter,
                persistenceFactory.create(PersistenceType.FILE),
                salaryCalculator);
    }
}
```

#### This keeps:

- business logic clean
- infrastructure configurable
- testing simple

> 📌 **This is manual dependency injection — exactly what frameworks automate later.**

### This Is EXACTLY What Spring Does (Key Insight)

Spring just hides this wiring:

```java
@Bean
EmployeePersistenceFactory factory(
    @Value("${employee.file.name}") String fileName
) {
    return new EmployeePersistenceFactory(fileName);
}
```

---

## 7. Strategy + Factory: A Common Real-World Pair

---

These patterns are often used together.

| Pattern        | Responsibility         |
| -------------- | ---------------------- |
| Strategy       | Encapsulate behavior   |
| Factory Method | Encapsulate creation   |
| Enum / Map     | Configuration & lookup |

This is not overengineering — it is **controlled complexity**.

---

## 8. When to Stop Evolving the Factory

---

Do not push every factory to the final form prematurely.

Use this guideline:

- **1 implementation** → no factory needed
- **Few variants** → simple factory
- **Growing or configurable system** → map-based factory

Patterns should respond to **real pressure**, not speculation.

---

## 9. Interview Insight

---

**Common Interview Questions Around Factory Method:**

### ❓ “Isn’t this just moving the switch statement?”

Yes — and that is the point.

Factory Method does not eliminate conditionals;  
it **moves them to a single, controlled location** where change is expected.

### ❓ “How is Factory different from Strategy?”

- **Strategy** decides _what behavior to execute_
- **Factory** decides _which object to create_

They often work together:

- Factory creates the strategy
- Service uses it polymorphically

### ❓ “Who should pass configuration like file names or DB URLs?”

Configuration should be provided at the **composition root**, not inside services or clients.

Business logic must remain environment-agnostic.

### ❓ “When would you not use Factory Method?”

- When there is only one implementation
- When creation logic is trivial and stable
- When adding a factory adds more complexity than value

Patterns should solve problems — not decorate code.

---

## Conclusion

---

Factory Method is not about eliminating new.

It is about moving **creation decisions to the right place**.

By evolving the factory step by step, we achieved:

- Cleaner client code
- Stronger OCP and DIP
- Consistency with earlier Strategy designs
- A production-ready creation model

This is how real systems evolve — incrementally and intentionally.

---

### 🔗 What’s Next?

Now that we’ve handled type selection, we move to a different creation problem:

👉 **[Builder Pattern – Constructing Complex Objects Safely →](/learning/advanced-skills/low-level-design/3_creational-design-patterns/3_5_builder-pattern-part1)**

Where Factory answers “which object?”,
Builder answers “how do we build it correctly?”

---

> 📝 **Takeaway**
>
> - Factory Method centralizes object creation and removes type-based conditionals from business logic
> - It complements Strategy by handling _creation_, not behavior
> - Enum- and map-based factories are more robust than string-based switches
> - Configuration belongs in the composition root, not in services or clients
> - Evolve factories only when real design pressure appears
