---
title: "Object Class Methods"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-206"
  phase: "Core"
  topic: "Object & Language"
  round: "Technical"
  company: ""
  tags: ["object class", "equals", "hashcode", "tostring", "clone", "java"]
---

## 1. Short Answer (Interview Style)

---

> **The Object class is the root class of all classes in Java. Every class implicitly extends Object. Important methods of the Object class include equals(), hashCode(), toString(), clone(), and finalize(). The equals() and hashCode() methods are especially important when working with collections like HashMap and HashSet.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- Java inheritance hierarchy
- Object comparison
- HashMap / HashSet internals
- Overriding equals and hashCode
- Object representation

This is a very common Core Java interview question.

---

## 3. Object Class in Java

---

In Java, every class implicitly extends the `Object` class.

Example:

```java
class Employee {
}
```

This is internally:

```java
class Employee extends Object {
}
```

So all classes inherit methods from the Object class.

---

## 4. Important Methods of Object Class

---

| Method                        | Description                             |
| ----------------------------- | --------------------------------------- |
| equals()                      | Compares objects for equality           |
| hashCode()                    | Returns hash code value                 |
| toString()                    | Returns string representation           |
| clone()                       | Creates object copy                     |
| finalize()                    | Called before object garbage collection |
| getClass()                    | Returns runtime class                   |
| wait(), notify(), notifyAll() | Used in multithreading                  |

Most commonly discussed in interviews:

- equals()
- hashCode()
- toString()
- clone()

---

## 5. equals() Method

---

The `equals()` method is used to compare two objects for logical equality.

Example:

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1.equals(s2));
```

This compares **values**, not memory addresses.

Difference:

| Operator | Purpose                 |
| -------- | ----------------------- |
| ==       | Compares memory address |
| equals() | Compares object content |

---

## 6. hashCode() Method

---

`hashCode()` returns an integer hash value of an object.

It is mainly used in:

- HashMap
- HashSet
- Hashtable

Important rule:

> If two objects are equal using equals(), they must have the same hashCode().

This is very important for HashMap working.

---

## 7. equals() and hashCode() Contract

---

Interview very important point:

If you override equals(), you must override hashCode() as well.

Otherwise HashMap and HashSet will not work correctly.

Example problem:

```java
class Employee {
    int id;

    public boolean equals(Object obj) {
        Employee e = (Employee) obj;
        return this.id == e.id;
    }
}
```

If hashCode is not overridden, HashSet may store duplicate objects.

---

## 8. toString() Method

---

`toString()` returns string representation of object.

Default implementation:

```
ClassName@hashcode
```

Example:

```java
class Employee {
    int id;
    String name;

    public String toString() {
        return id + " " + name;
    }
}
```

This is useful for logging and debugging.

---

## 9. clone() Method

---

The `clone()` method is used to create a copy of an object.

To use clone, class must implement `Cloneable` interface.

```java
class Employee implements Cloneable {
    int id;

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

Clone creates **shallow copy** by default.

---

## 10. finalize() Method

---

### 10. finalize() Method

The `finalize()` method in Java was intended to be called by the Garbage Collector before reclaiming an object's memory. It was used to perform cleanup activities such as closing file handles, database connections, or network connections.

However, `finalize()` had several problems:

- There is no guarantee when it will be executed
- There is no guarantee it will be executed at all
- It causes performance overhead
- It can lead to memory leaks
- It slows down garbage collection

Because of these issues, `finalize()` was **deprecated starting from Java 9** and should not be used.

Modern Java uses:

- try-with-resources
- AutoCloseable
- Cleaner API

instead of finalize().

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are important methods of Object class?

Answer like this:

> The Object class is the root class of all classes in Java, and every class implicitly extends it. Important methods include equals(), hashCode(), toString(), clone(), and finalize(). The equals() and hashCode() methods are especially important when working with HashMap and HashSet because they are used to compare objects and store them in hash-based collections.
