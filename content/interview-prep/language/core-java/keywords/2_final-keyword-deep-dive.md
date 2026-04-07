---
title: "final Keyword Deep Dive"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-211"
  phase: "Core"
  topic: "Keywords"
  round: "Technical"
  company: ""
  tags: ["final", "java", "final variable", "final method", "final class"]
---

## 1. Short Answer (Interview Style)

---

> **The final keyword in Java is used to restrict modification. A final variable cannot be reassigned, a final method cannot be overridden, and a final class cannot be inherited. It is commonly used to create constants, prevent unwanted inheritance, and design immutable classes.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- immutability in Java
- inheritance restrictions
- method overriding rules
- constants and references
- final vs finally vs finalize

This is a very common Core Java interview question.

---

## 3. final Variable

---

A **final variable** can be assigned only once.

### Example

```java
final int x = 10;
// x = 20; // Compile-time error
```

Once assigned, it cannot be reassigned.

This is commonly used for constants.

---

## 4. final Reference Variable

---

This is a very important interview point.

If a reference variable is final, the **reference cannot change**, but the object may still change.

```java
final List<String> names = new ArrayList<>();
names.add("Java");
names.add("Spring");

// names = new ArrayList<>(); // Compile-time error
```

So:

- object mutation may still be allowed
- reassignment of reference is not allowed

This confuses many developers and is commonly asked in interviews.

---

## 5. final Method

---

A **final method** cannot be overridden by a subclass.

```java
class Parent {
    final void show() {
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    // void show() {} // Compile-time error
}
```

Why use final method?

- to prevent overriding
- to preserve logic
- to enforce fixed behavior in subclasses

---

## 6. final Class

---

A **final class** cannot be extended.

```java
final class Utility {
}

// class Child extends Utility {} // Compile-time error
```

Common example:

- `String` is a final class

Why String is final:

- security
- immutability
- prevents behavior changes by inheritance

---

## 7. final Blank Variable

---

A blank final variable is a final variable declared without initialization.
It must be initialized exactly once, usually in constructor.

```java
class Employee {
    final int id;

    Employee(int id) {
        this.id = id;
    }
}
```

This is useful when value is known only at object creation time.

---

## 8. final vs finally vs finalize

---

This is one of the most common interview questions.

| Keyword / Method | Meaning |
|------------------|---------|
| final | Restricts modification |
| finally | Block used in exception handling |
| finalize() | Deprecated method called before garbage collection |

### Example of finally

```java
try {
    System.out.println("Try block");
} finally {
    System.out.println("Finally block");
}
```

---

## 9. final and Immutability

---

Using final helps in building immutable classes.

Example:

```java
final class Employee {
    private final int id;
    private final String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
```

But important point:

> final alone does not guarantee immutability.

We also need:

- no setters
- private fields
- defensive copying for mutable fields

---

## 10. Important Interview Questions

---

### Can final variable be changed?
Answer: No, once assigned it cannot be reassigned.

### Can final object be modified?
Answer: Yes, object state can change if object is mutable.

### Can final method be overloaded?
Answer: Yes.

### Can final method be overridden?
Answer: No.

### Can final class be inherited?
Answer: No.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is final keyword in Java?

Answer like this:

> The final keyword in Java is used to restrict modification. A final variable cannot be reassigned, a final method cannot be overridden, and a final class cannot be extended. It is commonly used to create constants, prevent inheritance, and help design immutable classes. However, a final reference means the reference cannot change, not necessarily the object state.