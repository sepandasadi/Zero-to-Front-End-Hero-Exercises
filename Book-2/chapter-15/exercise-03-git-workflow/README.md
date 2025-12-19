# Exercise 3: Git Workflow Practice

**Difficulty**: Intermediate
**Time**: 45-60 minutes

## 🎯 Goal

Master the professional Git workflow with commits, branches, merges, and proper version control. This is how real developers work every single day.

## 📋 Requirements

1. Git installed (`git --version` to check)
2. Git configured with your name and email
3. Terminal or command prompt

## 🔨 Tasks

### Part 1: Initialize Repository

**Create a new project:**

```bash
mkdir git-practice
cd git-practice
```

**Initialize Git:**

```bash
git init
git status  # Should show "On branch main" or "On branch master"
```

**If using "master", rename to "main":**

```bash
git branch -M main
```

### Part 2: First Commit

**Create your first file:**

```bash
# Create index.html
touch index.html

# Open in your editor and add:
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Git Practice</title>
</head>
<body>
  <h1>Learning Git</h1>
</body>
</html>
```

**Stage and commit:**

```bash
git status  # See untracked file
git add index.html
git status  # See staged file (green)
git commit -m "Initial commit with HTML structure"
git log  # See your commit!
```

### Part 3: Multiple Commits

**Create and commit multiple files:**

1. **Create styles.css:**

```css
body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
}
```

```bash
git add styles.css
git commit -m "Add stylesheet with basic styling"
```

2. **Link CSS in index.html:**

```html
<link rel="stylesheet" href="styles.css">
```

```bash
git add index.html
git commit -m "Link stylesheet to HTML"
```

3. **Create app.js:**

```javascript
console.log("Git is awesome!");

document.addEventListener('DOMContentLoaded', () => {
  console.log("Page loaded!");
});
```

```bash
git add app.js
git commit -m "Add JavaScript file with console logs"
```

4. **Link JS in index.html:**

```html
<script src="app.js"></script>
```

```bash
git add index.html
git commit -m "Link JavaScript to HTML"
```

**Check your history:**

```bash
git log --oneline
```

You should see 5 commits!

### Part 4: Branching Workflow

**Create a feature branch:**

```bash
git branch feature/add-navigation
git checkout feature/add-navigation
# Or in one command: git checkout -b feature/add-navigation
```

**Add navigation to index.html:**

```html
<body>
  <nav>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
  <h1>Learning Git</h1>
</body>
```

**Add navigation styles to styles.css:**

```css
nav {
  background: #333;
  padding: 1rem;
  margin: -20px -20px 20px -20px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
```

**Commit changes:**

```bash
git add .
git commit -m "Add navigation bar with styling"
```

**Check branches:**

```bash
git branch  # Shows all branches, * marks current
```

### Part 5: Creating Another Branch

**Switch back to main:**

```bash
git checkout main
```

**Notice:** Navigation is gone! (It only exists in the branch)

**Create another feature branch:**

```bash
git checkout -b feature/add-footer
```

**Add footer to index.html:**

```html
<body>
  <h1>Learning Git</h1>

  <footer>
    <p>&copy; 2024 Git Practice. All rights reserved.</p>
  </footer>
</body>
```

**Add footer styles:**

```css
footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
  text-align: center;
  color: #666;
}
```

**Commit:**

```bash
git add .
git commit -m "Add footer with copyright"
```

### Part 6: Merging Branches

**Now let's merge both features into main!**

**Merge navigation first:**

```bash
git checkout main
git merge feature/add-navigation
```

**Check index.html** - you should see navigation!

**Merge footer:**

```bash
git merge feature/add-footer
```

**Check index.html** - you should see both navigation AND footer!

**View complete history:**

```bash
git log --oneline --graph --all
```

Beautiful branching visualization!

### Part 7: Creating .gitignore

**Create .gitignore file:**

```bash
touch .gitignore
```

**Add these patterns:**

```
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/

# Build files
dist/
build/
*.log
```

**Commit:**

```bash
git add .gitignore
git commit -m "Add .gitignore file"
```

### Part 8: Viewing Differences

**Make a change to styles.css** (don't commit yet):

```css
body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9; /* Added this line */
}
```

**View what changed:**

```bash
git diff
```

You'll see the exact line that changed!

**Stage and commit:**

```bash
git add styles.css
git commit -m "Add background color to body"
```

### Part 9: Cleaning Up Branches

**Delete merged branches:**

```bash
git branch -d feature/add-navigation
git branch -d feature/add-footer
```

**Verify only main remains:**

```bash
git branch
```

### Part 10: Simulating a Mistake

**Make a "mistake" in index.html:**

```html
<h1>Learning Git is hard</h1> <!-- Changed this -->
```

**Oops! We want to undo this.**

**Undo changes (file not staged):**

```bash
git checkout -- index.html
```

Check the file - change is gone!

**Another mistake (this time commit it):**

```html
<h1>I don't like Git</h1>
```

```bash
git add index.html
git commit -m "Bad commit - changed heading"
```

**Undo last commit (keep changes):**

```bash
git reset --soft HEAD~1
```

**Fix the text back:**

```html
<h1>Learning Git</h1>
```

**Commit properly:**

```bash
git add index.html
git commit -m "Keep original heading"
```

## ✅ Success Criteria

- [ ] Created Git repository
- [ ] Made at least 5 meaningful commits
- [ ] Created 2+ feature branches
- [ ] Successfully merged branches into main
- [ ] Created and used .gitignore
- [ ] Viewed diffs with `git diff`
- [ ] Deleted merged branches
- [ ] Undid mistakes with git commands
- [ ] Clean commit history with descriptive messages

## 🎓 What You Learned

- Git initialization and configuration
- Staging and committing changes
- Writing meaningful commit messages
- Creating and switching branches
- Merging branches
- Using .gitignore
- Viewing diffs and history
- Undoing mistakes
- Professional Git workflow

## 💡 Git Command Cheat Sheet

| Command | Purpose |
|---------|---------|
| `git init` | Initialize repository |
| `git status` | Check current status |
| `git add <file>` | Stage specific file |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git log` | View commit history |
| `git log --oneline` | Concise history |
| `git branch` | List branches |
| `git branch <name>` | Create branch |
| `git checkout <name>` | Switch branch |
| `git checkout -b <name>` | Create and switch |
| `git merge <branch>` | Merge branch into current |
| `git branch -d <name>` | Delete branch |
| `git diff` | View unstaged changes |
| `git diff --staged` | View staged changes |

## 📚 Next Steps

**Practice this workflow daily:**

```bash
# Start new feature
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Descriptive message"

# Merge when done
git checkout main
git merge feature/my-feature
git branch -d feature/my-feature
```

**This is exactly how professional teams work!**

---

**Congratulations! You now know the Git workflow used at companies like Google, Facebook, and Netflix!** 🎉

