---
title: "Transport & Application Protocols: TCP, UDP, and HTTP"
description: "Understand how data actually moves across the network using TCP and UDP, and where HTTP fits in the networking stack from a system design perspective."
keywords:
  - tcp vs udp
  - transport protocols
  - http networking basics
  - system design networking
  - reliability vs latency
  - backend communication protocols
weight: 3
date: 2026-02-17
layout: "topic-content"
---

## 1. Introduction — A Socket Is Not Enough

---

In the previous chapter, we learned how a client reaches a backend process using an **IP address and a port**.

At that point, one fundamental question remains unanswered:

> Once data reaches the right machine and process, **how should that data be delivered?**

Real networks are unreliable by nature:

- packets can be lost
- packets can arrive out of order
- receivers can be slow or overloaded

Sockets tell us **where** to send data.  
Transport protocols decide **how** that data moves.

This chapter explains that missing layer.

---

## 2. Why Transport Protocols Exist

---

Consider our learning platform again.

A client sends a request to the backend service. That request is broken into smaller chunks (packets) and sent over the network.

Now ask:

- What if some packets are lost?
- What if they arrive out of order?
- What if the server cannot process data as fast as the client sends it?

Without rules, communication would be chaotic.

Transport protocols exist to define:

- delivery guarantees
- ordering rules
- flow control between sender and receiver

They sit **between sockets and application logic**.

---

## 3. TCP — Reliable and Ordered Communication

---

**TCP (Transmission Control Protocol)** is the most commonly used transport protocol for backend systems.

It provides strong guarantees:

- **Reliable delivery**  
  Lost packets are detected and retransmitted.

- **Ordered delivery**  
  Data is delivered to the application in the correct sequence.

- **Flow control**  
  The sender slows down if the receiver cannot keep up.

- **Congestion awareness**  
  TCP adapts to network conditions to avoid overwhelming the network.

Mental model:

> **TCP trades performance for correctness.**

This is why most APIs, databases, and backend services rely on TCP.

---

## 4. UDP — Fast and Unreliable by Design

---

**UDP (User Datagram Protocol)** takes the opposite approach to TCP.

It provides:

- no delivery guarantees
- no ordering guarantees
- no congestion control

Packets are sent independently and may:

- arrive late
- arrive out of order
- never arrive at all

**Mental model:**

> **UDP trades guarantees for speed and control.**

This is not a flaw — it is **intentional**.

UDP is used when:

- low latency matters more than correctness
- applications handle reliability themselves

**Common examples:**

- DNS queries
- video streaming
- real-time voice and gaming

---

## 5. TCP vs UDP — System Design Perspective

---

Choosing between TCP and UDP is a **design decision about guarantees**, not just performance.

| Dimension   | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol)    |
| ----------- | ----------------------------------- | ------------------------------- |
| Guarantees  | Reliable, ordered delivery          | No delivery or order guarantees |
| Latency     | Higher (retransmissions)            | Lower (no retries)              |
| Control     | OS-managed reliability              | Application-managed             |
| Overhead    | Higher (connection management)      | Minimal                         |
| Typical use | APIs, databases, files              | DNS, streaming, real-time       |

### Design Insight

- Backend systems usually prioritize **correctness and consistency**
- Network failures are common and must be handled predictably
- For this reason, **TCP is the default choice** for most backend and distributed systems

UDP is chosen only when:

- latency is more important than correctness
- the application explicitly manages reliability itself

### One-Line Answer (Memorize This)

> **TCP gives reliability by default; UDP gives speed by default.**

This is usually enough to satisfy **system design interview expectations**.

---

## 6. Where HTTP Fits (Critical Clarification)

---

A very common misconception is:

> “HTTP is a transport protocol.”

It is not.

**HTTP is an application-layer protocol.**

- **TCP** decides _how bytes move_ across the network
- **HTTP** decides _what those bytes mean_

HTTP defines:

- request and response structure
- headers and metadata
- semantics such as _request_, _response_, and _resource_

In most backend systems, the layering looks like this:

```text
HTTP
 ↓
TCP
 ↓
IP
```

This separation of responsibilities is intentional.

**It allows:**

- applications to rely on consistent delivery guarantees
- transport protocols to evolve independently
- multiple application protocols to share the same transport layer

Understanding this distinction is crucial in system design discussions.

**When performance issues arise, the root cause may lie:**

- in **transport behavior** (TCP characteristics), or
- in **application behavior** (HTTP usage patterns)

Treating HTTP and TCP as separate layers helps you reason about these problems correctly.

---

## 7. What This Means for Backend Systems

---

Understanding transport protocols explains many real-world backend behaviors:

- **Why retries exist**  
  Networks are unreliable. TCP handles some failures, but applications must handle the rest.

- **Why timeouts are mandatory**  
  Reliable delivery does not mean infinite waiting. Systems must fail fast to remain healthy.

- **Why slow networks cause cascading failures**  
  Reliable protocols amplify backpressure when downstream systems are overloaded.

These are **system design concerns**, not implementation details.

---

## 8. Design Limitations (Why Evolution Was Needed)

---

While TCP provides reliability, it comes with trade-offs:

- Added latency due to delivery guarantees
- Inefficiency when handling multiple concurrent requests
- Head-of-line blocking at the transport level (high level)

These limitations led to the evolution of modern application protocols such as:

- HTTP/2
- HTTP/3
- QUIC
- gRPC

We will explore these in the next chapter.

---

## Key Takeaways

- Sockets define **where** data goes
- Transport protocols define **how** data moves
- TCP prioritizes reliability and ordering
- UDP prioritizes speed and flexibility
- HTTP is an application protocol, not a transport protocol
- Protocol choice is a **system design decision**

---

## 🔗 What’s Next?

Now that we understand **how data moves across the network**, we can look at how
**application protocols evolved** to improve performance and scalability.

In the next chapter, we cover:

- HTTP/1.1 limitations
- HTTP/2 multiplexing
- HTTP/3 and QUIC
- HTTPS and TLS at a high level

👉 **Up Next → HTTP, HTTPS, and Modern Protocol Evolution**
