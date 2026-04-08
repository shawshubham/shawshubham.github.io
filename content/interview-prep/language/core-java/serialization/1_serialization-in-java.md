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

> **Serialization is the process of converting an object into a transferable or storable format (usually a byte stream or JSON), so that it can be sent over a network, stored in cache, or persisted. Deserialization is the reverse process. In Java, native serialization is done using the Serializable interface, but in modern applications, JSON, Avro, or Protobuf are more commonly used.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- object persistence
- network communication
- distributed systems communication
- caching systems
- Serializable interface
- transient keyword
- serialVersionUID
- **real-world data transfer mechanisms (JSON, Kafka, APIs)**

This is a very common Core Java interview question, especially in backend and distributed systems roles.

---

## 3. What is Serialization?

---

**Serialization** is the process of converting an object into a transferable format.

This format can be:

- byte stream (Java native serialization)
- JSON (REST APIs)
- Avro / Protobuf (event-driven systems)

This serialized form can be:

- stored in a file
- sent over a network
- stored in cache (Redis)
- published to messaging systems (Kafka)

So serialization is used when we want to **persist or transfer objects across system boundaries**.

---

## 4. What is Deserialization?

---

**Deserialization** is the reverse process of serialization.

```
Object → Serialized Format → Network/File → Serialized Format → Object
```

So:

- Serialization → Object to transferable format
- Deserialization → transferable format to Object

---

## 5. 🚀 Real-World Use Cases (Most Important Section)

---

In modern backend systems, serialization is used everywhere:

### 5.1 REST APIs (Spring Boot)

```java
@GetMapping("/user/{id}")
public UserResponse getUser(@PathVariable String id) {
    return userService.getUser(id);
}
```

- UserResponse → automatically converted to JSON
- This is **serialization**

### 5.2 Event-Driven Systems (Kafka)

```java
class OrderEvent {
    String orderId;
    BigDecimal amount;
}
```

- Before sending to Kafka → object is serialized
- Consumer → deserializes back to object

### 5.3 Caching (Redis / Hazelcast)

- Objects stored in cache are serialized
- Retrieved objects are deserialized

### 5.4 Database / File Storage

- Saving object snapshots
- Writing objects to files

### 5.5 Session Replication (Legacy systems)

- Session objects serialized across servers

### 🔥 Key Insight

> Even if you never used Serializable, you are using serialization daily via JSON, APIs, or messaging systems.

---

## 6. Java Native Serialization (Serializable)

---

To make a class serializable in Java:

```java
import java.io.Serializable;

class Employee implements Serializable {
    int id;
    String name;
}
```

Serializable is a **marker interface**.

> It tells JVM that this object can be converted into a byte stream.

---

## 7. Example

---

#### Serialization

```java
ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("employee.ser"));
out.writeObject(employee);
out.close();
```

#### Deserialization

```java
ObjectInputStream in = new ObjectInputStream(new FileInputStream("employee.ser"));
Employee emp = (Employee) in.readObject();
in.close();
```

---

## 8. transient Keyword

---

Sometimes we do not want certain fields to be serialized.

```java
class Employee implements Serializable {
    int id;
    String name;
    transient String password;
}
```

password will not be serialized.

Used for:

- sensitive data (passwords)
- temporary/calculated fields
- non-serializable dependencies

---

## 9. serialVersionUID

---

Used for version control during deserialization.

```java
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    int id;
    String name;
}
```

If mismatch occurs:

```code
InvalidClassException
```

---

## 10. ⚠️ Why Java Native Serialization is Rarely Used Today

---

Modern systems avoid Java native serialization because:

### 1. Security Risks

- Deserialization vulnerabilities

### 2. Tight Coupling

- Requires same class structure on both sides

### 3. Not Language Agnostic

- Cannot be used easily outside Java ecosystem

### 4. Versioning Problems

- Small class changes can break deserialization

### 5. Not Human Readable

- Unlike JSON

---

## 11. What is Used Instead (Modern Approach)

---

| Use Case               | Preferred Format |
| ---------------------- | ---------------- |
| REST APIs              | JSON             |
| Internal microservices | JSON / Protobuf  |
| Kafka / Streaming      | Avro / Protobuf  |
| High-performance RPC   | Protobuf (gRPC)  |

---

## 12. Important Interview Points

---

Interviewers often ask:

### Is constructor called during deserialization?

Answer: No.

---

### Can static fields be serialized?

Answer: No.

---

### Can transient fields be serialized?

Answer: No.

---

### What happens if parent class is not Serializable?

Answer: Parent constructor will execute during deserialization.

---

## 13. Serialization Summary Table

---

| Concept          | Meaning                      |
| ---------------- | ---------------------------- |
| Serialization    | Object → Transferable Format |
| Deserialization  | Transferable Format → Object |
| Serializable     | Java marker interface        |
| transient        | Field not serialized         |
| serialVersionUID | Version control              |

---

## 14. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is serialization in Java?

Answer like this:

> Serialization is the process of converting an object into a transferable or storable format so that it can be sent over a network, cached, or persisted. Deserialization is the reverse process. In Java, native serialization is done using the Serializable interface, but in modern applications, we usually use JSON, Avro, or Protobuf for better interoperability, performance, and security.
