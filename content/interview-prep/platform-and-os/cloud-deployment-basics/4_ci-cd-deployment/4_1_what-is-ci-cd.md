---
title: "What is CI/CD and How Does Deployment Work?"
layout: "interview-prep-topic-content"
interview:
  id: "cloud-108"
  phase: "Core"
  topic: "Cloud & Deployment Basics"
  round: "Technical"
  company: ""
  tags:
    ["ci cd", "deployment", "devops", "pipeline", "automation", "system design"]
---

## 1. Short Answer (Interview Style)

---

> **CI/CD is a practice that automates the process of building, testing, and deploying code changes. Continuous Integration (CI) ensures code is integrated and tested frequently, while Continuous Delivery/Deployment (CD) ensures changes are safely released to production.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- modern deployment practices
- how code moves from development to production
- automation and reliability in releases

👉 Very common in backend, cloud, and production interviews.

---

## 3. The Problem — Why CI/CD Is Needed

---

Without CI/CD:

```text
Manual builds → manual testing → manual deployment
```

Problems:

- slow releases
- human errors
- inconsistent deployments
- difficult rollback

---

👉 Deployment becomes risky and unreliable

---

## 4. What is CI (Continuous Integration)

---

CI means:

- developers frequently merge code
- each change is automatically built and tested

---

### CI Flow

```text
Code commit → Build → Unit Tests → Integration Tests
```

---

👉 Goal:

- catch issues early
- ensure code is always in a working state

---

## 5. What is CD (Continuous Delivery / Deployment)

---

CD automates releasing code after CI.

---

### Continuous Delivery

- code is always ready to deploy
- deployment requires manual approval

---

### Continuous Deployment

- code is automatically deployed to production

---

👉 Difference:

```text
Delivery → manual approval
Deployment → fully automated
```

---

## 6. End-to-End Pipeline (VERY IMPORTANT)

---

```text
Developer commits code
→ CI Pipeline triggers
→ Build application
→ Run tests
→ Create artifact (jar/docker image)
→ Deploy to staging
→ Run validation tests
→ Deploy to production
```

---

👉 Fully automated workflow

---

## 7. Deployment Strategies

---

### 1. Blue-Green Deployment

- two environments: Blue (current) and Green (new)
- switch traffic after validation

👉 zero downtime

---

### 2. Canary Deployment

- release to small % of users first
- gradually increase traffic

👉 reduces risk

---

### 3. Rolling Deployment

- update instances one by one

👉 balanced approach

---

## 8. Rollback Strategy (CRITICAL)

---

If something fails:

- revert to previous version
- switch traffic back (blue-green)
- stop rollout (canary)

---

👉 Always design rollback before deployment

---

## 9. Real-World Example

---

### Using CI/CD Pipeline

```text
Code → GitLab → Pipeline → Build Docker Image → Push → Deploy via Kubernetes
```

---

👉 Fully automated deployment

---

## 10. Benefits of CI/CD

---

- faster releases
- reduced human errors
- consistent deployments
- improved reliability

---

## 11. Common Mistakes

---

❌ No automated tests  
❌ Deploying without rollback strategy  
❌ Large batch releases  
❌ Ignoring monitoring after deployment

---

## 12. Important Interview Points

---

- CI ensures code quality
- CD ensures safe and fast releases
- automation is key
- deployment strategies reduce risk

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is CI/CD and how does deployment work?

Answer like this:

> CI/CD is a process that automates building, testing, and deploying code. In CI, code changes are continuously integrated and tested. In CD, these changes are automatically delivered or deployed to production. A typical pipeline includes build, test, artifact creation, staging deployment, and production release using strategies like blue-green or canary deployment to ensure reliability.
