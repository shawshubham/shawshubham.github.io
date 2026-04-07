---
title: "AutoCloseable in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-224"
  phase: "Core"
  topic: "Resource Management"
  round: "Technical"
  company: ""
  tags:
    [
      "autocloseable",
      "java",
      "resource management",
      "try-with-resources",
      "closeable",
    ]
---

## 1. Short Answer (Interview Style)

---

> **AutoCloseable is an interface in Java that allows resources to be automatically closed after use. It is mainly used with try-with-resources to ensure proper resource management and prevent resource leaks.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- resource management in Java
- try-with-resources internals
- interface-based design
- preventing memory and connection leaks

This is a common Core Java interview question.

---

## 3. What is AutoCloseable?

---

`AutoCloseable` is an interface introduced in Java 7.

It has a single method:

```java
void close() throws Exception;
```

Any class implementing this interface can be used in **try-with-resources**.

---

## 4. Why AutoCloseable Was Introduced

---

Before Java 7:

- resources had to be closed manually
- required finally blocks
- error-prone and verbose

AutoCloseable enables:

- automatic cleanup
- cleaner code
- safer resource handling

---

## 5. Example with try-with-resources

---

```java
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    System.out.println(br.readLine());
}
```

Here:

- `BufferedReader` implements AutoCloseable
- `close()` is automatically called

---

## 6. Custom AutoCloseable Example

---

```java
class MyResource implements AutoCloseable {

    @Override
    public void close() {
        System.out.println("Resource closed");
    }
}
```

Usage:

```java
try (MyResource r = new MyResource()) {
    System.out.println("Using resource");
}
```

Output:

```text
Using resource
Resource closed
```

---

## 7. AutoCloseable vs Closeable

---

This is a common interview question.

| AutoCloseable            | Closeable                  |
| ------------------------ | -------------------------- |
| Introduced in Java 7     | Older interface (Java IO)  |
| close() throws Exception | close() throws IOException |
| More general             | More specific to IO        |

So:

> All Closeable are AutoCloseable, but not all AutoCloseable are Closeable.

---

## 8. Important Interview Points

---

### When is close() called?

Answer: Automatically at the end of try-with-resources block.

### Can we use custom classes in try-with-resources?

Answer: Yes, if they implement AutoCloseable.

### What happens if close() throws exception?

Answer: It becomes a suppressed exception if another exception already occurred.

### Is AutoCloseable related to finally?

Answer: It replaces manual cleanup typically done in finally.

---

## 9. Real-World Usage

---

AutoCloseable is used in:

- File handling (BufferedReader, FileInputStream)
- Database connections (Connection, Statement, ResultSet)
- Streams
- Custom resources

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is AutoCloseable in Java?

Answer like this:

> AutoCloseable is an interface in Java that allows resources to be automatically closed after use. It is mainly used with try-with-resources, where the close() method is called automatically at the end of the block. It helps reduce boilerplate code and prevents resource leaks.
