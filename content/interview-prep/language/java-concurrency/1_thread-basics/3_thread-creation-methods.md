---
title: "Thread Creation Methods in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-112"
  phase: "Core"
  topic: "Thread Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "thread creation",
      "thread",
      "runnable",
      "callable",
      "executorservice",
      "java",
    ]
---

## 1. Short Answer (Interview Style)

---

> **In Java, threads can be created mainly by extending the Thread class, implementing Runnable, using Callable with ExecutorService, or submitting tasks to thread pools. In modern Java, implementing Runnable or using ExecutorService is preferred over extending Thread directly.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- basic multithreading APIs
- task-based vs thread-based design
- modern thread creation practices
- differences between Runnable, Callable, and ExecutorService

This is a common Java concurrency interview question.

---

## 3. Main Ways to Create Threads in Java

---

The common ways are:

1. Extending `Thread`
2. Implementing `Runnable`
3. Using `Callable` with `ExecutorService`
4. Using thread pools through `ExecutorService`

---

## 4. Method 1 — Extending Thread Class

---

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

MyThread t = new MyThread();
t.start();
```

### Pros

- simple for learning

### Cons

- Java does not support multiple inheritance of classes
- task logic gets tightly coupled with thread itself

So this approach is usually not preferred in real applications.

---

## 5. Method 2 — Implementing Runnable

---

```java
class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable task is running");
    }
}

Thread t = new Thread(new MyTask());
t.start();
```

### Why Better?

- separates task from thread
- supports inheritance from another class
- more flexible and reusable

This is the most commonly taught and used classic approach.

---

## 6. Method 3 — Using Lambda with Runnable

---

Since `Runnable` is a functional interface, we can use lambda.

```java
Thread t = new Thread(() -> {
    System.out.println("Running using lambda");
});

t.start();
```

This is cleaner and more readable.

---

## 7. Method 4 — Using Callable with ExecutorService

---

`Callable` is used when task should return a result.

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Callable<Integer> task = () -> 100;
Future<Integer> future = executor.submit(task);

System.out.println(future.get());
executor.shutdown();
```

### Why Use Callable?

- returns result
- can throw checked exceptions
- works well with `Future`

---

## 8. Method 5 — Using ExecutorService (Preferred in Real Systems)

---

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(() -> {
    System.out.println("Task executed by thread pool");
});

executor.shutdown();
```

This is preferred because:

- avoids manual thread creation
- reuses threads
- improves performance
- easier lifecycle management

---

## 9. Comparison Table

---

| Method             | Returns Result | Reusable | Preferred in Real Apps |
| ------------------ | -------------- | -------- | ---------------------- |
| Extend Thread      | No             | Low      | No                     |
| Implement Runnable | No             | Yes      | Yes                    |
| Callable           | Yes            | Yes      | Yes                    |
| ExecutorService    | Optional       | High     | Yes                    |

---

## 10. Important Interview Points

---

### Which method is preferred in modern Java?

Answer: ExecutorService with Runnable or Callable.

---

### Why is extending Thread discouraged?

Answer: It tightly couples task with thread and prevents extending another class.

---

### Difference between Runnable and Callable?

Answer:

- Runnable → no result, no checked exception
- Callable → returns result, allows checked exception

---

### Does calling run() create a new thread?

Answer: No. Only `start()` creates a new thread.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are the ways to create a thread in Java?

Answer like this:

> In Java, threads can be created by extending the Thread class, implementing Runnable, using Callable with ExecutorService, or submitting tasks to thread pools. In practice, implementing Runnable or using ExecutorService is preferred because it separates task logic from thread management and supports better scalability.
