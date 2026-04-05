---
title: "synchronized vs volatile"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-002"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Synchronization"
  round: "Technical"
  company: "" # optional
  tags:
    [
      "synchronized",
      "volatile",
      "concurrency",
      "visibility",
      "thread-safety",
      "java-memory-model",
    ]
---

## 1. Short Answer (Interview Style)

---

> **`synchronized` is used to provide mutual exclusion and visibility, meaning only one thread can execute the protected block at a time. `volatile` only provides visibility of variable updates across threads, but it does not provide atomicity or locking. Use `synchronized` when multiple threads modify shared state and correctness depends on compound operations. Use `volatile` when threads only need to see the latest value of a variable.**

---

## 2. Why This Question Matters

---

This is one of the most common Java concurrency interview questions because it checks whether you understand:

- visibility
- atomicity
- race conditions
- mutual exclusion
- practical thread-safety design

Many candidates know the words `synchronized` and `volatile`, but interviewers want to see whether you know **when each one is actually correct**.

---

## 3. What is `synchronized`?

---

`synchronized` is a Java keyword used to protect a critical section so that only one thread can execute it at a time.

It provides:

- **mutual exclusion**
- **visibility guarantees**

Java synchronization works using an **intrinsic lock**, also called a **monitor lock**.

A thread must acquire the monitor before entering synchronized code, and it releases the monitor when it exits.

### 3.1 Synchronized method

A synchronized instance method locks on the current object, that is, `this`.

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}
```

Here both `increment()` and `getCount()` use the same monitor lock: `this`.

So if one thread is inside `increment()`, another thread cannot enter either:

- `increment()`
- `getCount()`

until the lock is released.

### 3.2 Synchronized block

Instead of synchronizing the whole method, Java also allows synchronizing only the critical section.

```java
class Counter {
    private int count = 0;

    public void increment() {
        synchronized (this) {
            count++;
        }
    }

    public int getCount() {
        synchronized (this) {
            return count;
        }
    }
}
```

This also locks on `this`, so it behaves the same as the synchronized method version with respect to locking.

The main advantage is finer control: _you lock only the code that actually needs protection_.

### 3.3 How Java locks with synchronized

Java does not lock the method itself.  
It locks the **monitor associated with an object**.

- synchronized instance method → locks this
- synchronized (this) block → locks this
- static synchronized method → locks ClassName.class

Two synchronized sections block each other only if they try to acquire the **same lock object**.

### 3.4 Visibility guarantee

`synchronized` is not only about locking.

When one thread exits a synchronized block or method, changes made inside that critical section become visible to another thread that later acquires the same lock.

So synchronized provides both:

- **mutual exclusion**
- **visibility**

### Example summary

In the Counter example:

- both methods lock on the same object
- they cannot run concurrently on the same Counter instance
- this protects shared state and ensures updated values are visible across threads

---

## 4. What is `volatile`?

---

`volatile` is a Java keyword used on variables.

It tells the JVM that:

- reads of this variable should see the latest written value
- writes to this variable should be visible across threads immediately

It provides:

- **visibility**
- **ordering guarantees around that variable**

It does **not** provide:

- mutual exclusion
- atomicity for compound operations

### Example

```java
class TaskRunner {
    private volatile boolean running = true;

    public void stop() {
        running = false;
    }

    public void runLoop() {
        while (running) {
            // do work
        }
    }
}
```

Here `volatile` is appropriate because one thread updates `running` and another thread reads it.

---

## 5. Key Difference Between `synchronized` and `volatile`

---

| Feature                           | `synchronized`               | `volatile`              |
| --------------------------------- | ---------------------------- | ----------------------- |
| Type                              | keyword for methods/blocks   | keyword for variables   |
| Mutual exclusion                  | Yes                          | No                      |
| Visibility                        | Yes                          | Yes                     |
| Atomicity for compound operations | Yes                          | No                      |
| Locking involved                  | Yes                          | No                      |
| Use case                          | protect shared mutable state | latest value visibility |

---

## 6. Visibility vs Atomicity

---

This is the core of the question.

### Visibility

If one thread updates a variable, can another thread see the latest value?

Both `synchronized` and `volatile` help with visibility.

### Atomicity

Is an entire operation completed as one indivisible step?

Example:

```java
count++
```

This looks like one operation, but internally it is roughly:

1. read current value
2. add 1
3. write new value

That is a **compound operation**, not atomic.

So if multiple threads execute `count++` concurrently, `volatile` alone is not enough.

---

## 7. Why `volatile` Is Not Enough for `count++`

---

```java
class Counter {
    private volatile int count = 0;

    public void increment() {
        count++;
    }
}
```

This is **not thread-safe**.

Why?

Because `volatile` ensures that threads see the latest value, but it does not prevent two threads from doing this at the same time:

- Thread A reads 5
- Thread B reads 5
- Thread A writes 6
- Thread B writes 6

One increment is lost.

This is a race condition.

For such cases, use:

- `synchronized`
- `AtomicInteger`
- `Lock`

---

## 8. Example Where `volatile` Is Appropriate

---

A stop flag is the classic example.

```java
class Worker {
    private volatile boolean running = true;

    public void stopWork() {
        running = false;
    }

    public void doWork() {
        while (running) {
            // keep working
        }
    }
}
```

Why is `volatile` enough here?

Because:

- one thread writes the flag
- another thread reads it
- there is no compound read-modify-write operation

So visibility is enough.

---

## 9. Example Where `synchronized` Is Required

---

```java
class BankAccount {
    private int balance = 1000;

    public synchronized void withdraw(int amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }

    public synchronized int getBalance() {
        return balance;
    }
}
```

Here `synchronized` is needed because:

- checking balance
- subtracting amount
- updating state

must happen safely as one protected critical section.

If multiple threads withdraw at the same time without synchronization, balance correctness may break.

---

## 10. Does `synchronized` Also Provide Visibility?

---

Yes.

This is important.

Some people think:

- `volatile` = visibility
- `synchronized` = only locking

That is incomplete.

`synchronized` also provides visibility guarantees.

When a thread exits a synchronized block, its changes are flushed so that another thread entering the same synchronized block can see them.

So:

- `volatile` gives visibility without locking
- `synchronized` gives visibility plus mutual exclusion

---

## 11. When Should We Use Which?

---

### Use `volatile` when:

- a variable is read by multiple threads
- one thread updates it and others only need the latest value
- no compound update logic is involved
- example: status flag, shutdown flag, configuration refresh marker

### Use `synchronized` when:

- multiple threads modify shared mutable state
- operations must happen atomically
- correctness depends on protecting a critical section
- example: counters, balance updates, shared collections, compound checks and writes

---

## 12. Common Interview Trap

---

Interviewers often ask:

> If `volatile` makes values visible to all threads, why not just use `volatile` everywhere instead of `synchronized`?

Correct answer:

> Because visibility alone is not enough for thread safety. Many operations are compound and require atomicity. `volatile` cannot protect critical sections or prevent race conditions. `synchronized` is needed when multiple steps must execute safely together.

---

## 13. Important Interview Points

---

Strong points to mention in interviews:

- `volatile` provides visibility, not mutual exclusion
- `synchronized` provides both mutual exclusion and visibility
- `count++` is not atomic
- `volatile` is suitable for flags, not compound state updates
- `synchronized` is required when correctness depends on protecting shared mutable state
- `AtomicInteger` is often better than `synchronized` for simple atomic counters

---

## 14. Interview Follow-up Questions

---

After asking **"synchronized vs volatile"**, interviewers often ask related follow-ups.

### Common Follow-up Questions

| Follow-up Question                                         | What Interviewer Is Testing    |
| ---------------------------------------------------------- | ------------------------------ |
| Does `synchronized` also guarantee visibility?             | Memory model understanding     |
| Why is `count++` not safe with `volatile`?                 | Atomicity understanding        |
| When should we use `AtomicInteger` instead?                | Concurrent utility awareness   |
| Is `volatile` enough for singleton double-checked locking? | Advanced concurrency knowledge |
| Does `volatile` use locking?                               | Internal behavior              |
| Can multiple threads enter a volatile block?               | Concept correctness            |

---

## 15. Common Mistakes

---

Common mistakes developers make:

- thinking `volatile` makes all operations thread-safe
- assuming `synchronized` only gives locking and not visibility
- using `volatile` for counters
- not understanding the difference between visibility and atomicity
- overusing `synchronized` where simple atomic classes would be better

---

## 16. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between `synchronized` and `volatile` in Java?

Answer like this:

> `volatile` ensures that reads and writes of a variable are visible across threads, but it does not provide atomicity or locking. `synchronized` provides both visibility and mutual exclusion, so only one thread can execute the protected block at a time. We use `volatile` for simple visibility-based cases like flags, and `synchronized` when shared mutable state requires compound operations to be executed safely.

This is a **strong interview answer**.
