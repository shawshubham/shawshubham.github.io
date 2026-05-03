---
title: "Level 1 - Optimized Approach"
description: "Optimize the PriceTracker moving average calculation using prefix sums to support variable k queries efficiently."
keywords:
  - price tracker optimized approach
  - moving average prefix sum
  - price aggregator level 1
  - java prefix sum
  - O(1) moving average
weight: 4
layout: "topic-content"
---

## 1. Why Optimize the Naive Solution?

---

In the naive implementation, every call to `getMovingAverage(k)` loops over the last `k` prices.

That means:

```text
getMovingAverage(k) → O(k)
```

This works for small values of `k`, but becomes expensive when:

- `k` is large
- moving average is requested frequently
- price updates are part of a high-frequency stream

> 📝 **Key Point:**  
> The problem is not adding prices — the expensive part is repeatedly summing the last `k` prices.

---

## 2. Optimization Idea — Prefix Sum

---

Instead of recalculating the sum every time, we can store a running cumulative sum after each price.

This is called a **prefix sum**.

---

### Example

For prices:

```text
[100, 101, 102, 103]
```

Prefix sums:

```text
[0, 100, 201, 303, 406]
```

Why start with `0`?

Because it makes range sum calculation easier.

---

## 3. How Prefix Sum Helps

---

To calculate the sum of the last `k` prices:

```text
sum(last k prices) = prefix[n] - prefix[n - k]
```

Where:

- `n` = number of prices received
- `prefix[n]` = sum of all prices so far
- `prefix[n - k]` = sum before the last `k` prices started

---

### Example

Prices:

```text
[100, 101, 102, 103]
```

Prefix sums:

```text
[0, 100, 201, 303, 406]
```

Last 2 prices:

```text
[102, 103]
```

Calculation:

```text
prefix[4] - prefix[2]
= 406 - 201
= 205
```

Average:

```text
205 / 2 = 102.5
```

---

## 4. Optimized Java Implementation

---

<div class="btn-row">
    <a class="btn nav-btn" href="https://github.com/shawshubham/system-design-practice/tree/master/src/main/java/com/theshubhamco/thepriceaggregator/optimized">See Code in Git Repo</a>
</div>

```java
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

        prices.add(price);

        BigDecimal latestPrefixSum = prefixPriceSums
                .get(prefixPriceSums.size() - 1)
                .add(BigDecimal.valueOf(price));

        prefixPriceSums.add(latestPrefixSum);
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
        int lastIndex = prefixPriceSums.size() - 1;

        BigDecimal sum = prefixPriceSums.get(lastIndex)
                .subtract(prefixPriceSums.get(lastIndex - count));

        return sum.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
```

---

## 5. Code Walkthrough

---

### 1. Store all prices

```java
private final List<Double> prices;
```

We still keep prices so that we know how many price updates have been received.

---

### 2. Store prefix sums

```java
private final List<BigDecimal> prefixPriceSums;
```

Each entry stores the cumulative sum up to that point.

---

### 3. Initialize with zero

```java
this.prefixPriceSums.add(BigDecimal.ZERO);
```

This allows clean range calculation:

```text
prefix[n] - prefix[n - k]
```

---

### 4. Add new price

```java
BigDecimal latestPrefixSum = prefixPriceSums
        .get(prefixPriceSums.size() - 1)
        .add(BigDecimal.valueOf(price));

prefixPriceSums.add(latestPrefixSum);
```

Instead of recalculating the total sum, we add the new price to the previous cumulative sum.

---

### 5. Calculate last `k` sum

```java
BigDecimal sum = prefixPriceSums.get(lastIndex)
        .subtract(prefixPriceSums.get(lastIndex - count));
```

This gives the sum of the last `count` prices in constant time.

---

## 6. Complexity Analysis

---

### `addPrice(price)`

```text
Time: O(1)
Space: O(1) additional per price
```

---

### `getMovingAverage(k)`

```text
Time: O(1)
Space: O(1)
```

The method no longer loops over the last `k` prices.

---

## 7. Important Trade-off — Memory Growth

---

The prefix sum approach gives fast queries, but it stores cumulative history.

That means memory grows with the number of prices received:

```text
Space: O(n)
```

This is acceptable for Level 1 because we are supporting variable `k` queries.

---

## 8. Why Not Use a Fixed-Size Queue Here?

---

A fixed-size queue works well when the window size is fixed.

Example:

```text
Always calculate average of last 100 prices
```

Then we can maintain:

- queue of last 100 prices
- running sum

But our requirement allows `k` to vary:

```text
getMovingAverage(5)
getMovingAverage(100)
getMovingAverage(1000)
```

So prefix sum is a better fit for variable window queries.

---

## 9. Interview Explanation

---

In an interview, you could explain the optimized approach like this:

> “The naive approach recalculates the sum of the last `k` prices every time, which is `O(k)`. To optimize this, I would maintain a prefix sum list. When a new price arrives, I append the cumulative sum. Then the sum of the last `k` prices can be calculated as `prefix[n] - prefix[n-k]`, which makes `getMovingAverage(k)` `O(1)`.”

---

## 10. When This Approach Works Well

---

This approach is good when:

- `k` can vary per request
- query performance is important
- storing historical cumulative sums is acceptable

---

## 11. When This Approach May Not Be Enough

---

This approach may not be ideal when:

- memory must be strictly bounded
- old prices must be discarded aggressively
- only one fixed window size is needed

In that case, a fixed-size queue with a running sum may be better.

---

## Conclusion

---

The prefix sum approach improves the naive solution by avoiding repeated summing.

It changes:

```text
getMovingAverage(k): O(k) → O(1)
```

The trade-off is that we store cumulative history, so memory grows with the number of price updates.

---

### 🔗 What’s Next?

👉 **[Edge Cases & Trade-offs →](/learning/advanced-skills/system-design-practice/beginner-systems/1_the-price-aggregator/1_level-1/1_5_edge-cases-and-trade-offs/)**

---

> 📝 **Takeaway**:
>
> - Prefix sums avoid repeated work
> - Variable `k` queries can be answered in `O(1)`
> - This improves query performance but keeps `O(n)` memory
> - Fixed-size queues are better when the window size is fixed
