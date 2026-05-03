---
title: "Level 1 - Naive Approach"
description: "Build the first simple implementation of the PriceTracker using a list and calculate the moving average by iterating over the last k prices."
keywords:
  - price tracker naive implementation
  - moving average naive approach
  - price aggregator level 1
  - java moving average
  - system design coding baseline
weight: 3
layout: "topic-content"
---

## 1. Why Start with a Naive Implementation?

---

Before optimizing, we should first build a solution that is:

- easy to understand
- functionally correct
- simple to explain in an interview

> 📝 **Key Point:**  
> In interviews, it is perfectly acceptable to start with a naive solution — as long as you can explain its limitations and improve it.

---

## 2. Naive Idea

---

The simplest approach is:

1. Store every incoming price in a list
2. When `getMovingAverage(k)` is called:
   - look at the last `k` prices
   - sum them
   - divide by the number of prices used

---

### Example

```text
prices = [100, 101, 102, 103, 104]

getMovingAverage(3)
→ use [102, 103, 104]
→ average = (102 + 103 + 104) / 3
→ 103
```

---

## 3. Java Implementation

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/thepriceaggregator/naive">See Code in Git Repo</a>
</div>

```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class PriceTracker {

    private final List<Double> prices;

    public PriceTracker() {
        this.prices = new ArrayList<>();
    }

    public void addPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("price must be greater than or equal to 0");
        }

        prices.add(price);
    }

    public double getMovingAverage(int k) {
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
        BigDecimal sum = BigDecimal.ZERO;

        for (int index = prices.size() - count; index < prices.size(); index++) {
            sum = sum.add(BigDecimal.valueOf(prices.get(index)));
        }

        return sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
```

### Main class

```java
package com.theshubhamco.thepriceaggregator.naive;

public class Application {
    public static void main(String[] args) {
        PriceTracker priceTracker = new PriceTracker();
        priceTracker.addPrice(100.0);
        priceTracker.addPrice(101.0);
        priceTracker.addPrice(102.0);
        priceTracker.addPrice(103.0);
        priceTracker.addPrice(104.0);
        priceTracker.addPrice(105.0);
        priceTracker.addPrice(106.0);
        priceTracker.addPrice(107.0);
        priceTracker.addPrice(108.0);
        priceTracker.addPrice(109.0);
        System.out.println(priceTracker.getMovingAverage(15));
    }
}

```

---

## 4. Code Walkthrough

---

### 1. Store prices in a list

```java
private final List<Double> prices;
```

Every incoming price is appended to the end of the list.

---

### 2. Add price

```java
prices.add(price);
```

This operation is usually `O(1)` amortized for an `ArrayList`.

---

### 3. Handle invalid `k`

```java
if (k <= 0) {
    throw new IllegalArgumentException("k must be greater than 0");
}
```

A moving average over zero or negative values does not make sense.

---

### 4. Handle no prices

```java
if (prices.isEmpty()) {
    throw new IllegalStateException("No prices available");
}
```

If no price has been received, there is no average to calculate.

---

### 5. Handle `k` greater than available prices

```java
int count = Math.min(k, prices.size());
```

If fewer than `k` prices exist, we calculate the average using all available prices.

---

### 6. Sum the last `count` prices

```java
for (int index = prices.size() - count; index < prices.size(); index++) {
    sum = sum.add(BigDecimal.valueOf(prices.get(index)));
}
```

This loops over only the last `count` prices.

---

## 5. Complexity Analysis

---

### `addPrice(price)`

```text
Time: O(1) amortized
Space: O(1) additional per price
```

---

### `getMovingAverage(k)`

```text
Time: O(k)
Space: O(1)
```

Why `O(k)`?

Because every call sums the last `k` prices again.

---

## 6. Why This Is Naive

---

This approach works correctly, but it becomes inefficient when:

- `k` is very large
- `getMovingAverage(k)` is called frequently
- the price stream is high volume

Example:

```text
getMovingAverage(1_000_000)
```

This would require summing one million prices for a single query.

---

## 7. Interview Explanation

---

In an interview, you could explain this approach like this:

> “I would first store all incoming prices in a list. For `getMovingAverage(k)`, I would iterate over the last `k` prices, sum them, and divide by the count. This is simple and correct, but the query is `O(k)`, so it will not scale well if `k` is large or if moving average is requested frequently.”

---

## 8. Limitation of This Approach

---

The main limitation is repeated work.

Every call to `getMovingAverage(k)` recomputes the sum from scratch.

```text
Same last k prices → summed again and again
```

This is the opportunity for optimization.

---

## Conclusion

---

The naive implementation is useful because it gives us a correct baseline.

However, it is not efficient enough for high-frequency trading-style systems where moving averages may be requested repeatedly.

---

### 🔗 What’s Next?

👉 **[Optimized Approach →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/1_level-1/1_4_optimized-approach)**

---

> 📝 **Takeaway**:
>
> - Start with a correct baseline first
> - The naive approach stores all prices and sums the last `k` on demand
> - `addPrice` is efficient, but `getMovingAverage(k)` is `O(k)`
> - The next step is to avoid repeated summing
