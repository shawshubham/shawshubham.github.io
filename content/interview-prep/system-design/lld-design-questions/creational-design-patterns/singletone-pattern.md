---
title: "What is Singleton Pattern?"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-215"
  phase: "Core"
  topic: "Design Patterns"
  round: "Technical"
  company: ""
  tags: ["singleton pattern", "design pattern", "thread safety", "java", "static"]
---

## 1. Short Answer (Interview Style)

---

> **Singleton Pattern is a creational design pattern that ensures only one instance of a class exists in the JVM and provides a global access point to that instance. It is commonly used for shared resources like configuration managers, loggers, and caches.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- creational design patterns
- object lifecycle control
- thread safety
- lazy vs eager initialization
- synchronization and concurrency trade-offs

This is a very common interview question in both Core Java and LLD rounds.

---

## 3. Why Do We Need Singleton Pattern?

---

Sometimes an application should have only one object of a class.

Examples:

- Logger
- Configuration manager
- Cache manager
- Connection pool manager

If multiple instances are created unnecessarily:

- state may become inconsistent
- resources may be wasted
- behavior may become unpredictable

Singleton Pattern solves this by restricting object creation to only one instance.

---

## 4. Basic Singleton Implementation

---

```java
class Singleton {
    private static Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

Important points:

- constructor is `private`
- instance is stored in a static field
- object is accessed through `getInstance()`

---

## 5. Problem with Basic Singleton

---

The previous implementation is **not thread-safe**.

If two threads execute this at the same time:

```java
if (instance == null) {
    instance = new Singleton();
}
```

both may create separate objects.

So in multithreaded environments, basic singleton is unsafe.

---

## 6. Thread-Safe Singleton Approaches

---

### 1. Synchronized Method

```java
class Singleton {
    private static Singleton instance;

    private Singleton() {
    }

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

This is thread-safe, but synchronization on every call affects performance.

---

### 2. Eager Initialization

```java
class Singleton {
    private static final Singleton instance = new Singleton();

    private Singleton() {
    }

    public static Singleton getInstance() {
        return instance;
    }
}
```

This is thread-safe because the instance is created when the class is loaded.

Downside:
- object is created even if never used

---

### 3. Double-Checked Locking

```java
class Singleton {
    private static volatile Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

Important point:

- `volatile` is required
- avoids synchronization after initialization

This is a very common interview answer.

---

### 4. Bill Pugh Singleton (Best Practical Approach)

```java
class Singleton {
    private Singleton() {
    }

    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}
```

Why this is good:

- lazy initialization
- thread-safe
- no explicit synchronization
- uses class loading guarantees

This is one of the best practical implementations.

---

### 5. Enum Singleton (Safest Against Reflection/Serialization)

```java
enum Singleton {
    INSTANCE;
}
```

Why this is special:

- thread-safe by default
- safe against serialization issues
- safe against reflection attacks in most cases

But in interviews, explain that enum singleton is elegant, though traditional class-based singleton is still commonly discussed.

---

## 7. Singleton vs Static Class

---

| Singleton | Static Class |
|----------|--------------|
| Has single object instance | No object instance |
| Supports interfaces/inheritance patterns | Limited flexibility |
| Can implement lazy loading | Loaded at class load time |
| Can hold state in object form | Mostly utility-style behavior |

---

## 8. Important Interview Points

---

### Why constructor is private?
Answer: To prevent object creation from outside the class.

### Why use volatile in double-checked locking?
Answer: To prevent instruction reordering and ensure visibility across threads.

### Which singleton implementation is best?
Answer: Bill Pugh is a great practical choice; Enum singleton is safest for serialization and reflection concerns.

### Can singleton be broken?
Answer: Yes, using reflection, serialization, or cloning if not handled properly.

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Singleton Pattern?

Answer like this:

> Singleton Pattern is a creational design pattern that ensures only one instance of a class exists and provides a global access point to it. It is commonly used for shared resources like loggers, config managers, and caches. In multithreaded environments, thread-safe implementations such as synchronized singleton, double-checked locking with volatile, Bill Pugh singleton, or enum singleton are preferred.

---

## 10. Learn More (Deep Dive)

For a deeper understanding of Singleton Pattern with LLD-focused trade-offs and full design discussion, refer to the main learning article.