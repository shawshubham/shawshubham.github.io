---
title: "Prefix Sum ✅"
description: "Learn the Prefix Sum pattern from first principles. Understand how cumulative computation eliminates repeated range calculations and how to recognize prefix-sum-based interview problems confidently."
keywords:
  - prefix sum pattern
  - cumulative sum
  - subarray sum problems
  - range sum queries
  - prefix modulo
  - coding interview prefix sum
  - problem solving patterns
weight: 4
date: 2026-02-09
layout: "topic-content"
---

# Prefix Sum – Eliminating Repeated Range Computation

## 1. Why the Prefix Sum Pattern Matters

Many interview problems involve:

- subarray sums,
- range computations,
- cumulative totals,
- counting subarrays,
- or repeated sum calculations.

A brute force approach would often:

- generate all possible ranges,
- recompute sums repeatedly,
- and result in O(n²) or worse complexity.

The Prefix Sum pattern exists to eliminate that repeated computation.

When applied correctly, it lets you:

- compute range sums efficiently,
- answer repeated queries quickly,
- transform nested loops into linear solutions,
- and solve many counting problems elegantly.

---

## 2. What Is Prefix Sum?

Prefix Sum stores:

```text
Cumulative sum till current index
```

Meaning:

```text
prefix[i]
=
sum of elements from 0 → i
```

Example:

```text
nums = [1,2,3,4]

prefix = [1,3,6,10]
```

---

## 3. The Core Insight

Suppose:

```text
prefix[r] = sum(0 → r)
prefix[l - 1] = sum(0 → l-1)
```

Then:

```text
sum(l → r)
=
prefix[r] - prefix[l - 1]
```

This is the entire foundation of the pattern.

Instead of recomputing the range:

```text
reuse previously computed cumulative sums.
```

---

## 4. When Should You Think of Prefix Sum?

Prefix Sum is a strong candidate when:

- repeated range sums are needed,
- subarray sums are involved,
- cumulative totals matter,
- counting subarrays is required,
- modulo/remainder logic appears.

Common interview trigger phrases:

- “subarray sum”
- “range sum”
- “contiguous”
- “sum equals K”
- “divisible by K”
- “cumulative total”

---

## 5. A Minimal Example to Build Intuition

### Problem Shape

```text
Find sum of subarray from index l to r
```

Brute force:

```text
Iterate from l → r every time
```

Complexity:

```text
O(n) per query
```

Prefix Sum approach:

```text
prefix[r] - prefix[l - 1]
```

Complexity:

```text
O(1) per query
```

The key idea is:

```text
Precompute once → reuse many times.
```

---

## 6. Running Prefix Sum Pattern

Sometimes we do not explicitly build a prefix array.

Instead, we maintain:

```text
running cumulative sum
```

Example:

```java
sum += nums[i];
```

Used in:

- Subarray Sum Equals K
- Prefix modulo problems
- cumulative counting problems

---

## 7. Prefix Sum + HashMap Pattern

One of the most important interview combinations is:

```text
Prefix Sum + HashMap
```

This appears in:

- Subarray Sum Equals K
- Continuous Subarray Sum
- Subarray Sums Divisible by K

Core idea:

```text
Store previously seen prefix states
```

instead of recomputing all subarrays.

---

## 8. Prefix Modulo Pattern

A very common advanced variation:

```text
prefix[r] % k == prefix[l - 1] % k
```

Meaning:

```text
subarray sum between them is divisible by k
```

This transforms:

```text
subarray divisibility problems
```

into:

```text
matching remainder problems
```

---

## 9. Why the Pattern Works

Prefix Sum works because:

- cumulative computation is reused,
- repeated range traversal is eliminated,
- subarray problems transform into prefix relationships.

📌 The optimization comes from:

```text
Trading preprocessing for fast queries.
```

---

## 10. Common Mistakes to Avoid

Prefix Sum problems fail most often due to:

- incorrect prefix initialization,
- off-by-one errors,
- forgetting base cases,
- mishandling negative numbers,
- incorrect remainder handling.

📌 Prefix modulo problems are especially error-prone.

---

## 11. How Interviewers Evaluate Prefix Sum Solutions

Interviewers look for:

- recognition of repeated range computation,
- correct transformation into cumulative relationships,
- clean handling of prefix state,
- understanding of HashMap integration.

Naming the pattern is optional —
recognizing the optimization opportunity is not.

---

## 12. When Prefix Sum Is the Wrong Choice

Do NOT force Prefix Sum when:

- ordering matters dynamically,
- updates occur frequently,
- sliding constraints dominate,
- independent non-contiguous selections are required.

Sometimes:

- Sliding Window,
- DP,
- or Segment Trees

are better suited.

---

## 🧠 Quick Mental Trigger

If you can say:

```text
"I am repeatedly calculating subarray or range sums"
```

👉 Think Prefix Sum

---

## 🔗 Practice Problems (CoderPad Style)

To apply this pattern under real interview conditions, explore tagged problems in the practice section:

**👉 [Prefix Sum – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply the Prefix Sum filter)_

### ✅ Phase 1 — Core

- Running Sum of 1D Array
- Range Sum Query – Immutable
- Find Pivot Index

### ✅ Phase 2 — Stretch

- Subarray Sum Equals K
- Continuous Subarray Sum

### ✅ Phase 3 — Advanced

- Subarray Sums Divisible by K
- Contiguous Array

---

## Key Takeaway

> Prefix Sum is not about cumulative arrays —
> it is about reusing previously computed computation efficiently.

Once you learn to transform range problems into prefix relationships,
large classes of subarray problems become dramatically simpler.

---

## 🔗 What’s Next?

The next pattern focuses on combining information from both directions simultaneously.

Up next:

**👉 Prefix-Suffix Pattern – Combining Left and Right Information Efficiently**
