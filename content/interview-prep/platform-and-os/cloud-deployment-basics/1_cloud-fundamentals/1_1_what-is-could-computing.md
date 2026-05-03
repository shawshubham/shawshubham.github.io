---
title: "What is Cloud Computing?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-101"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    ["cloud computing", "iaas", "paas", "saas", "deployment", "system design"]
---

## 1. Short Answer (Interview Style)

---

> **Cloud computing is the delivery of computing resources like servers, storage, databases, and networking over the internet on-demand, instead of managing physical infrastructure manually.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- modern infrastructure concepts
- how applications are deployed today
- difference between traditional and cloud-based systems

👉 This is usually an entry point question before deeper cloud discussions.

---

## 3. Traditional vs Cloud Approach

---

### Traditional (On-Premise)

```text
Buy servers → Install → Maintain → Scale manually
```

Problems:

- high upfront cost
- difficult scaling
- manual maintenance
- slow provisioning

---

### Cloud Approach

```text
Request resources → Use → Scale → Pay for usage
```

Benefits:

- no upfront hardware cost
- instant provisioning
- easy scaling
- managed services available

---

👉 Cloud removes infrastructure management burden

---

## 4. Key Characteristics of Cloud Computing

---

### 1. On-Demand Self-Service

- resources can be provisioned instantly

---

### 2. Scalability (Elasticity)

- scale up or down based on demand

---

### 3. Pay-As-You-Go

- pay only for what you use

---

### 4. High Availability

- systems are designed to run across multiple zones

---

### 5. Managed Services

- cloud providers handle maintenance, patching, backups

---

## 5. Types of Cloud Service Models

---

### 1. IaaS (Infrastructure as a Service)

- provides virtual machines, storage, networking
- you manage OS, runtime, and application

👉 Example:

- virtual servers (EC2-like)

---

### 2. PaaS (Platform as a Service)

- provides platform to run applications
- you manage only application code

👉 Example:

- app hosting platforms

---

### 3. SaaS (Software as a Service)

- ready-to-use software over internet

👉 Example:

- Gmail, Slack

---

## 6. Compute Options in Cloud

---

### 1. Virtual Machines

- full control over OS

---

### 2. Containers

- lightweight and portable

---

### 3. Serverless

- no infrastructure management
- runs code on demand

---

👉 Choose based on control vs simplicity trade-off

---

## 7. Real-World Example

---

### Deploying a Web Application

Without cloud:

- buy servers
- configure manually
- manage scaling

With cloud:

- deploy using managed services
- use autoscaling
- use load balancer

👉 Faster and more reliable deployment

---

## 8. Common Mistakes

---

❌ Thinking cloud removes all responsibility  
❌ Ignoring cost implications  
❌ Not understanding service models  
❌ Overcomplicating simple deployments

---

## 9. Important Interview Points

---

- cloud provides on-demand infrastructure
- reduces operational overhead
- supports scalability and high availability
- includes IaaS, PaaS, SaaS models

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is cloud computing?

Answer like this:

> Cloud computing is a model where computing resources like servers, storage, and networking are provided over the internet on demand. It eliminates the need to manage physical infrastructure and allows systems to scale easily, pay only for usage, and leverage managed services. It is commonly categorized into IaaS, PaaS, and SaaS.
