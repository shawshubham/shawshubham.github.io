---
title: "Basic Recursion ✅"
description: "Learn recursion from first principles. Understand call stacks, recursive decomposition, base cases, recursive trust, recursion trees, and how recursive thinking builds the foundation for backtracking, DFS, and dynamic programming."
keywords:
  - recursion basics
  - recursive thinking
  - recursion call stack
  - recursion tree
  - recursive decomposition
  - coding interview recursion
  - backtracking foundation
  - problem solving patterns
weight: 1
date: 2026-02-09
layout: "topic-content"
---

# Basic Recursion – Thinking in Self-Similar Problems

---

## 1. Why Recursion Matters

---

Many interview problems involve:

- trees,
- graphs,
- nested structures,
- divide & conquer,
- state-space exploration,
- or repeated self-similar decomposition.

While loops can solve many repetitive problems,
some problem structures become significantly cleaner when expressed recursively.

Recursion exists to solve:

```text
A large problem
by reducing it into
smaller versions of itself.
```

When understood correctly, recursion becomes the foundation for:

- DFS
- Backtracking
- Tree Traversal
- Dynamic Programming
- Divide & Conquer

---

## 2. What Is Recursion?

---

Recursion is a technique where:

```text
A function calls itself
to solve a smaller version of the same problem.
```

The key idea is:

```text
self-similar decomposition
```

Meaning:

```text
The large problem and smaller problem
have the same structure.
```

---

## 3. Normal Function Calls vs Recursive Calls

---

Understanding this distinction is extremely important.

### 3.1 Normal Function Call Flow

Example:

```text
A → B → C → return
```

Each function performs:

- some work,
- calls another function,
- waits for completion,
- and resumes.

This call chain is finite and explicit.

---

### 3.2 Recursive Call Flow

In recursion:

```text
A → A → A → A → ...
```

The function keeps calling itself with:

```text
smaller input
```

until:

```text
a stopping condition is reached
```

This stopping condition is called:

```text
Base Case
```

---

## 4. The Call Stack (VERY IMPORTANT)

---

Every recursive call creates a:

```text
new stack frame
```

containing:

- local variables,
- parameters,
- return address,
- temporary state.

Recursive calls are stored in:

```text
LIFO order (Last In First Out)
```

using the:

```text
call stack
```

---

### Example – print(3)

```java
void print(int n) {
    if (n == 0) {
        return;
    }

    System.out.println(n);
    print(n - 1);
}
```

Call flow:

```text
print(3)
 → print(2)
   → print(1)
     → print(0)
```

Then stack unwinds:

```text
print(0) returns
print(1) returns
print(2) returns
print(3) returns
```

📌 Recursive calls do NOT execute simultaneously.

They wait inside the call stack.

---

## 5. Base Case – The Most Important Rule

---

Every recursive solution MUST contain:

```text
A condition that stops recursion.
```

Without a base case:

```text
Recursion never terminates.
```

Result:

```text
StackOverflowError
```

---

### Example

```java
if (n == 0) {
    return;
}
```

This tells recursion:

```text
Stop decomposing further.
```

---

## 6. The Recursive Leap of Faith (MOST IMPORTANT CONCEPT)

---

This is the biggest conceptual breakthrough in recursion.

Most beginners try to:

```text
mentally simulate the entire recursive chain repeatedly
```

which becomes confusing quickly.

Instead, recursion requires:

```text
trusting the recursive call
```

---

### Example – Factorial

```java
int factorial(int n) {
    if (n == 1) {
        return 1;
    }

    return n * factorial(n - 1);
}
```

When writing:

```java
factorial(n - 1)
```

we assume:

```text
"The recursive call correctly solves the smaller problem."
```

This is called:

```text
Recursive Leap of Faith
```

Without this mental model,
recursion becomes extremely difficult.

---

## 7. Recursion vs Iteration

---

Recursion and iteration are both ways of expressing repetition.

But they model problems differently.

| Recursion                         | Iteration                       |
| --------------------------------- | ------------------------------- |
| self-decomposition                | repeated looping                |
| implicit call stack               | explicit state handling         |
| natural for trees/graphs          | efficient for linear repetition |
| cleaner for hierarchical problems | usually better space efficiency |

---

## 8. Why Recursion Is Useful

---

Recursion naturally models:

- trees,
- graphs,
- hierarchical structures,
- nested exploration,
- divide & conquer,
- state-space search.

Many advanced algorithms become simpler recursively because:

```text
The structure itself is recursive.
```

Examples:

- Tree DFS
- Merge Sort
- Quick Sort
- Backtracking
- DFS on Graphs

---

## 9. Minimal Example – Print Numbers from N to 1

---

### Problem

```text
Print numbers from n to 1.
```

---

### Recursive Thinking

To print:

```text
5 → 4 → 3 → 2 → 1
```

we can:

```text
1. print current number
2. ask recursion to print smaller problem
```

---

### Code

```java
void printDescending(int n) {
    if (n == 0) {
        return;
    }

    System.out.println(n);
    printDescending(n - 1);
}
```

---

### Recursive Decomposition

```text
printDescending(5)
=
print 5
+
solve printDescending(4)
```

---

## 10. Factorial Example

---

### Problem

```text
5! = 5 × 4 × 3 × 2 × 1
```

Recursive structure:

```text
n! = n × (n - 1)!
```

---

### Code

```java
int factorial(int n) {
    if (n == 1) {
        return 1;
    }

    return n * factorial(n - 1);
}
```

---

### Recursive Thinking

```text
factorial(5)
=
5 × factorial(4)
```

The recursive call handles:

```text
smaller factorial computation
```

---

## 11. Recursion Tree Visualization

---

Recursion often forms a:

```text
recursive call tree
```

Example:

```text
factorial(4)
 └── factorial(3)
      └── factorial(2)
           └── factorial(1)
```

More complex recursion can branch heavily.

Example:

```text
fibonacci(n)
```

creates:

```text
multiple recursive branches
```

This becomes important later for:

- Backtracking
- DFS
- Dynamic Programming
- Complexity analysis

---

## 12. Time Complexity in Recursion

---

There are two common ways to reason about recursive complexity.

### 12.1 Recurrence Relation (Mathematical)

Example:

```text
T(n) = T(n - 1) + O(1)
```

This is more mathematical and common in advanced analysis.

---

### 12.2 Recursion Tree Method (More Intuitive)

A practical interview-friendly mental model:

```text
Time Complexity
=
(total recursive calls)
×
(work done in each call)
```

---

### Example – Factorial

```text
factorial(5)
```

Calls:

```text
5 recursive calls
```

Work per call:

```text
O(1)
```

Final complexity:

```text
O(n)
```

---

## 13. Space Complexity in Recursion

---

Recursion uses additional memory because:

```text
Every recursive call occupies stack space.
```

Practical mental model:

```text
Space Complexity
=
maximum call stack depth
×
memory per stack frame
```

---

### Example – Factorial

Maximum stack depth:

```text
n
```

Memory per frame:

```text
O(1)
```

Final space complexity:

```text
O(n)
```

---

## 14. Common Mistakes in Recursion

---

Recursion problems fail most often due to:

- missing base case,
- incorrect shrinking toward base case,
- modifying shared state incorrectly,
- misunderstanding return flow,
- exponential recomputation,
- stack overflow.

📌 Most recursion bugs are actually:

```text
state transition bugs
```

---

## 15. How Interviewers Evaluate Recursion

---

Interviewers look for:

- clear decomposition,
- correct base conditions,
- understanding of recursive state,
- trust in recursive subproblems,
- clean recursive flow.

Naming recursion concepts is optional —
understanding decomposition is not.

---

## 🧠 Quick Mental Trigger

If you can say:

```text
"This problem can be reduced
into smaller versions of itself"
```

👉 Think Recursion

---

## 🔗 Practice Problems (CoderPad Style)

To build strong recursive intuition, practice in progression order.

**👉 [Recursion – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply the Recursion filter)_

---

### ✅ Phase 1 — Call Stack Fundamentals

Focus:

- understanding recursive flow,
- base cases,
- stack visualization,
- recursive decomposition.

---

#### 1. Print Numbers from N to 1

Focus:

- base condition
- recursive shrinking
- stack behavior

---

#### 2. Fibonacci Number

**LeetCode:** https://leetcode.com/problems/fibonacci-number/

Focus:

- recursive branching
- repeated subproblems
- recursion tree intuition

---

#### 3. Power of Two

**LeetCode:** https://leetcode.com/problems/power-of-two/

Focus:

- recursive reduction
- mathematical decomposition

---

### ✅ Phase 2 — Recursive Decomposition

Focus:

- returning values recursively,
- trusting recursive calls,
- divide-and-reduce thinking.

---

#### 4. Pow(x, n)

**LeetCode:** https://leetcode.com/problems/powx-n/

Focus:

- divide & conquer recursion
- logarithmic recursion depth
- recursion optimization

---

#### 5. Recursive Binary Search

Focus:

- recursive range reduction
- recursive state boundaries

---

#### 6. Reverse String

**LeetCode:** https://leetcode.com/problems/reverse-string/

Focus:

- recursive swapping
- inward shrinking
- recursive state progression

---

### ✅ Phase 3 — Recursive Structures

Focus:

- recursive traversal,
- hierarchical structures,
- recursive state propagation.

---

#### 7. Reverse Linked List

**LeetCode:** https://leetcode.com/problems/reverse-linked-list/

Focus:

- recursive pointer manipulation
- stack unwinding intuition

---

#### 8. Maximum Depth of Binary Tree

**LeetCode:** https://leetcode.com/problems/maximum-depth-of-binary-tree/

Focus:

- recursive tree traversal
- recursive aggregation

---

#### 9. Same Tree

**LeetCode:** https://leetcode.com/problems/same-tree/

Focus:

- recursive structure comparison
- simultaneous recursive traversal

---

#### 10. Symmetric Tree

**LeetCode:** https://leetcode.com/problems/symmetric-tree/

Focus:

- mirrored recursive traversal
- structural symmetry checking

---

#### 11. Path Sum

**LeetCode:** https://leetcode.com/problems/path-sum/

Focus:

- recursive state propagation
- root-to-leaf recursive accumulation

---

### 🚦 After This Point

Once you are comfortable with these problems:

- recursive decomposition feels natural,
- stack flow becomes intuitive,
- and recursive trust develops strongly,

you can comfortably move into:

- Backtracking
- DFS
- Tree Recursion
- Dynamic Programming

At this stage, recursion should feel like:

```text
controlled self-decomposition
```

rather than a mysterious call chain.

---

### How to Practice (CoderPad Discipline)

Each problem page follows the same structure:

- problem understanding
- constraints & edge cases
- brute force idea
- recursive decomposition
- recursion tree
- final code
- interview-style explanation

📌 **Rule:** don’t move to the next phase until you can explain:

- what the recursive call is responsible for,
- what the base case stops,
- and how the problem size shrinks.

---

## Key Takeaway

> Recursion is not about functions calling themselves —
> it is about solving self-similar smaller problems systematically.

Once you learn recursive decomposition,
advanced patterns like DFS, Backtracking, and DP become dramatically easier.

---

## 🔗 What’s Next?

The next pattern focuses on exploring multiple decision paths recursively while undoing temporary choices.

Up next:

**👉 Backtracking (Decision Tree) – Exploring State Spaces Systematically**
