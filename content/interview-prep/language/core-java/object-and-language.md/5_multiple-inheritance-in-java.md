---
title: "Multiple Inheritance in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-226"
  phase: "Core"
  topic: "Object & Language"
  round: "Technical"
  company: ""
  tags: ["multiple inheritance", "java", "interfaces", "diamond problem", "oop"]
---

## 1. Short Answer (Interview Style)

---

> **Java does not support multiple inheritance with classes, meaning a class cannot extend more than one class. This is mainly to avoid ambiguity and complexity such as the diamond problem. However, Java does support multiple inheritance through interfaces, because interfaces provide abstraction without maintaining conflicting object state in the same way as classes.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- inheritance rules in Java
- ambiguity in OOP design
- the diamond problem
- interface-based multiple inheritance

This is a very common Core Java interview question.

---

## 3. What is Multiple Inheritance?

---

Multiple inheritance means a class inherits from more than one parent.

Example conceptually:

```java
class A {
}

class B {
}

class C extends A, B { // Not allowed in Java
}
```

Java does **not allow** this with classes.

---

## 4. Why Java Does Not Support Multiple Inheritance with Classes

---

The main reason is **ambiguity**.

Suppose both parent classes have the same method:

```java
class A {
    void show() {
        System.out.println("A");
    }
}

class B {
    void show() {
        System.out.println("B");
    }
}
```

If Java allowed this:

```java
class C extends A, B {
}
```

Then:

```java
new C().show();
```

Which `show()` should be called?

This ambiguity is called the **Diamond Problem**.

---

## 5. Diamond Problem

---

Diamond problem happens when a child class inherits the same method from multiple parents, causing confusion about which implementation should be used.

Conceptually:

```text
      A
     / \
    B   C
     \ /
      D
```

If both `B` and `C` inherit `show()` from `A`, and `D` inherits from both, ambiguity arises.

This is one major reason Java avoids multiple inheritance with classes.

---

## 6. Does Java Support Multiple Inheritance at All?

---

Yes — through **interfaces**.

```java
interface A {
    void show();
}

interface B {
    void display();
}

class C implements A, B {
    public void show() {
        System.out.println("show");
    }

    public void display() {
        System.out.println("display");
    }
}
```

Here one class can implement multiple interfaces.

So:

- multiple inheritance of **classes** → not allowed
- multiple inheritance of **interfaces** → allowed

---

## 7. What About Default Methods in Interfaces?

---

Java 8 introduced default methods in interfaces, which can also create ambiguity.

Example:

```java
interface A {
    default void show() {
        System.out.println("A");
    }
}

interface B {
    default void show() {
        System.out.println("B");
    }
}

class C implements A, B {
    @Override
    public void show() {
        System.out.println("Resolved in C");
    }
}
```

In this case, Java forces the child class to override the method and resolve the conflict explicitly.

---

## 8. Important Interview Points

---

### Does Java support multiple inheritance?

Answer: Not with classes, but yes with interfaces.

### Why does Java not support multiple inheritance with classes?

Answer: To avoid ambiguity and complexity like the diamond problem.

### How does Java support multiple inheritance?

Answer: Through interfaces.

### What if two interfaces have same default method?

Answer: Implementing class must override and resolve the conflict.

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> Does Java support multiple inheritance?

Answer like this:

> Java does not support multiple inheritance with classes because it can create ambiguity and complexity, especially the diamond problem. However, Java does support multiple inheritance through interfaces, where a class can implement multiple interfaces. If multiple interfaces provide the same default method, the implementing class must explicitly override it.
