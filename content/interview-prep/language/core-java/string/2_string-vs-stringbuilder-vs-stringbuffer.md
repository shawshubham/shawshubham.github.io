---
title: "String vs StringBuilder vs StringBuffer"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-220"
  phase: "Core"
  topic: "Strings"
  round: "Technical"
  company: ""
  tags:
    [
      "string",
      "stringbuilder",
      "stringbuffer",
      "immutability",
      "performance",
      "java",
    ]
---

## 1. Short Answer (Interview Style)

---

> **String in Java is immutable, while StringBuilder and StringBuffer are mutable. StringBuilder is not thread-safe and is faster, whereas StringBuffer is thread-safe but slower due to synchronization.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- immutability in Java
- performance trade-offs
- thread safety
- when to use which class

This is one of the most common Core Java interview questions.

---

## 3. String (Immutable)

---

String objects are **immutable**, meaning once created, they cannot be changed.

```java
String s = "Java";
s.concat(" World");
System.out.println(s);
```

Output:

```
Java
```

Because:

- concat creates a new object
- original string remains unchanged

### Why String is Immutable?

- security (file paths, URLs)
- string pool optimization
- thread safety
- hashcode caching

---

## 4. StringBuilder (Mutable, Not Thread-Safe)

---

StringBuilder is mutable.

```java
StringBuilder sb = new StringBuilder("Java");
sb.append(" World");
System.out.println(sb);
```

Output:

```
Java World
```

Features:

- mutable
- not thread-safe
- faster than StringBuffer

---

## 5. StringBuffer (Mutable, Thread-Safe)

---

StringBuffer is also mutable but **thread-safe**.

```java
StringBuffer sb = new StringBuffer("Java");
sb.append(" World");
System.out.println(sb);
```

Features:

- mutable
- thread-safe (synchronized methods)
- slower than StringBuilder

---

## 6. Key Differences

---

| Feature         | String                     | StringBuilder              | StringBuffer              |
| --------------- | -------------------------- | -------------------------- | ------------------------- |
| Mutability      | Immutable                  | Mutable                    | Mutable                   |
| Thread Safety   | Yes                        | No                         | Yes                       |
| Performance     | Slow (new object creation) | Fast                       | Slower than Builder       |
| Synchronization | Not needed                 | No                         | Yes                       |
| Use Case        | Constant data              | Single-threaded operations | Multi-threaded operations |

---

## 7. Performance Example

---

```java
String s = "";
for (int i = 0; i < 1000; i++) {
    s = s + i; // Creates new object every time
}
```

Better approach:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
```

This avoids unnecessary object creation.

---

## 8. When to Use Which

---

- Use **String** when value should not change
- Use **StringBuilder** in single-threaded scenarios
- Use **StringBuffer** in multi-threaded scenarios

---

## 9. Important Interview Questions

---

### Why String is immutable?

Answer: For security, performance (string pool), thread safety, and caching.

### Why StringBuilder is faster than StringBuffer?

Answer: Because it is not synchronized.

### Is String thread-safe?

Answer: Yes, because it is immutable.

### Can we convert StringBuilder to String?

Answer: Yes, using `toString()`.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between String, StringBuilder, and StringBuffer?

Answer like this:

> String is immutable, while StringBuilder and StringBuffer are mutable. StringBuilder is not thread-safe and is faster, whereas StringBuffer is thread-safe but slower due to synchronization. String is mainly used for constant data, StringBuilder for single-threaded mutable operations, and StringBuffer for thread-safe operations.
