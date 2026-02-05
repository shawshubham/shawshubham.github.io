---
title: Abstract Factory Pattern – Making Invalid Requests Unrepresentable (Part 3)
description: Fix the final design smell by replacing generic requests with sealed, bundle-specific request types. Eliminate invalid inputs before the factory is even involved.
keywords:
  - abstract factory pattern java
  - sealed interface java design
  - invalid states unrepresentable
  - type driven design java
  - low level design interview
weight: 11
date: 2025-12-27
layout: "topic-content"
---

---

## 1. Why This Part Exists

---

By the end of **Part 2**, we achieved something important:

- ✅ The **system was globally correct**
- ✅ Invalid combinations were impossible
- ✅ Business intent was explicit

But one design smell remained.

> The system was correct —  
> but the **API still allowed invalid input**.

This part fixes that.

---

## 2. The Remaining Smell: “Valid System, Weak Input Model”

---

Recall the request model from Part 2:

```java
public class ExportReportRequest {
    private final ReportBundleType bundleType;
    private final String deliveryAddress;
    private final String notificationTarget;
    private final ExportFormat format;
}
```

### What’s wrong here?

- Some fields are **irrelevant** for certain bundles
- Nothing prevents passing:
  - a phone for EMAIL_ATTACHMENT
  - a downloadPath for EMAIL_LINK
- The compiler cannot help us

The system is correct **after** the request is processed —  
but the request itself can still be nonsensical.

This violates a powerful design rule:

> **If something is invalid, it should be unrepresentable.**

---

## 3. This Is NOT an Abstract Factory Problem

---

Important clarification:

This is **not** a failure of Abstract Factory.

Abstract Factory already guarantees:

- compatible object families
- correct construction
- correct execution

The problem now is **type modeling**.

So we fix it using **types**, not patterns.

---

## 4. The Core Idea: One Request Type per Bundle

---

Instead of:

> “One request + a bundle type enum”

We move to:

> **One request type per workflow**

Each request:

- represents exactly one business intent
- contains only the fields that make sense
- cannot be misused accidentally

---

## 5. Sealed Interface: The Right Tool for the Job

---

Java gives us exactly what we need:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Low-Level-Design/tree/master/src/main/java/com/theshubhamco/designpattern/creational/abstractfactory/finalversion/ems">See Code in Git Repo</a>
</div>

```java
public sealed interface ExportReportRequest
        permits PortalDownloadRequest,
                EmailAttachmentRequest,
                EmailLinkRequest {
}
```

### Why sealed?

- The set of workflows is **closed**
- The compiler knows **all possible request types**
- switch becomes **exhaustive and safe**

This models the business **as it actually exists**.

---

## 6. Bundle-Specific Request Types (Records)

---

### 6.1 Portal Download Request

```java
public record PortalDownloadRequest(
        ExportFormat format,
        String downloadPath,
        String pushToken
) implements ExportReportRequest { }
```

- ✔ Can download
- ✔ Can push notify
- ❌ Cannot email
- ❌ Cannot SMS

### 6.2 Email Attachment Request

```java
public record EmailAttachmentRequest( String email ) implements ExportReportRequest { }
```

- ✔ Can email
- ❌ Cannot push
- ❌ Cannot SMS
- ❌ Cannot download

### 6.3 Email Link Request

```java
public record EmailLinkRequest(
        String email,
        String phone
) implements ExportReportRequest { }
```

- ✔ Can email
- ✔ Can SMS
- ❌ Cannot download

---

## 7. Updating the Bundle Factory Provider

---

Now the provider becomes **type-driven**, not enum-driven:

```java
public class ReportBundleFactoryProvider {

    public static ReportBundleFactory getBundleFactory(ExportReportRequest request) {
        return switch (request) {
            case PortalDownloadRequest r -> new PortalDownloadBundleFactory(r.format());
            case EmailAttachmentRequest r -> new EmailAttachmentBundleFactory();
            case EmailLinkRequest r -> new EmailLinkBundleFactory();
        };
    }
}

```

### Why this is clean

- No default case
- Compiler enforces completeness
- Adding a new bundle forces updates in one place

This is **controlled evolution**, not accidental complexity.

---

## 8. Updating the Service Logic (Safely)

---

The service now extracts only what each request actually supports:

```java
public void exportReport(Employee employeeData, ExportReportRequest request) {

        logger.info("Exporting report for " + employeeData.getName());
        ReportBundleFactory bundle = ReportBundleFactoryProvider.getBundleFactory(request);

        // 1) Generate Report (Domain)
        EmployeeReport report = generateReport(employeeData);

        // 2 + 3) Layout/Template + Export (format-specific)
        ExportedReport exportedReport =  bundle.createExportStrategy().export(report);

        // 4) Delivery Channel-Specific Logic
        DeliveryResult deliveryResult = switch (request) {
            case PortalDownloadRequest r ->
                bundle.createDeliveryStrategy().deliver(exportedReport, r.downloadPath());
            case EmailAttachmentRequest r ->
                bundle.createDeliveryStrategy().deliver(exportedReport, r.email());
            case EmailLinkRequest r ->
                bundle.createDeliveryStrategy().deliver(exportedReport, r.email());
        };

        // 5) Notification Logic (Optional)
        switch (request) {
            case EmailLinkRequest r ->
                    bundle.createNotificationStrategy()
                            .ifPresent(strategy -> strategy.notifyUser(deliveryResult, r.phone()));
            default ->
                bundle.createNotificationStrategy()
                        .ifPresent(strategy -> strategy.notifyUser(deliveryResult, null));
        }

        logger.info("Report exported successfully");
    }
```

### What changed?

- No null checks
- No “maybe-used” fields
- No accidental misuse

The compiler now **guards correctness**.

---

## 9. Client Code Becomes Self-Documenting

---

```java
reportingClient.exportReport(fullTimeEmployee,
        new EmailAttachmentRequest("receiver@gmail.com"));

reportingClient.exportReport(fullTimeEmployee,
        new PortalDownloadRequest(ExportFormat.PDF,
                "/path/to/downloads/",
                "pushtoken"));

reportingClient.exportReport(fullTimeEmployee,
        new EmailLinkRequest("receiver@email.com", "+44 1234567890"));
```

This client request alone tells you:

- delivery method
- notification behavior
- allowed configuration

No enums.  
No guessing.  
No misuse.

---

## 10. What We Achieved Across Parts 1–3

---

| Layer          | Before   | After               |
| -------------- | -------- | ------------------- |
| Behavior       | Correct  | Correct             |
| Construction   | Correct  | Correct             |
| Input Modeling | Weak     | **Strong**          |
| Invalid States | Possible | **Unrepresentable** |
| Compiler Help  | Minimal  | **High**            |

This is **design maturity**.

---

## Conclusion

---

Abstract Factory solved **system correctness**.

Sealed request types solved **input correctness**.

Together, they demonstrate a powerful idea:

> **Design is not about patterns.**  
> **It’s about choosing where correctness lives.**

In this system, correctness lives:

- in types
- in construction
- before runtime

That’s professional-grade design.

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
> - Abstract Factory enforces compatible families
> - Sealed types enforce valid intent
> - The best designs make wrong code impossible
