# Exercise 1: Git Basics - Init, Add, Commit

## 🎯 Objective
Learn the fundamental Git workflow: initialize, stage, and commit changes.

## 📝 Instructions

### Part 1: Create and Initialize a Repository

1. Create a new project folder:
```bash
mkdir my-first-git-project
cd my-first-git-project
```

2. Initialize Git:
```bash
git init
```

3. Check the status:
```bash
git status
```

### Part 2: Make Your First Commit

1. Create a file:
```bash
echo "# My First Git Project" > README.md
```

2. Check status again:
```bash
git status
```

3. Stage the file:
```bash
git add README.md
```

4. Commit:
```bash
git commit -m "Initial commit: Add README"
```

### Part 3: Practice the Workflow

1. Create an `index.html` file with basic HTML
2. Stage and commit it
3. Edit the README.md file
4. Stage and commit the changes
5. Create a `styles.css` file
6. Stage and commit it

### Part 4: View Your History

```bash
git log
git log --oneline
```

## ✅ Tasks Checklist

- [ ] Initialized a Git repository
- [ ] Created and committed README.md
- [ ] Made at least 5 total commits
- [ ] Each commit has a clear, descriptive message
- [ ] Viewed commit history
- [ ] Understand the staging area concept

## 💡 Commit Message Best Practices

**Good messages:**
- "Add navigation menu to homepage"
- "Fix typo in contact form"
- "Update color scheme to brand guidelines"

**Bad messages:**
- "asdf"
- "changes"
- "fix"

---

**Time**: ~25 minutes

