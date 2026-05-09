---
title: "Problem Solving Pattern Tracker & Question Index"
description: "A quick-access DSA pattern tracker for interview preparation. Track solved LeetCode and CoderPad-style questions by pattern, with recognition triggers for faster problem solving."
keywords:
  - dsa pattern tracker
  - problem solving patterns
  - leetcode practice index
  - coderpad practice
  - interview question tracker
  - pattern recognition
weight: 1
date: 2026-02-09
layout: "topic-content"
---

# Problem Solving Pattern Tracker & Question Index

## 🧠 About This Page

This page acts as a **quick-access revision and tracking index** for the Problem Solving section.

Each pattern listed below is covered in detail in its dedicated learning article. This page is not meant to replace those tutorials.

Instead, use it to:

- quickly revise important problem-solving patterns
- track solved LeetCode and CoderPad-style questions
- recall pattern recognition triggers
- identify gaps in your preparation
- navigate back to practice problems efficiently

📌 Think of this page as:

```text
Pattern Recall Sheet + Solved Question Tracker
```

---

## 1. Pattern Tracker

| Pattern                       | Questions Solved / Discussed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | How to Identify the Pattern                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Hashing / Map / Set           | [1. Two Sum](https://leetcode.com/problems/two-sum/), <br/> [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/), <br/> [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/), <br/> [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/), <br/>[387. First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)                                                                                                                                                                                                                                                                                                                                                        | Fast lookup, duplicate detection, frequency counting, grouping, anagram checks                                   |
| Two Pointers                  | [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/), <br/> [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/), <br/> [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/), <br/> 283. Move Zeroes,<br/> [15. 3Sum](https://leetcode.com/problems/3sum/), <br/> 18. 4Sum, <br/> [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/), <br/> [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/), <br/> 75. Sort Colors, <br/> 844. Backspace String Compare                                                                                                         | Sorted array, pair/triplet search, opposite-end movement, duplicate skipping                                     |
| Sliding Window                | [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/),<br/> [643. Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/),<br/> [187. Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/)                                                                                                                                                                                                                                                                                                                                                                                                                                        | Contiguous subarray/substring, longest/shortest window, fixed-size window, at most/without repeating constraints |
| Prefix Sum                    | 1480. Running Sum of 1d Array, <br/> 303. Range Sum Query - Immutable, <br/> 724. Find Pivot Index, <br/> [560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/),<br/> [523. Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/),<br/> [974. Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/), <br/> 525. Contiguous Array                                                                                                                                                                                                                                                                                                                                           | Subarray sum, count of subarrays, prefix difference, modulo remainder logic                                      |
| Prefix / Suffix               | [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/),<br/> [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | For each index, combine left contribution and right contribution                                                 |
| Kadane's Algorithm            | [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/),<br/> [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Contiguous subarray maximum/minimum, running best, reset or track best ending here                               |
| Greedy                        | [55. Jump Game](https://leetcode.com/problems/jump-game/),<br/> [45. Jump Game II](https://leetcode.com/problems/jump-game-ii/),<br/> [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/),<br/> [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/),<br/> [134. Gas Station](https://leetcode.com/problems/gas-station/)￼                                                                                                                                                                                                                                                                                                                                                                                      | Make the best local decision, maximize reach, earliest finish time, locally optimal choice remains globally safe |
| Binary Search                 | [704. Binary Search](https://leetcode.com/problems/binary-search/),<br/> [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/),<br/> [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/),<br/> [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/),<br/> [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/),<br/> [154. Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/),<br/> [162. Find Peak Element](https://leetcode.com/problems/find-peak-element/) | Sorted or monotonic search space, eliminate half, first/last occurrence, rotated sorted logic, slope direction   |
| Binary Search on Answer       | [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/), <br/> [1011 — Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/),<br/> [410 — Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Minimum/maximum answer, candidate validation, feasible/infeasible monotonic condition                            |
| Stack / String Reduction      | [1047. Remove All Adjacent Duplicates In String](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/),<br/> [1209. Remove All Adjacent Duplicates in String II](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Repeated deletion, previous element matters, reduce string until stable                                          |
| Monotonic Stack               | [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Next greater/smaller, maintain increasing/decreasing stack, discard useless elements                             |
| Heap / Top-K                  | [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/),<br/> [1086. High Five](https://leetcode.com/problems/high-five/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Top K, most frequent, ranking, priority ordering, frequency aggregation                                          |
| Bucket Sort                   | [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Frequency is bounded by n, group values by count instead of sorting                                              |
| Grid Dynamic Programming      | [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Grid + restricted movement + min/max/count path result                                                           |
| Math / Simulation             | [166. Fraction to Recurring Decimal](https://leetcode.com/problems/fraction-to-recurring-decimal/),<br/> [342. Power of Four](https://leetcode.com/problems/power-of-four/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Manual process, remainder tracking, division/modulo, power checks                                                |
| Linked List / Cycle Detection | [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/),<br/> [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Fast/slow pointers, repeated node, cycle entry detection                                                         |
| Graph Basics / Path Mapping   | [1436. Destination City](https://leetcode.com/problems/destination-city/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Source → destination mapping, in-degree/out-degree, path chain reconstruction                                    |
| Josephus / Recurrence         | [1823. Find the Winner of the Circular Game](https://leetcode.com/problems/find-the-winner-of-the-circular-game/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Circular elimination, every k-th removal, recurrence from smaller problem                                        |
| String Parsing / Manipulation | [8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/),<br/> [443. String Compression](https://leetcode.com/problems/string-compression/),<br/> [1832. Check if the Sentence Is Pangram](https://leetcode.com/problems/check-if-the-sentence-is-pangram/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Character scanning, parsing rules, compression, case/symbol handling                                             |

---

## 2. Current High-ROI Focus

For interview preparation, focus on these patterns first:

| Priority  | Pattern                      | Status      |
| --------- | ---------------------------- | ----------- |
| 🔥 High   | Binary Search                | In Progress |
| 🔥 High   | Binary Search on Answer      | In Progress |
| 🔥 High   | Monotonic Stack              | Pending     |
| 🔥 High   | Prefix Sum Reinforcement     | Partial     |
| 🔥 High   | Sliding Window Reinforcement | Partial     |
| 🔥 High   | 1D Dynamic Programming       | Pending     |
| 🟡 Medium | Heap / Top-K                 | Partial     |
| 🟡 Medium | Intervals                    | Pending     |
| 🟡 Medium | Greedy                       | Basic       |

---

## 3. Quick Pattern Recognition Rules

| If the problem says...                                     | Think...                   |
| ---------------------------------------------------------- | -------------------------- |
| sorted array, first/last position, insert position         | Binary Search              |
| minimum/maximum X such that condition is true              | Binary Search on Answer    |
| contiguous substring/subarray, longest/shortest, at most K | Sliding Window             |
| count subarrays with sum / divisible by K                  | Prefix Sum + HashMap       |
| except self, left and right contribution                   | Prefix / Suffix            |
| next greater / next smaller                                | Monotonic Stack            |
| remove adjacent patterns repeatedly                        | Stack                      |
| top K / most frequent                                      | Heap or Bucket Sort        |
| grid + restricted movement + min/max/count path            | Grid DP                    |
| circular elimination                                       | Josephus / Recurrence      |
| source-destination chain                                   | Graph mapping / in-degree  |
| repeated remainder in decimal expansion                    | HashMap remainder tracking |

---

## 4. How to Use This Page

Use this page after every practice session:

1. Add newly solved questions under the correct pattern.
2. Review the pattern trigger before solving the next question.
3. Mark weak patterns for focused revision.
4. Avoid jumping randomly across patterns.

📌 Rule:

```text
Solve → Identify Pattern → Record → Revise Trigger
```

---

## Key Takeaway

> Strong interview performance comes from recognizing the pattern quickly, not memorizing isolated solutions.

Use this tracker to build that recognition deliberately.
