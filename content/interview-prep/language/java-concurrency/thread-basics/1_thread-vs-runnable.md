---
title: "Thread vs Runnable"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-001"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Thread Basics"
  round: "Technical"
  company: "" # optional
  tags: ["thread", "runnable", "concurrency", "multithreading", "java"]
---

## 1. Short Answer (Interview Style)

---

> **`Thread` is a class that represents an actual thread of execution, while `Runnable` is a functional interface that represents a task to be executed by a thread. In modern Java, implementing `Runnable` is usually preferred because it separates the task from the thread and gives more flexibility.**

---

## 2. What is a Thread?

---

A thread is the smallest unit of execution inside a process.

A Java program can run multiple threads at the same time.

Each thread can execute a different task concurrently.

Examples:

- one thread processing requests
- one thread reading from a queue
- one thread writing logs

So when interviewers ask `Thread vs Runnable`, they are really testing whether you understand:

- task vs execution mechanism
- Java thread creation basics
- better design choice in modern Java

---

## 3. What is `Thread`?

---

`Thread` is a class in Java.

It represents a thread of execution.

One way to create a thread is by extending the `Thread` class and overriding its `run()` method.

### Example

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running thread: " + Thread.currentThread().getName());
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start();
    }
}
```

Important point:

- `start()` creates a new thread and then internally calls `run()`
- calling `run()` directly does **not** create a new thread

---

## 4. What is `Runnable`?

---

`Runnable` is a functional interface in Java.

It has only one method:

```java
void run()
```

It represents a unit of work that can be executed by a thread.

### Example

```java
class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Running task: " + Thread.currentThread().getName());
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        MyTask task = new MyTask();
        Thread t1 = new Thread(task);
        t1.start();
    }
}
```

Here:

- `Runnable` defines the task
- `Thread` executes the task

This separation is very important.

---

## 5. Key Difference Between Thread and Runnable

---

| Feature                   | Thread                | Runnable                  |
| ------------------------- | --------------------- | ------------------------- |
| Type                      | Class                 | Functional interface      |
| Represents                | Thread of execution   | Task to be executed       |
| Inheritance needed?       | Yes, extends `Thread` | No, implements `Runnable` |
| Can extend another class? | No                    | Yes                       |
| Reusability               | Less flexible         | More flexible             |
| Preferred in modern Java? | Usually no            | Usually yes               |

---

## 6. Why `Runnable` Is Usually Preferred

---

This is the most important interview point.

### 1. Better separation of concerns

With `Runnable`, the task logic is separate from the thread that runs it.

That is cleaner design.

### 2. Java supports single inheritance

If you extend `Thread`, your class cannot extend any other class.

If you implement `Runnable`, your class is still free to extend another class if needed.

### 3. Better for thread pools and executors

Modern Java concurrency rarely uses raw `Thread` directly.

Instead, we use:

- `ExecutorService`
- thread pools
- `Callable`
- `CompletableFuture`

These designs work naturally with tasks like `Runnable`.

### 4. Reusability

The same `Runnable` task can be passed to multiple threads or executors.

---

## 7. Common Interview Trap — `start()` vs `run()`

---

This is a very common follow-up question.

### `start()`

Creates a new thread and then invokes `run()` in that new thread.

### `run()`

Just executes like a normal method call in the current thread.

### Example

```java
class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
}

public class StartVsRunExample {
    public static void main(String[] args) {
        Thread t = new Thread(new MyTask());

        t.run();   // runs in main thread
        t.start(); // runs in new thread
    }
}
```

So `run()` does not give concurrency by itself.

---

## 8. Example Using Lambda with Runnable

---

Since `Runnable` is a functional interface, Java 8 allows using lambdas.

```java
public class RunnableLambdaExample {
    public static void main(String[] args) {
        Runnable task = () ->
                System.out.println("Running in thread: " + Thread.currentThread().getName());

        Thread t = new Thread(task);
        t.start();
    }
}
```

This is concise and commonly used.

---

## 9. Real-World Perspective

---

In real applications, directly creating threads like this is rare:

```java
new Thread(task).start();
```

Usually we use an executor:

```java
ExecutorService executor = Executors.newFixedThreadPool(2);
executor.submit(task);
```

That is another reason `Runnable` is more important than extending `Thread` in modern Java applications.

---

## 10. Important Interview Points

---

Strong points to mention in interviews:

- `Thread` represents the execution mechanism
- `Runnable` represents the task
- implementing `Runnable` is usually preferred
- `Runnable` avoids single inheritance limitation
- `Runnable` works better with executors and thread pools
- `start()` creates a new thread, `run()` does not

---

## 11. Interview Follow-up Questions

---

After asking **"Thread vs Runnable"**, interviewers often ask related follow-ups.

### Common Follow-up Questions

| Follow-up Question                                         | What Interviewer Is Testing      |
| ---------------------------------------------------------- | -------------------------------- |
| Why is `Runnable` preferred over extending `Thread`?       | Design understanding             |
| Difference between `start()` and `run()`?                  | Thread creation basics           |
| Can a class implement `Runnable` and extend another class? | Java inheritance knowledge       |
| Is `Runnable` enough for returning a value?                | Transition to `Callable`         |
| How do thread pools use `Runnable`?                        | Modern concurrency understanding |
| Can the same `Runnable` be used by multiple threads?       | Task reuse                       |

---

## 12. Common Mistakes

---

Common mistakes developers make:

- saying `Runnable` creates a thread
- thinking `run()` starts a new thread
- assuming extending `Thread` is always fine in production code
- ignoring separation of task and execution mechanism
- forgetting that `Runnable` cannot return a value directly

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between `Thread` and `Runnable` in Java?

Answer like this:

> `Thread` is a class that represents an actual thread of execution, while `Runnable` is an interface that represents a task to be executed by a thread. Extending `Thread` couples the task with the execution mechanism, whereas implementing `Runnable` separates them and is usually preferred because it is more flexible, avoids single inheritance issues, and works better with executors and thread pools.

This is a **strong interview answer**.
