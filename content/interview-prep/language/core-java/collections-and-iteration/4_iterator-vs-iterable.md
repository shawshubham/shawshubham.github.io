---
title: "Iterator vs Iterable"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-201"
  phase: "Core"
  topic: "Collections"
  round: "Technical"
  company: ""
  tags: ["iterator", "iterable", "collections", "java", "for-each"]
---

## 1. Short Answer (Interview Style)

---

> **Iterable represents a collection that can be iterated over, while Iterator is an object used to iterate over that collection. Iterable provides the iterator(), and Iterator provides next() and hasNext() to traverse elements. The for-each loop in Java internally uses Iterable and Iterator.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- how for-each loop works internally
- how collections are traversed
- Iterator pattern
- collection framework design

This is a very common Core Java interview question.

---

## 3. What is Iterable?

---

`Iterable` is an interface in Java that represents a collection of objects that can be iterated over.

It contains only one main method:

```java
Iterator<T> iterator();
```

Any class that implements `Iterable` can be used in a **for-each loop**.

### Example

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

for (String s : list) {
    System.out.println(s);
}
```

This works because `ArrayList` implements `Iterable`.

---

## 4. What is Iterator?

---

`Iterator` is an interface used to traverse elements one by one.

Main methods:

```java
boolean hasNext();
T next();
void remove();
```

### Example

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

Iterator<String> it = list.iterator();

while (it.hasNext()) {
    System.out.println(it.next());
}
```

Here, the Iterator is used to traverse the collection.

---

## 5. Relationship Between Iterable and Iterator

---

Very important interview point:

> **Iterable provides the iterator, and Iterator performs the iteration.**

Flow:

```
Collection → Iterable → iterator() → Iterator → next()
```

So:

- Iterable = collection that can be iterated
- Iterator = object that iterates

---

## 6. How For-Each Loop Works Internally

---

This is a very important interview concept.

This code:

```java
for (String s : list) {
    System.out.println(s);
}
```

Is internally converted to:

```java
Iterator<String> it = list.iterator();

while (it.hasNext()) {
    String s = it.next();
    System.out.println(s);
}
```

So **for-each loop internally uses Iterator**.

---

## 7. Key Differences Between Iterable and Iterator

---

| Iterable                   | Iterator                        |
| -------------------------- | ------------------------------- |
| Represents a collection    | Used to iterate over collection |
| Has method iterator()      | Has methods hasNext(), next()   |
| Implemented by collections | Returned by iterator()          |
| Used in for-each loop      | Used in while loop traversal    |
| Provides iterator          | Performs iteration              |

---

## 8. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between Iterator and Iterable?

Answer like this:

> Iterable represents a collection that can be iterated over and provides the iterator() method. Iterator is used to traverse the collection and provides hasNext() and next() methods. The for-each loop in Java internally uses Iterable and Iterator to iterate through collections.
