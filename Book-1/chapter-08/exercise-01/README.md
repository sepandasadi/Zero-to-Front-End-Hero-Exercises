# Exercise 1: Browser Rendering Investigation

## 🎯 Objective
Understand how browsers render HTML and discover default styles using Developer Tools.

## 📝 Instructions

### Part 1: Create a Simple HTML Page

Create `investigation.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Browser Rendering Investigation</title>
</head>
<body>
    <h1>Main Heading</h1>
    <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>
    <div>
        <p>Paragraph inside a div</p>
        <span>Span inside the div</span>
    </div>
</body>
</html>
```

### Part 2: Investigate Default Styles

1. Open the file in a browser
2. Open DevTools (F12)
3. Click the element picker (arrow icon)
4. Click on different elements and observe:
   - The Styles panel
   - User Agent Stylesheet section
   - Computed tab

### Part 3: Document Your Findings

Create `default-styles-notes.md` and document:

**For each element (h1, p, strong, ul, li, div, span):**
- What default styles does the browser apply?
- What's the default `display` property?
- What margins/padding are applied?
- What font-size is used?

### Part 4: Block vs Inline

**Answer these questions:**
1. Which elements are `display: block` by default?
2. Which are `display: inline`?
3. What's the visual difference?
4. Try changing a `<div>` to `display: inline` in DevTools - what happens?

## ✅ Success Criteria

- [ ] Created the investigation HTML file
- [ ] Inspected at least 7 different elements
- [ ] Documented default styles for each
- [ ] Identified which are block vs inline
- [ ] Understand that CSS exists even without writing any!

## 💡 Key Insights to Discover

- Browsers apply default styles (User Agent Stylesheet)
- `<h1>` has font-size, margins, and font-weight
- `<p>` has vertical margins
- `<ul>` has padding-left and list markers
- Block elements take full width, inline don't
- Understanding defaults helps you override them better!

---

**Time**: ~25 minutes

