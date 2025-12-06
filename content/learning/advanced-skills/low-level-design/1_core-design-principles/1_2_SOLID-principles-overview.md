---
title: "SOLID Principles"
description: "Learn the SOLID Principles — five foundational object-oriented design principles to build maintainable, scalable, and modular software systems."
keywords:
  - low level design
  - solid principles
  - object-oriented design
  - software design principles
  - clean architecture
  - faang interview preparation
weight: 2
date: 2025-11-28
layout: "topic-content"
---

# SOLID Principles: The Foundation of Maintainable Software Design

---

Software design isn't just about writing code — it's about writing **clean, extensible, and maintainable** code. The **SOLID principles**, introduced by Robert C. Martin (Uncle Bob), offer a proven foundation for designing high-quality, modular systems.

> ✅ These five principles promote separation of concerns, reduce code smells, and enhance reusability.

- **S — Single Responsibility Principle (SRP)**
- **O — Open-Closed Principle (OCP)**
- **L — Liskov Substitution Principle (LSP)**
- **I — Interface Segregation Principle (ISP)**
- **D — Dependency Inversion Principle (DIP)**

Let’s break down each one with real-world examples:

## ​1. Single Responsibility Principle (SRP)

---

**"A class should have only one reason to change."**  
The Single Responsibility Principle states that a class should only have one responsibility or function. If a class is handling multiple responsibilities, it becomes harder to maintain and debug.

### 🔴 Violating SRP:

```java
class Report {
    public void generateReport() {
        // Logic to generate report
    }
    public void saveToFile(String filename) {
        // Logic to save report to a file
    }
    public void printReport() {
        // Logic to print report
    }
}
```

👉 Problem: The Report class is doing too much — logic, persistence, and output.

### ​✅ Following SRP:

```java
class ReportGenerator {
    public void generateReport() {
        // Logic to generate report
    }
}
class FileSaver {
    public void saveToFile(String filename, ReportGenerator report) {
        // Logic to save report
    }
}
class ReportPrinter {
    public void printReport(ReportGenerator report) {
        // Logic to print report
    }
}
```

👉 Solution: Each class handles one responsibility only — easier to maintain and extend.

## 2. Open-Closed Principle (OCP)

---

**"Software entities should be open for extension, but closed for modification."**  
You should be able to add new functionality without changing existing, tested code, thus preventing unintended bugs.

### 🔴 Violating OCP

```java
class PaymentProcessor {
    public void processPayment(String paymentType) {
        if (paymentType.equals("CreditCard")) {
            // Credit card payment logic
        } else if (paymentType.equals("PayPal")) {
            // PayPal payment logic
        }
    }
}
```

👉 Problem: Adding a new method like UPI requires modifying this class.

### ✅ Following OCP

```java
interface PaymentMethod {
    void pay();
}
class CreditCardPayment implements PaymentMethod {
    public void pay() {
        // Credit card payment logic
    }
}
class PayPalPayment implements PaymentMethod {
    public void pay() {
        // PayPal payment logic
    }
}
class PaymentProcessor {
    public void processPayment(PaymentMethod paymentMethod) {
        paymentMethod.pay();
    }
}
```

👉 Solution: New payment types can be added via new classes, no changes to PaymentProcessor.

## 3. Liskov Substitution Principle (LSP)

---

**"Derived classes must be substitutable for their base classes without affecting the correctness of the program."**  
This principle ensures that a subclass should be able to replace its parent class without affecting the application's behavior.

### 🔴 Violating LSP

```java
class Rectangle {
    int width, height;
    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
}
class Square extends Rectangle {
    public void setWidth(int width) {
        this.width = width;
        this.height = width;
    }
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}
```

👉 Problem: Square violates the expected behavior of Rectangle.

### ✅ Following LSP

```java
interface Shape {
    int getArea();
}
class Rectangle implements Shape {
    private int width, height;
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    public int getArea() {
        return width * height;
    }
}
class Square implements Shape {
    private int side;
    public Square(int side) {
        this.side = side;
    }
    public int getArea() {
        return side * side;
    }
}
```

👉 Solution: Both shapes now follow expected behavior without breaking substitutability.

## 4. Interface Segregation Principle (ISP)

---

**"Clients should not be forced to depend on interfaces they do not use."**  
Instead of having a large interface with multiple methods, we should split it into smaller, more specific interfaces.

### 🔴 Violating ISP

```java
interface Worker {
    void work();
    void eat();
}
class Robot implements Worker {
    public void work() {
        // Robot working
    }
    public void eat() {
        // Robots don't eat!
    }
}
```

👉 Problem: Robot is forced to implement eat() unnecessarily.

### ✅ Following ISP

```java
interface Workable {
    void work();
}
interface Eatable {
    void eat();
}
class Human implements Workable, Eatable {
    public void work() { /* Working */ }
    public void eat() { /* Eating */ }
}
class Robot implements Workable {
    public void work() { /* Robot working */ }
}
```

👉 Solution: Clients implement only what they need.

## 5. Dependency Inversion Principle (DIP)

---

**"Depend on abstractions, not on concrete implementations."**  
High-level modules should not depend on low-level modules but on abstractions.

### 🔴 Violating DIP

```java
class MySQLDatabase {
    public void connect() {
        // Connection logic
    }
}
class Application {
    private MySQLDatabase database;
    public Application() {
        database = new MySQLDatabase();
    }
}
```

👉 Problem: Application is tightly coupled to MySQLDatabase.

### ✅ Following DIP

```java
interface Database {
    void connect();
}
class MySQLDatabase implements Database {
    public void connect() {
        // Connection logic
    }
}
class Application {
    private Database database;
    public Application(Database database) {
        this.database = database;
    }
}
```

👉 Solution: Application can now use any Database implementation (e.g., MongoDB, Oracle, etc.)

## Conclusion

---

The SOLID principles are the cornerstone of professional software design. They help create systems that are:

- Easy to change and extend
- Modular and reusable
- Easy to test and debug

If you’re aiming for clean architecture or preparing for system design interviews — mastering SOLID is a must.

### 🔗 What’s Next?

Now that you’ve understood the overview of SOLID, let’s explore another essential design principle: DRY (Don’t Repeat Yourself).

👉 **[DRY Principle →](/learning/advanced-skills/low-level-design/1_core-design-principles/1_3_DRY-principle-overview)**  
We’ll see how to avoid duplication, promote reusability, and ensure consistent logic across your codebase.

---

> 📝 **Takeaway**:
>
> - SOLID = Five core principles of clean OOP design
> - Avoid code smells by following: SRP, OCP, LSP, ISP, DIP
> - Great for designing testable, maintainable, and scalable software
> - Essential for system design interviews and real-world development
