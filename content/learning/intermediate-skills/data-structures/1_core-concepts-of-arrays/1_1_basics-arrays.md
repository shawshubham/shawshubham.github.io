---
title: "Arrays Basic (1D & 2D Arrays)"
weight: 1
description: "Core Concepts With Java Examples"
date: 2025-06-12
layout: "topic-content"
---

# Arrays Basics (1D & 2D) – Core Concepts with Java Examples

---

Arrays are one of the most fundamental data structures in computer science. They store elements of the same type in contiguous memory locations and provide fast random access using indices. Arrays are essential for building more complex data structures and solving algorithmic problems efficiently.

## 1. What is an Array?

---

An **array** is a **fixed-size**, **indexed** collection of elements of the **same data type**, stored in **contiguous memory**.

**Real-world analogy:** Imagine a row of lockers. Each locker (index) stores one item (element), and you can directly access any locker by its number.

## 2. Why Arrays?

---

- Fast access using index (O(1) time)
- Predictable memory layout
- Foundation for other data structures (stacks, queues, matrices)

## 3. Array Declaration & Initialization (Java)

---

### 3.1 1D Arrays

```java
// Declaration
int[] arr1;
int arr2[]; // Valid, but less preferred

// Initialization
arr1 = new int[5];  // [0, 0, 0, 0, 0]

// Declaration + Initialization
int[] arr3 = {1, 2, 3, 4, 5};
```

> Note: Default values – `int` initializes to 0, `boolean` to false, `Object` references to null.

### 3.2 2D Arrays

```java
// Declaration
int[][] matrix = new int[3][4]; // 3 rows, 4 columns
int[][] matrix2 = {
    {1, 2, 3},
    {4, 5, 6}
};
```

**Use Case:** Representing grids, game boards, spreadsheets, etc.

## 4. Accessing and Modifying Elements

---

```java
int[] arr = {10, 20, 30};
int value = arr[1];       // Access element at index 1 → 20
arr[2] = 50;              // Update index 2 to 50
System.out.println(arr[2]); // Output: 50
```

- Indexing starts from `0`
- Access/modification is O(1)
- Be cautious of `ArrayIndexOutOfBoundsException`

## 5. Array Length

---

```java
int[] arr = new int[10];
System.out.println(arr.length); // Output: 10
```

## 6. Time Complexity of Operations

---

| Operation              | Time Complexity | Description                |
| ---------------------- | --------------- | -------------------------- |
| Access by index        | O(1)            | Direct lookup              |
| Update by index        | O(1)            | Constant-time update       |
| Insert/Delete (middle) | O(n)            | Requires shifting elements |
| Search (unsorted)      | O(n)            | Linear search              |
| Search (sorted)        | O(log n)        | Binary search              |

## 7. Common Mistakes

---

- ❌ Off-by-one errors: `arr[arr.length]` is invalid

```java
int[] arr = {10, 20, 30};  // length is 3
System.out.println(arr[arr.length]); // ❌ ArrayIndexOutOfBoundsException
System.out.println(arr[arr.length-1]); // ✅ This will work as arr.length = 3 but arr[3] is out of bound
```

- ❌ Forgetting zero-based indexing
- ❌ Not checking array length before access

## 8. Quick Quiz

---

What will be the output?

```java
int[] nums = {1, 2, 3, 4};
nums[2] = nums[0] + nums[1];
System.out.println(nums[2]);
```

<details>
<summary>Answer</summary>
3
</details>

### 🔗 What's Next?

---

Now that you've mastered the core concepts of arrays, it's time to apply them in problem-solving.

Up next:  
**👉 [Interview-Style Problems on Arrays](/learning/intermediate-skills/data-structures/arrays/1_2_array-problems/)**  
Practice problems to strengthen your understanding: reverse array, rotate array, find missing number, and more.

---

> 📝 **Takeaway**: Arrays are simple yet powerful. Mastering array operations, time complexities, and problem-solving patterns is the key to cracking coding interviews and understanding more advanced data structures.
