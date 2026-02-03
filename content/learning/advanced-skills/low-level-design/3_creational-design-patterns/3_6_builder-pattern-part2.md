---
title: "Builder Pattern – Advanced Enhancements (Staged Builder + toBuilder) (Part 2)"
description: "Go beyond the classic Builder. Learn when (and when not) to use Staged Builders for compile-time safety and Copy Builders (toBuilder) for safely evolving immutable objects."
keywords:
  - staged builder pattern java
  - builder toBuilder lombok
  - builder pattern advanced
  - compile time enforcement builder
  - immutable object copy builder
  - low level design interview
weight: 6
date: 2026-02-02
layout: "topic-content"
---

## 1. Why This Part Exists

---

In Part 1, we solved the core problem:

> **Construct complex objects safely without telescoping constructors.**

For most business systems, that is enough.

However, two “advanced” enhancements sometimes appear in real codebases:

1. **Staged Builder** – enforce _mandatory fields + ordering_ at **compile time**
2. **Copy Builder (toBuilder)** – safely evolve an **immutable object** without rebuilding everything manually

These are not defaults.
They exist for **specific design pressure**, not everyday use.

---

## 2. Enhancement 1: Staged Builder (Compile-Time Enforcement)

---

### 2.1 What problem does it solve?

In some designs, **certain fields must be provided in a strict order**, and creating the object without them should be **impossible at compile time**, not runtime.

Example requirement:

> “An EmployeeReport **must** have:
>
> - name
> - type
> - department
>
> before anything else can be set.”

With a normal builder, this is enforced at runtime:

```java
public EmployeeReport build() {
    if (name == null || type == null || department == null) {
        throw new IllegalStateException("Name, type, and department are mandatory");
    }
    return new EmployeeReport(this);
}
```

This is **usually sufficient**.

But sometimes, teams want **stronger guarantees**.

### 2.2 What Is a Staged Builder?

A staged builder uses **interfaces to represent each construction step**.

- Each step returns the **next allowed step**
- The caller cannot “skip ahead”
- The compiler enforces the construction flow

### 2.3 Step interfaces (construction stages)

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/builder/stagedbuilder/">See Code in Git Repo</a>
</div>

```java
public interface NameStep {
    TypeStep name(String name);
}

public interface TypeStep {
    DepartmentStep type(EmployeeType type);
}

public interface DepartmentStep {
    OptionalFieldStep department(Department department);
}

public interface OptionalFieldStep {
    OptionalFieldStep salary(double salary);
    OptionalFieldStep deductions(double deductions);
    OptionalFieldStep managerName(String managerName);
    OptionalFieldStep joiningDate(LocalDate joiningDate);
    OptionalFieldStep exitDate(LocalDate exitDate);
    OptionalFieldStep remarks(String remarks);
    EmployeeReport build();
}

public static NameStep builder() {
    return new Builder();
}
```

### 2.4 Implementation (Builder that implements all steps)

> **Note:**  
> The Builder stays private.
> Only the step interfaces are exposed publicly.

```java
private static final class Builder implements NameStep, TypeStep, DepartmentStep, OptionalFieldStep {
    private String name;
    private EmployeeType type;
    private Department department;
    private double salary;
    private double deductions;
    private String managerName;
    private LocalDate joiningDate;
    private LocalDate exitDate;
    private String remarks;

    @Override
    public TypeStep name(String name) {
        this.name = name;
        return this;
    }

    @Override
    public DepartmentStep type(EmployeeType type) {
        this.type = type;
        return this;
    }

    @Override
    public OptionalFieldStep department(Department department) {
        this.department = department;
        return this;
    }

    @Override
    public OptionalFieldStep salary(double salary) {
        this.salary = salary;
        return this;
    }

    @Override
    public OptionalFieldStep deductions(double deductions) {
        this.deductions = deductions;
        return this;
    }

    @Override
    public OptionalFieldStep managerName(String managerName) {
        this.managerName = managerName;
        return this;
    }

    @Override
    public OptionalFieldStep joiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
        return this;
    }

    @Override
    public OptionalFieldStep exitDate(LocalDate exitDate) {
        this.exitDate = exitDate;
        return this;
    }

    @Override
    public OptionalFieldStep remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    @Override
    public EmployeeReport build() {
        // You still keep runtime checks for invariants that are not about ordering
        if (name == null || name.isBlank()) { throw new IllegalStateException("name is mandatory");}
        if (type == null) { throw new IllegalStateException("type is mandatory"); }
        if (department == null) { throw new IllegalStateException("department is mandatory"); }
        if (joiningDate != null && exitDate != null && exitDate.isBefore(joiningDate)) {
                throw new IllegalStateException("exitDate cannot be before joiningDate");
        }
        if (salary < 0) throw new IllegalStateException("salary cannot be negative");
        if (deductions < 0) throw new IllegalStateException("deductions cannot be negative");

        return new EmployeeReport(this);
    }
}
```

### 2.5 Usage

Notice a subtle but important change here.  
Instead of exposing the internal Builder class directly, we invoke the builder() method, which returns a **staged interface**.

> In this design, the builder is composed of multiple steps:  
> **NameStep → TypeStep → DepartmentStep → OptionalStep**

Each step exposes **only the next valid method**, forcing the client to follow the correct construction order.  
For example, after calling **name()**, the only available method is **type()**.

```java
EmployeeReport report = EmployeeReport.builder()
    .name(employee.getName())
    .type(employee.getType())
    .department(employee.getDepartment())
    .salary(calculateSalary(employee))
    .deductions(calculateDeduction(employee))
    .build();
```

Because of this staged design:

- Calling .salary() before .department() is **not possible**
- The code **fails at compile time**, not at runtime

This ensures that all mandatory fields are set in the correct order before the object can be built.

### 2.6 Trade-offs (why staged builders are rare)

Staged builders increase compile-time safety, but they come with real costs:

- many interfaces
- harder to read/teach
- harder to evolve when requirements change
- awkward for optional “mandatory” fields (e.g., mandatory only for some scenarios)

> 📌 **Rule of Thumb**
>
> Use staged builders only when invalid construction must be impossible at compile time  
> (protocol handshakes, DSLs, security tokens, strict workflows).  
> For business DTOs, runtime validation is usually the better trade-off.

For most business systems, **simple builders are better**.

## 3. Enhancement 2: Copy Builder (toBuilder) – Safe Evolution of Immutable Objects

### 3.1 The problem it solves

Builder works great for creation.
But what if you want to **modify an immutable object slightly**?

Without a copy builder, you often end up doing this:

```java
// ❌ Must rebuild everything again
new EmployeeReport.Builder()
    .name(old.getName())
    .type(old.getType())
    .department(old.getDepartment())
    .salary(old.getSalary())
    .remarks("Updated")
    .build();
```

This is verbose and error-prone.

### 3.2 What is toBuilder()?

A **copy builder** creates a builder **pre-populated with existing values**.

### 3.3 Implementation (recommended shape)

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/builder/tobuilderexample/">See Code in Git Repo</a>
</div>

#### Step 1: Add toBuilder() in the immutable class (EmployeeReport)

```java
public Builder toBuilder() {
    return new Builder(this);
}
```

#### Step 2: Add a “copy constructor” inside Builder

```java
public static class Builder {
    // Added public no-arg constructor and a private all-args constructor for toBuilder() feature
    public Builder() {}

    private Builder(EmployeeReport report) {
        this.name = report.name;
        this.type = report.type;
        this.department = report.department;
        this.salary = report.salary;
        this.deductions = report.deductions;
        this.managerName = report.managerName;
        this.joiningDate = report.joiningDate;
        this.exitDate = report.exitDate;
        this.remarks = report.remarks;
    }

    // fluent setters + build() stay the same
}
```

### 3.4 Usage

```java
// For some reason we need to modify it later
report = report.toBuilder()
        .remarks("Updated Remarks")
        .build();
```

You reuse the same validation logic in build() and keep the final object immutable.

### 3.5 Why staged builder and toBuilder don’t mix well

Staged builders enforce a **construction journey**.

Copy builders assume:

- the object is already valid
- you want to modify just a small part

These goals conflict.

To support toBuilder() cleanly, you would need to expose some builder-like type publicly (or provide a special “copy stage” entry point), which often undermines what staged builders are trying to enforce.

> ✅ Practical guideline
>
> - Use staged builders when compile-time ordering is the priority
> - Use copy builders when immutable evolution is the priority
> - Don’t force both unless you genuinely need both

---

## 4. Lombok @Builder(toBuilder = true) (Quick Note)

---

> Lombok is a **compile-time code generation library for Java** that reduces boilerplate using annotations.
>
> It works by modifying the **abstract syntax tree (AST)** during compilation:
>
> - No runtime reflection
> - No performance overhead
> - No generated source files checked into Git
>
> Common boilerplate Lombok eliminates:
>
> - getters / setters
> - constructors
> - equals() / hashCode()
> - toString()
> - builders

This feature comes from **Lombok**, not Spring.

- @Builder generates a builder automatically.
- @Builder(toBuilder = true) also generates a toBuilder() method that returns a builder pre-filled from the current object.

Example:

```java
@Builder(toBuilder = true)
public class EmployeeReport {
    private final String name;
    private final EmployeeType type;
    private final Department department;
    // ...
}
```

Then you can do:

```java
EmployeeReport updated = report.toBuilder()
        .remarks("Updated")
        .build();
```

> ⚠️ Lombok is convenient, but always ensure:
>
> - your invariants are still enforced (via validation in constructor/build)
> - you’re not accidentally encouraging “wide mutable configuration” in the wrong places

---

## Conclusion

---

- Staged Builder gives compile-time safety, but adds ceremony and reduces flexibility.
- toBuilder() makes immutable objects ergonomic to evolve without re-typing everything.
- Both are valid tools — but only when real design pressure exists.

---

### 🔗 What’s Next?

Now we move to a powerful — and often misused — pattern:

👉 **[Singleton Pattern – Power, Pitfalls, and Trade-offs →](/learning/advanced-skills/low-level-design/3_creational-design-patterns/3_7_singleton-pattern)**

---

> 📝 **Takeaway**
>
> - Prefer the classic builder by default
> - Use staged builder for strict compile-time construction flows
> - Use toBuilder for safe evolution of immutable value objects
> - Lombok’s @Builder(toBuilder = true) is a shortcut, not a replacement for thinking
