---
title: "Remove Duplicates from Sorted Array"
layout: "code-solution-content"
date: 2026-02-10
toc_hide: true

problem:
  id: "lc-2"
  source: "LeetCode"
  url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
  difficulty: "Easy"
  corePatterns:
    - "Two Pointers"
  tags:
    - "array"
    - "sorted-input"
    - "in-place"
    - "deduplication"
    - "fast-slow"
---

# LeetCode Problem: Remove Duplicates from Sorted Array

## 1. Problem Statement

Given a **sorted** integer array `nums`, remove the duplicates **in-place** such that each unique element appears only once.

Return `k`, the number of unique elements.

After removing duplicates, the first `k` elements of `nums` should contain the unique elements in the **same relative order** as the original array.

You must do this with **O(1)** extra space.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Is the array sorted? → **Yes**
- Do we need to preserve order? → **Yes**
- Should we allocate a new array? → **No (in-place)**
- What do we return? → **k (count of unique elements)**
- What about elements after index `k-1`? → **Don't care**

---

## 3. Constraints & Edge Cases

- Empty array → return `0`
- Single element → return `1`
- All unique → return `n`
- All duplicates → return `1`

---

## 4. Brute Force Idea

Create a new list of unique elements and copy back.

```text
Time: O(n)
Space: O(n)
```

Correct, but violates the in-place requirement.

---

## 5. Pattern Recognition

Key observations:

- Array is **sorted** → duplicates are adjacent
- Need **in-place** modification
- Must preserve relative order

**➡️ Two Pointers (Fast & Slow)**

- slow tracks the position to write the next unique value
- fast scans the array

## 6. Optimized Approach (Fast & Slow Pointers)

- If the array is empty, return 0
- Initialize slow = 1 (next write position)
- Iterate fast from index 1 to end:
  - If nums[fast] != nums[fast - 1]:
    - write nums[fast] at nums[slow]
    - increment slow
- Return slow as k

This works because in a sorted array, a new unique element is detected when it differs from the previous element.

### Time & Space Complexity

```text
Time: O(n)
Space: O(1)
```

---

## 7. Final Code (Java)

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if(nums == null && nums.length == 0){
            return 0;
        }

        int slow = 0, fast = 1;
        while(fast < nums.length){
            if (nums[slow] != nums[fast]){
                nums[++slow] = nums[fast];
                fast++;
            } else {
                fast++;
            }
        }

        return slow+1;
    }
}
```

---

## 8. Interview-Style Explanation

> “Because the array is sorted, duplicates appear next to each other.  
> I use two pointers: fast scans the array and slow tracks the next position to write a unique value.  
> Whenever I find a new value (different from the previous one), I write it at slow and move slow forward.  
> This keeps the unique elements in-place and preserves order in O(n) time and O(1) space.”

---

## 9. Common Mistakes

- Forgetting the empty array case
- Starting slow at 0 and overwriting incorrectly
- Comparing nums[fast] with nums[slow] instead of nums[fast - 1]
- Allocating a new array (violates in-place requirement)
