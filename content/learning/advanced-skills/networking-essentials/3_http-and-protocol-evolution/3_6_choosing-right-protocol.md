---
title: "Choosing the Right Protocol — REST vs gRPC vs HTTP/2 vs HTTP/3"
description: "A practical decision guide for choosing the right protocol in system design, based on environment, performance, security, and communication patterns."
keywords:
  - rest vs grpc
  - http1 vs http2 vs http3
  - protocol selection system design
  - grpc or rest
  - http protocol decision guide
  - backend architecture protocols
weight: 6
date: 2026-02-20
layout: "topic-content"
---

## 1. Introduction — Protocol Choice Is a Design Decision

---

By now, we have studied:

- HTTP/1.1 and its limitations
- TLS and security as a baseline
- HTTP/2 and multiplexing
- HTTP/3 and QUIC
- gRPC for internal communication

At this point, a common question arises:

> **Which protocol should I actually use?**

There is no universally “best” protocol.

Protocol selection depends on:

- who the clients are
- where communication happens
- performance requirements
- reliability and security needs

This chapter turns knowledge into **design judgment**.

---

## 2. First Principle: External vs Internal Communication

---

The most important distinction is **where the communication happens**.

### External Communication

- Unknown or third-party clients
- Browsers, mobile apps, partners
- Long-lived compatibility expectations

### Internal Communication

- Services owned by the same organization
- Controlled deployment environment
- Performance and efficiency matter more

This single distinction eliminates many wrong choices early.

---

## 3. REST Over HTTP — The Default for External APIs

---

### When REST Is the Right Choice

Use REST when:

- APIs are consumed by external clients
- Browser compatibility is required
- Human readability matters
- Debugging with curl/Postman is valuable
- Caching (GET, CDN) is important

REST works best with:

- HTTP/1.1 or HTTP/2
- HTTPS as the default
- Stateless request–response patterns

> REST optimizes for **reach and simplicity**, not raw performance.

---

## 4. gRPC — Optimized for Internal Service Communication

---

### When gRPC Is the Better Choice

Use gRPC when:

- You control both client and server
- Communication is service-to-service
- High throughput or low latency matters
- Strong contracts are required
- Streaming is part of the workflow

Typical gRPC environments:

- microservices
- data processing pipelines
- trading systems
- internal platforms

> gRPC optimizes for **performance, contracts, and efficiency**.

---

## 5. Choosing Between HTTP/1.1, HTTP/2, and HTTP/3

---

### HTTP/1.1

Use when:

- simplicity matters
- legacy systems are involved
- low concurrency is expected

Limitations:

- sequential request handling
- inefficient under high concurrency

---

### HTTP/2

Use when:

- clients support it (most modern ones do)
- concurrency is high
- reducing latency matters
- infrastructure supports long-lived connections

HTTP/2 is often the **best default** today for REST APIs.

---

### HTTP/3

Use when:

- clients are mobile or on unreliable networks
- latency variability is high
- packet loss is common
- first-request performance matters

HTTP/3 is powerful but not always necessary.

> Use HTTP/3 where the network is the bottleneck — not by default everywhere.

---

## 6. Decision Matrix (Quick Reference)

---

| Scenario                       | Recommended Choice    |
| ------------------------------ | --------------------- |
| Public API (browser, mobile)   | REST + HTTPS (HTTP/2) |
| Public API, mobile-heavy       | REST + HTTPS (HTTP/3) |
| Internal microservices         | gRPC over HTTP/2      |
| Streaming / real-time internal | gRPC                  |
| Simple internal admin APIs     | REST                  |
| Legacy compatibility           | HTTP/1.1              |
| High-latency / lossy networks  | HTTP/3                |

This table is **not a rulebook** — it’s a starting point.

---

## 7. Common Mistakes to Avoid

---

### ❌ Choosing gRPC for Public APIs

- Browser support is limited
- Tooling and debugging become harder
- Client friction increases

### ❌ Using HTTP/3 Everywhere

- Adds complexity
- Benefits may be negligible in data centers

### ❌ Treating Protocols as Trends

- “Everyone is using X” is not a design reason
- Context matters more than popularity

Good systems choose protocols **intentionally**.

---

## 8. How to Explain Your Choice in Interviews

---

Interviewers care less about _what_ you chose  
and more about _why_ you chose it.

Strong answers sound like this:

> “Externally, we expose REST APIs over HTTPS for compatibility.  
> Internally, we use gRPC over HTTP/2 for performance and strong contracts.”

Or:

> “We chose HTTP/2 by default, and HTTP/3 only for mobile clients where packet loss is common.”

Clarity of reasoning > protocol names.

---

## 9. Layer Mapping (Final Synthesis)

---

> 📍 **Layer Perspective**
>
> - REST and gRPC operate at the **Application layer**
> - HTTP/1.1, HTTP/2, HTTP/3 define application-level transport semantics
> - TLS provides cross-layer security
> - TCP or QUIC handle delivery guarantees
>
> Protocol choice is about **how these layers interact**, not isolated decisions.

This layered thinking is the hallmark of strong system design.

---

## Final Takeaways

---

- There is no single “best” protocol
- External and internal communication have different needs
- REST prioritizes compatibility
- gRPC prioritizes performance and contracts
- HTTP/2 is a strong default
- HTTP/3 shines in unreliable networks
- Protocol choice should be justified, not assumed

---

### 🔗 What’s Next?

Phase 3 focused on **how data is communicated efficiently and securely**.

In the next phase, we move outward into **network-scale components**:

- DNS and service discovery
- Load balancers (L4 vs L7)
- CDNs and edge networks
- Cloud and private networking

👉 **Up Next →**  
**[Phase 4: DNS, Load Balancers & Traffic Distribution](/learning/advanced-skills/networking-essentials/4_dns-load-balancers-and-traffic-distribution/4_1_why-service-discovery)**

---

> 📝 **Capstone Takeaway**
>
> Strong system design is not about knowing more protocols —  
> it’s about choosing the **right one for the right context**.
