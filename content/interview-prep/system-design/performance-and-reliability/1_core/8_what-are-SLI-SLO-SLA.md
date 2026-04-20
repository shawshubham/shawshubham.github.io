---
title: "What are SLI, SLO, and SLA?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-108"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags: ["sli", "slo", "sla", "reliability", "observability", "system design"]
---

## 1. Short Answer (Interview Style)

---

> **SLI (Service Level Indicator) is a measurable metric of system performance, SLO (Service Level Objective) is the target value for that metric, and SLA (Service Level Agreement) is the contractual commitment made to customers based on those targets.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how system reliability is measured
- how performance targets are defined
- how commitments are made to users

👉 This is a very common question in system design and production engineering interviews.

---

## 3. The Core Problem

---

In real systems, we need to answer:

- How reliable is the system?
- How fast is the system?
- What guarantees do we provide to users?

👉 We cannot rely on vague statements like “system is fast” or “system is reliable”.

---

## 4. What is SLI (Service Level Indicator)

---

SLI is a **measurable metric**.

Examples:

- request latency (e.g., 95th percentile latency)
- error rate (e.g., % of failed requests)
- availability (e.g., uptime percentage)

---

Example:

```text
95% of requests are served within 200ms
```

👉 This is an SLI (measurement).

---

## 5. What is SLO (Service Level Objective)

---

SLO is the **target or goal** for an SLI.

Example:

```text
SLO: 99% of requests should complete within 200ms
```

👉 This defines what “good performance” means.

---

## 6. What is SLA (Service Level Agreement)

---

SLA is a **contractual commitment** to customers.

Example:

```text
SLA: 99.9% uptime guaranteed, or compensation is provided
```

---

👉 SLA includes:

- defined targets
- penalties or consequences if not met

---

## 7. Relationship Between SLI, SLO, and SLA

---

```text
SLI → What we measure
SLO → What we aim for
SLA → What we promise
```

---

Example:

```text
SLI: latency of API requests
SLO: 99% requests < 200ms
SLA: 99.9% uptime commitment to customers
```

---

## 8. Real-World Example

---

### Scenario: Payment Service

SLI:

- API latency
- error rate

SLO:

- 99% requests < 300ms
- error rate < 0.1%

SLA:

- 99.9% availability guaranteed

---

👉 If SLA is violated → company may provide credits or compensation

---

## 9. Why These Are Important

---

### 9.1 Clear Measurement

- removes ambiguity
- defines system health

---

### 9.2 Reliability Targets

- teams know what to optimize

---

### 9.3 Business Alignment

- connects engineering with customer expectations

---

### 9.4 Incident Handling

- helps decide when system is “unhealthy”

---

## 10. Common Mistakes

---

❌ Confusing SLI with SLO  
❌ Setting unrealistic SLOs  
❌ No monitoring for SLIs  
❌ Over-promising in SLA

---

## 11. Important Interview Points

---

- SLI is a metric, SLO is a target, SLA is a commitment
- SLA usually includes penalties
- SLO should be realistic and measurable
- SLIs must be monitored continuously

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are SLI, SLO, and SLA?

Answer like this:

> SLI is a measurable metric like latency or error rate, SLO is the target value for that metric, and SLA is the agreement made with customers based on those targets, often including penalties if not met. Together, they define how system reliability is measured, targeted, and guaranteed.
