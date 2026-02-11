---
title: "Longest Substring Without Repeating Characters"
layout: "code-solution-content"
date: 2026-02-09
toc_hide: true

problem:
  id: "lc-5"
  source: "LeetCode"
  url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  difficulty: "Medium"
  corePatterns:
    - "Sliding Window"
  tags:
    - "string"
    - "sliding-window"
    - "variable-window"
    - "hashmap"
    - "frequency-tracking"
---

# LeetCode Problem: Longest Substring Without Repeating Characters

## 1. Problem Statement

Given a string `s`, find the length of the **longest substring** without repeating characters.

A substring is a **contiguous** sequence of characters.

Return the maximum length.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Is the input a string? → **Yes**
- Is the substring required to be contiguous? → **Yes**
- Are characters case-sensitive? → **Yes**
- What should be returned? → **Length only**
- Can characters repeat in input? → **Yes**

---

## 3. Constraints & Edge Cases

- Empty string → return `0`
- Single character → return `1`
- All unique characters → return `n`
- All repeating characters (e.g. `"aaaa"`) → return `1`

---

## 4. Brute Force Idea

Generate all substrings and check uniqueness.

```text
Time: O(n³)  (substring + uniqueness check)
Space: O(n)
```

Correct but unacceptable.

---

## 5. Pattern Recognition

Key observations:

- We are dealing with substrings → contiguous
- We want the longest valid window
- Validity depends on a constraint (no repeating characters)

**➡️ Sliding Window (Variable Size)**

---

## 6. Optimized Approach (Sliding Window)

Use two pointers to define a window [left, right].

Maintain a data structure to track characters currently in the window.

Algorithm:

- Expand right pointer character by character
- If a duplicate is found:
  - shrink the window from the left until the duplicate is removed
- At each step, update the maximum window size

Each character enters and leaves the window at most once.

### Time & Space Complexity

```text
Time: O(n)
Space: O(min(n, charset))
```

---

## 7. Final Code (Java)

### Recommended Solution — Sliding Window with Last Seen Index

This approach uses a **sliding window** and tracks the **last seen index** of each character.

Instead of shrinking the window one character at a time, we **jump the left pointer directly**
to the correct position when a duplicate is found. This makes the logic clean and efficient.

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int left = 0, maxLen = 0;
        Map<Character, Integer> freq = new HashMap<>();

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            freq.put(c, freq.getOrDefault(c, 0) + 1);

            while (freq.get(c) > 1) {
                char leftChar = s.charAt(left);
                freq.put(leftChar, freq.get(leftChar) - 1);
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

## Alternative — Sliding Window with Set

This version maintains a set of characters currently in the window and
shrinks the window **one character at a time** when a duplicate is found.

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int left = 0, right = 0, maxLen = 0;
        Set<Character> set = new HashSet<>();

        while (right < s.length()) {
            char c = s.charAt(right);

            if (!set.contains(c)) {
                set.add(c);
                right++;
                maxLen = Math.max(maxLen, right - left);
            } else {
                set.remove(s.charAt(left));
                left++;
            }
        }
        return maxLen;
    }
}
```

When to Use This Variant

- Good for explaining **basic sliding window mechanics**
- Easy to reason about for beginners
- Still runs in **O(n)** time

However, it may perform extra pointer movements compared to the first approach.

---

## 8. Interview-Style Explanation

> “I use a sliding window with two pointers.  
> The right pointer expands the window, and a hashmap tracks character frequency.  
> If a character repeats, I shrink the window from the left until the constraint is restored.  
> Each character is added and removed once, so the solution runs in linear time.”

---

## 9. Common Mistakes

- Treating it like Two Pointers instead of Sliding Window
- Forgetting to shrink the window when duplicates appear
- Resetting the window entirely instead of sliding it
- Using nested loops unnecessarily
