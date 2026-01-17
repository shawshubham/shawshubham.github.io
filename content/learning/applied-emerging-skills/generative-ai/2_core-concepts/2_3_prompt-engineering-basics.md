---
title: "Prompt Engineering Basics"
description: "Learn what prompt engineering is, why prompts influence LLM behaviour, and how to structure prompts to get clearer, more reliable outputs."
keywords:
  - Prompt engineering
  - Prompt engineering basics
  - How prompts work in LLMs
  - Writing effective prompts
  - Prompt design Generative AI
author: "Shubham Shaw"
weight: 3
date: 2026-01-16
layout: "topic-content"
tags:
  - Generative AI
  - Prompt Engineering
  - Large Language Models
---

## 1. Introduction

---

Once you understand **LLMs**, **tokens**, and the **context window**, the next question naturally becomes:

> **How do I control what an LLM produces?**

The primary way we guide an LLM’s behaviour is through **prompts**.

Prompt engineering is not about tricks or hacks — it is about **communicating intent clearly** to a probabilistic language model.

---

## 2. What Is a Prompt?

---

A **prompt** is the input text you provide to a Large Language Model to guide its response.

This can include:

- instructions
- questions
- examples
- constraints
- context

From the model’s perspective, a prompt is simply **the text it must continue from**.

> **The model does not know what you want — it only knows what you wrote.**

---

## 3. Why Prompt Engineering Exists at All

---

Prompt engineering exists because:

- LLMs generate text based on probabilities
- small wording changes alter token probabilities
- the model has no built-in goal awareness

This means:

- vague prompts → vague outputs
- ambiguous prompts → inconsistent outputs
- clear prompts → more reliable outputs

Prompt engineering is essentially **probability steering**.

---

## 4. Prompts Are Not Commands (Important Mental Model)

---

A common mistake is treating prompts like function calls or commands.

LLMs do not:

- execute instructions
- follow rules deterministically
- understand intent the way humans do

Instead, they:

- infer intent from language patterns
- generate what _usually follows_ similar text

> **You are not commanding the model — you are shaping the continuation.**

This mental model prevents frustration.

---

## 5. Types of Prompts (Conceptual)

---

### 5.1 Instruction Prompts

Tell the model what you want it to do.

**Example:**

```text
Explain Generative AI in simple terms.
```

---

### 5.2 Contextual Prompts

Provide background information.

**Example:**

```text
You are explaining Generative AI to a backend engineer with Java experience.
```

---

### 5.3 Constraint-Based Prompts

Limit the form of the output.

**Example:**

```text
Explain Generative AI in under 150 words using bullet points.
```

---

### 5.4 Example-Based Prompts (Few-Shot)

Show the model what a good answer looks like.

**Example:**

```text
Q: What is REST?
A: REST is an architectural style for designing networked applications.

Q: What is Generative AI?
A:
```

Each type nudges the model in a different way.

---

## 6. System Prompts vs User Prompts (High Level)

---

In many applications, prompts are layered.

### System Prompt

- Sets overall behaviour
- Defines role, tone, and boundaries
- Usually hidden from end users

**Example:**

```text
You are a helpful technical assistant that explains concepts clearly and concisely.
```

---

### User Prompt

- The actual user input
- Changes per interaction

Understanding this separation is important when designing GenAI systems.

---

## 7. Why Prompt Wording Matters So Much

---

Because:

- prompts are converted into tokens
- tokens affect probabilities
- probabilities affect output

Even small changes can:

- shift emphasis
- change tone
- alter depth
- affect completeness

This is why:

- “Explain” ≠ “Summarise”
- “List” ≠ “Describe”
- “Why” ≠ “How”

---

## 8. Common Prompting Mistakes

---

### 8.1 Being Too Vague

```text
Explain AI.
```

---

### 8.2 Overloading the Prompt

- too many instructions
- conflicting constraints
- excessive context

---

### 8.3 Expecting Guaranteed Correctness

Prompts can improve clarity — not correctness.

Validation is still required.

---

## 9. Prompt Engineering in Real Systems

---

In production systems, prompt engineering influences:

- output consistency
- user experience
- cost and latency
- safety and reliability

Prompts are often:

- versioned
- tested
- reviewed
- refined over time

They are **part of the system design**, not an afterthought.

---

## Conclusion

---

Prompt engineering is the practice of **clearly expressing intent** to a probabilistic language model.

It works because:

- LLMs rely entirely on provided context
- language patterns influence output probabilities
- clarity reduces ambiguity

Good prompts do not make models smarter —
they make model behaviour **more predictable**.

---

### 🔗 What's Next?

---

**👉 [Embeddings Explained ➡ ](/learning/applied-emerging-skills/generative-ai/2_core-concepts/2_4_emdeddings-explained)**  
Learn how LLMs represent meaning numerically and why embeddings are critical for search, similarity, and retrieval-based systems.

---

> 📝 **Key Takeaways**
>
> - A prompt is the text an LLM continues from
> - Prompts guide behaviour through probabilities, not commands
> - Clear, structured prompts produce more reliable outputs
> - System and user prompts serve different roles
> - Prompt engineering is a system design concern
