---
title: "How Do You Perform a Database Migration Safely in Production?"
layout: "interview-prep-topic-content"
interview:
  id: "sql-204"
  phase: "Core"
  topic: "Production Scenarios"
  round: "Technical"
  company: ""
  tags:
    [
      "database migration",
      "production",
      "rollback",
      "schema change",
      "safe deployment",
    ]
---

## 1. Short Answer (Interview Style)

---

> **A safe database migration in production is done in a controlled, backward-compatible way by planning the change, validating impact, applying schema changes carefully, migrating data in stages, monitoring closely, and keeping a rollback or fallback strategy ready.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- production safety during schema or data changes
- backward compatibility between application and database
- rollback and recovery thinking
- risk reduction in real systems

👉 This is a very common production support and backend interview question.

---

## 3. What is a Database Migration?

---

A database migration is any change to the database such as:

- adding or removing columns
- changing data types
- moving data from one table to another
- introducing new indexes
- migrating from one database version or engine to another

---

👉 In interviews, the question usually focuses on **schema and data changes in production**.

---

## 4. Why Database Migration is Risky

---

A bad migration can cause:

- application downtime
- failed deployments
- data loss
- slow queries or lock contention
- inconsistent reads/writes

---

👉 Database changes are high-risk because application code and database schema must remain compatible.

---

## 5. Safe Migration Principles (VERY IMPORTANT)

---

### 1. Make Changes Backward Compatible

Application old version and new version should both work during deployment.

Example:

- first add new column
- then deploy code using it
- later remove old column

---

### 2. Avoid Big-Bang Changes

Do migrations in small controlled steps.

---

### 3. Separate Schema Change from Data Migration

- schema change → add structure
- data migration → move/update existing data

---

### 4. Always Have Rollback or Fallback Plan

If something fails, you should know how to recover safely.

---

## 6. Step-by-Step Safe Migration Approach

---

### Step 1 — Understand the Change

Ask:

- schema change or data change?
- how large is the table?
- what queries will be affected?
- does application code depend on old structure?

---

### Step 2 — Assess Risk

Check:

- table size
- index impact
- lock duration
- read/write traffic pattern
- peak traffic windows

---

### Step 3 — Test in Lower Environments

Run migration in:

- local
- QA / staging
- production-like dataset if possible

---

### Step 4 — Make the Change Backward Compatible

Example safe pattern:

1. add nullable column
2. deploy code that writes to both old and new fields
3. backfill old data into new column
4. switch reads to new column
5. remove old column later

---

### Step 5 — Run Migration in Controlled Window

- prefer low-traffic period
- inform stakeholders if needed
- monitor closely during execution

---

### Step 6 — Validate After Migration

Check:

- row counts
- application logs
- query performance
- error rates
- data correctness

---

## 7. Expand-and-Contract Pattern (MOST IMPORTANT)

---

This is one of the safest migration strategies.

### Expand Phase

- add new schema objects
- keep old schema working
- application supports both versions

### Contract Phase

- after validation, remove old schema or data paths

---

### Example

Old schema:

```text
customer_name
```

New schema:

```text
first_name, last_name
```

Safe migration:

1. add `first_name`, `last_name`
2. keep `customer_name`
3. update code to write both
4. backfill existing records
5. switch reads to new columns
6. remove old column later

---

## 8. Real-World Example

---

Suppose you need to move from storing order status in one table to a new normalized structure.

Safe flow:

- create new table
- deploy code that writes to both old and new structure
- backfill historical data in batches
- validate counts and correctness
- switch reads to new table
- stop writes to old table
- retire old table later

---

👉 This avoids downtime and reduces risk.

---

## 9. Data Migration Best Practices

---

### 1. Use Batches

Avoid updating millions of rows in one transaction.

---

### 2. Avoid Long Locks

Large schema changes or updates can block application traffic.

---

### 3. Monitor Performance During Migration

- DB CPU
- lock waits
- replication lag
- slow queries

---

### 4. Validate Counts and Samples

Check both:

- total migrated records
- sampled data correctness

---

## 10. Rollback vs Roll-Forward

---

### Rollback

Revert to previous state if safe to do so.

---

### Roll-Forward

Sometimes rollback is risky, especially after data change.

Then safer approach is:

- stop bad code path
- fix migration issue
- continue forward safely

---

👉 In database migrations, **roll-forward is often safer than hard rollback** after data has changed.

---

## 11. Common Production Mistakes

---

❌ Changing schema in a non-backward-compatible way  
❌ Running huge updates in one shot  
❌ Migrating during peak traffic  
❌ No validation after migration  
❌ No rollback / fallback plan  
❌ Removing old columns too early

---

## 12. Important Interview Points

---

- always prefer backward-compatible schema evolution
- use expand-and-contract for safety
- separate schema change from data migration
- validate after migration and monitor closely
- batch large data changes to reduce risk

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How do you perform a database migration safely in production?

Answer like this:

> I perform database migration safely by first understanding the impact, testing in lower environments, and making the schema change backward compatible. I avoid big-bang changes and prefer an expand-and-contract approach, where the old and new schema can coexist temporarily. For data migration, I run updates in batches, monitor performance closely, validate the migrated data, and keep a rollback or fallback strategy ready. The main goal is to avoid downtime, data loss, and compatibility issues between application and database.

---

## 14. Learn More (Related Topics)

---

👉 Related:

- How Do You Debug a Slow Database?
- What is Deadlock in SQL?
- What is Connection Pooling and Why Is It Important?
