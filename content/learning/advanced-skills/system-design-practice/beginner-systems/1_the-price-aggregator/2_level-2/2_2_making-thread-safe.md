---
title: "Level 2 — Making PriceTracker Thread-Safe"
description: "Make the PriceTracker implementation thread-safe by evolving from synchronized methods to synchronized blocks and ReentrantReadWriteLock."
keywords:
  - thread safe price tracker
  - synchronized java
  - reentrantreadwritelock java
  - concurrency price aggregator
  - java thread safety interview
weight: 2
layout: "topic-content"
---

## 1. Goal of This Article

---

In the previous article, we saw that our optimized `PriceTracker` is correct only in a **single-threaded environment**.

Now we need to make it safe when:

- multiple threads call `addPrice(...)`
- multiple threads call `getMovingAverage(...)`
- reads and writes happen at the same time

> 📝 **Goal:**  
> Preserve correctness first, then improve concurrency where possible.

---

## 2. Current Problem Recap

---

Our current implementation uses shared mutable state:

```java
private final List<Double> prices;
private final List<BigDecimal> prefixPriceSums;
```

Both lists are modified/read by multiple methods.

The dangerous operations are:

```java
prices.add(price);
prefixPriceSums.add(...);
```

and:

```java
prefixPriceSums.get(lastIndex)
prefixPriceSums.get(lastIndex - count)
```

If these happen concurrently, the reader may observe inconsistent state.

---

## 3. Step 1 — Use `synchronized` Methods

---

The simplest way to make the class thread-safe is to synchronize both public methods.

```java
public synchronized void addPrice(double price) {
    // write shared state
}

public synchronized double getMovingAverage(int k) {
    // read shared state
}
```

This ensures only one thread can execute either method at a time on the same `PriceTracker` instance.

---

## 4. Synchronized Method Implementation

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/thepriceaggregator/optimized/threadsafe/synchronizedmethod">See Code in Git Repo</a>
</div>

```java
package com.theshubhamco.thepriceaggregator.threadsafe.synchronizedmethod;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class PriceTracker {

    private final List<Double> prices;
    private final List<BigDecimal> prefixPriceSums;

    public PriceTracker() {
        this.prices = new ArrayList<>();
        this.prefixPriceSums = new ArrayList<>();
        this.prefixPriceSums.add(BigDecimal.ZERO);
    }

    public synchronized void addPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("price must be greater than or equal to 0");
        }

        prices.add(price);

        BigDecimal latestPrefixSum = prefixPriceSums
                .get(prefixPriceSums.size() - 1)
                .add(BigDecimal.valueOf(price));

        prefixPriceSums.add(latestPrefixSum);
    }

    public synchronized double getMovingAverage(int k) {
        if (k <= 0) {
            throw new IllegalArgumentException("k must be greater than 0");
        }

        if (prices.isEmpty()) {
            throw new IllegalStateException("No prices available");
        }

        int count = Math.min(k, prices.size());
        return calculateMovingAverage(count);
    }

    private double calculateMovingAverage(int count) {
        int lastIndex = prefixPriceSums.size() - 1;

        BigDecimal sum = prefixPriceSums.get(lastIndex)
                .subtract(prefixPriceSums.get(lastIndex - count));

        return sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
```

---

## 5. Why This Works

---

`synchronized` protects the critical section using the intrinsic lock of the object.

That means:

```text
Thread A enters addPrice()
Thread B tries getMovingAverage()
Thread B waits until Thread A exits
```

This prevents:

- lost updates
- broken prefix sums
- reads during partial writes

---

## 6. Limitation of `synchronized` Methods

---

The solution is correct, but it is restrictive.

With synchronized methods:

```text
one writer blocks all readers
one reader blocks all writers
one reader blocks other readers
```

This can reduce throughput when many threads only want to read the moving average.

---

## 7. Step 2 — Use `synchronized` Blocks

---

Instead of synchronizing the whole method, we can synchronize only the part that touches shared state.

```java
synchronized (this) {
    // critical section
}
```

This gives more control over lock scope.

---

## 8. Synchronized Block Implementation

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/thepriceaggregator/optimized/threadsafe/synchronizedblock">See Code in Git Repo</a>
</div>

```java
package com.theshubhamco.thepriceaggregator.threadsafe.synchronizedblock;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class PriceTracker {

    private final List<Double> prices;
    private final List<BigDecimal> prefixPriceSums;

    public PriceTracker() {
        this.prices = new ArrayList<>();
        this.prefixPriceSums = new ArrayList<>();
        this.prefixPriceSums.add(BigDecimal.ZERO);
    }

    public void addPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("price must be greater than or equal to 0");
        }

        synchronized (this) {
            prices.add(price);

            BigDecimal latestPrefixSum = prefixPriceSums
                    .get(prefixPriceSums.size() - 1)
                    .add(BigDecimal.valueOf(price));

            prefixPriceSums.add(latestPrefixSum);
        }
    }

    public double getMovingAverage(int k) {
        if (k <= 0) {
            throw new IllegalArgumentException("k must be greater than 0");
        }

        synchronized (this) {
            if (prices.isEmpty()) {
                throw new IllegalStateException("No prices available");
            }

            int count = Math.min(k, prices.size());
            return calculateMovingAverage(count);
        }
    }

    private double calculateMovingAverage(int count) {
        int lastIndex = prefixPriceSums.size() - 1;

        BigDecimal sum = prefixPriceSums.get(lastIndex)
                .subtract(prefixPriceSums.get(lastIndex - count));

        return sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
```

---

## 9. What Did We Improve?

---

We moved validation outside the lock where possible.

Example:

```java
if (price < 0) {
    throw new IllegalArgumentException(...);
}
```

This does not need synchronization because it does not access shared state.

---

## 10. Limitation of `synchronized` Blocks

---

In this specific problem, most meaningful work still touches shared state.

So `synchronized` blocks give cleaner control, but they do not dramatically improve concurrency.

Readers still block other readers.

---

## 11. Step 3 — Use `ReentrantReadWriteLock`

---

Now observe the operation types:

```text
addPrice(...)          → write operation
getMovingAverage(...)  → read operation
```

This suggests a better lock model.

A `ReentrantReadWriteLock` provides:

- **write lock** → exclusive access for updates
- **read lock** → shared access for multiple readers

---

## 12. Why Read/Write Lock Fits Better

---

In many systems, reads are more frequent than writes.

Example:

```text
price feed updates occasionally
many dashboards query moving average frequently
```

With a read/write lock:

```text
multiple readers can read together
writer gets exclusive access
```

This improves throughput for read-heavy workloads.

---

## 13. ReentrantReadWriteLock Implementation

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/thepriceaggregator/optimized/threadsafe/reentrantreadwritelock">See Code in Git Repo</a>
</div>

```java
package com.theshubhamco.thepriceaggregator.threadsafe.readwritelock;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class PriceTracker {

    private final List<Double> prices;
    private final List<BigDecimal> prefixPriceSums;
    private final ReentrantReadWriteLock lock;

    public PriceTracker() {
        this.prices = new ArrayList<>();
        this.prefixPriceSums = new ArrayList<>();
        this.prefixPriceSums.add(BigDecimal.ZERO);
        this.lock = new ReentrantReadWriteLock();
    }

    public void addPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("price must be greater than or equal to 0");
        }

        lock.writeLock().lock();
        try {
            prices.add(price);

            BigDecimal latestPrefixSum = prefixPriceSums
                    .get(prefixPriceSums.size() - 1)
                    .add(BigDecimal.valueOf(price));

            prefixPriceSums.add(latestPrefixSum);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public double getMovingAverage(int k) {
        if (k <= 0) {
            throw new IllegalArgumentException("k must be greater than 0");
        }

        lock.readLock().lock();
        try {
            if (prices.isEmpty()) {
                throw new IllegalStateException("No prices available");
            }

            int count = Math.min(k, prices.size());
            return calculateMovingAverage(count);
        } finally {
            lock.readLock().unlock();
        }
    }

    private double calculateMovingAverage(int count) {
        int lastIndex = prefixPriceSums.size() - 1;

        BigDecimal sum = prefixPriceSums.get(lastIndex)
                .subtract(prefixPriceSums.get(lastIndex - count));

        return sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
```

---

## 14. Why `try/finally` Is Important

---

When using explicit locks, we must always release the lock.

```java
lock.writeLock().lock();
try {
    // critical section
} finally {
    lock.writeLock().unlock();
}
```

If an exception occurs and the lock is not released, other threads may block forever.

---

## 15. Complexity After Thread Safety

---

The algorithmic complexity remains the same:

```text
addPrice(price)         → O(1)
getMovingAverage(k)     → O(1)
```

But now we also consider concurrency cost:

```text
synchronized            → safe but restrictive
ReadWriteLock           → better for read-heavy access
```

---

## 16. Interview Explanation

---

In an interview, you could explain it like this:

> “The prefix sum solution is not thread-safe because updates and reads touch shared mutable lists. First, I would make the public methods synchronized to guarantee correctness. Then, since `addPrice` is a write operation and `getMovingAverage` is a read operation, I would improve the design using `ReentrantReadWriteLock`, allowing multiple readers while still ensuring writers get exclusive access.”

---

## 17. Summary of Implementation Journey

---

| Approach             | Correct? | Reader Concurrency          | Complexity        |
| -------------------- | -------- | --------------------------- | ----------------- |
| No lock              | ❌ No    | Unsafe                      | Simple but broken |
| synchronized methods | ✅ Yes   | ❌ Readers block each other | Simple            |
| synchronized blocks  | ✅ Yes   | ❌ Readers block each other | More control      |
| ReadWriteLock        | ✅ Yes   | ✅ Multiple readers allowed | More code         |

---

## Conclusion

---

Thread safety is not just about adding locks randomly.

We should evolve the solution carefully:

```text
Correctness first → reduce lock scope → improve read concurrency
```

---

### 🔗 What’s Next?

👉 **[Level 2 Trade-offs & Advanced Considerations →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/2_level-2/2_3_trade-offs-and-advanced-considerations/)**

---

> 📝 **Takeaway**:
>
> - `synchronized` is the simplest correct fix
> - `synchronized` blocks give better lock-scope control
> - `ReentrantReadWriteLock` is better for read-heavy workloads
> - Always release explicit locks in `finally`
