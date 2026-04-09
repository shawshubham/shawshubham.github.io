---
title: "INNER JOIN vs LEFT JOIN in SQL"
layout: "interview-prep-topic-content"
interview:
  id: "sql-103"
  phase: "Core"
  topic: "Joins"
  round: "Technical"
  company: ""
  tags: ["inner join", "left join", "sql", "joins", "database"]
---

## 1. Short Answer (Interview Style)

---

> **INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table (or NULL if no match exists).**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how relational data is combined
- join behavior and result sets
- handling missing data (NULLs)
- real-world data retrieval logic

This is one of the most frequently asked SQL interview questions.

---

## 3. Sample Tables (For Understanding)

---

### Employees

| id  | name | dept_id |
| --- | ---- | ------- |
| 1   | A    | 10      |
| 2   | B    | 20      |
| 3   | C    | NULL    |

### Departments

| id  | dept_name |
| --- | --------- |
| 10  | HR        |
| 20  | IT        |

---

## 4. INNER JOIN

---

### Query

```sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d
ON e.dept_id = d.id;
```

### Result

| name | dept_name |
| ---- | --------- |
| A    | HR        |
| B    | IT        |

👉 Only rows with matching `dept_id` are returned.

---

## 5. LEFT JOIN

---

### Query

```sql
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d
ON e.dept_id = d.id;
```

### Result

| name | dept_name |
| ---- | --------- |
| A    | HR        |
| B    | IT        |
| C    | NULL      |

👉 All rows from left table are returned.

---

## 6. Key Difference

---

| Feature           | INNER JOIN      | LEFT JOIN                      |
| ----------------- | --------------- | ------------------------------ |
| Matching rows     | Only matching   | Matching + non-matching (left) |
| Non-matching rows | Excluded        | Included (NULLs)               |
| Use case          | strict matching | include all left records       |

---

## 7. Visual Understanding

---

```text
INNER JOIN:
   A ∩ B

LEFT JOIN:
   A + (A ∩ B)
```

---

## 8. When to Use

---

### Use INNER JOIN when:

- only need matching records
- strict relationship exists

---

### Use LEFT JOIN when:

- need all records from left table
- want to detect missing data

Example:

```sql
-- Find employees without department
SELECT e.name
FROM employees e
LEFT JOIN departments d
ON e.dept_id = d.id
WHERE d.id IS NULL;
```

---

## 9. Common Mistake

---

Using INNER JOIN when LEFT JOIN is required:

👉 leads to missing data

---

## 10. Important Interview Points

---

### What happens if no match in LEFT JOIN?

Answer: NULL values are returned for right table.

---

### Is LEFT JOIN always better?

Answer: No, depends on requirement.

---

### Can INNER JOIN return NULLs?

Answer: Only if data itself contains NULLs.

---

### Which is faster?

Answer: INNER JOIN is usually faster because fewer rows are processed.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is difference between INNER JOIN and LEFT JOIN?

Answer like this:

> INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table along with matching rows from the right table, and NULL for non-matching records. LEFT JOIN is useful when we want to include all records from one side even if no match exists.
