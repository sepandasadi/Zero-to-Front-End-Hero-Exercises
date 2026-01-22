# Exercise 01: npm Basics

## 🎯 Objective

Master npm - the Node Package Manager. Learn to initialize projects, manage dependencies, and run scripts.

## 📋 Tasks

### Task 1: Initialize Project
```bash
npm init -y
```
Explore the generated `package.json`

### Task 2: Install Dependencies
- Install lodash as dependency
- Install jest as dev dependency
- Understand package-lock.json

### Task 3: npm Scripts
Add scripts to package.json:
- `"start": "node index.js"`
- `"test": "jest"`
- `"dev": "nodemon index.js"`

### Task 4: Semantic Versioning
Understand version syntax:
- `^1.2.3` - Compatible versions
- `~1.2.3` - Patch updates only
- `1.2.3` - Exact version

### Task 5: Update & Audit
- `npm update` - Update packages
- `npm audit` - Check vulnerabilities
- `npm audit fix` - Fix issues

### Task 6: Global vs Local
- Install packages globally
- When to use global vs local
- npx for one-time execution

## ⏱️ Estimated Time: 25-30 minutes

**[Start in terminal]**
