---
title: "OCP – Extending Business Rules per Employee Type"
description: "Learn how to apply the Open/Closed Principle (OCP) by extending business rules through the Strategy Pattern. No more switch statements or modifying existing logic."
keywords:
  - open closed principle java
  - ocp example
  - strategy pattern java
  - employee salary calculation design
  - low level design java
  - extensible business logic
  - avoid if else chain java
weight: 6
date: 2025-12-02
layout: "topic-content"
---

## 1. Scenario: Business Rules That Keep Changing

---

HR shares a new set of rules:

- Full-time employees: **base salary + bonus**
- Contract employees: **hourly rate × hours worked**
- Interns: **fixed stipend**
- Expected future additions:
  - Commission-based employees
  - Part-time employees
  - Overseas employees (currency conversion)
  - Apprentices with tiered stipends

This means **new business logic will keep emerging over time**.

Your system must be able to support these changes **without modifying existing calculation code**.

This is exactly where the **Open/Closed Principle (OCP)** shines.

## 2. Naive First Attempt (Incorrect – OCP Violation ❌)

---

A typical (but incorrect) way to introduce this new requirement is:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/ocp/example2/bad">See Code in Git Repo</a>
</div>

#### 1. SalaryCalculator class with Business Logic

```java
public class SalaryCalculator {
    public double calculate(Employee employee) {
        switch (employee.getType()) {
            case FULLTIME:
                return calculateFullTimeSalary(employee);
            case CONTRACT:
                return calculateContractSalary(employee);
            case INTERN:
                return calculateInternSalary(employee);
            default:
                throw new IllegalArgumentException("Invalid employee type");

        }
    }

    private double calculateFullTimeSalary(Employee employee) {
        //base salary + bonus
        return ((FullTimeEmployee) employee).getBaseSalary() + ((FullTimeEmployee) employee).getBonus();
    }

    private double calculateContractSalary(Employee employee) {
        //hourly rate × hours worked
        return ((ContractEmployee) employee).getHourlyRate() * ((ContractEmployee) employee).getHoursWorked();
    }

    private double calculateInternSalary(Employee employee) {
        //fixed stipend
        return ((InternEmployee) employee).getStipend();
    }
}

```

#### 2. Updated Employee Subclasses with required attributes

```java
public class FullTimeEmployee extends Employee {
    private final int baseSalary;
    private final int bonus;

    public FullTimeEmployee(String name, int baseSalary, int bonus) {
        super(name);
        this.baseSalary = baseSalary;
        this.bonus = bonus;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.FULLTIME;
    }

    public  int getBaseSalary() { return baseSalary; }

    public int getBonus() { return bonus; }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

```java
public class ContractEmployee extends Employee {
    private final int hourlyRate;
    private final int hoursWorked;

    public ContractEmployee(String name, int hourlyRate, int hoursWorked) {
        super(name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.CONTRACT;
    }

    public int getHourlyRate() { return hourlyRate; }

    public int getHoursWorked() { return hoursWorked; }
}

```

```java
public class InternEmployee extends Employee {
    private final int stipend;

    public InternEmployee(String name, int stipend) {
        super(name);
        this.stipend = stipend;
    }

    @Override
    public EmployeeType getType() {
        return EmployeeType.INTERN;
    }

    public int getStipend() { return stipend; }
}

```

#### 3. EmployeeService class update

```java
import java.util.logging.Level;
import java.util.logging.Logger;

public class EmployeeService {
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

    public void save(Employee employee) {
        String formatted = employeeFormatter.formatForHR(employee);
        persistenceStrategy.save(formatted);
        logger.log(Level.INFO, "Saved employee {0}", employee);
    }

    public double calculateSalary(Employee employee) {
        double salary = salaryCalculator.calculate(employee);
        logger.log(Level.INFO, String.format("Name: %s , Type: %s, Salary: %s", employee.getName(), employee.getType(), salary));
        return salary;
    }
}
```

#### 4. MainClient class

```java
public class MainClient {
    private static final Logger logger = Logger.getLogger(MainClient.class.getName());

    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham", 48500, 3000);
        Employee contractEmployee = new ContractEmployee("Ashwarya", 11, 40);
        Employee internEmployee = new InternEmployee("Arvind", 1000);

        EmployeeFormatter formatter = new EmployeeFormatter();
        SalaryCalculator salaryCalculator = new SalaryCalculator();

        EmployeeService employeeService = new EmployeeService(formatter,
                new EmployeeFilePersistenceStrategy("employee.txt"),
                salaryCalculator);

        logger.info("Calculating employee salary...");
        employeeService.calculateSalary(fullTimeEmployee);
        employeeService.calculateSalary(contractEmployee);
        employeeService.calculateSalary(internEmployee);
        logger.info("Calculated employee salary");
    }
}
```

### 🚨 Problems with this approach

| Problem        | Why It’s Bad                                  |
| -------------- | --------------------------------------------- |
| Breaks OCP     | New employee type → must modify `SalaryCalculator` class    |
| Scaling issues | Switch grows forever                          |
| Fragile        | One mistake here breaks salary for all types  |
| SRP violation  | SalaryCalculator now knows all business rules |
| Hard to test   | Mixed responsibilities and conditional logic  |

This code works today but does not survive change.

## 3. Apply OCP: Distribute Behavior into Individual Strategies

---

> 💡 **Key Insight**  
> Instead of one “god” calculator deciding salary for all types,  
> each employee type gets its own salary calculation strategy.

We begin by introducing a strategy interface.

## 4. Step-by-Step OCP Refactoring

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/ocp/example2/good">See Code in Git Repo</a>
</div>

### 4.1 Define SalaryCalculationStrategy

```java
public interface SalaryCalculationStrategy {
    double calculate(Employee employee);
}

```

### 4.2 Implement Strategies Per Employee Type

#### Full-Time

```java
public class FullTimeSalaryStrategy implements SalaryCalculationStrategy {
    @Override
    public double calculate(Employee employee) {
        //base salary + bonus
        FullTimeEmployee fullTimeEmployee = (FullTimeEmployee) employee;
        return fullTimeEmployee.getBaseSalary() + fullTimeEmployee.getBonus();
    }
}
```

#### Contract

```java
public class ContractSalaryStrategy implements SalaryCalculationStrategy {
    @Override
    public double calculate(Employee employee) {
        //hourly rate × hours worked
        ContractEmployee contractEmployee = (ContractEmployee) employee;
        return contractEmployee.getHourlyRate() * contractEmployee.getHoursWorked();
    }
}
```

#### Intern

```java
public class InternSalaryStrategy implements SalaryCalculationStrategy {
    @Override
    public double calculate(Employee employee) {
        //fixed stipend
        return ((InternEmployee) employee).getStipend();
    }
}
```

#### 4.3 Strategy Factory for OCP-Friendly Lookup

```java
public class SalaryStrategyFactory {
    private static final Map<EmployeeType, SalaryCalculationStrategy> strategyMap =
           Map.of(EmployeeType.FULLTIME, new FullTimeSalaryStrategy(),
                   EmployeeType.CONTRACT, new ContractSalaryStrategy(),
                   EmployeeType.INTERN, new InternSalaryStrategy());

    public static SalaryCalculationStrategy getSalaryCalculationStrategy(EmployeeType employeeType) {
        return strategyMap.get(employeeType);
    }
}
```

> **💡 Factory Pattern Sneak Peek**  
> This lookup mechanism is a lightweight form of the **Factory Pattern**:  
> it encapsulates object creation and returns the correct strategy without using switch or if/else.  
> You will study full Factory patterns later in the Design Patterns module.

#### 4.4 Updated SalaryCalculator Using Polymorphism

```java
public class SalaryCalculator {
    public double calculate(Employee employee) {
        SalaryCalculationStrategy strategy = SalaryStrategyFactory
                .getSalaryCalculationStrategy(employee.getType());
        return strategy.calculate(employee);
    }
}

```

> No branching logic.  
> No modification needed for new employee types.

#### 4.5 EmployeeService the Orchestrator

```java
public class EmployeeService {
    private static final Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private final EmployeeFormatter employeeFormatter;
    private final EmployeePersistenceStrategy persistenceStrategy;
    private final SalaryCalculator salaryCalculator;

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeePersistenceStrategy persistenceStrategy, SalaryCalculator salaryCalculator) {
        this.employeeFormatter = employeeFormatter;
        this.persistenceStrategy = persistenceStrategy;
        this.salaryCalculator = salaryCalculator;
    }

    public void save(Employee employee) {
        String formatted = employeeFormatter.formatForHR(employee);
        persistenceStrategy.save(formatted);
        logger.log(Level.INFO, "Saved employee {0}", employee);
    }

    public double calculateSalary(Employee employee) {
        double salary = salaryCalculator.calculate(employee);
        logger.log(Level.INFO, String.format("Name: %s , Type: %s, Salary: %s", employee.getName(), employee.getType(), salary));
        return salary;
    }
}
```

#### 4.6 Final Client

```java
public class MainClient {
    private static final Logger logger = Logger.getLogger(MainClient.class.getName());

    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham", 48500, 3000);
        Employee contractEmployee = new ContractEmployee("Ashwarya", 11, 40);
        Employee internEmployee = new InternEmployee("Arvind", 1000);

        EmployeeFormatter formatter = new EmployeeFormatter();
        SalaryCalculator salaryCalculator = new SalaryCalculator();

        EmployeeService employeeService = new EmployeeService(formatter,
                new EmployeeFilePersistenceStrategy("employee.txt"),
                salaryCalculator);

        logger.info("Calculating employee salary...");
        employeeService.calculateSalary(fullTimeEmployee);
        employeeService.calculateSalary(contractEmployee);
        employeeService.calculateSalary(internEmployee);
        logger.info("Calculated employee salary");
    }
}
```

## 5. Benefits of This OCP-Compliant Design

---

| Benefit                     | Explanation                                         |
| --------------------------- | --------------------------------------------------- |
| Open for Extension          | Add new salary logic by adding new strategy classes |
| Closed for Modification     | SalaryCalculator never changes                      |
| Elimination of conditionals | No switch / if-else blocks                          |
| SRP alignment               | Each class has one responsibility                   |
| Strategy Pattern            | Behavior encapsulated per employee type             |
| Highly testable             | Each strategy can be unit tested independently      |

## Conclusion

---

This example demonstrates how to implement **new business rules** without modifying existing, stable logic.

Adding new employee types becomes:

1. Create a new Strategy class
2. Register it in the factory
3. Done — OCP fully preserved

This is how real enterprise systems scale safely and cleanly.

### 🔗 What’s Next?

You’ve now implemented OCP for:

- Infrastructure changes (saving logic — Example 1)
- Business rule changes (salary logic — Example 2)

Next, we move to the third SOLID principle:

👉 **[Liskov Substitution Principle (LSP) in action →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_7_lsp-example1)**
where we examine how incorrect inheritance can break correctness and how to design subclasses that behave as true substitutes.

---

> 📝 **Takeaway**:
>
> - OCP helps you evolve the system by adding new classes, not modifying old ones
> - Avoid branching logic (switch, if/else) when behavior varies across types
> - Strategy Pattern is a natural, OCP-friendly solution for frequently changing rules
> - A simple Factory helps distribute and select the correct behavior cleanly
> - Combined with SRP, OCP enables scalable, flexible, maintainable architectures
