# Exercise 3: GitHub Workflow

## 🎯 Objective
Learn to push code to GitHub, collaborate with others, and manage remote repositories.

## 📝 Instructions

### Part 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name it `git-practice-project`
4. **Do NOT** initialize with README (we already have one)
5. Create repository

### Part 2: Connect Local to Remote

1. Add the remote:
```bash
git remote add origin https://github.com/YOUR-USERNAME/git-practice-project.git
```

2. Verify:
```bash
git remote -v
```

3. Push your code:
```bash
git push -u origin main
```

### Part 3: Make Changes and Push

1. Create a new file `script.js`
2. Add some JavaScript comments
3. Commit locally:
```bash
git add script.js
git commit -m "Add JavaScript file"
```

4. Push to GitHub:
```bash
git push
```

5. Verify on GitHub website

### Part 4: Clone a Repository

1. Find a simple open-source project on GitHub (or use one of these):
   - `https://github.com/github/gitignore`
   - Any small project you're interested in

2. Clone it:
```bash
cd ..
git clone https://github.com/username/repository-name.git
cd repository-name
```

3. Explore the code and commit history

### Part 5: Pull Latest Changes

1. Make a change on GitHub website:
   - Click on README.md
   - Click edit (pencil icon)
   - Add a line
   - Commit directly to main

2. Pull changes locally:
```bash
git pull
```

3. Verify the change is in your local file

## ✅ Tasks Checklist

- [ ] Created a GitHub repository
- [ ] Pushed local repository to GitHub
- [ ] Made changes and pushed multiple times
- [ ] Cloned a repository
- [ ] Pulled changes from remote
- [ ] Understand the GitHub workflow

## 💡 GitHub Best Practices

**Repository Setup:**
- Always include a README
- Add a `.gitignore` file
- Choose an appropriate license
- Write descriptive commit messages

**Collaboration:**
- Pull before you push
- Push frequently (don't wait days)
- Use branches for features
- Write clear commit messages

## 🎓 Bonus: GitHub Profile

Make your GitHub profile stand out:
- Add a profile README
- Pin your best projects
- Keep your contribution graph active
- Add project descriptions

---

**Time**: ~30 minutes

