---
title: "DFS (Depth First Search) ✅"
description: "Learn DFS from first principles. Understand depth-first traversal, recursive graph exploration, visited-state management, DFS on trees vs graphs, recursive traversal patterns, iterative DFS using stack, grid traversal, and how DFS connects recursion, backtracking, trees, and graphs together."
keywords:
  - dfs
  - depth first search
  - graph dfs
  - recursive graph traversal
  - iterative dfs
  - graph traversal
  - grid dfs
  - visited array
  - coding interview dfs
  - graph algorithms
weight: 2
date: 2026-05-17
layout: "topic-content"
---

# DFS (Depth First Search) – Deep Exploration Before Backtracking

---

## 1. Why DFS Matters

---

DFS is one of the most important traversal patterns in problem solving.

It appears heavily in:

- graph traversal,
- tree traversal,
- backtracking,
- grid exploration,
- connected components,
- cycle detection,
- topological sort,
- path existence problems.

DFS is foundational because many advanced algorithms are built directly on top of:

```text
recursive deep exploration
```

Understanding DFS deeply makes:

- graph problems,
- tree recursion,
- and backtracking

significantly easier.

---

## 2. What Is DFS?

---

DFS stands for:

```text
Depth First Search
```

The core idea:

```text
Go as deep as possible first
before exploring sibling branches.
```

---

## Example

---

```text
        A
      /   \
     B     C
    / \
   D   E
```

DFS traversal:

```text
A → B → D → backtrack → E → backtrack → C
```

Notice:

```text
DFS fully explores one branch first.
```

---

## 3. DFS Is A Traversal Strategy

---

DFS is NOT:

- a data structure,
- a graph type,
- or a problem category.

It is:

```text
an exploration strategy
```

used for:

```text
traversing connected structures
```

Examples:

- trees,
- graphs,
- grids,
- decision trees,
- recursive search spaces.

---

## 4. DFS and Backtracking Relationship

---

This is one of the most important conceptual links.

Backtracking is actually:

```text
DFS over a decision tree
```

Example:

```text
Permutations
```

DFS explores:

```text
1 → 2 → 3
```

completely before trying:

```text
1 → 3 → 2
```

That is:

```text
Depth First Search
```

---

## 5. DFS on Trees vs Graphs

---

This distinction is VERY important.

---

## 5.1 DFS on Trees

---

Trees do NOT contain cycles.

Example:

```text
        1
      /   \
     2     3
```

DFS can safely recurse without:

```text
visited[]
```

because nodes cannot loop back.

---

## 5.2 DFS on Graphs

---

Graphs MAY contain cycles.

Example:

```text
A → B → C → A
```

Without tracking visited nodes:

```text
DFS loops forever
```

So graph DFS usually requires:

```java
boolean[] visited
```

or:

```java
Set<Integer> visited
```

---

## 6. Core DFS Mental Model

---

DFS repeatedly performs:

```text
1. visit node
2. explore neighbors deeply
3. backtrack naturally when no further path exists
```

Recursive intuition:

```text
Explore current branch completely
before exploring alternatives.
```

---

## 7. Recursive DFS Template

---

```java
void dfs(node) {

    visited[node] = true;

    for(neighbor : graph[node]) {
        if(!visited[neighbor]) {
            dfs(neighbor);
        }
    }
}
```

This is the canonical DFS structure.

---

## 8. Example – Find if Path Exists in Graph

---

### Problem

Given:

- graph edges,
- source node,
- destination node,

return:

```text
true if destination reachable
```

---

## Graph Example

---

```text
0 --- 1 --- 2
      |
      3
```

Question:

```text
Can we reach 3 from 0?
```

DFS intuition:

```text
Start at source
Explore deeply
If destination found → true
```

---

## Solution

---

```java
class Solution {

    public boolean validPath(
            int n,
            int[][] edges,
            int source,
            int destination) {

        Map<Integer, List<Integer>> graph = new HashMap<>();

        for (int i = 0; i < n; i++) {
            graph.put(i, new ArrayList<>());
        }

        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];

            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        boolean[] visited = new boolean[n];

        return dfs(source, destination, graph, visited);
    }

    private boolean dfs(
            int node,
            int destination,
            Map<Integer, List<Integer>> graph,
            boolean[] visited) {

        if (node == destination) {
            return true;
        }

        visited[node] = true;

        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, destination, graph, visited)) {
                    return true;
                }
            }
        }

        return false;
    }
}
```

---

## 9. Understanding The Base Case

---

Most DFS problems have:

```java
if(node == target)
```

Meaning:

```text
Goal state reached.
```

DFS recursion stops exploring further.

---

## 10. Why visited[] Is Critical

---

Example cycle:

```text
A → B → C → A
```

Without visited tracking:

```text
A → B → C → A → B → C...
```

Infinite recursion.

---

## 11. Iterative DFS (Using Stack)

---

DFS can also be implemented iteratively.

Instead of recursion:

```text
explicit stack controls traversal
```

---

## Iterative DFS Template

---

```java
Stack<Integer> stack = new Stack<>();
stack.push(start);

while (!stack.isEmpty()) {
    int node = stack.pop();

    if (visited[node]) {
        continue;
    }

    visited[node] = true;

    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            stack.push(neighbor);
        }
    }
}
```

---

## 12. Recursive vs Iterative DFS

---

| Recursive DFS         | Iterative DFS                 |
| --------------------- | ----------------------------- |
| cleaner               | more explicit control         |
| uses call stack       | uses explicit stack           |
| easier for interviews | avoids recursion depth issues |
| natural for trees     | common in production systems  |

---

## 13. DFS on Grids (VERY IMPORTANT)

---

Many interview problems are actually:

```text
graph DFS disguised as matrix problems
```

Example:

```text
Number of Islands
```

Grid:

```text
1 1 0
0 1 0
1 0 1
```

Each cell behaves like:

```text
a graph node
```

Neighbors:

- up
- down
- left
- right

DFS explores connected components.

---

## 14. Common DFS Patterns

---

| Pattern               | Example              |
| --------------------- | -------------------- |
| Path existence        | Find if Path Exists  |
| Connected components  | Number of Islands    |
| Flood fill            | Flood Fill           |
| Area exploration      | Max Area of Island   |
| Cycle detection       | Graph cycle problems |
| Topological traversal | Topological Sort     |
| Tree traversal        | Tree DFS             |

---

## 15. Time Complexity

---

DFS visits:

- each vertex once,
- each edge once.

Complexity:

```text
O(V + E)
```

Where:

- V = vertices
- E = edges

---

## 16. Space Complexity

---

Recursive DFS space complexity:

```text
O(V)
```

due to:

- recursion stack,
- visited storage.

---

## 17. Common Beginner Mistakes

---

### 1. Forgetting visited[]

Causes:

```text
infinite traversal
```

---

### 2. Marking visited Too Late

Wrong:

```java
mark visited after recursion
```

Can revisit same node repeatedly.

Correct:

```java
mark immediately when visiting
```

---

### 3. Confusing Tree DFS With Graph DFS

Trees:

```text
usually no visited[] needed
```

Graphs:

```text
usually require visited[]
```

---

### 4. Missing Base Case

Example:

```java
if(node == destination)
```

Without stop conditions:

```text
DFS explores unnecessarily
```

---

## 18. How Interviewers Evaluate DFS

---

Interviewers mainly look for:

- traversal intuition,
- recursive reasoning,
- visited-state correctness,
- graph modeling,
- recursive decomposition,
- neighbor exploration logic.

DFS is less about syntax and more about:

```text
systematic exploration thinking
```

---

## 🧠 Quick Mental Trigger

If the problem says:

```text
Can we reach?
Explore connected region
Find connected component
Traverse deeply
Explore neighbors recursively
```

👉 Think:

```text
DFS
```

---

## 🔗 Practice Problems (CoderPad Style)

To build strong DFS intuition, practice in progression order.

**👉 [DFS – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply DFS filters)_

---

### ✅ Phase 1 — Basic Graph DFS

Focus:

- adjacency list traversal
- recursive graph exploration
- visited-state management

---

#### 1. Find if Path Exists in Graph

**LeetCode:** https://leetcode.com/problems/find-if-path-exists-in-graph/

Focus:

- graph traversal
- DFS recursion
- connectivity checking

---

#### 2. Keys and Rooms

**LeetCode:** https://leetcode.com/problems/keys-and-rooms/

Focus:

- graph reachability
- visited-state traversal

---

### ✅ Phase 2 — Grid DFS

Focus:

- matrix traversal
- connected component exploration
- implicit graph traversal

---

#### 3. Flood Fill

**LeetCode:** https://leetcode.com/problems/flood-fill/

Focus:

- recursive grid traversal
- neighbor exploration

---

#### 4. Number of Islands

**LeetCode:** https://leetcode.com/problems/number-of-islands/

Focus:

- connected components
- DFS over grids

---

#### 5. Max Area of Island

**LeetCode:** https://leetcode.com/problems/max-area-of-island/

Focus:

- recursive area aggregation
- DFS counting

---

### 🚦 After This Point

Once DFS becomes intuitive:

- graph traversal becomes dramatically easier,
- BFS becomes easier to contrast,
- cycle detection becomes natural,
- and recursive graph reasoning improves significantly.

You are then ready for:

- BFS
- Cycle Detection
- Topological Sort
- Grid Traversal
- Advanced Graph Problems

---

## Key Takeaway

> DFS is fundamentally about deep exploration before trying alternative branches.

The core mental model is:

```text
visit
→ explore deeply
→ naturally backtrack
→ continue exploration
```

Once DFS intuition becomes strong,
most traversal-based graph problems become significantly easier.

---

## 🔗 What’s Next?

The next traversal strategy explores graphs in the exact opposite way.

Up next:

**👉 BFS (Breadth First Search) – Layer-by-Layer Exploration**
