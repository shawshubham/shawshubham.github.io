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

- **Strategy** (export / delivery / notification)
- **Factory Method** (export format, delivery channel, notification type)
- **SOLID principles** (separation of concerns)

Every individual component was correct.

And yet, the system allowed this:

> **All parts were valid.**  
> **The system was invalid.**

Export format, delivery channel, and notification type could be chosen independently—allowing combinations that made no business sense.

This is where **Abstract Factory** enters—not as a refactor, but as a **correction in how we model the problem**.

---

## 2. The Core Insight: The Business Thinks in Workflows, Not Options

---

Our earlier design asked callers to choose options:

```text
format + delivery + notification
```

But this is not how the business thinks.

The business thinks in **intent-driven workflows**:

- “Download my report”
- “Email me the report”
- “Send me a link”

These are **bundles**, not combinations.

Before touching code, we must fix the mental model.

---

## 3. From Options to Bundles

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

> **Locally correct parts forming a globally incorrect system.**

### 3.2 The Shift: From Combinations to Capabilities

Instead of asking:

> “Which format, which delivery, which notification?”

We should be asking:

> **“What kind of report experience is this?”**

Each experience:

- represents clear intent
- enforces compatible behavior
- forbids invalid states by design

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

## 5. Identify the “Family” That Must Change Together

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

> ### 📦 _Design Evolution Note: Package Structure Refactor_
>
> As this example evolved from **independent strategies** to **workflow-based bundles**, the original package structure started to break down.
>
> Earlier, the code was organized mainly by **technical concerns**:
>
> ```text
> export / delivery / notification / factory
> ```
>
> This worked when behaviors were independent.
>
> However, once **Abstract Factory** was introduced:
>
> - bundle-specific logic became scattered
> - adding a new workflow required touching many packages
> - package boundaries no longer matched business intent
>
> This is a subtle **SRP violation at the package level**.
>
> To fix this, we reorganized the code around **reporting workflows (bundles)** instead of isolated mechanisms:
>
> ```text
> reporting/
>  ├── bundle/
>  ├── export/
>  ├── delivery/
>  ├── notification/
>  └── service/
> ```
>
> ### Why this matters
>
> - Each bundle now has a single reason to change
> - New workflows can be added cleanly
> - The structure reflects how the business thinks
>
> Abstract Factory didn’t just change object creation —  
> it forced us to realign the **module structure**.
>
> #### 💡 Takeaway
>
> When design patterns evolve, **package structure must evolve too**.  
> Resistance in structure is often a **design signal**, not a code smell.

---

## 6. The Abstract Factory Contract

---

We define a factory that creates **a complete bundle**, not individual parts.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/improved/ems/">See Code in Git Repo</a>
</div>

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

## 7. Concrete Bundle Factories (One per Bundle)

---

### 7.1 Portal Download Bundle Factory

```java
public class PortalDownloadBundleFactory implements ReportBundleFactory{
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
        return DeliveryStrategyFactory.getStrategy(DeliveryChannel.DOWNLOAD);
    }

    @Override
    public Optional<NotificationStrategy> createNotificationStrategy() {
        return Optional.of(NotificationStrategyFactory.getStrategy(NotificationType.PUSH));
    }
}
```

#### What this enforces:

- DOWNLOAD only
- PUSH only
- Format constrained by constructor

### 7.2 Email Attachment Bundle Factory

```java
public class EmailAttachmentBundleFactory implements ReportBundleFactory {
    @Override
    public ReportExportStrategy createExportStrategy() {
        return ReportExportStrategyFactory.getStrategy(ExportFormat.PDF);
    }

    @Override
    public DeliveryStrategy createDeliveryStrategy() {
        return DeliveryStrategyFactory.getStrategy(DeliveryChannel.EMAIL_ATTACHMENT);
    }

    @Override
    public Optional<NotificationStrategy> createNotificationStrategy() {
        return Optional.empty();
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
        return ReportExportStrategyFactory.getStrategy(ExportFormat.PDF);
    }

    @Override
    public DeliveryStrategy createDeliveryStrategy() {
        return DeliveryStrategyFactory.getStrategy(DeliveryChannel.EMAIL_LINK);
    }

    @Override
    public Optional<NotificationStrategy> createNotificationStrategy() {
        return Optional.of(NotificationStrategyFactory.getStrategy(NotificationType.SMS));
    }
}
```

#### What this enforces:

- Secure link workflow
- SMS is allowed only as a side notification
- No accidental “download + SMS” combinations

### 7.4 Bundle Selection: Introducing ReportBundleType

At this stage, we need a way for the client to express **which workflow it wants**, without assembling the bundle manually.

The simplest and most readable option is an explicit **bundle identifier**.

```java
public enum ReportBundleType {
    PORTAL_DOWNLOAD,
    EMAIL_ATTACHMENT,
    EMAIL_LINK
}
```

This enum represents **business intent**, not technical configuration.

- It is not about formats
- It is not about channels
- It is about **which report experience the user wants**

This keeps the client API expressive and intention-revealing.

### 7.5 ReportBundleFactoryProvider: Centralizing Bundle Creation

Next, we introduce a small but important component: **a bundle factory provider**.

```java
public class ReportBundleFactoryProvider {

    public static ReportBundleFactory getBundleFactory(ExportReportRequest request) {
        return switch (request.getBundleType()) {
            case PORTAL_DOWNLOAD -> new PortalDownloadBundleFactory(request.getFormat());
            case EMAIL_ATTACHMENT -> new EmailAttachmentBundleFactory();
            case EMAIL_LINK -> new EmailLinkBundleFactory();
        };
    }
}
```

#### Why a switch here is acceptable (and intentional)

At first glance, this looks like something we tried to avoid earlier.

But there is an important distinction:

- ❌ **Switching on behavior** → bad
- ✅ **Switching on business intent at the boundary** → acceptable

This switch exists at a **composition boundary**, not inside domain logic.

Its responsibility is limited and clear:

> “Given a requested workflow, return the correct bundle.”

This is a **single, centralized decision point**, not scattered conditional logic.

### 7.6 ExportReportRequest: A Practical First Cut

To support this, we introduce a request object that carries:

- the selected bundle
- destinations needed for delivery/notification
- bundle-specific configuration (like format)

```java
public class ExportReportRequest {
    private final ReportBundleType bundleType;

    // destinations (used by some bundles)
    private final String deliveryAddress; // email OR download path
    private final String notificationTarget; // phone / email /push token

    // bundle-specific config
    private final ExportFormat format;

    // All args constructor, getters ...
}
```

#### Why this design is acceptable for now

This request object is **not perfect**.

It allows:

- unused fields for some bundles
- values that may be ignored depending on workflow

However, at this stage it gives us:

- a **clear client API**
- a **single request object**
- a **simple mental model**
- no premature abstraction

This aligns with **YAGNI**:

> Solve today’s problem cleanly before optimizing tomorrow’s model.

We’ll deliberately revisit this design later.

---

## 8. Using the Abstract Factory in ReportingOperationsService

---

The service no longer assembles behavior.

It **executes a bundle.**

```java
public void exportReport(Employee employeeData, ExportReportRequest request) {
  logger.info("Exporting report for " + employeeData.getName());
  ReportBundleFactory bundleFactory = ReportBundleFactoryProvider.getBundleFactory(request);

  // 1) Generate Report (Domain)
  EmployeeReport report = generateReport(employeeData);

  // 2 + 3) Layout/Template + Export (format-specific)
  ExportedReport exportedReport =  bundleFactory.getExportStrategy().export(report);

  // 4) Delivery Channel-Specific Logic
  DeliveryResult deliveryResult = bundleFactory.getDeliveryStrategy().deliver(exportedReport, request.getDeliveryAddress());

  // 5) Notification Logic (Optional)
  bundleFactory.getNotificationStrategy()
      .ifPresent(strategy ->
              strategy.notifyUser(deliveryResult, request.getNotificationTarget()));

  logger.info("Report exported successfully");
}
```

### What disappeared (this is important)

- ❌ No combinatorial logic
- ❌ No conditional checks per bundle
- ❌ No invalid combinations
- ❌ No “if this then that” chains

The **system is correct by construction**.

---

## 9. Client Usage: Expressing Intent, Not Assembly

---

```java
public class EMSApplication {
    private static final Logger logger = Logger.getLogger(EMSApplication.class.getName());
    private static final String persistenceFileName = "employees.txt";

    public static void main(String args[]) {
        Employee fullTimeEmployee = new FullTimeEmployee("Shubham", Department.ENGINEERING,4500, 3000, 5);
        ReportingOperationsService reportingOperationsService = new ReportingOperationsService(salaryCalculator);
        ReportingClient reportingClient = new ReportingClient(reportingOperationsService);

        logger.log(Level.INFO, "Client asking to export report of the provided employee...");
        reportingClient.exportReport(fullTimeEmployee,
                new ExportReportRequest(
                        ReportBundleType.EMAIL_ATTACHMENT,
                        ExportFormat.PDF,
                        "receiver@gmail.com",
                        null)); // This null is a smell we fix in Part 3
        logger.log(Level.INFO, "Report exported successfully.");
    }
}
```

The client:

- does **not** choose strategies
- does **not** assemble workflows
- does **not** worry about compatibility

It states **what it wants**, and the system ensures correctness.

> ### ⚠️ Design Note: A Modeling Smell (Intentionally Deferred)
>
> At this point, the system is **globally correct**.
>
> However, there is still a **modeling smell**:
>
> - ExportReportRequest contains fields that are meaningful only for some bundles
> - nothing prevents a client from passing unused or irrelevant values
>
> This is **not a pattern problem**.
>
> It is a **type modeling problem**.
>
> We will intentionally **defer fixing** this until the next article, where we’ll explore:
>
> - how to make invalid requests unrepresentable
> - how sealed interfaces and records help
> - how this improves correctness before the factory is even involved
>
> For now, the focus of this article is complete:
>
> **Abstract Factory has moved system correctness into object creation.**

---

## 10. Why Abstract Factory Was the Missing Piece

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

## 11. Strategy vs Factory Method vs Abstract Factory (Interview Gold)

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

## 12. When You Actually Need Abstract Factory (Notes)

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

Abstract Factory is not “just another factory”.

It solves a very specific failure mode:

> **Individually valid choices forming a globally invalid system.**

By modeling **workflows as bundles**, we enforced compatibility at creation time:

- callers express **intent** (PORTAL_DOWNLOAD, EMAIL_ATTACHMENT, EMAIL_LINK)
- the system constructs a **compatible family** of export + delivery + notification strategies
- invalid combinations become **impossible by design**

That’s the real value: **correctness moves from runtime checks to object creation**.

### 🔗 What’s Next?

We intentionally stopped at a _practical first cut: ExportReportRequest_ is simple, but slightly “leaky” (it can carry irrelevant fields for some bundles).

Next, we’ll tighten the API using **type-driven modeling**:

👉
👉 **[Part 3: Making Requests Unrepresentable (sealed interface + records) →](/learning/advanced-skills/low-level-design/3_creational-design-patterns/3_11_abstract-factory-pattern-part3)**

You’ll see how to replace “generic requests + optional fields” with **bundle-specific request types**, so invalid input becomes impossible _before_ we even choose a factory.

> 📝 **Takeaway**
>
> - Abstract Factory enforces allowed combinations
> - It protects system correctness at creation time
> - Use it when options are valid individually but not together
