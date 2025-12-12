# Chapter 4 Quiz: Version Control (Git)

Test your Git knowledge!

---

## Question 1
**What is the purpose of version control?**

a) To make your code run faster
b) To track changes, collaborate, and maintain history
c) To compress files
d) To deploy websites

<details>
<summary>Answer</summary>
**b) To track changes, collaborate, and maintain history**

Version control systems like Git track every change, allow collaboration, and let you revert to previous versions if needed.
</details>

---

## Question 2
**What does `git init` do?**

a) Installs Git on your computer
b) Initializes a new Git repository
c) Creates a new file
d) Connects to GitHub

<details>
<summary>Answer</summary>
**b) Initializes a new Git repository**

`git init` creates a new `.git` folder in your project, turning it into a Git repository.
</details>

---

## Question 3
**What is the staging area in Git?**

a) Where files are permanently saved
b) A temporary area where you prepare files before committing
c) The GitHub server
d) The area where deleted files go

<details>
<summary>Answer</summary>
**b) A temporary area where you prepare files before committing**

The staging area (index) lets you selectively choose which changes to include in your next commit using `git add`.
</details>

---

## Question 4
**What's the correct order of the basic Git workflow?**

a) commit → add → push
b) add → push → commit
c) add → commit → push
d) push → add → commit

<details>
<summary>Answer</summary>
**c) add → commit → push**

First stage changes with `git add`, then commit locally with `git commit`, finally push to remote with `git push`.
</details>

---

## Question 5
**Which command shows the current status of your repository?**

a) `git show`
b) `git status`
c) `git info`
d) `git state`

<details>
<summary>Answer</summary>
**b) `git status`**

`git status` shows which files are modified, staged, or untracked.
</details>

---

## Question 6
**What's the purpose of a Git branch?**

a) To delete old code
b) To work on features independently without affecting the main code
c) To create backups
d) To speed up Git

<details>
<summary>Answer</summary>
**b) To work on features independently without affecting the main code**

Branches let you develop features, fix bugs, or experiment without affecting the main codebase until you're ready to merge.
</details>

---

## Question 7
**Which command creates AND switches to a new branch?**

a) `git branch new-branch`
b) `git checkout new-branch`
c) `git checkout -b new-branch`
d) `git switch-branch new-branch`

<details>
<summary>Answer</summary>
**c) `git checkout -b new-branch`**

`git checkout -b` creates and switches to a new branch in one command. Alternatively, `git switch -c new-branch` does the same.
</details>

---

## Question 8
**What does `git push` do?**

a) Saves changes locally
b) Uploads local commits to a remote repository like GitHub
c) Creates a new branch
d) Deletes files

<details>
<summary>Answer</summary>
**b) Uploads local commits to a remote repository like GitHub**

`git push` sends your local commits to the remote repository, making them available to others.
</details>

---

## Question 9
**When should you use `git pull`?**

a) When you want to delete the remote repository
b) When you want to get the latest changes from the remote repository
c) When you want to create a new file
d) Before making your first commit

<details>
<summary>Answer</summary>
**b) When you want to get the latest changes from the remote repository**

`git pull` fetches and merges changes from the remote repository into your local branch. Always pull before pushing!
</details>

---

## Question 10
**What makes a good commit message?**

a) Short, vague, like "fix" or "update"
b) Very long paragraphs explaining everything
c) Clear, descriptive, explaining what and why
d) Just emojis

<details>
<summary>Answer</summary>
**c) Clear, descriptive, explaining what and why**

Good commit messages are concise but clear, describing what changed and why. Example: "Add login form validation" or "Fix header alignment on mobile".
</details>

---

## Scoring

- **10/10**: Git master! You're ready for team collaboration.
- **7-9/10**: Great! Practice the concepts you missed.
- **5-6/10**: Good start. Work through the exercises again.
- **Below 5/10**: Review the chapter and practice more with Git.

---

**Pro Tip**: The best way to learn Git is to use it for every project, even personal ones. Make it a habit to commit frequently! 🚀

