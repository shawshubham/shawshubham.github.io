---
title: "Popular Load Balancers — Nginx, HAProxy & AWS ALB"
description: "Understand how popular load balancers implement proxy concepts in practice, and how to choose between Nginx, HAProxy, and AWS ALB based on system design needs."
keywords:
  - nginx load balancer
  - haproxy explained
  - aws application load balancer
  - proxy vs load balancer tools
  - system design load balancer choice
  - layer 7 load balancers
weight: 9
date: 2026-02-22
layout: "topic-content"
---

## 1. Introduction — From Concept to Concrete Systems

---

In the previous chapter, we established a critical idea:

> **A proxy is a multi-responsibility traffic control component.**  
> **Load balancing is one responsibility it can perform.**

With that mental model in place, we can now look at **real-world systems** that implement these ideas.

This chapter introduces three widely used load balancers:

- Nginx
- HAProxy
- AWS Application Load Balancer

Not to teach configuration — but to understand **why they exist and how they differ conceptually**.

---

## 2. Important Framing — These Are All Proxies

---

Before comparing tools, we must remove a common misconception:

> **Nginx, HAProxy, and AWS ALB are not “just load balancers”.**  
> They are **proxies** that happen to perform load balancing.

All three:

- sit directly in the request path
- inspect traffic
- route requests
- apply policies

What differs is **where they run, how much they abstract, and what trade-offs they make**.

---

## 3. Nginx — The General-Purpose Reverse Proxy

---

**Nginx** started as a web server, but evolved into a widely used **reverse proxy and L7 load balancer**.

### Core Characteristics

- Software-based proxy
- Runs on your infrastructure
- Highly flexible
- Configuration-driven

### What Nginx Is Commonly Used For

- Reverse proxy in front of applications
- L7 load balancing
- TLS termination
- Static content serving
- Simple API gateway patterns

### Strengths

- Very flexible
- Mature ecosystem
- Easy to reason about
- Can handle multiple proxy responsibilities in one place

### Trade-offs

- You manage scaling and availability
- Configuration complexity grows with system size
- Operational burden increases at scale

> Nginx is often chosen when **control and flexibility** matter more than full automation.

---

## 4. HAProxy — Performance-Focused Traffic Distribution

---

**HAProxy** was designed from day one as a **high-performance proxy and load balancer**.

### Core Characteristics

- Extremely efficient
- Designed for high throughput
- Strong at both L4 and L7
- Focused on traffic distribution

### What HAProxy Is Commonly Used For

- High-traffic ingress
- Performance-critical systems
- Large-scale traffic routing
- Environments where latency matters

### Strengths

- Excellent performance
- Predictable behavior
- Fine-grained control over traffic handling

### Trade-offs

- Less “all-in-one” than Nginx
- Steeper learning curve
- Still self-managed infrastructure

> HAProxy is often chosen when **performance and predictability** are the primary concerns.

---

## 5. AWS Application Load Balancer — Managed Proxy at Scale

---

**AWS Application Load Balancer** is a **fully managed Layer 7 proxy** provided by AWS.

### Core Characteristics

- Managed service
- No server management
- Deep AWS integration
- HTTP-aware routing

### What ALB Is Commonly Used For

- Internet-facing APIs
- Microservices on AWS
- Auto-scaling environments
- Managed ingress for cloud workloads

### Strengths

- Automatic scaling
- High availability by default
- Tight integration with AWS services
- Reduced operational overhead

### Trade-offs

- Less flexibility than self-managed proxies
- Vendor lock-in
- Limited customization compared to Nginx / HAProxy

> ALB is chosen when **operational simplicity and scalability** outweigh fine-grained control.

---

## 6. Comparing the Three (Conceptual View)

---

| Dimension  | Nginx          | HAProxy        | AWS ALB            |
| ---------- | -------------- | -------------- | ------------------ |
| Type       | Software proxy | Software proxy | Managed proxy      |
| Runs where | Your servers   | Your servers   | AWS                |
| Layer      | L7 (primarily) | L4 & L7        | L7                 |
| Control    | Very high      | High           | Moderate           |
| Ops effort | Medium–High    | Medium–High    | Low                |
| Best for   | Flexibility    | Performance    | Cloud-native scale |

This comparison is **not about features** — it’s about **design intent**.

---

## 7. How This Fits into System Design Decisions

---

When choosing between these options, the real questions are:

- Do I want **control or convenience**?
- Do I manage infrastructure myself?
- Is performance or simplicity more important?
- Am I cloud-native or infrastructure-agnostic?

There is no universally “best” choice — only **context-appropriate choices**.

---

## 8. Relationship to Proxies, Gateways, and Meshes

---

Once you understand these tools as **proxies**, it becomes easier to see how systems evolve:

- Nginx → API Gateway
- HAProxy → High-performance ingress
- ALB → Managed cloud edge
- Envoy (later) → Service mesh foundation

Different tools.  
Same underlying idea.

---

## Key Takeaways

---

- Nginx, HAProxy, and AWS ALB are all proxies
- Load balancing is one responsibility they perform
- They differ in control, performance focus, and operational burden
- Choosing one is a **system design decision**, not a syntax preference

---

### 🔗 What’s Next?

We’ve now seen how traffic is:

- discovered
- routed
- distributed
- enforced using proxies

Next, we introduce **network boundaries and trust zones**.

👉 **Up Next →**  
**[Firewalls & Security Groups — Network Boundaries Explained](/learning/advanced-skills/networking-essentials/4_dns-load-balancers-and-traffic-distribution/4_10_firewalls-and-security-groups)**

---

> 📝 **Takeaway**
>
> Tools change.  
> The proxy model remains.
