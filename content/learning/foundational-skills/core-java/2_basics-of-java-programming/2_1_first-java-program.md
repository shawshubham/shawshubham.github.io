---
title: "Write Your First Java Program"
weight: 1
description: "Learn how to write, compile, and run your first Java program — with clear explanations and beginner-friendly examples."
date: 2025-10-23
layout: "topic-content"
---

# Let's Write Our First Java Program

---

Creating your first Java program is an exciting milestone.  
In this lesson, you’ll learn how to:

- Write a simple Java program
- Compile the `.java` source file
- Run the compiled bytecode
- Understand the basic program structure

This will give you the foundation needed for all future Java development.

## 1. Before You Begin

---

Ensure that:

✔ You have installed the **Java Development Kit (JDK)**  
✔ Environment variables (`JAVA_HOME` and `PATH`) are set  
✔ You have an IDE or text editor ready

If not, revisit the previous lesson:

<a href="/learning/foundational-skills/core-java/1_introduction-to-java/1_8_setting-environment">👉 _Setting Up the Development Environment (Installing JDK and an IDE)_</a>

## 2. Your First Program: HelloWorld

---

We start with the classic **Hello, World!** program — the simplest way to confirm your Java setup works.

### Step-by-Step Guide

#### **Step 1 — Open your IDE or text editor**

You may use:

- IntelliJ IDEA (recommended)
- Eclipse
- VS Code
- Notepad / Sublime (for simple editing)

#### **Step 2 — Create a new file**

Name the file:

```
HelloWorld.java
```

> **Important:**
> In Java, the _public class name must match the filename exactly_.

#### **Step 3 — Write the code**

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/master/src/main/java/com/theshubhamco/basicsofjava/firstprogram/HelloWorld.java">See Code in Git Repo</a>
    <a class="btn nav-btn" href="/learning/online-compilers/online-java-compiler/1_java-compiler/1_1_java-compiler/">Practice Java Code Here</a>
</div>

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Code Breakdown

#### **public class HelloWorld**

Defines a class named `HelloWorld`.
Every Java program must be inside a class.

#### **public static void main(String[] args)**

This is the **entry point** of every Java application.

- `public` → accessible to the JVM
- `static` → runs without creating an object
- `void` → no return value
- `main` → method name
- `String[] args` → command-line arguments

#### **System.out.println("Hello, World!");**

Prints a message to the console.

- `System` → built-in Java class
- `out` → output stream
- `println()` → prints with a newline

## 3. Compiling the Java Program

---

Open a **terminal** or **Command Prompt**, then navigate to the folder containing your file:

```sh
cd path/to/your/file
```

Compile using:

```sh
javac HelloWorld.java
```

This will generate:

```
HelloWorld.class
```

This `.class` file contains **Java bytecode**, which the JVM executes.

## 4. Running the Program

---

Run the compiled bytecode:

```sh
java HelloWorld
```

You should see:

```
Hello, World!
```

🎉 Congratulations! You've successfully run your first Java program.

## 5. Troubleshooting Common Issues

---

#### ❌ **Error: class HelloWorld is public, should be declared in a file named HelloWorld.java**

Your filename must match the public class name **exactly**.

#### ❌ **'javac' is not recognized**

JAVA_HOME or PATH is not set correctly.

#### ❌ **NoClassDefFoundError**

You may be running:

```
java HelloWorld.class
```

Instead of:

```
java HelloWorld
```

#### ❌ Nothing prints?

Check:

```java
System.out.println          // correct
System.out.printIn          // incorrect (capital I)
```

## 6. Real-World Insight

---

Every Java application — from web servers to Android apps — begins execution inside a `main()` method (except frameworks that wrap it).
This simple “Hello World” program introduces:

- Java class structure
- Method declaration
- Console output
- Compilation and execution flow

These fundamentals apply to all Java projects.

## Conclusion

---

Ensure that:

✔ Created your first Java class  
✔ Compiled Java source code  
✔ Executed Java bytecode  
✔ Understood the program structure

This foundational knowledge prepares you for deeper Java concepts.

### 🔗 What's Next?

---

Now that you've written your first Java program, it’s time to understand **how Java code is structured** — including classes, methods, comments, and the overall syntax rules.

Up next:  
**👉 [Understanding the Java Program Structure](/learning/foundational-skills/core-java/2_basics-of-java-programming/2_2_java-program-structure/)**  
Learn how a Java file is organized and what each part of a Java program means.

---

> 📝 **Takeaway**: You just wrote and ran your first Java program!  
> This milestone marks the beginning of your Java journey — and everything you learn next builds on this foundation.
