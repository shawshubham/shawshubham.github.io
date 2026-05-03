---
title: "Container With Most Water"
layout: "code-solution-content"
date: 2026-02-09
toc_hide: true

problem:
  id: "lc-4"
  source: "LeetCode"
  url: "https://leetcode.com/problems/container-with-most-water/"
  difficulty: "Medium"
  learningPhase: "Core"
  corePatterns:
    - "Two Pointers"
  tags:
    - "array"
    - "two-pointers"
    - "greedy-move"
    - "area-maximization"
---

# LeetCode Problem: Container With Most Water

## 1. Problem Statement

You are given an integer array `height` where `height[i]` represents the height of a vertical line at index `i`.

Choose two lines that, together with the x-axis, form a container that holds the most water.

Return the **maximum amount of water** a container can store.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Are indices required or only the maximum area? → **Maximum area**
- Can heights be zero? → **Yes**
- Can we reorder the array? → **No**
- Any constraints on width? → Width is `right - left`

---

## 3. Constraints & Edge Cases

- `height.length < 2` → no container (typically not given by constraints)
- All equal heights → widest pair is best
- Contains zeros → area can be zero for some pairs
- Large values → compute area using `int` (fits LeetCode constraints)

---

## 4. Brute Force Idea

Check all pairs `(i, j)` and compute area.

```text
area = min(height[i], height[j]) * (j - i)

Time: O(n²)
Space: O(1)
```

Correct but too slow.

---

## 5. Pattern Recognition

Key observations:

- We need the best pair of boundaries → **two indices**
- Area depends on:
- width (distance between pointers)
- limiting height (min of the two)
- We must avoid checking all pairs

**➡️ Two Pointers (Opposite Direction) + Greedy Pointer Move**

---

## 6. Optimized Approach (Two Pointers + Greedy)

Initialize:

- left = 0
- right = n - 1
- maxArea = 0

While left < right:

1. Compute area:
   - `width = right - left`
   - `minHeight = min(height[left], height[right])`
   - `area = minHeight * width`
2. Update maxArea
3. Move the pointer at the **smaller height inward**:
   - `If height[left] <= height[right] → left++`
   - `Else → right--`

### Why moving the smaller pointer is correct (intuition)

The current area is limited by the smaller height.

- If you move the taller side, width decreases, and minHeight stays limited by the smaller side → area cannot improve reliably.
- If you move the smaller side, you might find a taller line that increases minHeight enough to offset the reduced width.

This is the greedy core of the solution.

### Time & Space Complexity

```java
Time: O(n)
Space: O(1)
```

---

## 7. Final Code (Java)

### Standard Two Pointers (Interview-Preferred)

```java
class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;

        while (left < right) {
            int width = right - left;
            int minHeight = Math.min(height[left], height[right]);
            int area = width * minHeight;

            maxArea = Math.max(maxArea, area);

            if (height[left] <= height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
}
```

### Slightly Better (Skip Non-Improving Heights) — Same Big-O

This version keeps the same core idea but **skips multiple indices** that cannot improve the area because they are not taller than the current limiting height.

```java
class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;

        while(left < right){
            int width = right - left;
            int minHeight =  Math.min(height[left], height[right]);
            int area = width * minHeight;

            maxArea = Math.max(maxArea, area);

            while(left< right && height[left] <= minHeight){
                left++;
            }

            while(left< right && height[right] <= minHeight){
                right--;
            }

        }

        return maxArea;
    }
}
```

> Notes (When to Mention This in Interview)
>
> - Both solutions are O(n) time, O(1) space.
> - The “skip” optimization is optional and mainly reduces constant factors.
> - In interviews, start with the standard version; mention the skip as a micro-optimization only if asked.

---

## 8. Interview-Style Explanation

> “I start with two pointers at the ends to maximize width.  
> The area is limited by the shorter line, so after computing the area, I move only the pointer at the shorter height.  
> Moving the taller pointer cannot increase the limiting height and only reduces width.  
> This way each index is processed at most once, giving O(n) time and O(1) space.”

---

## 9. Common Mistakes

- Moving the taller pointer instead of the shorter one
- Forgetting area uses min(height[left], height[right])
- Using left != right instead of left < right
- Overcomplicating with extra arrays or stacks
