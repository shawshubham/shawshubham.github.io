---
title: "SRP – Enhancements: Enum, Logging & Final Touches"
description: "Strengthen your understanding of the Single Responsibility Principle by using enums, structured logging, and preparing a production-ready design."
keywords:
  - single responsibility principle java
  - enums in java
  - logging best practices
  - java srp clean code
  - low level design example
  - java maintainable design
weight: 4
date: 2025-12-10
layout: "topic-content"
---

## 1. Towards a Production-Ready Design

---

Now that we’ve broken down responsibilities in our `Employee` Management System using SRP, let's take the final steps to **make the code more robust and extensible**:

- Replace string-based `type` with a **Java Enum**
- Replace `System.err` with **structured logging**
- Structure the saving logic in a dedicated class (`EmployeeFileSaver`) so it can be easily replaced by an interface later when we apply OCP.

These improvements make the system:

- Safer (with type safety via enums)
- Easier to debug and monitor (via logging)
- More extensible and testable (via abstractions)

## 2. Code Enhancements for SRP

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/srp/finalrefactoredversion">See Code in Git Repo</a>
</div>

### ✅ 1. Enum for Employee Type

> Why Enum?
>
> - Avoids typos like "FULLTIME" vs "Fulltime"
> - Allows compiler checks and switch statements
> - Self-documenting and strongly typed

```java
public enum EmployeeType {
    FULLTIME,
	CONTRACT,
	INTERN
}
```

### ✅ 2. Updated Employee Class

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

### ✅ 3. Updated Employee Subclasses

```java
public class FullTimeEmployee extends Employee {
	public FullTimeEmployee(String name) { super(name); }

	@Override public EmployeeType getType() { return EmployeeType.FULLTIME; }

	// Future: add methods like assignBonus()
}
```

```java
public class ContractEmployee extends Employee {
	public ContractEmployee(String name) { super(name); }

	@Override public EmployeeType getType() { return EmployeeType.CONTRACT; }

	// Future: add methods like extendContract()
}
```

```java
public class InternEmployee extends Employee {
	public InternEmployee(String name) { super(name); }

	@Override public EmployeeType getType() { return EmployeeType.INTERN; }

	// Future: add methods like assignMentor()
}
```

### ✅ 4. Updated Formatter Class

```java
//Responsible for formatting employee data as required by HR
public class EmployeeFormatter {
	public String formatForHR(Employee emp) {
		return emp.getName() + " - " + emp.getType().name();
	}
}
```

### ✅ 5. EmployeeFileSaver Class : No Change

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

### ✅ 6. Use Structured Logging

Instead of using System.out.println() or System.err.println() for debugging or error reporting, it’s a better practice to use a proper logging mechanism like Java’s built-in java.util.logging.Logger.

> **Why use Logger?**
>
> - Provides structured logging with log levels like INFO, WARNING, SEVERE, etc.
> - Makes it easier to filter and analyze logs in production systems.
> - Can be easily integrated with log monitoring tools or external logging frameworks like Log4j, SLF4J, etc.
> - Supports advanced features like log formatting, file output, and log rotation.

This is especially useful when moving from simple CLI apps to enterprise-level systems where observability and debugging become critical.

You can start with java.util.logging.Logger and later switch to more flexible libraries like **SLF4J with Logback** when using frameworks like Spring.

### ✅ 7. Updated EmployeeService class

```java
import java.io.IOException;
import java.util.logging.Logger;
import static java.util.logging.Level.SEVERE;

//Employee Orchestrator
public class EmployeeService {
    private static Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private EmployeeFormatter employeeFormatter;
    private EmployeeFileSaver employeeFileSaver;

    public EmployeeService(EmployeeFormatter employeeFormatter, EmployeeFileSaver employeeFileSaver) {
        this.employeeFormatter = employeeFormatter;
        this.employeeFileSaver = employeeFileSaver;
    }

    public void save(Employee employee) {
        String formatted = employeeFormatter.formatForHR(employee);
        try {
            employeeFileSaver.saveToFile(formatted);
        } catch (IOException e) {
            logger.log(SEVERE, "Error saving employee data for " + employee.getName(), e);
            throw new RuntimeException("Failed to save employee data", e); // signal failure to callers
        }
    }
}
```

### ✅ 8. Updated MainClient class

```java
import java.util.logging.Logger;

public class MainClient {
	private static final Logger logger = Logger.getLogger(MainClient.class.getName());

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
>
> 📌 We’ll cover detailed testing strategy in a separate tutorial.

## 3. SRP Applies Beyond Classes

---

SRP is not just for classes — it applies to:

| Unit          | Example                                             |
| ------------- | --------------------------------------------------- |
| Methods       | Method doing validation + DB call + formatting      |
| Classes       | Class doing logic + I/O + formatting                |
| Packages      | Module mixing domain logic with infrastructure code |
| Microservices | Service managing business logic + auth + metrics    |

💡 SRP = Separation of Concerns at every level.

## 4. How to Spot SRP Violations

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

We’ve now completed a full SRP-compliant design:

- Domain class with clean data modeling
- Presentation separated via `Formatter`
- Persistence isolated in its own saver class, setting the stage for introducing an extensible saver interface under OCP.
- Logic orchestrated by a `Service`
- Clean logging for observability

This foundation sets the stage for applying the next SOLID principle — **Open/Closed Principle (OCP)** — where we’ll allow extension of saving logic without touching the existing implementation.

---

### 🔗 What’s Next?

Now that you’ve understood in details Single Responsibility Principle, let’s deep-dive into the next principle OCP.

👉 **[Open-Closed Principle (OCP) in action →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_5_ocp-example1)**
We’ll explore how to extend a system without modifying existing, working code — and refactor a business logic engine to apply OCP.

---

> 📝 **Takeaway**:
>
> - Enums and structured logging turn a demo-friendly design into something **production-ready**.
> - Small, single-purpose classes (`Employee`, `Formatter`, `Saver`, `Service`) are easier to test, evolve, and monitor than one god class.
> - Designing with SRP-friendly abstractions today makes it much easier to apply **OCP** tomorrow when requirements change.
