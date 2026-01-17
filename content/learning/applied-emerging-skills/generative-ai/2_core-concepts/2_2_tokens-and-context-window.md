---
title: "Tokens and Context Window in Large Language Models"
description: "Understand what tokens are, how Large Language Models process text using tokens, what a context window is, and why it impacts cost, performance, and behaviour."
keywords:
  - Tokens in LLM
  - Context window explained
  - LLM tokens
  - Tokenization in Generative AI
  - Context length in LLMs
author: "Shubham Shaw"
weight: 2
date: 2026-01-16
layout: "topic-content"
tags:
  - Generative AI
  - Large Language Models
  - AI Fundamentals
---

## 1. Introduction

---

Once you understand what a Large Language Model is, the next natural question is:

> **How does an LLM actually read and remember text?**

LLMs do not read text the way humans do — character by character or word by word.  
Instead, they operate using **tokens**, and they can only “see” a limited amount of text at any time, known as the **context window**.

Understanding these two concepts explains:

- why prompts behave differently when reworded
- why responses get cut off
- why longer conversations cost more
- why models sometimes “forget” earlier information

---

## 2. What Is a Token?

---

A **token** is the basic unit of text that an LLM processes.

Tokens are **not exactly the same as words**.

Depending on the language and content, a token might be:

- a whole word
- part of a word
- punctuation
- a number
- a symbol

### Example

```text
"Generative AI is powerful"
```

This sentence might be broken into tokens like:

```text
["Generative", " AI", " is", " power", "ful"]
```

The exact split depends on the model’s tokenizer, but the key idea is:

> **LLMs think in tokens, not words or characters.**

---

## 3. Why Do LLMs Use Tokens?

---

Tokens allow LLMs to:

- handle large vocabularies efficiently
- work across multiple languages
- represent text in a numerical form the model can process

During training and inference:

- text → tokens
- tokens → numbers
- numbers → probabilities

This token-based representation is fundamental to how LLMs work.

---

## 4. How Tokens Affect Cost and Performance

---

In most real-world systems:

- **you pay per token**
- **models are limited by token count**

Tokens matter because:

- longer prompts = more tokens
- longer responses = more tokens
- more tokens = higher cost and latency

This is why:

- concise prompts are often better
- unnecessary verbosity increases cost
- summarising context can be important

---

## 5. What Is a Context Window?

---

The **context window** is the maximum number of tokens an LLM can consider at one time.

It includes:

- your input prompt
- the conversation history
- the model’s generated response

> **Input tokens + output tokens must fit inside the context window.**

Once the limit is reached:

- older information is dropped
- the model can no longer “see” it

---

## 6. Why Context Window Size Matters

---

Context window size directly impacts:

### 6.1 Memory Within a Conversation

- Larger context → longer conversations
- Smaller context → earlier messages forgotten

### 6.2 Quality of Responses

- More context allows better reasoning
- Missing context leads to vague or incorrect responses

### 6.3 System Design Decisions

- How much history to send
- Whether to summarise past messages
- Whether to retrieve external data dynamically

---

## 7. Common Context Window Pitfalls

---

### 7.1 “The Model Forgot What I Said Earlier”

This usually happens because:

- earlier messages fell outside the context window
- they were not included in the prompt

LLMs do not have memory beyond what you send them.

---

### 7.2 “My Response Was Cut Off”

This happens when:

- the output tokens hit the context limit
- there was no space left for a full response

---

### 7.3 “Why Did the Same Prompt Behave Differently?”

Small wording changes:

- change token count
- change probability distributions
- alter what fits inside the context window

This leads to different outputs.

---

## 8. Tokens vs Context Window (Quick Comparison)

---

| Concept                | Tokens       | Context Window           |
| ---------------------- | ------------ | ------------------------ |
| What it is             | Unit of text | Max tokens model can see |
| Affects cost           | Yes          | Indirectly               |
| Affects memory         | No           | Yes                      |
| Affects output quality | Yes          | Yes                      |

Both must be understood together.

---

## 9. Why This Matters in Real Systems

---

In production systems, token and context limits influence:

- API design
- prompt structure
- conversation handling
- summarisation strategies
- retrieval-based approaches (like RAG)

Ignoring these constraints often leads to:

- unpredictable behaviour
- higher costs
- poor user experience

---

## Conclusion

---

Tokens and context windows define **how much an LLM can see and process at any moment**.

Tokens determine:

- how text is broken down
- how cost is calculated

Context windows determine:

- how much information the model can use
- how long conversations remain coherent

Understanding these constraints removes much of the mystery around LLM behaviour and is essential for building reliable GenAI systems.

---

### 🔗 What's Next?

---

**👉 [Prompt Engineering Basics ➡ ](/learning/applied-emerging-skills/generative-ai/2_core-concepts/2_3_prompt-engineering-basics)**  
Learn how to structure prompts effectively, guide model behaviour, and get consistent, high-quality outputs from LLMs.

---

> 📝 **Key Takeaways**
>
> - LLMs process text as tokens, not words
> - Tokens affect cost, latency, and behaviour
> - Context window limits how much text the model can “see”
> - Conversations must fit within the context window
> - Understanding these limits is critical for system design
