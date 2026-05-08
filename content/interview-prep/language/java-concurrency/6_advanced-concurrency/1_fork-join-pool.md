---
title: "ForkJoinPool in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-117"
  phase: "Core"
  topic: "Advanced Concurrency"
  round: "Technical"
  company: ""
  tags: ["forkjoinpool", "java", "parallelism", "work stealing", "concurrency"]
---

## 1. Short Answer (Interview Style)

---

> **ForkJoinPool is a specialized thread pool in Java designed for parallel execution of tasks using the divide-and-conquer approach. It uses a work-stealing algorithm to efficiently utilize CPU resources.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- parallel processing
- divide-and-conquer algorithms
- advanced thread pool behavior
- performance optimization in CPU-bound tasks

This is a common advanced Java concurrency interview question.

---

## 3. What is ForkJoinPool?

---

`ForkJoinPool` is part of:

```java
java.util.concurrent
```

It is designed for:

- breaking tasks into smaller subtasks
- executing them in parallel
- combining results

---

## 4. Key Concept — Divide and Conquer

---

Instead of solving a problem directly:

1. Split task into smaller subtasks
2. Solve them in parallel
3. Combine results

---

## 5. Basic Example

---

```java
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;

class SumTask extends RecursiveTask<Integer> {
    private final int[] arr;
    private final int start, end;

    SumTask(int[] arr, int start, int end) {
        this.arr = arr;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Integer compute() {
        if (end - start <= 2) {
            int sum = 0;
            for (int i = start; i < end; i++) sum += arr[i];
            return sum;
        }

        int mid = (start + end) / 2;

        SumTask left = new SumTask(arr, start, mid);
        SumTask right = new SumTask(arr, mid, end);

        left.fork(); // async
        int rightResult = right.compute(); // sync
        int leftResult = left.join();

        return leftResult + rightResult;
    }
}

ForkJoinPool pool = new ForkJoinPool();
int result = pool.invoke(new SumTask(new int[]{1,2,3,4}, 0, 4));
```

---

## 6. Fork vs Join

---

- `fork()` → submit subtask asynchronously
- `join()` → wait for result

Flow:

```text
Split → fork → compute → join → combine
```

---

## 7. Work Stealing Algorithm (VERY IMPORTANT)

---

Each thread has its own queue.

If a thread becomes idle:

> It steals tasks from other threads’ queues.

---

### Visual

```mermaid
flowchart LR
    T1[Thread 1 Queue] --> T2[Thread 2 Queue]
    T3[Idle Thread] -->|Steals Task| T1
```

This ensures:

- better CPU utilization
- load balancing

---

## 8. Types of Tasks

---

### RecursiveTask (returns result)

```java
class MyTask extends RecursiveTask<Integer> {}
```

---

### RecursiveAction (no result)

```java
class MyTask extends RecursiveAction {}
```

---

## 9. When to Use ForkJoinPool

---

Use when:

- tasks can be split recursively
- CPU-bound operations
- large data processing

Examples:

- parallel sorting
- matrix operations
- file processing

---

## 10. When NOT to Use

---

Avoid when:

- tasks are I/O bound
- tasks cannot be divided
- overhead of splitting is high

---

## 11. Important Interview Points

---

### What is work stealing?

Answer: Idle threads steal tasks from busy threads.

---

### Difference between ExecutorService and ForkJoinPool?

Answer:

- ExecutorService → general-purpose
- ForkJoinPool → optimized for recursive parallel tasks

---

### Does ForkJoinPool use daemon threads?

Answer: Yes, by default.

---

### What is common pool?

Answer: Shared ForkJoinPool used by parallel streams and CompletableFuture.

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is ForkJoinPool in Java?

Answer like this:

> ForkJoinPool is a specialized thread pool designed for parallel execution using divide-and-conquer. It splits tasks into subtasks, executes them concurrently, and combines results. It uses a work-stealing algorithm to efficiently utilize CPU resources and is ideal for CPU-bound parallel computations.
