---
title: "Baseball Game"
description: "Learn how to use a stack to simulate history-based operations like undo, double, and sum of previous values. A core stack problem that builds intuition for state tracking in coding interviews."
keywords:
  - baseball game leetcode
  - stack simulation problem
  - stack undo redo pattern
  - history based stack problems
  - coding interview stack fundamentals
layout: "code-solution-content"
date: 2026-02-10
toc_hide: true

problem:
  id: "lc-13"
  source: "LeetCode"
  url: "https://leetcode.com/problems/baseball-game/"
  difficulty: "Easy"
  learningPhase: "Core"
  corePatterns:
    - "Stack"
  tags:
    - "stack"
    - "simulation"
    - "history"
    - "undo-redo"
---

# LeetCode Problem: Baseball Game

## 1. Problem Statement

You are given a list of strings `operations`, where each string is one of the following:

- An integer `x` → record a new score `x`
- `"+"` → record a new score that is the **sum of the previous two scores**
- `"D"` → record a new score that is **double the previous score**
- `"C"` → invalidate and remove the **previous score**

Return the sum of all scores after processing all operations.

---

## 2. Clarifying Questions (Interview Thinking)

- Are operations always valid? (e.g., `"+"` will have at least two previous scores) → **Yes**
- Can scores be negative? → **Yes**
- Do we return a single integer sum? → **Yes**

---

## 3. Constraints & Edge Cases

- Mix of positive and negative scores
- `"C"` removes last score, affecting future `"+"` and `"D"`
- Input can be small or large — want O(n)

---

## 4. Naive Idea

Keep recomputing totals by rescanning after each operation.

```text
Time: O(n²)
```

Unnecessary.

---

## 5. Pattern Recognition

This is a history tracking problem.

Operations like "C" (undo) and "+" (depends on last two) strongly suggest:

**➡️ Stack = record past scores that are still valid.**

---

## 6. Optimized Approach (Stack Simulation)

Maintain a stack of valid scores:

- If integer → push it
- If "D" → push 2 \* top
- If "+" → push top + secondTop (without losing them)
- If "C" → pop

Finally, sum stack elements.

---

## 7. Time & Space Complexity

```text
Time:  O(n)
Space: O(n)
```

---

## 8. Final Code (Java)

```java
import java.util.*;

class Solution {
    public int calPoints(String[] operations) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (String op : operations) {
            if (op.equals("C")) {
                stack.pop();
            } else if (op.equals("D")) {
                stack.push(2 * stack.peek());
            } else if (op.equals("+")) {
                int first = stack.pop();
                int second = stack.peek();
                int sum = first + second;
                stack.push(first);     // restore
                stack.push(sum);       // add new score
            } else {
                stack.push(Integer.parseInt(op));
            }
        }

        int total = 0;
        for (int score : stack) total += score;
        return total;
    }
}
```

---

## 9. Interview-Style Explanation

> “I use a stack to store the valid scores so far.  
> Each operation only depends on the most recent one or two scores, which the stack top gives me in O(1).  
> ‘C’ is just undo (pop), and at the end I sum the stack.”

---

## 10. Common Mistakes

- Forgetting to restore values when handling "+"
- Not considering negative scores
- Using an array and manually shifting values (unnecessary)
- Summing repeatedly inside the loop instead of once at the end (optional improvement)

---

## 11. Key Takeaway

A stack is perfect when the problem needs **history**, especially with undo-like operations.
