---
title: "Storage Systems Hub — How to Choose Storage in System Design"
description: "A practical decision toolkit for storage in system design: object vs block vs file vs distributed file systems, plus the trade-offs (latency, throughput, durability, consistency, cost) and common interview scenarios."
keywords:
  - storage systems hub
  - object storage vs block storage vs file storage
  - choose storage in system design
  - durability availability consistency storage
  - s3 vs ebs vs nfs
  - data lake logs backups static assets
weight: 1
date: 2026-03-16
layout: "topic-content"
---

# Storage Systems Hub — How to Choose Storage in System Design

---

Storage is one of the highest-leverage decisions in system design.

Pick the wrong storage model and you will fight:

- latency problems you can’t tune away
- scalability ceilings you can’t cache away
- consistency bugs you can’t “retry” away
- costs that grow faster than traffic

This hub gives you a decision toolkit.

- The following pages explain **Object**, **Block**, **File**, and **Distributed File Systems**.
- Each concept is framed around **how it shows up in real architectures and interviews**.

---

## 1. How to Use This Section

---

Two good reading modes:

### Option A — Read in order (structured learning)

- Object storage → Block storage → File storage → Distributed file systems → Choosing guide

### Option B — Jump by scenario (interview mode)

- “Upload photos/videos” → Object storage
- “Store database files” → Block storage
- “Multiple app servers need shared storage” → File storage
- “Hadoop / big data file layer” → Distributed file system

---

## 2. The Storage Decision Lens (Use This Every Time)

---

When choosing storage, ask these questions first:

### 1) Access pattern

- random reads/writes (DB-like)
- sequential writes (logs)
- write-once-read-many (media)
- append-only (event logs)

### 2) Latency vs throughput

- do you need low latency (ms) for every operation?
- or high throughput (MB/s) for large objects?

### 3) Consistency model

- do you require read-your-writes?
- can you tolerate eventual consistency in listings/views?

### 4) Durability & availability

- how much data loss can you tolerate? (often: none)
- what’s the recovery expectation? (RPO-Recovery Point Objective/RTO-Recovery Time Objective)

### 5) Concurrency and sharing

- do multiple machines need to read/write the same files?
- do you need POSIX-like semantics?

### 6) Cost model

- cost per GB stored
- cost per request
- cost per throughput/IOPS

---

## 3. The Four Core Storage Models (One-page Summary)

---

### 3.1 Object Storage (S3 / GCS)

Best when:

- objects are large and immutable (or versioned)
- access is over HTTP APIs
- you want extreme durability and cheap storage

Typical uses:

- media uploads (images/videos)
- backups and archives
- static assets + CDN
- logs and data lakes

Not great for:

- low-latency random writes
- POSIX filesystem behavior

---

### 3.2 Block Storage (EBS / VM disks)

Best when:

- you need low-latency random reads/writes
- you want a disk-like abstraction for a single host

Typical uses:

- database volumes
- VM boot disks
- latency-sensitive storage

Not great for:

- shared multi-writer workloads without extra coordination

---

### 3.3 File Storage (NFS / SMB)

Best when:

- you need a shared filesystem between multiple machines
- you want directory structure and file semantics

Typical uses:

- shared application storage
- content workflows
- home directories

Not great for:

- extreme scale without careful design
- high write contention

---

### 3.4 Distributed File Systems (CephFS / HDFS)

Best when:

- you need a filesystem abstraction that scales across many nodes
- you accept the operational complexity

Typical uses:

- big data / analytics (HDFS)
- cluster filesystem with replication (CephFS)

Not great for:

- simple product systems where object storage is sufficient

---

## 4. Quick Interview Mapping (If You Have 30 Seconds)

---

Use this mapping in interviews:

- **User uploads photo/video** → Object storage + CDN
- **Store thumbnails / metadata** → DB (not storage system section, but important)
- **Database needs persistent disk** → Block storage
- **Multiple app instances need shared files** → File storage
- **Massive analytics file layer** → HDFS / data lake (object storage often used too)
- **Backups / archives** → Object storage

---

## TOC: Storage Systems Concepts (10.x)

---

### Object Storage

- **10.2 Object Storage — What It Is (S3/GCS mental model)**
- **10.3 Object Storage — Durability, Immutability, Versioning**
- **10.4 Object Storage — Access Patterns (Multipart, Presigned URLs, CDN)**
- **10.5 Object Storage — Common Use Cases (Media, Backups, Logs, Static Assets)**

### Block Storage

- **10.6 Block Storage — What It Is (VM disks mental model)**
- **10.7 Block Storage — Performance (IOPS vs Throughput) + Bottlenecks**
- **10.8 Block Storage — Use Cases (Databases, Low-latency writes)**

### File Storage

- **10.9 File Storage — What It Is (NFS/SMB semantics)**
- **10.10 File Storage — Concurrency, Locking, Shared FS Pitfalls**
- **10.11 File Storage — Use Cases (Shared app storage, Content workflows)**

### Distributed File Systems

- **10.12 Distributed File Systems — Why They Exist (CephFS, HDFS)**
- **10.13 DFS Trade-offs — Consistency, Metadata scaling, Failure modes**
- **10.14 When to Use DFS vs Object Storage**

### Synthesis

- **10.15 Choosing Storage — A Practical Decision Table**
- **10.16 Storage in Real Architectures — Worked Examples**

---

## Key Takeaways

---

- Storage choice is driven by access pattern, latency/throughput, consistency, sharing, durability, and cost.
- Object storage is the default for large immutable blobs; block storage is for low-latency disks; file storage is for shared filesystem semantics.
- Distributed file systems exist for cluster-scale filesystem needs, but add operational complexity.

---

## TL;DR

---

Use object storage for blobs, block storage for database disks, file storage for shared filesystem semantics, and distributed file systems for cluster-scale files.

In interviews, justify your pick using access pattern + latency/throughput + consistency + cost.

---

### 🔗 What’s Next

Next we’ll start with the most common system design storage choice:

- what object storage is
- why S3/GCS-style systems work so well for blobs
- and what trade-offs they introduce

👉 **Up Next: →**  
**[Object Storage — What It Is (S3/GCS mental model)](/learning/advanced-skills/high-level-design/10_concepts-storage-system/10_2_object-storage-what-it-is/)**
