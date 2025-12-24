---
title: "SRP – Basics and Initial Refactoring"
description: "Learn the Single Responsibility Principle (SRP) in Java with real-world examples and refactoring steps to improve modularity, maintainability, and testability."
keywords:
  - single responsibility principle java
  - SRP solid principle
  - java clean code
  - low level design in java
  - object oriented design interview
  - software engineering best practices
weight: 2
layout: "topic-content"
date: 2025-12-10
---

## 1. What is the Single Responsibility Principle (SRP)?

---

> **Definition:** _A class (or module, or method) should have only one reason to change._

The **Single Responsibility Principle** helps developers write cleaner, more testable, and easier-to-maintain code by separating concerns. Also, avoids common anti-patterns seen in interviews and production systems

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

## 3. Initial Design: SRP Violation (Bad Example)

---

Let’s look at a simple implementation of the `Employee` class that **seems okay at first glance** but actually breaks the Single Responsibility Principle.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/srp/example1/bad">See Code in Git Repo</a>
</div>

#### 1. Employee class : Model + Logic = ❌ SRP Violation

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

#### 2. Main Class : Acting as Client

```java
//What client has to do!
public class MainClient {
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

The Employee class is responsible for:

- Holding employee data
- Formatting employee data
- Writing to a file
- Handling IO exceptions

It now has three reasons to change:

1. If **employee attributes change**
2. If **HR changes their formatting requirements**
3. If **file writing logic changes**

> ❌ SRP Violation: Class has too many responsibilities and becomes fragile.

## 4. Refactored Design: Applying SRP (Good Example)

---

Let’s separate these responsibilities using **dedicated classes**.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/srp/example1/good">See Code in Git Repo</a>
</div>

#### 1. Employee Class: Pure Domain Model

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

#### 2. Formatter Class — Dedicated to Presentation Logic

```java
//Responsible for formatting employee data as required by HR
public class EmployeeFormatter {
    public String formatForHR(Employee emp) {
        return emp.getName() + " - " + emp.getType().toUpperCase();
    }
}
```

#### 3. File Saver — Dedicated to Persistence Logic

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

#### 4. EmployeeService — The Orchestrator

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

#### 5. MainClient — Clean and Simple

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

| Class             | Responsibility       |
| ----------------- | -------------------- |
| Employee          | Holds data           |
| EmployeeFormatter | Handles formatting   |
| EmployeeFileSaver | Saves to file        |
| EmployeeService   | Coordinates workflow |

## Conclusion

---

The **Single Responsibility Principle** lays the foundation for modular and scalable design.  
It helps you avoid long, fragile classes that try to do too much — a common issue in both interview questions and enterprise systems.

✅ By breaking down responsibilities into smaller, single-purpose classes:

- You improve modularity
- You simplify testing
- You enhance maintainability for future changes

This sets the tone for clean, principle-driven architecture — and prepares us for more advanced concepts.

---

### 🔗 What’s Next?

👉 **[SRP with Inheritance & Subtypes →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_3_srp-example2)**  
Learn how to apply SRP when designing class hierarchies like `FullTimeEmployee`, `Intern`, and `ContractEmployee`.

---

> 📝 **Takeaway**:
>
> - SRP = One responsibility = One reason to change
> - Avoid mixing formatting, saving, and domain logic in the same class
> - Start refactoring early in the design phase to keep codebase clean
