---
title: "Subsets & Combinations ✅"
description: "Learn how recursive decision trees generate subsets and combinations systematically. Understand include/exclude decisions, recursive branching, state-space exploration, and how these patterns build the foundation for backtracking."
keywords:
  - subsets recursion
  - combinations recursion
  - include exclude recursion
  - recursive decision tree
  - backtracking basics
  - recursion patterns
  - coding interview recursion
  - problem solving patterns
weight: 2
date: 2026-02-09
layout: "topic-content"
---

# Subsets & Combinations – Recursive Decision Making

---

## 1. Why Subsets & Combinations Matter

---

Many interview problems involve:

- generating all possible selections,
- exploring valid choices,
- selecting some elements while skipping others,
- or exploring every possible configuration.

These problems appear in:

- backtracking,
- recursion,
- DFS,
- combinatorics,
- and state-space exploration.

The key challenge is:

```text
How do we systematically explore all possibilities
without missing or duplicating states?
```

Subsets and combinations teach the foundational idea behind:

```text
recursive decision trees
```

---

## 2. The Core Insight

---

At every recursive level:

```text
We make a decision.
```

Typically:

```text
Take the current element
OR
Skip the current element
```

This creates:

```text
branching recursion
```

Each recursive branch represents:

```text
a possible state
```

---

## 3. What Are Subsets?

---

A subset means:

```text
Any possible selection of elements.
```

Example:

```text
[1,2]
```

Subsets:

```text
[]
[1]
[2]
[1,2]
```

Notice:

```text
Every element has two choices:
- include
- exclude
```

This naturally forms:

```text
binary recursion
```

---

## 4. What Are Combinations?

---

Combinations are similar to subsets,
but usually involve:

```text
constraints
```

Examples:

- choose k elements
- combination sum
- target-based selection

The recursive idea remains similar:

```text
make a choice
→ recurse
→ backtrack
```

---

## 5. The Recursive Decision Tree

---

This is the MOST IMPORTANT concept.

Suppose:

```text
nums = [1,2]
```

Decision tree:

```text
                []
              /    \
           take1   skip1
           /           \
      [1]               []
      /  \             /  \
 take2 skip2      take2 skip2
  /       \         /      \
[1,2]    [1]      [2]      []
```

Every recursive level:

```text
represents a decision
```

Every path:

```text
represents one valid answer
```

---

## 6. Recursive Thinking

---

Suppose:

```text
subsets(index)
```

At each index:

```text
1. choose current element
2. do not choose current element
```

Then recurse for:

```text
next index
```

This creates:

```text
complete state-space exploration
```

---

## 7. Minimal Example – Generate All Subsets

---

### Problem

```text
Given an array,
generate all subsets.
```

---

### Recursive Decomposition

For every element:

```text
Take it
OR
Skip it
```

---

### Code

```java
class Solution {

    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        backtrack(0, nums, new ArrayList<>(), result);

        return result;
    }

    private void backtrack(
        int index,
        int[] nums,
        List<Integer> current,
        List<List<Integer>> result
    ) {

        if (index == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }

        // take current element
        current.add(nums[index]);
        backtrack(index + 1, nums, current, result);

        // undo choice
        current.remove(current.size() - 1);

        // skip current element
        backtrack(index + 1, nums, current, result);
    }
}
```

---

## 8. Understanding Backtracking Cleanup

---

This line is extremely important:

```java
current.remove(current.size() - 1);
```

Why?

Because:

```text
Recursive branches share mutable state.
```

So after exploring:

```text
"take"
```

we must:

```text
undo the choice
```

before exploring:

```text
"skip"
```

This is:

```text
Backtracking cleanup
```

---

## 9. Why the Pattern Works

---

Subsets/combinations work because:

- recursive branches systematically explore decisions,
- every recursive path represents one possibility,
- recursion naturally models branching states.

📌 The recursion tree guarantees:

```text
complete exploration
```

without missing states.

---

## 10. Time Complexity Intuition

---

Suppose:

```text
n elements
```

Each element has:

```text
2 choices
```

So total states:

```text
2ⁿ
```

This is why subsets problems often have:

```text
O(2ⁿ)
```

complexity.

---

## 11. Subsets vs Permutations

---

This distinction is VERY important.

---

### Subsets / Combinations

Focus:

```text
selection
```

Order usually does NOT matter.

Example:

```text
[1,2]
=
[2,1]
```

considered same.

---

### Permutations

Focus:

```text
ordering
```

Example:

```text
[1,2]
≠
[2,1]
```

Permutations require:

```text
visited-state tracking
```

which we will cover separately.

---

## 12. Common Mistakes to Avoid

---

Subsets/combinations problems fail most often due to:

- forgetting backtracking cleanup,
- incorrect base condition,
- shared mutable state bugs,
- duplicate generation,
- modifying the same list reference.

📌 This line is critical:

```java
new ArrayList<>(current)
```

Without copying:

```text
all answers point to same list object
```

---

## 13. How Interviewers Evaluate These Problems

---

Interviewers look for:

- recursive decomposition clarity,
- decision-tree understanding,
- clean state management,
- correct backtracking cleanup,
- duplicate handling.

Naming the pattern is optional —
understanding recursive branching is not.

---

## 🧠 Quick Mental Trigger

If you can say:

```text
"At every step,
I must decide whether to choose something or not"
```

👉 Think:

```text
Subsets / Combinations
```

---

## 🔗 Practice Problems (CoderPad Style)

To build strong recursive branching intuition, practice in progression order.

**👉 [Subsets & Combinations – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply the Backtracking / Recursion filter)_

---

### ✅ Phase 1 — Basic Decision Trees

Focus:

- include/exclude recursion,
- recursive branching,
- recursion tree visualization.

---

#### 1. Subsets

**LeetCode:** https://leetcode.com/problems/subsets/

Focus:

- include/exclude recursion
- recursive decision trees
- complete state exploration

---

#### 2. Subsets II

**LeetCode:** https://leetcode.com/problems/subsets-ii/

Focus:

- duplicate handling
- sorting before recursion
- avoiding duplicate states

---

### ✅ Phase 2 — Combination Construction

Focus:

- constrained recursion,
- partial solution building,
- recursive state propagation.

---

#### 3. Combinations

**LeetCode:** https://leetcode.com/problems/combinations/

Focus:

- choose-k recursion
- recursive branching
- bounded exploration

---

#### 4. Combination Sum

**LeetCode:** https://leetcode.com/problems/combination-sum/

Focus:

- target-based recursion
- repeated choices
- recursive pruning

---

#### 5. Combination Sum II

**LeetCode:** https://leetcode.com/problems/combination-sum-ii/

Focus:

- duplicate elimination
- recursion pruning
- controlled branching

---

### ✅ Phase 3 — Advanced Recursive Branching

Focus:

- pruning,
- deeper recursive state management,
- optimization during exploration.

---

#### 6. Letter Combinations of a Phone Number

**LeetCode:** https://leetcode.com/problems/letter-combinations-of-a-phone-number/

Focus:

- recursive branching
- state expansion
- recursive construction

---

#### 7. Restore IP Addresses

**LeetCode:** https://leetcode.com/problems/restore-ip-addresses/

Focus:

- constrained recursive splitting
- pruning invalid states
- recursive construction

---

### 🚦 After This Point

Once you are comfortable with these problems:

- recursive branching becomes natural,
- decision trees become intuitive,
- and backtracking cleanup feels predictable,

you can comfortably move into:

- Permutations
- Backtracking
- DFS state exploration
- Constraint-solving problems

At this stage, subsets/combinations should feel like:

```text
systematic recursive decision exploration
```

rather than memorized recursion templates.

---

### How to Practice (CoderPad Discipline)

Each problem page follows the same structure:

- problem understanding
- constraints & edge cases
- brute force idea
- recursive decision tree
- backtracking cleanup
- final code
- interview-style explanation

📌 **Rule:** don’t move to the next phase until you can explain:

- what decision each recursive level represents,
- how state changes across branches,
- and why cleanup is necessary.

---

## Key Takeaway

> Subsets & combinations are not about generating arrays —
> they are about exploring recursive decision trees systematically.

Once you learn recursive branching and cleanup,
backtracking problems become dramatically easier.

---

## 🔗 What’s Next?

The next pattern focuses on recursive state exploration where ordering matters.

Up next:

**👉 Permutations – Recursive Ordering & State Tracking**
