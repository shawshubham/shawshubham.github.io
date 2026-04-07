---
title: "Reduce Function in Java Streams"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-222"
  phase: "Core"
  topic: "Java 8"
  round: "Technical"
  company: ""
  tags: ["reduce", "streams", "java 8", "lambda", "functional programming"]
---

## 1. Short Answer (Interview Style)

---

> **The reduce() function in Java Streams is a terminal operation used to combine all elements of a stream into a single result. It is commonly used for operations like sum, product, maximum, minimum, or custom aggregation.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- Stream API terminal operations
- functional-style aggregation
- lambda expressions in practice
- immutable reduction concepts

This is a common Java 8 interview question.

---

## 3. What is reduce()?

---

The `reduce()` method is used to **reduce multiple stream elements into one final value**.

Examples:

- sum of numbers
- multiplication of numbers
- maximum value
- concatenating strings

So the idea is:

```text
Many values → One value
```

---

## 4. Simple Example

---

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

int sum = numbers.stream()
        .reduce(0, (a, b) -> a + b);

System.out.println(sum);
```

Output:

```text
15
```

How it works:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15
```

---

## 5. Syntax of reduce()

---

### Version 1: With identity and accumulator

```java
T result = stream.reduce(identity, accumulator);
```

- `identity` → initial value
- `accumulator` → logic to combine values

Example:

```java
int sum = numbers.stream().reduce(0, (a, b) -> a + b);
```

---

### Version 2: Without identity

```java
Optional<T> result = stream.reduce(accumulator);
```

Example:

```java
Optional<Integer> sum = numbers.stream().reduce((a, b) -> a + b);
```

Why Optional?

Because stream may be empty.

---

## 6. Common Examples

---

### Sum

```java
int sum = List.of(1, 2, 3, 4).stream()
        .reduce(0, Integer::sum);
```

### Product

```java
int product = List.of(1, 2, 3, 4).stream()
        .reduce(1, (a, b) -> a * b);
```

### Maximum

```java
Optional<Integer> max = List.of(10, 20, 5, 30).stream()
        .reduce(Integer::max);
```

### String Concatenation

```java
String result = List.of("Java", " ", "Streams").stream()
        .reduce("", (a, b) -> a + b);
```

---

## 7. reduce() vs collect()

---

This is a strong interview point.

| reduce()                     | collect()                        |
| ---------------------------- | -------------------------------- |
| Produces single result       | Produces collection or container |
| Used for immutable reduction | Used for mutable reduction       |
| Example: sum, max, product   | Example: List, Set, Map          |

Example:

- `reduce()` → sum of numbers
- `collect()` → convert stream to list

---

## 8. Important Interview Points

---

### Why does reduce without identity return Optional?

Answer: Because stream may be empty, so there may be no result.

### Is reduce a terminal operation?

Answer: Yes.

### Can reduce be used for sum?

Answer: Yes, and also for product, max, min, and custom aggregation.

### Difference between reduce and collect?

Answer: reduce is for combining into a single value, collect is for gathering into a mutable container.

---

## 9. When to Use reduce()

---

Use `reduce()` when you want:

- one final result
- functional-style aggregation
- operations like sum, max, min, product, concatenation

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is reduce() in Java Streams?

Answer like this:

> The reduce() function in Java Streams is a terminal operation used to combine all elements of a stream into a single result. It is commonly used for operations like sum, product, max, min, or string concatenation. It works by repeatedly applying an accumulator function, and when used without an identity value, it returns an Optional because the stream may be empty.
