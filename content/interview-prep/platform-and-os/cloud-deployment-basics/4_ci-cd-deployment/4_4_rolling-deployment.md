---
title: "What is Rolling Deployment and When Should You Use It?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-112"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "rolling deployment",
      "deployment strategy",
      "zero downtime",
      "gradual rollout",
      "kubernetes",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Rolling deployment is a strategy where application instances are updated gradually, one by one (or in small batches), replacing old versions with new ones without bringing the system down.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- zero-downtime deployment strategies
- gradual rollout approaches
- how real production systems are updated

👉 Very common in cloud, DevOps, and backend interviews.

---

## 3. The Core Idea (VERY IMPORTANT)

---

```text
Old Version → gradually replaced → New Version
```

---

👉 Instead of switching everything at once:

- update few instances
- keep rest running
- continue until all are updated

---

👉 Key benefit:

> System remains available during deployment

---

## 4. How Rolling Deployment Works

---

### Step-by-Step Flow

```text
Step 1: 4 instances running (v1)
Step 2: Replace 1 instance with v2
Step 3: Wait for it to be healthy
Step 4: Replace next instance
Step 5: Repeat until all instances are updated
```

---

👉 Deployment happens in phases

---

## 5. Traffic Handling (VERY IMPORTANT)

---

```text
Users → Load Balancer → Mixed versions (v1 + v2)
```

---

👉 During deployment:

- some users hit old version
- some users hit new version

---

👉 Requires:

> Backward compatibility between versions

---

## 6. Rollback Strategy

---

If issues are detected:

- stop further rollout
- roll back updated instances to old version

---

👉 Rollback is slower compared to Blue-Green

---

## 7. Real-World Example

---

### Microservices Deployment

```text
Service → 5 pods (v1)

Rolling update:
1 → v2
2 → v2
3 → v2
4 → v2
5 → v2
```

---

👉 Kubernetes handles this automatically

---

## 8. Advantages

---

- zero downtime
- no need for duplicate infrastructure
- efficient resource usage

---

## 9. Disadvantages

---

- mixed versions during deployment
- requires backward compatibility
- rollback is slower

---

## 10. Rolling vs Blue-Green vs Canary

---

| Feature       | Rolling               | Blue-Green  | Canary         |
| ------------- | --------------------- | ----------- | -------------- |
| Traffic Shift | Gradual (by instance) | All at once | Gradual (by %) |
| Downtime      | None                  | None        | None           |
| Rollback      | Slower                | Instant     | Controlled     |
| Cost          | Low                   | High        | Medium         |
| Complexity    | Low                   | Moderate    | Higher         |

---

👉 Use:

- Rolling → simple, efficient deployments
- Blue-Green → fast rollback
- Canary → risk reduction with monitoring

---

## 11. Common Mistakes

---

❌ Not ensuring backward compatibility  
❌ Deploying too fast without health checks  
❌ Ignoring mixed-version behavior  
❌ No monitoring during rollout

---

## 12. Important Interview Points

---

- rolling deployment updates instances gradually
- ensures zero downtime
- requires backward compatibility
- widely used in Kubernetes environments

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is rolling deployment?

Answer like this:

> Rolling deployment is a strategy where application instances are updated gradually, replacing old versions with new ones in phases. This ensures zero downtime, but requires backward compatibility since both versions run simultaneously during the rollout.
