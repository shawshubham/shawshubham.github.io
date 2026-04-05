---
title: "Composition vs Inheritance"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-103"
  phase: "Core"
  topic: "OOP Foundations"
  round: "Technical"
  company: ""
  tags: ["oop", "composition", "inheritance", "design", "is-a", "has-a"]
---

## 1. Short Answer (Interview Style)

---

> **Inheritance models an IS-A relationship where one class extends another, while Composition models a HAS-A relationship where a class contains another class as a member. Inheritance is used for type hierarchy and reuse, while Composition is used for flexibility and loose coupling. In modern object-oriented design, composition is often preferred over inheritance unless there is a strong IS-A relationship.**

---

## 2. Why This Question Matters

---

This is not just a Java syntax question. This is a **design question**.

Interviewers ask this to understand whether you:

- understand object relationships
- understand coupling and flexibility
- can design maintainable systems
- know when inheritance becomes dangerous
- understand "favor composition over inheritance"

This question often appears with:

- IS-A vs HAS-A
- Interface vs Abstract class
- OOP pillars

---

## 3. What is Inheritance?

---

Inheritance means one class **extends** another class and inherits its behavior.

This represents an **IS-A** relationship.

### Example

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

Dog inherits behavior from Animal.

### Interface inheritance also counts

```java
interface PaymentService {
    void pay(double amount);
}

class CardPaymentService implements PaymentService {
    public void pay(double amount) {}
}
```

Here:

> CardPaymentService **IS-A** PaymentService

So inheritance includes both:

- class inheritance (`extends`)
- interface inheritance (`implements`)

---

## 4. What is Composition?

---

Composition means a class **contains another class as a member**.

This represents a **HAS-A** relationship.

### Example

```java
class Engine {
    public void start() {
        System.out.println("Engine starts");
    }
}

class Car {
    private Engine engine; // composition

    public Car(Engine engine) {
        this.engine = engine;
    }

    public void startCar() {
        engine.start();
        System.out.println("Car starts");
    }
}
```

Here:

> Car **HAS-A** Engine

Car uses Engine instead of extending Engine.

---

## 5. Key Difference Between Composition and Inheritance

---

| Inheritance               | Composition                        |
| ------------------------- | ---------------------------------- |
| IS-A relationship         | HAS-A relationship                 |
| extends / implements      | object reference / member variable |
| Tight coupling            | Loose coupling                     |
| Compile-time relationship | Runtime flexibility                |
| Less flexible             | More flexible                      |
| Hierarchy-based reuse     | Behavior-based reuse               |

---

## 6. Why Composition is Often Preferred Over Inheritance

---

This is a very important design principle:

> **Favor composition over inheritance**

### Problems with inheritance

- tight coupling between parent and child
- fragile base class problem
- difficult to change hierarchy later
- deep inheritance trees become complex
- cannot change parent behavior at runtime

### Advantages of composition

- more flexible
- loosely coupled
- behavior can be changed at runtime
- easier to test
- easier to maintain
- supports dependency injection

---

## 7. Example — Inheritance vs Composition Design

---

### Bad inheritance design

```java
class PetrolCar extends Car {}
class DieselCar extends Car {}
class ElectricCar extends Car {}
```

This creates rigid hierarchy.

---

### Better composition design

```java
interface Engine {
    void start();
}

class PetrolEngine implements Engine {}
class DieselEngine implements Engine {}
class ElectricEngine implements Engine {}

class Car {
    private Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }
}
```

Now we can change engine without changing Car hierarchy.

This is better design.

---

## 8. When Should We Use Inheritance?

---

Use inheritance when:

- there is a true IS-A relationship
- subclass can fully replace parent
- behavior is shared and stable
- hierarchy makes logical sense

Examples:

- Dog extends Animal
- Manager extends Employee
- ArrayList implements List

---

## 9. When Should We Use Composition?

---

Use composition when:

- one class uses another class
- behavior should be changeable
- you want loose coupling
- you want flexible design
- relationship is HAS-A

Examples:

- Car has Engine
- Order has PaymentService
- User has Address

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between composition and inheritance?

Answer like this:

> Inheritance represents an IS-A relationship where one class extends another and forms a type hierarchy. Composition represents a HAS-A relationship where one class contains another class as a member. Inheritance leads to tighter coupling and hierarchical reuse, while composition provides more flexibility and loose coupling. In modern object-oriented design, composition is often preferred over inheritance unless there is a strong IS-A relationship.
