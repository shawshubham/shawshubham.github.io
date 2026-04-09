---
title: "How Do You Check Running Processes in Linux?"
layout: "interview-prep-topic-content"
interview:
  id: "linux-101"
  phase: "Core"
  topic: "Process Management"
  round: "Technical"
  company: ""
  tags: ["linux", "process", "ps", "top", "grep", "debugging"]
---

## 1. Short Answer (Interview Style)

---

> **In Linux, running processes can be checked using commands like `ps -ef` for a snapshot view and `top` for real-time monitoring. These help identify process IDs, CPU usage, and system activity.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how to inspect running applications
- system monitoring basics
- production debugging fundamentals
- how to identify problematic processes

This is a very common backend and support interview question.

---

## 3. Using ps Command (Snapshot View)

---

### Basic Command

```bash
ps -ef
```

### What it shows

- all running processes
- process ID (PID)
- parent process ID (PPID)
- user
- command used to start process

Example output:

```text
UID   PID  PPID  CMD
root  101     1  java -jar app.jar
```

👉 This gives a **static snapshot** of processes.

---

## 4. Find Specific Process

---

```bash
ps -ef | grep java
```

👉 Common use cases:

- find application process
- check if service is running

---

## 5. Using top Command (Real-Time Monitoring)

---

```bash
top
```

### What it shows

- live CPU usage
- memory usage
- running processes
- system load

👉 This is used for **real-time monitoring**.

---

## 6. Difference Between ps and top

---

| Command | Type      | Usage                   |
| ------- | --------- | ----------------------- |
| ps -ef  | Snapshot  | list all processes      |
| top     | Real-time | monitor system activity |

---

## 7. Real-World Usage (VERY IMPORTANT)

---

### Scenario: Application is slow

Step-by-step:

1. Check processes:

```bash
ps -ef | grep java
```

2. Monitor CPU usage:

```bash
top
```

3. Identify high CPU process

4. Note PID and investigate further

---

## 8. Useful Variations

---

### Show process tree

```bash
ps -ef --forest
```

---

### Sort by CPU usage

```bash
ps -eo pid,ppid,cmd,%cpu --sort=-%cpu
```

---

### Better top alternative

```bash
htop
```

---

## 9. Important Interview Points

---

### What is PID?

Answer: Unique identifier of a process.

---

### Difference between ps and top?

Answer:

- ps → snapshot
- top → real-time

---

### How to find a specific process?

Answer: `ps -ef | grep <name>`

---

### Which command shows real-time usage?

Answer: `top`

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How do you check running processes in Linux?

Answer like this:

> We can use `ps -ef` to get a snapshot of all running processes and `top` to monitor processes in real time. To find a specific process, we commonly use `ps -ef | grep <process_name>`. These tools help identify system activity and debug performance issues.
