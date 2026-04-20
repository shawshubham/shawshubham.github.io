---
title: "What is Autoscaling and Why Is Capacity Planning Important?"
layout: "interview-prep-topic-content"
interview:
  id: "perf-107"
  phase: "Core"
  topic: "Performance & Reliability"
  round: "Technical"
  company: ""
  tags:
    [
      "autoscaling",
      "capacity planning",
      "scaling",
      "performance",
      "reliability",
      "system design",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Autoscaling is the ability of a system to automatically increase or decrease resources based on load, while capacity planning is the process of estimating how much infrastructure is needed to handle expected traffic reliably. Autoscaling helps systems react to demand, and capacity planning ensures the system is prepared before traffic arrives.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how systems handle changing traffic patterns
- the difference between reactive scaling and proactive planning
- cost vs performance trade-offs
- real-world reliability thinking

👉 This is a common backend and system design interview question, especially for high-traffic systems.

---

## 3. Problem — Why Autoscaling and Capacity Planning Are Needed

---

Traffic is rarely constant.

Examples:

- sale events
- payroll days
- market open hours
- end-of-month batch traffic

Without proper scaling:

- services may become overloaded
- latency increases
- failures increase
- users see downtime

Without planning:

- autoscaling may react too slowly
- database may still become bottleneck
- costs may increase unnecessarily

👉 Systems need both **smart reaction** and **good preparation**.

---

## 4. What is Autoscaling?

---

Autoscaling means:

- increase resources when load rises
- decrease resources when load drops

---

Example:

```text
Normal traffic → 2 service instances
Peak traffic → 8 service instances
Low traffic → 2 service instances again
```

---

👉 This improves:

- availability
- performance
- cost efficiency

---

## 5. What is Capacity Planning?

---

Capacity planning means estimating:

- expected traffic
- peak load
- infrastructure needs
- failure margin / headroom

---

Example questions:

- how many requests per second should we support?
- how many instances are needed at peak?
- how much database throughput is required?
- how much extra headroom is needed for spikes?

---

👉 Capacity planning is done **before** the system is stressed.

---

## 6. Autoscaling vs Capacity Planning

---

| Aspect  | Autoscaling                       | Capacity Planning                                  |
| ------- | --------------------------------- | -------------------------------------------------- |
| Nature  | Reactive / dynamic                | Proactive / predictive                             |
| Goal    | Adjust resources automatically    | Estimate required resources in advance             |
| Trigger | Metrics like CPU, RPS, queue size | Forecasting, traffic analysis, growth expectations |
| Benefit | Handles traffic variation         | Prevents under-provisioning and surprises          |

👉 Real systems need both.

---

## 7. Common Autoscaling Signals

---

Systems may scale based on:

- CPU usage
- memory usage
- request rate (RPS)
- queue length
- thread pool usage
- custom business metrics

---

👉 Better scaling often uses **load-related metrics**, not just CPU.

---

## 8. Real-World Example

---

### Scenario: E-commerce Sale

```text
Traffic spike expected at 9 AM
```

Good approach:

- capacity planning estimates expected peak traffic
- system pre-scales before event
- autoscaling continues adjusting during the event

---

👉 This avoids both under-scaling and over-spending.

---

## 9. Why Autoscaling Alone Is Not Enough

---

Autoscaling is helpful, but it has limits:

- it reacts after load increases
- new instances take time to start
- databases do not always scale as easily as services
- external dependencies may still fail

---

👉 Important interview point:

> Autoscaling helps the application tier, but it does not automatically solve database, cache, or downstream bottlenecks.

---

## 10. Capacity Planning Factors

---

When planning capacity, consider:

- average traffic
- peak traffic
- traffic growth trend
- batch workloads
- failure scenarios
- regional traffic patterns
- cost budget

---

👉 Always leave **headroom**, not just exact capacity.

---

## 11. Common Mistakes

---

❌ Relying only on autoscaling  
❌ Scaling application but ignoring database  
❌ Using wrong scaling metric  
❌ No pre-scaling for known events  
❌ No capacity buffer / headroom

---

## 12. Important Interview Points

---

- autoscaling is reactive; capacity planning is proactive
- autoscaling improves elasticity and cost efficiency
- capacity planning avoids outages during predictable peaks
- databases and external systems must also be considered

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is autoscaling and why is capacity planning important?

Answer like this:

> Autoscaling is the ability of a system to automatically add or remove resources based on load, while capacity planning is the process of estimating infrastructure needs in advance. Autoscaling helps handle changing traffic dynamically, but capacity planning is still important because systems need to be prepared for predictable peaks, database limits, and failure scenarios. In practice, both are used together.
