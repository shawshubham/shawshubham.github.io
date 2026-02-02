---
title: Abstract Factory Pattern – Enforcing Compatible Object Families (Part 2)
description: Fix the design gap from Part 1 by introducing Abstract Factory. Enforce compatible export + delivery + notification bundles so invalid combinations are impossible by design.
keywords:
  - abstract factory pattern java
  - abstract factory design pattern example
  - strategy vs abstract factory
  - factory method not enough
  - compatible object families
  - low level design interview
weight: 10
date: 2025-12-26
layout: "topic-content"
---

---

## 1. Recap: Where We Got Stuck

---

In **Part 1**, we designed a clean, extensible system using:

- Strategy (export / deliver / notify)
- Factory Method (format, channel, notification)
- SOLID principles (separation of concerns)

And yet, we hit a wall.

> **All parts were valid.**  
> **The system was invalid.**

We allowed independent selection of:

- export format
- delivery channel
- notification type

Nothing prevented nonsensical combinations.

This is where Abstract Factory enters — **not as a refactor, but as a correction in thinking.**

---

## 2. The Core Insight: The Business Thinks in Workflows, Not Options

---

Our earlier design asked callers to choose options:

```text
format + delivery + notification
```

But the business never thinks this way.

The business thinks in **intent-driven workflows**:

- “Download my report”
- “Email me the report”
- “Send me a link”

These are **bundles**, not combinations.

Before touching code, we must fix the model.

---

## 3. Step 1: Stop Thinking in Options — Start Thinking in Bundles

---

### 3.1 Why “Option-Based Design” Breaks Down

An option-based API encourages callers to assemble behavior themselves:

```text
ExportFormat = PDF
Delivery     = DOWNLOAD
Notification = SMS
```

This compiles.  
It passes tests.  
It is still wrong.

> The user never asked for “SMS + download”.

This is the design smell:

> **Correct parts, incorrect system.**

### 3.2 The Mental Shift: From Combinations to Capabilities

Instead of asking:

> “Which format, which delivery, which notification?”

We should be asking:

> **“What kind of report experience is this?”**

Each experience:

- has a clear intent
- enforces compatible choices
- forbids invalid ones

These experiences are **bundles**.

---

## 4. Defining Realistic Export Bundles

---

Let’s define a **small, realistic set of workflows**.

These are not technical permutations.
They are **business capabilities**.

### 4.1 Bundle 1: Portal Download : PORTAL_DOWNLOAD

#### Intent

> “Generate a report and let me download it.”

#### Rules

- Delivery: DOWNLOAD
- Formats: PDF, CSV, HTML
- Notification: optional PUSH only

### 4.2 Bundle 2: Email Attachment : EMAIL_ATTACHMENT

#### Intent

> “Send me the report as an email attachment.”

#### Rules

- Delivery: EMAIL (attachment)
- Formats: PDF only
- Notification: none (email is the notification)

### 4.3 Bundle 3: Email Link : EMAIL_LINK

#### Intent

> “Email me a secure link to download the report.”

#### Rules

- Delivery: EMAIL (link)
- Formats: PDF, HTML
- Notification: optional SMS (“link sent”)

### 4.4 What Bundles Give Us

Each bundle:

- encodes **business intent**
- enforces **valid combinations**
- eliminates invalid states by design
- removes decision-making from callers

Now we have the real problem statement:

> **How do we create a compatible family of objects for each bundle?**
