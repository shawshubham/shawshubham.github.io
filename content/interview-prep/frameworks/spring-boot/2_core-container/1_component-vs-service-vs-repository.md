---
title: "@Component vs @Service vs @Repository in Spring"
layout: "interview-prep-topic-content"
interview:
  id: "spring-103"
  phase: "Core"
  topic: "Core Container"
  round: "Technical"
  company: ""
  tags:
    ["component", "service", "repository", "spring", "stereotype annotations"]
---

## 1. Short Answer (Interview Style)

---

> **@Component, @Service, and @Repository are all Spring stereotype annotations used to define beans. @Component is generic, @Service is used for business logic, and @Repository is used for data access and provides additional exception translation.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- Spring bean creation
- layering in applications
- semantic meaning of annotations
- real-world code structure

This is a very common Spring interview question.

---

## 3. What is @Component?

---

`@Component` is a generic stereotype annotation.

```java
@Component
class MyBean {}
```

- Marks class as Spring bean
- Detected via component scanning
- Used when no specific role

---

## 4. What is @Service?

---

`@Service` is a specialization of `@Component`.

```java
@Service
class OrderService {}
```

- Represents business logic layer
- Improves readability and intent

---

## 5. What is @Repository?

---

`@Repository` is also a specialization of `@Component`.

```java
@Repository
class OrderRepository {}
```

Special feature:

> Enables **exception translation** (converts DB exceptions to Spring DataAccessException)

---

## 6. Key Difference

---

| Annotation  | Purpose                                   |
| ----------- | ----------------------------------------- |
| @Component  | Generic bean                              |
| @Service    | Business logic layer                      |
| @Repository | Data access layer + exception translation |

---

## 7. Are They Functionally Different?

---

At core level:

> All behave the same → they create Spring beans

Difference is mainly:

- semantic meaning
- readability
- additional behavior (@Repository)

---

## 8. Real Application Structure

---

```text
Controller → Service → Repository → DB
```

Example:

```java
@RestController
class OrderController {}

@Service
class OrderService {}

@Repository
class OrderRepository {}
```

---

## 9. Important Interview Points

---

### Are these annotations mandatory?

Answer: No, but recommended for clarity.

---

### Can we use @Component instead of @Service?

Answer: Yes, but not recommended.

---

### What special feature does @Repository provide?

Answer: Exception translation.

---

### Why use different annotations if behavior is same?

Answer: For clean architecture and readability.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is difference between @Component, @Service, and @Repository?

Answer like this:

> All three are Spring stereotype annotations used to define beans. @Component is generic, @Service is used for business logic, and @Repository is used for data access. While they behave similarly at runtime, @Repository provides exception translation and the others improve code readability and maintain proper layering.
