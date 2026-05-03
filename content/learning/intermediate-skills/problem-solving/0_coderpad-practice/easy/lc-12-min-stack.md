---
title: "Min Stack"
description: "Learn how to design a stack that supports push, pop, top, and retrieving the minimum element in constant time. This problem introduces auxiliary state tracking and is a foundational stack design pattern for coding interviews."
keywords:
  - min stack
  - stack design problem
  - get minimum in O(1)
  - auxiliary stack technique
  - stack interview questions
  - leetcode 155 explanation
layout: "code-solution-content"
date: 2026-02-10
toc_hide: true

problem:
  id: "lc-12"
  source: "LeetCode"
  url: "https://leetcode.com/problems/min-stack/"
  difficulty: "Easy"
  learningPhase: "Core"
  corePatterns:
    - "Stack"
  tags:
    - "stack"
    - "design"
    - "auxiliary-state"
    - "min-tracking"
---

# LeetCode Problem: Min Stack

## 1. Problem Statement

Design a stack that supports the following operations in **O(1)** time:

- `push(x)` — push element `x` onto the stack
- `pop()` — remove the top element
- `top()` — get the top element
- `getMin()` — retrieve the minimum element in the stack

---

## 2. Clarifying Questions (Interview Thinking)

- Can duplicate values exist? → **Yes**
- Can minimum change after pop? → **Yes**
- Are all operations required to be O(1)? → **Yes**
- Is the stack ever empty when calling operations? → As per constraints, operations are valid

---

## 3. Constraints & Edge Cases

- Multiple identical minimum values
- Popping the current minimum
- Interleaved push/pop operations

---

## 4. Naive Idea (Why It Fails)

Track the minimum by scanning the stack every time `getMin()` is called.

```text
Time: O(n) for getMin
```

❌ Violates the O(1) requirement.

---

## 5. Pattern Recognition

This is still a **stack problem**, but with a twist:

We need to remember **extra information about past state**.

**➡️ Stack + Auxiliary State**

---

## 6. Optimized Approach (Two-Stack Strategy)

Maintain:

- stack → actual values
- minStack → minimum value at each level

Rules

- On push:
  - push value to stack
  - push min(value, currentMin) to minStack
- On pop:
  - pop from both stacks
- getMin() → top of minStack

Both stacks stay perfectly aligned.

## 7. 🔍 How the push() Logic Really Works (With Example)

The key idea behind **Min Stack** is simple but subtle:

> **Each level of the stack remembers the minimum value up to that point.**

To achieve this, we maintain **two stacks**:

- stack → stores actual values
- minStack → stores the minimum value **at the same depth**

Both stacks always **grow and shrink together**.

#### Push Logic

```java
public void push(int val) {
    stack.push(val);

    if (minStack.isEmpty()) {
        minStack.push(val);
    } else {
        minStack.push(Math.min(val, minStack.peek()));
    }
}

```

#### What this means:

- Push the value normally
- Compare it with the previous minimum
- Store the new minimum so far

### 7.1 Step-by-Step Example

Let’s push the elements:
[5, 1, 4, 2]

We’ll track both stacks.

#### 🔹 Push 5

```code
stack:    [5]
minStack: [5]
```

- First element → it is the minimum

#### 🔹 Push 1

```code
stack:    [1, 5]
minStack: [1, 5]
```

- min(1, 5) = 1
- Minimum so far becomes 1

#### 🔹 Push 4

```code
stack:    [4, 1, 5]
minStack: [1, 1, 5]
```

- min(4, 1) = 1
- Minimum does not change

#### 🔹 Push 2

```code
stack:    [2, 4, 1, 5]
minStack: [1, 1, 1, 5]
```

- min(2, 1) = 1
- Minimum still remains 1

### 7.2 Why This Design Works

Each entry in minStack answers this question:

> “If the stack were cut at this level, what would the minimum be?”

So when we pop():

- both stacks pop together
- the previous minimum is **automatically restored**

No scanning. No recomputation.

### 7.3 Pop Example

If we now pop twice:

```code
After popping 2 and 4:

stack: [1, 5]
minStack: [1, 5]
```

getMin() correctly returns 1.

### 7.4 Mental Model (Remember This)

> **Min Stack stores the minimum value at every depth.**  
> **Popping simply rewinds history.**

Once this clicks, Min Stack becomes trivial.

### 7.5 Common Misunderstanding

❌ “Why store the min every time? Isn’t that redundant?”

✅ It is intentional redundancy — it guarantees O(1) correctness after pops.

---

## 8. Time & Space Complexity

```text
Time:  O(1) for all operations
Space: O(n)
```

---

## 9. Final Code (Java)

```java
class MinStack {
    Deque<Integer> stack;
    Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty()) {
            minStack.push(val);
        } else {
            minStack.push(Math.min(val, minStack.peek()));
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

---

## 10. Interview-Style Explanation

> “I maintain a second stack that stores the minimum value at each level.  
> Every push records the current minimum so getMin() is always O(1).  
> Both stacks stay in sync, which makes pop operations safe.”

---

## 11. Common Mistakes

- Forgetting to pop from minStack
- Mishandling duplicate minimum values
- Trying to recompute minimum after pop
- Using a single stack without tracking history

---

## 12. Key Takeaway

> A stack can store **history and state**, not just raw values.

This idea appears again in:

- monotonic stacks
- histogram problems
- undo/redo systems
