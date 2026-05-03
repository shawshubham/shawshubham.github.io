---
title: "Minimum Window Substring"
description: "Learn how to solve the Minimum Window Substring problem using a precise sliding window strategy. Understand why this problem is difficult, how window validity must be tracked incrementally, and how to implement a correct interview-ready solution."
keywords:
  - minimum window substring
  - sliding window hard problem
  - substring covering problem
  - coderpad string problems
  - interview sliding window
layout: "code-solution-content"
date: 2026-02-09
toc_hide: true

problem:
  id: "lc-7"
  source: "LeetCode"
  url: "https://leetcode.com/problems/minimum-window-substring/"
  difficulty: "Hard"
  learningPhase: "Advanced"
  corePatterns:
    - "Sliding Window"
  tags:
    - "string"
    - "sliding-window"
    - "variable-window"
    - "frequency-tracking"
    - "precise-shrinking"
    - "covering-substring"
---

# LeetCode Problem: Minimum Window Substring

## 1. Problem Statement

Given two strings `s` and `t`, return the **minimum window substring** of `s` such that **every character in `t` (including duplicates)** is included in the window.

If no such substring exists, return an empty string `""`.

---

## 2. Why This Problem Is Hard

This problem looks similar to other sliding window questions — but it is **fundamentally different**.

Most sliding window problems ask:

- _longest_ valid window
- _at most k_ violations

This one asks for:

- the **shortest** valid window
- **exact frequency matching**
- **precise shrinking**

The difficulty is **not expanding the window** —  
the difficulty is **knowing exactly when shrinking breaks validity**.

---

## 3. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Is the substring contiguous? → **Yes**
- Do duplicates in `t` matter? → **Yes**
- If multiple windows exist? → **Return the shortest**
- If no window exists? → **Return empty string**

---

## 4. Initial Intuition (Correct but Incomplete)

A natural first thought is:

1. Count character frequencies in `t`
2. Expand a window over `s`
3. Track current frequencies
4. Once all required characters are present:
   - shrink from the left
   - update the minimum window

This intuition is **correct**.

However, the mistake many people (including myself) make is trying to:

- recompute validity repeatedly, or
- scan the target map again and again during shrinking

That approach quickly becomes fragile and error-prone.

---

## 5. The Core Insight: Incremental Validity

The key idea is:

> **Window validity must be tracked incrementally — not recomputed.**

We do this using two counters:

- `required` → number of distinct characters in `t`
- `formed` → number of characters that currently meet their required frequency in the window

### Validity Condition

```text
formed == required
```

This condition changes **only when frequencies cross a boundary**, not on every iteration.

---

## 6. Sliding Window Strategy

### Step-by-step approach:

1. Build a frequency map of `t`
2. Expand `right` pointer:
   - update current window frequencies
   - increment `formed` only when a character reaches required count
3. Once window is valid:
   - shrink from `left` as much as possible
   - update the best (minimum) window
4. Stop shrinking when validity breaks
5. Continue expanding

---

## 7. Time & Space Complexity

```java
Time: O(|s| + |t|)
Space: O(Σ) // number of distinct characters
```

Each character is added and removed from the window at most once.

---

## 8. Final Code (Java)

```java
class Solution {
    public String minWindow(String s, String t) {
        // Edge conditions
        if(s == null || t == null ||  t.isEmpty() || s.length() < t.length() ) {
            return "";
        }

        // Frequency map for target string
        Map<Character, Integer> need = new HashMap<>();
        for(char character : t.toCharArray()){
            need.put(character, need.getOrDefault(character, 0) + 1);
        }

        Map<Character, Integer> window = new HashMap<>();
        int required = need.size();
        int formed = 0;

        int left = 0;
        int right = 0;
        int bestLength = Integer.MAX_VALUE;
        int bestStartIndex = 0;

        while(right < s.length()){
            char character = s.charAt(right);
            window.put(character, window.getOrDefault(character, 0) + 1);

            // If this char is needed and we just met the required count, increase formed
            if (need.containsKey(character) && window.get(character).intValue() == need.get(character).intValue()){
                formed++;
            }

            // Try shrining while window is valid
            while(left <= right && formed == required) {
                int windowLength = right - left + 1;
                if (windowLength < bestLength) {
                    bestLength = windowLength;
                    bestStartIndex = left;
                }

                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);

                // Character fell below required frequency
                if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                    formed--;
                }
                left++;
            }
            right++;
        }

        return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStartIndex, bestStartIndex + bestLength);
    }
}
```

---

## 9. Interview-Style Explanation

> “I expand a sliding window and track character frequencies.  
> A window becomes valid once it covers all required characters with correct counts.  
> When valid, I shrink it from the left as much as possible while preserving validity,  
> updating the minimum window during shrinking.  
> This guarantees linear time complexity.”

---

## 10. Common Mistakes

- Recomputing validity on every iteration
- Using equality checks incorrectly for frequency
- Shrinking without updating formed
- Creating substrings repeatedly inside loops
- Treating this like a ‘longest window’ problem

---

## 11. Key Takeaway

Minimum Window Substring is **not about tricks**.

It tests:

- invariant thinking
- precise shrinking
- disciplined state tracking

Struggling with this problem is normal.
Understanding why it works is what actually matters.
