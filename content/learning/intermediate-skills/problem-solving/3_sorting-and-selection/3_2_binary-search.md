---
title: "Binary Search ✅"
description: "Master Binary Search from first principles. Learn when and why it works, how to identify monotonic search spaces, and apply it confidently in coding interviews."
keywords:
  - binary search
  - search algorithms
  - first occurrence
  - last occurrence
  - binary search on answer
  - monotonic function
  - problem solving patterns
weight: 2
date: 2026-02-09
layout: "topic-content"
---

# Binary Search – Eliminating Half the Search Space

---

## 1. Why the Binary Search Pattern Matters

---

Many interview problems involve **searching within a range**.

A naive approach would:

- scan all elements,
- check each possibility,
- and result in linear or worse time complexity.

Binary Search exists to eliminate unnecessary work.

When applied correctly, it lets you:

- reduce the search space exponentially,
- make decisions using conditions,
- and solve problems in **O(log n)** time.

---

## 2. What Is Binary Search?

---

Binary Search works by repeatedly dividing the search space in half.

At every step:

- pick the middle element,
- decide which half can be discarded,
- continue searching in the remaining half.

The key idea is:

```text
Eliminate half of the search space at every step
```

---

## 3. When Should You Think of Binary Search?

---

Binary Search is a strong candidate when:

- the data is **sorted**
- OR the problem has a **monotonic condition**

Common interview trigger phrases:

- “sorted array”
- “find position of element”
- “first / last occurrence”
- “minimum / maximum value such that...”
- “search space”

📌 The most important trigger:

```text
Can I eliminate half of the possibilities at each step?
```

---

## 4. Sorted vs Monotonic Search Space

---

Understanding this distinction is critical.

### 4.1 Sorted Search Space

The input is explicitly sorted.

Example:

```text
[1, 2, 3, 4, 5]
```

You compare values directly and move left or right.

---

### 4.2 Monotonic Search Space

---

The input may not be sorted, but the **condition behaves predictably**.

Example:

```text
false false false true true true
```

Once the condition becomes true, it stays true.

👉 This enables Binary Search on Answer.

---

## 5. Standard Template

---

```java
int left = 0, right = n - 1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

return -1;
```

---

## 6. Why the Pattern Works

---

Binary Search works because:

- the search space is **ordered or monotonic**
- each step reduces the problem size by half
- decisions are **deterministic**

👉 This guarantees:

```text
Time Complexity: O(log n)
```

---

## 7. A Minimal Example to Build Intuition

---

Input:

```text
nums = [1, 2, 2, 2, 3, 4]
target = 2
```

Goal: find first occurrence

Steps:

- mid points to middle 2 → possible answer
- move left to find earlier occurrence
- continue until boundary reached

Result:

```text
index = 1
```

📌 Insight:

Binary Search is not just about finding a value —

```text
It is about controlling the search direction
```

---

## 8. Variations of Binary Search

---

### 8.1 Find First Occurrence

```java
int left = 0, right = n - 1;
int answer = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (nums[mid] == target) {
        answer = mid;
        right = mid - 1;
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

return answer;
```

---

### 8.2 Find Last Occurrence

```java
int left = 0, right = n - 1;
int answer = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (nums[mid] == target) {
        answer = mid;
        left = mid + 1;
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

return answer;
```

---

### 8.3 Lower Bound (First ≥ target)

```java
int left = 0, right = n - 1;
int answer = n;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (nums[mid] >= target) {
        answer = mid;
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}

return answer;
```

---

## 9. Common Mistakes to Avoid

---

Binary Search problems fail most often due to:

- incorrect boundary conditions
- infinite loops
- wrong mid calculation
- not handling duplicates properly
- mixing up left/right movement logic

📌 If your conditions are unclear, Binary Search will break.

---

## 10. How Interviewers Evaluate Binary Search

---

Interviewers look for:

- correct identification of monotonicity
- clean boundary handling
- correct pointer movement
- ability to explain why half is eliminated

Naming the pattern is optional —
understanding it is not.

---

## 11. When Binary Search Is the Wrong Choice

---

Do NOT use Binary Search when:

- data is not sorted or monotonic
- decisions are not directional
- problem requires exploring all combinations

👉 Forcing Binary Search leads to incorrect solutions.

---

## 🧠 Quick Mental Trigger

---

If you can say:

```text
"Answer lies in a sorted or monotonic space"
```

👉 Use Binary Search

---

## 🔗 Practice Problems (CoderPad Style)

---

To apply this pattern under real interview conditions, explore tagged problems in the practice section:

**👉 [Binary Search – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply the Binary Search filter)_

### ✅ Phase 1 — Core

- First/Last Occurrence

### ✅ Phase 2 — Stretch

- Search in Rotated Sorted Array

### ✅ Phase 3 — Advanced

- Peak Element

---

## Key Takeaway

> Binary Search is not about arrays —
> it is about **eliminating possibilities efficiently**.

---

## 🔗 What’s Next?

Up next:
**👉 [Binary Search on Answer](/learning/intermediate-skills/problem-solving/3_sorting-and-selection/3_3_binary-search-on-answer/)**
