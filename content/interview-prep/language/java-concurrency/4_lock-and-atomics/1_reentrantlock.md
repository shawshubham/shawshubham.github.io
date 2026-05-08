---
title: "ReentrantLock in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-concurrency-108"
  phase: "Core"
  topic: "Locks & Atomics"
  round: "Technical"
  company: ""
  tags: ["reentrantlock", "java", "locks", "synchronized", "concurrency"]
---

## 1. Short Answer (Interview Style)

---

> **ReentrantLock is a flexible and advanced locking mechanism in Java that provides more control than synchronized blocks, including features like tryLock(), fairness policy, interruptible locking, and multiple condition variables.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- advanced locking mechanisms
- limitations of synchronized
- concurrency control in real systems
- performance and flexibility trade-offs

This is a very common Java concurrency interview question.

---

## 3. What is ReentrantLock?

---

ReentrantLock is a class from:

```java
java.util.concurrent.locks
```

It provides explicit lock/unlock control instead of implicit locking using synchronized.

---

## 4. Basic Example

---

```java
import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}
```

Important:

> Always release lock in finally block.

---

## 5. Why ReentrantLock?

---

Problems with synchronized:

- no try lock
- no timeout
- no fairness control
- no interruptible lock

ReentrantLock provides solutions to these.

---

## 6. Key Features of ReentrantLock

---

### 1. tryLock()

```java
if (lock.tryLock()) {
    try {
        // critical section
    } finally {
        lock.unlock();
    }
}
```

- does not block
- returns immediately

---

### 2. tryLock with timeout

```java
lock.tryLock(2, TimeUnit.SECONDS);
```

- waits for specific time

---

### 3. Fairness Policy

```java
ReentrantLock lock = new ReentrantLock(true);
```

- true → fair (FIFO)
- false → non-fair (default, better performance)

---

### 4. Interruptible Lock

```java
lock.lockInterruptibly();
```

- allows thread to be interrupted while waiting

---

### 5. Reentrancy

Same thread can acquire lock multiple times:

```java
lock.lock();
lock.lock();
```

Must unlock same number of times.

---

## 7. ReentrantLock vs synchronized

---

| Feature       | synchronized | ReentrantLock             |
| ------------- | ------------ | ------------------------- |
| Lock control  | implicit     | explicit                  |
| tryLock       | No           | Yes                       |
| Timeout       | No           | Yes                       |
| Fairness      | No           | Yes                       |
| Interruptible | No           | Yes                       |
| Performance   | Good         | Better in high contention |

---

## 8. When to Use ReentrantLock

---

Use ReentrantLock when:

- need non-blocking attempts (tryLock)
- need timeout-based locking
- need fairness control
- need interruptible locking

Otherwise:

- use synchronized for simplicity

---

## 9. Important Interview Points

---

### What is reentrancy?

Answer: Same thread can acquire same lock multiple times.

---

### What happens if unlock is not called?

Answer: Lock is never released → potential deadlock.

---

### Which is better: synchronized or ReentrantLock?

Answer:

- synchronized → simpler
- ReentrantLock → more flexible

---

### Is ReentrantLock reentrant like synchronized?

Answer: Yes.

---

### What are Condition variables in ReentrantLock?

Answer:
ReentrantLock allows multiple Condition objects (like multiple wait sets), unlike synchronized which has only one monitor wait set. This gives more fine-grained control over thread coordination.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is ReentrantLock in Java?

Answer like this:

> ReentrantLock is an advanced locking mechanism in Java that provides more control than synchronized blocks. It supports features like tryLock, timeout, fairness, and interruptible locking. It is useful in high-concurrency scenarios where fine-grained control over locking is required.
