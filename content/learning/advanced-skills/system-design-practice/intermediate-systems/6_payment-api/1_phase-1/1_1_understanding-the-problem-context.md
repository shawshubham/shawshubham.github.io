---
title: "Understanding the Problem Context"
description: "Step-by-step guide to designing a reliable Payment API covering requirements, payment lifecycle, idempotency, failure handling, and backend implementation for system design interviews."
keywords:
  - payment api design
  - system design payment api
  - idempotency in payments
  - payment lifecycle design
  - backend system design
  - system design interview preparation
  - payment system architecture
weight: 1
layout: "topic-content"
---

## 1. What Are We Designing?

---

In this problem, we are designing a **Payment API** — a backend system that allows applications to:

- create a payment request
- process or confirm a payment
- track the status of a payment over time

> In this design, our Payment API does not directly move money itself. Instead, it coordinates payment execution through an external payment gateway such as Stripe and manages the surrounding lifecycle safely.

At first glance, this may look like a simple API design problem, but in reality, it is a **stateful and reliability-critical system**.

Unlike typical CRUD APIs, payment systems must handle **real-world failures, retries, and external dependencies** carefully.

> 📝 **Key Point:**  
> A Payment API is not just about processing requests — it is about **ensuring correctness under uncertainty**.

---

## 2. Where Is This Used?

---

Payment APIs are used in many real-world systems:

- 🛒 E-commerce platforms (order checkout)
- 📦 Food delivery apps (placing orders)
- 🎟 Ticket booking systems (movie, flights, events)
- 🔁 Subscription systems (recurring payments)
- 💳 Financial applications (wallets, transfers)

In all these systems, the payment API plays a critical role:

> It ensures that money is **charged correctly, tracked properly, and reflected consistently**.

---

## 3. Key Actors in the System

---

A typical payment system involves multiple actors:

### 1. Client (Frontend / External Service)

- Sends requests to create or process payments
- May retry requests due to failures

### 2. Payment API (Our System)

- Validates requests
- Maintains payment state
- Coordinates processing

### 3. Payment Gateway (External System)

- Actually processes the payment (e.g., card charge)
- Returns success or failure

> 📝 **Important Insight:**  
> Our system does not directly process money — it **coordinates with external providers**.

---

## 4. High-Level Payment Flow

---

At a high level, a payment goes through the following steps:

1. Client creates a payment request
2. Payment API stores the payment in an initial state
3. Client confirms the payment
4. Payment API sends request to external gateway
5. Gateway processes the payment
6. Payment API updates the final state
7. Client receives the result

This flow seems simple, but things get complicated when:

- the client retries the request
- the gateway responds slowly
- the response is lost due to network failure

---

## 5. Why This Problem Is Not Trivial

---

Let’s look at what can go wrong:

- A client retries a request → duplicate payment risk
- Gateway processes payment but response is lost → inconsistent state
- Two requests arrive simultaneously → race condition
- Payment is partially processed → unknown state

These scenarios introduce **real-world complexity**.

The system must be designed to:

- avoid duplicate processing
- maintain consistent state
- handle failures safely
- provide predictable responses

---

## 6. Key Questions to Think About

---

Before designing anything, we should ask:

- How do we represent a payment internally?
- How do we ensure a payment is processed only once?
- What happens if the client retries?
- What if the gateway fails or times out?
- How do we track the current state of a payment?

These questions will guide the design in the upcoming phases.

---

## Conclusion

---

Understanding the problem context is the most important step in system design.

A Payment API may look simple at first, but it quickly introduces challenges around:

- correctness
- reliability
- external system interaction
- failure handling

In the next step, we will define the **functional requirements** of the system.

---

### 🔗 What’s Next?

👉 **[Functional Requirements →](/learning/advanced-skills/system-design-practice/intermediate-systems/6_payment-api/1_phase-1/1_2_functional-requirements/)**

---

> 📝 **Takeaway**:
>
> - A Payment API is a **stateful system**, not just a request-response API
> - It operates in an **unreliable environment**
> - Correctness and reliability are the most critical design concerns
