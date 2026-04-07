---
title: "Reflection in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-217"
  phase: "Core"
  topic: "Reflection & Metadata"
  round: "Technical"
  company: ""
  tags: ["reflection", "java", "runtime", "introspection", "frameworks"]
---

## 1. Short Answer (Interview Style)

---

> **Reflection in Java is a feature that allows a program to inspect and modify classes, methods, fields, and constructors at runtime. It is commonly used by frameworks like Spring and Hibernate for dependency injection, ORM, and dynamic behavior.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- runtime behavior of Java
- how frameworks work internally
- dynamic class loading
- introspection and metadata usage

This is a very common Core Java interview question.

---

## 3. What is Reflection?

---

Reflection allows Java code to:

- inspect classes at runtime
- access private fields and methods
- create objects dynamically
- invoke methods dynamically

So instead of compile-time access, reflection enables **runtime inspection and execution**.

---

## 4. How to Get Class Object

---

There are three ways:

```java
Class<?> c1 = Class.forName("com.example.Employee");
Class<?> c2 = Employee.class;
Class<?> c3 = obj.getClass();
```

All represent the same class metadata.

---

## 5. Accessing Fields Using Reflection

---

```java
Field field = clazz.getDeclaredField("name");
field.setAccessible(true);
field.set(obj, "Shubham");
```

Here:

- private fields can be accessed
- encapsulation can be bypassed

---

## 6. Invoking Methods Using Reflection

---

```java
Method method = clazz.getDeclaredMethod("display");
method.setAccessible(true);
method.invoke(obj);
```

This allows calling methods dynamically.

---

## 7. Creating Objects Using Reflection

---

```java
Constructor<?> constructor = clazz.getDeclaredConstructor();
constructor.setAccessible(true);
Object obj = constructor.newInstance();
```

This is used when class is not known at compile time.

---

## 8. Real-World Usage

---

Reflection is heavily used in frameworks:

- Spring → Dependency Injection
- Hibernate → ORM mapping
- JUnit → test discovery
- Jackson → JSON serialization/deserialization

Frameworks use reflection to dynamically create and manage objects.

---

## 9. Advantages of Reflection

---

- dynamic behavior at runtime
- useful for frameworks and libraries
- reduces boilerplate code in frameworks

---

## 10. Disadvantages of Reflection

---

- slower than direct method calls
- breaks encapsulation
- harder to debug
- security restrictions may apply

---

## 11. Important Interview Questions

---

### Can we access private fields using reflection?

Answer: Yes, using setAccessible(true).

### Is reflection slow?

Answer: Yes, slower than normal method calls due to runtime resolution.

### Why do frameworks use reflection?

Answer: To create objects and call methods dynamically without knowing them at compile time.

### Does reflection break encapsulation?

Answer: Yes.

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is reflection in Java?

Answer like this:

> Reflection in Java is a feature that allows a program to inspect and modify classes, fields, methods, and constructors at runtime. It is widely used by frameworks like Spring and Hibernate to dynamically create objects, inject dependencies, and manage application behavior. However, it comes with performance overhead and can break encapsulation.
