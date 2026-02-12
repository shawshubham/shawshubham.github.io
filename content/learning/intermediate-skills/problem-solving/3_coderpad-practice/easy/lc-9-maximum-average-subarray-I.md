---
title: "Maximum Average Subarray I"
description: "Learn the fixed-size sliding window technique to compute the maximum average of any subarray of length k in linear time. A canonical problem to master window sum maintenance."
keywords:
  - maximum average subarray
  - fixed sliding window
  - rolling sum
  - coderpad array problems
  - interview sliding window
date: 2026-02-12
layout: "code-solution-content"

problem:
  id: "lc-9"
  source: "LeetCode"
  url: "https://leetcode.com/problems/maximum-average-subarray-i/"
  difficulty: "Easy"
  learningPhase: "Core"
  corePatterns:
    - "Sliding Window"
  tags:
    - "array"
    - "fixed-window"
    - "rolling-sum"
    - "prefix-sum-alternative"
---

# LeetCode Problem: Maximum Average Subarray I

## 1. Problem Statement

You are given an integer array `nums` consisting of `n` elements and an integer `k`.

Find the **maximum average value** of any **contiguous subarray of length `k`**.

Return the maximum average as a floating-point number.

---

## 2. Why This Problem Matters

This is the **canonical fixed-size sliding window** problem.

If you understand this problem well, you understand:

- how to maintain a rolling sum,
- how to slide a window efficiently,
- and how to avoid recomputation.

It is commonly used as:

- a warm-up in interviews,
- a calibration question in CoderPad rounds.

---

## 3. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Is the subarray required to be contiguous? → **Yes**
- Is the window size fixed? → **Yes, exactly `k`**
- Are negative numbers allowed? → **Yes**
- What should be returned? → **Average (double)**

---

## 4. Brute Force Idea

Compute the sum of every subarray of size `k` using a nested loop.

```text
Time: O(n * k)
Space: O(1)
```

Correct but inefficient.

---

## 5. Pattern Recognition

Key observations:

- Subarray → contiguous
- Window size → fixed (k)
- Operation → sum / average

**➡️ Fixed Sliding Window**

---

## 6. Optimized Approach (Fixed Sliding Window)

### Key Idea

Instead of recomputing the sum for each window:

- add the new element entering the window,
- subtract the element leaving the window.

This keeps the window sum updated in **O(1)** time per step.

### Algorithm

1. Compute the sum of the first k elements.
2. Slide the window one step at a time:
   - add nums[i]
   - subtract nums[i - k]
3. Track the maximum sum.
4. Divide by k to get the average.

---

## 7. Time & Space Complexity

```text
Time:  O(n)
Space: O(1)
```

Each element is processed exactly once.

---

## 8. Final Code (Java)

```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int n = nums.length;
        int windowSum = 0;

        // Sum of first window
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }

        int maxSum = windowSum;

        // Slide the window
        for (int i = k; i < n; i++) {
            windowSum += nums[i];
            windowSum -= nums[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }

        return (double) maxSum / k;
    }
}
```

---

## 9. Interview-Style Explanation

> “Because the window size is fixed, I maintain a rolling sum.  
> As the window slides, I add the new element and remove the old one.  
> This avoids recomputation and keeps the solution linear.”

---

## 10. Common Mistakes

- Recomputing sum for every window
- Using floating-point arithmetic too early
- Off-by-one errors when sliding
- Forgetting negative values

---

## 11. Alternative (Prefix Sum) — Not Recommended Here

You can solve this using prefix sums, but it:

- uses extra memory,
- adds unnecessary complexity.

Fixed sliding window is the **cleanest and most interview-friendly** solution.

### For reference

Prefix sum is the **“precompute sums so any subarray sum is O(1)”** approach.

#### Idea

```text
Build prefix[i] = sum(nums[0..i-1]) (length n+1, with prefix[0]=0).
```

Then any subarray sum of length k ending at i is:

```text
sum(i-k .. i-1) = prefix[i] - prefix[i-k]
```

### Java (Prefix Sum)

```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        long maxSum = Long.MIN_VALUE;
        for (int i = k; i <= n; i++) {
            long windowSum = prefix[i] - prefix[i - k];
            if (windowSum > maxSum) maxSum = windowSum;
        }

        return (double) maxSum / k;
    }
}
```

#### Complexity

- Time: **O(n)**
- Space: **O(n)** (this is why fixed sliding window is preferred here)

---

## 12. Key Takeaway

Fixed-size sliding window problems are about **maintaining state**, not recomputation.

If you master this pattern, a whole class of problems becomes trivial.
