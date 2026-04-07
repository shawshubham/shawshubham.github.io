---
title: "Enum Usage in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-219"
  phase: "Core"
  topic: "Reflection & Metadata"
  round: "Technical"
  company: ""
  tags: ["enum", "java", "typesafe", "singleton", "switch"]
---

## 1. Short Answer (Interview Style)

---

> **Enum in Java is a special data type used to define a fixed set of constants. It is type-safe, prevents invalid values, and can also have fields, methods, and constructors. Enums are commonly used to represent predefined values like states, directions, or roles.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- type safety in Java
- alternatives to constants
- enum as a class
- real-world modeling
- switch-case usage

This is a very common Core Java interview question.

---

## 3. What is Enum?

---

Enum is a special class in Java used to represent a group of constants.

### Example

```java
enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY
}
```

Usage:

```java
Day today = Day.MONDAY;
```

---

## 4. Why Use Enum?

---

Before enums, constants were defined like:

```java
public static final int MONDAY = 1;
```

Problems:

- not type-safe
- can assign invalid values
- less readable

Enum solves this by:

- restricting values
- improving readability
- providing type safety

---

## 5. Enum is a Class (Important Concept)

---

Enums in Java are internally classes.

They can have:

- fields
- constructors
- methods

### Example

```java
enum Status {
    SUCCESS(200),
    ERROR(500);

    private final int code;

    Status(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
```

---

## 6. Enum with switch-case

---

Enums are commonly used with switch statements.

```java
switch (today) {
    case MONDAY:
        System.out.println("Start of week");
        break;
    case TUESDAY:
        System.out.println("Second day");
        break;
}
```

---

## 7. Important Methods of Enum

---

All enums inherit from `java.lang.Enum`.

Common methods:

```java
Day.valueOf("MONDAY");
Day.values();
Day.MONDAY.ordinal();
Day.MONDAY.name();
```

---

## 8. Enum vs Constants

---

| Enum                | Constants            |
| ------------------- | -------------------- |
| Type-safe           | Not type-safe        |
| Fixed set of values | Can assign any value |
| Readable            | Less readable        |
| Can have behavior   | Only values          |

---

## 9. Advanced Use — Enum Singleton

---

Enum can be used to create singleton.

```java
enum Singleton {
    INSTANCE;
}
```

Why this is good:

- thread-safe
- safe against serialization
- safe against reflection

---

## 10. Important Interview Questions

---

### Can enum have constructor?

Answer: Yes, but it is implicitly private.

### Can enum extend a class?

Answer: No, but it can implement interfaces.

### Why enum is better than constants?

Answer: Type safety and readability.

### Can enum be used in switch?

Answer: Yes.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is enum in Java?

Answer like this:

> Enum in Java is a special data type used to define a fixed set of constants. It is type-safe, improves readability, and prevents invalid values. Enums are internally classes and can have fields, methods, and constructors. They are commonly used for predefined values like states, roles, or directions.
