---
title: "Deadlock in SQL — What It Is and How to Debug"
layout: "interview-prep-topic-content"
interview:
  id: "sql-201"
  phase: "Core"
  topic: "Transactions & Locking"
  round: "Technical"
  company: ""
  tags: ["deadlock", "sql", "transactions", "locking", "database"]
---

## 1. Short Answer (Interview Style)

---

> **A deadlock occurs when two or more transactions are waiting on each other to release locks, causing all of them to be stuck indefinitely. Databases detect this situation and resolve it by aborting one of the transactions.**

---

## 2. Why This Question Matters

---

This question tests:

- understanding of transaction behavior
- knowledge of database locking
- ability to debug production issues

👉 Very common in backend and L3 support interviews

---

## 3. What is a Deadlock?

---

A deadlock happens when:

- Transaction T1 holds lock on Resource A
- Transaction T2 holds lock on Resource B
- T1 waits for B
- T2 waits for A

👉 Both transactions are stuck forever

---

## 4. Classic Example

---

Transaction 1:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
```

Transaction 2:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;
UPDATE accounts SET balance = balance + 50 WHERE id = 1;
```

---

### What Happens?

- T1 locks row with id = 1
- T2 locks row with id = 2
- T1 waits for id = 2
- T2 waits for id = 1

👉 Deadlock occurs

---

## 5. How Database Handles Deadlock

---

Databases automatically:

- detect circular wait
- choose one transaction as victim
- roll it back

---

Error example:

```text
Deadlock found when trying to get lock; try restarting transaction
```

---

## 6. Real-World Scenario

---

In production systems:

- multiple services updating same tables
- inconsistent order of updates
- high concurrency

👉 Deadlocks become frequent under load

---

## 7. Root Causes (VERY IMPORTANT)

---

### 1. Inconsistent Lock Order

Transactions accessing resources in different order

---

### 2. Long Transactions

- holding locks for long time
- increases chances of collision

---

### 3. High Concurrency

- many threads competing for same data

---

### 4. Missing Indexes

- causes full table scans
- locks more rows than expected

---

## 8. How to Prevent Deadlocks

---

### 1. Maintain Consistent Order

Always access tables/rows in same order

---

### 2. Keep Transactions Short

- avoid unnecessary logic inside transaction
- commit quickly

---

### 3. Use Proper Indexing

- reduces number of locked rows

---

### 4. Retry Mechanism

Handle deadlock exception and retry transaction

---

### 5. Reduce Lock Scope

- use selective queries
- avoid locking unnecessary rows

---

## 9. Production Debugging Approach

---

If deadlock occurs:

1. Check DB logs for deadlock details
2. Identify involved queries
3. Check execution order
4. Analyze locking pattern
5. Look for long-running transactions

---

👉 Common real issue:

> "Why are transactions randomly failing under load?"

Answer:

- deadlocks due to concurrent updates

---

## 10. Important Interview Questions

---

### What causes deadlock?

Answer:
Circular wait due to conflicting locks

---

### How does DB resolve deadlock?

Answer:
It aborts one transaction and releases locks

---

### How to prevent deadlocks?

Answer:

- consistent locking order
- short transactions
- proper indexing
- retry mechanism

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is a deadlock in SQL?

Answer:

> A deadlock occurs when two or more transactions are waiting on each other to release locks, creating a circular dependency. Databases detect this and resolve it by aborting one transaction. Deadlocks can be minimized by maintaining consistent lock order, keeping transactions short, and using proper indexing.
