---
title: "Overloading vs Overriding"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-105"
  phase: "Core"
  topic: "OOP Foundations"
  round: "Technical"
  company: ""
  tags: ["oop", "overloading", "overriding", "polymorphism", "java"]
---

## 1. Short Answer (Interview Style)

---

> **Method overloading is compile-time polymorphism where multiple methods have the same name but different parameter lists. Method overriding is runtime polymorphism where a subclass provides a specific implementation of a method already defined in the parent class. Overloading is resolved at compile time, while overriding is resolved at runtime using dynamic method dispatch.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- polymorphism
- compile-time vs runtime behavior
- inheritance
- dynamic method dispatch

This is one of the most common Core Java interview questions.

---

## 3. What is Method Overloading?

---

Method overloading means:

> Multiple methods with the same name but different parameter lists in the same class.

It represents **compile-time polymorphism**.

### Example

```java
class Calculator {

    public int add(int a, int b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public double add(double a, double b) {
        return a + b;
    }
}
```

Here:

- Same method name → `add`
- Different parameters → number/type of parameters

This is **method overloading**.

---

### Important rules for overloading

Method overloading is determined by:

- number of parameters
- type of parameters
- order of parameters

Return type alone **cannot** differentiate overloaded methods.

```java
int add(int a, int b)
double add(int a, int b) // Not allowed
```

---

## 4. What is Method Overriding?

---

Method overriding means:

> A subclass provides a specific implementation of a method already defined in the parent class.

It represents **runtime polymorphism**.

### Example

```java
class Animal {
    public void makeSound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks");
    }
}
```

Here:

> Dog overrides the method of Animal.

---

## 5. Runtime Polymorphism Example

---

```java
Animal animal = new Dog();
animal.makeSound();
```

Output:

```
Dog barks
```

Even though reference type is `Animal`, the method of `Dog` is called.

This happens due to **runtime polymorphism** or **dynamic method dispatch**.

---

## 6. Key Differences Between Overloading and Overriding

---

| Feature                | Overloading               | Overriding                  |
| ---------------------- | ------------------------- | --------------------------- |
| Occurs in              | Same class                | Parent & Child class        |
| Method name            | Same                      | Same                        |
| Parameters             | Must be different         | Must be same                |
| Return type            | Can be different          | Must be same (or covariant) |
| Access modifier        | No restriction            | Cannot reduce visibility    |
| Compile time / Runtime | Compile time              | Runtime                     |
| Polymorphism           | Compile-time polymorphism | Runtime polymorphism        |
| Inheritance required   | No                        | Yes                         |

---

## 7. Important Rules for Method Overriding

---

When overriding a method:

- Method name must be same
- Parameters must be same
- Return type must be same or subclass (covariant return type)
- Access modifier cannot be more restrictive
- Cannot override static methods (they are hidden, not overridden)
- Cannot override final methods
- Constructors cannot be overridden

---

## 8. Static Method — Overloading vs Overriding Trick

---

Static methods can be **overloaded**, but they are **not overridden**.

If a child class defines a static method with the same signature as the parent class, it is called **method hiding**, not method overriding.

### Example — Method Hiding

```java
class Parent {
    static void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child show");
    }
}
```

Here:

- `Child.show()` does not override `Parent.show()`
- it hides it
- static methods are resolved using the **reference type / class name**, not the actual object type

So:

```java
Parent.show(); // Parent show
Child.show();  // Child show
```

---

### Important Interview Trap

```java
Parent p = new Child();
p.show();
```

Output:

```java
Parent show
```

Why?

Because static methods are resolved at **compile time**, based on the **reference type**, not at runtime based on the actual object.

This is very different from instance methods, where overriding gives runtime polymorphism.

---

### Another Important Point

If the child class does not define its own `show()` method, the child class can still access the inherited static method.

```java
class Parent {
    static void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
}
```

Now this is valid:

```java
Child.show();
```

Output:

```java
Parent show
```

This works because static methods are inherited by subclasses, even though they are not overridden.

So the key rule is:

> Static methods are inherited, but if redefined in the child class, they are hidden rather than overridden.

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between method overloading and method overriding?

Answer like this:

> Method overloading is compile-time polymorphism where multiple methods have the same name but different parameter lists in the same class. Method overriding is runtime polymorphism where a subclass provides a specific implementation of a method defined in the parent class. Overloading is resolved at compile time, while overriding is resolved at runtime using dynamic method dispatch.
