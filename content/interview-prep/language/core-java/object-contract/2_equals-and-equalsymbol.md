---
title: "== vs equals()"
layout: "interview-prep-topic-content"
weight: 3
interview:
  id: "java-core-003"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Object Contract"
  round: "Technical"
  company: ""
  tags: ["equals", "double-equals", "object", "string", "comparison"]
---

## 1. Short Answer (Interview Style)

---

> **`==` compares whether two references point to the same object in memory, while `equals()` compares whether two objects should be considered equal.  
> By default, `equals()` behaves like `==`, but many classes such as `String` override it to compare content instead of reference.**

---

## 2. What Does `==` Do in Java?

---

The `==` operator checks whether two references point to the **same object in memory**.

For primitive types, `==` compares actual values.

For objects, `==` compares references.

### Example with primitives

```java
int a = 10;
int b = 10;

System.out.println(a == b); // true
```

Here == compares actual values.

### Example with objects

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a == b); // false
```

Here a and b are different objects in memory, so == returns false.

---

## 3. What Does equals() Do?

---

The equals() method is used to compare two objects for equality.

However, its behavior depends on whether the class overrides it or not.

### Default behavior

By default, equals() from the Object class compares references, just like ==.

```java
Object obj1 = new Object();
Object obj2 = new Object();

System.out.println(obj1.equals(obj2)); // false
```

### Overridden behavior

Many classes override equals() to compare logical content instead of reference.

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a.equals(b)); // true
```

---

## 4. Difference Between `==` and `equals()`

---

| Comparison            | What it checks                                                |
| --------------------- | ------------------------------------------------------------- |
| `==`                  | Reference equality for objects, value equality for primitives |
| `equals()` default    | Reference equality                                            |
| `equals()` overridden | Logical/content equality                                      |

So for objects:

- `==` asks: **Are these the exact same object?**
- `equals()` asks: **Should these two objects be considered equal?**

---

## 5. Example with String

---

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);       // false
System.out.println(a.equals(b));  // true
```

Explanation:

- a == b is false because both references point to different objects
- a.equals(b) is true because both strings contain the same characters

---

## 6. Example with Custom

---

```java
class Demo {
    int a = 10;
}
```

```java
Demo object1 = new Demo();
Demo object2 = new Demo();

System.out.println(object1 == object2);       // false
System.out.println(object1.equals(object2));  // false
```

Why does equals() return false here?

> Because Demo does not override equals(), so it inherits the default behavior from Object, which compares references.

---

## 7. Example After Overriding equals()

---

```java
class Demo {
    int a = 10;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Demo)) return false;
        Demo other = (Demo) obj;
        return this.a == other.a;
    }
}
```

Now:

```java
Demo object1 = new Demo();
Demo object2 = new Demo();

System.out.println(object1 == object2);       // false
System.out.println(object1.equals(object2));  // true
```

Now equals() compares logical state instead of reference.

---

## 8. String Pool Confusion (Very Common Interview Trap)

---

Consider this example:

```java
String a = "hello";
String b = "hello";

System.out.println(a == b);      // true
System.out.println(a.equals(b)); // true
```

Here both are true because string literals are stored in the **String Pool**, and both a and b point to the same pooled object.

Now compare with:

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true
```

Here:

- new String("hello") creates separate objects
- so == becomes false
- but equals() still returns true because content is the same

---

## 9. Interview Follow-up Questions

---

After asking **"`==` vs `equals()`"**, interviewers often ask related follow-ups.

### Common Follow-up Questions

| Follow-up Question                                     | What Interviewer Is Testing |
| ------------------------------------------------------ | --------------------------- |
| Why does String override `equals()`?                   | Logical equality            |
| Why is `a == b` true for string literals?              | String pool                 |
| Why is `a == b` false for `new String("hello")`?       | Heap vs pool                |
| Can `equals()` and `==` both return true?              | Reference + content         |
| Can `equals()` return true while `==` returns false?   | Logical equality            |
| What is default implementation of `equals()`?          | Object class basics         |
| How should `equals()` be overridden in custom classes? | OOP design                  |

---

## 10. Common Mistakes

---

Common mistakes developers make:

- Thinking `==` compares object content
- Assuming `equals()` always means logical equality
- Forgetting that default `equals()` compares references
- Getting confused by String pool behavior
- Using `==` instead of `equals()` for String comparison
- Forgetting null safety while calling `equals()`

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between `==` and `equals()` in Java?

Answer like this:

> `==` compares whether two references point to the same object in memory, while `equals()` compares whether two objects should be considered equal.  
> By default, `equals()` from the `Object` class behaves like `==`, but many classes like `String` override it to compare logical content instead of reference.

This is a **strong interview answer**.
