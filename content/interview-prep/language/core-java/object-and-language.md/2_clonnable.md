---
title: "Cloneable in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-225"
  phase: "Core"
  topic: "Object & Language"
  round: "Technical"
  company: ""
  tags:
    ["cloneable", "clone", "shallow copy", "deep copy", "object copy", "java"]
---

## 1. Short Answer (Interview Style)

---

> **Cloneable is a marker interface in Java that indicates an object can be cloned using the clone() method. By default, clone() performs a shallow copy. To use it properly, a class must implement Cloneable and override the clone() method.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- object copying in Java
- shallow vs deep copy
- marker interfaces
- pitfalls of clone()

This is a common Core Java interview question.

---

## 3. What is Cloneable?

---

`Cloneable` is a **marker interface** (no methods).

It signals that the class allows cloning via `Object.clone()`.

If a class does NOT implement Cloneable and `clone()` is called, it throws:

```text
CloneNotSupportedException
```

---

## 4. Basic Usage of clone()

---

```java
class Employee implements Cloneable {
    int id;
    String name;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

Usage:

```java
Employee e1 = new Employee();
Employee e2 = (Employee) e1.clone();
```

---

## 5. Shallow Copy (Default Behavior)

---

By default, `clone()` performs a **shallow copy**.

- primitive fields → copied by value
- object references → copied as references

Example:

```java
class Address {
    String city;
}

class Employee implements Cloneable {
    Address address;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

Both original and cloned object will share the same Address reference.

---

## 6. Deep Copy (Custom Implementation)

---

To achieve deep copy, we must manually copy nested objects.

```java
class Employee implements Cloneable {
    Address address;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        Employee cloned = (Employee) super.clone();
        cloned.address = new Address();
        cloned.address.city = this.address.city;
        return cloned;
    }
}
```

Now both objects are fully independent.

---

## 7. Problems with clone() (Very Important)

---

`clone()` is often considered problematic:

- requires implementing Cloneable (marker interface)
- uses protected method in Object class
- can break encapsulation
- shallow copy by default
- handling deep copy is manual and error-prone

Because of these issues, many developers avoid clone().

---

## 8. Better Alternatives

---

Instead of clone(), prefer:

- copy constructor
- factory methods

Example:

```java
class Employee {
    int id;

    Employee(Employee other) {
        this.id = other.id;
    }
}
```

This is cleaner and more explicit.

---

## 9. Important Interview Questions

---

### What is Cloneable?

Answer: Marker interface indicating object can be cloned.

### What is shallow copy?

Answer: Copy where object references are shared.

### What is deep copy?

Answer: Copy where all nested objects are also copied.

### Why is clone() discouraged?

Answer: Because of design issues, shallow copy behavior, and complexity in deep copying.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Cloneable in Java?

Answer like this:

> Cloneable is a marker interface in Java that indicates an object can be cloned using the clone() method. By default, clone() performs a shallow copy. To use it, a class must implement Cloneable and override the clone() method. However, clone() has several design issues, so alternatives like copy constructors are often preferred.
