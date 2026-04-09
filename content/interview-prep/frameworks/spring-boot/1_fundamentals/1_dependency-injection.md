---
title: "Dependency Injection in Spring"
layout: "interview-prep-topic-content"
interview:
  id: "spring-101"
  phase: "Core"
  topic: "Fundamentals"
  round: "Technical"
  company: ""
  tags:
    ["dependency injection", "ioc", "spring", "beans", "constructor injection"]
---

## 1. Short Answer (Interview Style)

---

> **Dependency Injection (DI) is a design pattern where objects receive their dependencies from an external source instead of creating them internally. In Spring, the container manages object creation and wiring, promoting loose coupling and testability.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- Inversion of Control (IoC)
- decoupling between components
- testability and maintainability
- how Spring manages beans

This is a foundational Spring interview question.

---

## 3. What is Dependency Injection?

---

Without DI (tight coupling):

```java
class OrderService {
    private PaymentService paymentService = new PaymentService();
}
```

Problems:

- hard to test (cannot mock)
- tightly coupled to implementation
- difficult to change behavior

---

With DI (loose coupling):

```java
class OrderService {
    private final PaymentService paymentService;

    OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

Now:

- dependency is provided externally
- easy to replace/mock
- flexible design

---

## 4. How Spring Implements DI

---

Spring container (ApplicationContext) is responsible for:

- creating objects (beans)
- injecting dependencies
- managing lifecycle

Example:

```java
@Service
class OrderService {
    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

```java
@Service
class PaymentService {}
```

Spring automatically:

- creates `PaymentService`
- injects it into `OrderService`

---

## 5. Types of Dependency Injection

---

### 1. Constructor Injection (Recommended)

```java
public OrderService(PaymentService paymentService) {
    this.paymentService = paymentService;
}
```

Pros:

- immutable dependencies
- easy testing
- ensures required dependencies are provided

---

### 2. Field Injection

```java
@Autowired
private PaymentService paymentService;
```

Cons:

- hard to test
- not recommended

---

### 3. Setter Injection

```java
@Autowired
public void setPaymentService(PaymentService paymentService) {
    this.paymentService = paymentService;
}
```

Used for optional dependencies.

---

## 6. IoC vs DI (Important)

---

- **IoC (Inversion of Control)** → design principle (framework controls object creation)
- **DI (Dependency Injection)** → implementation of IoC

---

## 7. Real Flow in Spring

---

```mermaid
flowchart LR
    A[Spring Container] --> B[Create Beans]
    B --> C[Resolve Dependencies]
    C --> D[Inject into Classes]
```

---

## 8. Advantages of DI

---

- loose coupling
- easier unit testing
- better maintainability
- flexible architecture

---

## 9. Important Interview Points

---

### Why constructor injection is preferred?

Answer: It ensures immutability, makes dependencies explicit, and improves testability.

---

### Can Spring inject interfaces?

Answer: Yes, Spring injects the concrete implementation of the interface.

---

### What happens if multiple beans exist?

Answer: Use `@Qualifier` or `@Primary`.

---

### Is DI only for Spring?

Answer: No, it is a general design pattern.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Dependency Injection in Spring?

Answer like this:

> Dependency Injection is a design pattern where objects receive their dependencies from an external source rather than creating them internally. In Spring, the container manages bean creation and injects dependencies, promoting loose coupling, better testability, and maintainability. Constructor injection is generally preferred in modern applications.
