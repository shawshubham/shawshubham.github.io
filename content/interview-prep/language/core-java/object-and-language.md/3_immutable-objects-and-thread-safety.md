---
title: "Immutable Objects and Thread Safety"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-207"
  phase: "Core"
  topic: "Object & Language"
  round: "Technical"
  company: ""
  tags: ["immutable", "thread safety", "string immutable", "concurrency", "java"]
---

## 1. Short Answer (Interview Style)

---

> **An immutable object is an object whose state cannot be changed after it is created. Immutable objects are inherently thread-safe because multiple threads can access them without synchronization since their state never changes. String is the most common example of an immutable class in Java.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- object immutability
- thread safety
- String immutability
- concurrency basics
- defensive copying

This is a very common Core Java interview question.

---

## 3. What is an Immutable Object?

---

An **immutable object** is an object whose state cannot be modified after creation.

Once the object is created:

- fields cannot change
- object state cannot change
- no setters

Example:

```java
String s = "Java";
s.concat(" World");
System.out.println(s);
```

Output:

```
Java
```

Because String is immutable, concat creates a new object.

---

## 4. Why Immutable Objects Are Thread-Safe

---

If an object cannot change after creation, then multiple threads can read it safely.

Problem with mutable objects:

```
Thread 1 modifies object
Thread 2 reads object at same time
→ Inconsistent state
```

Immutable objects solve this problem because:

> No thread can modify the object state.

So immutable objects are **naturally thread-safe**.

---

## 5. How to Create an Immutable Class

---

Steps to make a class immutable:

1. Make class final
2. Make fields private and final
3. Do not provide setters
4. Initialize fields via constructor
5. Return defensive copies for mutable fields

### Example Immutable Class

```java
final class Employee {
    private final int id;
    private final String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

This class is immutable because state cannot change after creation.

---

## 6. Immutable Class with Mutable Field (Important Interview Point)

---

If a class contains mutable objects like Date or List, we must use **defensive copying**.

Example:

```java
final class Employee {
    private final int id;
    private final Date joiningDate;

    public Employee(int id, Date joiningDate) {
        this.id = id;
        this.joiningDate = new Date(joiningDate.getTime());
    }

    public Date getJoiningDate() {
        return new Date(joiningDate.getTime());
    }
}
```

This prevents external code from modifying internal state.

This is a very important interview concept.

---

## 7. Why String is Immutable

---

Interviewers love this question.

Reasons String is immutable:

- Security (file paths, URLs, DB connections)
- String pool optimization
- Thread safety
- Hashcode caching

If String were mutable, string pool would break and security issues could occur.

---

## 8. Mutable vs Immutable Objects

---

| Mutable | Immutable |
|--------|-----------|
| State can change | State cannot change |
| Not thread-safe | Thread-safe |
| Requires synchronization | No synchronization needed |
| Example: ArrayList | Example: String |

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is an immutable object and why is it thread-safe?

Answer like this:

> An immutable object is an object whose state cannot be changed after it is created. Immutable objects are thread-safe because their state never changes, so multiple threads can access them without synchronization. To create an immutable class in Java, we make the class final, fields private and final, initialize them via constructor, avoid setters, and return defensive copies for mutable fields.