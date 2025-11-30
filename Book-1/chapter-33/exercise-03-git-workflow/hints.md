# Exercise 3 Hints: Git Workflow Practice

## Getting Started

**Git not installed?**
```bash
# Check if installed
git --version

# Install on Mac (with Homebrew)
brew install git

# Install on Ubuntu/Debian
sudo apt-get install git

# Windows: Download from git-scm.com
```

**Set up Git first:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify
git config --global --list
```

## Common Git Commands

### Starting a Repository

**Initialize new repo:**
```bash
mkdir my-project
cd my-project
git init
```

**Clone existing repo:**
```bash
git clone https://github.com/username/repo.git
cd repo
```

**Stuck? Check status:**
```bash
git status
# Shows:
# - Current branch
# - Tracked/untracked files
# - Staged/unstaged changes
```

### Making Commits

**Basic workflow:**
```bash
# 1. Make changes to files

# 2. Check what changed
git status
git diff

# 3. Stage files
git add filename.js          # Single file
git add .                    # All files
git add src/                 # Entire folder

# 4. Commit
git commit -m "Descriptive message"

# Or open editor for longer message
git commit
```

**Writing good commit messages:**
```bash
# ✓ Good
git commit -m "Add user login feature"
git commit -m "Fix navbar alignment on mobile"
git commit -m "Update README with installation steps"

# ✗ Bad
git commit -m "Update"
git commit -m "Changes"
git commit -m "Stuff"
```

**Commit message template:**
```
Type: Brief description (50 chars or less)

Detailed explanation if needed:
- What was changed
- Why it was changed
- Any side effects

Types: feat, fix, docs, style, refactor, test
```

### Working with Branches

**Why use branches?**
- Keep main branch stable
- Work on features independently
- Easy to abandon bad ideas
- Professional workflow

**Branch commands:**
```bash
# List all branches
git branch
# * indicates current branch

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# Rename current branch
git branch -m new-name

# Delete branch
git branch -d feature-name
# Use -D to force delete unmerged branch
```

**Branch naming conventions:**
```bash
feature/user-auth       # New features
fix/navbar-bug          # Bug fixes
refactor/api-calls      # Code refactoring
docs/readme-update      # Documentation
```

### Merging Branches

**Basic merge:**
```bash
# 1. Switch to branch you want to merge INTO
git checkout main

# 2. Merge the feature branch
git merge feature-name

# 3. Delete merged branch (optional)
git branch -d feature-name
```

**Merge conflicts:**
```bash
# If you get a conflict:
# 1. Git will tell you which files conflict

# 2. Open the file, you'll see:
<<<<<<< HEAD
Your current branch's code
=======
The other branch's code
>>>>>>> feature-name

# 3. Edit to keep what you want
# 4. Remove the markers (<<<, ===, >>>)
# 5. Add the resolved file
git add filename.js

# 6. Complete the merge
git commit -m "Merge feature-name into main"
```

**Avoiding conflicts:**
- Commit often
- Pull before you work
- Keep branches focused and short-lived
- Communicate with your team

## Common Workflows

### Feature Branch Workflow

```bash
# 1. Start on main, make sure it's updated
git checkout main
git pull

# 2. Create feature branch
git checkout -b feature/new-button

# 3. Make changes and commit
# ... edit files ...
git add .
git commit -m "Add new button component"

# 4. More commits as needed
# ... more edits ...
git add .
git commit -m "Style the button"

# 5. Switch back to main
git checkout main

# 6. Merge your feature
git merge feature/new-button

# 7. Delete feature branch
git branch -d feature/new-button
```

### Fixing a Bug Workflow

```bash
# 1. Create bug fix branch
git checkout -b fix/login-error

# 2. Fix the bug
# ... edit files ...
git add .
git commit -m "Fix login validation error"

# 3. Test the fix!
# Make sure it actually works

# 4. Merge to main
git checkout main
git merge fix/login-error

# 5. Clean up
git branch -d fix/login-error
```

## Common Mistakes & Fixes

### "I committed to the wrong branch!"

**Solution:**
```bash
# If you haven't pushed yet:
# 1. Create new branch from current state
git branch correct-branch

# 2. Reset current branch
git reset --hard HEAD~1
# HEAD~1 = go back one commit

# 3. Switch to correct branch
git checkout correct-branch
# Your commit is there!
```

### "I want to undo my last commit!"

**Solution:**
```bash
# Keep changes, just undo commit
git reset --soft HEAD~1

# Undo commit AND changes (careful!)
git reset --hard HEAD~1

# Just change the commit message
git commit --amend -m "New message"
```

### "I have uncommitted changes but need to switch branches!"

**Solution 1: Commit them**
```bash
git add .
git commit -m "WIP: Work in progress"
```

**Solution 2: Stash them**
```bash
# Save changes temporarily
git stash

# Switch branches
git checkout other-branch

# Come back and restore
git checkout original-branch
git stash pop
```

### "I accidentally committed a file I didn't want!"

**Solution:**
```bash
# Remove from commit but keep file
git reset --soft HEAD~1
git reset HEAD unwanted-file.txt
git commit -m "Correct commit message"

# Or if you want to remove file completely
git rm --cached unwanted-file.txt
git commit -m "Remove unwanted file"
```

## Checking Your Work

**View commit history:**
```bash
# Simple log
git log

# Pretty log
git log --oneline --graph --all

# Last 5 commits
git log -5

# Commits by author
git log --author="Your Name"
```

**See what changed:**
```bash
# Unstaged changes
git diff

# Staged changes
git diff --staged

# Changes between branches
git diff main feature-branch

# Changes in specific file
git diff filename.js
```

**See file history:**
```bash
# Who changed what line
git blame filename.js

# All commits touching a file
git log --follow filename.js
```

## Best Practices

### Commit Often

**Good practice:**
```bash
# Small, focused commits
git commit -m "Add header component"
git commit -m "Style header"
git commit -m "Make header responsive"
```

**Why:**
- Easy to understand history
- Easy to revert specific changes
- Clear progression

### Write Meaningful Messages

**Template:**
```
Add user authentication feature

- Implement login form
- Add JWT token handling
- Create auth middleware
- Add logout functionality
```

### Use .gitignore

**Always ignore:**
```gitignore
# Dependencies
node_modules/
vendor/

# Environment files
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/

# Build output
dist/
build/
*.log
```

### Branch Strategy

**Simple project:**
```
main - Always stable, production-ready
feature/* - New features
fix/* - Bug fixes
```

**Team project:**
```
main - Production
develop - Latest development
feature/* - New features (branch from develop)
release/* - Release preparation
hotfix/* - Emergency fixes (branch from main)
```

## Quick Reference

### Essential Commands

```bash
# Status and Info
git status              # Check current state
git log --oneline       # View history
git diff                # See changes

# Making Changes
git add .               # Stage all changes
git commit -m "msg"     # Commit with message
git commit --amend      # Modify last commit

# Branches
git branch              # List branches
git checkout -b name    # Create and switch
git merge name          # Merge branch
git branch -d name      # Delete branch

# Undoing
git reset HEAD~1        # Undo last commit
git checkout -- file    # Discard changes
git stash              # Save changes temporarily
```

### When Things Go Wrong

```bash
# "I messed up, start over!"
git reset --hard HEAD

# "Show me the last good version"
git log --oneline
git checkout <commit-hash>

# "I deleted something important!"
git reflog              # Show all actions
git checkout <ref> -- file.txt

# "Help, I'm in a weird state!"
git status              # What's happening?
git stash               # Save and clean
git checkout main       # Go to safe branch
```

## Practice Exercises

### Beginner

1. Create repo, make 3 commits
2. Create branch, make changes, merge
3. Practice `git status` and `git log`

### Intermediate

1. Create feature branch
2. Make multiple commits
3. Switch branches mid-work
4. Merge feature to main

### Advanced

1. Create 3 feature branches
2. Work on all simultaneously
3. Merge them in specific order
4. Handle any conflicts

---

**Remember**: Everyone makes Git mistakes. The difference is knowing how to fix them! 🚀

**Pro tip**: Before trying anything risky, make a backup branch: `git branch backup`

