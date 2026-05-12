---
title: "Permutations ✅"
description: "Learn permutation backtracking patterns through recursive ordering, visited-state management, swapping techniques, and decision-tree exploration. Understand how permutations differ fundamentally from combinations and subsets in coding interviews."
keywords:
  - permutations backtracking
  - permutation recursion
  - backtracking permutations
  - visited array recursion
  - recursion ordering problems
  - decision tree recursion
  - coding interview backtracking
  - permutation generation
  - state space exploration
weight: 3
date: 2026-02-11
layout: "topic-content"
---

# Permutations – Exploring Ordered Arrangements

---

## 1. Why Permutations Matter

---

Many interview problems require:

- arranging elements,
- exploring order-sensitive possibilities,
- generating sequences,
- or trying all possible orderings.

Examples:

- permutations,
- next permutation,
- palindrome permutations,
- task ordering,
- DFS path generation,
- arrangement exploration.

These problems are fundamentally different from:

```text
subsets
```

or:

```text
combinations
```

because:

```text
order now matters
```

This creates a more complex recursive state space.

---

## 2. Subsets vs Combinations vs Permutations

---

Understanding this distinction is extremely important.

| Pattern      | Order Matters? | Reuse Allowed? | Example                    |
| ------------ | -------------- | -------------- | -------------------------- |
| Subsets      | No             | No             | [1,2] same as [2,1]        |
| Combinations | No             | Usually No     | choose k elements          |
| Permutations | YES            | Usually No     | [1,2] different from [2,1] |

---

## 3. The Major Mental Shift

---

Subsets and combinations mostly focused on:

```text
should I take this element?
```

Permutations focus on:

```text
which element should I place next?
```

This changes recursion significantly.

Instead of:

```text
forward-only exploration
```

we now explore:

```text
all remaining unused choices
```

---

## 4. The Decision Tree Mental Model

---

Example:

```text
nums = [1,2,3]
```

Decision tree:

```text
                    []
          /            |            \
         1             2             3
      /    \        /    \        /    \
     2      3      1      3      1      2
    /        \    /        \    /        \
   3          2  3          1  2          1
```

Final permutations:

```text
[1,2,3]
[1,3,2]
[2,1,3]
[2,3,1]
[3,1,2]
[3,2,1]
```

Every recursive level chooses:

```text
which unused number comes next
```

---

## 5. Core Recursive State

---

Every recursive call needs:

- current permutation path,
- visited state.

State representation:

```java
path
visited[]
```

---

## 6. Why Visited Array Is Needed

---

Unlike combinations:

```text
we can revisit earlier indices later
```

Example:

```text
[2,1,3]
```

Even though:

```text
1 comes before 2 in the array
```

we still need to allow:

```text
2 first
```

So:

```text
start-index restriction no longer works
```

Instead we track:

```text
which elements are already used
```

---

## 7. Base Case

---

Base condition:

```java
if(path.size() == nums.length)
```

Meaning:

```text
A complete ordering has been formed.
```

At this point:

```text
one valid permutation is complete
```

---

## 8. Backtracking Flow

---

For every recursive level:

### Step 1

Choose an unused element.

### Step 2

Add it to current path.

### Step 3

Mark as visited.

### Step 4

Explore recursively.

### Step 5

Undo state.

---

## 9. Full Permutations Code

---

```java
class Solution {

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);

        return result;
    }

    private void backtrack(
            int[] nums,
            List<Integer> path,
            boolean[] visited,
            List<List<Integer>> result) {

        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (visited[i]) {
                continue;
            }

            path.add(nums[i]);
            visited[i] = true;

            backtrack(nums, path, visited, result);

            visited[i] = false;
            path.remove(path.size() - 1);
        }
    }
}
```

---

## 10. Dry Run (VERY IMPORTANT)

---

Example:

```text
nums = [1,2]
```

Initial:

```text
path = []
visited = [false, false]
```

---

### Choose 1

```text
path = [1]
visited = [true, false]
```

Recursive call.

---

### Choose 2

```text
path = [1,2]
visited = [true, true]
```

Base case reached.

Add:

```text
[1,2]
```

---

### Undo 2

```text
path = [1]
visited = [true, false]
```

---

### Undo 1

```text
path = []
visited = [false, false]
```

---

### Choose 2

Continue exploring remaining tree.

---

## 11. Why Undo Is Critical

---

Without undoing:

```text
state leaks across branches
```

Incorrect states remain while exploring:

```text
other permutations
```

Backtracking only works because:

```text
each branch starts from a logically clean state
```

---

## 12. Time Complexity

---

Total permutations:

```text
n!
```

Work per permutation:

```text
O(n)
```

Final complexity:

```text
O(n! × n)
```

---

## 13. Space Complexity

---

Recursive depth:

```text
O(n)
```

Visited array:

```text
O(n)
```

Result storage dominates overall output complexity.

---

## 14. Common Beginner Mistakes

---

### 1. Forgetting Undo Step

Very common.

Causes:

```text
corrupted recursive state
```

---

### 2. Forgetting visited[i] = false

This permanently blocks future branches.

---

### 3. Adding Same List Reference

Wrong:

```java
result.add(path);
```

Correct:

```java
result.add(new ArrayList<>(path));
```

Because:

```text
path keeps changing later
```

---

### 4. Using Start Index Like Combinations

Very important distinction.

Combinations:

```text
move only forward
```

Permutations:

```text
can choose any unused element
```

---

## 15. Permutations II – Duplicate Handling

---

When duplicates exist:

```text
[1,1,2]
```

additional pruning is required.

Common strategy:

- sort array first,
- skip duplicate branches carefully.

This becomes a more advanced backtracking variation.

---

## 16. Important Pattern Distinction

---

Permutations are NOT:

```text
recursive decomposition problems
```

They are:

```text
state-space ordering exploration problems
```

This is why:

- state management,
- visited tracking,
- and branch isolation

become critically important.

---

## 17. How Interviewers Evaluate Permutation Problems

---

Interviewers mainly look for:

- recursive state clarity,
- correct visited handling,
- proper undo flow,
- clean recursion structure,
- understanding of ordering exploration.

The hardest part is usually:

```text
managing recursive state correctly
```

NOT syntax.

---

## 🧠 Quick Mental Trigger

If the problem says:

```text
Generate all arrangements...
Generate all orderings...
Find all possible sequences...
```

👉 Think:

```text
Permutations
```

---

## 🔗 Practice Problems (CoderPad Style)

To build strong permutation intuition, practice in progression order.

**👉 [Permutation – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply Permutations / Backtracking filters)_

---

### ✅ Phase 1 — Basic Permutation Generation

Focus:

- visited state
- ordering exploration
- recursive branch isolation

---

#### 1. Permutations

**LeetCode:** https://leetcode.com/problems/permutations/

Focus:

- visited array
- recursive ordering
- backtracking state management

---

#### 2. Permutations II

**LeetCode:** https://leetcode.com/problems/permutations-ii/

Focus:

- duplicate pruning
- sorted recursion
- branch skipping

---

### ✅ Phase 2 — Constraint-Based Ordering

Focus:

- ordering restrictions
- recursive validation
- pruning invalid branches

---

#### 3. Letter Combinations of a Phone Number

**LeetCode:** https://leetcode.com/problems/letter-combinations-of-a-phone-number/

Focus:

- recursive branching
- character decision tree
- state-space generation

---

#### 4. Palindrome Partitioning

**LeetCode:** https://leetcode.com/problems/palindrome-partitioning/

Focus:

- recursive partition exploration
- branching recursion
- recursive state growth

---

### 🚦 After This Point

Once permutations become intuitive:

- recursive state management improves significantly,
- decision-tree visualization becomes natural,
- and advanced backtracking becomes much easier.

You are then ready for:

- Advanced Backtracking
- N-Queens
- Sudoku Solver
- DFS on Graphs
- Constraint Search Problems

---

## Key Takeaway

> Permutations are not about selecting elements —
> they are about arranging elements in every possible valid order.

The most important mental model is:

```text
Choose unused element
→ explore recursively
→ undo state
```

Once this becomes intuitive,
complex recursive search problems become dramatically easier.

---

## 🔗 What’s Next?

The next article generalizes all previous recursive exploration patterns into a unified framework for solving complex search-space problems systematically.

Up next:

**👉 Backtracking (Decision Tree) – Systematic State Space Exploration**
