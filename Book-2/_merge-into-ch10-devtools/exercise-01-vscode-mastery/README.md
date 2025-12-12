# Exercise 1: VS Code Mastery

**Difficulty**: Beginner
**Time**: 30-45 minutes

## 🎯 Goal

Practice essential VS Code keyboard shortcuts to 10x your productivity. Professional developers navigate entirely by keyboard—it's time you do too!

## 📋 Requirements

1. VS Code installed
2. Basic understanding of HTML, CSS, JavaScript

## 🔨 Tasks

### Part 1: File Creation and Navigation (Keyboard Only!)

Create a project structure using ONLY keyboard shortcuts:

**Setup:**
```bash
mkdir vscode-practice
cd vscode-practice
code .
```

**Tasks:**
1. Create these files using keyboard shortcuts:
   - `index.html`
   - `about.html`
   - `contact.html`
   - `styles.css`
   - `app.js`

**Shortcuts to use:**
- `Ctrl/Cmd + N` - New file
- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + P` - Quick file open
- `Ctrl/Cmd + W` - Close file
- `Ctrl/Cmd + Tab` - Switch between open files

### Part 2: Multi-Cursor Editing

Add this code to `app.js`:

```javascript
const user = "Alice";
const user = "Bob";
const user = "Charlie";
const user = "Diana";
const user = "Eve";
```

**Task:** Change all instances of `user` to `person` using multi-cursor

**Shortcuts to use:**
- `Ctrl/Cmd + D` - Select next occurrence
- `Ctrl/Cmd + Shift + L` - Select all occurrences
- Type to edit all at once

### Part 3: Line Manipulation

Add this code to `app.js`:

```javascript
console.log("First");
console.log("Second");
console.log("Third");
console.log("Fourth");
```

**Tasks:**
1. Duplicate each line below itself
2. Move "Fourth" to be first
3. Delete the "Second" line entirely
4. Comment out "Third"

**Shortcuts to use:**
- `Shift + Alt + Down` - Duplicate line
- `Alt + Up/Down` - Move line
- `Ctrl/Cmd + Shift + K` - Delete line
- `Ctrl/Cmd + /` - Comment/uncomment

### Part 4: Advanced Selection

Add this HTML to `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Practice</title>
</head>
<body>
  <div class="container">
    <p>This is a paragraph with some text</p>
    <p>This is another paragraph with some text</p>
    <p>This is yet another paragraph with some text</p>
  </div>
</body>
</html>
```

**Tasks:**
1. Select all instances of "paragraph" and change to "section"
2. Change all `<p>` tags to `<div>` tags (opening and closing)
3. Add `class="text"` to all divs using multi-cursor

**Shortcuts to use:**
- `Ctrl/Cmd + D` - Multi-select
- `Alt + Click` - Multiple cursors anywhere
- `Ctrl/Cmd + Shift + L` - Select all occurrences

### Part 5: Search and Replace

**Task:** Use Find and Replace to:
1. Find all "text" and replace with "content"
2. Use regex to find all numbers and wrap in `<span>` tags

**Shortcuts to use:**
- `Ctrl/Cmd + F` - Find
- `Ctrl/Cmd + H` - Find and Replace
- `Ctrl/Cmd + Shift + F` - Find in all files

### Part 6: Speed Challenge

Time yourself! Create this HTML structure in under 60 seconds:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Speed Test</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
  <script src="app.js"></script>
</body>
</html>
```

**Pro tips:**
- Use Emmet abbreviations
- Use tab completion
- Use multi-cursor for repeated elements

## ✅ Success Criteria

- [ ] Created all files without using mouse
- [ ] Successfully used multi-cursor editing
- [ ] Manipulated lines using keyboard shortcuts
- [ ] Completed search and replace tasks
- [ ] Finished speed challenge in under 60 seconds

## 🎓 What You Learned

- VS Code keyboard shortcuts
- Multi-cursor editing
- Line manipulation
- Find and replace
- Speed and efficiency

## 📚 Next Steps

Practice these shortcuts daily until they become muscle memory. The first few times will feel slow—that's normal! Within a week, you'll be faster than using a mouse.

## 💡 Keyboard Shortcuts Cheat Sheet

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Quick Open | `Ctrl + P` | `Cmd + P` |
| Command Palette | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| New File | `Ctrl + N` | `Cmd + N` |
| Save | `Ctrl + S` | `Cmd + S` |
| Close Tab | `Ctrl + W` | `Cmd + W` |
| Select Next | `Ctrl + D` | `Cmd + D` |
| Select All | `Ctrl + Shift + L` | `Cmd + Shift + L` |
| Move Line | `Alt + ↑/↓` | `Option + ↑/↓` |
| Duplicate Line | `Shift + Alt + ↓` | `Shift + Option + ↓` |
| Delete Line | `Ctrl + Shift + K` | `Cmd + Shift + K` |
| Comment | `Ctrl + /` | `Cmd + /` |
| Find | `Ctrl + F` | `Cmd + F` |
| Replace | `Ctrl + H` | `Cmd + H` |
| Multi-Cursor | `Alt + Click` | `Option + Click` |

---

**Remember**: Every pro developer was once slow at this. Practice makes permanent! 🚀

