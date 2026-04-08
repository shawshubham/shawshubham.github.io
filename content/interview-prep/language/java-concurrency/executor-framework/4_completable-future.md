---
title: "CompletableFuture in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-111"
  phase: "Core"
  topic: "Executor Framework"
  round: "Technical"
  company: ""
  tags:
    [
      "completablefuture",
      "java",
      "async",
      "non-blocking",
      "future",
      "concurrency",
    ]
---

## 1. Short Answer (Interview Style)

---

> **CompletableFuture is an advanced version of Future in Java that supports asynchronous, non-blocking programming with the ability to chain tasks, handle results, and manage exceptions efficiently.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- asynchronous programming
- non-blocking execution
- chaining operations
- modern backend concurrency patterns

This is a very important Java concurrency interview topic.

---

## 3. What is CompletableFuture?

---

`CompletableFuture` is part of:

```java
java.util.concurrent
```

It extends Future and provides:

- async execution
- chaining
- callbacks
- better error handling

---

## 4. Why CompletableFuture Over Future?

---

Limitations of Future:

- blocking get()
- no chaining
- no callbacks

CompletableFuture solves:

- non-blocking execution
- chaining tasks
- combining multiple async operations

---

## 5. Basic Example

---

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
});

System.out.println(future.get());
```

---

## 6. Non-Blocking Example (thenApply)

---

```java
CompletableFuture.supplyAsync(() -> "Hello")
        .thenApply(result -> result + " World")
        .thenAccept(System.out::println);
```

Flow:

```text
Hello → Hello World → print
```

---

## 7. Combining Multiple Futures

---

```java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = f1.thenCombine(f2, (a, b) -> a + " " + b);

System.out.println(combined.get());
```

---

## 8. Exception Handling

---

```java
CompletableFuture.supplyAsync(() -> {
    if (true) throw new RuntimeException();
    return "Hello";
}).exceptionally(ex -> "Fallback")
  .thenAccept(System.out::println);
```

---

## 9. Common Methods

---

| Method          | Purpose              |
| --------------- | -------------------- |
| supplyAsync()   | returns value        |
| runAsync()      | no return            |
| thenApply()     | transform result     |
| thenAccept()    | consume result       |
| thenRun()       | run after completion |
| thenCombine()   | combine two futures  |
| exceptionally() | handle exception     |

---

## 10. Visual Flow

---

```mermaid
flowchart LR
    A[Task 1] --> B[thenApply]
    B --> C[thenAccept]
```

---

## 11. CompletableFuture vs Future

---

| Feature            | Future  | CompletableFuture |
| ------------------ | ------- | ----------------- |
| Blocking           | Yes     | Optional          |
| Chaining           | No      | Yes               |
| Callbacks          | No      | Yes               |
| Exception Handling | Limited | Rich              |

---

## 12. Important Interview Points

---

### Is CompletableFuture non-blocking?

Answer: Yes, unless get() is used.

---

### Difference between thenApply and thenAccept?

Answer:

- thenApply → returns result
- thenAccept → consumes result (no return)

---

### Can we combine multiple futures?

Answer: Yes, using thenCombine, allOf, anyOf.

---

### Which thread executes CompletableFuture?

Answer: By default, ForkJoinPool.commonPool().

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is CompletableFuture in Java?

Answer like this:

> CompletableFuture is an advanced asynchronous programming construct in Java that extends Future. It allows non-blocking execution, chaining of tasks, combining multiple asynchronous operations, and better exception handling. It is widely used in modern backend systems for scalable and efficient concurrency.
