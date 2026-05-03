---
title: "What is Autoscaling and How Does It Work?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-114"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "autoscaling",
      "scaling",
      "cloud",
      "performance",
      "reliability",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Autoscaling is the ability of a system to automatically increase or decrease resources (like instances or pods) based on load, ensuring performance under high traffic and cost efficiency during low usage.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how systems handle traffic spikes
- elasticity in cloud systems
- cost vs performance trade-offs

👉 Very common in cloud, backend, and system design interviews.

---

## 3. The Problem — Why Autoscaling Is Needed

---

Traffic is not constant:

```text
Low traffic → normal load
Peak traffic → sudden spike
```

Without autoscaling:

- system becomes slow
- requests fail
- users experience downtime

---

👉 Over-provisioning also wastes money

---

## 4. What is Autoscaling?

---

Autoscaling means:

- scale out → add more instances when load increases
- scale in → remove instances when load decreases

---

```text
2 instances → 10 instances (peak)
10 instances → 2 instances (low traffic)
```

---

👉 System adapts automatically to demand

---

## 5. Types of Scaling

---

### 1. Horizontal Scaling (Scale Out/In)

- add/remove instances

👉 Most common in cloud systems

---

### 2. Vertical Scaling (Scale Up/Down)

- increase CPU/memory of existing instance

👉 Limited and slower compared to horizontal scaling

---

## 6. How Autoscaling Works

---

Autoscaling is based on metrics:

- CPU usage
- memory usage
- request rate (RPS)
- queue length

---

### Example Flow

```text
CPU > 70% → Add instance
CPU < 30% → Remove instance
```

---

👉 Decisions are automated based on thresholds

---

## 7. Types of Autoscaling Strategies

---

### 1. Reactive Scaling

- reacts after load increases

---

### 2. Scheduled Scaling

- scales based on known patterns

Example:

- scale up during business hours

---

### 3. Predictive Scaling (Advanced)

- uses historical data to predict load

---

## 8. Real-World Example

---

### E-commerce Sale

```text
Normal: 3 instances
Sale: traffic spike → scale to 15
After sale: scale back to 3
```

---

👉 System remains stable without manual intervention

---

## 9. Key Benefits

---

- handles traffic spikes
- improves availability
- reduces cost (no over-provisioning)

---

## 10. Key Challenges

---

- scaling delay (new instances take time)
- wrong thresholds can cause instability
- does not solve database bottlenecks

---

## 11. Common Mistakes

---

❌ Using only CPU for scaling decisions  
❌ No cooldown period (rapid scaling up/down)  
❌ Ignoring downstream systems (DB, cache)  
❌ Not testing scaling behavior

---

## 12. Important Interview Points

---

- autoscaling provides elasticity
- horizontal scaling is preferred in cloud systems
- based on metrics like CPU, RPS, queue size
- must consider downstream dependencies

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is autoscaling?

Answer like this:

> Autoscaling is the ability of a system to automatically adjust the number of running instances based on load. It helps maintain performance during high traffic and reduces cost during low usage. It typically works by monitoring metrics like CPU usage or request rate and scaling resources accordingly.
