---
title: "Serialization in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-208"
  phase: "Core"
  topic: "Serialization"
  round: "Technical"
  company: ""
  tags:
    [
      "serialization",
      "deserialization",
      "serializable",
      "transient",
      "serialversionuid",
      "java",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Serialization in Java is the process of converting an object into a byte stream so that it can be saved to a file, sent over a network, or stored in a database. Deserialization is the reverse process where the byte stream is converted back into an object. In Java, serialization is achieved using the Serializable interface.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- object persistence
- network communication
- caching systems
- Serializable interface
- transient keyword
- serialVersionUID

This is a very common Core Java interview question.

---

## 3. What is Serialization?

---

**Serialization** is the process of converting an object into a byte stream.

This byte stream can be:

- stored in a file
- sent over a network
- stored in cache
- stored in database

So serialization is used when we want to **persist or transfer objects**.

---

## 4. What is Deserialization?

---

**Deserialization** is the reverse process of serialization.

```
Object → Byte Stream → File/Network → Byte Stream → Object
```

So:

- Serialization → Object to Byte Stream
- Deserialization → Byte Stream to Object

---

## 5. Serializable Interface

---

To make a class serializable, we implement the `Serializable` interface.

```java
import java.io.Serializable;

class Employee implements Serializable {
    int id;
    String name;
}
```

`Serializable` is a **marker interface**.

Marker interface means:

> It does not have methods, but it tells JVM that this object can be serialized.

---

## 6. Example of Serialization

---

```java
ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("employee.ser"));
out.writeObject(employee);
out.close();
```

## 7. Example of Deserialization

---

```java
ObjectInputStream in = new ObjectInputStream(new FileInputStream("employee.ser"));
Employee emp = (Employee) in.readObject();
in.close();
```

---

## 8. transient Keyword

---

Sometimes we do not want certain fields to be serialized.

We use the `transient` keyword.

```java
class Employee implements Serializable {
    int id;
    String name;
    transient String password;
}
```

`password` will not be serialized.

This is commonly used for:

- passwords
- temporary data
- sensitive information

---

## 9. serialVersionUID

---

`serialVersionUID` is used to verify that the sender and receiver of a serialized object have loaded compatible classes.

```java
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    int id;
    String name;
}
```

If serialVersionUID does not match during deserialization, we get:

```
InvalidClassException
```

So it is recommended to define serialVersionUID explicitly.

---

## 10. Important Interview Points

---

Interviewers often ask:

### Is constructor called during deserialization?

Answer: No.

### Can static fields be serialized?

Answer: No, static fields belong to class, not object.

### Can transient fields be serialized?

Answer: No.

### What happens if parent class is not Serializable?

Answer: Parent constructor will run during deserialization.

---

## 11. Serialization Summary Table

---

| Concept          | Meaning                   |
| ---------------- | ------------------------- |
| Serialization    | Object → Byte Stream      |
| Deserialization  | Byte Stream → Object      |
| Serializable     | Marker interface          |
| transient        | Field not serialized      |
| serialVersionUID | Version control for class |

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is serialization in Java?

Answer like this:

> Serialization is the process of converting an object into a byte stream so that it can be stored in a file, sent over a network, or saved in a database. Deserialization is the reverse process of converting the byte stream back into an object. In Java, serialization is implemented using the Serializable interface. We can use the transient keyword to skip fields during serialization, and serialVersionUID is used for version control during deserialization.
