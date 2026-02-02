---
title: "Git Commands – Practical Reference Guide"
weight: 1
description: "A concise Git reference guide covering daily commands, workflows, and recovery patterns"
date: 2026-01-30
layout: "topic-content"
---

## Overview

---

This page is **a personal Git reference guide** — a practical, no-fluff collection of commonly used Git commands and workflows.

It is intentionally **reference-oriented**, not a full tutorial. The goal is:

- Quick recall during daily work
- Safe recovery from common mistakes
- Clear mental models for branching, rebasing, and cleanup

A structured Git tutorial will follow later.

---

## 1. Core Git Commands (Daily Use)

---

| Command                                         | Description                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| git --version                                   | Displays the installed Git version                                 |
| git init                                        | Initializes a new Git repository (.git directory is created)       |
| git status                                      | Shows current repository state (staged, unstaged, untracked files) |
| git config --global user.name "Your Name"       | Sets global Git username                                           |
| git config --global user.email "your@email.com" | Sets global Git email                                              |
| git add <file>                                  | Adds specific file(s) to the staging area                          |
| git add . / git add --all                       | Stages all modified and new files                                  |
| git commit -m "message"                         | Creates a commit with a message                                    |
| git commit                                      | Opens editor to write a detailed commit message                    |
| git log                                         | Shows commit history (most recent first)                           |
| git log --oneline                               | Compact one-line commit history                                    |
| git log --patch                                 | Shows commit history along with code diffs                         |

---

## 2. Staging & Unstaging Changes

---

### Unstage Files (Keep Changes)

| Command                | Use Case                                            |
| ---------------------- | --------------------------------------------------- |
| git reset HEAD <file>  | Unstages a specific file                            |
| git reset HEAD .       | Unstages all staged files                           |
| git rm --cached <file> | Removes file from Git tracking but keeps it locally |

> 💡 These commands **do not delete code**, only move files out of staging.

---

## 3. Undoing Commits (Safe vs Destructive)

---

### Soft Reset (Undo Commit, Keep Changes)

```bash
git reset HEAD~1 --soft
```

- Removes the last commit
- Keeps changes staged
- Safe for local cleanup

### Mixed Reset (Default)

```bash
git reset HEAD~1
```

- Removes commit
- Keeps changes unstaged

### Hard Reset (Destructive)

```bash
git reset HEAD~1 --hard
```

- Removes commit
- Deletes all changes permanently ⚠️

---

## 4. Pulling Latest Changes from master into a Branch (Rebase Workflow)

---

This is the **recommended clean-history approach**.

### Steps

```bash
git stash # Save local uncommitted changes
git fetch origin # Fetch latest remote changes
git rebase origin/master # Rebase branch onto master
git stash pop # Restore local changes
```

### Why Rebase?

- Avoids unnecessary merge commits
- Keeps history linear and readable
- Preferred in most professional teams

---

## 5. Removing Uncommitted Local Changes

---

⚠️ Use carefully — this **deletes local work**.

```bash
git status # Review changes
git reset --hard HEAD # Delete all uncommitted changes
git status # Confirm clean state

```

---

## 6. Branching Basics

---

| Command                  | Description                  |
| ------------------------ | ---------------------------- |
| git branch               | Lists local branches         |
| git branch <name>        | Creates a new branch         |
| git checkout <branch>    | Switches to a branch         |
| git checkout -b <branch> | Creates & switches to branch |
| git branch -d <branch>   | Deletes merged branch        |
| git branch -D <branch>   | Force deletes branch         |

---

## 7. Working with Remotes

---

| Command                  | Description                      |
| ------------------------ | -------------------------------- |
| git remote -v            | Lists remote repositories        |
| git fetch                | Downloads changes (no merge)     |
| git pull                 | Fetch + merge                    |
| git push origin <branch> | Pushes branch to remote          |
| git push -f              | Force push (rewrites history ⚠️) |

---

## 8. Stash Commands (Temporary Storage)

---

| Command         | Description                    |
| --------------- | ------------------------------ |
| git stash       | Saves uncommitted changes      |
| git stash list  | Lists stashes                  |
| git stash pop   | Applies & removes latest stash |
| git stash apply | Applies stash without deleting |
| git stash drop  | Deletes stash                  |

---

## 9. Helpful Inspection Commands

---

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| git diff          | Shows unstaged changes       |
| git diff --staged | Shows staged changes         |
| git show <commit> | Shows details of a commit    |
| git blame <file>  | Shows who modified each line |

---

## Final Notes

- Prefer **rebase over merge** for feature branches
- Use **hard reset only when absolutely sure**
- Avoid force-push on shared branches
- Keep commits small and meaningful

This guide acts as a **living Git cheat-sheet** — it will evolve into structured tutorials with visuals and workflows later.
