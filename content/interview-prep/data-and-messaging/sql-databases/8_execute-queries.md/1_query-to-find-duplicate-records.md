---
title: "Query to Find Duplicate Records in SQL"
layout: "interview-prep-topic-content"
interview:
  id: "sql-203"
  phase: "Core"
  topic: "Execute Queries"
  round: "Technical"
  company: ""
  tags: ["sql", "duplicates", "group by", "having", "query writing"]
---

## 1. Short Answer (Interview Style)

---

> **Duplicate records in SQL are usually found using `GROUP BY` with `HAVING COUNT(*) > 1`. The idea is to group rows by the column or combination of columns that should be unique, then identify groups that appear more than once.**

---

## 2. Why This Question Matters

---

This question tests:

- SQL fundamentals
- understanding of grouping and aggregation
- ability to write practical queries quickly
- awareness of data quality issues

👉 Very common in SQL interviews because it checks both syntax and thinking.

---

## 3. Basic Query

---

Suppose we have a table:

```sql
employees
---------
id | name | email | department
```

If interviewer asks:

> Find duplicate names

Query:

```sql
SELECT name, COUNT(*)
FROM employees
GROUP BY name
HAVING COUNT(*) > 1;
```

---

## 4. How It Works

---

### `GROUP BY name`

Groups all rows having same `name`

### `COUNT(*)`

Counts how many rows exist in each group

### `HAVING COUNT(*) > 1`

Filters only those groups that appear more than once

👉 `HAVING` is used because filtering happens **after aggregation**.

---

## 5. Real-World Example

---

Suppose table data is:

```text
1 | Shubham | a@test.com | Eng
2 | Rahul   | b@test.com | QA
3 | Shubham | c@test.com | Eng
```

Query result:

```text
Shubham | 2
```

👉 Meaning `Shubham` appears twice

---

## 6. Duplicate Based on Multiple Columns

---

Sometimes duplicate is not based on one column, but combination.

Example:

> Find duplicate `name + department`

```sql
SELECT name, department, COUNT(*)
FROM employees
GROUP BY name, department
HAVING COUNT(*) > 1;
```

👉 This is more realistic in production systems.

---

## 7. How to Fetch Full Duplicate Rows

---

Sometimes interviewer asks:

> I don’t just want duplicate values, I want the full rows.

Query:

```sql
SELECT *
FROM employees
WHERE name IN (
    SELECT name
    FROM employees
    GROUP BY name
    HAVING COUNT(*) > 1
);
```

---

For composite duplicates:

```sql
SELECT *
FROM employees e
WHERE (e.name, e.department) IN (
    SELECT name, department
    FROM employees
    GROUP BY name, department
    HAVING COUNT(*) > 1
);
```

---

## 8. Common Interview Variations

---

### Variation 1 — Find Duplicate Emails

```sql
SELECT email, COUNT(*)
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### Variation 2 — Find Unique Records Only

```sql
SELECT name, COUNT(*)
FROM employees
GROUP BY name
HAVING COUNT(*) = 1;
```

---

### Variation 3 — Delete Duplicate Records

This is a more advanced follow-up and usually requires window functions or self-join.

👉 For now, interviewers often just want detection query first.

---

## 9. Common Mistakes

---

❌ Using `WHERE COUNT(*) > 1`  
❌ Forgetting `GROUP BY`  
❌ Not clarifying which columns define duplicate  
❌ Returning duplicate values only when interviewer asked for full rows

---

## 10. Production Angle

---

Duplicate record checks are useful for:

- data cleanup
- migration validation
- enforcing business uniqueness
- identifying ingestion issues

👉 In real systems, duplicates often happen due to:

- missing unique constraints
- retry logic bugs
- race conditions
- bad upstream data

---

## 11. Important Interview Questions

---

### Why use HAVING instead of WHERE?

Answer:
Because `WHERE` filters rows before grouping, while `HAVING` filters after aggregation.

---

### What if duplicate is based on two columns?

Answer:
Use both columns in `GROUP BY`.

---

### How do you fetch full duplicate rows?

Answer:
Use the duplicate-detection query as a subquery and fetch matching rows from main table.

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> Write a query to find duplicate records

Answer:

> To find duplicate records in SQL, I usually group by the column or combination of columns that should be unique and then filter with `HAVING COUNT(*) > 1`. For example: `SELECT name, COUNT(*) FROM employees GROUP BY name HAVING COUNT(*) > 1;`. If full duplicate rows are needed, I would use this as a subquery and fetch the matching rows from the main table.
