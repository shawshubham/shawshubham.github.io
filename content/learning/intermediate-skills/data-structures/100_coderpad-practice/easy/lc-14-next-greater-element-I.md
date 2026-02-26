---
title: "Next Greater Element I"
description: "Understand how to solve the Next Greater Element problem using a monotonic stack. Learn how unresolved elements wait for future resolution — a foundational stack pattern for coding interviews."
keywords:
  - next greater element stack
  - monotonic stack interview problems
  - stack next greater element
  - coding interview stack patterns
  - monotonic decreasing stack
layout: "code-solution-content"
date: 2026-02-10
toc_hide: true

problem:
  id: "lc-496"
  source: "LeetCode"
  url: "https://leetcode.com/problems/next-greater-element-i/"
  difficulty: "Easy"
  learningPhase: "Stretch"
  corePatterns:
    - "Stack"
  tags:
    - "stack"
    - "monotonic-stack"
    - "next-greater"
    - "hashmap"
---

# LeetCode Problem: Next Greater Element I

## 1. Problem Statement

You are given two integer arrays:

- `nums1` — a subset of `nums2`
- `nums2` — all elements are **unique**

For each element in `nums1`, find the **next greater element** in `nums2`.

The next greater element of `x` is the **first element to the right of `x` in `nums2` that is greater than `x`**.

If no such element exists, return `-1` for that element.

---

## 2. Clarifying Questions (Interview Thinking)

Before coding, confirm:

- Are elements unique? → **Yes**
- Is `nums1` always a subset of `nums2`? → **Yes**
- Does order matter? → **Yes (only elements to the right)**
- What should we return if no greater element exists? → **-1**

---

## 3. Constraints & Edge Cases

- Single element → always `-1`
- Elements at the end of `nums2` → no right side
- Elements with no greater value → `-1`

---

## 4. Brute Force Idea

For each element in `nums1`:

- find its position in `nums2`
- scan to the right until a greater element is found

```text
Time: O(n²)
Space: O(1)
```

Correct but inefficient.

---

## 5. Pattern Recognition

Key phrases in the problem:

- “next greater”
- “first greater element”
- “to the right”

This signals a **one-time resolution problem**.

➡️ **Monotonic Stack (Decreasing)**

---

## 6. What Is a Monotonic Stack?

A **monotonic stack** is a stack that maintains its elements in a **sorted order**.

There are two types:

- **Monotonic Increasing Stack** → bottom → top is increasing
- **Monotonic Decreasing Stack** → bottom → top is decreasing

In this problem, we use a **monotonic decreasing stack**.

---

## 7. What the Stack Represents

In this problem, the stack stores:

> **Elements that have not yet found a greater element to their right**

These elements are **waiting to be resolved**.

---

## 8. Why the Stack Must Be Monotonic (Decreasing)

While scanning `nums2` from left to right:

- If the current value is **greater than the stack top**:
  - it resolves the stack top
  - we pop and record the result

- If the current value is **smaller**:
  - it cannot resolve anything
  - it must wait → push to stack

This guarantees:

- smaller values are resolved first
- each element is processed only once

---

## 9. Step-by-Step Example

Consider:

```
nums2 = [5, 1, 2, 3, 6]
```

We scan left to right and maintain a **monotonic decreasing stack** (top is the smallest among unresolved elements).

---

### See `5`

Push it (unresolved):

```
Stack: [5]
```

`5` is waiting for a greater element.

---

### See `1`

`1` is not greater than top (`5`), so it cannot resolve anything → push:

```
Stack: [1, 5]
```

---

### See `2`

Now `2 > 1`, so `2` resolves `1`:

- pop `1`, record `1 → 2`
  Then push `2`:

```
Resolved: 1 → 2
Stack: [2, 5]
```

---

### See `3`

Now `3 > 2`, so `3` resolves `2`:

- pop `2`, record `2 → 3`
  Then push `3`:

```
Resolved: 2 → 3
Stack: [3, 5]
```

---

### See `6` ✅ (This is where the inner `while` matters)

Now `6` is greater than the stack top (`3`), but it might also be greater than more elements below it.

So we keep popping **while** the condition holds:

- `6 > 3` → pop `3`, record `3 → 6`
- `6 > 5` → pop `5`, record `5 → 6`

Now stack is empty, push `6`:

```
Resolved: 3 → 6, 5 → 6
Stack: [6]
```

This is why we use:

```text
while stack not empty AND stack.top < current:
    resolve stack.top with current
    pop
```

---

### End of array

Elements still in stack have no greater element to the right:

```
6 → -1
```

---

## 10. Optimized Approach (Monotonic Stack + Map)

Algorithm:

1. Traverse `nums2` from left to right
2. Maintain a **monotonic decreasing stack**
3. When current value `x` is greater than stack top:
   - pop stack
   - map popped value → `x`

4. Push `x` onto stack
5. After traversal, map remaining stack elements to `-1`
6. Build result for `nums1` using the map

---

## 11. Time & Space Complexity

```text
Time:  O(n)
Space: O(n)
```

Each element is pushed and popped **once**.

---

## 12. Final Code (Java)

```java
import java.util.*;

class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> nextGreater = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();

        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                nextGreater.put(stack.pop(), num);
            }
            stack.push(num);
        }

        while (!stack.isEmpty()) {
            nextGreater.put(stack.pop(), -1);
        }

        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = nextGreater.get(nums1[i]);
        }

        return result;
    }
}
```

---

## 13. Interview-Style Explanation

> “I scan `nums2` once using a monotonic decreasing stack.  
> Each element waits in the stack until a greater value appears and resolves it.  
> I store results in a map so I can answer queries for `nums1` in O(1).”

---

## 14. Common Mistakes

- Scanning right for each element (O(n²))
- Using the wrong stack order (increasing instead of decreasing)
- Forgetting to assign `-1` to unresolved elements
- Trying to process `nums1` directly

---

## 15. Mental Model (Remember This)

> **A monotonic stack stores elements that are waiting to be resolved by a future condition.**

---

## 16. Key Takeaway

If a problem asks for:

- next greater / smaller element
- first element to the right or left
- one-time resolution

A **monotonic stack** is the correct pattern.
