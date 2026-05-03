---
title: "Permutation in String"
description: "Learn fixed-size sliding window with frequency arrays to detect whether one string contains a permutation of another. A classic interview pattern for anagram/permutation checks."
keywords:
  - permutation in string
  - sliding window anagram
  - fixed window frequency array
  - coderpad string problems
  - interview string patterns
layout: "code-solution-content"
date: 2026-02-12
toc_hide: true

problem:
  id: "lc-10"
  source: "LeetCode"
  url: "https://leetcode.com/problems/permutation-in-string/"
  difficulty: "Medium"
  learningPhase: "Core"
  corePatterns:
    - "Sliding Window"
  tags:
    - "string"
    - "fixed-window"
    - "frequency-array"
    - "anagram"
    - "permutation-check"
---

# Permutation in String

## 1. Problem Statement

Given two strings `s1` and `s2`, return `true` if `s2` contains a substring that is a **permutation** of `s1`.

In other words, return `true` if there exists a contiguous substring of `s2` with the **same character counts** as `s1`.

Otherwise, return `false`.

---

## 2. Clarifying Questions (Interview Thinking)

- Are we checking a substring (contiguous)? → **Yes**
- Are characters lowercase English letters? → **Yes (a–z)**
- Do we need to return the substring or only boolean? → **Boolean**
- If `s1` longer than `s2`? → **Always false**

---

## 3. Constraints & Edge Cases

- `s1.length() > s2.length()` → `false`
- `s1` length 1 → check if that char exists in `s2`
- Duplicates in `s1` matter (e.g. `"aabc"`)

---

## 4. Brute Force Idea

For each substring of length `|s1|` in `s2`, count frequencies and compare with `s1`.

```text
Time: O(n * 26) per window comparison + recompute counts (often O(n*k))
Space: O(26)
```

Still too slow if you recompute per window.

---

## 5. Pattern Recognition

- We need a substring of fixed length |s1|
- Condition is based on character frequency match

**➡️ Fixed Sliding Window + Frequency Array**

---

## 6. Optimized Approach (Fixed Window)

1. Build freq array for s1 → need[26]
2. Maintain freq array for current window in s2 → window[26]
3. Slide a fixed-size window of length m = s1.length() across s2:
   - add new right char
   - remove left char once window exceeds size m
4. If need equals win at any step → return true

Because alphabet is fixed (a–z), comparing arrays is constant time (26).

---

## 7. Time & Space Complexity

```text
Time: O(n * 26)  ≈ O(n)
Space: O(26)     ≈ O(1)
```

---

## 8. Final Code (Java)

```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if(s1.length() > s2.length()){
            return false;
        }
        int need[] = new int[26];
        int window[] = new int[26];

        for(int i=0; i < s1.length(); i++){
            need[s1.charAt(i) - 'a']++;
            window[s2.charAt(i) - 'a']++;
        }

        if (matches(need, window)) return true;

        for(int left = 0, right = s1.length(); right < s2.length(); right++, left++){
            window[s2.charAt(right) - 'a']++; // add entering character
            window[s2.charAt(left) - 'a']--; // remove leaving character

            if(matches(need, window)) return true;
        }

        return false;
    }

    private boolean matches(int array1[], int array2[]){
        for (int i=0; i < 26; i++){
            if (array1[i] != array2[i]) return false;
        }
        return true;
    }
}
```

---

## 9. Interview-Style Explanation

> “Since we only care about substrings of length |s1|, this is a fixed-size sliding window problem.  
> I track character counts for s1 and for the current window in s2 using arrays of size 26.  
> As the window slides, I update counts in O(1) and compare the two arrays.  
> If they ever match, s2 contains a permutation of s1.”

---

## 10. Common Mistakes

- Using variable window (this is fixed)
- Forgetting to remove the left character when sliding
- Ignoring duplicates in s1
- Comparing maps/arrays incorrectly
