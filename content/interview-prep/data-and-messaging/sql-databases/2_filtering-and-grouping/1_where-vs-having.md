---
title: "WHERE vs HAVING in SQL"
layout: "interview-prep-topic-content"
interview:
  id: "sql-101"
  phase: "Core"
  topic: "Filtering & Grouping"
  round: "Technical"
  company: ""
  tags: ["where", "having", "sql", "group by", "filtering"]
---

## 1. Short Answer (Interview Style)

---

> **WHERE filters rows before grouping, while HAVING filters aggregated results after GROUP BY.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- query execution order
- filtering logic in SQL
- aggregation behavior
- performance implications

This is one of the most frequently asked SQL interview questions.

---

## 3. Query Execution Order (VERY IMPORTANT)

---

Actual SQL execution order:

```text
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
```

👉 Key insight:

- WHERE runs **before grouping**
- HAVING runs **after grouping**

---

## 4. What is WHERE?

---

- filters individual rows
- cannot use aggregate functions

Example:

```sql
SELECT *
FROM employees
WHERE salary > 50000;
```

This filters rows before any grouping happens.

---

## 5. What is HAVING?

---

- filters grouped data
- works with aggregate functions

Example:

```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

This filters groups after aggregation.

---

## 6. Combined Example (IMPORTANT)

---

```sql
SELECT department, COUNT(*) AS total
FROM employees
WHERE salary > 50000
GROUP BY department
HAVING COUNT(*) > 5;
```

Flow:

1. WHERE filters rows → salary > 50000
2. GROUP BY groups remaining rows
3. HAVING filters groups → COUNT > 5

---

## 7. Key Differences

---

| Feature             | WHERE           | HAVING                  |
| ------------------- | --------------- | ----------------------- |
| Applies on          | Rows            | Groups                  |
| Execution stage     | Before GROUP BY | After GROUP BY          |
| Aggregate functions | Not allowed     | Allowed                 |
| Performance         | Faster          | Slower (after grouping) |

---

## 8. Common Mistake

---

❌ Wrong:

```sql
SELECT department, COUNT(*)
FROM employees
WHERE COUNT(*) > 5
GROUP BY department;
```

👉 WHERE cannot use aggregates.

---

## 9. When to Use What

---

Use WHERE when:

- filtering raw data
- condition does not depend on aggregation

Use HAVING when:

- filtering aggregated results
- using COUNT, SUM, AVG, etc.

---

## 10. Important Interview Points

---

### Can HAVING be used without GROUP BY?

Answer: Yes, but it behaves like WHERE on aggregated result.

---

### Which is faster: WHERE or HAVING?

Answer: WHERE, because it reduces data earlier.

---

### Can we use both together?

Answer: Yes, and often should.

---

### Why can't WHERE use aggregates?

Answer: Because aggregation hasn’t happened yet.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is difference between WHERE and HAVING?

Answer like this:

> WHERE filters rows before grouping, while HAVING filters grouped results after aggregation. WHERE cannot use aggregate functions, but HAVING can. Using WHERE first improves performance by reducing data before grouping.
