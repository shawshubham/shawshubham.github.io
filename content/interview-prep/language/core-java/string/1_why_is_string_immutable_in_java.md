---
title: "Why is String immutable in Java?"
layout: "interview-prep-topic-content"
weight: 1
interview:
  id: "java-core-001"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Immutability"
  round: "Technical"
  company: "Deutsche Bank" # optional
  tags: ["string", "immutability", "security", "memory"]
---

## 1. Short Answer (Interview Style)

---

> **String is immutable in Java because once a String object is created, its value cannot be changed.  
> This improves security, enables string pooling, improves performance, and makes Strings thread-safe.**

---

## 2. What Does Immutable Mean?

---

Immutable means:

> The object’s state cannot change after it is created.

Example:

```java
String s = "hello";
s = s + " world";
```

Here:

- "hello" is not modified
- A **new String object** "hello world" is created
- s now points to the new object

---

## 3. How String Is Made Immutable Internally

---

String class is declared like this:

```java
public final class String {
    private final char[] value;
}
```

Key points:

- Class is **final** → cannot be subclassed
- Internal array is **private**
- Array reference is **final**
- No setter methods
- Any modification creates **new object**

---

## 4. Why String Is Immutable (Very Important for Interviews)

---

This is usually what interviewer actually wants.

### Reason 1 — String Pool (Memory Optimization)

Java stores strings in **String Pool**.

If strings were mutable:

```java
String a = "hello";
String b = "hello";
```

Both would point to same object.

If a changes → b would also change → **huge problem**.

So immutability allows **string pooling** safely.

### Reason 2 — Security

Strings are used in:

- Database URLs
- File paths
- Network connections
- Class loading
- User credentials

If Strings were mutable, someone could change the value after validation.

Example:

```java
String path = "/safe/file.txt";
// validate path
// attacker changes string to "/etc/passwd"
```

Immutability prevents this.

### Reason 3 — Thread Safety

Since String cannot change, multiple threads can use same String safely.

No synchronization required.

### Reason 4 — HashCode Caching (Performance)

String is heavily used as **HashMap key**.

Hashcode is cached:

```java
private int hash;
```

If String were mutable, hashCode would change → HashMap would break.

So immutability allows:

- Cached hashcode
- Faster HashMap operations

---

## 5. Interview Follow-up Questions

---

After asking **"Why is String immutable?"**, interviewers often ask related follow-up questions to check deeper understanding.

### Common Follow-up Questions

| Follow-up Question                                              | What Interviewer Is Testing           |
| --------------------------------------------------------------- | ------------------------------------- |
| How to create an immutable class?                               | OOP design principles                 |
| Why is String used as HashMap key?                              | Hashing & immutability                |
| What is String pool vs heap?                                    | Memory model                          |
| String vs StringBuilder vs StringBuffer?                        | Performance                           |
| How many objects are created in `String s = new String("abc");` | Memory & string pool                  |
| What is intern() method?                                        | String pool behavior                  |
| Can we make String mutable?                                     | Understanding of final & immutability |
| Why are wrapper classes immutable?                              | Design reasoning                      |
| Is immutability related to thread safety?                       | Concurrency basics                    |

---

## 6. How to Create Your Own Immutable Class

---

```java
final class Employee {
    private final String name;
    private final int id;

    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }
}
```

Rules:

1. Class final
2. Fields private final
3. No setters
4. Initialize via constructor
5. Return copies if mutable objects

---

## 7. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> Why is String immutable?

Answer like this:

> String is immutable for four main reasons:
>
> 1. String pool memory optimization
> 2. Security (used in file paths, DB connections, class loading)
> 3. Thread safety
> 4. Hashcode caching for HashMap performance
>
> Internally String class is final and stores characters in a private final array, so once created its value cannot change.

This is a **perfect interview answer**.
