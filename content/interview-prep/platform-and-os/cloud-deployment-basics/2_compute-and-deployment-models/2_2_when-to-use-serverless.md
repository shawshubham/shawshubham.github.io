---
title: "When Should You Use Serverless?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-105"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "serverless",
      "lambda",
      "cloud",
      "deployment",
      "event-driven",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Serverless is best used for event-driven, short-lived, and bursty workloads where you want automatic scaling and minimal infrastructure management. It is ideal when you want to focus only on business logic without managing servers.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- when serverless is appropriate (and when it is not)
- trade-offs between simplicity and control
- real-world deployment decisions

👉 Very common follow-up after VM vs Container vs Serverless.

---

## 3. What is Serverless (Quick Recap)

---

- run code without managing servers
- executed on demand
- auto scales based on traffic

---

👉 You focus only on **function code**

---

## 4. When to Use Serverless (VERY IMPORTANT)

---

### 1. Event-Driven Systems

Triggered by events such as:

- file upload
- message queue events
- HTTP requests

---

### 2. Short-Lived Tasks

- functions that run for a few milliseconds to seconds

Examples:

- image processing
- data transformation
- webhook handlers

---

### 3. Bursty or Unpredictable Traffic

- traffic spikes occasionally
- not constant load

👉 Serverless scales instantly without provisioning

---

### 4. Background Jobs

- asynchronous processing

Examples:

- sending emails
- generating reports
- cleanup tasks

---

### 5. Low Traffic Applications

- rarely used APIs or features

👉 Pay only when executed

---

## 5. When NOT to Use Serverless

---

### 1. Long-Running Services

- APIs that run continuously
- streaming or real-time processing

---

### 2. High Throughput, Constant Load

- always-on systems may be cheaper with containers/VMs

---

### 3. Low Latency Requirements

- cold start latency can impact performance

---

### 4. Complex Stateful Applications

- serverless is stateless by design

---

### 5. Need Full Control Over Environment

- limited customization compared to VMs/containers

---

## 6. Real-World Examples

---

### Example 1: File Processing

```text
User uploads file → trigger function → process file → store result
```

---

### Example 2: Notification System

```text
Order placed → event → function → send email/SMS
```

---

### Example 3: API Backend (Low Traffic)

```text
Client → API Gateway → Lambda function → DB
```

---

## 7. Key Benefits

---

- no infrastructure management
- automatic scaling
- pay-per-use
- fast development

---

## 8. Key Limitations

---

- **Cold start latency** → functions may take extra time to start if they haven’t been used recently, which can increase response time for the first request.
- **Execution time limits** → serverless functions usually have maximum execution duration limits, making them unsuitable for long-running tasks.
- **Vendor lock-in risk** → heavy reliance on provider-specific services (e.g., Lambda, DynamoDB) makes it difficult and costly to migrate to another cloud.
- **Limited control over runtime** → you have restricted ability to configure the underlying environment, OS, or runtime compared to VMs or containers.

---

## 9. Comparison Insight (VERY IMPORTANT)

---

```text
VM → full control, always running
Container → scalable services
Serverless → event-driven execution
```

---

👉 Think:

- continuous service → container
- triggered work → serverless

---

## 10. Common Mistakes

---

❌ Using serverless for long-running APIs  
❌ Ignoring cold start latency  
❌ Overusing serverless for everything  
❌ Not designing stateless functions

---

## 11. Important Interview Points

---

- serverless is best for event-driven workloads
- ideal for short-lived tasks and background jobs
- not suitable for long-running or latency-sensitive systems
- reduces operational overhead significantly

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> When should you use serverless?

Answer like this:

> Serverless is best used for event-driven and short-lived workloads such as background jobs, file processing, or webhook handlers. It works well for bursty traffic because it scales automatically and charges per execution. However, it is not ideal for long-running or latency-sensitive services due to cold start overhead and execution limits.
