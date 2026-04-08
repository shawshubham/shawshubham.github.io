---
title: "Thread Pool Types in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-107"
  phase: "Core"
  topic: "Executor Framework"
  round: "Technical"
  company: ""
  tags: ["thread pool", "executors", "java", "concurrency", "executorservice"]
---

## 1. Short Answer (Interview Style)

---

> **Java provides different types of thread pools via the Executors utility class, such as Fixed, Cached, Single, and Scheduled thread pools. Each is designed for specific use cases like controlling concurrency, handling bursts of tasks, sequential execution, or scheduling tasks.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- thread pool behavior
- performance trade-offs
- choosing the right pool in real systems
- backend scalability design

This is a very common backend interview question.

---

## 3. What is a Thread Pool?

---

A thread pool is a collection of reusable worker threads that execute tasks.

Instead of creating a new thread for every task:

```java
new Thread(task).start();
```

We reuse threads:

```java
ExecutorService executor = Executors.newFixedThreadPool(2);
executor.submit(task);
```

---

## 4. Types of Thread Pools

---

### 1. Fixed Thread Pool

```java
ExecutorService executor = Executors.newFixedThreadPool(5);
```

- fixed number of threads
- tasks queue up if all threads are busy

Use case:

- controlled concurrency
- backend services

---

### 2. Cached Thread Pool

```java
ExecutorService executor = Executors.newCachedThreadPool();
```

- creates new threads as needed
- reuses idle threads
- can grow unbounded

Use case:

- short-lived tasks
- bursty workloads

⚠️ Risk:

- too many threads → OOM risk

---

### 3. Single Thread Executor

```java
ExecutorService executor = Executors.newSingleThreadExecutor();
```

- only one thread
- tasks executed sequentially

Use case:

- ordered execution
- logging systems

---

### 4. Scheduled Thread Pool

```java
ScheduledExecutorService executor = Executors.newScheduledThreadPool(2);
```

- supports delayed and periodic execution

Example:

```java
executor.schedule(() -> System.out.println("Hello"), 1, TimeUnit.SECONDS);
```

Use case:

- cron-like jobs
- periodic tasks

---

## 5. Internal Working (High-Level)

---

```mermaid
flowchart LR
    A[Task Submitted] --> B[Thread Pool]
    B --> C[Worker Thread]
    C --> D[Execute Task]
    D --> B
```

---

## 6. Important Interview Points

---

### Which thread pool is most commonly used?

Answer: Fixed thread pool.

---

### Why avoid cached thread pool in production?

Answer: It can create unlimited threads → memory issues.

---

### Difference between fixed and single thread pool?

Answer:

- fixed → multiple threads
- single → one thread (sequential execution)

---

### When to use scheduled thread pool?

Answer: For delayed or periodic tasks.

---

### Why is Executors class discouraged in production?

Answer:
Because it creates thread pools with unbounded queues or threads (e.g., CachedThreadPool), which can lead to memory issues. Instead, we should use ThreadPoolExecutor with proper configuration.

---

### What happens when all threads in fixed pool are busy?

Answer:
New tasks are placed in a queue (BlockingQueue) and executed when a thread becomes free.

---

## 7. Real-World Mapping

---

| Scenario              | Recommended Pool       |
| --------------------- | ---------------------- |
| API request handling  | Fixed thread pool      |
| Short async tasks     | Cached thread pool     |
| Sequential processing | Single thread executor |
| Background jobs       | Scheduled thread pool  |

---

## 8. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are thread pool types in Java?

Answer like this:

> Java provides different thread pools like fixed, cached, single, and scheduled thread pools through the Executors class. Fixed thread pool controls concurrency with a fixed number of threads, cached thread pool handles bursty tasks but can grow unbounded, single thread executor ensures sequential execution, and scheduled thread pool is used for delayed or periodic tasks.
