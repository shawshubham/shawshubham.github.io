---
title: "Creating Threads in Java"
weight: 2
description: "Learn different ways to create threads in Java using Thread, Runnable, Callable, and Future — including best practices for scalable multithreading."
keywords:
  - creating threads in java
  - java multithreading tutorial
  - java concurrency beginner
  - thread vs runnable
  - callable and future java
  - java executorservice
  - multithreading best practices
  - java thread examples
  - java concurrency guide
date: 2025-10-23
author: "Shubham Shaw"
tags: ["Java", "Multithreading", "Concurrency", "Core Java", "Learning Path"]
summary: "Learn how to create threads using Thread, Runnable, Callable, and Future — along with best practices for scalable, maintainable, and efficient multithreading in Java."
layout: "topic-content"
---

## 1. Ways to Create a Thread in Java

---

In Java, a thread is the smallest unit of execution within a program. Java provides multiple ways to create and manage threads, each with its own advantages and best practices. This article explores the different methods for creating threads, how to return results from threads, and best practices for efficient multithreading.

Java provides three primary ways to create threads:

1. Extending the Thread class
2. Implementing the Runnable interface
3. Using Callable and Future to return results from threads

Each approach serves a different use case, and understanding them helps in designing efficient multithreaded applications.
​​

## 2. Extending the Thread Class

---

The simplest way to create a thread in Java is by extending the Thread class and overriding its run() method.
Example: Creating a Thread by Extending the Thread Class

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/main/src/com/theshubhamco/learn/multithreading/creatingThread/ThreadExample.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
class MyThread extends Thread{
	@Override
	public void run() {
		System.out.println("Thread running: " + Thread.currentThread().getName());
	}
}

public class ThreadExample {

    public static void main(String[] args) {
    	System.out.println("Main class having thread name: "+ Thread.currentThread().getName());
    	MyThread thread = new MyThread();//creating thread
    	/*
    	 * What if we we directly execute the run() method, it will just be treated as normal method
    	 * and executed by main thread
    	*/
    	thread.run();

    	//Starting the thread
    	thread.start();
    }

}

```

#### Output

```output
Main class having thread name: main
Thread running: main
Thread running: Thread-0
```

### Explanation:

- The MyThread class extends Thread and overrides the run() method, which contains the code that will be executed when the thread starts.
- The start() method is called to begin execution of the thread.
- Java automatically assigns a thread name (e.g., Thread-0).​

### When to Use?

- When creating a thread that does not require sharing logic with multiple threads.
- When thread-specific behavior needs to be customized.

### Limitations:

- **Not ideal for large applications:** Since Java does not support multiple inheritance, extending Thread prevents the class from extending other classes.
- **Less flexible:** The Thread class includes additional methods that might not be required, leading to unnecessary overhead.

## 3. Implementing the Runnable Interface

---

A better approach for creating threads is implementing the Runnable interface. It allows better flexibility and separation of concerns.

### Example: Creating a Thread by Implementing Runnable

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/main/src/com/theshubhamco/learn/multithreading/creatingThread/RunnableExample.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        Thread thread2 = new Thread(new MyRunnable()); // Creating thread using Runnable
        thread2.start(); // Start the thread
    }
}
```

#### Output

```
Thread running: Thread-0
```

### Advantages of Runnable

- **Encourages Reusability:** The same Runnable instance can be reused with multiple threads.
- **Supports Multiple Inheritance:** Since Java supports single inheritance, implementing Runnable allows the class to extend another class if needed.
- **More Flexible:** Easily integrates with Java’s Executor Framework.

### When to Use?

- When multiple threads need to execute the same task.
- When a class already extends another class (avoiding multiple inheritance issues).

## 4. Using Callable and Future to Return Results

---

The previous two methods (Thread and Runnable) do not return results. Java provides the Callable interface and Future class to handle tasks that return results.
**Example: Using Callable and Future**

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/main/src/com/theshubhamco/learn/multithreading/creatingThread/CallableExample.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class MyCallable implements Callable<Integer>{
	@Override
	public Integer call() throws Exception {
		System.out.println("Thread name: "+Thread.currentThread().getName());
		return 3*30; //returning result
	}
}

public class CallableExample {
	public static void main(String[] args) {
		ExecutorService executor = Executors.newSingleThreadExecutor();
		Future<Integer> future = executor.submit(new MyCallable());

		try {
			System.out.println("Result from the thread: "+ future.get());
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		executor.shutdown();
	}
}
```

#### Output

```output
Thread name: pool-1-thread-1
Result from the thread: 90
```

### Advantages of Callable

- **Can Return Results:** Unlike Runnable, Callable allows returning a value.
- **Supports Exception Handling:** Can throw checked exceptions.

### When to Use?

- When a thread needs to return a computed result.
- When handling time-consuming operations asynchronously.

## ​5. Thread Creation Best Practices

---

Efficient thread management is critical in real-world applications. Here are some best practices:

### 5.1 Prefer Using ExecutorService Over Manually Creating Threads

Instead of manually creating threads using new Thread(), use Java’s built-in thread pools.
**Example: Using ExecutorService**

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/main/src/com/theshubhamco/learn/multithreading/creatingThread/ExecutorExample.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3); // Thread pool of size 3

        for (int i = 1; i <= 5; i++) {
            executor.execute(() -> System.out.println("Executing task: " + Thread.currentThread().getName()));
        }

        executor.shutdown();
    }
}
```

#### Output

```output
Executing Task: pool-1-thread-3
Executing Task: pool-1-thread-1
Executing Task: pool-1-thread-2
Executing Task: pool-1-thread-3
Executing Task: pool-1-thread-1
```

### Why use Executors?

- **Thread Pooling:** Reuses threads, reducing overhead.
- **Automatic Thread Management:** Manages thread lifecycle and optimizes performance.

### ​5.2 Avoid Overloading CPU

- Too many threads can slow down execution due to context switching overhead.
- A general rule is to limit the number of threads to CPU Cores + 1 for CPU-intensive tasks.

### 5.3 Use join() to Ensure Execution Order

The join() method ensures that one thread completes execution before another starts.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/main/src/com/theshubhamco/learn/multithreading/creatingThread/JoinExample.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
class MyTask extends Thread{
	public void run() {
		System.out.println("Task Executed by thread: "+Thread.currentThread().getName());
		try {
			Thread.currentThread().sleep(5000); //sleeping for 5000ms
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("Thread ending :" + Thread.currentThread().getName()  );
	}
}

public class JoinExample {
	public static void main(String[] args) throws InterruptedException {
		Thread thread1 = new MyTask();
		Thread thread2 = new MyTask();

		thread1.start();
		//Ensures thread1 finishes before thread2 starts, comment below line to see difference
		thread1.join();

		thread2.start();
	}
}
```

#### Output

```output
Task Executed by thread: Thread-0
Thread ending :Thread-0
Task Executed by thread: Thread-1
Thread ending :Thread-1
```

### 5.4 Handle Exceptions Properly in Threads

Never leave exceptions unhandled in threads. Use Thread.UncaughtExceptionHandler for better debugging.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/main/src/com/theshubhamco/learn/multithreading/creatingThread/JoinExample.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
class ErrorThread implements Runnable{
	@Override
	public void run() {
		throw new RuntimeException("Something went wrong!");
	}
}

public class ExceptionHandlingExample {
	public static void main(String[] args) {
		Thread thread = new Thread(new ErrorThread());
		thread.setUncaughtExceptionHandler((t, e) -> System.out.println("Error in thread: " + t.getName() + " : " + e.getMessage()));
		thread.start();
	}
}
```

#### Output

```output
Error in thread: Thread-0 : Something went wrong!
```

## Conclusion

In Java, threads can be created using:

1. Extending Thread (Simple, but not flexible).
2. Implementing Runnable (More reusable and supports multiple inheritance).
3. Using Callable with Future (Best for returning results).

Following best practices like using ExecutorService, limiting thread count, and handling exceptions properly will ensure efficient and scalable multithreading.
