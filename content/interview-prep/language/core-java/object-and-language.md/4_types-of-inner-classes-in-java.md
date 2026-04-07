---
title: "Types of Inner Classes in Java"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-210"
  phase: "Core"
  topic: "Object & Language"
  round: "Technical"
  company: ""
  tags:
    [
      "inner class",
      "static nested class",
      "anonymous class",
      "local class",
      "java",
    ]
---

## 1. Short Answer (Interview Style)

---

> **Java supports four types of nested classes: Member Inner Class, Static Nested Class, Local Inner Class, and Anonymous Inner Class. Member inner classes are associated with an outer object, static nested classes are associated with the outer class, local classes are defined inside methods, and anonymous classes are unnamed classes used for one-time implementations.**

---

## 2. Why This Question Matters

---

This question tests whether you understand:

- class structure in Java
- relationship between outer and inner classes
- memory and object references
- when to use anonymous classes
- static nested class usage (Builder pattern)

This is a common Core Java interview topic.

---

## 3. Types of Inner Classes in Java

---

Java has **four types of inner/nested classes**:

| Type                  | Description                             |
| --------------------- | --------------------------------------- |
| Member Inner Class    | Defined inside class but outside method |
| Static Nested Class   | Static class inside outer class         |
| Local Inner Class     | Defined inside method                   |
| Anonymous Inner Class | Class without name                      |

---

## 4. Member Inner Class

---

Member inner class is defined inside a class but outside methods.

It **requires outer class object**.

```java
class Outer {
    int x = 10;

    class Inner {
        void print() {
            System.out.println(x);
        }
    }
}
```

Usage:

```java
Outer o = new Outer();
Outer.Inner i = o.new Inner();
i.print();
```

Important point:

> Member inner class can access all outer class instance variables.

---

## 5. Static Nested Class

---

Static nested class is declared static inside outer class.

It **does not require outer class object**.

```java
class Outer {
    static int x = 10;

    static class Inner {
        void print() {
            System.out.println(x);
        }
    }
}
```

Usage:

```java
Outer.Inner i = new Outer.Inner();
i.print();
```

Important point:

> Static nested class does not hold reference to outer class object.

This is why it is used in **Builder Pattern**.

---

## 6. Local Inner Class

---

Local inner class is defined inside a method.

```java
class Outer {
    void display() {
        class LocalInner {
            void print() {
                System.out.println("Local inner class");
            }
        }

        LocalInner obj = new LocalInner();
        obj.print();
    }
}
```

Local class can access **final or effectively final variables** of the method.

---

## 7. Anonymous Inner Class

---

Anonymous class is a class without a name.

Used for **one-time implementation**.

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running");
    }
};
```

Commonly used with:

- Runnable
- Comparator
- Event listeners
- Thread

---

## 8. Differences Summary Table

---

| Type          | Needs Outer Object | Has Name | Where Defined |
| ------------- | ------------------ | -------- | ------------- |
| Member Inner  | Yes                | Yes      | Inside class  |
| Static Nested | No                 | Yes      | Inside class  |
| Local Class   | Yes                | Yes      | Inside method |
| Anonymous     | Yes                | No       | Inside method |

---

## 9. Important Interview Points

---

Interviewers often ask:

### Does inner class hold reference to outer class?

Answer: Yes, member inner class holds reference to outer class object.

### Does static nested class hold reference to outer class?

Answer: No.

### Why use static nested class?

Answer: Logical grouping and no outer object dependency.

### Where are anonymous classes used?

Answer: One-time implementation like Runnable, Comparator, listeners.

---

## 10. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are types of inner classes in Java?

Answer like this:

> Java has four types of nested classes: Member inner class, Static nested class, Local inner class, and Anonymous inner class. Member inner classes are associated with outer class objects, static nested classes belong to the class and do not require outer object, local classes are defined inside methods, and anonymous classes are used for one-time implementations.
