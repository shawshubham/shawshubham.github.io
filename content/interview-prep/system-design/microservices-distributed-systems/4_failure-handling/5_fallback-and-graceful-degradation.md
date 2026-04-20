---
title: "What is Fallback and Graceful Degradation in Microservices?"
layout: "interview-prep-topic-content"
interview:
  id: "microservices-111"
  phase: "Core"
  topic: "Failure Handling"
  round: "Technical"
  company: ""
  tags:
    [
      "fallback",
      "graceful degradation",
      "microservices",
      "resilience",
      "failure handling",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Fallback is a mechanism to return an alternative response when a service fails, while graceful degradation means the system continues to function with reduced capabilities instead of completely failing.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- user experience during failures
- system resilience design
- how to keep systems functional under partial failure
- real-world production behavior

👉 This is a key concept for building fault-tolerant systems.

---

## 3. Problem — Without Fallback

---

Consider:

```text
Client → Order Service → Payment Service
```

If Payment Service fails:

- request fails completely
- user sees error
- system becomes unreliable

---

## 4. What is Fallback?

---

Fallback provides an alternative response when the main service fails.

---

### Examples:

- return cached data
- return default response
- skip non-critical operation
- show "service temporarily unavailable"

---

## 5. What is Graceful Degradation?

---

Graceful degradation means:

- system continues working
- but with limited functionality

---

### Example:

```text
E-commerce App:
Payment fails → order placed but marked "pending payment"
```

👉 System still works, but with reduced capability

---

## 6. Real-World Example

---

```text
Client → Order Service → Payment Service
```

If Payment fails:

### Without Fallback

- order fails

### With Fallback

- order placed as "pending"
- user notified later

---

👉 User experience is preserved

---

## 7. Types of Fallback

---

### 1. Default Response

- return predefined value

---

### 2. Cached Response

- return last known data

---

### 3. Alternative Flow

- skip failing service

---

### 4. Queue for Later Processing

- process asynchronously later

---

## 8. Benefits

---

- improves user experience
- increases system availability
- prevents complete failure
- enables business continuity

---

## 9. Common Mistakes

---

❌ No fallback for critical flows  
❌ Returning misleading data  
❌ Hiding failures completely  
❌ Overusing fallback for serious issues

---

## 10. Fallback + Circuit Breaker

---

👉 Flow:

```text
Request → Timeout → Retry → Circuit Breaker opens
→ fallback response returned
```

---

👉 Circuit breaker stops calls  
👉 Fallback ensures response is returned

---

## 11. Important Interview Points

---

- fallback improves user experience during failure
- graceful degradation keeps system usable
- not all operations need fallback (critical vs non-critical)
- should be used carefully to avoid incorrect behavior

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is fallback in microservices?

Answer like this:

> Fallback is a mechanism to return an alternative response when a service fails, while graceful degradation ensures the system continues to function with reduced capabilities instead of completely failing. It improves user experience and system availability during partial failures.
