---
title: "Functional Interfaces"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-203"
  phase: "Core"
  topic: "Java 8"
  round: "Technical"
  company: ""
  tags:
    [
      "functional interface",
      "lambda",
      "java 8",
      "predicate",
      "function",
      "consumer",
      "supplier",
    ]
---

## 1. Short Answer (Interview Style)

---

> **A Functional Interface in Java is an interface that contains exactly one abstract method. It can have multiple default and static methods. Functional interfaces are mainly used with lambda expressions and method references. Examples include Runnable, Callable, Comparator, Predicate, Function, Consumer, and Supplier.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- Java 8 features
- Lambda expressions
- Functional programming in Java
- Stream API
- Built-in functional interfaces

This is a very common Core Java interview question.

---

## 3. What is a Functional Interface?

---

A **Functional Interface** is an interface that has:

> **Exactly one abstract method**

It can have:

- Multiple default methods
- Multiple static methods
- One abstract method only

### Example

```java
@FunctionalInterface
interface MyFunctionalInterface {
    void doWork();
}
```

This is a valid functional interface because it has only one abstract method.

---

## 4. @FunctionalInterface Annotation

---

This annotation is optional but recommended.

```java
@FunctionalInterface
interface MyFunctionalInterface {
    void doWork();
}
```

If you accidentally add another abstract method, compiler will give error.

So this annotation is used to:

> Ensure the interface remains a functional interface.

---

## 5. Functional Interface and Lambda Expression

---

Functional interfaces are mainly used with **lambda expressions**.

Example without lambda:

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running");
    }
};
```

Using lambda:

```java
Runnable r = () -> System.out.println("Running");
```

Lambda works because **Runnable is a functional interface**.

---

## 6. Common Built-in Functional Interfaces

---

These are very important for interviews.

| Interface      | Method            | Description                  |
| -------------- | ----------------- | ---------------------------- |
| Predicate<T>   | boolean test(T t) | Returns true/false           |
| Function<T, R> | R apply(T t)      | Takes input, returns output  |
| Consumer<T>    | void accept(T t)  | Takes input, returns nothing |
| Supplier<T>    | T get()           | Returns value, no input      |

---

## 7. Examples of Built-in Functional Interfaces

---

### Predicate Example

```java
Predicate<Integer> isEven = x -> x % 2 == 0;
System.out.println(isEven.test(4));
```

### Function Example

```java
Function<Integer, Integer> square = x -> x * x;
System.out.println(square.apply(5));
```

### Consumer Example

```java
Consumer<String> print = s -> System.out.println(s);
print.accept("Hello");
```

### Supplier Example

```java
Supplier<Double> random = () -> Math.random();
System.out.println(random.get());
```

---

## 8. Examples of Functional Interfaces in Java

---

Some common functional interfaces:

- Runnable
- Callable
- Comparator
- Comparable
- ActionListener
- Predicate
- Function
- Consumer
- Supplier

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is a Functional Interface?

Answer like this:

> A Functional Interface is an interface that contains exactly one abstract method. It can have multiple default and static methods. Functional interfaces are used with lambda expressions and method references in Java 8. Examples include Runnable, Comparator, Predicate, Function, Consumer, and Supplier.
