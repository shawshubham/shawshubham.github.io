---
title: "How does HashMap work internally?"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-004"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Collections"
  round: "Technical"
  company: "" # optional
  tags: ["hashmap", "collections", "hashing", "collision", "rehashing"]
---

## 1. Short Answer (Interview Style)

---

> **HashMap stores data as key-value pairs and uses the key’s `hashCode()` to decide the bucket where the entry should go. If multiple keys land in the same bucket, HashMap uses `equals()` to identify the correct key.**

---

## 2. What is HashMap?

---

`HashMap` is a data structure in Java used to store data in **key-value** form.

Example:

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "Alice");
map.put(2, "Bob");
```

Here:

- `1` and `2` are keys
- `"Alice"` and `"Bob"` are values

A `HashMap` allows fast insertion, lookup, and deletion on average.

### Time and Space Complexity

| Operation  | Average Case | Worst Case |
| ---------- | ------------ | ---------- |
| `put()`    | O(1)         | O(n)       |
| `get()`    | O(1)         | O(n)       |
| `remove()` | O(1)         | O(n)       |

### Space Complexity

- **O(n)**, where `n` is the number of key-value pairs stored in the map

These average-case time complexities are possible because `HashMap` uses hashing to distribute entries across buckets.

The worst case happens when too many keys collide into the same bucket.

---

## 3. Internal Structure of HashMap

---

Internally, `HashMap` uses an **array of buckets**.

Each bucket can store one or more entries.

Each entry contains:

- key
- value
- hash
- reference to next entry (in case of collision)

Conceptually it looks like this:

```text
bucket[0] -> null
bucket[1] -> Entry(key1, value1)
bucket[2] -> Entry(key2, value2) -> Entry(key3, value3)
bucket[3] -> null
```

So a `HashMap` is not just a simple list of entries. It first spreads keys across buckets using hashing.

---

## 4. How put() Works Internally

---

When we do:

```java
map.put(key, value);
```

Java follows these steps.

### Step 1 — Calculate hash

It calls:

```java
key.hashCode()
```

But HashMap does not directly use this raw value as-is.

It applies a small bit-spreading step so that higher bits also influence bucket selection:

```java
int h = key.hashCode();
hash = h ^ (h >>> 16);
```

This improves distribution when bucket index is calculated.

### Step 2 — Find bucket index

Conceptually, bucket index is derived from the hash and array length.

A simplified explanation is:

```java
index = hash % arrayLength
```

But Java HashMap actually uses a faster approach because bucket array size is kept as a **power of 2**:

```java
index = (n - 1) & hash;
```

where n is the current bucket array length.

This is faster than modulo and works efficiently because the capacity is always a power of 2.

### Step 3 — Check bucket

- If bucket is empty → insert entry directly
- If bucket already has entries → collision handling starts

### Step 4 — Use equals()

If entries already exist in that bucket, `HashMap` compares keys using `equals()`.

- If same key is found → update value
- Else → add new entry

---

## 5. How get() Works Internally

---

When we do:

```java
map.get(key);
```

Java does the following:

1. call `key.hashCode()`
2. apply hash spreading
3. compute bucket index
4. go to that bucket
5. traverse entries in that bucket
6. use `equals()` to find the exact matching key
7. return the value

This is why both `hashCode()` and `equals()` are critical.

---

## 6. What is Collision?

---

A **collision** happens when two different keys produce the same bucket index.

Example:

- key1 goes to bucket 5
- key2 also goes to bucket 5

Both keys are different, but they land in the same bucket.

That does **not** mean the keys are equal.
It only means their hashes mapped to the same bucket.

`HashMap` handles this by storing multiple entries in the same bucket and then using `equals()` to distinguish them.

---

## 7. How Collision Is Handled

---

In older implementations, collisions were handled using a **linked list**.

So if multiple keys landed in the same bucket, entries were chained together.

In modern Java versions, if too many entries pile up in one bucket, the linked list can be converted into a **balanced tree** to improve lookup performance.

So collision handling may use:

- linked list
- balanced tree (for large collision chains)

---

## 8. Why hashCode() and equals() Both Matter

---

This is one of the most important interview points.

`HashMap` needs both methods:

### `hashCode()`

Used to find the correct bucket quickly.

### `equals()`

Used to find the exact key inside that bucket.

So:

- `hashCode()` gives speed
- `equals()` gives correctness

If `equals()` and `hashCode()` are not implemented properly, `HashMap` will behave incorrectly.

---

## 9. What is Load Factor?

---

The **load factor** tells us when `HashMap` should resize.

Default load factor is usually:

```java
0.75
```

HashMap uses this to calculate a **threshold**:

```java
threshold = capacity * loadFactor
```

For example, if:

- capacity = 16
- load factor = 0.75

Then:

```java
threshold = 16 * 0.75 = 12
```

That means when the number of entries becomes greater than 12, the map resizes or  
we can say when the map becomes 75% full, it resizes its internal bucket array.

Why?

Because if too many entries are packed into too few buckets, collisions increase and performance degrades.

So in interview terms:

- load factor = resize policy
- threshold = actual resize trigger

---

## 10. What is Rehashing?

---

When the number of entries crosses the load factor threshold, `HashMap` creates a larger bucket array.

Typically, the capacity is doubled.

Example:

- old capacity = 16
- new capacity = 32

Then all existing entries are redistributed into the new bucket array.

This process is called **rehashing**.

Rehashing improves distribution and reduces collisions, but it is more expensive than a normal insertion because many existing entries must be repositioned.

---

## 11. Is HashMap Thread-Safe?

---

No, `HashMap` is **not thread-safe**.

If multiple threads modify a `HashMap` at the same time without synchronization, it can lead to inconsistent behavior.

For concurrent scenarios, Java provides alternatives like:

- `ConcurrentHashMap`
- synchronized wrappers

---

## 12. Can We Implement Our Own HashMap?

---

Yes. Interviewers sometimes ask for a simplified custom `HashMap` implementation.

Usually they do not expect the full production-grade JDK version.

They want to see whether you understand:

- bucket array
- hashing
- bucket index calculation
- collision handling
- `put()` and `get()`
- why `equals()` is needed after `hashCode()`

A minimal custom `HashMap` can be implemented using:

- an array of buckets
- an `Entry` node containing key, value, and next pointer
- linked-list chaining for collisions

Typical methods include:

- `put(K key, V value)`
- `get(K key)`
- optional `remove(K key)`

This kind of implementation demonstrates that you understand how `HashMap` works internally, even if it does not include advanced JDK features like treeification, fail-fast iterators, or concurrency support.

### Simplified Example:

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/master/src/main/java/com/theshubhamco/interviewquestion/corejava/collections/hashmap/MyHashMap.java">See Code in Git Repo</a>
</div>

```java
class MyHashMap<K, V> {

    static class Entry<K, V> {
        K key;
        V value;
        Entry<K, V> next;

        Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    private Entry<K, V>[] buckets;
    private int capacity = 16;

    @SuppressWarnings("unchecked")
    public MyHashMap() {
        buckets = new Entry[capacity];
    }

    private int getIndex(K key) {
        int hash = key == null ? 0 : key.hashCode();
        return (capacity - 1) & hash;
    }

    public void put(K key, V value) {
        int index = getIndex(key);
        Entry<K, V> head = buckets[index];

        Entry<K, V> current = head;
        while (current != null) {
            if ((key == null && current.key == null) ||
                (key != null && key.equals(current.key))) {
                current.value = value;
                return;
            }
            current = current.next;
        }

        Entry<K, V> newEntry = new Entry<>(key, value);
        newEntry.next = head;
        buckets[index] = newEntry;
    }

    public V get(K key) {
        int index = getIndex(key);
        Entry<K, V> current = buckets[index];

        while (current != null) {
            if ((key == null && current.key == null) ||
                (key != null && key.equals(current.key))) {
                return current.value;
            }
            current = current.next;
        }

        return null;
    }
}
```

---

## 13. Interview Follow-up Questions

---

After asking **"How does HashMap work internally?"**, interviewers often ask follow-up questions.

### Common Follow-up Questions

| Follow-up Question                                    | What Interviewer Is Testing |
| ----------------------------------------------------- | --------------------------- |
| What is collision?                                    | Hashing basics              |
| How is collision handled?                             | Internal structure          |
| What is load factor?                                  | Performance awareness       |
| What is rehashing?                                    | Resizing behavior           |
| Why do we need equals() if hashCode() already exists? | Correctness vs speed        |
| Can two unequal keys have same hashCode()?            | Collision understanding     |
| What happens if key is mutable?                       | Real-world bug awareness    |
| Is HashMap thread-safe?                               | Concurrency basics          |
| Difference between HashMap and ConcurrentHashMap?     | Production knowledge        |

---

## 14. Common Mistakes

---

Common mistakes developers make:

- Saying `HashMap` uses only `hashCode()`
- Forgetting that `equals()` is also used
- Thinking same hashCode means same object
- Ignoring collisions
- Not knowing what load factor means
- Confusing rehashing with collision handling
- Saying `HashMap` is thread-safe
- Using mutable keys carelessly

---

## 15. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> How does `HashMap` work internally?

Answer like this:

> `HashMap` stores entries in an array of buckets. It first uses the key’s `hashCode()`, applies a hash-spreading step, and then computes the bucket index. Inside that bucket, it uses `equals()` to identify the exact key. If multiple keys land in the same bucket, that is a collision, and HashMap handles it using chained entries and, in modern Java, sometimes balanced trees. It also resizes itself based on threshold, which is calculated using capacity × load factor.

This is a **strong interview answer**.
