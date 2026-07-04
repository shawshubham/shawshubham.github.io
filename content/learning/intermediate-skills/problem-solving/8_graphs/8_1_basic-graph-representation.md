---
title: "Basic Graph Representation ✅"
description: "Learn graph fundamentals from first principles. Understand nodes, edges, directed vs undirected graphs, weighted graphs, adjacency lists, adjacency matrices, graph traversal intuition, and how graphs relate to trees, DFS, BFS, and real-world systems."
keywords:
  - graph basics
  - graph representation
  - adjacency list
  - adjacency matrix
  - graph traversal
  - directed graph
  - undirected graph
  - weighted graph
  - dfs bfs foundation
  - coding interview graphs
weight: 1
date: 2026-02-13
layout: "topic-content"
---

# Basic Graph Representation – Understanding Connected Structures

---

## 1. Why Graphs Matter

---

Graphs are one of the most important problem-solving structures in interviews.

Many real-world systems are naturally modeled as:

```text
connected relationships
```

Examples:

- social networks,
- road maps,
- dependency systems,
- recommendation systems,
- workflow pipelines,
- internet routing,
- file dependencies,
- service communication.

Graphs appear heavily in:

- DFS,
- BFS,
- shortest path problems,
- dependency resolution,
- network traversal,
- cycle detection,
- scheduling systems.

---

## 2. What Is a Graph?

---

A graph is a structure consisting of:

```text
nodes (vertices)
+
connections (edges)
```

---

## Example

---

```text
A ----- B
|       |
|       |
C ----- D
```

Here:

### Nodes

```text
A, B, C, D
```

### Edges

```text
A-B
A-C
B-D
C-D
```

---

## 3. Graph Terminology

---

| Term          | Meaning                     |
| ------------- | --------------------------- |
| Vertex / Node | an entity in graph          |
| Edge          | connection between nodes    |
| Neighbor      | directly connected node     |
| Path          | sequence of connected nodes |
| Cycle         | path returning to same node |
| Degree        | number of connected edges   |

---

## 4. Directed vs Undirected Graphs

---

This is one of the most important distinctions.

---

## 4.1 Undirected Graph

---

Connection works both ways.

Example:

```text
A ----- B
```

Meaning:

```text
A connected to B
AND
B connected to A
```

Common examples:

- friendship networks,
- roads,
- physical connections.

---

## 4.2 Directed Graph

---

Connection has direction.

Example:

```text
A → B
```

Meaning:

```text
A can reach B
```

but not necessarily:

```text
B can reach A
```

Common examples:

- dependency systems,
- workflow pipelines,
- task scheduling,
- prerequisite graphs.

---

## 5. Weighted vs Unweighted Graphs

---

---

## 5.1 Unweighted Graph

---

All edges are treated equally.

Example:

```text
A --- B
```

Traversal cost:

```text
same for every edge
```

Typical usage:

- BFS,
- connectivity,
- shortest path in equal-cost systems.

---

## 5.2 Weighted Graph

---

Edges contain costs/weights.

Example:

```text
A --5--> B
```

Meaning:

```text
cost from A to B = 5
```

Common examples:

- map distances,
- network latency,
- pricing systems,
- routing problems.

These problems usually introduce:

```text
Dijkstra
```

later.

---

## 6. Trees Are Special Graphs

---

This is EXTREMELY important.

A tree is actually:

```text
a special type of graph
```

with:

- no cycles,
- exactly one path between nodes,
- connected structure.

---

## Example

---

```text
        1
      /   \
     2     3
    / \
   4   5
```

This is BOTH:

```text
a tree
```

AND:

```text
a graph
```

---

## Important Realization

---

All tree traversals are actually:

```text
graph traversals
```

Trees simply remove:

```text
cycle complexity
```

which makes traversal easier.

---

## 7. Graph Traversal Intuition

---

Graphs are usually explored using:

- DFS (Depth First Search)
- BFS (Breadth First Search)

These are:

```text
traversal strategies
```

for exploring connected structures.

---

## DFS Intuition

---

```text
go deep first
```

Example:

```text
A → B → D
```

before exploring siblings.

Usually implemented using:

- recursion
- or stack.

---

## BFS Intuition

---

```text
explore level-by-level first
```

Example:

```text
A → B → C → D
```

Usually implemented using:

```text
queue
```

---

## 8. Graph Representation in Code

---

There are two primary ways to represent graphs.

---

# 8.1 Adjacency Matrix

---

Uses:

```text
2D matrix
```

Example:

```text
A-B
A-C
B-D
```

Matrix:

```text
    A B C D
A [ 0 1 1 0 ]
B [ 1 0 0 1 ]
C [ 1 0 0 0 ]
D [ 0 1 0 0 ]
```

Meaning:

```text
matrix[i][j] = 1
```

means:

```text
edge exists
```

---

## Advantages

---

- simple representation
- fast edge lookup

---

## Disadvantages

---

- wastes memory for sparse graphs
- rarely used in interviews

Space complexity:

```text
O(V²)
```

---

# 8.2 Adjacency List (MOST IMPORTANT)

---

This is the standard interview representation.

Each node stores:

```text
its neighbors
```

---

## Example

---

```text
A-B
A-C
B-D
```

Adjacency list:

```text
A -> [B, C]
B -> [A, D]
C -> [A]
D -> [B]
```

---

## Java Representation

---

```java
Map<Integer, List<Integer>> graph = new HashMap<>();
```

---

## Building Graph

---

```java
graph.putIfAbsent(1, new ArrayList<>());
graph.putIfAbsent(2, new ArrayList<>());

graph.get(1).add(2);
graph.get(2).add(1);
```

---

## Why Adjacency List Is Preferred

---

Because most real graphs are:

```text
sparse
```

Meaning:

```text
few edges relative to total possible edges
```

Adjacency list space complexity:

```text
O(V + E)
```

which is much more efficient.

---

## 9. Traversal Problems Usually Need Visited State

---

Unlike trees:

```text
graphs may contain cycles
```

Example:

```text
A → B → C → A
```

Without tracking visited nodes:

```text
DFS/BFS can loop forever
```

So graphs usually require:

```java
Set<Integer> visited
```

or:

```java
boolean[] visited
```

---

## 10. Common Graph Patterns in Interviews

---

| Pattern                    | Typical Algorithm                                     |
| -------------------------- | ----------------------------------------------------- |
| Connectivity               | DFS (Depth First Search) / BFS (Breadth First Search) |
| Shortest path (unweighted) | BFS                                                   |
| Shortest path (weighted)   | Dijkstra                                              |
| Dependency ordering        | Topological Sort                                      |
| Cycle detection            | DFS / Union Find                                      |
| Dynamic grouping           | DSU( Disjoint Set Union) / Union Find                 |
| Grid traversal             | DFS / BFS                                             |

---

## 11. Graph vs Tree vs Backtracking Relationship

---

This is one of the most important conceptual connections.

---

## Backtracking

```text
DFS over decision tree
```

---

## Tree Traversal

```text
DFS/BFS over hierarchical graph
```

---

## Graph Traversal

```text
DFS/BFS over connected network
```

---

## Important Realization

---

These are all variations of:

```text
state-space traversal
```

The traversal strategy changes,
not the core exploration philosophy.

---

## 12. Common Beginner Mistakes

---

### 1. Forgetting Graphs Can Have Cycles

This causes:

```text
infinite traversal
```

---

### 2. Forgetting Visited State

Very common in DFS/BFS.

---

### 3. Confusing Trees With General Graphs

Trees:

```text
no cycles
```

Graphs:

```text
cycles possible
```

---

### 4. Using Adjacency Matrix Unnecessarily

Most interview problems prefer:

```text
adjacency list
```

---

## 13. How Interviewers Evaluate Graph Fundamentals

---

Interviewers mainly expect:

- graph modeling ability,
- correct representation choice,
- traversal intuition,
- understanding of neighbors,
- cycle awareness,
- DFS/BFS recognition.

The goal is NOT memorization.

The goal is:

```text
understanding connected exploration
```

---

## 🧠 Quick Mental Trigger

If the problem involves:

```text
connections
relationships
neighbors
routes
network traversal
components
reachability
```

👉 Think:

```text
Graph
```

---

## 🔗 Practice Problems (CoderPad Style)

To build strong graph intuition, practice in progression order.

**👉 [Graph Fundamentals – Practice Problems](/learning/intermediate-skills/problem-solving/3_coderpad-practice/all-problems)**  
_(Coderpad Practice → Apply Graph filters)_

---

### ✅ Phase 1 — Basic Graph Modeling

Focus:

- graph representation
- neighbor relationships
- traversal intuition

---

#### 1. Find the Town Judge

**LeetCode:** https://leetcode.com/problems/find-the-town-judge/

Focus:

- directed graph intuition
- relationship modeling
- in-degree / out-degree thinking
- graph property analysis without traversal

---

#### 2. Find Center of Star Graph

**LeetCode:** https://leetcode.com/problems/find-center-of-star-graph/

Focus:

- undirected graph intuition
- degree counting
- identifying common connected node
- graph structure recognition

---

### 🚦 After This Point

Once graph representation becomes comfortable:

- DFS becomes dramatically easier,
- BFS intuition improves,
- cycle detection becomes natural,
- and graph traversal problems become much less intimidating.

You are then ready for:

- DFS
- BFS
- Cycle Detection
- Topological Sort
- Grid Traversal

---

## Key Takeaway

> Graphs are fundamentally about connected exploration.

The most important insight is:

```text
Trees, backtracking, DFS, BFS,
and graph traversal
are all connected through
state-space exploration.
```

Once graph representation becomes natural,
advanced traversal algorithms become much easier to reason about.

---

## 🔗 What’s Next?

The next article introduces one of the most important traversal strategies in all of problem solving.

Up next:

**👉 DFS (Depth First Search) – Deep Exploration Before Backtracking**
