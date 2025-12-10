---
title: "Single Responsibility Principle (SRP) - Inheritance & Subtypes"
description: "Explore how the Single Responsibility Principle applies when working with inheritance, subtypes, and extended behaviors in Java."
keywords:
  - single responsibility principle java
  - SRP solid principle
  - inheritance in SRP
  - object-oriented design examples
  - software design patterns
  - employee management system java
weight: 3
date: 2025-12-09
layout: "topic-content"
---

## 1. Requirement Change : SRP Under Inheritance

---

In the previous section, we saw how SRP encourages splitting responsibilities across different classes.  
Now we’ll explore what happens **when we introduce inheritance and specialization**, and how to preserve SRP as the system evolves.

> ❓ **What if each type of employee (FullTime, Contract, Intern) starts to have its own unique responsibilities or behaviors?**

A natural approach is to introduce inheritance:

- Create subclasses (`FullTimeEmployee`, `ContractEmployee`, etc.)
- Move common behaviors into an abstract `Employee` parent class

However, the **real challenge** is deciding which responsibilities belong where.  
If we place unrelated responsibilities in the base class, we break SRP — and make the entire hierarchy fragile.

## 2. Initial Design: SRP Violation (Bad Example)

---

Here is a typical _incorrect_ implementation using inheritance:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/srp/example2/bad">See Code in Git Repo</a>
</div>

#### 1. Employee Base Class — Too Many Responsibilities

```java
import java.io.FileWriter;
import java.io.IOException;

public abstract class Employee {
    protected String name;

    public Employee(String name) {
        this.name = name;
    }

    public abstract String getType();

    public void save() {
        // Format according to HR
        String formatted = name + " - " + getType().toUpperCase();

        // Save to file
        try (FileWriter writer = new FileWriter("employees.txt", true)) {
            writer.write(formatted + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 2. Subclasses extending Employee Class

```java
public class FullTimeEmployee extends Employee {
    public FullTimeEmployee(String name) { super(name); }
    @Override public String getType() { return "FullTime"; }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

```java
public class ContractEmployee extends Employee {
    public ContractEmployee(String name) { super(name); }
    @Override public String getType() { return "Contract"; }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

```java
public class InternEmployee extends Employee {
    public InternEmployee(String name) { super(name); }
    @Override public String getType() { return "Intern"; }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

#### 3. Main class acting as Client

```java
public class MyClient {
    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham");
        Employee contractEmployee = new ContractEmployee("Ashwarya");
        Employee internEmployee = new InternEmployee("Arvind");

    	fullTimeEmployee.save();
    	contractEmployee.save();
    	internEmployee.save();
    }
}
```

> **✅ Quick SRP Checklist**
>
> 🔸 Does this class have more than one reason to change?  
> 🔸 Does it mix formatting, persistence, or business logic?  
> 🔸 Can you extract a responsibility into its own class?

### 🚨 What’s wrong?

The Employee class now has three reasons to change:

1. If HR changes the formatting rules
2. If file-saving logic changes
3. If new behaviors are added for specific employee types

Since all subclasses inherit this method, the design becomes tightly coupled and brittle.

## 3. Refactored Design — Applying SRP Correctly with Subtypes

---

### Our Solution:

Split responsibilities into **dedicated, single-purpose** classes, even when using inheritance.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/srp/example2/good">See Code in Git Repo</a>
</div>

#### 1. Employee Base Class: Pure Domain Model

```java
//Pure data holder
public abstract class Employee {
	private final String name;

	public Employee(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public abstract String getType(); // enforced behaviour
}
```

#### 2. Subclasses Focus Only on Behavior Unique to Them

```java
public class FullTimeEmployee extends Employee {
	public FullTimeEmployee(String name) { super(name); }
	@Override public String getType() { return "FULLTIME"; }

	// Future: add methods like assignBonus()
}
```

```java
public class ContractEmployee extends Employee {
	public ContractEmployee(String name) { super(name); }
	@Override public String getType() { return "CONTRACT"; }

	// Future: add methods like extendContract()
}
```

```java
public class InternEmployee extends Employee {
	public InternEmployee(String name) { super(name); }
	@Override public String getType() { return "INTERN"; }

	// Future: add methods like assignMentor()
}
```

#### 3. Formatter Class — Dedicated to Presentation Logic

```java
//Responsible for formatting employee data as required by HR
public class EmployeeFormatter {
	public String formatForHR(Employee emp) {
		return emp.getName() + " - " + emp.getType().toUpperCase();
	}
}
```

#### 4. File Saver — Dedicated to Persistence Logic

```java
import java.io.FileWriter;
import java.io.IOException;

//Handles persistence logic
public class EmployeeFileSaver {
	private final String filePath;

	public EmployeeFileSaver(String filePath) {
		this.filePath = filePath;
	}

	public void saveToFile(String formattedData) throws IOException {
		try (FileWriter writer = new FileWriter(filePath, true)) {
			writer.write(formattedData + "\n");
		}
	}
}
```

#### 5. EmployeeService — The Orchestrator

```java
//Employee Orchestrator
public class EmployeeService {
	private final EmployeeFormatter formatter;
	private final EmployeeFileSaver fileSaver;

	public EmployeeService(EmployeeFormatter formatter, EmployeeFileSaver fileSaver) {
		this.formatter = formatter;
		this.fileSaver = fileSaver;
	}

	public void save(Employee emp) {
		String formatted = formatter.formatForHR(emp);
		try {
			fileSaver.saveToFile(formatted);
		} catch (IOException e) {
			// ✅ Proper place to log/report
			System.err.println("Error saving employee data: " + e.getMessage());
			// Optionally log to a file or monitoring system
		}
	}
}
```

#### 6. MainClient — Clean and Simple

```java
public class MainClient {
	public static void main(String args[]) {
		Employee fullTimeEmployee = new FullTimeEmployee("Shubham");
		Employee contractEmployee = new ContractEmployee("Ashwarya");
		Employee internEmployee = new InternEmployee("Arvind");

		EmployeeFormatter formatter = new EmployeeFormatter();
		EmployeeFileSaver fileSaver = new EmployeeFileSaver("employee.txt");

		EmployeeService service = new EmployeeService(formatter, fileSaver);

		service.save(fullTimeEmployee);
		service.save(contractEmployee);
		service.save(internEmployee);
	}
}
```

### ✅ Benefits of This Inheritance Design + Orchestrator

| Principle          | Applied How?                                                 |
| ------------------ | ------------------------------------------------------------ |
| SRP                | Each class has one reason to change                          |
| Open to extension  | Add new Employee types easily                                |
| Testability        | EmployeeService can be unit tested separately                |
| Maintainability    | Change file saving logic without touching Employee hierarchy |
| Clean Architecture | Domain, formatting, and persistence layers stay separate     |

> **🎯 SRP is not about using fewer classes — it’s about giving each class a focused, single responsibility.**

## Conclusion

---

When inheritance enters the picture, it becomes even easier to accidentally violate SRP.
The temptation to **“just add a method to the base class”** grows — but that creates fragile and tightly coupled hierarchies.

By separating:

- Domain logic (Employee hierarchy)
- Formatting (EmployeeFormatter)
- Persistence (EmployeeFileSaver)
- Workflow orchestration (EmployeeService)

…we create a **flexible, modular, and scalable system**.

This structure also prepares the foundation for upcoming SOLID principles like **OCP, LSP, and DIP**, and later for advanced design patterns.

---

### 🔗 What’s Next?

In the final part of SRP, we’ll enhance the design further with:

- Enums for type safety
- Structured logging
- A production-ready SRP-compliant version

👉 **[Final Enhancements to SRP →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_4_srp-example3)**

We’ll see how enum improves type safety, why structured logging matters, and wrap up with a testable, production-ready SRP-compliant codebase.

---

> 📝 **Takeaway**:
>
> - Inheritance makes SRP violations easier — keep base classes focused
> - Never mix domain, formatting, and persistence logic in one class
> - Subclasses should only contain behavior unique to that subtype
> - Composition (Formatter + Saver + Service) helps preserve SRP
> - A clean separation of responsibilities leads to a scalable, testable architecture
