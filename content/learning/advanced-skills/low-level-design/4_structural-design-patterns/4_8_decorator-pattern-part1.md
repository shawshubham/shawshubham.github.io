---
title: Decorator Pattern – Adding Behavior Without Modifying Code (Part 1)
description: Learn the Decorator Pattern by evolving the EMS reporting pipeline. Add encryption, compression, watermarking, and audit logging dynamically—without inheritance explosion or flag-based logic.
keywords:
  - decorator pattern java
  - decorator design pattern real world
  - composition over inheritance
  - extend behavior without modification
  - low level design interview
weight: 8
date: 2026-02-26
layout: "topic-content"
---

## 1. Why Decorator Pattern Exists (The Real Problem)

---

Decorator exists to solve a very specific—and very common—problem:

> **We want to add behavior to an operation dynamically, in different combinations, without modifying existing code.**

Not _sometimes_.  
Not _once_.  
But **repeatedly**, as requirements evolve.

If this sounds abstract, don’t worry.  
EMS will make it concrete.

---

## 2. The New Design Pressure in EMS

---

So far, EMS reporting works like this:

- Generate employee report
- Export it (PDF / HTML / CSV)
- Deliver it (email / download / link)

Now the business adds a new requirement:

> **Enterprise customers require optional post-processing on exported reports.**

Specifically:

- Some reports must be **encrypted**
- Some must be **compressed**
- Some must be **watermarked**
- Some must be **digitally signed**
- Some require **audit logging**

Important constraint (this is the pressure):

> These options can be **combined arbitrarily**, and **will grow over time**.

Examples:

- Encrypt + Compress
- Compress + Encrypt + Audit
- Watermark + Sign
- Audit + Encrypt + Compress + Watermark

No fixed combinations.
No single “best” variant.

---

## 3. Where This Pressure Hits First: Report Exporting

---

Let’s isolate the core operation:

```java
public interface ReportExportStrategy {
    ExportedReport export(EmployeeReport report);
}
```

Concrete exporters already exist:

```java
PdfReportExportStrategy
HtmlReportExportStrategy
CsvReportExportStrategy
```

Now the question is:

> **How do we add encryption, compression, logging, etc. without breaking this design?**

---

## 4. The First Wrong Solution: Inheritance Explosion

---

A very common first attempt is creating combinatory subclasses:

```mermaid
classDiagram
direction TB

class ReportExportStrategy {
  &lt;&lt;interface&gt;&gt;
  +export(EmployeeReport) ExportedReport
}

class PdfReportExportStrategy
class EncryptedPdfReportExportStrategy
class CompressedPdfReportExportStrategy

class MoreVariants {
  ...
}

class EncryptedCompressedSignedPdfReportExportStrategy

ReportExportStrategy <|.. PdfReportExportStrategy
ReportExportStrategy <|.. EncryptedPdfReportExportStrategy
ReportExportStrategy <|.. CompressedPdfReportExportStrategy
ReportExportStrategy <|.. EncryptedCompressedSignedPdfReportExportStrategy
ReportExportStrategy <|.. MoreVariants

note "Every new feature multiplies combinations.<br/> N features → up to 2^N variants per format."
```

> Each additional **cross-cutting feature** (encryption, compression, signing, auditing) multiplies the number of required subclasses — leading to combinatorial explosion.

### Why this fails

- Combinatorial class explosion
- Impossible to reason about
- New feature = N new classes
- Violates Open/Closed Principle
- Maintenance nightmare

Inheritance encodes **combinations**, not **capabilities**.

---

## 5. The Second Wrong Solution: Flag-Based Logic

---

Next attempt:

```java
export(
  format = PDF,
  encrypt = true,
  compress = true,
  watermark = false,
  sign = true,
  audit = true
)
```

Inside:

```java
if (encrypt) encrypt(...)
if (compress) compress(...)
if (watermark) watermark(...)
if (sign) sign(...)
if (audit) audit(...)
```

### Why this also fails

- One method knows too much
- Every new feature modifies existing code
- Ordering becomes implicit and fragile
- Hard to test individual behaviors
- Violates OCP and SRP

This is **procedural thinking inside an OO system**.

---

## 6. The Missing Insight: Features Are Behaviors, Not Types

---

Let’s pause and reframe the problem.

Encryption is not a _type_ of exporter.  
Compression is not a _type_ of exporter.  
Audit logging is not a _type_ of exporter.

They are **behaviors applied to exporting**.

And crucially:

> Each behavior:
>
> - does **one thing**
> - can wrap another exporter
> - does not care what comes before or after

This is the mental shift that leads to **Decorator**.

---

## 7. Decorator Pattern: The Core Idea

---

> **Decorator allows you to wrap an object to add behavior, without changing the object itself.**

Instead of inheritance:

```text
ExporterWithEverything
```

We use composition:

```mermaid
flowchart TB

subgraph Audited["AuditedReportExportDecorator (outermost)"]
    subgraph Compressed["CompressedReportExportDecorator"]
        subgraph Encrypted["EncryptedReportExportDecorator"]
            Base["PdfReportExportStrategy (core)"]
        end
    end
end
```

Each decorator:

- implements the same interface
- delegates to the wrapped object
- adds exactly one responsibility

---

## 8. The Decorator Structure (Conceptual)

---

### 8.1 Type structure: Strategy + Decorator

```mermaid
classDiagram
direction LR

class ReportExportStrategy {
  &lt;&lt;interface&gt;&gt;
  +export(EmployeeReport) ExportedReport
}

class PdfReportExportStrategy {
  +export(EmployeeReport) ExportedReport
}
class HtmlReportExportStrategy {
  +export(EmployeeReport) ExportedReport
}
class CsvReportExportStrategy {
  +export(EmployeeReport) ExportedReport
}

ReportExportStrategy <|.. PdfReportExportStrategy
ReportExportStrategy <|.. HtmlReportExportStrategy
ReportExportStrategy <|.. CsvReportExportStrategy

class ReportExportStrategyDecorator {
  &lt;&lt;abstract&gt;&gt;
  -delegate: ReportExportStrategy
  +export(EmployeeReport) ExportedReport
}

ReportExportStrategy <|.. ReportExportStrategyDecorator
ReportExportStrategyDecorator o--> ReportExportStrategy : delegates to

class EncryptedReportExportDecorator {
  +export(EmployeeReport) ExportedReport
}
class CompressedReportExportDecorator {
  +export(EmployeeReport) ExportedReport
}
class AuditedReportExportDecorator {
  +export(EmployeeReport) ExportedReport
}

ReportExportStrategyDecorator <|-- EncryptedReportExportDecorator
ReportExportStrategyDecorator <|-- CompressedReportExportDecorator
ReportExportStrategyDecorator <|-- AuditedReportExportDecorator
```

### 8.2 Runtime structure: decoration pipeline

```mermaid
sequenceDiagram
    participant Caller
    participant Audit
    participant Compress
    participant Encrypt
    participant PDF

    Caller->>Audit: export()
    Audit->>Compress: delegates export()
    Compress->>Encrypt: delegates export()
    Encrypt->>PDF: delegates export()
    PDF-->>Encrypt: result
    Encrypt-->>Compress: result
    Compress-->>Audit: result
    Audit-->>Caller: result
```

> “**Call order is outside-in**: the outermost decorator runs first, then delegates inward.”

### Key observation:

> Every decorator **is-a** ReportExportStrategy (polymorphism)  
> and **has-a** ReportExportStrategy (delegation).

That duality is the pattern.

---

## 9. Implementing Decorator in EMS

---

### 9.1 Base Decorator

```java
public abstract class ReportExportStrategyDecorator implements ReportExportStrategy {

    protected final ReportExportStrategy delegate;

    protected ReportExportStrategyDecorator(ReportExportStrategy delegate) {
        this.delegate = delegate;
    }
}
```

---

### 9.2 Encryption Decorator

```java
public class EncryptedReportExportDecorator
        extends ReportExportStrategyDecorator {

    public EncryptedReportExportDecorator(ReportExportStrategy delegate) {
        super(delegate);
    }

    @Override
    public ExportedReport export(EmployeeReport report) {
        ExportedReport exported = delegate.export(report);
        return encrypt(exported);
    }
}
```

---

### 9.3 Compression Decorator

```java
public class CompressedReportExportDecorator
        extends ReportExportStrategyDecorator {

    public CompressedReportExportDecorator(ReportExportStrategy delegate) {
        super(delegate);
    }

    @Override
    public ExportedReport export(EmployeeReport report) {
        ExportedReport exported = delegate.export(report);
        return compress(exported);
    }
}
```

---

### 9.4 Audit Logging Decorator

```java
public class AuditedReportExportDecorator
        extends ReportExportStrategyDecorator {

    public AuditedReportExportDecorator(ReportExportStrategy delegate) {
        super(delegate);
    }

    @Override
    public ExportedReport export(EmployeeReport report) {
        ExportedReport exported = delegate.export(report);
        logAudit(exported);
        return exported;
    }
}
```

Each decorator:

- adds **one behavior**
- does not know about others
- does not modify existing exporters

---

## 10. Assembling the Pipeline (Dynamic Composition)

---

Now the real power:

```java
ReportExportStrategy exporter =
    new AuditedReportExportDecorator(
        new CompressedReportExportDecorator(
            new EncryptedReportExportDecorator(
                new PdfReportExportStrategy()
            )
        )
    );
```

No new classes.  
No flags.  
No modification to existing code.

Just **composition**.

---

## 11. Why This Is a Structural Pattern

---

Decorator does not create objects (creational).  
Decorator does not control algorithms (behavioral).

Decorator **structures objects** so behavior can grow safely.

It is the textbook definition of:

> **Composition over inheritance**

---

## 12. Interview-Grade Explanation

---

### When should you use Decorator?

> When you need to add responsibilities to objects dynamically,  
> and inheritance or conditional logic leads to explosion or rigidity.

### Key line to remember:

> **Decorator adds behavior without changing the original class.**

---

## Conclusion

---

Decorator exists because **behavior grows faster than types**.

In EMS, report exporting was simple—until it wasn’t.

Encryption, compression, auditing, watermarking:

- are optional
- are combinable
- evolve independently

Decorator lets us:

- keep exporters simple
- add features safely
- avoid inheritance and flag-based designs
- respect Open/Closed Principle

---

### 🔗 What’s Next?

---

So far, we’ve learned **how to add behavior dynamically**.

But two important questions remain:

1. Who decides **which decorators to apply**?
2. How do we manage **ordering and configuration** cleanly?

In **Part 2**, we’ll:

- introduce a clean assembly mechanism
- discuss ordering constraints (encrypt vs compress)
- integrate Decorator with Abstract Factory bundles

👉 **Up Next →**  
**[Decorator Pattern – Building Configurable Processing Pipelines (Part 2) →](/learning/advanced-skills/low-level-design/4_structural-design-patterns/4_9_decorator-pattern-part2)**

---

> 📝 **Final Takeaway**
>
> - Decorator solves combinatorial behavior growth
> - It replaces inheritance with composition
> - Each decorator does one thing well
> - When behavior explodes, Decorator is your friend
