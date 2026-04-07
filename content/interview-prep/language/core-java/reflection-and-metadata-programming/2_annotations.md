---
title: "Annotations in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-218"
  phase: "Core"
  topic: "Reflection & Metadata"
  round: "Technical"
  company: ""
  tags: ["annotations", "java", "metadata", "reflection", "spring"]
---

## 1. Short Answer (Interview Style)

---

> **Annotations in Java are metadata added to code elements like classes, methods, and fields. They do not directly affect program execution but can be used by the compiler, tools, or frameworks (via reflection) to provide additional behavior such as validation, dependency injection, or configuration.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- metadata in Java
- how frameworks like Spring work
- reflection usage
- compile-time vs runtime behavior

This is a very common Core Java interview question.

---

## 3. What is an Annotation?

---

An annotation is a form of **metadata**.

It provides information about the code but does not change the logic directly.

Example:

```java
@Override
public String toString() {
    return "Hello";
}
```

Here `@Override` tells the compiler that the method is overriding a parent method.

---

## 4. Types of Annotations

---

### 1. Built-in Annotations

- `@Override`
- `@Deprecated`
- `@SuppressWarnings`

Example:

```java
@Deprecated
void oldMethod() {
}
```

---

### 2. Custom Annotations

We can create our own annotations.

```java
@interface MyAnnotation {
    String value();
}
```

Usage:

```java
@MyAnnotation(value = "Test")
class Demo {
}
```

---

### 3. Meta-Annotations

These are annotations used to define other annotations.

- `@Target`
- `@Retention`
- `@Documented`
- `@Inherited`

---

## 5. Important Meta-Annotations

---

### @Target

Specifies where annotation can be applied.

```java
@Target(ElementType.METHOD)
```

---

### @Retention

Defines how long annotation is retained.

```java
@Retention(RetentionPolicy.RUNTIME)
```

Types:

- SOURCE → discarded at compile time
- CLASS → available in class file
- RUNTIME → available at runtime (used with reflection)

---

## 6. How Annotations Work Internally

---

Annotations themselves do nothing unless processed.

They are used by:

- Compiler
- Tools
- Frameworks (via reflection)

Example:

- Spring reads `@Component`
- JUnit reads `@Test`
- Hibernate reads `@Entity`

---

## 7. Real-World Usage

---

Annotations are heavily used in frameworks:

- Spring → `@Component`, `@Autowired`, `@RestController`
- Hibernate → `@Entity`, `@Table`
- JUnit → `@Test`

They enable:

- dependency injection
- configuration
- validation

---

## 8. Advantages of Annotations

---

- reduces boilerplate code
- improves readability
- enables declarative programming
- widely used in frameworks

---

## 9. Important Interview Questions

---

### Do annotations affect program logic directly?

Answer: No, they provide metadata used by tools or frameworks.

### What is RetentionPolicy.RUNTIME?

Answer: Annotation is available at runtime and can be accessed using reflection.

### Can we create custom annotations?

Answer: Yes.

### How are annotations used in Spring?

Answer: Spring uses reflection to scan and process annotations for dependency injection and configuration.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are annotations in Java?

Answer like this:

> Annotations in Java are metadata added to classes, methods, or fields. They do not directly change program behavior but are used by the compiler, tools, or frameworks to provide additional functionality such as validation, configuration, or dependency injection. They are heavily used in frameworks like Spring and Hibernate.
