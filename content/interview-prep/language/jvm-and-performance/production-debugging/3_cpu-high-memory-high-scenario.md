---
title: "CPU High / Memory High Scenario"
layout: "interview-prep-topic-content"
interview:
  id: "java-jvm-005"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Production Debugging"
  round: "Technical"
  company: "" # optional
  tags:
    [
      "cpu-high",
      "memory-high",
      "production-debugging",
      "jvm",
      "thread-dump",
      "heap",
      "gc",
      "performance",
    ]
---

## 1. Short Answer (Interview Style)

---

> **When CPU is high, I investigate which threads or code paths are actively consuming compute time. When memory is high, I investigate heap growth, garbage collection behavior, and object retention. CPU issues are usually execution-path problems, while memory issues are usually allocation, retention, or garbage-collection problems. In production, I first confirm the symptom with metrics, then collect the right evidence such as thread dumps, GC logs, heap dumps, and application telemetry.**

---

## 2. Why This Question Matters

---

This is one of the most common production-support interview scenarios because it checks whether you can:

- distinguish CPU problems from memory problems
- choose the right diagnostic artifact
- avoid random guessing during incidents
- reason from symptoms to likely causes
- explain a structured production-debugging approach

Interviewers usually do not want a perfect tool command first.

They want to see whether you can think in a clean sequence:

1. confirm the symptom
2. classify the problem
3. collect evidence
4. narrow the cause
5. explain next actions

---

## 3. CPU High vs Memory High — Core Difference

---

A simple way to frame it is:

- **CPU high** → the system is spending too much time executing work
- **Memory high** → the system is retaining too much data or struggling to reclaim memory

### CPU high usually points to:

- hot code path
- busy loops
- excessive retries
- lock contention side effects
- too many active threads
- expensive computations
- serialization / deserialization overhead
- high request volume

### Memory high usually points to:

- high allocation rate
- large object retention
- memory leak
- cache growth
- insufficient heap size
- frequent GC pressure
- too many long-lived objects

So although both can slow the application, the debugging path is different.

---

## 4. First Step — Confirm the Symptom Properly

---

Before assuming root cause, first confirm what is actually high.

Useful signals include:

- process CPU usage
- pod/container CPU usage
- JVM heap used
- heap after GC
- GC count and pause time
- request latency
- thread count
- connection pool behavior
- queue depth

A production-safe approach starts with:

> Is the problem really CPU, really memory, or both?

Because sometimes people say “application is slow,” but the actual cause may be:

- blocked threads
- external dependency slowness
- connection pool exhaustion
- GC pause pressure
- high load, not a leak

---

## 5. If CPU Is High — What Do I Check?

---

When CPU is high, I mainly want to find:

> which threads are consuming CPU, and what code are they executing?

### Key things to check

- thread dumps
- top CPU-consuming process / thread
- repeated hot stack traces
- request rate / traffic spike
- tight loops or retry storms
- lock contention symptoms
- excessive logging or serialization

### Practical reasoning

High CPU usually means the application is actively doing work.

So I want to identify:

- which thread
- which code path
- whether the work is expected or pathological

---

## 6. Thread Dumps for CPU High

---

Thread dumps are one of the most useful artifacts for CPU issues.

A good approach is:

1. identify that CPU is high
2. capture multiple thread dumps a few seconds apart
3. look for the same thread or same stack trace repeating
4. correlate that with the hot code path

### What am I looking for?

- same thread repeatedly active
- same business method appearing in many dumps
- retry loop
- infinite loop
- excessive parsing / transformation / computation
- contention pattern with many blocked threads and one hot owner thread

### Important note

`RUNNABLE` does not always mean “definitely burning CPU right now,” but repeated dumps plus CPU metrics help narrow active execution hotspots.

---

## 7. Common Causes of High CPU

---

Typical causes include:

- infinite loop or busy loop
- excessive retries without backoff
- bad query result processing in application code
- huge object serialization / JSON mapping
- regex or parsing hotspot
- too many concurrent requests
- lock contention leading to wasted scheduling and thread activity
- excessive thread creation
- CPU-heavy stream or collection processing

In an interview, it is good to say:

> High CPU is often not a JVM problem first. It is often an application behavior problem that the JVM is revealing.

---

## 8. If Memory Is High — What Do I Check?

---

When memory is high, I mainly want to find:

> is the application under normal memory load, under temporary allocation pressure, or leaking / retaining memory?

### Key things to check

- heap usage over time
- heap usage after GC
- GC frequency
- Major GC / Full GC trend
- old generation growth
- heap dump, if needed
- object retention patterns
- cache/session growth

### Practical reasoning

Memory high does not always mean memory leak.

It can also mean:

- traffic is high
- object churn is high
- heap is undersized
- cache is large by design

So the real question is:

> after GC, does memory return to a reasonable level, or does the post-GC baseline keep rising?

---

## 9. GC Behavior for Memory High

---

A healthy pattern often looks like this:

- heap usage rises
- GC runs
- heap usage drops
- system continues normally

A suspicious pattern looks like this:

- heap usage rises
- GC runs
- heap usage drops only a little
- next cycle starts from a higher baseline
- repeated cycles keep pushing memory upward

That kind of pattern may indicate:

- object retention
- leak behavior
- old generation pressure

This is why GC logs and heap-after-GC metrics are important.

---

## 10. Heap Dump for Memory High

---

If memory keeps rising and GC is not reclaiming enough, a heap dump becomes very useful.

A heap dump helps answer:

- which object types occupy the most memory?
- which objects are retaining others?
- why are these objects still reachable?

Typical things to look for:

- large collections
- growing maps or caches
- session objects
- retained request payloads
- listener leaks
- `ThreadLocal` retention
- singleton/global references holding unnecessary data

---

## 11. What If Both CPU and Memory Are High?

---

This is also common.

When both are high, a few combined patterns are possible:

### Pattern 1 — GC pressure

Memory is high, GC runs frequently, and CPU also rises because GC work is consuming CPU.

### Pattern 2 — allocation storm

Application creates too many temporary objects very quickly, causing both high CPU and heavy GC activity.

### Pattern 3 — leak with GC struggle

Heap keeps filling, GC works harder and more often, pauses increase, and CPU usage rises due to GC pressure.

### Pattern 4 — high traffic / overload

The service is genuinely processing too much work, causing both heavy allocation and high compute usage.

So when both are high, you must separate:

- application work
- GC work
- retained memory
- traffic/load effects

---

## 12. Example Incident Approach — CPU High

---

If an interviewer asks:

> CPU is high in production. What would you do?

A strong structured answer is:

1. confirm CPU spike from monitoring
2. check whether it is process-wide, container-wide, or JVM-specific
3. capture thread dumps
4. identify hot or repeating thread stacks
5. correlate with traffic, logs, recent deploys, retries, queue consumers, or batch activity
6. identify whether the CPU is due to business logic, excessive looping, lock contention, or GC
7. mitigate if needed, then fix root cause

---

## 13. Example Incident Approach — Memory High

---

If an interviewer asks:

> Memory is high in production. What would you do?

A strong structured answer is:

1. confirm heap growth trend from monitoring
2. check GC behavior and whether heap drops after GC
3. check whether old generation keeps growing
4. determine whether this looks like high load, object churn, or retention/leak
5. capture heap dump if needed
6. inspect retained objects and reference chains
7. identify the code path or data structure causing retention
8. fix the retention issue or adjust memory design/tuning as needed

---

## 14. CPU High vs Memory High — Which Artifact Helps Most?

---

| Scenario              | Most Useful Artifact                             |
| --------------------- | ------------------------------------------------ |
| High CPU              | thread dump, CPU metrics, profiler, request rate |
| High memory           | heap metrics, GC logs, heap dump                 |
| Suspected deadlock    | thread dump                                      |
| Suspected memory leak | heap dump + GC trend                             |
| Frequent GC pauses    | GC logs + heap metrics                           |

This table is useful because many candidates jump to heap dump for every problem, which is not correct.

---

## 15. Important Interview Points

---

Strong points to mention in interviews:

- high CPU and high memory are different diagnostic paths
- CPU issues are usually execution-path problems
- memory issues are usually allocation, retention, or GC problems
- confirm the symptom first instead of guessing
- thread dumps are stronger for execution issues
- heap dumps are stronger for retention issues
- GC behavior is the bridge between memory usage and runtime impact

---

## 16. Interview Follow-up Questions

---

After asking **"How would you debug CPU high or memory high in production?"**, interviewers often ask related follow-ups.

### Common Follow-up Questions

| Follow-up Question                                 | What Interviewer Is Testing |
| -------------------------------------------------- | --------------------------- |
| How do you know whether memory high is a leak?     | Investigation maturity      |
| Why check heap after GC?                           | GC reasoning                |
| Why capture multiple thread dumps for CPU high?    | Runtime debugging depth     |
| What if both CPU and memory are high?              | Systems thinking            |
| What artifact is best for deadlock vs memory leak? | Diagnostic choice           |
| Can GC itself cause CPU high?                      | JVM runtime understanding   |
| How would you separate high traffic from a leak?   | Production reasoning        |

---

## 17. Common Mistakes

---

Common mistakes developers make:

- assuming high memory always means a leak
- assuming high CPU always means bad code in one method
- capturing heap dump first for a pure CPU issue
- ignoring GC when both CPU and memory are high
- not distinguishing application work from GC work
- not confirming whether memory drops after GC

---

## 18. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How would you debug a CPU high or memory high issue in production?

Answer like this:

> I would first confirm whether the real problem is CPU, memory, or both using monitoring data. If CPU is high, I would focus on active execution paths using thread dumps and look for hot or repeating stacks, loops, contention, or workload spikes. If memory is high, I would focus on heap growth, GC behavior, and whether memory drops properly after GC. If it does not, I would investigate retention using heap dumps. So the main idea is to match the symptom with the right evidence instead of treating every incident the same way.

This is a **strong interview answer**.
