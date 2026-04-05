---
title: "OOP Pillars"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-101"
  phase: "Core" # Core | Stretch | Advanced
  topic: "OOP Foundations"
  round: "Technical"
  company: "" # optional
  tags:
    [
      "oop",
      "encapsulation",
      "abstraction",
      "inheritance",
      "polymorphism",
      "object-oriented-programming",
    ]
---

## 1. Short Answer (Interview Style)

---

> **The four pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism. Encapsulation means bundling data and behavior together and controlling access. Abstraction means exposing only essential behavior while hiding implementation details. Inheritance allows one class to reuse and extend another. Polymorphism allows the same interface or method call to behave differently depending on the object type.**

---

## 2. Why This Question Matters

---

This is one of the most common Core Java interview questions because it checks whether you understand the foundations of object-oriented design.

Interviewers use it to see whether you can:

- explain core OOP concepts clearly
- connect theory to practical Java examples
- distinguish related concepts that are often confused
- build a base for deeper questions such as:
  - `Interface vs Abstract class`
  - `Composition vs Inheritance`
  - `Overloading vs Overriding`
  - `IS-A vs HAS-A`

---

## 3. What Are the Four Pillars of OOP?

---

The four pillars are:

1. **Encapsulation**
2. **Abstraction**
3. **Inheritance**
4. **Polymorphism**

A simple memory trick is:

> **Protect data, hide complexity, reuse behavior, enable flexibility.**

That roughly maps to:

- Encapsulation → protect data
- Abstraction → hide complexity
- Inheritance → reuse behavior
- Polymorphism → enable flexibility

---

## 4. Encapsulation

---

Encapsulation means bundling:

- data
- and the methods that operate on that data

inside one unit, usually a class.

It also means controlling access to internal state.

### Example

```java
class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

### Why this is encapsulation

- `balance` is hidden using `private`
- outside code cannot modify it directly
- all updates happen through controlled methods like `deposit()`

### Key idea

> Encapsulation is about **data hiding and controlled access**.

---

## 5. Abstraction

---

Abstraction means showing only the essential behavior of an object and hiding internal implementation details.

The goal is to reduce complexity for the caller.

### Example

```java
interface PaymentService {
    void pay(double amount);
}

class CardPaymentService implements PaymentService {
    @Override
    public void pay(double amount) {
        System.out.println("Processing card payment of " + amount);
    }
}
```

The caller only knows:

```java
paymentService.pay(500.0);
```

It does not need to know:

- how authentication works
- how the gateway is called
- how retries are handled internally

### Key idea

> Abstraction is about **hiding implementation complexity and exposing only what matters**.

---

## 6. Inheritance

---

Inheritance allows one type to acquire behavior or contract from another type.

In Java, inheritance appears in two important forms:

### 1. Class inheritance using extends

A class can inherit fields and methods from another class.

```java
class Employee {
    public void work() {
        System.out.println("Employee is working");
    }
}

class Manager extends Employee {
    public void conductMeeting() {
        System.out.println("Manager is conducting a meeting");
    }
}
```

Here:

- `Manager` extends `Employee`
- `Manager` inherits `work()`
- `Manager` can also add its own specialized behavior

This represents an **IS-A** relationship:

> Manager IS-A Employee

---

### 2. Interface inheritance / contract inheritance using implements

A class can also inherit a contract by implementing an interface.

```java
interface PaymentService {
    void pay(double amount);
}

class CardPaymentService implements PaymentService {
    @Override
    public void pay(double amount) {
        System.out.println("Paying by card: " + amount);
    }
}
```

Here:

- `CardPaymentService` implements `PaymentService`
- the class agrees to provide the behavior defined by the interface
- this also forms an IS-A relationship in type terms

So:

> CardPaymentService IS-A PaymentService

---

### Key idea

Inheritance in Java is not only about extends.

It also includes interface-based type inheritance through implements.

That is why inheritance is really about:

- reuse
- specialization
- and type relationship

---

### Important note

- extends is usually used for class-to-class inheritance
- implements is used when a class fulfills an interface contract

In real design discussions, both contribute to the broader inheritance model.

---

## 7. Polymorphism

---

Polymorphism means:

> the same method call or the same type reference can lead to different behavior depending on the context or actual object type

In Java, polymorphism is usually discussed in two forms:

1. **Compile-time (static) polymorphism**
2. **Runtime (dynamic) polymorphism**

---

### 7.1 Compile-time / Static Polymorphism — Overloading

This happens when multiple methods have the same name but different parameter lists.

```java
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

Here:

- method name is the same: add
- parameters are different
- the compiler decides which method to call

That is why this is called **compile-time polymorphism**.

---

### 7.2 Runtime / Dynamic Polymorphism — Overriding

This happens when a subclass or implementation class provides its own version of a method already defined in a parent class or interface.

### Example

```java
class Animal {
    public void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Cat meows");
    }
}
```

```java
Animal a1 = new Dog();
Animal a2 = new Cat();

a1.sound();
a2.sound();
```

Output:

```text
Dog barks
Cat meows
```

Same method call:

```java
sound()
```

Here:

- the reference type is Animal
- the actual object type is Dog or Cat
- the method chosen at runtime depends on the actual object

That is **runtime polymorphism**.

---

### 7.3 Polymorphism with Interface Reference

This is one of the most important Java interview forms of polymorphism.

```java
interface PaymentService {
    void pay(double amount);
}

class CardPaymentService implements PaymentService {
    @Override
    public void pay(double amount) {
        System.out.println("Card payment: " + amount);
    }
}

class UpiPaymentService implements PaymentService {
    @Override
    public void pay(double amount) {
        System.out.println("UPI payment: " + amount);
    }
}
```

```java
PaymentService service1 = new CardPaymentService();
PaymentService service2 = new UpiPaymentService();

service1.pay(500.0);
service2.pay(700.0);
```

Output:

```text
Card payment: 500.0
UPI payment: 700.0
```

Here:

- the reference type is the interface: PaymentService
- the actual object type changes
- the same method call pay() behaves differently

This is a very strong example of **runtime polymorphism through interfaces**.

---

### Key idea

Polymorphism is not just “many forms” in a vague sense.

In Java interview language:

- **overloading** → compile-time / static polymorphism
- **overriding** → runtime / dynamic polymorphism
- base-class or interface reference + subclass/implementation object → practical runtime polymorphism

---

## 8. Putting All Four Pillars Together

---

Consider a payment system:

- **Encapsulation** → payment data is kept private inside service or domain objects
- **Abstraction** → caller only sees `pay()`
- **Inheritance** → different payment service types may extend a common base
- **Polymorphism** → `pay()` behaves differently for card, UPI, or wallet payment

This is why the four pillars are not isolated theory.
They often appear together in real systems.

---

## 9. Common Interview Confusions

---

### Encapsulation vs Abstraction

This is one of the most common confusions.

- **Encapsulation** → how we protect and organize data
- **Abstraction** → how we hide complexity from the caller

### Inheritance vs Polymorphism

- **Inheritance** → mechanism for reuse / hierarchy
- **Polymorphism** → behavior variation through common type/interface

### OOP pillars are not Java-only

These are object-oriented concepts in general.
Java provides language mechanisms to implement them.

---

## 10. Real-World Interview Answer Style

---

If the interviewer asks only:

> What are the four pillars of OOP?

A strong concise answer is:

> The four pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism. Encapsulation is about hiding data and controlling access. Abstraction is about exposing only essential behavior and hiding implementation details. Inheritance allows one class to reuse and extend another. Polymorphism allows the same interface or method call to behave differently depending on the actual object.

Then, if needed, give one quick example for each.

---

## 11. Important Interview Points

---

Strong points to mention in interviews:

- encapsulation is not just wrapping variables inside a class; it also means controlling access properly
- abstraction is about reducing complexity for the caller
- inheritance models an `IS-A` relationship
- polymorphism is most commonly demonstrated through method overriding
- good design does not mean using inheritance everywhere
- in real systems, composition is often preferred over inheritance unless the hierarchy is truly strong

---

## 12. Interview Follow-up Questions

---

After asking **"What are the four pillars of OOP?"**, interviewers often ask related follow-ups.

### Common Follow-up Questions

| Follow-up Question                                     | What Interviewer Is Testing    |
| ------------------------------------------------------ | ------------------------------ |
| Encapsulation vs Abstraction?                          | Concept clarity                |
| Inheritance vs Composition?                            | Design maturity                |
| What is polymorphism in Java?                          | Runtime behavior understanding |
| How is polymorphism achieved?                          | Overriding / interfaces        |
| What is an `IS-A` relationship?                        | Inheritance reasoning          |
| Why is composition often preferred over inheritance?   | Design trade-offs              |
| Can you give a real-world example of all four pillars? | Applied understanding          |

---

## 13. Common Mistakes

---

Common mistakes developers make:

- defining encapsulation as only “put variables and methods in one class”
- confusing abstraction with encapsulation
- saying inheritance is always the best reuse mechanism
- explaining polymorphism only as overloading
- giving very theoretical definitions without examples

---

## 14. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are the four pillars of OOP?

Answer like this:

> The four pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism. Encapsulation means protecting internal state and exposing controlled access. Abstraction means hiding implementation details and exposing only essential behavior. Inheritance allows reuse and specialization through class hierarchies. Polymorphism allows the same method or interface to behave differently depending on the actual object type. Together, these pillars help build modular, reusable, and flexible systems.

This is a **strong interview answer**.
