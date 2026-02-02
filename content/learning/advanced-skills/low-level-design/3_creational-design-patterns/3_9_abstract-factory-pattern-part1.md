---
title: "Abstract Factory Pattern – When Good Designs Still Break (Part 1)"
description: "Understand why Strategy and Factory patterns alone are not enough. Learn how valid designs can still produce invalid systems using a real Employee Management System example."
keywords:
  - abstract factory pattern problem
  - when factory method is not enough
  - strategy vs abstract factory
  - low level design thinking
  - design patterns real example
weight: 9
date: 2025-12-26
layout: "topic-content"
---

---

## 1. Why This Topic Exists

---

By now, in the Employee Management System (EMS), we have already used:

- **Strategy** → to vary behavior safely
- **Factory Method** → to decide which implementation to create
- **Builder** → to construct complex objects
- **SOLID principles** → to avoid god classes and tight coupling

So a fair question is:

> **If Strategy and Factory are ‘correct’, why does the system still fail?**

The answer is subtle:

> **Sometimes designs that are correct in isolation still produce incorrect systems.**

This article focuses on that gap.

Not the solution yet —  
but the **problem you must feel first**.

---

## 2. New Requirement: Multi-Format Employee Report Export

---

The Reporting team introduces a new requirement:

> HR wants to export employee reports in different formats.

### Functional requirements

- Export employee report in:
  - PDF
  - CSV
  - HTML
- Deliver the report via:
  - Email
  - Download
- Optionally notify the user via:
  - Email
  - SMS
  - Push notification

At first glance, this looks like a **classic Strategy problem**.

And that instinct is not wrong.

---

## 3. First Design Decision: Breaking the God Service

---

Earlier, `EmployeeService` was handling everything:

- HR logic
- Payroll logic
- IT admin logic
- Reporting logic

This violates **Single Responsibility Principle**.

So we refactor.

### New service split

- `HROperationsService`
- `ITAdminOperationsService`
- `PayrollOperationsService`
- `ReportingOperationsService`

This is a **good design move**.

No patterns yet — just responsibility clarity.

---

## 4. Decomposing the Export Workflow

---

Before touching patterns, we decompose the problem:

```text
Generate Report → Export → Deliver → Notify
```

Each step varies independently.

This naturally leads to **Strategy + Factory**.

---

## 5. Strategy Axis 1: Report Export (Format-Specific)

---

### Domain models

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/client/model">See Code in Git Repo</a>
</div>

```java
public enum ExportFormat { PDF, CSV, HTML }
```

```java
public final class ExportedReport {
    private final byte[] payload;
    private final String fileName;
    private final String contentType;
    // constructor + getters
}
```

### Strategy

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/export">See Code in Git Repo</a>
</div>

Implementations:

- PdfReportExportStrategy
- CsvReportExportStrategy
- HtmlReportExportStrategy

```java
public interface ReportExportStrategy {
    ExportedReport export(EmployeeReport report);
}
```

```java
public class PdfReportExportStrategy implements ReportExportStrategy {
    @Override
    public ExportedReport export(EmployeeReport report) {
        String fileName = report.getName() + "-report.pdf";
        byte[] payload = ("PDF_REPORT_FOR_" + report.getName()).getBytes();
        return new ExportedReport(payload, fileName, "application/pdf");
    }
}
```

```java
public class CsvReportExportStrategy implements ReportExportStrategy{
    @Override
    public ExportedReport export(EmployeeReport report) {
        String fileName = report.getName() + "-report.csv";
        byte[] payload = ("CSV_REPORT_FOR_" + report.getName()).getBytes();
        return new ExportedReport(payload, fileName, "application/csv");
    }
}
```

```java
public class HtmlReportExportStrategy implements ReportExportStrategy{
    @Override
    public ExportedReport export(EmployeeReport report) {
        String fileName = report.getName() + "-report.html";
        byte[] payload = ("HTML_REPORT_FOR_" + report.getName()).getBytes();
        return new ExportedReport(payload, fileName, "application/html");
    }
}
```

### Factory

```java
public class ReportExportStrategyFactory {
    public static ReportExportStrategy getStrategy(ExportFormat format) {
        switch (format) {
            case PDF: return new PdfReportExportStrategy();
            case CSV: return new CsvReportExportStrategy();
            case HTML: return new HtmlReportExportStrategy();
            default: throw new IllegalArgumentException("Unknown format: " + format);
        }
    }
}
```

✅ Clean
✅ Open for extension
✅ Closed for modification

So far, so good.

---

## 6. Strategy Axis 2: Delivery Channel

---

### Domain

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/client/model">See Code in Git Repo</a>
</div>

```java
public enum DeliveryChannel { EMAIL, DOWNLOAD }
```

```java
public final class DeliveryResult {
    private final DeliveryChannel channel;
    private final String reference; // e.g. email id, download path, etc.

    public DeliveryResult(DeliveryChannel channel, String reference) {
        this.channel = channel;
        this.reference = reference;
    }

    public DeliveryChannel getChannel() { return channel; }
    public String getReference() { return reference; }
}

```

### Strategy

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/delivery">See Code in Git Repo</a>
</div>

```java
public interface DeliveryStrategy {
    DeliveryResult deliver(ExportedReport report, String destination);
}

```

#### Implementations:

- EmailDeliveryStrategy
- DownloadDeliveryStrategy

```java
public class EmailDeliveryStrategy implements DeliveryStrategy{
    @Override
    public DeliveryResult deliver(ExportedReport report, String destination) {
        // tutorial stub: “pretend sent”
        String reference = "email-to=" + destination + ", file=" + report.getFileName();
        return new DeliveryResult(DeliveryChannel.EMAIL, reference);
    }
}
```

```java
public class DownloadDeliveryStrategy implements DeliveryStrategy{
    @Override
    public DeliveryResult deliver(ExportedReport report, String destination) {
        // tutorial stub: “pretend saved”
        String reference = "download-path=" + destination + report.getFileName();
        return new DeliveryResult(DeliveryChannel.DOWNLOAD, reference);
    }
}

```

### Factory

```java
public class DeliverStrategyFactory {
    public static DeliveryStrategy getStrategy(DeliveryChannel deliveryChannel){
        switch (deliveryChannel) {
            case EMAIL: return new EmailDeliveryStrategy();
            case DOWNLOAD: return new DownloadDeliveryStrategy();
            default: throw new IllegalArgumentException("Unknown delivery channel: " + deliveryChannel);
        }
    }
}
```

Again:

✅ Reasonable
✅ Extensible
✅ Familiar pattern usage

---

## 7. Strategy Axis 3: Notification (Optional)

---

### Domain

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/client/model">See Code in Git Repo</a>
</div>

```java
public enum NotificationType { EMAIL, SMS, PUSH }
```

### Strategy

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/notification">See Code in Git Repo</a>
</div>

```java
public interface NotificationStrategy {
    public void notifyUser(DeliveryResult result, String target);
}
```

Implementations:

- EmailNotificationStrategy
- SmsNotificationStrategy
- PushNotificationStrategy

```java
public class EmailNotificationStrategy implements NotificationStrategy{
    @Override
    public void notifyUser(DeliveryResult result, String target) {
        // tutorial stub
        System.out.println("EMAIL notification to " + target
                + " for " + result.getReference());
    }
}
```

```java
public class PushNotificationStrategy implements NotificationStrategy{
    @Override
    public void notifyUser(DeliveryResult result, String target) {
        // tutorial stub
        System.out.println("PUSH notification to " + target
                + " for " + result.getReference());
    }
}
```

```java
public class SmsNotificationStrategy implements NotificationStrategy{
    @Override
    public void notifyUser(DeliveryResult result, String target) {
        // tutorial stub
        System.out.println("SMS notification to " + target
                + " for " + result.getReference());
    }
}
```

### Factory

```java
public class NotificationStrategyFactory {
    public static NotificationStrategy getStrategy(NotificationType type){
        switch (type) {
            case EMAIL: return new EmailNotificationStrategy();
            case SMS: return new SmsNotificationStrategy();
            case PUSH: return new PushNotificationStrategy();
            default: throw new IllegalArgumentException("Unknown notification type: " + type);
        }
    }
}
```

---

## 8. Wiring Everything Together

---

Inside `ReportingOperationsService`:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/blob/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/naive/service/ReportingOperationsService.java">See Code in Git Repo</a>
</div>

```java
public void exportReport(Employee employee, ExportReportRequest request) {
    // 1) Generate Report (Domain)
    EmployeeReport report = generateReport(employee);

    // 2 + 3) Layout/Template + Export (format-specific)
    ReportExportStrategy exportStrategy =
        ReportExportStrategyFactory.getStrategy(request.getFormat());
    ExportedReport exportedReport = exportStrategy.export(report);

    // 4) Delivery Channel-Specific Logic
    DeliveryStrategy deliveryStrategy =
        DeliveryStrategyFactory.getStrategy(request.getDeliveryChannel());
    DeliveryResult deliveryResult =
        deliveryStrategy.deliver(exportedReport, request.getDeliveryAddress());

    // 5) Notification Logic (Optional)
    if (request.getNotificationType() != null) {
        NotificationStrategy notificationStrategy =
            NotificationStrategyFactory.getStrategy(request.getNotificationType());
        notificationStrategy.notifyUser(
            deliveryResult,
            request.getNotificationTarget()
        );
    }
}

```

Pause here.  
Everything compiles, all tests pass, and every class follows SOLID — yet something still feels off.

This code is:

- readable
- modular
- testable
- extensible
- pattern-compliant

**And still dangerous**.

---

## 9. The Hidden Risk: Valid Parts, Invalid System ❌

---

Nothing in this design prevents the following combination:

```text
ExportFormat      = PDF
DeliveryChannel   = DOWNLOAD
NotificationType  = SMS
```

On paper, each choice is valid.

But when combined, the system may behave like this:

> The user downloads a PDF report,  
> and then receives an SMS saying **“Your download is ready.”**

Now stop and think.

- Ready **where?**
- Ready **how?**
- Ready **for whom?**

There is no download link in the SMS.  
There is no user intent to receive SMS notifications.  
And there is no rule saying SMS is even allowed for downloads.

Yet the system happily proceeds.

### Why This Happens

Each part of the system makes a **locally correct decision**:

- Export factory correctly creates a PDF exporter
- Delivery factory correctly handles a download
- Notification factory correctly sends an SMS

But no component asks the more important question:

> **Do these choices make sense together?**

### The Core Problem

This design allows:

> **Independent selection of components that must not vary independently.**

In other words:

- The strategies are correct
- The factories are correct
- The interactions between them are **not protected**

There is **no single place** that understands the full export workflow and its constraints.

So correctness becomes:

- implicit
- undocumented
- enforced only by developer discipline

That’s not a runtime bug.
That’s a **design-level failure.**

### Why This Is Dangerous

This kind of issue:

- passes code review
- passes unit tests
- appears only in production
- grows silently as new formats and channels are added

Every new option increases the number of **invalid combinations** the system can produce.

---

## Pause Here (Important)

---

> ⚠️ **Design Smell Alert**  
> **If multiple factories must coordinate implicitly to produce a valid outcome,**  
> **the design is missing a higher-level abstraction.**

We stop deliberately before solving the problem.

Because once you _feel_ this gap, the next pattern becomes obvious.

👉 **[Abstract Factory – Enforcing Compatible Object Families (Part 2) →](/learning/advanced-skills/low-level-design/3_design-patterns/3_10_abstract-factory-pattern-part2)**

---

> 📝 **Takeaway**
>
> - Strategy + Factory can still produce invalid systems
> - Local correctness does not guarantee global correctness
> - Some variations must change together
> - We need a pattern that creates ecosystems, not instances
