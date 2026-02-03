---
title: "Singleton Pattern – Should This Be a Singleton at All?"
description: "Learn when Singleton is a design smell and when it is justified. Use real Employee Management System examples to understand Singleton vs Dependency Injection and avoid hidden global state."
keywords:
  - singleton design pattern pitfalls
  - when to use singleton
  - singleton vs dependency injection
  - global state design smell
  - low level design interview
weight: 8

date: 2025-12-25
layout: "topic-content"
---

---

## 1. Why This Question Matters More Than Implementation

---

Most engineers learn **how** to implement Singleton.

Few learn **when not to use it**.

In real systems, Singleton is:

- one of the **most misused patterns**
- a frequent **source of hidden bugs**
- often replaced by **Dependency Injection (DI)**

That’s why this question matters more than mechanics:

> **Should this class be a Singleton at all?**

---

## 2. The Core Smell: Hidden Global State (Why Singleton Raises Red Flags)

---

Before we compare Singleton with Dependency Injection, we need to understand **why Singleton is controversial at all**.

At a design level, a Singleton is essentially:

> **Global state with a controlled access point**

```java
Singleton.getInstance().doSomething();
```

From the call site, notice what’s missing:

- No constructor dependency
- No interface
- No explicit contract

This creates a design _smell_ known as **hidden global state**.

### 2.1 Why Hidden Global State Is Dangerous

Hidden global state causes problems because:

- Dependencies are invisible
- Behavior is hard-wired
- Substitution is difficult
- Tests become coupled and brittle

This often leads to violations of core design principles:

| Design Concern     | Impact                                      |
| ------------------ | ------------------------------------------- |
| Dependency clarity | Dependencies are not declared               |
| Testability        | Hard to mock or replace                     |
| DIP                | High-level code depends on concrete globals |
| Reasoning          | Behavior depends on hidden state            |

> The problem is not “one instance”.  
> The problem is **global access without explicit dependency**.

This section exists to teach you **how to recognize the smell** —  
not yet how to fix it.

---

## 3. Singleton vs Dependency Injection (The Modern Shift)

---

Once you recognize the smell, the natural question is:

> **What replaces Singleton in modern systems?**

The answer is **Dependency Injection** — not because it creates more objects,  
but because it **changes who controls them**.

### 3.1 The Critical Confusion

Most Singleton misuse comes from confusing two ideas:

> “I need only one instance”  
> vs  
> “I need global access”

Singleton solves **both**.  
DI solves **only the first** — intentionally.

And that difference matters.

### 3.2 What Singleton Really Gives You

Singleton guarantees:

1. A single instance
2. Global access to it

```java
public class PayrollService {
    public void process() {
        Logger logger = Logger.getInstance(); //Single instance
        logger.log("Processing payroll");
    }
}
```

This feels convenient — until you realize:

- Does PayrollService depend on Logger? → **Yes**
- Is that dependency visible in the constructor? → **No**
- Can we replace Logger for testing? → **Hard**
- Can we change its behavior per environment? → **Not easily**

### 3.3 What Dependency Injection Changes

Dependency Injection shifts responsibility outward:

> **Objects no longer find their dependencies — they receive them.**

```java
public class PayrollService {
    private final Logger logger;

    public PayrollService(Logger logger) {
        this.logger = logger;
    }
}
```

Now:

- Dependencies are explicit
- Behavior is replaceable
- Lifecycle is controlled by a composition root

Nothing prevents Logger from being a **single instance**.

The difference is **visibility and control**.

### 3.4 The Key Mental Shift

| Question                  | Singleton        | Dependency Injection |
| ------------------------- | ---------------- | -------------------- |
| Who creates the object?   | The class itself | A composition root   |
| How is it accessed?       | Globally         | Passed explicitly    |
| Are dependencies visible? | ❌ No            | ✅ Yes               |
| Easy to test?             | ❌ Hard          | ✅ Easy              |
| Lifecycle control         | Inside class     | Outside class        |

> **DI gives you singleton behavior without singleton coupling.**

This is the real evolution in modern design.

### 3.5 Why Modern Systems Avoid Manual Singleton

In real systems:

- We still want **one instance**
- But we don’t want **global access**
- And we don’t want **hidden state**

That’s why frameworks exist.

Example (conceptually):

```java
Logger logger = new Logger();   // one instance
PayrollService service = new PayrollService(logger);
```

There is still **one Logger** —  
but no class assumes that fact.

### 3.6 Spring Clarification (Important Interview Point)

When people say:

> “Spring beans are singletons”

What they really mean is:

- One instance per container
- Injected, not globally accessed
- Replaceable and mockable

This is **not the Singleton pattern**.

It is **DI-managed lifecycle**.

> Singleton pattern = global access
>
> Spring singleton = scoped instance

Interviewers love this distinction.

### 3.7 Rule of Thumb

Before writing a Singleton, ask:

> **Can I pass this as a dependency instead?**

- If yes → use DI
- If no → document why Singleton is required

Singleton should be **a last resort**, not a default.

> ### One-Line Takeaway
>
> **Singleton solves “how many instances”.**  
> **Dependency Injection solves “who controls dependencies”.**

Once you understand this shift,  
most Singleton use cases disappear naturally.

---

## 4. EMS Case Study: What We Did _Not_ Make Singleton

---

In the Employee Management System, we deliberately avoided Singleton for:

- `EmployeeService`
- `SalaryCalculator`
- `EmployeePersistenceStrategy`
- `DeductionPolicy`

Why?

Because these classes:

- contain business logic
- may evolve
- need testing flexibility
- should not hide dependencies

Even if there is **only one instance at runtime**,  
we still **do not model them as Singletons**.

> **“Single instance in practice” ≠ “Singleton pattern”**

---

## 5. When the Singleton Pattern Is Actually Justified (Rare, but Real)

---

Most application code **should never use the Singleton pattern**.

However, there _are_ a few cases where Singleton is not just acceptable —  
it is the **correct model of reality**.

The key question is not:

> “Do I want only one instance?”

The real question is:

> **“Does the system itself have only one of this thing?”**

---

### 5.1 What a _True_ Singleton Represents

A legitimate Singleton represents something that is:

- **inherently unique**
- **owned by the JVM or the operating system**
- **incorrect to duplicate**, not just inefficient

In other words:

> Creating a second instance would break correctness, not performance.

---

### 5.2 Concrete Examples (What They Actually Mean)

### Example 1: JVM Runtime (`Runtime.getRuntime()`)

There is exactly **one JVM process**.

The `Runtime` object represents:

- memory access
- process execution
- shutdown hooks

Creating multiple `Runtime` objects would make no sense —  
there is still only **one JVM underneath**.

> 👉 Singleton here models a **real-world singular system resource**.

### Example 2: System Clock / Time Source

Some systems expose a global clock abstraction:

```java
SystemClock.now()
```

Why Singleton-like?

- There is one notion of “current time”
- Multiple clocks would give inconsistent results
- The system depends on a single time source

Here, Singleton enforces consistency, not convenience.

### Example 3: JVM-Level Metrics Registry

A metrics registry collects:

- counters
- gauges
- timers

If multiple registries exist:

- metrics get split
- monitoring becomes incorrect
- observability breaks

There must be **one central registry** that everything reports to.

> 👉 This is a coordination point, not business logic.

### 5.3 Why These Are NOT Application Services

Notice what these examples have in common:

- They are **infrastructure-level**
- They do **not contain business rules**
- They model **system-wide reality**
- They are **not mocked per test case**

That’s why Singleton fits here.

### 5.4 When Singleton Is a Design Smell (Most Code)

If a class:

- contains business logic
- varies by environment
- needs different behavior in tests
- belongs to your domain or service layer

Then making it a Singleton is a **design smell**.

Even if:

- only one instance exists at runtime
- performance is fine

If you can reasonably pass it as a dependency —  
it should **not** be a Singleton.

> ### The Only Rule You Actually Need
>
> **If duplicating the object would be logically wrong, Singleton may be valid.**  
> **If duplicating it would only be inconvenient, Singleton is wrong.**

---

## 6. Interview Traps Around Singleton

---

### ❓ “Isn’t Singleton just an object with one instance?”

❌ No.
It’s a **global access pattern with lifecycle control**.

---

### ❓ “Spring beans are singletons — so Singleton is good, right?”

⚠️ Careful.

Spring beans are:

- container-managed
- dependency-injected
- replaceable

That is **not** the Singleton _pattern_.

---

### ❓ “Should services be Singleton?”

❌ No.

Services should be:

- stateless
- injected
- lifecycle-managed by the framework

---

## 7. Final Rule of Thumb

---

Before using Singleton, ask:

> Can I pass this as a dependency instead?

If the answer is yes → **do not use Singleton**.

If the answer is no → document _why_.

---

## Conclusion

---

Singleton is easy to write and easy to misuse.

Modern design prefers:

- explicit dependencies
- composition roots
- DI containers (Spring, Guice, Dagger, Micronaut)
- testability over convenience

> **Singleton should be your last resort, not your default.**

You now understand not just _how_ to build Singleton —
but **when to walk away from it**.

---

### 🔗 What’s Next?

Now that we’ve seen:

- object creation (Factory)
- object construction (Builder)
- object lifecycle (Singleton)

We move to **managing related object families**.

👉 **[Abstract Factory Pattern – When Good Designs Still Break (Part 1) →](/learning/advanced-skills/low-level-design/3_creational-design-patterns/3_9_abstract-factory-pattern-part1)**

---

> 📝 **Takeaway**
>
> - Singleton ≠ single instance
> - Global access is the real cost
> - DI replaces most Singleton use cases
> - Avoid Singleton in domain logic
> - Use it only with strong justification
