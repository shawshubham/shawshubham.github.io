---
title: "3Sum"
layout: "code-solution-content"
date: 2026-02-09
toc_hide: true

problem:
  id: "lc-3"
  source: "LeetCode"
  url: "https://leetcode.com/problems/3sum/"
  difficulty: "Medium"
  corePatterns:
    - "Two Pointers"
  tags:
    - "array"
    - "sorting"
    - "two-pointers"
    - "duplicates-handling"
    - "pair-sum"
    - "triplets"
---

# LeetCode Problem: 3Sum

## 1. Problem Statement

Given an integer array `nums`, return all the **unique triplets**
`[nums[i], nums[j], nums[k]]` such that:

- `i`, `j`, and `k` are distinct indices
- `nums[i] + nums[j] + nums[k] == 0`

The solution set must not contain duplicate triplets.

Return the answer in any order.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Do we return indices or values? → **Values (triplets)**
- Should triplets be unique? → **Yes**
- Can the input contain duplicates? → **Yes**
- Can the array be modified? → **Yes (sorting allowed)**
- Does output order matter? → **No**

---

## 3. Constraints & Edge Cases

- `nums.length < 3` → return empty list
- All zeros (e.g. `[0,0,0,0]`) → only one triplet `[0,0,0]`
- Multiple duplicates → must be handled carefully
- Large input → brute force is too slow

---

## 4. Brute Force Idea

Try all triplets using three nested loops and store results in a set.

```text
Time: O(n³)
Space: O(k) for result set
```

Correct, but inefficient and not interview-friendly.

---

## 5. Pattern Recognition

Key observations:

- We need triplets
- Duplicate handling is critical
- After sorting, the problem reduces to:
- Fix one number
- Find two numbers whose sum equals -fixed

**➡️ Sorting + Two Pointers**

---

## 6. Handling Duplicates – Naive Thinking → Correct Intuition

Before landing on the final solution, a natural way to think about 3Sum is:

### Naive Plan (Correct Structure, Missing Uniqueness)

1. Sort the array → `O(n log n)`
2. Fix one element `i` (loop) → `O(n)`
3. Find the remaining two elements using Two Pointers → `O(n)` per `i`
4. Add the triplet to the results

**Time complexity**

- Sorting: `O(n log n)`
- Two pointers inside a loop: `O(n * n)`
- Total: `O(n log n + n²)` → dominated by **`O(n²)`**

This structure is correct and is exactly the intended direction.

✅ **Problem:** it can produce **duplicate triplets** when the input has duplicates.

---

### Naive Fix #1: Remove Duplicates From the Array After Sorting (Incorrect)

Another idea:

1. Sort
2. Remove duplicates in-place
3. Run 3Sum on the deduplicated array

This is **wrong** because duplicates are sometimes required to form valid triplets.

Examples:

- `[-1, -1, 2]` requires two `-1`s
- `[0, 0, 0]` requires three `0`s

Removing duplicates breaks correctness.

---

### Naive Fix #2: Deduplicate the Result Set Afterward (Works, But Weak Interview Signal)

A tempting fix is:

1. Sort
2. Fix one element
3. Two pointers for the remaining two
4. Add triplets
5. Remove duplicates from results using a `Set`

This works because the set can enforce uniqueness.

However, it is not ideal in interviews because:

- it uses extra memory,
- it hides the real challenge (duplicate control),
- it adds implementation complexity just to “clean up” output.

#### How would we implement this (for curiosity)?

- Keep `Set<List<Integer>>` (or `Set<String>` like `"a,b,c"`)
- Add each triplet to the set instead of a list
- Convert the set back to a list at the end

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> result = new HashSet<>(); //to remove duplicates
        if(nums == null || nums.length < 3) return new ArrayList<>();

        // sort
        Arrays.sort(nums); // nlogn
        // fix one element
        for(int i = 0; i < nums.length - 2; i++) {
            // find two others
            int left = i+1;
            int right = nums.length -1;

            while(left < right) {
               int sum = nums[i] + nums[left] + nums[right];
               if(sum == 0){
                // remove duplicates from result
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                left++;
                right--;
               }
               else if(sum > 0){
                right--;
               }
               else {
                left++;
               }
            }
        }

        return new ArrayList<>(result); //converting to arrays
    }
}
```

This is straightforward but **less preferred** than controlling duplicates during traversal.

---

### Final Intuition: Skip Duplicates During Traversal (Correct Interview Strategy)

The correct approach is to:

- keep duplicates in the array,
- but skip them at the right moments.

We remove duplicates **by iteration rules**, not by modifying input or cleaning output later:

1. **Skip duplicate anchors**
   - If `i > 0` and `nums[i] == nums[i - 1]`, skip this `i`.

2. **Skip duplicate left/right values after finding a valid triplet**
   - After `sum == 0`, move both pointers and skip repeated values.

This guarantees:

- uniqueness without a set,
- `O(1)` extra space (excluding output),
- and it matches what interviewers expect.

### Time & Space Complexity

```text
Time: O(n²)
Space: O(1) extra (excluding output)
```

---

## 8. Final Code (Java)

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        if(nums == null || nums.length < 3) return new ArrayList<>();

        // sort
        Arrays.sort(nums); // nlogn
        // fix one element
        for(int i = 0; i < nums.length - 2; i++) {
            //skip the duplicate starting elements
            if(i > 0 && nums[i] == nums[i-1]) continue;

            // find two others
            int left = i+1;
            int right = nums.length -1;

            while(left < right) {
               int sum = nums[i] + nums[left] + nums[right];
               if(sum == 0){
                // remove duplicates from result
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                left++;
                right--;

                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
               }
               else if(sum > 0){
                right--;
               }
               else {
                left++;
               }
            }
        }

        return result;
    }
}
```

---

## 9. Interview-Style Explanation

> “After sorting the array, I fix one element and use Two Pointers to find pairs that sum to the negative of that value.  
> The key challenge is handling duplicates.  
> I skip duplicate anchor values and also skip duplicate values while moving the pointers after finding a valid triplet.  
> This guarantees uniqueness without extra space and reduces time complexity to O(n²).”

---

## 10. Common Mistakes

- Using a Set to deduplicate results instead of controlling traversal
- Removing duplicates from the array itself
- Forgetting to skip duplicate anchors
- Not skipping duplicates after finding a valid triplet
- Moving only one pointer after sum == 0
