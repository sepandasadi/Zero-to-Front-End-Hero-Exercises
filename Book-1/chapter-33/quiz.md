# Chapter 33: Developer Tools - Quiz

Test your understanding of professional developer tools and workflows!

---

## Questions

### 1. What is the keyboard shortcut to open the Command Palette in VS Code?

a) `Ctrl/Cmd + P`
b) `Ctrl/Cmd + Shift + P`
c) `Ctrl/Cmd + K`
d) `F12`

---

### 2. Which VS Code extension allows you to see live changes in the browser without manually refreshing?

a) Prettier
b) ESLint
c) Live Server
d) GitLens

---

### 3. What does the "Computed" tab in DevTools show?

a) The CSS you wrote in your files
b) The final styles applied after all CSS rules are considered
c) JavaScript computed properties
d) Network request computations

---

### 4. How do you set a breakpoint in Chrome DevTools?

a) Add `debugger;` statement in code
b) Click on the line number in Sources panel
c) Use `console.log()`
d) Both a and b

---

### 5. What is the purpose of `.gitignore`?

a) To ignore Git commands
b) To specify which files Git should not track
c) To hide files from VS Code
d) To exclude files from browser

---

### 6. Which command shows you the current status of your Git repository?

a) `git log`
b) `git status`
c) `git info`
d) `git show`

---

### 7. What's the difference between `git add .` and `git commit`?

a) They do the same thing
b) `git add .` stages changes, `git commit` saves them to history
c) `git add .` commits changes, `git commit` pushes them
d) There is no difference

---

### 8. What does `npm install` do?

a) Installs Node.js
b) Installs packages listed in package.json
c) Installs VS Code extensions
d) Installs Git

---

### 9. In DevTools Network panel, what does a status code of 404 mean?

a) Success
b) Server error
c) Not found
d) Unauthorized

---

### 10. What's the keyboard shortcut to open DevTools in most browsers?

a) `Ctrl/Cmd + D`
b) `F12` or `Ctrl/Cmd + Shift + I`
c) `Ctrl/Cmd + K`
d) `Alt + F4`

---

### 11. What does the following Git command do: `git checkout -b feature/new-ui`?

a) Deletes a branch
b) Creates a new branch called feature/new-ui and switches to it
c) Merges feature/new-ui into current branch
d) Pushes feature/new-ui to GitHub

---

### 12. In VS Code, what does `Ctrl/Cmd + D` do when text is selected?

a) Deletes the line
b) Duplicates the line
c) Selects the next occurrence of the selected text
d) Opens definition

---

### 13. What's the purpose of the `devDependencies` section in package.json?

a) Dependencies needed only during development
b) Dependencies needed in production
c) Deprecated dependencies
d) Developer contact information

---

### 14. Which panel in DevTools would you use to debug slow network requests?

a) Elements
b) Console
c) Network
d) Sources

---

### 15. What does `git push -u origin main` do?

a) Pulls changes from GitHub
b) Pushes commits to GitHub and sets upstream tracking
c) Creates a new repository
d) Deletes the main branch

---

## Answers

### 1. b) `Ctrl/Cmd + Shift + P`

**Explanation:** The Command Palette gives you access to all VS Code commands, features, and settings. Regular `Ctrl/Cmd + P` is for quick file opening (Go to File).

---

### 2. c) Live Server

**Explanation:** Live Server starts a local development server with live reload functionality. When you save changes to your HTML, CSS, or JavaScript, the browser automatically refreshes to show the updates. This saves you from manually refreshing hundreds of times per day!

---

### 3. b) The final styles applied after all CSS rules are considered

**Explanation:** The Computed tab shows the actual, final styles after specificity, inheritance, cascade, and browser defaults have been applied. This is incredibly useful for debugging "why isn't my CSS working?" issues. The Styles tab shows what you wrote; Computed shows what actually rendered.

---

### 4. d) Both a and b

**Explanation:** You can set breakpoints by:
- Clicking line numbers in the Sources panel (visual method)
- Adding `debugger;` statements directly in your code (programmatic method)

Both pause code execution at that point, allowing you to inspect variables and step through code.

---

### 5. b) To specify which files Git should not track

**Explanation:** `.gitignore` tells Git which files to ignore (like `node_modules/`, `.env`, build files, OS files, etc.). This prevents sensitive data, large dependencies, and generated files from being committed to version control. It's one of the first files you should create in any project!

---

### 6. b) `git status`

**Explanation:** `git status` shows:
- Which files are modified (red - unstaged)
- Which files are staged for commit (green)
- Which files are untracked (new files)
- Current branch
- Whether you're ahead/behind remote

You'll run this command constantly—it's like asking "What's the current state of my project?"

---

### 7. b) `git add .` stages changes, `git commit` saves them to history

**Explanation:** Git has a two-step process:
1. **Staging** (`git add`): Select which changes to include in next commit
2. **Committing** (`git commit`): Actually save those staged changes to history

Think of it like:
- Staging = Putting items in your shopping cart
- Committing = Actually checking out and purchasing

This two-step process lets you commit only specific changes even if you've modified many files.

---

### 8. b) Installs packages listed in package.json

**Explanation:** `npm install` reads the `package.json` file and installs all dependencies listed in both `dependencies` and `devDependencies` sections. It creates/updates the `node_modules/` folder with all the packages your project needs.

Run this command:
- When you clone a project (to install its dependencies)
- After adding new packages to package.json
- If node_modules folder is missing

---

### 9. c) Not found

**Explanation:** HTTP status code 404 means the requested resource doesn't exist. Common causes:
- Typo in URL (`/userssss` instead of `/users`)
- File was deleted
- Wrong endpoint
- Resource was moved

Check the exact URL in the Network panel to find the issue!

**Quick reference:**
- 200s = Success
- 300s = Redirects
- 400s = Client errors (you made a mistake)
- 500s = Server errors (their problem)

---

### 10. b) `F12` or `Ctrl/Cmd + Shift + I`

**Explanation:** Both shortcuts open DevTools in Chrome, Firefox, and Edge:
- `F12` - Universal across browsers
- `Ctrl/Cmd + Shift + I` - Also works in most browsers

You can also right-click any element → "Inspect" to open DevTools with that element selected.

**Pro tip:** Leave DevTools open while developing! Professional developers have it open 90% of the time.

---

### 11. b) Creates a new branch called feature/new-ui and switches to it

**Explanation:** `git checkout -b branch-name` is a shortcut for two commands:
1. `git branch feature/new-ui` (create branch)
2. `git checkout feature/new-ui` (switch to it)

The `-b` flag means "create and switch in one command."

**Modern alternative:** `git switch -c feature/new-ui` (newer, more intuitive command)

---

### 12. c) Selects the next occurrence of the selected text

**Explanation:** Multi-cursor editing superpower!

**Workflow:**
1. Select a word (double-click or select manually)
2. Press `Ctrl/Cmd + D` repeatedly to select more instances
3. Edit all at once!

**Example:**
```javascript
const user = getData();
const user = processData();
const user = saveData();
```

Select "user", press `Ctrl/Cmd + D` three times, type "data", and all become "data" instantly!

**Related shortcuts:**
- `Ctrl/Cmd + Shift + L` - Select ALL occurrences at once
- `Alt + Click` - Place cursor anywhere manually

---

### 13. a) Dependencies needed only during development

**Explanation:** `devDependencies` are tools you need while developing but NOT in production:

**devDependencies (development only):**
- Webpack, Vite (build tools)
- Jest, Mocha (testing libraries)
- ESLint, Prettier (code quality tools)
- Babel (transpiler)

**dependencies (production):**
- React, Vue (frameworks)
- Axios (HTTP client)
- Lodash (utility library)

**Why separate?** Production bundle is smaller without dev tools!

**Install as devDependency:**
```bash
npm install --save-dev package-name
```

---

### 14. c) Network

**Explanation:** The Network panel shows:
- All network requests (HTML, CSS, JS, images, API calls)
- Request/response times (find slow requests!)
- Request sizes (find large files!)
- Status codes (find errors!)
- Headers (debug authentication, CORS, etc.)
- Waterfall view (visualize loading sequence)

**Use Network panel to:**
- Debug slow API calls
- Find 404 errors
- Identify large files slowing down your site
- Debug CORS issues
- Monitor API responses

**Pro tip:** Enable "Preserve log" to keep requests when navigating between pages!

---

### 15. b) Pushes commits to GitHub and sets upstream tracking

**Explanation:** Let's break down `git push -u origin main`:

- `git push` - Send commits to remote
- `-u` (or `--set-upstream`) - Set up tracking relationship
- `origin` - Name of remote (GitHub repo)
- `main` - Branch to push

**First time pushing a branch:**
```bash
git push -u origin main
```

**After that, just:**
```bash
git push  # Git remembers where to push!
```

The `-u` flag makes future pushes/pulls easier because Git remembers the connection.

**Verify remote:**
```bash
git remote -v  # Shows remote URLs
```

---

## Scoring

**13-15 correct**: 🏆 **DevTools Master!** You've got the professional toolkit down!

**10-12 correct**: 💪 **Solid Foundation!** You understand the essentials well.

**7-9 correct**: 📚 **Getting There!** Review the concepts you missed.

**Below 7**: 🔄 **Time to Practice!** Go through the exercises and try again.

---

## Key Takeaways

If you remember nothing else, remember these:

1. **VS Code** - Learn keyboard shortcuts, they'll save you hours
2. **DevTools** - Keep it open, use it constantly, it's your debugging superpower
3. **Git** - Commit often, use branches, write good messages
4. **Network Panel** - First place to check when APIs act weird
5. **Breakpoints** - Way better than 100 console.log() statements
6. **Practice** - These tools feel awkward at first, then become second nature

**The difference between beginners and professionals isn't talent—it's knowing and using the right tools!**

---

**Questions or confusions?** Review the chapter and do the exercises. These concepts become clear with practice!

