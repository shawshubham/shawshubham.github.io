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

---

## 5. Step 2: Identify the “Family” That Must Change Together

---

From the bundles, we can see a pattern:

Each bundle always creates the **same family of objects**:

- a **ReportExportStrategy**
- a **DeliveryStrategy**
- optionally, a **NotificationStrategy**

These objects:

- must be compatible
- must be created together
- must not be mixed with objects from other bundles

This is the textbook definition of **Abstract Factory**:

> **Create families of related or dependent objects without specifying their concrete classes.**

The key word is **family** — not “object”, not “strategy”.

---

## 6. The Abstract Factory Contract

---

We define a factory that creates **a complete bundle**, not individual parts.

```java
public interface ReportBundleFactory {

    ReportExportStrategy createExportStrategy();

    DeliveryStrategy createDeliveryStrategy();

    Optional<NotificationStrategy> createNotificationStrategy();
}
```

### Why this interface matters

- Callers cannot mix and match
- Compatibility is enforced at construction time
- Each factory represents **one business workflow**

This is the **missing abstraction** from Part 1.

---

## 7. Concrete Factories (One per Bundle)

---

### 7.1 Portal Download Bundle Factory

```java
public class PortalDownloadBundleFactory implements ReportBundleFactory {

    private final ExportFormat format;

    public PortalDownloadBundleFactory(ExportFormat format) {
        this.format = format;
    }

    @Override
    public ReportExportStrategy createExportStrategy() {
        return ReportExportStrategyFactory.getStrategy(format);
    }

    @Override
    public DeliveryStrategy createDeliveryStrategy() {
        return new DownloadDeliveryStrategy();
    }

    @Override
    public Optional<NotificationStrategy> createNotificationStrategy() {
        return Optional.of(new PushNotificationStrategy());
    }
}
```

#### What this enforces:

- Only DOWNLOAD delivery
- Only PUSH notification
- Format constrained by constructor, not caller freedom

### 7.2 Email Attachment Bundle Factory

```java
public class EmailAttachmentBundleFactory implements ReportBundleFactory {

    @Override
    public ReportExportStrategy createExportStrategy() {
        return new PdfReportExportStrategy();
    }

    @Override
    public DeliveryStrategy createDeliveryStrategy() {
        return new EmailAttachmentDeliveryStrategy();
    }

    @Override
    public Optional<NotificationStrategy> createNotificationStrategy() {
        return Optional.empty(); // email is the notification
    }
}
```

#### What this enforces:

- PDF only
- Email attachment only
- No secondary notification possible

This was **impossible** to enforce cleanly in Part 1.

### 7.3 Email Link Bundle Factory

```java
public class EmailLinkBundleFactory implements ReportBundleFactory {

    @Override
    public ReportExportStrategy createExportStrategy() {
        return new PdfReportExportStrategy();
    }

    @Override
    public DeliveryStrategy createDeliveryStrategy() {
        return new EmailLinkDeliveryStrategy();
    }

    @Override
    public Optional<NotificationStrategy> createNotificationStrategy() {
        return Optional.of(new SmsNotificationStrategy());
    }
}
```

#### What this enforces:

- Secure link workflow
- SMS is allowed only as a side notification
- No accidental “download + SMS” combinations

---

## 8. Using the Abstract Factory in ReportingOperationsService

---

The service no longer assembles behavior.

It **executes a bundle.**

```java
public void exportReport(Employee employee, ReportBundleFactory bundleFactory) {

    // 1. Generate domain report
    EmployeeReport report = generateReport(employee);

    // 2. Export
    ExportedReport exported =
        bundleFactory.createExportStrategy().export(report);

    // 3. Deliver
    DeliveryResult result =
        bundleFactory.createDeliveryStrategy()
            .deliver(exported, employee.getEmail());

    // 4. Notify (if applicable)
    bundleFactory.createNotificationStrategy()
        .ifPresent(strategy ->
            strategy.notifyUser(result, employee.getContact()));
}
```

### What disappeared (this is important)

- ❌ No switch statements
- ❌ No combinatorial logic
- ❌ No “if notification != null”
- ❌ No invalid states

The **system is correct by construction**.

---

## 9. Why Abstract Factory Was the Missing Piece

---

Let’s compare designs.

### Part 1 (Factory + Strategy)

| Aspect               | Result     |
| -------------------- | ---------- |
| Extensibility        | ✅         |
| Testability          | ✅         |
| Local correctness    | ✅         |
| Global correctness   | ❌         |
| Invalid combinations | ❌ allowed |

### Part 2 (Abstract Factory)

| Aspect               | Result        |
| -------------------- | ------------- |
| Extensibility        | ✅            |
| Testability          | ✅            |
| Global correctness   | ✅            |
| Invalid combinations | ❌ impossible |
| Business intent      | ✅ explicit   |

---

## 10. Strategy vs Factory Method vs Abstract Factory (Interview Gold)

---

| Pattern              | Solves                     | EMS Example           |
| -------------------- | -------------------------- | --------------------- |
| Strategy             | Vary behavior              | PDF vs CSV export     |
| Factory Method       | Choose one implementation  | ExportStrategyFactory |
| **Abstract Factory** | Create compatible families | ReportBundleFactory   |

> #### Key interview line:
>
> Strategy varies behavior.  
> Factory Method chooses implementations.  
> Abstract Factory enforces which variations are allowed together.

---

## 11. When You Actually Need Abstract Factory (Notes)

---

### Use Abstract Factory when:

- Objects must be created **together**
- Combinations are **not independent**
- Business rules define **allowed ecosystems**
- Invalid states must be **unrepresentable**

### Do NOT use Abstract Factory when:

- Objects vary independently
- You only need one object
- You’re solving a simple selection problem
- You’re prematurely abstracting

---

## Conclusion

---

Abstract Factory is not “another factory”.

It exists to solve a very specific problem:

> **Valid parts forming an invalid system.**

In EMS:

- Strategy gave flexibility
- Factory Method gave selection
- Abstract Factory enforced correctness

By creating **compatible object families**, Abstract Factory moves business rules  
from runtime checks into **object creation itself**.

That’s why it matters.

### 🔗 What’s Next?

With this article, we intentionally **close Creational Design Patterns**.

So far, we’ve covered the patterns that matter most in real systems:

- **Builder** → safe construction
- **Factory Method** → implementation selection
- **Abstract Factory** → compatible object families

Together, these handle **most real-world creation problems**.

Next, we move to **Structural Design Patterns**, where the focus shifts from:

> “How objects are created”  
> to  
> “How objects are composed to form larger systems.”

👉 **[Up next: Introduction to Structural Design Patterns →](/learning/advanced-skills/low-level-design/4_structural-design-patterns/4_1_structural-patterns-overview)**

> 📝 **Takeaway**
>
> - Abstract Factory enforces allowed combinations
> - It protects system correctness at creation time
> - Use it when options are valid individually but not together
