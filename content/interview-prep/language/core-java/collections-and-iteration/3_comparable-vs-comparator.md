---
title: "Comparable vs Comparator"
layout: "interview-prep-topic-content"
interview:
  id: "java-core-006"
  phase: "Core" # Core | Stretch | Advanced
  topic: "Collections"
  round: "Technical"
  company: "" # optional
  tags: ["comparable", "Comparator", "sorting", "collections", "java"]
---

## 1. Short Answer (Interview Style)

---

> **`Comparable` is used to define the natural ordering of objects inside the class itself, while `Comparator` is used to define custom ordering outside the class. `Comparable` supports one default sort order, whereas `Comparator` allows multiple different sorting strategies.**

---

## 2. What is Comparable?

---

`Comparable` is an interface used when a class wants to define its **natural ordering**.

It is implemented inside the class itself.

It contains one method:

```java
int compareTo(T other)
```

### Example

```java
class Employee implements Comparable<Employee> {
    private int id;
    private String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.id, other.id);
    }
}
```

Here `Employee` objects are naturally sorted by `id`.

---

## 3. What is Comparator?

---

`Comparator` is an interface used to define **custom ordering** externally, without modifying the original class.

It contains one method:

```java
int compare(T o1, T o2)
```

### Example

```java
Comparator<Employee> byName = (e1, e2) -> e1.getName().compareTo(e2.getName());
```

This allows sorting `Employee` objects by name, even if the natural order is by id.

---

## 4. Natural Ordering vs Custom Ordering

---

### Comparable

Used for **natural/default ordering**.

Examples:

- `String` → alphabetical order
- `Integer` → numeric order
- `LocalDate` → chronological order

### Comparator

Used for **custom/specific ordering**.

Examples:

- sort employees by name
- sort employees by salary descending
- sort students by marks
- sort products by price, rating, or category

---

## 5. Key Difference Between Comparable and Comparator

---

| Feature                  | Comparable                   | Comparator        |
| ------------------------ | ---------------------------- | ----------------- |
| Package                  | `java.lang`                  | `java.util`       |
| Method                   | `compareTo()`                | `compare()`       |
| Sorting logic location   | Inside class                 | Outside class     |
| Type of ordering         | Natural/default              | Custom/external   |
| Number of sort orders    | Usually one                  | Multiple possible |
| Modifies original class? | Yes, class must implement it | No                |

---

## 6. Example Using Comparable and Comparator

---

Let us take a custom `Employee` class and use it to understand both `Comparable` and `Comparator`.

### Employee class used in examples

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/master/src/main/java/com/theshubhamco/interviewquestion/corejava/collections/hashmap/Employee.java">See Code in Git Repo</a>
</div>

```java
public class Employee implements Comparable<Employee> {
    private final int id;
    private final String name;
    private final double salary;

    Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public int compareTo(Employee other) {
        // Natural ordering by id
        // Integer.compare(...) is preferred over subtraction
        // because it is clearer and avoids overflow issues.
        // Manual form would be:
        // return (this.id < other.id) ? -1 : ((this.id == other.id) ? 0 : 1);
        return Integer.compare(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                '}';
    }
}
```

In this class, compareTo() defines the **natural ordering** of employees by id.

---

### 6.1 Example of Comparable

Below is a more complete example using `Comparable`.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/master/src/main/java/com/theshubhamco/interviewquestion/corejava/collections/hashmap/ComparableExample.java">See Code in Git Repo</a>
</div>

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ComparableExample {
    public static void main(String[] args) {
        Employee emp1 = new Employee(101, "Alice", 90000);
        Employee emp2 = new Employee(102, "Charlie", 80000);
        Employee emp3 = new Employee(103, "Bob", 75000);

        // negative value because 101 < 102
        System.out.println("emp1.compareTo(emp2): " + emp1.compareTo(emp2));

        // 0 because 101 == 101
        System.out.println("emp1.compareTo(emp1): " + emp1.compareTo(emp1));

        // positive value because 103 > 102
        System.out.println("emp3.compareTo(emp2): " + emp3.compareTo(emp2));

        List<Employee> employees = new ArrayList<>();
        employees.add(emp1);
        employees.add(emp3);
        employees.add(emp2);

        System.out.println("Before sorting: " + employees);

        Collections.sort(employees);

        System.out.println("After sorting: " + employees);
    }
}
```

Output:

```output
emp1.compareTo(emp2): -1
emp1.compareTo(emp1): 0
emp3.compareTo(emp2): 1
Before sorting: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=103, name='Bob', salary=75000.0}, Employee{id=102, name='Charlie', salary=80000.0}]
After sorting: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}]
```

This uses the `compareTo()` method defined inside `Employee`.

#### What this example shows

- Employee implements `Comparable<Employee>`
- `compareTo()` defines the natural ordering
- `Collections.sort(...)` automatically uses `compareTo()`
- employees are sorted by id in ascending order

---

### 6.2 Example Using Comparator

---

Now let us sort the same `Employee` objects using different custom ordering rules.

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/master/src/main/java/com/theshubhamco/interviewquestion/corejava/collections/hashmap/ComparatorExample.java">See Code in Git Repo</a>
</div>

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ComparatorExample {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee(103, "Bob", 75000));
        employees.add(new Employee(101, "Alice", 90000));
        employees.add(new Employee(102, "Charlie", 80000));

        System.out.println("Before sorting: " + employees);

        employees.sort(null); // uses Comparable natural ordering
        System.out.println("After sorting by id using Comparable: " + employees);

        Comparator<Employee> byIdDesc =
                (e1, e2) -> Integer.compare(e2.getId(), e1.getId());

        employees.sort(byIdDesc);
        System.out.println("After sorting by id descending: " + employees);

        Comparator<Employee> byName =
                (e1, e2) -> e1.getName().compareTo(e2.getName());

        employees.sort(byName);
        System.out.println("After sorting by name: " + employees);

        Comparator<Employee> bySalaryDesc =
                (e1, e2) -> Double.compare(e2.getSalary(), e1.getSalary());

        employees.sort(bySalaryDesc);
        System.out.println("After sorting by salary descending: " + employees);
    }
}

```

Output:

```output
Before sorting: [Employee{id=103, name='Bob', salary=75000.0}, Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}]
After sorting by id using Comparable: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}]
After sorting by id descending: [Employee{id=103, name='Bob', salary=75000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=101, name='Alice', salary=90000.0}]
After sorting by name: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=103, name='Bob', salary=75000.0}, Employee{id=102, name='Charlie', salary=80000.0}]
After sorting by salary descending: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}]
```

This example shows that `Comparator` allows multiple custom sorting strategies without changing the `Employee` class.

---

### 6.3 Example Using Comparator.comparing(...) Methods

Java 8 introduced `static` helper methods in `Comparator` such as:

- `Comparator.comparing(...)`
- `Comparator.comparingInt(...)`
- `Comparator.comparingDouble(...)`

These methods make comparator creation cleaner and more readable.

- `comparing(...)` is used for **object/reference fields** like String, LocalDate, BigDecimal **any type that already implements Comparable**
- `comparingInt(...)` is used for int
- `comparingDouble(...)` is used for double

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/Core-Java-Learning/blob/master/src/main/java/com/theshubhamco/interviewquestion/corejava/collections/hashmap/ComparatorUsingComparingMethodExample.java">See Code in Git Repo</a>
</div>

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ComparatorUsingComparingMethodExample {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee(103, "Bob", 75000));
        employees.add(new Employee(101, "Alice", 90000));
        employees.add(new Employee(102, "Charlie", 80000));
        employees.add(new Employee(104, "David", 80000));

        System.out.println("Before sorting: " + employees);

        employees.sort(null); // uses Comparable natural ordering
        System.out.println("After sorting by id using Comparable: " + employees);

        Comparator<Employee> byIdDesc =
                Comparator.comparingInt(Employee::getId).reversed();

        employees.sort(byIdDesc);
        System.out.println("After sorting by id descending: " + employees);

        Comparator<Employee> byName =
                Comparator.comparing(Employee::getName);

        employees.sort(byName);
        System.out.println("After sorting by name: " + employees);

        Comparator<Employee> bySalaryDesc =
                Comparator.comparingDouble(Employee::getSalary).reversed();

        employees.sort(bySalaryDesc);
        System.out.println("After sorting by salary descending: " + employees);

        Comparator<Employee> bySalaryAndName =
                bySalaryDesc.thenComparing(byName);

        employees.sort(bySalaryAndName);
        System.out.println("After sorting by salary descending and then by name: " + employees);
    }
}
```

Output:

```output
Before sorting: [Employee{id=103, name='Bob', salary=75000.0}, Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=104, name='David', salary=80000.0}]
After sorting by id using Comparable: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}, Employee{id=104, name='David', salary=80000.0}]
After sorting by id descending: [Employee{id=104, name='David', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=101, name='Alice', salary=90000.0}]
After sorting by name: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=103, name='Bob', salary=75000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=104, name='David', salary=80000.0}]
After sorting by salary descending: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=104, name='David', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}]
After sorting by salary descending and then by name: [Employee{id=101, name='Alice', salary=90000.0}, Employee{id=102, name='Charlie', salary=80000.0}, Employee{id=104, name='David', salary=80000.0}, Employee{id=103, name='Bob', salary=75000.0}]
```

### What this example shows

- `Comparator.comparing(...)` creates comparators more cleanly
- `.reversed()` changes ascending order to descending order
- `.thenComparing(...)` allows chained sorting

---

## 7. Why Comparator Is More Flexible

---

This is a very common interview angle.

Suppose an `Employee` class can be sorted by:

- id
- name
- salary
- joining date

With `Comparable`, you can define only one natural ordering inside the class.

With `Comparator`, you can create multiple strategies:

```java
Comparator<Employee> byId = Comparator.comparingInt(Employee::getId);
Comparator<Employee> byName = Comparator.comparing(Employee::getName);
Comparator<Employee> bySalary = Comparator.comparingDouble(Employee::getSalary);
```

So `Comparator` is more flexible in real-world applications.

---

## 8. When Should We Use Comparable?

---

Use `Comparable` when:

- the class has one obvious natural order
- objects should be sortable by default
- ordering is an essential part of the class design

Examples:

- `String`
- `Integer`
- `LocalDate`

---

## 9. When Should We Use Comparator?

---

Use `Comparator` when:

- you need multiple sorting options
- you do not want to modify the original class
- the class belongs to a third-party library
- sorting rules change depending on business need

In modern Java, `Comparator` is used heavily because it works very well with lambdas and method references.

---

## 10. Important Interview Points

---

A few strong points to mention in interviews:

- `Comparable` changes the class design because the class itself implements ordering
- `Comparator` keeps sorting logic outside the class
- `Comparator` is better when multiple sorting rules are needed
- `compareTo()` and `compare()` should return:
  - negative value if first object is smaller
  - zero if equal
  - positive value if first object is greater

Also remember:

> A bad comparison implementation can break sorting behavior or sorted collections like `TreeSet` and `TreeMap`.

---

## 11. Interview Follow-up Questions

---

After asking **"Comparable vs Comparator"**, interviewers often ask related follow-up questions.

### Common Follow-up Questions

| Follow-up Question                                              | What Interviewer Is Testing     |
| --------------------------------------------------------------- | ------------------------------- |
| Why is Comparator more flexible?                                | Design understanding            |
| Can we use multiple Comparators for same class?                 | Real-world sorting              |
| What happens if compareTo() is inconsistent with equals()?      | Collection correctness          |
| Why is Comparable in `java.lang` and Comparator in `java.util`? | API awareness                   |
| Which one is used by TreeSet / TreeMap?                         | Sorted collection understanding |
| Can we sort in reverse order?                                   | Comparator utility methods      |
| How do lambdas improve Comparator usage?                        | Java 8 knowledge                |

---

## 12. Common Mistakes

---

Common mistakes developers make:

- Saying `Comparable` and `Comparator` are the same
- Forgetting that `Comparable` lives inside the class
- Forgetting that `Comparator` can provide multiple sort orders
- Writing comparison logic using subtraction, which can overflow
- Not keeping comparison logic consistent
- Not understanding impact on `TreeSet` and `TreeMap`

---

## 13. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What is the difference between `Comparable` and `Comparator`?

Answer like this:

> `Comparable` is used to define the natural ordering of objects inside the class through the `compareTo()` method, while `Comparator` is used to define custom ordering outside the class through the `compare()` method. `Comparable` is suitable when there is one default sort order, but `Comparator` is more flexible because it allows multiple sorting strategies without modifying the original class.

This is a **strong interview answer**.
