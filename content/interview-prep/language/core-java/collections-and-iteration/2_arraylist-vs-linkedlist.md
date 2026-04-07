---
title: "ArrayList vs LinkedList"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-005"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Collections"
  round: "Technical"
  company: "" # optional
  tags: ["arraylist", "linkedlist", "list", "collections", "performance"]
---

## 1. Short Answer (Interview Style)

---

> **`ArrayList` is backed by a dynamic array, while `LinkedList` is backed by a doubly linked list. `ArrayList` is usually better for fast random access and read-heavy use cases, whereas `LinkedList` can be useful when frequent insertions or deletions happen in the middle of the list — although in practice `ArrayList` is preferred in most real-world applications.**

---

## 2. What is ArrayList?

---

`ArrayList` is a resizable array implementation of the `List` interface.

Internally, it stores elements in an contiguous array. Since a normal array has fixed size, `ArrayList` grows by creating a larger new array and copying existing elements when its current capacity is exhausted.

Example:

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
```

Key characteristics:

- fast random access using index
- maintains insertion order
- allows duplicates
- resizing happens automatically when the internal array becomes full
- during resizing, a larger new array is created and existing elements are copied into it
- because resizing requires copying, insertion is usually `O(1)` amortized but resize itself is `O(n)`

---

## 3. What is LinkedList?

---

`LinkedList` is a doubly linked list implementation of the `List` interface.

Each node stores:

- the value
- reference to previous node
- reference to next node

Example:

```java
List<String> list = new LinkedList<>();
list.add("A");
list.add("B");
list.add("C");
```

Key characteristics:

- elements are not stored contiguously
- each element is wrapped inside a node
- insertion or deletion of a known node is efficient
- index-based lookup is slower than `ArrayList`

---

## 4. Internal Structure Difference

---

### ArrayList

Internally uses an array.

Conceptually:

```text
[A][B][C][D]
```

### LinkedList

Internally uses nodes connected with pointers.

Conceptually:

```text
null <- [A] <-> [B] <-> [C] <-> [D] -> null
```

This structural difference is the reason their performance characteristics differ.

---

## 5. Performance Comparison

---

### Access by index

- `ArrayList` → fast, because it directly accesses array index
- `LinkedList` → slow, because it must traverse nodes

### Add at end

- `ArrayList` → usually fast, but sometimes resizing may happen
- `LinkedList` → generally efficient

### Insert in middle

- `ArrayList` → existing elements may need shifting
- `LinkedList` → insertion itself is cheap once the node position is known

### Delete from middle

- `ArrayList` → shifting may be required
- `LinkedList` → removal itself is cheap once the node position is known

### Memory usage

- `ArrayList` → lower memory overhead
- `LinkedList` → higher memory overhead because every node stores extra references

---

## 6. Time Complexity Summary

---

| Operation        | ArrayList        | LinkedList                                        |
| ---------------- | ---------------- | ------------------------------------------------- |
| Get by index     | `O(1)`           | `O(n)`                                            |
| Add at end       | `O(1)` amortized | `O(1)`                                            |
| Insert in middle | `O(n)`           | `O(n)` to reach position, then insertion is cheap |
| Delete in middle | `O(n)`           | `O(n)` to reach position, then deletion is cheap  |
| Search           | `O(n)`           | `O(n)`                                            |

Important interview point:

> Although LinkedList insertion/deletion is often described as efficient, finding the position itself usually takes `O(n)`, so in practical applications `ArrayList` is often faster overall.

---

## 7. When Should We Use ArrayList?

---

Use `ArrayList` when:

- frequent reads happen
- random access by index is needed
- most insertions happen at the end
- memory efficiency matters
- iteration performance is important

This is why `ArrayList` is more commonly used in real-world applications.

---

## 8. When Should We Use LinkedList?

---

Use `LinkedList` when:

- you already have a reference to the node position
- frequent insertions and deletions happen near the ends
- queue or deque behavior is required

However, for most typical `List` use cases, `ArrayList` is still preferred.

---

## 9. Why ArrayList Is Usually Preferred in Practice

---

Interviewers like candidates who go beyond textbook theory.

Textbook comparison says:

- `LinkedList` is good for insertion/deletion
- `ArrayList` is good for random access

But in practice:

- CPU cache locality is better with arrays
- memory overhead is lower in `ArrayList`
- traversal cost in `LinkedList` is expensive
- many middle insertions still require finding the position first

So unless there is a clear reason, `ArrayList` is usually the better default choice.

---

## 10. Interview Follow-up Questions

---

After asking **"ArrayList vs LinkedList"**, interviewers often ask deeper follow-up questions.

### Common Follow-up Questions

| Follow-up Question                                   | What Interviewer Is Testing |
| ---------------------------------------------------- | --------------------------- |
| Why is ArrayList faster for reads?                   | Internal structure          |
| Why is LinkedList slower for index-based access?     | Traversal understanding     |
| Why is ArrayList usually preferred in practice?      | Real-world thinking         |
| What happens when ArrayList grows beyond capacity?   | Resizing concept            |
| How does ArrayList resizing work?                    | Internal implementation     |
| Why does LinkedList consume more memory?             | Node overhead               |
| Is LinkedList good for queue implementation?         | Data structure selection    |
| Which one would you choose for read-heavy workloads? | Practical choice            |

---

## 11. Common Mistakes

---

Common mistakes developers make:

- Saying `LinkedList` is always faster for insertions
- Ignoring traversal cost in `LinkedList`
- Forgetting memory overhead of node references
- Choosing `LinkedList` just because interview books say insert/delete is cheap
- Ignoring that `ArrayList` performs better in many real systems due to cache locality

---

## 12. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between `ArrayList` and `LinkedList`?

Answer like this:

> `ArrayList` is backed by a dynamic array, so it provides fast random access and is usually the better choice for read-heavy use cases. `LinkedList` is backed by a doubly linked list, so insertion or deletion of a known node is efficient, but index-based access is slow and memory overhead is higher. In practice, `ArrayList` is preferred in most applications unless there is a specific need for linked-list-style operations.

This is a **strong interview answer**.
