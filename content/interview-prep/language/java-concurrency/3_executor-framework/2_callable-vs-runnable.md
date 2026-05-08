---
title: "Callable vs Runnable in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-105"
  phase: "Core"
  topic: "Executor Framework"
  round: "Technical"
  company: ""
  tags:
    ["callable", "runnable", "future", "executorservice", "java", "concurrency"]
---

## 1. Short Answer (Interview Style)

---

> **Runnable is used when a task does not return a result and cannot throw checked exceptions, whereas Callable is used when a task needs to return a result and can throw checked exceptions. Runnable was introduced earlier, while Callable is part of the java.util.concurrent package and works closely with Future.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- task execution models in Java
- result-returning asynchronous tasks
- exception handling in concurrent code
- ExecutorService usage

This is a very common Java concurrency interview question.

---

## 3. What is Runnable?

---

`Runnable` is a functional interface used to represent a task that performs work but does **not return any result**.

Method:

```java
void run();
```

Example:

```java
Runnable task = () -> {
    System.out.println("Running task");
};
```

Characteristics:

- no return value
- cannot throw checked exceptions directly
- used with `Thread` and `ExecutorService`

---

## 4. What is Callable?

---

`Callable` is a functional interface introduced in `java.util.concurrent`.

It represents a task that:

- returns a result
- can throw checked exceptions

Method:

```java
V call() throws Exception;
```

Example:

```java
Callable<Integer> task = () -> {
    return 10 + 20;
};
```

---

## 5. Key Difference

---

| Feature            | Runnable    | Callable               |
| ------------------ | ----------- | ---------------------- |
| Method             | `run()`     | `call()`               |
| Return value       | No          | Yes                    |
| Checked exceptions | No          | Yes                    |
| Package            | `java.lang` | `java.util.concurrent` |
| Used with Future   | No          | Yes                    |

---

## 6. Runnable Example with ExecutorService

---

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Runnable task = () -> {
    System.out.println("Runnable task executed");
};

executor.submit(task);
executor.shutdown();
```

Here:

- task executes asynchronously
- no meaningful result is returned

---

## 7. Callable Example with ExecutorService

---

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Callable<Integer> task = () -> 100;

Future<Integer> future = executor.submit(task);
System.out.println(future.get());

executor.shutdown();
```

Here:

- task executes asynchronously
- result is returned using `Future`

---

## 8. Why Callable is Useful

---

Use Callable when:

- task produces a result
- task may throw checked exceptions
- result needs to be tracked with `Future`

Examples:

- API call returning response
- database query returning data
- background computation returning result

---

## 9. Important Interview Points

---

### Can Runnable return a result?

Answer: No.

---

### Can Callable throw checked exception?

Answer: Yes.

---

### How do we get result from Callable?

Answer: Using `Future` returned by `ExecutorService.submit()`.

---

### Can Callable be used with Thread class directly?

Answer: No, Thread constructor accepts Runnable, not Callable.

---

## 10. Runnable vs Callable — Interview Summary

---

If interviewer asks:

> What is difference between Callable and Runnable?

Answer like this:

> Runnable is used for tasks that do not return a result and cannot throw checked exceptions, while Callable is used for tasks that return a result and can throw checked exceptions. Callable is typically used with ExecutorService and Future when asynchronous computation results are needed.
