---
title: "IS-A vs HAS-A"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-102"
  phase: "Core"
  topic: "OOP Foundations"
  round: "Technical"
  company: ""
  tags: ["oop", "inheritance", "composition", "is-a", "has-a", "design"]
---

## 1. Short Answer (Interview Style)

---

> **IS-A represents inheritance (a class extends or implements another type), while HAS-A represents composition (a class contains another class as a field). IS-A models a type hierarchy, whereas HAS-A models a relationship where one object uses or owns another object. In good design, composition (HAS-A) is often preferred over inheritance unless there is a strong type hierarchy.**

---

## 2. Why This Question Matters

---

This question tests whether you understand **object-oriented relationships and design decisions**, not just Java syntax.

Interviewers want to see if you:

- understand inheritance vs composition
- know when to use each
- understand design flexibility and coupling
- can model real-world relationships correctly

This question is often followed by:

- Composition vs Inheritance
- Interface vs Abstract class
- OOP pillars

---

## 3. What is an IS-A Relationship?

---

An **IS-A** relationship means:

> One class is a type of another class.

This is implemented using:

- `extends` (class inheritance)
- `implements` (interface implementation)

### Example — Class Inheritance

```java
class Animal {
    public void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal {
    public void bark() {
        System.out.println("Dog barks");
    }
}
```

Here:

> Dog **IS-A** Animal

So Dog inherits behavior from Animal.

---

### Example — Interface Implementation

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
```

Here:

> CardPaymentService **IS-A** PaymentService

So interface implementation also represents an **IS-A** relationship.

---

## 4. What is a HAS-A Relationship?

---

A **HAS-A** relationship means:

> One class contains another class as a member (field).

This is also called **composition**.

### Example

```java
class Engine {
    public void start() {
        System.out.println("Engine starts");
    }
}

class Car {
    private Engine engine;   // HAS-A relationship

    public Car() {
        engine = new Engine();
    }

    public void startCar() {
        engine.start();
        System.out.println("Car starts");
    }
}
```

Here:

> Car **HAS-A** Engine

Car does not extend Engine.
Car **uses** Engine.

---

## 5. IS-A vs HAS-A — Key Difference

---

| Relationship | Meaning | Implementation | Example |
|--------------|--------|---------------|--------|
| IS-A | One class is a type of another | extends / implements | Dog IS-A Animal |
| HAS-A | One class contains another | Composition (field/member) | Car HAS-A Engine |

---

## 6. When to Use IS-A vs HAS-A

---

This is the most important design part.

### Use IS-A when:

- there is a true type hierarchy
- subclass can replace parent class
- Liskov Substitution Principle is satisfied
- relationship is "is a type of"

Examples:

- Dog IS-A Animal
- Manager IS-A Employee
- ArrayList IS-A List

---

### Use HAS-A when:

- one class uses functionality of another
- relationship is "has a"
- you want flexible design
- you want to avoid tight coupling
- behavior should be changeable at runtime

Examples:

- Car HAS-A Engine
- Order HAS-A PaymentService
- User HAS-A Address

---

## 7. Why Composition (HAS-A) Is Often Preferred

---

In modern object-oriented design, **composition is often preferred over inheritance**.

Why?

### Inheritance problems

- tight coupling
- fragile base class problem
- difficult to change hierarchy
- cannot change parent at runtime
- deep inheritance trees become hard to maintain

### Composition advantages

- more flexible
- loosely coupled
- easier to change behavior
- easier to test
- follows "favor composition over inheritance" design principle

---

## 8. Example — Composition Is More Flexible

---

Instead of this inheritance design:

```java
class PetrolEngineCar extends Car {}
class DieselEngineCar extends Car {}
```

Better design using composition:

```java
interface Engine {
    void start();
}

class PetrolEngine implements Engine {
    public void start() {}
}

class DieselEngine implements Engine {
    public void start() {}
}

class Car {
    private Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }
}
```

Now engine type can change without changing Car hierarchy.

This is better design.

---

## 9. Interview Trick Question

---

Interviewers sometimes ask:

> Is inheritance always IS-A?

The correct answer is:

> Inheritance should represent an IS-A relationship. If it does not, inheritance is probably being misused and composition should be used instead.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between IS-A and HAS-A?

Answer like this:

> IS-A represents inheritance where one class is a type of another and is implemented using extends or implements. HAS-A represents composition where one class contains another class as a field. IS-A models type hierarchy, while HAS-A models usage or ownership relationship. In good object-oriented design, composition is often preferred over inheritance because it provides more flexibility and lower coupling.