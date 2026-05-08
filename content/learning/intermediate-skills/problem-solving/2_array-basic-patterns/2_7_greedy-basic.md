---
title: "Greedy – Making the Best Local Decision ✅"
description: "Learn the Greedy pattern from first principles. Understand when greedy algorithms work, how to identify greedy problems, and how to reason about locally optimal decisions in coding interviews."
keywords:
  - greedy algorithm
  - greedy pattern
  - local optimum
  - interval scheduling
  - jump game
  - interview greedy problems
  - problem solving patterns
weight: 7
date: 2026-02-09
layout: "topic-content"
---

# Greedy – Making the Best Local Decision

---

## 1. Why the Greedy Pattern Matters

---

Many interview problems involve:

- maximizing gain,
- minimizing cost,
- scheduling efficiently,
- or making decisions step-by-step.

A brute force approach would:

- explore all possible choices,
- backtrack repeatedly,
- and often result in exponential complexity.

The Greedy pattern exists to avoid that exhaustive exploration.

When applied correctly, it lets you:

- make decisions incrementally,
- avoid revisiting previous choices,
- and solve problems efficiently.

---

## 2. What Is a Greedy Algorithm?

---

A Greedy algorithm makes the **best immediate (local) decision** at every step.

The assumption is:

```text
Local optimum → Global optimum
```

Instead of evaluating every future possibility, the algorithm commits to a choice immediately.

---

## 3. When Should You Think of Greedy?

---

Greedy is a strong candidate when:

- the problem asks for:
  - minimum,
  - maximum,
  - earliest,
  - smallest,
  - largest,
  - fewest,
- decisions can be made incrementally,
- revisiting old decisions is unnecessary,
- a locally optimal choice does not hurt future decisions.

Common interview trigger phrases:

- “minimum number of...”
- “maximum activities...”
- “can reach...”
- “earliest finish...”
- “fewest operations...”

---

## 4. Why Greedy Is Difficult

---

Greedy problems are tricky because:

```text
Not every problem allows local decisions to become globally optimal.
```

This means:

- Greedy sometimes works brilliantly,
- and sometimes fails completely.

Understanding _why_ a greedy choice is safe is more important than memorizing the solution.

---

## 5. A Simple Example Where Greedy Works

---

### Problem Shape

```text
At each step, choose the option that gives maximum future reach.
```

This appears in:

- Jump Game
- interval scheduling
- activity selection

---

### Example – Jump Game

---

Input:

```text
[2,3,1,1,4]
```

At every position:

- track the farthest reachable index,
- keep expanding reach greedily.

Why this works:

```text
More reachable distance is always better.
```

A larger reach never hurts future decisions.

---

## 6. A Simple Example Where Greedy Fails

---

### Coin Change Example

Coins:

```text
[1,3,4]
```

Target:

```text
6
```

Greedy choice:

```text
4 + 1 + 1 = 3 coins
```

Optimal answer:

```text
3 + 3 = 2 coins
```

👉 The locally best choice destroyed the globally optimal answer.

This is why Greedy must be used carefully.

---

## 7. How Greedy Differs from Dynamic Programming

---

### Greedy

```text
Take the best current decision
Never revisit it
```

### Dynamic Programming

```text
Explore multiple future possibilities
Store/reuse optimal subproblems
```

---

## 8. Common Greedy Patterns

---

### 8.1 Interval Scheduling

```text
Sort by earliest finishing time
```

Used in:

- activity selection
- meeting rooms
- interval removal

---

### 8.2 Reachability Problems

```text
Track farthest reachable position
```

Used in:

- Jump Game
- minimum jumps

---

### 8.3 Merge-Based Decisions

```text
Sort → process greedily
```

Used in:

- merge intervals
- non-overlapping intervals

---

## 9. Why the Pattern Works

---

Greedy algorithms work because:

- the problem has a **greedy-choice property**,
- locally optimal decisions remain globally safe,
- future decisions are not negatively impacted.

📌 The hardest part of Greedy is proving this property.

---

## 10. Common Mistakes to Avoid

---

Greedy solutions fail most often due to:

- assuming greedy always works,
- making irreversible decisions too early,
- confusing Greedy with Dynamic Programming,
- not proving why the local choice is safe.

📌 If a local choice can hurt future outcomes → Greedy is probably wrong.

---

## 11. How Interviewers Evaluate Greedy Solutions

---

Interviewers look for:

- correct pattern identification,
- explanation of why the local choice is safe,
- clean state tracking,
- understanding of why backtracking is unnecessary.

Naming the pattern is optional —
proving the correctness is not.

---

## 12. When Greedy Is the Wrong Choice

---

Do NOT force Greedy when:

- future decisions heavily depend on current choices,
- multiple possibilities must be explored,
- local optimum can block global optimum.

In those cases:

```text
Dynamic Programming is usually the better choice.
```

---

## 🧠 Quick Mental Trigger

---

If you can say:

```text
"Taking the best current choice never hurts future decisions"
```

👉 Think Greedy

---

## 🔗 Practice Problems (CoderPad Style)

To apply this pattern under real interview conditions, explore tagged problems in the practice section:

**👉 [Greedy – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply the Greedy filter)_

### ✅ Phase 1 — Core

- Jump Game

### ✅ Phase 2 — Stretch

- Jump Game II
- Merge Intervals

### ✅ Phase 3 — Advanced

- Gas Station
- Non-overlapping Intervals

---

## Key Takeaway

> Greedy is not about choosing quickly —
> it is about proving that a local decision remains globally safe.

Once you learn to identify the greedy-choice property,
large classes of optimization problems become dramatically simpler.

---

## 🔗 What’s Next?

The next pattern focuses on maintaining only the most useful candidates while discarding irrelevant ones.

Up next:

**👉 Monotonic Stack – Managing Ordered Candidates Efficiently**
