---
title: "What is a Load Balancer and Why Is It Used?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-116"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "load balancer",
      "scaling",
      "high availability",
      "traffic distribution",
      "cloud",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **A load balancer distributes incoming traffic across multiple servers or instances to ensure high availability, better performance, and efficient resource utilization.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how systems handle high traffic
- how availability is maintained
- how requests are distributed across instances

👉 Very common in system design, cloud, and backend interviews.

---

## 3. The Problem — Why Load Balancer Is Needed

---

Without load balancing:

```text
Client → Single Server
```

Problems:

- server overload
- single point of failure
- poor performance

---

👉 System becomes fragile and slow

---

## 4. What is a Load Balancer?

---

A load balancer sits between clients and servers:

```text
Client → Load Balancer → Multiple Servers
```

---

👉 It distributes traffic intelligently

---

## 5. How Load Balancer Works

---

```text
Request → Load Balancer → Choose Server → Forward Request
```

---

👉 Decision is based on algorithm

---

## 6. Load Balancing Algorithms (VERY IMPORTANT)

---

### 1. Round Robin

- requests distributed evenly

```text
Server1 → Server2 → Server3 → repeat
```

---

### 2. Least Connections

- send request to server with fewer active connections

---

### 3. IP Hash

- same client → same server

---

👉 Used for session stickiness

---

## 7. Types of Load Balancers

---

### 1. Layer 4 (Transport Layer)

- operates on TCP/UDP
- faster, less intelligent

---

### 2. Layer 7 (Application Layer)

- operates on HTTP/HTTPS
- can route based on:
  - URL
  - headers
  - cookies

---

👉 More flexible and commonly used

---

## 8. Key Features

---

### 1. Health Checks

- detects unhealthy servers
- removes them from traffic

---

### 2. Failover

- routes traffic to healthy servers

---

### 3. SSL Termination

- handles HTTPS encryption/decryption

---

### 4. Sticky Sessions (Optional)

- ensures same user hits same server

---

## 9. Real-World Example

---

### Web Application

```text
Users → Load Balancer
       → Server1
       → Server2
       → Server3
```

---

👉 Traffic distributed evenly

---

## 10. Common Mistakes

---

❌ Single load balancer (SPOF)  
❌ No health checks  
❌ Wrong algorithm choice  
❌ Over-reliance on sticky sessions

---

## 11. Important Interview Points

---

- load balancer distributes traffic
- improves performance and availability
- supports scaling horizontally
- health checks are critical

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is a load balancer?

Answer like this:

> A load balancer distributes incoming traffic across multiple servers to ensure better performance, high availability, and fault tolerance. It uses algorithms like round robin or least connections and also performs health checks to route traffic only to healthy instances.
