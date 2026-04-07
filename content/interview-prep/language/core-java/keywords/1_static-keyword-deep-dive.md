---
title: "static Keyword Deep Dive"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-209"
  phase: "Core"
  topic: "Keywords"
  round: "Technical"
  company: ""
  tags: ["static", "java", "static variable", "static method", "static block"]
---

## 1. Short Answer (Interview Style)

---

> **The static keyword in Java is used for memory management and belongs to the class rather than the object. Static members are shared across all objects of the class. Static can be used with variables, methods, blocks, and nested classes.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- class vs object memory
- shared variables
- static methods
- class loading
- static blocks

This is a very common Core Java interview question.

---

## 3. Static Variable

---

A **static variable** belongs to the class, not to individual objects.

So all objects share the same static variable.

### Example

```java
class Employee {
    int id;
    String name;
    static String company = "ABC";
}
```

Here:

- id and name belong to object
- company belongs to class
- All employees share the same company

Memory concept:

```
Static variables → Method Area
Instance variables → Heap
```

---

## 4. Static Method

---

A **static method** belongs to the class and can be called without creating an object.

```java
class MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}

MathUtils.add(5, 10);
```

### Important Rules

Static methods:

- Cannot access non-static variables directly
- Cannot access non-static methods directly
- Can access static variables
- Can call other static methods

Because static methods do not belong to objects.

---

## 5. Static Block

---

Static block is used to initialize static variables.

It runs **only once when the class is loaded**.

```java
class Test {
    static {
        System.out.println("Static block executed");
    }
}
```

Execution order:

```
Static block → Main method → Constructor
```

---

## 6. Static Nested Class

---

Java allows static nested classes.

```java
class Outer {
    static class Inner {
        void display() {
            System.out.println("Static nested class");
        }
    }
}
```

Static nested class does not require outer class object.

---

## 7. Static vs Non-Static Summary

---

| Static                  | Non-Static          |
| ----------------------- | ------------------- |
| Belongs to class        | Belongs to object   |
| Shared among objects    | Separate per object |
| Loaded once             | Created per object  |
| Accessed via class name | Accessed via object |

---

## 8. Important Interview Questions

---

### Can static method access non-static variable?

Answer: No.

### Can static method call non-static method?

Answer: No.

### Can non-static method access static variable?

Answer: Yes.

### Can we override static method?

Answer: No, static methods are hidden, not overridden.

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is static keyword in Java?

Answer like this:

> The static keyword in Java is used for memory management and indicates that a member belongs to the class rather than the object. Static variables are shared across all objects, static methods can be called without creating objects, static blocks are used for class initialization, and static nested classes can be created without outer class instances.
