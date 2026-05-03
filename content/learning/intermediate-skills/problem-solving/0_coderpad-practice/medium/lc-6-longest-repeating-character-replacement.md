---
title: "Longest Repeating Character Replacement"
layout: "code-solution-content"
date: 2026-02-09
toc_hide: true

problem:
  id: "lc-6"
  source: "LeetCode"
  url: "https://leetcode.com/problems/longest-repeating-character-replacement/"
  difficulty: "Medium"
  learningPhase: "Stretch"
  corePatterns:
    - "Sliding Window"
  tags:
    - "string"
    - "sliding-window"
    - "variable-window"
    - "frequency-tracking"
    - "at-most-k"
---

# LeetCode Problem: Longest Repeating Character Replacement

## 1. Problem Statement

You are given a string `s` and an integer `k`.

You can replace at most `k` characters in the string so that the resulting substring contains **only one repeating character**.

Return the **length of the longest possible substring** after performing at most `k` replacements.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Is the substring required to be contiguous? → **Yes**
- Can we replace characters arbitrarily? → **Yes, up to `k`**
- Do we return the substring or its length? → **Length**
- Are characters uppercase only? → **Yes (A–Z)**

---

## 3. Constraints & Edge Cases

- Empty string → return `0`
- `k = 0` → longest block of identical characters
- `k >= s.length()` → entire string can be made uniform
- Large input → must be linear time

---

## 4. Brute Force Idea

Try all substrings and compute how many replacements are needed.

```text
Time: O(n³) (substrings + counting)
Space: O(1)
```

Correct but infeasible.

---

## 5. Pattern Recognition

Key observations:

- We are dealing with **substrings** → contiguous
- Validity depends on a constraint:  
  `window size - max frequency <= k`
- We want the **longest** valid window

**➡️ Sliding Window (Variable Size) with Frequency Tracking**

---

## 6. Optimized Approach (Sliding Window)

Maintain a window [left, right] and:

- a frequency array of characters in the window
- maxFreq: the highest frequency of any single character in the window

Window validity rule:

```text
windowSize - maxFreq <= k
```

Algorithm:

- Expand right, update frequency and maxFreq
- If the window becomes invalid:
  - shrink from the left
- Track the maximum valid window size

📌 Note: maxFreq is **not decreased** when shrinking the window.
This is intentional and still correct.

### Time & Space Complexity

```text
Time: O(n)
Space: O(1)   // fixed alphabet (26 letters)
```

---

## 7. Final Code (Java)

### Recommended Solution — Frequency Array (Best for A–Z)

Because the input contains only uppercase English letters (`A–Z`), we can track counts using an `int[26]`.  
This keeps space usage **constant O(1)** and is faster than a `HashMap`.

```java
class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            int idx = s.charAt(right) - 'A';
            freq[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, freq[idx]);

            int windowSize = right - left + 1;
            if (windowSize - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

#### Why This Works

A window is valid if we can make all characters the same using at most k replacements:

```text
(window size - count of most frequent character) <= k
```

We expand the window greedily and shrink only when invalid.  
Each character enters and leaves the window at most once → **O(n)** time.

### Alternative — HashMap Version (More General, Slightly Heavier)

If the character set were unknown or not limited (e.g., Unicode), a HashMap is a good general solution.  
Here it works, but is less efficient than the fixed array approach.

```java
class Solution {
    public int characterReplacement(String s, int k) {
        int left = 0 , maxFreq = 0, maxLength = 0;
        Map<Character, Integer> freqMap = new HashMap<>();

        for(int right = 0; right < s.length(); right++){
            char character = s.charAt(right);
            freqMap.put(character, freqMap.getOrDefault(character, 0) + 1);

            maxFreq = Math.max(maxFreq, freqMap.get(character));

            int windowSize = right - left + 1;
            if(windowSize - maxFreq > k){
                freqMap.put(s.charAt(left), freqMap.get(s.charAt(left)) - 1);
                left++;
            }

            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}
```

#### Space Note

- With A–Z, the frequency array uses O(1) space.
- With HashMap, space is O(Σ) where Σ is the number of distinct characters in the window  
  (still bounded by a constant for A–Z, but with extra hashing overhead).

---

## 8. Interview-Style Explanation

> “I use a sliding window and track character frequencies.  
> The window is valid if the number of characters to replace  
> (window size - max frequency) is at most k.  
> I expand the window greedily and shrink only when the constraint is violated.  
> Each character is processed once, so the solution is linear.”

---

## 9. Common Mistakes

- Recomputing maxFreq on every shrink (unnecessary)
- Using a hashmap instead of a fixed array for A–Z
- Resetting the window instead of sliding it
- Forgetting the validity condition

### What This Problem Teaches (Why It’s Phase-2)

- Sliding Window with a **tolerance**
- Validity based on a **derived metric**
- Why some values (like `maxFreq`) can be **stale but safe**
- Strong interview signal for reasoning under constraints
