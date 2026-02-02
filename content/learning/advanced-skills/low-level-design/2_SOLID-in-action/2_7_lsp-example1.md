---
title: "LSP – Preventing Broken Inheritance in Employee Management"
description: "Learn the Liskov Substitution Principle (LSP) through a real-world Employee Management System example. See how a wrong design breaks substitutability and how to fix it using behavior policies."
keywords:
  - liskov substitution principle java
  - lsp example java
  - solid principles in action
  - inheritance vs composition
  - employee management system design
  - clean architecture policies
weight: 7
date: 2025-12-11
layout: "topic-content"
---

## 1. New Requirement: Attendance-Based Deductions

---

Our Employee Management System currently supports:

- Full-time employees (base + bonus)
- Contract employees (hourly rate × hours worked)
- Interns (fixed stipend)

A new HR requirement arrives:

> **“We want attendance-based salary deductions and a new Employee Type”**

### Final Requirement

HR has added a new employee type: **Commission-Based Employees (New)**

- Base pay
- Tiered commission (5%, 7%, 10%) depending on monthly sales
- Deductions are based on compliance penalties, not attendance

#### Deduction Rules:

| Employee Type                        | Rule                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Full-Time**                        | Deduction = daysAbsent × 50                                                                |
| **Contract**                         | Missing hours → pro-rated deduction                                                        |
| **Interns**                          | No deductions                                                                              |
| **Commission-Based Employees (New)** | No attendance-based deduction — deductions are tied to _compliance penalties_, not absence |

This changing and inconsistent set of rules sets the perfect stage to demonstrate how a **wrong abstraction** can break the **Liskov Substitution Principle (LSP)** which says **"Derived classes must be substitutable for their base classes without affecting the correctness of the program."**

## 2. The Naive (Wrong) Implementation — LSP Violation ❌

---

A developer attempts to “generalize” the requirement:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/lsp/example1/bad">See Code in Git Repo</a>
</div>

### ❌ Step 1: A Wrong Assumption in the Base Class

```java
public abstract class Employee {
    private final String name;

    public Employee(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public abstract EmployeeType getType();

    // ❌ Wrong assumption:
    // All employees have attendance-based deductions
    public double calculateDeduction(int daysAbsent){
        return daysAbsent * 50;
    }
}

```

The base class now **declares a behavioral contract**:

> **“You can safely calculate attendance-based deductions for any Employee.”**

This assumption is **not true for all employee types**.

### ❌ Step 2: EmployeeType Expansion

```java
public enum EmployeeType {
    FULLTIME,
    CONTRACT,
    INTERN,
    COMMISSIONED
}
```

A new type — **COMMISSIONED** — is added.
This does not break LSP by itself, but it clearly exposes an assumption in the base class that was already incorrect.

### ❌ Step 3: Subclasses Try to “Fix” the Problem

#### 1. Full-Time Employee works fine as this subclass happens to match the base-class assumption.

#### 2. Contract Employee (Semantic Drift)

```java
@Override
public double calculateDeduction(int daysAbsent) {
    double missingHours = MAX_WORK_TIME - hoursWorked;
    return missingHours > 0 ? missingHours * 5 : 0;
}
```

- Deduction is now **hour-based**, not attendance-based.
- The method name and contract no longer mean the same thing.

> ⚠ This silently violates LSP.

#### 3. Intern Employee (Hard Failure)

```java
@Override
public double calculateDeduction(int daysAbsent) {
    throw new UnsupportedOperationException("Interns do not have deductions.");
}
```

This is a clear LSP violation.

- The base class promises a valid deduction calculation.
- The subclass crashes at runtime.

#### 4. Commissioned Employee (Hidden Contract Violation)

```java
@Override
public double calculateDeduction(int daysAbsent) {
    //assuming 10% number of compliance breach, ❌ ignoring the daysAbsent completely
    return Math.max(0, complianceBreach * 0.1);
}
```

This is even more dangerous:

- The method ignores attendance entirely.
- Client code believes deductions are attendance-based — but they are not.

This breaks **behavioral substitutability** silently.

### Step 4. Added new Salary Calculation Strategy for COMMISSIONED Employee

```java
public class CommissionedSalaryStrategy implements SalaryCalculationStrategy{
    @Override
    public double calculate(Employee employee) {
        CommissionedEmployee commissionedEmployee = (CommissionedEmployee) employee;
        //base salary + commission (5%, 7%, 10%)
        double monthlySales = commissionedEmployee.getMonthlySales();
        double commission = 0;

        if(monthlySales >= 50000 && monthlySales < 75000) {
            commission =  monthlySales * 0.05;
        } else if(monthlySales >= 75000 && monthlySales < 100000) {
            commission =  monthlySales * 0.07;
        } else if(monthlySales >= 100000) {
            commission =  monthlySales * 0.1;
        }
        return commissionedEmployee.getBaseSalary() + commission;
    }
}
```

> **Note:**  
> Salary calculation remains unchanged from the OCP example and is shown here only to keep the Employee Management System complete.  
> The LSP violation discussed in this section is **strictly related to deduction logic**, not salary calculation.

### Step 5. Updated EmployeeService class, to add SalaryDeduction service method.

```java
public double calculateDeduction(Employee employee, int daysAbsent){
    double salaryDeduction = employee.calculateDeduction(daysAbsent);
    logger.log(Level.INFO, String.format("Name: %s, Type: %s, Deductions: %s", employee.getName(), employee.getType(), salaryDeduction));
    return salaryDeduction;
}
```

### Step 6. The MainClient

```java
logger.log(Level.INFO, "Calculating deduction...");
employeeService.calculateDeduction(new FullTimeEmployee("Shubham", 4500, 3000), 2); // ✅ Works
employeeService.calculateDeduction(new ContractEmployee("Ashwarya", 11, 40), 0); // ⚠ Different meaning
employeeService.calculateDeduction(new InternEmployee("Arvind", 1000), 0); // ❌ Runtime exception
employeeService.calculateDeduction(new CommissionedEmployee("Rakesh", 3000, 50000, 2), 0); // ❌ Incorrect logic
logger.log(Level.INFO, "Calculated deduction");
```

### ❗ This is the LSP violation

In short, a subtype cannot safely replace its base type without breaking program correctness.

- Not all subclasses can be safely substituted for Employee
- Client code must now know the concrete type
- The abstraction is no longer trustworthy

### 🚨 LSP Violation Summary

Liskov Substitution Principle is broken because:

- The base class defines a behavior not applicable to all subclasses
- Some subclasses throw exceptions
- Others silently change the meaning of the method
- Client code written against the base type becomes unsafe

This is not just “bad design” —
this is a **broken inheritance contract**.

## 3. Fixing the Design: Making It LSP-Compliant ✅

---

The problem in the previous design was **not inheritance itself**, but an abstraction that made promises not all subclasses could honor.

The base `Employee` class assumed:

> “All employees support attendance-based deductions.”

But our business rules clearly showed that this assumption is false.

To fix this, we must:

- **Remove deduction logic from the base class**
- **Model deduction behavior as a separate, replaceable policy**
- **Delegate behavior instead of forcing inheritance**

This follows two key principles:

- **LSP** — subclasses remain safely substitutable
- **Composition over inheritance**

## 4. Introduce a Deduction Policy (Behavior Abstraction)

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/lsp/example1/good">See Code in Git Repo</a>
</div>

Instead of putting deduction logic in `Employee`, we introduce a dedicated policy:

```java
public interface DeductionPolicy {
    public double calculateDeduction(Employee employee);
}
```

This interface represents how deductions are calculated, independent of employee identity.

Each employee type can now have its own policy, without breaking any contracts.

## 5. Implement Deduction Policies Per Employee Type

---

### 5.1 Full-Time Deduction Policy

```java
public class FullTimeDeductionPolicy implements DeductionPolicy{
    @Override
    public double calculateDeduction(Employee employee) {
        FullTimeEmployee fullTimeEmployee = (FullTimeEmployee) employee;
        return fullTimeEmployee.getDaysAbsent() * 50;
    }
}
```

### 5.2 Contract Deduction Policy

```java
public class ContractDeductionPolicy implements DeductionPolicy{
    @Override
    public double calculateDeduction(Employee employee) {
        ContractEmployee contractEmployee = (ContractEmployee) employee;
        double missingHours = MAX_WORK_TIME - contractEmployee.getHoursWorked();
        return missingHours > 0 ? missingHours * 5 : 0;
    }
}
```

### 5.3 Intern Deduction Policy

```java
public class InternDeductionPolicy implements DeductionPolicy{
    @Override
    public double calculateDeduction(Employee employee) {
        return 0; // Interns never have deductions
    }
}
```

### 5.4 Commissioned Deduction Policy

```java
public class CommissionedDeductionPolicy implements DeductionPolicy{
    @Override
    public double calculateDeduction(Employee employee) {
        CommissionedEmployee commissionedEmployee = (CommissionedEmployee) employee;
        //assuming 10% number of compliance breach, ignoring the daysAbsent
        return Math.max(0, commissionedEmployee.getComplianceBreach() * 0.1);
    }
}
```

Notice:

- No exceptions
- No ignored parameters
- No broken assumptions

Each policy fully honors its contract.

### 6. Refactor the Employee Class (Composition Over Inheritance)

---

```java
public abstract class Employee {
    private final String name;
    private final DeductionPolicy deductionPolicy;

    public Employee(String name, DeductionPolicy deductionPolicy) {
        this.name = name;
        this.deductionPolicy = deductionPolicy;
    }

    public String getName() {
        return name;
    }

    public abstract EmployeeType getType();

    public double calculateDeduction(){
        return deductionPolicy.calculateDeduction(this);
    }
}
```

✅ What changed?

- Employee no longer defines deduction logic
- It simply delegates to a policy
- The contract is now safe for all subclasses

## 7. Subclasses Inject the Correct Policy

---

### 7.1 Full-Time Employee class

```java
public class FullTimeEmployee extends Employee {
    private final double baseSalary;
    private final double bonus;
    private final int daysAbsent;

    public FullTimeEmployee(String name, double baseSalary, double bonus, int daysAbsent) {
        super(name, new FullTimeDeductionPolicy());
        this.baseSalary = baseSalary;
        this.bonus = bonus;
        this.daysAbsent = daysAbsent;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.FULLTIME;
    }

    public  double getBaseSalary() { return baseSalary; }

    public double getBonus() { return bonus; }

    public double getDaysAbsent() { return daysAbsent; }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

### 7.2 Contract Employee class

```java
public class ContractEmployee extends Employee {
    private final double hourlyRate;
    private final double hoursWorked;
    public static final double MAX_WORK_TIME = 160; //40 hours a week

    public ContractEmployee(String name, double hourlyRate, double hoursWorked) {
        super(name, new ContractDeductionPolicy());
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.CONTRACT;
    }

    public double getHourlyRate() { return hourlyRate; }

    public double getHoursWorked() { return hoursWorked; }
}
```

### 7.3 Intern Employee class

```java
public class InternEmployee extends Employee {
    private final double stipend;

    public InternEmployee(String name, double stipend) {
        super(name, new InternDeductionPolicy());
        this.stipend = stipend;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.INTERN;
    }

    public double getStipend() { return stipend; }
}
```

### 7.4 Commissioned Employee class

```java
public class CommissionedEmployee extends Employee {
    private final double baseSalary;
    private final double monthlySales;
    private final int complianceBreach;

    public CommissionedEmployee(String name, double baseSalary, double monthlySales, int complianceBreach) {
        super(name, new CommissionedDeductionPolicy());
        this.baseSalary = baseSalary;
        this.monthlySales = monthlySales;
        this.complianceBreach = complianceBreach;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.COMMISSIONED;
    }
    public double getBaseSalary() {
        return baseSalary;
    }
    public double getMonthlySales() {
        return monthlySales;
    }
    public int getComplianceBreach() {
        return complianceBreach;
    }
}
```

No subclass overrides calculateDeduction().
No subclass violates expectations.

## 8. EmployeeService Class - The orchestrator

---

```java
public double calculateDeduction(Employee employee){
    double salaryDeduction = employee.calculateDeduction();
    logger.log(Level.INFO, String.format("Name: %s, Type: %s, Deductions: %s", employee.getName(), employee.getType(), salaryDeduction));
    return salaryDeduction;
}
```

## 9. The MainClient class - Mimicking Client

---

```java
logger.log(Level.INFO, "Calculating deduction...");
employeeService.calculateDeduction(new FullTimeEmployee("Shubham", 4500, 3000, 5); // ✅ Works
employeeService.calculateDeduction(new ContractEmployee("Ashwarya", 11, 40); // ✅ Works
employeeService.calculateDeduction(new InternEmployee("Arvind", 1000); // ✅ Works
employeeService.calculateDeduction(new CommissionedEmployee("Rakesh", 3000, 50000, 2); // ✅ Works
logger.log(Level.INFO, "Calculated deduction");
```

## 10. Why This Design Satisfies LSP

---

| Aspect              | Bad Design                          | Good Design                |
| ------------------- | ----------------------------------- | -------------------------- |
| Base class contract | Too strong, incorrect               | Minimal, universally valid |
| Subclass behavior   | Throws exceptions / changes meaning | Fully compliant            |
| Substitutability    | Broken                              | Guaranteed                 |
| Extensibility       | Fragile                             | Easy to extend             |
| Client code safety  | Requires instanceof checks          | Safe polymorphism          |

Now, any Employee subtype can safely replace another.

> **💡 Design Insight (Optional Reading)**
>
> In this example, we applied the Strategy Pattern by injecting DeductionPolicy directly into the Employee model.
>
> In earlier examples (such as salary calculation), we placed strategies inside the service layer instead.
>
> **Both approaches are valid** — the choice depends on _what the behavior represents_.
>
> - **When behavior is a core domain invariant** (e.g., deduction rules that must never be violated),
>   keeping the strategy inside the model ensures correctness and preserves LSP.
>
> - **When behavior is a use-case or workflow concern** (e.g., salary projections, reports, simulations),
>   placing strategies in the service layer offers more flexibility.
>
> In short:
> **Domain invariants belong with the model.
> Use-case logic belongs in services.**
>
> We’ll revisit these design trade-offs in more detail later in the tutorial series,
> when we discuss design patterns and architectural decision-making.

## Conclusion

---

The key lesson of LSP is:
A base class should only define behavior that all subclasses can honor.

Violations usually occur when:

- We force behavior into a base class
- Subclasses are forced to “opt out”
- Exceptions or silent logic changes appear

The fix is almost always:

- Better abstraction
- Composition over inheritance

---

### 🔗 What’s Next?

Now that we’ve fixed a broken inheritance contract, the next problem shows up naturally:

> Many classes start accumulating “fat” interfaces that clients don’t fully need.

That’s where the **Interface Segregation Principle (ISP)** helps.

👉 **[Interface Segregation Principle (ISP) in action →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_8_isp-example1)**  
Design small, focused interfaces that clients actually use — and avoid forcing implementations to depend on unused methods.

---

> 📝 **Takeaway**:
>
> - LSP is about behavioral correctness, not just type hierarchy
> - Subclasses must honor the full contract of their base class
> - Exceptions and silent behavior changes are both LSP violations
> - Composition (policies) is the safest fix
> - Correct abstractions make systems extensible and predictable
