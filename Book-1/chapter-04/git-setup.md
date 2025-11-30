# 🔧 Git Configuration

Before you start using Git, you need to configure it with your identity. Every commit you make will be tagged with this information.

## Step 1: Configure Your Name

Open your terminal (in VS Code, press `` Ctrl+` `` or `` Cmd+` ``) and run:

```bash
git config --global user.name "Your Name"
```

**Replace** "Your Name" with your actual name. For example:
```bash
git config --global user.name "Sepand Asadi"
```

## Step 2: Configure Your Email

```bash
git config --global user.email "your.email@example.com"
```

**Replace** with your actual email. Use the same email you used for GitHub:
```bash
git config --global user.email "your.email@gmail.com"
```

## Step 3: Verify Your Configuration

Check that everything was set correctly:

```bash
git config --global user.name
git config --global user.email
```

You should see your name and email printed in the terminal.

## Step 4: View All Git Configuration

To see all your Git configuration:

```bash
git config --global --list
```

This will show everything Git knows about you!

---

## ✅ Checklist

- [ ] I ran `git config --global user.name "My Name"`
- [ ] I ran `git config --global user.email "my.email@example.com"`
- [ ] When I verify, I see my correct name
- [ ] When I verify, I see my correct email
- [ ] I used the same email as my GitHub account

---

## 🎯 Why This Matters

Every time you save your work with Git (called making a "commit"), Git records:
- **What** changed
- **When** it changed
- **Who** made the change (that's you!)

This is essential for:
- **Tracking your own work** over time
- **Collaborating with teams** (everyone knows who wrote what)
- **Building your portfolio** (your commits show on your GitHub profile!)

---

## 🚀 What's Next?

Great job! Your Git is now configured and ready to use. In future chapters, you'll learn how to:
- Create Git repositories
- Make commits (save your work)
- Push code to GitHub
- Collaborate with other developers

For now, you're all set! Move on to the next exercise. 🎉

