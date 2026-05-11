---
title: "Kadane's Algorithm ✅"
description: "Learn Kadane’s Algorithm from first principles. Understand how running optimization over contiguous ranges eliminates repeated subarray computation and helps solve maximum/minimum subarray problems efficiently."
keywords:
  - kadane algorithm
  - maximum subarray
  - running sum optimization
  - dynamic subarray optimization
  - contiguous subarray problems
  - coding interview kadane
  - problem solving patterns
weight: 6
date: 2026-02-09
layout: "topic-content"
---

# Kadane’s Algorithm – Optimizing Contiguous Subarray Problems Efficiently

## 1. Why Kadane’s Algorithm Matters

Many interview problems involve:

- maximum subarray sum,
- minimum subarray sum,
- running optimization over ranges,
- or choosing the best contiguous segment.

A brute force approach would often:

- generate all possible subarrays,
- compute sums repeatedly,
- and result in O(n²) or worse complexity.

Kadane’s Algorithm exists to eliminate that repeated exploration.

When applied correctly, it lets you:

- optimize contiguous ranges efficiently,
- avoid recomputing subarray sums,
- track the best running contribution,
- and solve many optimization problems in linear time.

---

## 2. What Is Kadane’s Algorithm?

Kadane’s Algorithm is a:

```text
running optimization technique
```

used for:

```text
contiguous subarray problems
```

The core idea is:

```text
If the current running contribution becomes harmful,
restart from the current element.
```

---

## 3. The Core Insight

Suppose:

```text
currentSum < 0
```

Then:

```text
adding it to future elements
can only make future answers worse
```

So:

```text
discard the previous contribution
and restart.
```

This is the entire foundation of Kadane’s Algorithm.

---

## 4. When Should You Think of Kadane’s Algorithm?

Kadane’s Algorithm is a strong candidate when:

- the problem involves contiguous subarrays,
- maximum/minimum optimization is required,
- brute force explores all ranges,
- negative contribution removal becomes meaningful.

Common interview trigger phrases:

- “maximum subarray”
- “minimum subarray”
- “largest contiguous sum”
- “best contiguous segment”
- “maximum profit-like accumulation”

---

## 5. A Minimal Example to Build Intuition

### Problem Shape

```text
Find maximum sum contiguous subarray.
```

Example:

```text
[-2,1,-3,4,-1,2,1,-5,4]
```

Brute force:

```text
Generate all subarrays
```

Complexity:

```text
O(n²)
```

Kadane’s insight:

```text
Negative running contribution hurts future sums.
```

So:

```text
Restart when contribution becomes harmful.
```

---

## 6. The Running State Idea

Kadane’s Algorithm maintains:

```text
currentSum → best subarray ending at current index
maxSum     → best answer seen so far
```

Transition:

```java
currentSum = Math.max(nums[i], currentSum + nums[i]);
```

Meaning:

```text
Either:
1. start new subarray
2. extend previous subarray
```

Choose whichever is better.

---

## 7. Why the Pattern Works

Kadane’s Algorithm works because:

- negative contribution propagation is eliminated,
- only useful running contribution is preserved,
- repeated range recomputation is avoided.

📌 The optimization comes from:

```text
Discard harmful history early.
```

---

## 8. Kadane’s vs Sliding Window

This is a very important distinction.

### Sliding Window

```text
Maintains explicit movable boundaries
```

Typically used when:

```text
window validity constraints exist
```

---

### Kadane’s Algorithm

```text
Maintains best running contribution
```

Typically used when:

```text
optimization over contiguous ranges is required
```

Kadane’s does NOT explicitly manage a window.

---

## 9. Kadane’s vs Prefix Sum

### Prefix Sum

```text
Reuses cumulative computation
```

Used for:

```text
range queries
subarray counting
```

---

### Kadane’s Algorithm

```text
Optimizes running contribution dynamically
```

Used for:

```text
maximum/minimum optimization
```

---

## 10. Common Kadane Variations

### 10.1 Maximum Subarray

Classic Kadane.

Pattern:

```text
Keep best positive contribution alive.
```

---

### 10.2 Minimum Subarray

Reverse logic:

```text
Discard positive contribution.
```

---

### 10.3 Circular Subarray

Used in:

- Maximum Sum Circular Subarray

Pattern:

```text
Total Sum - Minimum Subarray
```

---

### 10.4 Product Variants

Used in:

- Maximum Product Subarray

Special handling required because:

```text
Negative × Negative = Positive
```

Both:

```text
maxProduct
minProduct
```

must be tracked.

---

## 11. Common Mistakes to Avoid

Kadane problems fail most often due to:

- incorrect restart logic,
- mishandling all-negative arrays,
- confusing Kadane with Sliding Window,
- incorrect initialization,
- misunderstanding contiguous constraints.

📌 All-negative arrays are the most common bug source.

---

## 12. How Interviewers Evaluate Kadane Solutions

Interviewers look for:

- recognition of contiguous optimization,
- understanding of restart logic,
- elimination of repeated computation,
- correct handling of negative contribution.

Naming the algorithm is optional —
understanding the optimization reasoning is not.

---

## 13. When Kadane’s Algorithm Is the Wrong Choice

Do NOT force Kadane when:

- non-contiguous selection is allowed,
- multiple independent ranges are required,
- exact validity constraints dominate,
- recursive state exploration is required.

Sometimes:

- DP,
- Sliding Window,
- or Prefix Sum

are better suited.

---

## 🧠 Quick Mental Trigger

If you can say:

```text
"Negative running contribution hurts future optimization"
```

👉 Think Kadane’s Algorithm

---

## 🔗 Practice Problems (CoderPad Style)

To apply this pattern under real interview conditions, explore tagged problems in the practice section:

**👉 [Kadane’s Algorithm – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply the Kadane filter)_

### ✅ Phase 1 — Core

#### 1. Maximum Subarray

**LeetCode:** https://leetcode.com/problems/maximum-subarray/

Focus:

- restart logic
- running contribution
- contiguous optimization

---

#### 2. Maximum Sum Circular Subarray

**LeetCode:** https://leetcode.com/problems/maximum-sum-circular-subarray/

Focus:

- circular contribution handling
- maxSubarray vs minSubarray relationship
- advanced Kadane reasoning

---

### ✅ Phase 2 — Stretch

#### 3. Maximum Product Subarray

**LeetCode:** https://leetcode.com/problems/maximum-product-subarray/

Focus:

- sign-flipping behavior
- max/min tracking
- product-state transitions

---

#### 4. Best Time to Buy and Sell Stock

**LeetCode:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

Focus:

- running optimization intuition
- contribution tracking
- Kadane-like thinking

---

### ✅ Phase 3 — Advanced

#### 5. Maximum Absolute Sum of Any Subarray

**LeetCode:** https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/

Focus:

- simultaneous max/min optimization
- bidirectional Kadane reasoning

---

#### 6. K-Concatenation Maximum Sum

**LeetCode:** https://leetcode.com/problems/k-concatenation-maximum-sum/

Focus:

- repeated array contribution
- extended Kadane application
- prefix/suffix interaction

---

### 🚦 After This Point

Once you are comfortable with these problems:

- restart logic becomes intuitive,
- harmful contribution elimination feels natural,
- and running optimization becomes predictable,

you can comfortably move into:

- Dynamic Programming
- advanced greedy optimization
- state-transition optimization
- streaming optimization problems

At this stage, Kadane’s Algorithm should feel like:

```text
continuous optimization over a running contribution
```

rather than a memorized formula.

---

### How to Practice (CoderPad Discipline)

Each problem page follows the same structure:

- problem understanding
- constraints & edge cases
- brute force idea
- optimized Kadane approach
- final code
- interview-style explanation

📌 **Rule:** don’t move to the next phase until you can explain:

- why restarting is safe,
- when contribution becomes harmful,
- and why contiguous optimization works.

---

## Key Takeaway

> Kadane’s Algorithm is not about resetting sums —
> it is about eliminating harmful contribution from future optimization.

Once you learn to reason about running contribution,
large classes of contiguous optimization problems become dramatically simpler.

---

## 🔗 What’s Next?

The next pattern focuses on making locally optimal decisions that remain globally safe.

Up next:

**👉 Greedy – Making the Best Local Decision**
