---
title: "Minor GC vs Major GC"
layout: "interview-prep-topic-content"
interview:
  id: "java-jvm-002"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Garbage Collection"
  round: "Technical"
  company: "" # optional
  tags:
    [
      "minor-gc",
      "major-gc",
      "gc",
      "jvm",
      "heap",
      "young-generation",
      "old-generation",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Minor GC cleans the Young Generation, where newly created objects usually start their life. Major GC cleans the Old Generation, where longer-lived objects are stored. Minor GC is usually more frequent and faster, while Major GC is usually less frequent and more expensive.**

---

## 2. Why This Question Matters

---

This is one of the most common JVM and production-support questions because it checks whether you understand:

- how heap memory is divided
- where new objects are allocated
- why some GC events are frequent and cheap
- why others are heavier and more disruptive
- how memory pressure affects application performance

Interviewers often ask this before moving to:

- Young Generation vs Old Generation
- Full GC
- stop-the-world pauses
- GC tuning
- memory leak analysis

---

## 3. Quick Heap Refresher

---

The JVM heap is commonly divided into generations.

A simplified view is:

```text
Heap
├── Young Generation
│   ├── Eden
│   └── Survivor spaces
└── Old Generation
```

### Young Generation

This is where most newly created objects start.

### Old Generation

This is where objects that survive for longer are moved.

This division exists because most objects in Java die young, so the JVM can optimize garbage collection around that behavior.

---

## 4. What is Minor GC?

---

A **Minor GC** happens when the JVM collects garbage from the **Young Generation**.

This usually happens when the Eden space becomes full.

### What typically happens?

- new objects are created in Eden
- when Eden fills up, Minor GC runs
- objects that are no longer reachable are removed
- objects that survive may be moved to Survivor spaces
- objects that survive multiple collection cycles may eventually be promoted to the Old Generation

### Important characteristics

- usually frequent
- usually faster than Major GC
- focuses on short-lived objects

---

## 5. What is Major GC?

---

A **Major GC** happens when the JVM collects garbage from the **Old Generation**.

This is more expensive because Old Generation usually contains:

- more objects
- larger objects
- longer-lived objects

### Important characteristics

- usually less frequent than Minor GC
- usually more expensive
- often causes longer pauses than Minor GC
- often indicates more serious memory pressure

---

## 6. Minor GC vs Major GC — Core Difference

---

| Feature            | Minor GC            | Major GC           |
| ------------------ | ------------------- | ------------------ |
| Cleans             | Young Generation    | Old Generation     |
| Typical frequency  | More frequent       | Less frequent      |
| Typical cost       | Lower               | Higher             |
| Object type focus  | Short-lived objects | Long-lived objects |
| Performance impact | Usually smaller     | Usually larger     |

---

## 7. How Objects Move Across Generations

---

A common lifecycle is:

1. object is created in Eden
2. Minor GC runs
3. if object is still reachable, it survives
4. after surviving enough cycles, it may be promoted to Old Generation
5. later, if it becomes unreachable in Old Generation, it can be collected during Major GC

So the important idea is:

> Minor GC mostly deals with young, newly created objects. Major GC deals with older, longer-lived objects.

---

## 8. Why Minor GC Is Usually Faster

---

Minor GC is usually faster because:

- Young Generation is smaller than Old Generation
- most objects there are already dead
- the JVM is optimized for short-lived object cleanup

This makes Minor GC a normal and expected part of application execution.

A few Minor GCs by themselves are not automatically a problem.

---

## 9. Why Major GC Is Usually More Expensive

---

Major GC is usually heavier because:

- Old Generation is larger
- objects there are more likely to still be alive
- collection work is more expensive
- pauses may be more noticeable

If Major GC runs too often, it can be a warning sign of:

- insufficient heap sizing
- too many long-lived objects
- poor object lifecycle management
- memory leak behavior

---

## 10. Where Does Full GC Fit In?

---

This is a very common follow-up question.

A **Full GC** usually means a broader garbage collection cycle involving more than just one region, often including:

- Young Generation
- Old Generation
- sometimes more JVM-managed memory areas depending on collector behavior

In interviews, a safe distinction is:

- **Minor GC** → Young Generation
- **Major GC** → Old Generation
- **Full GC** → broader and usually heavier cleanup cycle

Do not assume every collector behaves in exactly the same way internally, but this distinction is good for interview explanation.

---

## 11. Example Timeline

---

Imagine this flow:

- application creates many short-lived request objects
- Eden fills up
- Minor GC runs and removes most dead objects
- some surviving objects move forward
- over time, long-lived objects accumulate in Old Generation
- later, Old Generation becomes pressured
- Major GC runs

This is why request-heavy systems often see many Minor GCs, but frequent Major GCs are more concerning.

---

## 12. What Is a Bad Sign in Production?

---

A few important production signals are:

### Frequent Minor GC

May be okay if:

- pauses are short
- application throughput is fine

But it may also indicate heavy object churn.

### Frequent Major GC

Usually more concerning because it may indicate:

- Old Generation pressure
- long-lived object retention
- memory leak
- poor heap tuning

### Full GC happening repeatedly

Often treated as a serious signal and usually deserves investigation.

---

## 13. Important Interview Points

---

Strong points to mention in interviews:

- Minor GC cleans Young Generation
- Major GC cleans Old Generation
- objects usually start in Eden
- long-lived objects may be promoted to Old Generation
- Minor GC is usually more frequent and cheaper
- Major GC is usually less frequent and more expensive
- frequent Major GC often deserves investigation

---

## 14. Interview Follow-up Questions

---

After asking **"Minor GC vs Major GC"**, interviewers often ask related follow-ups.

### Common Follow-up Questions

| Follow-up Question                    | What Interviewer Is Testing    |
| ------------------------------------- | ------------------------------ |
| What is Young Generation?             | Heap structure                 |
| What is Old Generation?               | Object lifecycle understanding |
| What is Eden space?                   | GC basics                      |
| What are Survivor spaces?             | Promotion flow                 |
| What is Full GC?                      | Broader GC understanding       |
| Why is Major GC more expensive?       | Runtime cost reasoning         |
| What does frequent Major GC indicate? | Production diagnostics         |

---

## 15. Common Mistakes

---

Common mistakes developers make:

- thinking Minor GC means “small issue” and Major GC means “big issue” in a simplistic way
- assuming every GC log uses identical terminology across all collectors
- confusing Major GC with Full GC as if they are always exactly the same
- not knowing that most objects die young
- assuming any Minor GC is automatically bad

---

## 16. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between Minor GC and Major GC?

Answer like this:

> Minor GC cleans the Young Generation, where newly created objects usually begin their life, so it is typically more frequent and faster. Major GC cleans the Old Generation, where longer-lived objects are stored, so it is usually less frequent but more expensive. Frequent Major GC is often more concerning in production because it can indicate memory pressure or long-lived object retention.

This is a **strong interview answer**.
