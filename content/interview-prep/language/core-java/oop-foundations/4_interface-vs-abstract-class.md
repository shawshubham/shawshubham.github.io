---
title: "Interface vs Abstract Class"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-104"
  phase: "Core"
  topic: "OOP Foundations"
  round: "Technical"
  company: ""
  tags: ["oop", "interface", "abstract-class", "inheritance", "design"]
---

## 1. Short Answer (Interview Style)

---

> **An interface defines a contract that classes must implement, while an abstract class provides a partial implementation that subclasses can extend. A class can implement multiple interfaces but can extend only one abstract class. Interfaces are used for capability or behavior contracts, while abstract classes are used for shared base classes with common state and behavior.**

---

## 2. Why This Question Matters

---

This is a very common interview question and tests whether you understand:

- abstraction
- inheritance design
- multiple inheritance in Java
- API design
- interface-based architecture

This question is often followed by:

- Composition vs Inheritance
- IS-A vs HAS-A
- OOP pillars

---

## 3. What is an Interface?

---

An **interface** defines a contract that a class must implement.

It specifies **what a class must do**, but not necessarily how it does it.

Modern Java interfaces can contain:

- abstract methods
- default methods
- static methods
- private methods
- constants (public static final fields)

---

### 3.1 Abstract Methods in Interface

```java
interface PaymentService {
    void pay(double amount);
}
```

Any class implementing this interface must implement pay().

---

### 3.2 Default Methods in Interface

Default methods allow interfaces to provide method implementation.

```java
interface PaymentService {
    void pay(double amount);

    default void validate(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }
}
```

A class implementing this interface **may override** the default method, but it is not required.

Interfaces can have **multiple default methods**.

### Why default methods were introduced?

Default methods were introduced mainly to allow **interfaces to evolve without breaking existing implementations**.

---

### 3.3 Static Methods in Interface

Static methods belong to the interface itself.

```java
interface PaymentService {
    static void log(String message) {
        System.out.println(message);
    }
}
```

Called as:

```java
PaymentService.log("Payment started");
```

Interfaces can have **multiple static methods**.

---

### 3.4 Private Methods in Interface

Originally (Java 8), interfaces got:

- default methods
- static methods

But suppose you have multiple default methods and they share some logic. You would end up duplicating code.

To avoid duplication, Java 9 introduced **private methods in interfaces**.

So private methods are used to **reuse code inside the interface itself**.

Example

```java
interface PaymentService {

    default void processPayment(double amount) {
        validate(amount);
        System.out.println("Processing payment");
    }

    default void refund(double amount) {
        validate(amount);
        System.out.println("Refunding payment");
    }

    private void validate(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Invalid amount");
        }
    }
}
```

Here, the `validate()` method is used internally by the interface and is not exposed to implementing classes.

#### Summary:

- Private methods are helper methods inside interfaces
- Used by default and static methods
- Cannot be overridden
- Not visible to implementing classes
- Used to avoid code duplication and improve encapsulation

#### Key idea:

- Interface defines the contract
- Class provides the implementation

This is used for **loose coupling and abstraction**.

---

## 4. What is an Abstract Class?

---

An **abstract class** is a class that cannot be instantiated and may contain:

- abstract methods (no implementation)
- concrete methods (with implementation)
- instance variables
- constructors
- protected/private methods

### Example

```java
abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void eat() {
        System.out.println(name + " eats");
    }

    public abstract void makeSound();
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " barks");
    }
}
```

Here abstract class provides:

- shared state (name)
- constructor
- common behavior (eat())
- abstract behavior (makeSound())

---

## 5. Key Differences Between Interface and Abstract Class

---

| Feature               | Interface                            | Abstract Class                     |
| --------------------- | ------------------------------------ | ---------------------------------- |
| Multiple inheritance  | Yes (implements multiple interfaces) | No (extends only one class)        |
| Constructors          | No                                   | Yes                                |
| Instance variables    | Only constants (public static final) | Can have instance variables        |
| Method implementation | Default & static methods allowed     | Can have concrete methods          |
| Access modifiers      | Methods are public by default        | Can have protected/private methods |
| Purpose               | Contract / capability                | Base class with shared logic       |

---

## 6. Multiple Inheritance in Java

---

Java does not support multiple inheritance of classes:

```java
class A {}
class B {}
class C extends A, B {} // Not allowed
```

But Java supports multiple inheritance using interfaces:

```java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    public void fly() {}
    public void swim() {}
}
```

This is one of the main reasons interfaces exist.

---

## 7. Why Abstract Classes Still Exist (Important Interview Point)

---

Even though interfaces now support **default and static methods**, abstract classes are still needed because interfaces cannot fully replace abstract classes.

Abstract classes are still useful when:

- subclasses share common **instance state**
- subclasses need **constructors**
- subclasses need **protected helper methods**
- there is a strong **class hierarchy**
- subclasses share **base implementation**

### Important design distinction:

- **Interface → Contract**
- **Abstract Class → Shared State + Shared Implementation**

This is a very important interview point.

---

## 8. When Should We Use Interface vs Abstract Class?

---

### Use Interface when:

- you want to define a contract
- multiple classes should implement the same behavior
- classes are not related in hierarchy
- you want multiple inheritance
- you want loose coupling

Examples:

- Comparable
- Runnable
- PaymentService
- Repository
- Strategy pattern

---

### Use Abstract Class when:

- classes share common state and behavior
- there is a strong IS-A relationship
- you want to provide base implementation
- you need constructors
- you want to share code

Examples:

- Abstract Animal class
- Abstract Employee class
- Abstract Controller
- Abstract Repository base class

---

## 9. Real World Design Example

---

A very common design pattern is:

- Interface → defines contract
- Abstract class → provides base implementation
- Concrete class → final implementation

### Example

```java
interface PaymentService {
    void pay(double amount);
}

abstract class BasePaymentService implements PaymentService {
    protected void logPayment(double amount) {
        System.out.println("Logging payment: " + amount);
    }
}

class CardPaymentService extends BasePaymentService {
    public void pay(double amount) {
        logPayment(amount);
        System.out.println("Paid using card: " + amount);
    }
}
```

This is a very common enterprise design.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between interface and abstract class?

Answer like this:

> An interface defines a contract that classes must implement, while an abstract class provides a base class with partial implementation and shared state. A class can implement multiple interfaces but can extend only one abstract class. Interfaces are used for defining capabilities and loose coupling, while abstract classes are used when multiple related classes share common state or behavior.

---

## Final One-Line Difference (Very Useful in Interviews)

> **Interface = Contract**  
> **Abstract Class = Base Class with Shared State + Implementation**
