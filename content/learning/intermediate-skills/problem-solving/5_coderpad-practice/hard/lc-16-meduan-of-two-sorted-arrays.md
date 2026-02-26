---
title: "Median of Two Sorted Arrays"
description: "A classic advanced interview problem that requires Binary Search on Partition. This question tests precision, invariants, and the ability to reason about valid splits instead of brute-force merging."
keywords:
  - median of two sorted arrays
  - binary search on partition problem
  - advanced interview array problem
  - logarithmic median finding
  - specialized coding interview questions
layout: "code-solution-content"
date: 2026-02-11
toc_hide: true

problem:
  id: "lc-4"
  source: "LeetCode"
  url: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  difficulty: "Hard"
  learningPhase: "Advanced"
  corePatterns:
    - "Specialized: Binary Search on Partition"
  tags:
    - "binary-search-on-partition"
    - "partitioning"
    - "sorted-arrays"
    - "median"
    - "specialized-problem"

specialNote: "Advanced & Specialized — not part of core pattern mastery"
---

# Median of Two Sorted Arrays

### ⚠️ Important Context

This is an **advanced and specialized interview problem**.

If this problem does not immediately map to any core pattern (Two Pointers, Sliding Window, Stack, etc.), that is **expected**.

This problem belongs to:

> **Binary Search on Partition**

You are not searching for a value —  
you are searching for a **valid split**.

---

## 1. Problem Statement

You are given two sorted arrays `nums1` and `nums2` of sizes `m` and `n`.

Return the **median** of the two sorted arrays.

The overall runtime complexity must be **O(log (m + n))**.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Are both arrays sorted? → **Yes**
- Can arrays be empty? → **Yes**
- Are duplicate values allowed? → **Yes**
- Is merging allowed? → **No (time constraint forbids it)**
- What defines median?
  - Odd length → middle element
  - Even length → average of two middle elements

---

## 3. Why the Naive Approach Is Not Enough

A natural first idea is to:

- combine both arrays,
- sort the combined array,
- compute the median.

### 3.1 Baseline Solution — Merge + Sort

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int length = nums1.length + nums2.length;
        int[] merged = new int[length];

        for (int i = 0; i < nums1.length; i++) {
            merged[i] = nums1[i];
        }
        for (int i = 0; i < nums2.length; i++) {
            merged[i + nums1.length] = nums2[i];
        }

        Arrays.sort(merged);

        int mid = merged.length / 2;
        if (merged.length % 2 == 0) {
            return (merged[mid] + merged[mid - 1]) / 2.0;
        }
        return merged[mid];
    }
}
```

#### Complexity

- Merging arrays: **O(m + n)**
- Sorting merged array: **O((m + n) log (m + n))**

```text
Overall Time Complexity: O((m + n) log (m + n))
Space Complexity: O(m + n)
```

This solution is correct — but it does **not** meet the problem’s requirement.

### 3.2 Improving Using Two Pointers (O(m + n))

Since both arrays are already sorted, we can avoid sorting entirely.

Instead of combining and sorting, we can perform the **merge step of merge sort** using two pointers.

```java
// Improved solution: O(m + n) time, O(m + n) space
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int n = nums1.length, m = nums2.length;
        int[] merged = new int[n + m];

        int i = 0, j = 0, k = 0;
        while (i < n && j < m) {
            if (nums1[i] < nums2[j]) merged[k++] = nums1[i++];
            else merged[k++] = nums2[j++];
        }
        while (i < n) merged[k++] = nums1[i++];
        while (j < m) merged[k++] = nums2[j++];

        int mid = (n + m) / 2;
        if ((n + m) % 2 != 0) return merged[mid];
        return (merged[mid] + merged[mid - 1]) / 2.0;
    }
}
```

#### Complexity

```text
Time Complexity: O(m + n)
Space Complexity: O(m + n)
```

This is a clear improvement and correctly leverages the sorted property.

However:

> The problem explicitly requires **O(log (m + n))** time.

That constraint makes even the linear-time solution insufficient.

To satisfy the requirement, we must avoid merging altogether and instead find a way to compute the median in logarithmic time.

This is where Binary Search on Partition becomes necessary.

---

## 4. Pattern Identification

This problem is **not**:

- Two Pointers
- Sliding Window
- Stack
- BFS
- Greedy

It is a classic example of:

> **Binary Search on Partition**

We are searching for a **partition point**, not a number.

---

## 5. Core Insight (High-Level)

We want to split both arrays into left and right parts such that:

- Left side contains exactly half of the total elements
- Every element in the left part ≤ every element in the right part

Once such a partition is found, the median can be computed directly.

---

## 6. Why Binary Search Works

The validity of a partition is **monotonic**:

- If the partition is too far left → move right
- If the partition is too far right → move left

This monotonic behavior allows binary search.

To simplify:

- Always binary-search on the **smaller array**
- This keeps bounds tight and logic clean

---

## 7. Partition Invariant

Let:

- `i` = number of elements taken from `nums1`
- `j` = number of elements taken from `nums2`

We want:

```code
i + j = (m + n + 1) / 2
```

And the partition to satisfy:

```code
max(left1, left2) ≤ min(right1, right2)
```

If this holds, we’ve found the correct split.

---

## 8. Handling Edge Boundaries

To avoid out-of-bounds checks:

- If no elements on left → use `-∞`
- If no elements on right → use `+∞`

This makes comparisons uniform.

---

## 9. Time & Space Complexity

```text
Time:  O(log(min(m, n)))
Space: O(1)
```

This meets the problem’s strict requirement.

---

## 10. Final Code (Java)

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Ensure nums1 is the smaller array
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.length;
        int n = nums2.length;

        int low = 0, high = m;

        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;

            int left1  = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int right1 = (i == m) ? Integer.MAX_VALUE : nums1[i];

            int left2  = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int right2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            // Valid partition
            if (left1 <= right2 && left2 <= right1) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
                } else {
                    return Math.max(left1, left2);
                }
            }
            // Too far right in nums1
            else if (left1 > right2) {
                high = i - 1;
            }
            // Too far left in nums1
            else {
                low = i + 1;
            }
        }

        // Should never reach here for valid input
        return 0.0;
    }
}
```

---

## 11. Interview-Style Explanation

> “I binary-search the partition on the smaller array.  
> For each cut, I check whether the left side’s maximum is less than or equal to the right side’s minimum.  
> Once the invariant holds, the median can be derived directly.”

---

## 12. Common Mistakes

- Trying to merge arrays
- Binary-searching values instead of partition index
- Forgetting edge cases when partition is at array boundaries
- Not enforcing search on the smaller array

---

## 13. Key Takeaway

> **This problem is about finding a valid split, not searching for a value.**

Recognizing that early is the real solution.
