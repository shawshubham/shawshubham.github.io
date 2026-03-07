---
title: "Client–Server Architecture"
description: "Understand the client–server model, how requests and responses flow between systems, and why this architecture forms the foundation of most modern web applications."
keywords:
  - client server architecture
  - system design fundamentals
  - request response model
  - distributed systems basics
  - high level design concepts
weight: 3
date: 2026-03-05
layout: "topic-content"
---

## 1. What Is Client–Server Architecture?

---

Client–Server architecture is a system design model where **clients send requests to servers, and servers process those requests and return responses**.

In this model:

- the **client** initiates communication
- the **server** performs computation and data management

This interaction forms the foundation of most modern systems, including:

- web applications
- mobile apps
- cloud services
- APIs

---

## 2. A Simple Client–Server System

---

```mermaid
flowchart LR

Client["Client<br>(Browser / Mobile App)"]

Server["Application Server"]

Database["Database"]

Client -->|Request| Server
Server -->|Query / Write| Database
Database -->|Data| Server
Server -->|Response| Client
```

### Diagram Explanation

1. A **client** sends a request to the server.
2. The **server** processes the request.
3. If necessary, the server retrieves or updates data in the database.
4. The server sends a **response** back to the client.

This request–response pattern is the basis for most internet services.

---

## 3. What Is a Client?

---

A **client** is any system that initiates a request to access functionality or data from another system.

Clients are responsible for:

- sending requests
- presenting data to users
- interacting with server APIs

Common examples of clients include:

- web browsers
- mobile applications
- desktop software
- IoT devices

Clients typically focus on **user interaction**, not heavy computation or data storage.

---

## 4. What Is a Server?

---

A **server** is a system responsible for processing requests and returning responses.

Servers handle responsibilities such as:

- executing business logic
- accessing databases
- validating requests
- enforcing system rules
- coordinating system operations

Servers are designed to **handle requests from many clients simultaneously**.

---

## 5. Why Client–Server Architecture Exists

---

Separating clients from servers provides several advantages.

### 5.1 Centralized Processing

The server manages the core logic and data, allowing clients to remain lightweight.

---

### 5.2 Easier Updates

Updating server logic immediately affects all clients without requiring software updates on every device.

---

### 5.3 Scalability

Servers can be replicated or scaled to support increasing numbers of clients.

---

### 5.4 Security

Sensitive operations and data can remain on the server rather than being exposed to clients.

---

## 6. Real-World Examples

---

Client–Server architecture appears in almost every modern system.

Examples include:

| Client           | Server                    |
| ---------------- | ------------------------- |
| Web Browser      | Web Application           |
| Mobile App       | Backend API               |
| Payment Terminal | Payment Processing System |
| IoT Device       | Cloud Platform            |

In each case, the **client initiates the interaction**, and the **server performs the processing**.

---

## 7. Relationship to Networking

---

Client–Server architecture operates **on top of networking protocols**.

Communication between clients and servers typically uses protocols such as:

- HTTP / HTTPS
- WebSockets
- gRPC
- TCP-based protocols

These protocols define **how messages are transmitted**, while client–server architecture defines **how systems interact at a structural level**.

---

## 8. Relationship to Layered Architecture

---

Client–Server architecture describes **how systems communicate across machines**, while layered architecture describes **how responsibilities are organized inside the server**.

For example:

```text
Client
   ↓
Server (Layered Architecture)
   ├ Presentation Layer
   ├ Business Logic Layer
   └ Data Access Layer
```

The client interacts with the server as a **single system**, even though the server may contain multiple internal layers.

---

## 9. Key Takeaways

---

- Client–Server architecture separates systems into **request initiators (clients)** and **request processors (servers)**.
- Most modern systems, including web and mobile applications, follow this model.
- The client focuses on interaction, while the server focuses on **processing and data management**.
- This architecture builds on top of networking protocols such as HTTP and TCP.

---

### 🔗 What’s Next?

Next, we will explore **Stateless vs Stateful Applications**, which explains how servers manage client interactions and how this affects scalability.

👉 **Next Concept:**  
**[Stateless vs Stateful Applications](/learning/advanced-skills/high-level-design/6_concepts-for-reference/6_4_stateless-vs-stateful-applications)**
