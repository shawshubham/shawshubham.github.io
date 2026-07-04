---
title: "Backtracking (Decision Tree) ✅"
description: "Learn backtracking as systematic state-space exploration. Understand decision trees, recursive state modeling, choose-explore-undo flow, pruning, decomposition strategies, and how to recognize different categories of backtracking interview problems."
keywords:
  - backtracking decision tree
  - recursive state space
  - choose explore undo
  - recursion backtracking
  - decision tree recursion
  - backtracking patterns
  - coding interview backtracking
  - recursive decomposition
  - recursive state modeling
weight: 4
date: 2026-02-12
layout: "topic-content"
---

# Backtracking (Decision Tree) – Systematic State Space Exploration

---

## 1. Why Backtracking Matters

---

Many interview problems require:

- exploring all possibilities,
- trying multiple decisions,
- generating valid configurations,
- or searching through large state spaces.

Examples:

- subsets,
- combinations,
- permutations,
- palindrome partitioning,
- restore IP addresses,
- N-Queens,
- Sudoku,
- word search.

These problems are usually NOT about:

```text
linear traversal
```

Instead they involve:

```text
systematic exploration of possible decisions
```

This is the core idea behind:

```text
Backtracking
```

---

## 2. What Is Backtracking REALLY?

---

Most beginners think backtracking means:

```text
recursive function calls
```

But recursion itself is NOT the pattern.

The actual idea is:

```text
exploring a state space systematically
```

through:

```text
choices
→ recursive exploration
→ undoing temporary state
```

Backtracking is essentially:

```text
DFS over a decision tree
```

---

## 3. The Decision Tree Mental Model (MOST IMPORTANT)

---

Every backtracking problem can be visualized as:

```text
a decision tree
```

Each recursive call represents:

```text
one decision state
```

Each branch represents:

```text
one possible choice
```

---

## Example – Subsets

---

```text
nums = [1,2]
```

Decision tree:

```text
                    []
               /           \
           take 1         skip 1
            [1]              []
          /     \          /     \
      take2   skip2    take2   skip2
      [1,2]    [1]      [2]      []
```

At every level:

```text
make one decision
```

---

## Example – Permutations

---

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
```

At every level:

```text
choose next unused element
```

---

## 4. The Core Backtracking Pattern

---

Most backtracking solutions follow:

```text
choose
→ explore recursively
→ undo state
```

Canonical structure:

```java
choose candidate

backtrack(next state)

undo candidate
```

This is often called:

```text
choose → explore → undo
```

---

## 5. Why Undo Is Necessary

---

Backtracking usually reuses:

```text
the same mutable state object
```

Examples:

- List
- StringBuilder
- visited[]
- board state

Without undoing:

```text
state leaks into other recursive branches
```

causing incorrect results.

---

## Example

---

```java
path.add(nums[i]);

backtrack(...);

path.remove(path.size() - 1);
```

Undo restores:

```text
clean state for next branch
```

---

## 6. The REAL Skill – Recursive State Modeling

---

Most recursion difficulty is NOT syntax.

The hardest part is:

```text
identifying recursive state
```

Every recursive call must represent:

```text
some smaller state of the problem
```

---

## Common Recursive State Variables

---

| State Variable | Meaning                     |
| -------------- | --------------------------- |
| index          | current processing position |
| path           | current partial solution    |
| visited[]      | which elements already used |
| target         | remaining target            |
| currentSum     | accumulated state           |
| board          | current board configuration |
| partition      | current split/composition   |

---

## 7. Base Case Thinking (VERY IMPORTANT)

---

Most beginners struggle with:

```text
base cases
```

because they try to memorize them.

Instead think:

```text
When is one complete valid solution formed?
```

THAT becomes the base case.

---

## Examples

---

### Subsets

```java
if(index == nums.length)
```

Meaning:

```text
No more decisions remain.
```

---

### Permutations

```java
if(path.size() == nums.length)
```

Meaning:

```text
One full ordering completed.
```

---

### Combination Sum

```java
if(target == 0)
```

Meaning:

```text
One valid combination found.
```

---

### Restore IP Addresses

```java
if(index == s.length() && parts.size() == 4)
```

Meaning:

```text
Entire string consumed with 4 valid parts.
```

---

## 8. Different Types of Backtracking Problems

---

This distinction is EXTREMELY important.

Many recursive problems look similar syntactically:

```java
choose
recurse
undo
```

But their actual reasoning models differ.

---

## Type 1 — Choose / Skip Problems

---

Examples:

- subsets
- combinations

Mental model:

```text
Should I include this choice?
```

State usually includes:

```text
index + path
```

---

## Type 2 — Ordering Problems

---

Examples:

- permutations

Mental model:

```text
Which unused element comes next?
```

State usually includes:

```text
path + visited[]
```

---

## Type 3 — Fixed Position Choice Problems

---

Examples:

- letter combinations of a phone number

Mental model:

```text
Choose one option for current position.
```

State usually includes:

```text
index + path
```

---

## Type 4 — Partitioning / Composition Problems

---

Examples:

- restore IP addresses
- palindrome partitioning

Mental model:

```text
Split into valid pieces.
```

State usually includes:

```text
index + current partition
```

---

## Type 5 — Constraint Search Problems

---

Examples:

- N-Queens
- Sudoku

Mental model:

```text
Place candidate if valid.
```

These usually require:

- heavy pruning,
- validation checks,
- state constraints.

---

## 9. Pruning – The Most Important Optimization

---

Backtracking can become exponentially expensive.

So we often stop exploring:

```text
invalid branches early
```

This is called:

```text
pruning
```

---

## Examples of Pruning

---

### Combination Sum

```java
if(target < 0) {
    return;
}
```

---

### Restore IP Addresses

```java
if(part > 255) {
    continue;
}
```

---

### Duplicate Skipping

```java
if(i > start && nums[i] == nums[i - 1]) {
    continue;
}
```

---

## 10. Generic Backtracking Template

---

```java
void backtrack(state) {

    if(valid solution formed) {
        add answer;
        return;
    }

    for(each possible choice) {

        choose

        backtrack(next state)

        undo choice
    }
}
```

This is NOT rigid syntax.

It is:

```text
mental structure
```

---

## 11. Complexity Intuition

---

Most backtracking problems are exponential.

A useful mental model:

```text
Time Complexity
≈
(branching factor) ^ (recursion depth)
```

---

## Example – Subsets

Choices per level:

```text
2
```

Depth:

```text
n
```

Complexity:

```text
O(2^n)
```

---

## Example – Permutations

Choices:

```text
n × (n-1) × (n-2)...
```

Complexity:

```text
O(n!)
```

---

## 12. Common Beginner Mistakes

---

### 1. Incorrect Recursive State

Most common problem.

Usually caused by:

```text
unclear decomposition
```

---

### 2. Missing Undo Step

Causes:

```text
state corruption
```

---

### 3. Wrong Base Case

Most base-case bugs come from:

```text
not knowing when a valid solution is complete
```

---

### 4. Reusing Mutable Objects Incorrectly

Wrong:

```java
result.add(path);
```

Correct:

```java
result.add(new ArrayList<>(path));
```

---

### 5. Forgetting Pruning

Can cause:

```text
massive unnecessary recursion
```

---

## 13. How Interviewers Evaluate Backtracking

---

Interviewers usually look for:

- recursive state clarity,
- decomposition quality,
- proper branching,
- valid pruning,
- clean state cleanup,
- recursive reasoning.

The most important skill is usually:

```text
state modeling
```

NOT syntax.

---

## 🧠 Quick Mental Triggers

If the problem says:

```text
Generate all possible...
Find all valid arrangements...
Explore all combinations...
Split into valid parts...
Try all possibilities...
```

👉 Think:

```text
Backtracking / Decision Tree Exploration
```

---

## 🔗 Practice Problems (CoderPad Style)

To build strong backtracking intuition, practice in progression order.

**👉 [Backtracking – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply Backtracking filters)_

---

### ✅ Phase 1 — Fundamental Decision Trees

Focus:

- recursive branching
- recursive state modeling
- choose/explore/undo flow

---

#### 1. Subsets

**LeetCode:** https://leetcode.com/problems/subsets/

Focus:

- choose/skip recursion
- decision tree basics

---

#### 2. Combinations

**LeetCode:** https://leetcode.com/problems/combinations/

Focus:

- forward-only recursive exploration
- controlled branching

---

#### 3. Permutations

**LeetCode:** https://leetcode.com/problems/permutations/

Focus:

- ordering exploration
- visited-state management

---

### ✅ Phase 2 — Composition / Partitioning

Focus:

- recursive splitting
- recursive compositions
- partition validation

---

#### 4. Restore IP Addresses

**LeetCode:** https://leetcode.com/problems/restore-ip-addresses/

Focus:

- recursive partitioning
- segment validation
- composition state

---

#### 5. Palindrome Partitioning

**LeetCode:** https://leetcode.com/problems/palindrome-partitioning/

Focus:

- recursive splitting
- recursive composition building

---

### ✅ Phase 3 — Constraint Search

Focus:

- pruning
- validation-driven recursion
- state constraints

---

#### 6. N-Queens

**LeetCode:** https://leetcode.com/problems/n-queens/

Focus:

- board-state constraints
- pruning invalid placements

---

#### 7. Word Search

**LeetCode:** https://leetcode.com/problems/word-search/

Focus:

- DFS + backtracking
- path-state management

---

### 🚦 After This Point

Once backtracking becomes intuitive:

- recursive decomposition becomes easier,
- DFS becomes much more natural,
- recursive state modeling improves dramatically,
- and dynamic programming becomes easier later.

You are then ready for:

- Graph DFS
- Graph BFS
- Tree DFS
- Dynamic Programming
- Constraint Optimization Problems

---

## Key Takeaway

> Backtracking is not random recursion —
> it is systematic exploration of a decision space.

The core mental model is:

```text
choose
→ explore recursively
→ undo state
```

Once recursive state modeling becomes natural,
most backtracking problems become variations of the same underlying framework.

---

## 🔗 What’s Next?

The next major pattern shifts from recursive decision trees to traversal of connected structures.

Up next:

**👉 Graph Representation & Traversal Foundations**
