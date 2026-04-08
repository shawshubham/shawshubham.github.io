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

#### Key Insight

> Annotation = Metadata (information)  
> Not execution logic

Actual behavior comes from:

- compiler
- frameworks
- reflection-based processing

---

## 4. Types of Annotations

---

### 4.1 Built-in Annotations

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

### 4.2 Custom Annotations (Real Understanding)

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

#### ⚠️ Important Clarification

👉 This alone does **nothing**

> Annotation itself has no behavior.

### Real Understanding

Custom annotations become powerful when:

1. They are read using reflection
2. Some logic is applied based on them

### Example: Logging Annotation

#### Step 1: Define annotation

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface LogExecution {
}
```

#### Step 2: Use annotation

```java
class PaymentService {

    @LogExecution
    public void processPayment() {
        System.out.println("Processing payment...");
    }
}
```

#### Step 3: Process annotation (actual behavior)

```java
Method method = PaymentService.class.getMethod("processPayment");

if (method.isAnnotationPresent(LogExecution.class)) {
    System.out.println("Logging before execution...");
}
```

### Real-World Mapping

This is exactly how frameworks work:

- Spring → @Transactional, @Autowired, @RestController
- JUnit → @Test
- Hibernate → @Entity

### 💡 Mental Model

```text
Annotation (Metadata) + Processor (Reflection / Framework) = Behavior
```

---

### 4.3 Meta-Annotations

These are annotations used to define other annotations.

They control:

- where annotation can be used
- when it is available
- how it behaves

Examples:

- `@Target`
- `@Retention`
- `@Documented`
- `@Inherited`

---

## 5. Important Meta-Annotations (Deep Dive)

---

### 5.1 @Target → Where can annotation be used?

Specifies allowed locations.

```java
@Target(ElementType.METHOD)
@interface MyAnnotation {}
```

Common values:

- METHOD
- FIELD
- CLASS
- PARAMETER
- CONSTRUCTOR

> If @Target is missing → annotation is allowed on all element types

#### Example

```java
@Target(ElementType.FIELD)
@interface Sensitive {}

class User {
    @Sensitive
    String password;
}
```

---

### 5.2 @Retention → When is annotation available?

Defines lifecycle of annotation.

```java
@Retention(RetentionPolicy.RUNTIME)
```

Types:

1. **SOURCE**
   - Removed during compilation
   - Not present in `.class`

Example: Lombok

2. **CLASS**
   - Present in `.class`
   - Not available at runtime

3. **RUNTIME** ✅ (Most Important)
   - Available at runtime
   - Can be accessed using reflection

#### Critical Insight

> - If you forget @Retention(RUNTIME), your annotation will not work with reflection.
> - **Default**: RetentionPolicy.CLASS

This is a very common interview trap.

---

### 5.3 @Documented

- Included in JavaDocs
- Used for documentation purposes

---

### 5.4 @Inherited

```java
@Inherited
@interface MyAnnotation {}
```

#### Example:

```java
@MyAnnotation
class Parent {}

class Child extends Parent {}
```

Child class inherits annotation.

#### ⚠️ Important Limitation

> Works only for class-level annotations (not methods or fields)

---

## 6. How Annotations Work Internally

---

Annotations themselves do nothing unless processed.

They are used by:

- Compiler
- Tools
- Frameworks (via reflection)

### Real Framework Behavior

- Spring scans classes using reflection
- Finds annotations like `@Component`
- Creates objects (beans)
- Injects dependencies

---

## 7. Real-World Usage

---

Annotations are heavily used in frameworks:

- Spring → `@Component`, `@Autowired`, `@RestController`
- Hibernate → `@Entity`, `@Table`
- JUnit → `@Test`

### What They Enable

- dependency injection
- configuration
- validation
- aspect-oriented programming (AOP)

### Key Insight

> Annotations enable **declarative programming**

Instead of writing logic:

```java
startTransaction();
```

We write:

```java
@Transactional
```

---

## 8. Advantages of Annotations

---

- reduces boilerplate code
- improves readability
- enables declarative programming
- widely used in frameworks
- decouples configuration from logic

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

> Annotations in Java are metadata added to classes, methods, or fields. They do not directly change program behavior but are used by the compiler, tools, or frameworks to provide additional functionality such as validation, configuration, or dependency injection. Custom annotations combined with reflection enable frameworks like Spring to implement features like dependency injection and transactions. Meta-annotations like @Target and @Retention define where annotations can be used and whether they are available at runtime. They are heavily used in frameworks like Spring and Hibernate.
