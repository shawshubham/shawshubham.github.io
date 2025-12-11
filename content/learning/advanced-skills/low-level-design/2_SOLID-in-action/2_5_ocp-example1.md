---
title: "Open/Closed Principle (OCP) - Saving Data to Different Destinations"
description: "Learn the Open/Closed Principle (OCP) in Java with real-world examples. See how to extend behavior without modifying existing code using interfaces and polymorphism."
keywords:
  - open closed principle java
  - OCP solid principle
  - software design principles
  - low level design java
  - extendable code design
  - java clean code best practices
  - employee management design pattern
weight: 5
date: 2025-12-01
layout: "topic-content"
---

## 1. What is the Open/Closed Principle (OCP)?

---

> **Definition**: _Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification._

The **Open/Closed Principle** ensures that you can add new functionality without changing existing code — minimizing the risk of breaking something that already works.

This principle is key for:

- **✅ maintainability**
- **✅ Minimizing regression bugs**
- **✅ Scalable system architecture**
- **✅ Supporting team parallelism in large projects**

## 2. Design Problem: Saving Employee Data to Different Destinations

---

In the SRP chapter, we split responsibilities into clean collaborators (`Employee`, `EmployeeFormatter`, `EmployeeFileSaver`, `EmployeeService`).  
In this OCP chapter, we build on that design and focus on **how to add new saving options without editing the existing service.**

### Initial Requirements Recap:

- We designed an `EmployeeService` that saves employees to a file using `EmployeeFileSaver`.

### Updated Requirement (New Business Need):

HR now wants to support **multiple data storage options**:

- ✅ Save to a local file
- ✅ Save to a database
- ✅ Save to a remote REST API
- 🔜 More destinations in the future (Kafka, S3, etc.)

👉 Your system should support these additions **without modifying** the existing core logic.

## 3. Initial Design: Violating OCP ❌

---

### Initial Thought (But Wrong Approach)

An intuitive first step might be:

> **“Let’s just create separate classes for each save logic – one for file, one for DB, one for API.”**

While this feels modular, the actual orchestration violates the Open/Closed Principle.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/ocp/example1/bad">See Code in Git Repo</a>
</div>

### 3.1 Saver Implementations

1. `EmployeeFileSaver.java`

```java
public class EmployeeFileSaver {
    private final static Logger logger = Logger.getLogger(EmployeeFileSaver.class.getName());
    private final String filePath;

    public EmployeeFileSaver(String filePath) {
        this.filePath = filePath;
    }

    public void saveToFile(String formattedData) throws IOException {
        logger.info("Saving employee data to " + filePath);
        try (FileWriter writer = new FileWriter(filePath, true)) {
            writer.write(formattedData + "\n");
        }
        logger.info("Saved employee data to " + filePath);
    }
}
```

2. `EmployeeDBSaver.java` (simulated)

```java
public class EmployeeDBSaver {
    private static final Logger logger = Logger.getLogger(EmployeeDBSaver.class.getName());

    public void saveToDB(String formattedData) {
        //Simulate saving to DB
        logger.info("Saved data to DB: " + formattedData);
    }
}
```

3. `EmployeeRemoteAPISaver.java` (simulated)

```java
public class EmployeeRemoteAPISaver {
    private static final Logger logger = Logger.getLogger(EmployeeRemoteAPISaver.class.getName());

    public void saveToAPI(String formattedData) {
        //Simulate calling API call
        logger.info("Sending API Call: " + formattedData);
    }
}
```

### 3.2 The Problematic EmployeeService.java

```java
public class EmployeeService {
    private static final Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private final EmployeeFormatter employeeFormatter;
    private EmployeeFileSaver employeeFileSaver;
    private EmployeeDBSaver employeeDBSaver;
    private EmployeeRemoteAPISaver employeeRemoteAPISaver;

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeeFileSaver employeeFileSaver) {
        this.employeeFormatter = employeeFormatter;
        this.employeeFileSaver = employeeFileSaver;
    }

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeeDBSaver employeeDBSaver) {
        this.employeeFormatter = employeeFormatter;
        this.employeeDBSaver = employeeDBSaver;
    }

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeeRemoteAPISaver employeeRemoteAPISaver) {
        this.employeeFormatter = employeeFormatter;
        this.employeeRemoteAPISaver = employeeRemoteAPISaver;
    }

    public void save(Employee employee, String destinationType) {
        String formatted = employeeFormatter.formatForHR(employee);
        switch (destinationType) {
            case "FILE":
                try {
                    employeeFileSaver.saveToFile(formatted);
                } catch (IOException e) {
                    logger.severe("Error saving employee data: " + e.getMessage());
                    // optionally re-throw or handle differently in production
                }
                break;
            case "DB":
                employeeDBSaver.saveToDB(formatted);
                break;
            case "REMOTE":
                employeeRemoteAPISaver.saveToAPI(formatted);
                break;
            default:
                throw new IllegalArgumentException("Unknown destination type");
        }

    }
}
```

### 3.3 Main Client

```java
public class MainClient {
    private static final Logger logger = Logger.getLogger(MainClient.class.getName());

    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham");
        Employee contractEmployee = new ContractEmployee("Ashwarya");
        Employee internEmployee = new InternEmployee("Arvind");

        EmployeeFormatter formatter = new EmployeeFormatter();

        EmployeeFileSaver fileSaver = new EmployeeFileSaver("employee.txt");
        EmployeeDBSaver dbSaver = new EmployeeDBSaver();
        EmployeeRemoteAPISaver remoteAPISaver = new EmployeeRemoteAPISaver();

        EmployeeService fileSaverService = new EmployeeService(formatter, fileSaver);
        EmployeeService dbSaverService = new EmployeeService(formatter, dbSaver);
        EmployeeService remoteAPISaverService = new EmployeeService(formatter, remoteAPISaver);

        logger.info("Saving employees...");
        fileSaverService.save(fullTimeEmployee, "FILE");
        dbSaverService.save(contractEmployee, "DB");
        remoteAPISaverService.save(internEmployee, "REMOTE");
        logger.info("Finished saving employees.");
    }
}
```

### 🚨 What’s wrong here?

| Violation             | Explanation                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Open/Closed Principle | Every new destination (Kafka, S3, FTP) forces you to modify `EmployeeService` and add new `case` branches. |
| Constructor Explosion | Multiple constructors per saver lead to confusing initialization and potential `null` dependencies.        |
| Tight Coupling        | `EmployeeService` knows about every concrete saver class.                                                  |
| Non-localized change  | A simple requirement like “add Kafka” results in changes across multiple files and code paths.             |

## 4. Refactored Design: Applying OCP ✅

---

To fix the earlier OCP violation, we now apply abstraction and polymorphism to allow the system to support new persistence mechanisms without modifying existing code.

We are also applying the **Strategy Design Pattern** — a **behavioral design pattern** that allows selecting an algorithm’s behavior at runtime. While we’ll explore Strategy in detail later, consider this an early hands-on illustration.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designprinciple/solid/ocp/example1/good">See Code in Git Repo</a>
</div>

### 4.1 Define a Strategy Interface

We begin by creating a common interface to define the persistence behavior.

```java
// Abstraction to support saving to different destinations
// This is our "Strategy" interface for persistence behavior
public interface EmployeePersistenceStrategy {
    void save(String formattedData);
}
```

### 4.2 Implement File Persistence Strategy

```java
public class EmployeeFilePersistenceStrategy implements EmployeePersistenceStrategy{
    private static final Logger logger = Logger.getLogger(EmployeeFilePersistenceStrategy.class.getName());

    private final String filePath;

    public EmployeeFilePersistenceStrategy(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public void save(String formattedData) {
        logger.info("Saving employee data to " + filePath);
        try (FileWriter writer = new FileWriter(filePath, true)) {
            writer.write(formattedData + "\n");
        } catch (IOException e) {
            logger.severe("File saved failed: " + e.getMessage());
        }
        logger.info("Saved employee data to " + filePath);
    }
}
```

### 4.3 Implement Database Persistence Strategy (Simulated)

```java
public class EmployeeDBPersistenceStrategy implements EmployeePersistenceStrategy {
    private static final Logger logger = Logger.getLogger(EmployeeDBPersistenceStrategy.class.getName());

    @Override
    public void save(String formattedData) {
        //Simulate saving to DB
        logger.info("Saved data to DB: " + formattedData);
    }
}
```

### 4.4 Implement Remote API Persistence Strategy (Simulated)

```java
public class EmployeeAPIPersistenceStrategy implements EmployeePersistenceStrategy{
    private static final Logger logger = Logger.getLogger(EmployeeAPIPersistenceStrategy.class.getName());

    @Override
    public void save(String formattedData) {
        //Simulate calling API call
        logger.info("Sending API Call: " + formattedData);
    }
}
```

### 4.5 Refactor EmployeeService to Use the Strategy

```java
public class EmployeeService {
    private static Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private final EmployeeFormatter employeeFormatter;
    private final EmployeePersistenceStrategy persistenceStrategy;

    public EmployeeService(EmployeeFormatter employeeFormatter,
                           EmployeePersistenceStrategy persistenceStrategy) {
        this.employeeFormatter = employeeFormatter;
        this.persistenceStrategy = persistenceStrategy;
    }

    public void save(Employee employee) {
        String formatted = employeeFormatter.formatForHR(employee);
        persistenceStrategy.save(formatted);
        logger.log(Level.INFO, "Saved employee {0}", employee);
    }
}
```

### 4.6 Final Usage: OCP in Action

```java
public class MainClient {
    private static final Logger logger = Logger.getLogger(MainClient.class.getName());

    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham");
        Employee contractEmployee = new ContractEmployee("Ashwarya");
        Employee internEmployee = new InternEmployee("Arvind");

        EmployeeFormatter formatter = new EmployeeFormatter();

        EmployeeService fileSaverService = new EmployeeService(formatter, new EmployeeFilePersistenceStrategy("employee.txt"));
        EmployeeService dbSaverService = new EmployeeService(formatter, new EmployeeDBPersistenceStrategy());
        EmployeeService remoteAPISaverService = new EmployeeService(formatter, new EmployeeAPIPersistenceStrategy());

        logger.info("Saving employees...");
        fileSaverService.save(fullTimeEmployee);
        dbSaverService.save(contractEmployee);
        remoteAPISaverService.save(internEmployee);
        logger.info("Finished saving employees.");
    }
}
```

### ✅ Benefits of This Refactored Design

| Benefit                        | How It’s Achieved                                            |
| ------------------------------ | ------------------------------------------------------------ |
| Open for Extension             | Add new persistence strategies without touching old code     |
| Closed for Modification        | Existing classes (e.g., EmployeeService) remain untouched    |
| Follows SRP                    | Each class has one responsibility — formatting, saving, etc. |
| Adheres to Strategy Pattern    | Delegates behavior via interface at runtime                  |
| Highly Testable & Maintainable | Each strategy can be unit tested independently               |

> ### Quick Insight: Strategy vs OCP
>
> The Strategy Pattern is a means to achieve Open/Closed Principle — by defining a family of algorithms (strategies) and making them interchangeable.

## Conclusion

---

The Open/Closed Principle helps create robust, scalable, and maintainable software by reducing the cost of change. Instead of bloating old classes with new logic, we extend via interfaces and abstractions.

### 🔗 What’s Next?

In this example, we applied OCP to the **persistence layer** using a strategy interface and multiple saver implementations.

Next, we’ll look at a **different axis of change**: evolving business rules per employee type (e.g., salary calculation, benefits, contract rules) without touching the existing, stable code.

👉 **[OCP Example 2: Extending Business Rules per Employee Type →](/learning/advanced-skills/low-level-design/2_SOLID-in-action/2_6_ocp-example2)**

We’ll start from a naive design with `if/else` and `switch` explosions and then refactor to a clean, OCP-compliant design using dedicated strategies per employee type.

---

> 📝 **Takeaway**:
>
> - **OCP** means your stable classes (like `EmployeeService`) are _closed for modification_ but **open for extension** through new implementations.
> - You achieve OCP in practice by depending on **abstractions** (e.g., `EmployeePersistenceStrategy`) and plugging in new behaviors via **polymorphism** instead of editing existing code.
> - Large `switch`/`if-else` blocks on “type” or “destination” are a strong smell that your design is not OCP-friendly.
> - Combine **SRP + OCP**: first separate responsibilities (formatter, saver, service), then extract interfaces around the parts that change most frequently.
> - A good litmus test: when requirements change, you should **add a class**, not keep reopening and editing the same core service.
