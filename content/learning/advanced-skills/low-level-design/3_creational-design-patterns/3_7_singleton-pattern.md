---
title: "Singleton Pattern – Mechanics & Correct Implementations"
description: "Learn how to correctly implement the Singleton pattern in Java. Understand lazy initialization, thread safety, JVM guarantees, Bill Pugh Singleton, and enum-based Singleton."
keywords:
  - singleton pattern java
  - singleton design pattern
  - thread safe singleton
  - bill pugh singleton
  - enum singleton java
  - creational design patterns
weight: 7
date: 2025-12-24
layout: "topic-content"
---

## 1. What Is the Singleton Pattern?

---

The **Singleton Pattern** ensures that:

> **A class has exactly one instance and provides a global access point to it.**

In other words:

- Only **one object** of the class can ever exist
- That object is **shared** across the application

The Singleton pattern is one of the most frequently discussed — and misused — design patterns in Java interviews.

This pattern belongs to the **Creational Design Patterns** family because it controls **object creation**.

---

## 2. Why Does Singleton Exist?

---

Singleton was originally introduced to solve problems like:

- Centralized configuration
- Shared logging
- Global coordination points
- Resource-heavy objects (created once)

At its core, Singleton answers this question:

> **How do we prevent multiple instances of a class from being created?**

---

## 3. Implementing Singleton Design Pattern

#### Achieving a Class with Only a Single Instance

---

The **core goal** of the Singleton pattern is simple:

> **Ensure that a class has only one instance and provide a global access point to it.**

To achieve this, we must solve two problems:

1. **Prevent external code from creating objects**
2. **Control how and when the single instance is created**

Let’s build the solution step by step.

### Step 1: Restrict Object Creation

If other classes can freely create objects using new, enforcing a single instance is impossible.

So the first step is to **make the constructor private**:

```java
public class Singleton {
    private Singleton() {
        // private constructor prevents external instantiation
    }
}
```

This ensures:

- No external class can create an instance using new
- The class itself controls **when and how** the instance is created

At this point, we’ve successfully **blocked multiple instances** — but we’ve introduced a new problem:

> ❓ If the constructor is private, how do we get an instance at all?

### Step 2: Provide a Global Access Method

To allow controlled access, we expose a **static method**:

```java
public class Singleton {
    private Singleton() {
        // private constructor prevents external instantiation
    }

    public static Singleton getInstance(){
        return new Singleton();
    }
}
```

This compiles — but it still creates **a new object every time**.

So we’ve solved accessibility, but **not uniqueness**.

### Step 3: Store and Reuse a Single Instance (Eager Initialization)

To ensure only one instance exists, we store it as a **private static field**.  
This shifts full control of instance creation **inside the class itself**.

- The **field is private** to prevent external access,
- The **field is static** so it can be accessed from the static getInstance() method.

This guarantees that all callers receive the same shared instance.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/eager/">See Code in Git Repo</a>
</div>

```java
public class Singleton {
    private static Singleton instance = new Singleton();
    private Singleton() {
        // private constructor prevents external instantiation
        // Imagine a heavy initialization (DB connection, Kafka client, etc.)
        System.out.println("Creating Singleton Instance");
    }

    public static Singleton getInstance(){
        return instance;
    }

    // Some dummy methods ...
    public static void doSomething(){
        System.out.println("Doing Something");
    }
}
```

```java
public class SingletonDemo {
    static void main(String[] args) {
        System.out.println("Starting the main method");
        Singleton.doSomething();

        Singleton instance = Singleton.getInstance();
        Singleton instance2 = Singleton.getInstance();

        System.out.println(String.format("Both Instances are same: %b", instance == instance2));
    }
}
```

```text
OUTPUT:
Starting the main method
Creating Singleton Instance
Doing Something
Both Instances are same: true
```

This guarantees a single instance.

This approach is called **Eager Initialization**.

### 3.1 ⚠️ Drawback of Eager Initialization

Although this implementation is simple and thread-safe, it has an important downside.

> **The instance is created as soon as the class is loaded by the JVM.**

A key JVM behavior to understand here:

- The JVM typically loads classes **lazily**, when they are first referenced
- However, **static fields are initialized during class loading**
- That means the Singleton instance is created **even if it is never actually used**

#### In the example above:

- Calling _Singleton.doSomething()_ triggers class loading
- The Singleton instance is created immediately
- The heavy constructor runs **before we explicitly ask for the instance**

This leads to real problems when:

- The constructor performs expensive work
- Application startup time matters
- The Singleton is rarely or conditionally used

#### Summary of the problem

- ❌ Increased startup time
- ❌ Unnecessary resource allocation
- ❌ Work done even when the instance is never needed

To address this, we introduce **Lazy Initialization**, where the instance is created **only when it is actually requested**.

---

## 4. Lazy Initialization (Basic Version)

---

This approach is commonly referred to as **lazy initialization** or the **lazy Singleton pattern**.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/basic">See Code in Git Repo</a>
</div>

```java
public class Singleton {
    private static Singleton instance = null;
    private Singleton() {
        // private constructor prevents external instantiation
    }

    public static Singleton getInstance(){
        if(instance == null){
            instance = new Singleton();
        }
        return instance;
    }
}
```

Now the instance is created **only when needed**.

But this version has **a serious flaw**.

### 4.1 ❗ The Multithreading Problem

If two threads enter `getInstance()` at the same time, both may see `instance == null` and create **two objects**.

Example race condition:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/basic/multithreadproblem">See Code in Git Repo</a>
</div>

```java
public class CreatingSingleton implements Runnable {
    @Override
    public void run(){
        Singleton instance = Singleton.getInstance();
        System.out.println(Thread.currentThread.getName() +
        ": HashCode: " + instance.hashCode());
    }
}

class SingletonTest {
    public static void main(String [] args) {
        Thread t1 = new Thread (new CreatingSingleton());
        Thread t2 = new Thread (new CreatingSingleton());
        t1.start();
        t2.start();
    }
}
```

This problem may not reproduce every time, but the design is still incorrect.

This violates the Singleton guarantee.

So we must make it **thread-safe**.

---

## 5. Making Singleton Thread-Safe

---

### 5.1 Synchronized method (Simple but Costly)

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/threadsafe/synchronizemethod">See Code in Git Repo</a>
</div>

```java
public class Singleton {
    private static Singleton instance = null;
    private Singleton() {
        // private constructor prevents external instantiation
    }

    //made the method synchronized
    public static synchronized Singleton getInstance(){
        if(instance == null){
            instance = new Singleton();
        }
        return instance;
    }
}
```

✅ Thread-safe  
❌ Performance bottleneck — every call is synchronized

### 5.2 Synchronized Block (Thread-Safe but Inefficient)

A common second attempt is to use a **synchronized block**.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/threadsafe/synchronizeblock">See Code in Git Repo</a>
</div>

```java
public class Singleton {
    private static Singleton instance = null;
    private Singleton() {
        // private constructor
    }

    public static Singleton getInstance(){
        // synchronized block
        synchronized (Singleton.class) {
            if(instance == null){
                instance = new Singleton();
            }
        }

        return instance;
    }
}
```

### 5.2.1 Why This Works

- Only **one thread can enter** the synchronized block at a time
- Object creation happens under lock
- Memory visibility and instruction ordering are guaranteed

✅ **This implementation is thread-safe**  
❌ **But it is inefficient**

### 5.2.2 The Real Problem

Even **after the instance is created**, every call to getInstance():

- acquires a lock
- blocks other threads
- adds unnecessary synchronization overhead

In other words:

> **Synchronization protects initialization — but here it also slows down every access.**

This becomes a **performance bottleneck** in high-throughput systems.

### 5.3 Double-Checked Locking (Optimized and Correct)

To avoid synchronizing every call, we refine the approach using **Double-Checked Locking (DCL)**.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/threadsafe/doublecheckedlocking">See Code in Git Repo</a>
</div>

```java
public class Singleton {
    private static volatile Singleton instance = null;

    private Singleton() {
        // private constructor
    }

    public static Singleton getInstance() {
        if (instance == null) {                 // 1️⃣ Fast path (no lock)
            synchronized (Singleton.class) {
                if (instance == null) {         // 2️⃣ Safe initialization
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

### 5.3.1 What Changed?

- The **first null check** avoids synchronization once the instance exists
- Locking happens **only during first initialization**
- Subsequent calls are **lock-free**

This drastically improves performance.

### 5.3.2 Why volatile Is Mandatory Here

Unlike the previous version, this implementation:

- reads instance **outside synchronization**
- exposes the code to **instruction reordering**

Without _volatile_, the JVM could reorder object creation like this:

1. Allocate memory
2. Assign reference to instance
3. Execute constructor

Another thread might observe a **non-null but partially constructed object**.

```java
private static volatile Singleton instance;
```

volatile ensures:

- safe publication
- visibility across threads
- no reordering of initialization
- supported correctly since Java 5

> #### Interview Insight
>
> The synchronized block version is correct but inefficient.  
> Double-checked locking improves performance by synchronizing only during initialization, and volatile is
> required to prevent instruction reordering.

### 5.3.3 Design Note

Even though DCL is correct today, it is:

- verbose
- easy to implement incorrectly
- harder to reason about

That’s why modern Java strongly prefers the **Initialization-on-Demand Holder Idiom**, which we’ll see next.

### 5.4 Initialization-on-Demand Holder Idiom (Bill Pugh Singleton)

This is the **most recommended approach.**

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/threadsafe/billpughsingleton">See Code in Git Repo</a>
</div>

```java
public class Singleton {
    private Singleton() {
        // private constructor
    }

    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance(){
        return Holder.INSTANCE;
    }
}
```

### 5.4.1 Why this works

- JVM loads the inner class only when needed
- Class loading is thread-safe by default
- No synchronization required

### 5.4.2 ✅ Advantages

- Lazy-loaded
- Thread-safe
- Clean and readable
- High performance

### 5.5 Enum Singleton (JVM-Guaranteed, Not Truly Lazy)

Java provides a **special, JVM-level guarantee** for enum types that makes them a powerful way to implement Singleton.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/singleton/lazy/threadsafe/enumsingleton">See Code in Git Repo</a>
</div>

```java
public enum Singleton {
    INSTANCE;

    Singleton(){
        // Inside Singleton constructor
    }

    public void doSomething() {
        // Doing some work
    }
}
```

#### Accessing the singleton Example : how to use it,

```java
public class EnumSingletonDemo {
    public static void main(String[] args) {
        Singleton obj1 = Singleton.INSTANCE;
        Singleton obj2 = Singleton.INSTANCE;

        System.out.println(obj1 == obj2); // true
    }
}
```

### 5.5.1 When Is the Enum Singleton Created?

> **The enum instance is created when the enum class is initialized by the JVM.**

This happens when the enum is first actively used, such as:

- Accessing Singleton.INSTANCE
- Calling any method on the enum
- Framework-driven class loading (reflection, scanning, etc.)

The JVM guarantees that:

- Enum initialization happens exactly once
- It is thread-safe by default

### 5.5.2 Is Enum Singleton Lazy or Eager?

**Short answer: Not truly lazy.**

- Enum Singleton does **not** use conditional or deferred creation logic
- Instance creation is tied to **class initialization**
- You cannot control when the instance is created in code

📌 Although the class may load on first use, this is **JVM class-loading behavior, not lazy Singleton initialization.**

➡️ From a design-pattern perspective, **Enum Singleton is considered eager.**

### 5.5.3 Key Characteristics & Trade-offs

#### Pros:

Enum Singleton is the **most robust Singleton implementation in Java**:

- ✅ JVM guarantees a single instance
- ✅ Thread-safe without synchronization
- ✅ Safe from reflection attacks
- ✅ Safe from serialization issues
- ✅ Very simple and concise

This is why it’s recommended in _Effective Java_.

#### Trade-offs

- ❌ No fine-grained lazy control
- ❌ Instance created at class initialization time
- ❌ Cannot extend classes
- ❌ Less flexible lifecycle management

### 5.5.5 When to Use Enum Singleton

Use it when:

- You **want maximum safety**
- The Singleton is lightweight
- Lifecycle control is not critical

Avoid it when:

- Initialization is expensive
- You need true lazy loading
- You rely heavily on Dependency Injection frameworks

> #### One-Line Takeaway
>
> Enum Singleton is the safest Singleton in Java — but it is not truly lazy and should be used deliberately.

---

## Summary: Singleton Implementations at a Glance

---

| Approach               | Lazy                     | Thread-Safe | Recommended       |
| ---------------------- | ------------------------ | ----------- | ----------------- |
| Eager Initialization   | ❌                       | ✅          | ❌                |
| Lazy (Basic)           | ✅                       | ❌          | ❌                |
| Synchronized Method    | ✅                       | ✅          | ❌                |
| Double-Checked Locking | ✅                       | ✅          | ⚠️                |
| Bill Pugh (Holder)     | ✅                       | ✅          | ✅                |
| Enum Singleton         | ❌(eager via class init) | ✅          | ✅ (with caveats) |

---

### Key Takeaway (Before Moving On)

> **Singleton is easy to implement, but hard to apply correctly.**

---

### 🔗 What’s Next?

Knowing how to build a Singleton is only half the story.

The real design question is:

> **Should this class be a Singleton at all?**

That’s exactly what we’ll tackle next — using the **Employee Management System** to understand **when Singleton is a design smell** and when it is justified.

👉 **[Singleton : Should This Be a Singleton? →](/learning/advanced-skills/low-level-design/3_design-patterns/3_8_singleton-required-at-all)**
