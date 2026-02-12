---
title: "Two Sum II - Input Array Is Sorted"
layout: "code-solution-content"
date: 2026-02-09
toc_hide: true

problem:
  id: "lc-1"
  source: "LeetCode"
  url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
  difficulty: "Medium"
  learningPhase: "Core"
  corePatterns:
    - "Two Pointers"
  tags:
    - "array"
    - "sorted-input"
    - "pair-sum"
---

# LeetCode Problem: Two Sum II – Input Array Is Sorted

## 1. Problem Statement

Given a **sorted array of integers** `numbers` and an integer `target`, find **two distinct elements** such that their sum equals `target`.

Return the **1-based indices** of the two numbers as an array `[index1, index2]`, where:

- `1 ≤ index1 < index2 ≤ numbers.length`
- Exactly **one solution exists**
- The same element **cannot** be used twice

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Is the array guaranteed to be sorted? → **Yes**
- Are indices 0-based or 1-based? → **1-based**
- Can the same element be reused? → **No**
- Are duplicates allowed? → **Yes**
- Is there always a valid solution? → **Yes, exactly one**

📌 These clarifications directly drive the solution approach.

---

## 3. Constraints & Edge Cases

- `numbers.length < 2` → not valid per problem constraints
- Negative numbers → allowed
- Duplicate values → allowed
- Exactly one solution → no need to handle “no solution” case

📌 Despite the guarantee, pointer bounds must still be handled safely.

---

## 4. Brute Force Idea

Check every possible pair using two nested loops.

```text
Time: O(n²)
Space: O(1)
```

Correct, but inefficient.

---

## 5. Pattern Recognition

Key observations:

- Array is **sorted**
- We are checking **pairs**
- We want to eliminate unnecessary comparisons

➡️ Two Pointers (Opposite Direction)

---

## 6. Optimized Approach (Two Pointers)

- Place one pointer at the start of the array
- Place another pointer at the end
- Compute the sum of both values
  - If sum < target → move left pointer right
  - If sum > target → move right pointer left
  - If sum == target → return their **1-based indices**
- Stop when pointers cross

Each pointer movement eliminates a set of impossible pairs.

### Time & Space Complexity

```text
Time: O(n)
Space: O(1)
```

---

## 7. Final Code (Java)

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if (sum == target) {
                return new int[]{left + 1, right + 1}; // 1-based indices
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
        return new int[0]; // unreachable due to problem guarantee
    }
}
```

---

## 8. Interview-Style Explanation

> “Because the array is sorted, I can eliminate pairs intelligently.  
> I start with the smallest and largest elements and move pointers inward based on how the sum compares to the target.  
> Each step reduces the search space, so the solution runs in linear time.”

This explanation is **interview-ready**.

---

## 9. Common Mistakes

- Ignoring the sorted constraint and using a hashmap
- Returning 0-based indices instead of 1-based
- Using nested loops unnecessarily
- Incorrect loop condition (<= instead of <)
- Forgetting the “exactly one solution” guarantee
