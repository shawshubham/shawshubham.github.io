---
title: "Big-O Complexity of Java Collections"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-213"
  phase: "Core"
  topic: "Collections"
  round: "Technical"
  company: ""
  tags:
    [
      "big-o",
      "collections",
      "time complexity",
      "arraylist",
      "hashmap",
      "linkedlist",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Different Java collections have different time complexities based on their internal data structures. ArrayList provides O(1) access but O(n) insertion in middle, LinkedList provides O(1) insertion but O(n) access, and HashMap provides average O(1) for put and get operations but O(n) in worst case.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- performance trade-offs
- internal data structures
- when to use which collection
- scalability considerations

This is a very common Core Java interview question.

---

## 3. ArrayList Complexity

---

ArrayList is backed by a **dynamic array**.

| Operation     | Time Complexity |
| ------------- | --------------- |
| get(index)    | O(1)            |
| add(element)  | O(1) amortized  |
| add(index)    | O(n)            |
| remove(index) | O(n)            |
| search        | O(n)            |

Why:

- Direct index access → fast
- Shifting elements → costly

---

## 4. LinkedList Complexity

---

LinkedList is backed by a **doubly linked list**.

| Operation     | Time Complexity |
| ------------- | --------------- |
| get(index)    | O(n)            |
| add(element)  | O(1)            |
| add(index)    | O(n)            |
| remove(index) | O(n)            |
| search        | O(n)            |

Why:

- No index-based access
- Traversal required

---

## 5. HashMap Complexity

---

HashMap is based on **hashing + buckets**.

| Operation       | Time Complexity |
| --------------- | --------------- |
| put(key, value) | O(1) average    |
| get(key)        | O(1) average    |
| remove(key)     | O(1) average    |
| Worst case      | O(n)            |

Why:

- Hashing distributes elements
- Collisions may degrade performance

Since Java 8:

- buckets use linked list → tree (balanced BST)
- worst case improves to O(log n)

---

## 6. HashSet Complexity

---

HashSet internally uses HashMap.

| Operation | Time Complexity |
| --------- | --------------- |
| add       | O(1) average    |
| remove    | O(1) average    |
| contains  | O(1) average    |

---

## 7. TreeMap Complexity

---

TreeMap is based on **Red-Black Tree**.

| Operation | Time Complexity |
| --------- | --------------- |
| put       | O(log n)        |
| get       | O(log n)        |
| remove    | O(log n)        |

Why:

- Balanced tree ensures sorted order

---

## 8. TreeSet Complexity

---

TreeSet internally uses TreeMap.

| Operation | Time Complexity |
| --------- | --------------- |
| add       | O(log n)        |
| remove    | O(log n)        |
| contains  | O(log n)        |

---

## 9. Quick Comparison Table

---

| Collection | Access | Insert   | Delete               | Search   |
| ---------- | ------ | -------- | -------------------- | -------- |
| ArrayList  | O(1)   | O(n)     | O(n)                 | O(n)     |
| LinkedList | O(n)   | O(1)     | O(1) (if node known) | O(n)     |
| HashMap    | -      | O(1)     | O(1)                 | O(1)     |
| TreeMap    | -      | O(log n) | O(log n)             | O(log n) |

---

## 10. Important Interview Points

---

### Why ArrayList is faster than LinkedList for access?

Answer: Because ArrayList supports direct indexing.

### Why HashMap is O(1)?

Answer: Because of hashing.

### When does HashMap become O(n)?

Answer: When many collisions occur.

### Why TreeMap is O(log n)?

Answer: Because it uses balanced binary search tree.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is time complexity of Java collections?

Answer like this:

> ArrayList provides O(1) access and O(n) insertion or deletion in the middle. LinkedList provides O(1) insertion but O(n) access. HashMap provides O(1) average time for put and get operations but can degrade to O(n) in worst case. TreeMap provides O(log n) operations because it is based on a balanced tree.
