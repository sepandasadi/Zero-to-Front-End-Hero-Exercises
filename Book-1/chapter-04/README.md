# Chapter 4: Version Control (Git)

## 📚 Overview

Git is the version control system used by virtually every professional development team. This chapter introduces you to Git fundamentals, teaching you how to track changes, collaborate with others, and manage your code effectively.

## 🎯 Learning Objectives

By completing these exercises, you will:
- ✅ Understand what version control is and why it matters
- ✅ Initialize Git repositories and track changes
- ✅ Create commits with meaningful messages
- ✅ Work with branches for feature development
- ✅ Push code to GitHub and collaborate
- ✅ Use basic Git workflows confidently

## 📝 Exercises

### Exercise 1: Git Basics - Init, Add, Commit
**Difficulty**: ⭐ Beginner
**Folder**: `exercise-01/`

Learn to initialize a repository, stage files, and create your first commits.

**File**: `exercise-01/README.md`

### Exercise 2: Branching and Merging
**Difficulty**: ⭐⭐ Intermediate
**Folder**: `exercise-02/`

Master Git branches for organizing features and experimental work.

**File**: `exercise-02/README.md`

### Exercise 3: GitHub Workflow
**Difficulty**: ⭐⭐ Intermediate
**Folder**: `exercise-03/`

Push your code to GitHub, clone repositories, and understand remote workflows.

**File**: `exercise-03/README.md`

## 📋 Quiz

**File**: `quiz.md`

Test your Git knowledge with 10 questions covering:
- Git fundamentals
- Commits and staging
- Branching strategies
- GitHub workflows

## ⏱️ Estimated Time

- **Exercise 1**: 25 minutes
- **Exercise 2**: 25 minutes
- **Exercise 3**: 30 minutes
- **Quiz**: 10 minutes
- **Total**: ~1 hour 30 minutes

## 🎓 Success Criteria

You'll know you've mastered this chapter when you can:
- [ ] Initialize a Git repository from scratch
- [ ] Stage and commit changes with clear messages
- [ ] Create and switch between branches
- [ ] Merge branches successfully
- [ ] Push code to GitHub
- [ ] Clone and work with remote repositories
- [ ] Understand basic Git workflow

## 💡 Essential Git Commands

```bash
# Setup
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Repository Basics
git init                    # Initialize repository
git status                  # Check status
git add filename            # Stage specific file
git add .                   # Stage all changes
git commit -m "message"     # Commit with message

# Branching
git branch                  # List branches
git branch branch-name      # Create branch
git checkout branch-name    # Switch to branch
git checkout -b branch-name # Create and switch
git merge branch-name       # Merge branch

# Remote (GitHub)
git remote add origin URL   # Connect to GitHub
git push -u origin main     # Push to GitHub
git pull                    # Get latest changes
git clone URL               # Clone repository

# History
git log                     # View commit history
git log --oneline          # Compact history
```

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Learn Git Branching (Interactive)](https://learngitbranching.js.org/)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Common mistakes and fixes

---

**Ready to master version control?** Start with Exercise 1 and begin tracking your code like a pro! 🚀

