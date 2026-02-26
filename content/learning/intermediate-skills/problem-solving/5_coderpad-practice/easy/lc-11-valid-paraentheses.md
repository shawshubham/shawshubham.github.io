---
title: "Valid Parentheses"
description: "Learn how to use a stack to validate balanced parentheses. A core stack problem that builds intuition for matching, nesting, and unresolved state handling in interviews."
keywords:
  - valid parentheses
  - stack fundamentals
  - balanced parentheses
  - stack interview problems
  - matching brackets
date: 2026-02-16
layout: "code-solution-content"
toc_hide: true

problem:
  id: "lc-20"
  source: "LeetCode"
  url: "https://leetcode.com/problems/valid-parentheses/"
  difficulty: "Easy"
  learningPhase: "Core"
  corePatterns:
    - "Stack"
  tags:
    - "string"
    - "stack"
    - "matching"
    - "balanced-parentheses"
---

# LeetCode Problem: Valid Parentheses

## 1. Problem Statement

Given a string `s` containing just the characters:

- `'('`, `')'`
- `'{'`, `'}'`
- `'['`, `']'`

Determine if the input string is **valid**.

A string is valid if:

- Open brackets must be closed by the **same type** of brackets.
- Open brackets must be closed in the **correct order**.
- Every close bracket has a corresponding open bracket.

Return `true` if the string is valid, otherwise return `false`.

---

## 2. Clarifying Questions (Interview Thinking)

- Can the string be empty? → **Yes**, empty string is valid.
- Any other characters besides brackets? → **No**
- Do we only return boolean? → **Yes**
- Order matters? → **Yes (nested correctness)**

---

## 3. Constraints & Edge Cases

- `""` → true
- `"("` → false
- `")"` → false
- `"()[]{}"` → true
- `"(]"` → false
- `"([)]"` → false
- `"({[]})"` → true

---

## 4. Brute Force Idea

Try repeatedly removing valid pairs like `"()"`, `"{}"`, `"[]"` until no more changes.

```text
Time: O(n²)
Space: O(n)
```

Works but inefficient and messy.

---

## 5. Pattern Recognition

This is a classic signal for a stack:

- Nested structure
- “Most recent opening bracket must close first”

**➡️ Stack = unresolved openings**

---

## 6. Optimized Approach (Stack)

Algorithm:

1. If we see an opening bracket → push it.
2. If we see a closing bracket:
   - stack must not be empty
   - top of stack must match the correct opening bracket
   - pop it
3. At the end, stack must be empty.

---

## 7. Time & Space Complexity

```text
Time:  O(n)
Space: O(n)
```

---

## 8. Final Code (Java)

```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for(int i = 0; i < s.length(); i++){
            char character = s.charAt(i);

            if(character == '(' || character == '{' || character == '['){
                stack.push(character);
            } else {
                if (stack.isEmpty()) return false;

                char top = stack.pop();
                if (character == ')' && top != '(') return false;
                if (character == ']' && top != '[') return false;
                if (character == '}' && top != '{') return false;
            }
        }

        return stack.isEmpty();
    }
}
```

---

## 9. Interview-Style Explanation

> “I use a stack to store opening brackets that are not yet closed.  
> When I see a closing bracket, it must match the most recent opening bracket, so I check the stack top.  
> If any mismatch occurs or the stack is empty, the string is invalid.  
> At the end, the stack must be empty for the string to be valid.”

---

## 10. Common Mistakes

- Not checking empty stack before popping
- Accepting mismatched bracket types
- Forgetting to validate stack is empty at the end
- Using Stack class instead of ArrayDeque in Java (preferred)

---

## 11. Key Takeaway

A stack holds items that cannot be resolved yet.  
A closing bracket resolves the most recent unresolved opening bracket.
