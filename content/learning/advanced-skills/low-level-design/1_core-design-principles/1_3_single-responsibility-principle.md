---
title: "Single Responsibility Principle (SRP) in Java"
description: "Understand the Single Responsibility Principle (SRP) in Java with real-world examples and how to refactor classes to make your software modular and maintainable."
keywords:
  - single responsibility principle java
  - SRP solid principle
  - software design principles example
  - low level design in java
  - java clean code
  - object oriented design interview
  - software engineering best practices
weight: 3
date: 2025-11-28
layout: "topic-content"
---

## 1. What is the Single Responsibility Principle (SRP)?

---

> **Definition:** _A class (or module, or method) should have only one reason to change._

The **Single Responsibility Principle** helps developers write cleaner, more testable, and easier-to-maintain code by separating concerns.

It is the first and arguably the most foundational principle in the SOLID family. SRP emphasizes that **each software unit (class, method, service, etc.) should be responsible for only one thing** — and therefore, should change only when that responsibility changes.

## 2. Design Problem: Employee Management System

---

Let’s start with a basic design problem to see SRP in action.

### **Basic Requirements:**

1. The system should support different types of employees:

   - Full-time
   - Contract
   - Interns

2. It should provide functionality to **save employee data** in a **specific format required by HR** — into a file system.

### 2.1 Initial Design: SRP Violation (Bad Example)

Let’s look at a simple implementation of the `Employee` class that **seems okay at first glance** but actually breaks the Single Responsibility Principle.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designprinciple/srp/example1/bad">See Code in Git Repo</a>
</div>

```java
import java.io.FileWriter;
import java.io.IOException;

public class Employee {
    private String name;
    private String type; // Employee type: Full-time, Contract, Intern

    public Employee(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public void save() {
        // Format according to HR
        String formatted = name + " - " + type.toUpperCase();

        // Save to file
        try (FileWriter writer = new FileWriter("employees.txt", true)) {
            writer.write(formatted + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

```java
//What client has to do!
public class Client {
    public static void main(String args[]) {
        Employee fullTimeEmployee = new Employee("Shubham", "FULLTIME");
        Employee contractEmployee = new Employee("Ashwarya", "CONTRACT");
        Employee internEmployee = new Employee("Arvind", "INTERN");

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

### 🚨 What’s wrong here?

The Employee class is doing too much:

- Managing data
- Formatting for HR
- Handling file operations

```java
// ❌ Violates SRP: Employee handles multiple responsibilities (data + formatting + persistence)
public class Employee {
    private String name;
    private String type; // Employee type: Full-time, Contract, Intern

    public Employee(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public void save() {
        // ❌ Formatting logic: should ideally be handled by a separate class
        String formatted = name + " - " + type.toUpperCase();

        // ❌ Persistence logic: writing to a file is a separate responsibility
        try (FileWriter writer = new FileWriter("employees.txt", true)) {
            writer.write(formatted + "\n");
        } catch (IOException e) {
            e.printStackTrace(); // ❌ SRP violation: exception handling is also a separate concern
        }
    }
}
```

It now has three reasons to change:

1. If **employee attributes change**
2. If **HR changes their formatting requirements**
3. If **file writing logic changes**

This clearly violates SRP.

### 2.2 Refactored Design: Applying SRP (Good Example)

Let’s separate responsibilities.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designprinciple/srp/example1/good">See Code in Git Repo</a>
</div>

```java
//Pure data holder
public class Employee {
    private String name;
    private String type;

    public Employee(String name, String type){
        this.name = name;
        this.type = type;
    }

    public String getName() { return name; }
    public String getType() { return type; }
}
```

```java
//Responsible for formatting employee data as required by HR
public class EmployeeFormatter {
    public String formatForHR(Employee emp) {
        return emp.getName() + " - " + emp.getType().toUpperCase();
    }
}
```

```java
import java.io.FileWriter;
import java.io.IOException;

//Handles persistence logic
public class EmployeeFileSaver {
    public void saveToFile(String formattedData) throws IOException{
    	try (FileWriter writer = new FileWriter("employees.txt", true)) {
            writer.write(formattedData + "\n");
        }
    }
}
```

```java
//Coordinator/Orchestrator
public class EmployeeService {
 private final EmployeeFormatter formatter = new EmployeeFormatter();
 private final EmployeeFileSaver fileSaver = new EmployeeFileSaver();

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

```java
//Application
public class MainClient {
	public static void main(String args []) {
		EmployeeService service = new EmployeeService();
		Employee employee = new Employee("Shubham", "FULLTIME");

		service.save(employee);
	}
}
```

### ✅ Result:

👉 This design now adheres to SRP — responsibilities are clearly separated into:

- Entity (`Employee`)
- Formatter (`EmployeeFormatter`)
- Persistence Handler (`EmployeeFileSaver`)
- Coordinator (`EmployeeManager`)

## 3. Requirement Change & SRP Under Inheritance

---

> ❓ What if each type of employee (FullTime, Contract, Intern) starts to have its own unique responsibilities or behaviors?

In such a case, the current implementation will break, we might think of using inheritance to define different employee types. But how we organize responsibilities (like saving, formatting, etc.) will determine whether we still respect the Single Responsibility Principle (SRP).

## 3.1 Initial Design: SRP Violation (Bad Example)

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designprinciple/srp/example2/bad">See Code in Git Repo</a>
</div>

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

```java
public class FullTimeEmployee extends Employee {
    public FullTimeEmployee(String name) {
        super(name);
    }

    @Override
    public String getType() {
        return "FullTime";
    }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

```java
public class ContractEmployee extends Employee {
    public ContractEmployee(String name) {
        super(name);
    }

    @Override
    public String getType() {
        return "Contract";
    }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

```java
public class InternEmployee extends Employee {
    public InternEmployee(String name) {
        super(name);
    }

    @Override
    public String getType() {
        return "Intern";
    }

    // You can later add methods like assignBonus(), manageTeam(), etc.
}
```

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

This design might appear flexible due to inheritance, but:

- The save() method is violating SRP by doing:
  - Business logic (e.g., returning employee type)
  - Presentation logic (formatting for HR)
  - Infrastructure logic (file persistence)
- If any of these responsibilities change, all subclasses are affected.

This tightly couples unrelated responsibilities and creates fragile inheritance.

### 3.2 Refactored Design — Applying SRP with Subtypes

We now refactor so each class handles one responsibility only, even when we introduce subtypes.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designprinciple/srp/example2/good">See Code in Git Repo</a>
</div>

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

```java
public class FullTimeEmployee extends Employee {

	public FullTimeEmployee(String name) {
		super(name);
	}

	@Override
	public String getType() {
		return "FULLTIME";
	}

	// Future: add methods like assignBonus()
}
```

```java
public class ContractEmployee extends Employee {

	public ContractEmployee(String name) {
		super(name);
	}

	@Override
	public String getType() {
		return "CONTRACT";
	}

	// Future: add methods like extendContract()
}
```

```java
public class InternEmployee extends Employee {
	public InternEmployee(String name) {
		super(name);
	}

	@Override
	public String getType() {
		return "INTERN";
	}

	// Future: add methods like assignMentor()
}
```

```java
//Responsible for formatting employee data as required by HR
public class EmployeeFormatter {
	public String formatForHR(Employee emp) {
		return emp.getName() + " - " + emp.getType().toUpperCase();
	}
}
```

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

```java
public class Client {
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

| Principle         | Applied How?                                                 |
| ----------------- | ------------------------------------------------------------ |
| SRP               | Each class has one reason to change                          |
| Open to extension | Add new Employee types easily                                |
| Testability       | EmployeeService can be unit tested separately                |
| Maintainability   | Change file saving logic without touching Employee hierarchy |

> 🎯 **Think of a kitchen appliance —** a toaster that also brews coffee and makes smoothies. Sounds cool, but if one thing
> breaks, the whole machine is useless. That’s what SRP helps you avoid in code.

## 4. Optional Enhancements

---

### 4.1 Use Enum for Employee Type

> Why Enum?
>
> - Avoids typos like "FULLTIME" vs "Fulltime"
> - Allows compiler checks and switch statements
> - Self-documenting and strongly typed

```java
public enum EmployeeType {
    FULL_TIME, CONTRACT, INTERN
}

public abstract class Employee {
    private String name;
    private EmployeeType type;

    private EmployeeFormatter formatter = new EmployeeFormatter();
    private EmployeeFileSaver fileSaver = new EmployeeFileSaver();

    public Employee(String name, EmployeeType type){
        this.name = name;
        this.type = type;
    }

    public String getName() { return name; }
    public EmployeeType getType() { return type; }

    public void save() {
        String formatted = formatter.formatForHR(this);
        fileSaver.saveToFile(formatted);
    }
}

public class EmployeeFormatter {
    public String formatForHR(Employee emp) {
        return emp.getName() + " - " + emp.getType().name();
    }
}
```

### 4.2 Use Logger

Instead of using System.out.println() or System.err.println() for debugging or error reporting, it’s a better practice to use a proper logging mechanism like Java’s built-in java.util.logging.Logger.

> **Why use Logger?**
>
> - Provides structured logging with log levels like INFO, WARNING, SEVERE, etc.
> - Makes it easier to filter and analyze logs in production systems.
> - Can be easily integrated with log monitoring tools or external logging frameworks like Log4j, SLF4J, etc.
> - Supports advanced features like log formatting, file output, and log rotation.

This is especially useful when moving from simple CLI apps to enterprise-level systems where observability and debugging become critical.

You can start with java.util.logging.Logger and later switch to more flexible libraries like **SLF4J with Logback** when using frameworks like Spring.

```java
import java.util.logging.Logger;

// Handles persistence logic
public class EmployeeFileSaver {
    private static final Logger logger = Logger.getLogger(EmployeeFileSaver.class.getName());
    private final String filePath;

    public EmployeeFileSaver(String filePath) {
        this.filePath = filePath;
    }

    public void saveToFile(String formattedData) throws IOException {
        try (FileWriter writer = new FileWriter(filePath, true)) {
            writer.write(formattedData + "\n");
            logger.info("Employee data saved successfully.");
        }
    }
}
```

## 5. Final Refactored Code (After Applying SRP)

---

> 📝 **Note**:
>
> - For simplicity and demonstration purposes, all classes are placed within a single `.java` file.
> - In a real-world project, each class would typically be defined in its own file following proper package structure and naming conventions.
> - This layout is intentional to keep the focus on understanding the Single Responsibility Principle (SRP).

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/srp/finalrefactoredversion">See Code in Git Repo</a>
</div>

```java
public enum EmployeeType {
	FULLTIME, CONTRACT, INTERN;
}
```

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

	public abstract EmployeeType getType(); // enforced behaviour
}
```

```java
public class FullTimeEmployee extends Employee {

	public FullTimeEmployee(String name) {
		super(name);
	}

	@Override
	public EmployeeType getType() {
		return EmployeeType.FULLTIME;
	}

	// Future: add methods like assignBonus()
}
```

```java
public class ContractEmployee extends Employee {

	public ContractEmployee(String name) {
		super(name);
	}

	@Override
	public EmployeeType getType() {
		return EmployeeType.CONTRACT;
	}

	// Future: add methods like extendContract()
}
```

```java
public class InternEmployee extends Employee {
	public InternEmployee(String name) {
		super(name);
	}

	@Override
	public EmployeeType getType() {
		return EmployeeType.INTERN;
	}

	// Future: add methods like assignMentor()
}
```

```java
//Responsible for formatting employee data as required by HR
public class EmployeeFormatter {
	public String formatForHR(Employee emp) {
		return emp.getName() + " - " + emp.getType().name();
	}
}
```

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

```java
import java.util.logging.Logger;

//Employee Orchestrator
public class EmployeeService {
	private static final Logger logger = Logger.getLogger(EmployeeService.class.getName());

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
			logger.severe("Error saving employee data: " + e.getMessage());
			// optionally re-throw or handle differently in production
		}
	}
}
```

```java
import java.util.logging.Logger;

public class MainClient {
	private static final Logger logger = Logger.getLogger(Client.class.getName());

	public static void main(String args[]) {
		Employee fullTimeEmployee = new FullTimeEmployee("Shubham");
		Employee contractEmployee = new ContractEmployee("Ashwarya");
		Employee internEmployee = new InternEmployee("Arvind");

		EmployeeFormatter formatter = new EmployeeFormatter();
		EmployeeFileSaver fileSaver = new EmployeeFileSaver("employee.txt");

		EmployeeService service = new EmployeeService(formatter, fileSaver);

		logger.info("Saving employees...");
		service.save(fullTimeEmployee);
		service.save(contractEmployee);
		service.save(internEmployee);
		logger.info("Finished saving employees.");
	}
}
```

> ### 🧪 Bonus: SRP Improves Testability
>
> Because each class has a clear responsibility:
>
> - `EmployeeFormatter` can be unit tested independently
> - `EmployeeService` can be tested with mock/stub versions of `EmployeeFileSaver`
> - You can simulate different `Employee` types via inheritance and test behaviors separately
>   This modularity is one of SRP’s biggest hidden superpowers!
>   📌 We’ll cover detailed testing strategy in a separate tutorial.

## 6. SRP Applies Beyond Classes

---

SRP is not just for classes — it applies to:

| Unit          | Example                                             |
| ------------- | --------------------------------------------------- |
| Methods       | Method doing validation + DB call + formatting      |
| Classes       | Class doing logic + I/O + formatting                |
| Packages      | Module mixing domain logic with infrastructure code |
| Microservices | Service managing business logic + auth + metrics    |

💡 SRP = Separation of Concerns at every level.

## 7. How to Spot SRP Violations

---

Here are red flags that your code might be violating SRP:

#### 1. Monster Methods

- A single method is 50+ lines long and performs multiple steps
- 📉 Hard to test, hard to debug

#### 2. Utility/Helper God Classes

- StringUtils, EmployeeHelper, etc. that have dozens of unrelated methods
- 📉 These are often SRP violation magnets

#### 3. Too Many If/Else Chains

- When a class/method handles behavior for multiple types
- 📉 Indicates responsibilities are not delegated properly (e.g., Strategy Pattern may help)

#### 4. Tightly Coupled Code

- Formatting + logic + storage all bundled into one
- 📉 Hard to isolate bugs or change one part without affecting the rest

## Conclusion

---

The Single Responsibility Principle enables modular, testable, and maintainable software. By giving each class, method, or component a single, clear role, we reduce complexity and create cleaner systems.

### 🔗 What’s Next?

Now that you’ve understood in details Single Responsibility Principle, let’s deep-dive into the next principle OCP.

👉 **[Open-Closed Principle (OCP) →](/learning/advanced-skills/low-level-design/1_core-design-principles/1_4_open-close-principle)**
We’ll explore how to extend a system without modifying existing, working code — and refactor a business logic engine to apply OCP.

---

> 📝 **Takeaway**:
>
> - SRP = One reason to change = One responsibility
> - Applies to methods, classes, services, modules
> - Watch out for: large methods, utility classes, if/else jungles
> - Refactor step-by-step: split logic, formatters, and persistence
