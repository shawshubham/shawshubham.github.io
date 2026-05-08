---
title: "Future in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-106"
  phase: "Core"
  topic: "Executor Framework"
  round: "Technical"
  company: ""
  tags: ["future", "java", "executorservice", "async", "concurrency"]
---

## 1. Short Answer (Interview Style)

---

> **Future represents the result of an asynchronous computation in Java. It allows us to check whether a task is completed, retrieve its result, or cancel it. It is commonly used with ExecutorService and Callable.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- asynchronous execution
- result handling in concurrency
- blocking vs non-blocking behavior
- task lifecycle control

This is a very common Java concurrency interview question.

---

## 3. What is Future?

---

`Future` is an interface in `java.util.concurrent` that represents a **result that will be available in the future**.

It is typically returned when submitting a task to ExecutorService.

---

## 4. Basic Example

---

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Callable<Integer> task = () -> {
    Thread.sleep(1000);
    return 42;
};

Future<Integer> future = executor.submit(task);

System.out.println("Task submitted...");

Integer result = future.get(); // blocks until result is ready
System.out.println(result);

executor.shutdown();
```

---

## 5. Key Methods of Future

---

### get()

```java
future.get();
```

- waits (blocks) until result is available
- returns result

---

### isDone()

```java
future.isDone();
```

- checks if task is completed

---

### cancel()

```java
future.cancel(true);
```

- attempts to cancel execution

---

### isCancelled()

```java
future.isCancelled();
```

- checks if task was cancelled

---

## 6. Blocking Nature of get()

---

Important interview concept:

```java
future.get();
```

- blocks the calling thread
- waits until computation is complete

So:

> Future is not fully non-blocking

---

## 7. Non-Blocking Check Example

---

```java
while (!future.isDone()) {
    System.out.println("Waiting...");
}

System.out.println(future.get());
```

---

## 8. Limitations of Future

---

Future has some limitations:

- cannot chain multiple async tasks easily
- no callback mechanism
- blocking behavior with get()

These limitations led to:

👉 CompletableFuture (next topic)

---

## 9. Visual Flow

---

```mermaid
flowchart LR
    A[Submit Task] --> B[Future Created]
    B --> C[Task Running]
    C --> D[Task Completed]
    D --> E["get() returns result"]
```

---

## 10. Important Interview Points

---

### What is Future?

Answer: Represents result of async computation.

---

### Does get() block?

Answer: Yes.

---

### Can we cancel a task?

Answer: Yes, using cancel().

---

### What is limitation of Future?

Answer: No chaining, no callbacks, blocking behavior.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Future in Java?

Answer like this:

> Future represents the result of an asynchronous computation. It allows checking task completion, retrieving results using get(), and cancelling tasks. However, get() is blocking and Future lacks chaining and callback support, which is why CompletableFuture is often preferred for more advanced asynchronous workflows.
