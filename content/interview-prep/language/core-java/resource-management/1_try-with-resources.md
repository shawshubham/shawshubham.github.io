---
title: "try-with-resources"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-216"
  phase: "Core"
  topic: "Resource Management"
  round: "Technical"
  company: ""
  tags:
    [
      "try-with-resources",
      "autocloseable",
      "resource management",
      "java",
      "exception handling",
    ]
---

## 1. Short Answer (Interview Style)

---

> **try-with-resources is a Java feature introduced in Java 7 that automatically closes resources after use. It is used with objects that implement AutoCloseable, such as files, streams, database connections, and readers. It helps reduce boilerplate code and prevents resource leaks.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- resource management in Java
- exception-safe cleanup
- AutoCloseable interface
- difference between finally and automatic cleanup
- prevention of memory and connection leaks

This is a very common Core Java interview question.

---

## 3. What Problem Does try-with-resources Solve?

---

Before Java 7, resources were usually closed manually in a `finally` block.

Example:

```java
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("data.txt"));
    System.out.println(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (br != null) {
        try {
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

Problems with this approach:

- too much boilerplate code
- easy to forget close()
- nested try-catch in finally
- resource leak risk

---

## 4. try-with-resources Syntax

---

```java
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
}
```

Here:

- resource is declared inside `try (...)`
- resource is automatically closed
- no explicit finally block needed

---

## 5. Which Resources Can Be Used?

---

Only resources that implement:

- `AutoCloseable`
- or `Closeable`

can be used in try-with-resources.

Examples:

- FileInputStream
- FileOutputStream
- BufferedReader
- Scanner
- Connection
- Statement
- ResultSet

---

## 6. AutoCloseable Interface

---

`AutoCloseable` contains one method:

```java
void close() throws Exception;
```

Any class implementing this interface can be used with try-with-resources.

### Custom Example

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

---

## 7. Multiple Resources

---

We can declare multiple resources inside try.

```java
try (
    BufferedReader br = new BufferedReader(new FileReader("input.txt"));
    BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))
) {
    bw.write(br.readLine());
}
```

Important point:

> Resources are closed in reverse order of creation.

---

## 8. Suppressed Exceptions

---

This is a strong interview point.

If an exception occurs in the `try` block and another exception occurs while closing the resource, the close exception is **suppressed**.

The main exception is preserved, and the suppressed exception can be retrieved using:

```java
getSuppressed()
```

This is better than old finally-based cleanup, where the close exception could hide the original exception.

---

## 9. try-with-resources vs finally

---

| try-with-resources             | finally                     |
| ------------------------------ | --------------------------- |
| Automatic cleanup              | Manual cleanup              |
| Less boilerplate               | More boilerplate            |
| Safer and cleaner              | Easy to forget close()      |
| Supports suppressed exceptions | Can hide original exception |

---

## 10. Important Interview Questions

---

### Does try-with-resources replace finally?

Answer: For resource cleanup, yes in most cases. But finally is still used for general cleanup logic.

### Can we use any object in try-with-resources?

Answer: No, only objects implementing AutoCloseable or Closeable.

### In what order are resources closed?

Answer: Reverse order of declaration.

### What are suppressed exceptions?

Answer: Exceptions thrown during close() when another exception already occurred in the try block.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is try-with-resources in Java?

Answer like this:

> try-with-resources is a Java feature introduced in Java 7 that automatically closes resources after use. It works with resources that implement AutoCloseable, such as files, streams, readers, and database connections. It reduces boilerplate code, prevents resource leaks, and handles suppressed exceptions more cleanly than a traditional finally block.
