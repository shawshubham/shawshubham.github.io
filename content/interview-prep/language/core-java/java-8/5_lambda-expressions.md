---
title: "Lambda Expressions in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-221"
  phase: "Core"
  topic: "Java 8"
  round: "Technical"
  company: ""
  tags:
    ["lambda", "java 8", "functional interface", "anonymous class", "streams"]
---

## 1. Short Answer (Interview Style)

---

> **A lambda expression in Java is a concise way to represent an anonymous function. It is mainly used to provide the implementation of a functional interface, making code shorter, cleaner, and more readable compared to anonymous inner classes.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- Java 8 functional programming features
- functional interfaces
- anonymous class replacement
- cleaner collection and stream processing

This is a very common Core Java interview question.

---

## 3. What is a Lambda Expression?

---

A lambda expression is an **anonymous function**.

It has:

- no name
- no explicit return type in most cases
- no need to define a full class

It is mainly used where we need to pass behavior as a parameter.

### General Syntax

```java
(parameters) -> expression
```

or

```java
(parameters) -> { statements }
```

---

## 4. Why Lambda Was Introduced

---

Before Java 8, we often used anonymous inner classes.

### Example Using Anonymous Class

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running");
    }
};
```

The same with lambda:

```java
Runnable r = () -> System.out.println("Running");
```

Lambda reduces boilerplate code and improves readability.

---

## 5. Lambda Works with Functional Interfaces

---

A lambda expression can only be used with a **functional interface**, which means an interface having exactly one abstract method.

Example:

```java
@FunctionalInterface
interface Calculator {
    int add(int a, int b);
}
```

Usage:

```java
Calculator c = (a, b) -> a + b;
System.out.println(c.add(10, 20));
```

---

## 6. Common Examples

---

### Example 1: Runnable

```java
Runnable r = () -> System.out.println("Hello");
```

### Example 2: Comparator

```java
Comparator<String> cmp = (a, b) -> a.length() - b.length();
```

### Example 3: Predicate

```java
Predicate<Integer> isEven = n -> n % 2 == 0;
```

---

## 7. Lambda vs Anonymous Class

---

| Lambda                         | Anonymous Class                |
| ------------------------------ | ------------------------------ |
| Short and concise              | Verbose                        |
| Used for functional interfaces | Can define full anonymous type |
| No separate class-like syntax  | More boilerplate               |
| Better readability             | Less readable                  |

---

## 8. Important Interview Points

---

### Can lambda be used with any interface?

Answer: No, only with functional interfaces.

### Is lambda an object?

Answer: Lambda provides implementation of a functional interface, so effectively it behaves as an object reference of that interface type.

### Can lambda access local variables?

Answer: Yes, but only final or effectively final variables.

### Is lambda same as anonymous class?

Answer: No. Lambda is more concise and does not create the same style of anonymous class structure.

---

## 9. Real-World Usage

---

Lambdas are heavily used in:

- Stream API
- collection sorting
- filtering
- event handling
- concurrent programming

Example:

```java
List<String> names = List.of("Java", "Spring", "Kafka");
names.forEach(name -> System.out.println(name));
```

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is lambda expression in Java?

Answer like this:

> A lambda expression in Java is a concise way to represent an anonymous function. It is mainly used to provide implementation of a functional interface. Lambda expressions reduce boilerplate code, improve readability, and are widely used with Stream API, collection processing, and functional programming features introduced in Java 8.
