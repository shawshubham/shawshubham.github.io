---
title: "finally Block Behaviour in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-223"
  phase: "Core"
  topic: "Exceptions"
  round: "Technical"
  company: ""
  tags:
    ["finally", "exceptions", "java", "try-catch-finally", "return behavior"]
---

## 1. Short Answer (Interview Style)

---

> **The finally block in Java is used to execute code that should run regardless of whether an exception occurs or not. It is typically used for cleanup logic such as closing resources. In most cases, finally executes even if there is a return statement in try or catch, but there are a few exceptions such as System.exit() or JVM crash.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- exception flow in Java
- cleanup semantics
- return behavior with finally
- tricky interview edge cases

This is a very common Core Java interview question.

---

## 3. What is finally Block?

---

The `finally` block is used with `try` and `catch` to define code that should execute after the main logic completes.

Typical use cases:

- cleanup logic
- releasing locks
- closing resources
- logging final actions

Example:

```java
try {
    System.out.println("Try block");
} catch (Exception e) {
    System.out.println("Catch block");
} finally {
    System.out.println("Finally block");
}
```

---

## 4. Does finally Always Execute?

---

In **most normal cases**, yes.

It executes whether:

- exception occurs or not
- exception is handled or not
- return statement is present in try or catch

But there are exceptions.

---

## 5. finally with return Statement

---

This is one of the most important interview cases.

```java
public int test() {
    try {
        return 10;
    } finally {
        System.out.println("Finally executed");
    }
}
```

Output:

```text
Finally executed
```

Returned value:

```text
10
```

So:

> Even if try has return, finally still executes before method actually returns.

---

## 6. finally Overriding return

---

Another very important edge case:

```java
public int test() {
    try {
        return 10;
    } finally {
        return 20;
    }
}
```

Returned value:

```text
20
```

Why?

Because return in finally overrides return in try.

This is legal but **strongly discouraged**, because it hides the original control flow.

---

## 7. finally with Exception

---

```java
try {
    int x = 10 / 0;
} finally {
    System.out.println("Finally executed");
}
```

Output:

```text
Finally executed
```

After that, exception still propagates.

So finally executes even when exception occurs.

---

## 8. Cases Where finally May Not Execute

---

Interviewers love this question.

finally may not execute in cases like:

- `System.exit(0)` is called
- JVM crashes
- power failure / machine shutdown
- infinite loop before reaching finally in some execution paths
- process is forcibly killed

Example:

```java
try {
    System.out.println("Try");
    System.exit(0);
} finally {
    System.out.println("Finally");
}
```

Here finally will **not** execute.

---

## 9. finally vs Finalize vs final

---

This is another common interview question.

| Term       | Meaning                               |
| ---------- | ------------------------------------- |
| finally    | Block used in exception handling      |
| final      | Keyword used to restrict modification |
| finalize() | Deprecated Object class method        |

---

## 10. finally and Resource Cleanup

---

Before Java 7, `finally` was commonly used to close resources.

```java
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("data.txt"));
} finally {
    if (br != null) {
        br.close();
    }
}
```

Now modern Java prefers:

- try-with-resources

because it is cleaner and safer.

---

## 11. Important Interview Questions

---

### Does finally always execute?

Answer: In most normal cases yes, but not if System.exit() is called or JVM terminates unexpectedly.

### Does finally execute after return?

Answer: Yes.

### Can finally override return?

Answer: Yes, if finally itself has a return statement.

### Should we use return in finally?

Answer: No, because it makes code confusing and may suppress exceptions or earlier returns.

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is finally block in Java and does it always execute?

Answer like this:

> The finally block in Java is used to execute cleanup code regardless of whether an exception occurs or not. It usually executes even when there is a return statement in try or catch. However, it may not execute in special cases such as System.exit(), JVM crash, or forced process termination. Also, if finally contains a return statement, it can override the return from try or catch, which is why returning from finally is discouraged.
