# Exercise 2: Branching and Merging

## 🎯 Objective
Master Git branches to organize your work and experiment safely.

## 📝 Instructions

### Part 1: Understanding Branches

1. Check your current branch:
```bash
git branch
```

2. Create a new branch:
```bash
git branch feature-about-page
```

3. List all branches:
```bash
git branch
```

4. Switch to the new branch:
```bash
git checkout feature-about-page
# OR use the shortcut:
git checkout -b feature-about-page
```

### Part 2: Work on the Feature Branch

1. Create `about.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>About Us</title>
</head>
<body>
    <h1>About Our Company</h1>
    <p>We build amazing websites!</p>
</body>
</html>
```

2. Commit the new page:
```bash
git add about.html
git commit -m "Add about page"
```

3. Make another change and commit

### Part 3: Merge the Feature

1. Switch back to main:
```bash
git checkout main
```

2. Merge the feature branch:
```bash
git merge feature-about-page
```

3. Delete the feature branch (optional):
```bash
git branch -d feature-about-page
```

### Part 4: Practice Multiple Branches

Create and work on these branches:
- `feature-contact-page` - Add a contact form
- `fix-homepage-typo` - Fix any typo
- `feature-footer` - Add a footer

Merge each one when complete.

## ✅ Tasks Checklist

- [ ] Created at least 3 feature branches
- [ ] Made commits on each branch
- [ ] Successfully merged all branches
- [ ] Resolved any merge conflicts (if they occurred)
- [ ] Deleted merged branches
- [ ] Understand when to use branches

## 💡 Branching Strategy

**When to create a branch:**
- New feature
- Bug fix
- Experimental code
- Refactoring

**Branch naming conventions:**
- `feature/feature-name`
- `fix/bug-description`
- `refactor/what-refactored`

---

**Time**: ~25 minutes

