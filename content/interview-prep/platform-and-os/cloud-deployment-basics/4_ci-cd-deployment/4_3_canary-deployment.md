---
title: "What is Canary Deployment and When Should You Use It?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-111"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    [
      "canary deployment",
      "deployment strategy",
      "gradual rollout",
      "rollback",
      "devops",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Canary deployment is a release strategy where a new version of the application is rolled out to a small subset of users first, and gradually increased to all users after validating system stability and performance.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- risk reduction in production deployments
- gradual rollout strategies
- monitoring and validation during releases

👉 Very common in cloud, DevOps, and system design interviews.

---

## 3. The Core Idea (VERY IMPORTANT)

---

```text
Small % users → New version
Remaining users → Old version
```

---

👉 Instead of releasing to everyone:

- release to few users
- monitor behavior
- gradually increase traffic

---

👉 Key benefit:

> Fail fast with minimal impact

---

## 4. How Canary Deployment Works

---

### Step-by-Step Flow

```text
Step 1: Deploy new version
Step 2: Route 5% traffic to new version
Step 3: Monitor metrics
Step 4: Increase traffic (20% → 50% → 100%)
Step 5: Full rollout
```

---

👉 Rollout is gradual and controlled

---

## 5. Traffic Control (VERY IMPORTANT)

---

Traffic is controlled using:

- load balancer
- API gateway
- service mesh (advanced)

---

```text
5% → New version
95% → Old version
```

---

👉 Traffic percentage is configurable

---

## 6. Monitoring During Canary (CRITICAL)

---

Monitor key metrics:

- error rates
- latency
- CPU/memory usage
- business metrics (orders, payments)

---

👉 Decision based on data:

- healthy → increase traffic
- issues → rollback immediately

---

## 7. Rollback Strategy

---

If issues are detected:

```text
Route 100% traffic → Old version
```

---

👉 Rollback is fast and controlled

---

## 8. Real-World Example

---

### Payment Service Deployment

```text
Step 1: Deploy v2
Step 2: 5% traffic → v2
Step 3: Monitor failures
Step 4: Increase to 50%
Step 5: Full rollout
```

---

👉 If issue → revert traffic instantly

---

## 9. Advantages

---

- reduced risk
- real user validation
- early detection of issues

---

## 10. Disadvantages

---

- slower rollout
- requires strong monitoring
- complex traffic routing

---

## 11. Canary vs Blue-Green

---

| Feature       | Canary     | Blue-Green  |
| ------------- | ---------- | ----------- |
| Traffic Shift | Gradual    | All at once |
| Risk          | Very Low   | Medium      |
| Rollback      | Controlled | Instant     |
| Complexity    | Higher     | Moderate    |

---

👉 Use:

- Canary → gradual risk reduction
- Blue-Green → fast switch & rollback

---

## 12. Common Mistakes

---

❌ Not monitoring metrics properly  
❌ Increasing traffic too quickly  
❌ No rollback trigger defined  
❌ Ignoring business metrics

---

## 13. Important Interview Points

---

- canary deployment reduces risk via gradual rollout
- relies heavily on monitoring
- enables real-world validation before full release
- widely used in high-scale systems

---

## 14. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is Canary deployment?

Answer like this:

> Canary deployment is a strategy where a new version is released to a small subset of users first, and gradually rolled out to all users after validating system health. It reduces risk by detecting issues early and allows controlled rollback if needed.
