---
title: "Open/Closed Principle (OCP) in Java"
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

### 💼 Initial Requirements Recap:

- We designed an `EmployeeService` that saves employees to a file using `EmployeeFileSaver`.

### 🔁 Updated Requirement (New Business Need):

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
    private static final Logger logger = Logger.getLogger(EmployeeDBSaver.class.getName());

    public void saveToAPI(String formattedData) {
        //Simulate calling API call
        logger.info("Sending API Call: " + formattedData);
    }
}
```

### 3.2 The Problematic EmployeeService.java

```java
public class EmployeeService {
    private static Logger logger = Logger.getLogger(EmployeeService.class.getName());

    private EmployeeFormatter employeeFormatter;
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

| Violation             | Explanation                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Open/Closed Principle | EmployeeService is not closed for modification. Every new destination (e.g., Kafka, S3, FTP) will require: Adding a new dependencyModifying the save() methodAdding new switch cases |
| Constructor Explosion | You’ll need a new constructor per destination, or worse — manage nulls.                                                                                                              |
| Tight Coupling        | EmployeeService knows about all saver implementations, breaking separation of concerns.                                                                                              |
| Unscalable Design     | Adding more save destinations becomes error-prone and tedious.                                                                                                                       |

## 4. Refactored Design: Applying OCP ✅

---

To fix the earlier OCP violation, we now apply abstraction and polymorphism to allow the system to support new persistence mechanisms without modifying existing code.

We are also applying the **Strategy Design Pattern** — a **behavioral design pattern** that allows selecting an algorithm’s behavior at runtime. While we’ll explore Strategy in detail later, consider this an early hands-on illustration.

### 4.1 Define a Strategy Interface

We begin by creating a common interface to define the persistence behavior.

```java
// Abstraction to support saving to different destinations
public interface EmployeePersistenceStrategy {
    void save(String formattedData);
}
```

### 4.2 Implement File Persistence Strategy

```java
public class EmployeeFilePersistenceStrategy implements EmployeePersistenceStrategy{
    private final static Logger logger = Logger.getLogger(EmployeeFilePersistenceStrategy.class.getName());

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

    private EmployeeFormatter employeeFormatter;
    private EmployeePersistenceStrategy persistenceStrategy;

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

Now that you’ve understood in details Single Responsibility Principle, let’s deep-dive into the next principle OCP.

👉 **[Open-Closed Principle (OCP) →](/learning/advanced-skills/low-level-design/1_core-design-principles/1_4_open-closed-principle)**
We’ll explore how to extend a system without modifying existing, working code — and refactor a business logic engine to apply OCP.

---

> 📝 **Takeaway**:
>
> - SRP = One reason to change = One responsibility
> - Applies to methods, classes, services, modules
> - Watch out for: large methods, utility classes, if/else jungles
> - Refactor step-by-step: split logic, formatters, and persistence
