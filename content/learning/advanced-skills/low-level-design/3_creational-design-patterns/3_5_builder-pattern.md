---
title: "Builder Pattern – Constructing Complex Objects Safely"
description: "Learn the Builder Pattern through a real-world Employee Management System example. Avoid constructor explosion, enforce invariants, and build readable, maintainable object creation logic."
keywords:
  - builder pattern java
  - builder design pattern example
  - creational design patterns
  - object construction best practices
  - low level design interview
weight: 5
date: 2026-01-16
layout: "topic-content"
---

## 1. Why Builder Pattern Exists

---

So far in the **Employee Management System (EMS)**, we’ve focused on:

- Behavior Variation → Strategy Pattern
- Object Selection → Factory Method

But there is a **different creation problem** that Factory does not solve:

> **How do we safely construct complex objects with many optional fields?**

This is **not a behavior problem**  
This is **not a type-selection problem**

This is a **construction problem** — and that’s where **Builder Pattern** fits.

### The Core Problem

As objects grow, they often gain:

- many optional fields
- configuration flags
- validation rules
- ordering constraints
- invariants that must never be violated

Trying to manage this with constructors quickly leads to **design decay**.

---

## 2. The Reporting Problem in EMS

---

Originally, the reporting module exposed a very simple API:

```java
public class ReportingClient {
    private final ReportingOperations reportingOperations;

    public ReportingClient(ReportingOperations reportingOperations) {
        this.reportingOperations = reportingOperations;
    }

    // We are returning generic String
    public String generateReport(Employee employeeData) {
        return reportingOperations.generateReport(employeeData);
    }
}
```

This worked initially, but as reporting requirements grew, problems appeared:

- Reports **needed multiple optional sections**
- The return type (String) was too generic
- Construction logic became scattered and unclear
- Adding new report fields risked breaking callers

### New Requirements

> HR wants to generate a detailed Employee Report with:
>
> - name
> - employee type
> - department
> - salary
> - deductions
> - manager info (optional)
> - joining date
> - exit date (optional)
> - remarks (optional)

This is a classic case of **constructor explosion**, where object construction becomes fragile and error-prone.

## 3. Naive Approach: Telescoping Constructors ❌

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/builder/naive/">See Code in Git Repo</a>
</div>

A naive implementation often looks like this:

#### Step 1: Introduce a New Model – EmployeeReport

```java
public class EmployeeReport {
    private String name;
    private EmployeeType type;
    private Department department;
    private double salary;
    private double deductions;
    private String managerName;
    private LocalDate joiningDate;
    private LocalDate exitDate;
    private String remarks;

    /**
     * If we have more fields, the constructor will keep on increasing in size, making it hard to manage
     * and read. This is a classic example of the telescoping constructor or constructor hell anti-pattern.
     */
    // All Args Constructor
    public EmployeeReport(
            String name,
            EmployeeType type,
            Department department,
            double salary,
            double deductions,
            String managerName,
            LocalDate joiningDate,
            LocalDate exitDate,
            String remarks
    ) {
        this.name = name;
        this.type = type;
        this.department = department;
        this.salary = salary;
        this.deductions = deductions;
        this.managerName = managerName;
        this.joiningDate = joiningDate;
        this.exitDate = exitDate;
        this.remarks = remarks;
    }

    // Few Args Constructor
    public EmployeeReport(
            String name,
            EmployeeType type,
            Department department,
            double salary,
            double deductions
    ) {
        this.name = name;
        this.type = type;
        this.department = department;
        this.salary = salary;
        this.deductions = deductions;
    }

    // Getters
    public String getName() { return name; }
    public EmployeeType getType() { return type; }
    public Department getDepartment() { return department; }
    public double getSalary() { return salary; }
    public double getDeductions() { return deductions; }
    public String getManagerName() { return managerName; }
    public LocalDate getJoiningDate() { return joiningDate; }
    public LocalDate getExitDate() { return exitDate; }
    public String getRemarks() { return remarks; }
}
```

#### Step 2: Update ReportingClient to Return EmployeeReport

```java
public class ReportingClient {
    private final ReportingOperations reportingOperations;

    public ReportingClient(ReportingOperations reportingOperations) {
        this.reportingOperations = reportingOperations;
    }

    public EmployeeReport generateReport(Employee employeeData) {
        return reportingOperations.generateReport(employeeData);
    }
}
```

#### Step 3: Update EmployeeService to Construct EmployeeReport

```java
public class EmployeeService implements
        HROperations,
        PayrollOperations,
        ITAdminOperations,
        ReportingOperations {
    private static final Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private final EmployeeFormatter employeeFormatter;
    private final EmployeePersistenceStrategy persistenceStrategy;
    private final SalaryCalculator salaryCalculator;

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeePersistenceStrategy persistenceStrategy,
                           SalaryCalculator salaryCalculator) {
        this.employeeFormatter = employeeFormatter;
        this.persistenceStrategy = persistenceStrategy;
        this.salaryCalculator = salaryCalculator;
    }

    @Override
    public EmployeeReport generateReport(Employee employee) {
        //generate report based on employee, returning dummy report for now
        EmployeeReport report = new EmployeeReport(
                employee.getName(),
                employee.getType(),
                employee.getDepartment(),
                calculateSalary(employee),
                calculateDeduction(employee)
        );

        return report;
    }

    // other methods...
}

```

#### Step 4: EMSApplication Calls reportingClient.generateReport(employee)

```java
public class EMSApplication {
    private static final Logger logger = Logger.getLogger(EMSApplication.class.getName());
    private static final String persistenceFileName = "employees.txt";

    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham", Department.ENGINEERING,4500, 3000, 5);
        Employee contractEmployee = new ContractEmployee("Ashwarya", 11, 40);
        Employee internEmployee = new InternEmployee("Arvind", 1000);
        Employee commissionedEmployee = new CommissionedEmployee("Rakesh", 3000, 50000, 2);

        EmployeeFormatter formatter = new EmployeeFormatter();
        SalaryCalculator salaryCalculator = new SalaryCalculator();

        EmployeePersistenceFactory persistenceFactory = new EmployeePersistenceFactory(persistenceFileName);

        EmployeeService employeeService = new EmployeeService(formatter,
                persistenceFactory.create(PersistenceType.FILE),
                salaryCalculator);

        ReportingClient reportingClient = new ReportingClient(employeeService);

        //Generating report
        logger.log(Level.INFO, "Generating EmployeeReport for the provided employee...");
        reportingClient.generateReport(fullTimeEmployee);
        logger.log(Level.INFO, "Done with EmployeeReport generation.");
    }
}
```

#### 🚨 Problems with This Design

- Constructor is unreadable
- Parameter order mistakes are easy
- Optional values are unclear
- Invalid combinations are possible
- Adding a new field breaks all callers

This is called **telescoping constructors or constructor hell** — a known anti-pattern.

---

## 4. Why Factory Is Not the Right Tool Here

---

A common misconception:

> **“Can’t we just use a Factory?”**

Factories answer:

> **Which object should I create?**

They do not answer:

> **How should this object be assembled step-by-step?**

Builder and Factory solve different problems.

| Pattern | Solves              |
| ------- | ------------------- |
| Factory | Object selection    |
| Builder | Object construction |

---

## 5. The Builder Pattern – Core Idea & Intent

---

The Builder Pattern separates:

- Object construction (step-by-step)
- Object representation (final immutable result)

#### Core Characteristics

- **Fluent API** – Builder methods return `this`, enabling readable,
  intention-revealing chained calls that resemble natural language.
- Optional fields handled safely
- Final object is immutable
- Construction logic is readable and explicit

---

## 6. Applying Builder to EMS – EmployeeReport Example

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/builder/improved/">See Code in Git Repo</a>
</div>

#### Step 1: Make the Product Immutable

```java
public class EmployeeReport {
    private final String name;
    private final EmployeeType type;
    private final Department department;
    private final double salary;
    private final double deductions;
    private final String managerName;
    private final LocalDate joiningDate;
    private final LocalDate exitDate;
    private final String remarks;

    public EmployeeReport(Builder builder) {
        this.name = builder.name;
        this.type = builder.type;
        this.department = builder.department;
        this.salary = builder.salary;
        this.deductions = builder.deductions;
        this.managerName = builder.managerName;
        this.joiningDate = builder.joiningDate;
        this.exitDate = builder.exitDate;
        this.remarks = builder.remarks;
    }
```

#### Step 2: Introduce the Builder

```java
    public static class Builder {
        private String name;
        private EmployeeType type;
        private Department department;
        private double salary;
        private double deductions;
        private String managerName;
        private LocalDate joiningDate;
        private LocalDate exitDate;
        private String remarks;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder type(EmployeeType type) {
            this.type = type;
            return this;
        }

        public Builder department(Department department) {
            this.department = department;
            return this;
        }

        public Builder salary(double salary) {
            this.salary = salary;
            return this;
        }

        public Builder deduction(double deductions) {
            this.deductions = deductions;
            return this;
        }

        public Builder managerName(String managerName) {
            this.managerName = managerName;
            return this;
        }

        public Builder joiningDate(LocalDate joiningDate) {
            this.joiningDate = joiningDate;
            return this;
        }

        public Builder exitDate(LocalDate exitDate) {
            this.exitDate = exitDate;
            return this;
        }

        public Builder remarks(String remarks) {
            this.remarks = remarks;
            return this;
        }

        public EmployeeReport build() {
            if (name == null || type == null || department == null) {
                throw new IllegalStateException("Name, type, and department are mandatory");
            }
            return new EmployeeReport(this);
        }
    }
```

#### Step 3: Updated EmployeeService implementation of generateReport()

```java
public class EmployeeService implements
        HROperations,
        PayrollOperations,
        ITAdminOperations,
        ReportingOperations {
    private static final Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private final EmployeeFormatter employeeFormatter;
    private final EmployeePersistenceStrategy persistenceStrategy;
    private final SalaryCalculator salaryCalculator;

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeePersistenceStrategy persistenceStrategy,
                           SalaryCalculator salaryCalculator) {
        this.employeeFormatter = employeeFormatter;
        this.persistenceStrategy = persistenceStrategy;
        this.salaryCalculator = salaryCalculator;
    }

    @Override
    public EmployeeReport generateReport(Employee employee) {
        //generate report based on employee, returning dummy report for now
        EmployeeReport report =  new EmployeeReport.Builder()
                .name(employee.getName())
                .type(employee.getType())
                .department(employee.getDepartment())
                .salary(calculateSalary(employee))
                .deduction(calculateDeduction(employee))
                .build();

        return report;
    }

    // other methods...
}
```

#### Benefits

- No ordering issues
- Optional fields are explicit
- Call site is readable
- Final object is immutable

---

## 7. 💡 Design Insight: Why Builder Was NOT Used for Employee

---

A natural question is:

> Why not use Builder for Employee or its subclasses?

This is intentional.

#### 1. Employee Is a Domain Entity

- Has identity
- Owns behavior
- Evolves over time

Builders work best for value objects, not behavior-rich entities.
while EmployeeReport is a **value object**:

- no identity
- immutable
- represents a snapshot of data

#### 2. Builder Would Centralize Subtype Rules

A single Employee builder would need to know:

- which fields apply to which subtype
- which combinations are valid

That would:

- reintroduce conditionals
- violate LSP
- duplicate polymorphic logic

#### 3. EMS Already Uses Better Patterns for Entities

| Concern          | Pattern Used |
| ---------------- | ------------ |
| Type behavior    | Polymorphism |
| Salary logic     | Strategy     |
| Deduction logic  | Strategy     |
| Object selection | Factory      |

Builder would add complexity without benefit.

> Builder assembles data.  
> Polymorphism models behavior.

---

## 8. When NOT to Use Builder

---

Avoid Builder when:

- Object has few mandatory fields
- Construction is trivial
- Object is mutable by design
- Domain rules drive lifecycle changes

Patterns should respond to real pressure, not habit.

---

## 9. Interview Traps (Builder Pattern)

---

### ❓ “Why not just use setters?”

- Setters allow invalid intermediate states
- Builder creates a valid object in one step
- Encourages immutability

### ❓ “Builder vs Factory?”

- Factory → which object
- Builder → how to build it

They often work together.

### ❓ “Should domain entities use Builder?”

Usually no.
Entities have identity and behavior — builders fit value objects better.

### ❓ “How do you enforce mandatory fields?”

- Validate in build()
- Use staged builders only when absolutely necessary

### ❓ “Can Builder be mutable internally?”

Yes.
The **builder is mutable**, but the **built object must be immutable**.
This separation is intentional and safe.

---

## Conclusion

---

Builder Pattern solves construction complexity, not behavior or type selection.

In EMS, we used Builder where it adds clarity:

- Complex
- Optional
- Immutable
- Data-centric objects (EmployeeReport)

And avoided it where it would hurt design:

- Core domain entities
- Polymorphic hierarchies

That distinction is design maturity.

---

### 🔗 What’s Next?

Now we move to a powerful — and often misused — pattern:

👉 **[Singleton Pattern – Power, Pitfalls, and Trade-offs →](/learning/advanced-skills/low-level-design/3_design-patterns/3_5_builder-pattern)**

---

> 📝 **Takeaway**
>
> - Builder solves complex object construction
> - It complements Factory, not replaces it
> - Best suited for value objects and DTOs
> - Fluent APIs improve readability and safety
> - Patterns should emerge from real design pressure
