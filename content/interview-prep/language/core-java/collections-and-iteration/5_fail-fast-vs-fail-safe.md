---
title: "Fail-Fast vs Fail-Safe"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-202"
  phase: "Core"
  topic: "Collections"
  round: "Technical"
  company: ""
  tags:
    [
      "fail-fast",
      "fail-safe",
      "iterator",
      "collections",
      "java",
      "concurrentmodificationexception",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Fail-Fast iterators throw ConcurrentModificationException if the collection is structurally modified during iteration, while Fail-Safe iterators do not throw an exception because they iterate over a copy of the collection instead of the original collection.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how iterators work internally
- ConcurrentModificationException
- collection framework behavior
- concurrent collections
- difference between java.util and java.util.concurrent collections

This is a very common Core Java interview question.

---

## 3. What is Fail-Fast Iterator?

---

A **Fail-Fast iterator** immediately throws a
**ConcurrentModificationException**
if the collection is structurally modified after the iterator is created.

This happens when:

- Adding elements
- Removing elements
- Clearing collection
- Resizing internal structure

### Example

```java
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(3);

for (Integer i : list) {
    if (i == 2) {
        list.remove(i);
    }
}
```

This will throw:

```
ConcurrentModificationException
```

---

## 4. How Fail-Fast Works Internally

---

Most Java collections maintain a variable called:

```
modCount
```

Every time the collection structure changes:

```
modCount++
```

When iterator is created:

```
expectedModCount = modCount
```

During iteration:

```
if (modCount != expectedModCount)
    throw ConcurrentModificationException
```

So the iterator **fails fast** as soon as modification is detected.

---

## 5. What is Fail-Safe Iterator?

---

A **Fail-Safe iterator** does **not throw ConcurrentModificationException**
because it iterates over a **copy of the collection** instead of the original collection.

So modifications are allowed while iterating.

This is also called:

> **Weakly consistent iterator**

---

## 6. Collections Using Fail-Fast vs Fail-Safe

---

### Fail-Fast Collections (java.util)

- ArrayList
- LinkedList
- HashMap
- HashSet
- TreeMap
- TreeSet

### Fail-Safe Collections (java.util.concurrent)

- ConcurrentHashMap
- CopyOnWriteArrayList
- CopyOnWriteArraySet

---

## 7. Fail-Fast vs Fail-Safe — Key Differences

---

| Feature                                | Fail-Fast           | Fail-Safe                               |
| -------------------------------------- | ------------------- | --------------------------------------- |
| Throws ConcurrentModificationException | Yes                 | No                                      |
| Iterates over                          | Original collection | Copy of collection                      |
| Allows modification during iteration   | No                  | Yes                                     |
| Performance                            | Faster              | Slower                                  |
| Memory                                 | Low                 | Higher                                  |
| Package                                | java.util           | java.util.concurrent                    |
| Examples                               | ArrayList, HashMap  | ConcurrentHashMap, CopyOnWriteArrayList |

---

## 8. Safe Removal While Iterating

---

If you want to remove elements safely while iterating, use iterator remove:

```java
Iterator<Integer> it = list.iterator();

while (it.hasNext()) {
    Integer val = it.next();
    if (val == 2) {
        it.remove();
    }
}
```

This will **NOT** throw ConcurrentModificationException.

---

## 9. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> Explain Fail-Fast vs Fail-Safe

Answer like this:

> Fail-Fast iterators throw ConcurrentModificationException if the collection is structurally modified during iteration. They work by maintaining a modCount and expectedModCount and comparing them during iteration. Examples include ArrayList and HashMap. Fail-Safe iterators do not throw exception because they iterate over a copy of the collection. Examples include ConcurrentHashMap and CopyOnWriteArrayList.
