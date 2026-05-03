---
title: "When Should You Use Rolling vs Blue-Green vs Canary Deployment?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-113"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "deployment strategy",
      "rolling",
      "blue green",
      "canary",
      "trade-offs",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Rolling, Blue-Green, and Canary deployments are different strategies to release changes safely. Rolling is simple and resource-efficient, Blue-Green enables instant rollback, and Canary provides gradual risk reduction using real user traffic. The choice depends on system criticality, traffic patterns, and rollback needs.**

---

## 2. Why This Question Matters

---

This question tests whether you can:

- choose the right deployment strategy
- understand trade-offs in real systems
- make production decisions

👉 This is a decision-making question (very common for senior roles).

---

## 3. The Core Idea (VERY IMPORTANT)

---

```text
Rolling   → Gradual by instances
Blue-Green → Instant full switch
Canary    → Gradual by traffic percentage
```

---

👉 Each strategy optimizes for different goals:

- simplicity
- rollback speed
- risk control

---

## 4. Strategy Comparison Table

---

| Feature       | Rolling                 | Blue-Green     | Canary              |
| ------------- | ----------------------- | -------------- | ------------------- |
| Deployment    | Gradual (instance-wise) | Instant switch | Gradual (traffic %) |
| Downtime      | None                    | None           | None                |
| Rollback      | Slower                  | Instant        | Controlled          |
| Cost          | Low                     | High           | Medium              |
| Complexity    | Low                     | Moderate       | High                |
| Risk Exposure | Medium                  | Medium         | Low                 |

---

## 5. When to Use Rolling Deployment

---

Use Rolling when:

- system is not highly critical
- backward compatibility is ensured
- cost optimization is important
- simple deployments are preferred

---

👉 Example:

- internal tools
- non-critical services

---

## 6. When to Use Blue-Green Deployment

---

Use Blue-Green when:

- instant rollback is required
- system is critical
- you can afford duplicate infrastructure

---

👉 Example:

- payment systems
- high-value transactions

---

## 7. When to Use Canary Deployment

---

Use Canary when:

- you want to minimize risk
- system has large user base
- you want real-world validation before full rollout

---

👉 Example:

- large-scale consumer applications
- new feature releases

---

## 8. Real-World Decision Flow

---

```text
Is system critical?
  ├── Yes → Need instant rollback?
  │        ├── Yes → Blue-Green
  │        └── No  → Canary
  └── No  → Rolling
```

---

👉 Simple mental model for interviews

---

## 9. Key Trade-Offs (VERY IMPORTANT)

---

### Rolling

- simple and cost-efficient
- but slower rollback

---

### Blue-Green

- fastest rollback
- but expensive (double infra)

---

### Canary

- lowest risk
- but highest complexity

---

## 10. Important Interview Points

---

- no one strategy fits all systems
- decision depends on risk, cost, and system criticality
- backward compatibility is essential for rolling and canary
- monitoring is critical for canary deployments

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> When would you use Rolling vs Blue-Green vs Canary?

Answer like this:

> Rolling deployment is used when simplicity and cost efficiency are important, and backward compatibility is ensured. Blue-Green is preferred when instant rollback is critical, especially for high-risk systems. Canary deployment is used when minimizing risk is the priority, allowing gradual rollout and validation using real user traffic.
