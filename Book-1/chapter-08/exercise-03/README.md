# Exercise 3: CSS Inheritance Exploration

## 🎯 Objective
Discover which CSS properties inherit from parent to child and understand the cascade.

## 📝 Instructions

### Part 1: Create Test HTML

Create `inheritance-test.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Inheritance Test</title>
    <style>
        body {
            color: blue;
            font-size: 20px;
            font-family: Arial, sans-serif;
            border: 2px solid red;
            margin: 50px;
        }
    </style>
</head>
<body>
    <h1>Heading Level 1</h1>
    <p>This is a paragraph.</p>
    <div>
        <p>Paragraph inside div</p>
        <span>Span inside div</span>
    </div>
</body>
</html>
```

### Part 2: Observe What Inherits

Open in browser and inspect elements. Create `inheritance-findings.md` to document:

**Test these properties on `<body>`:**
1. **color** - Does it inherit to h1, p, span?
2. **font-size** - Does it inherit?
3. **font-family** - Does it inherit?
4. **border** - Does it inherit?
5. **margin** - Does it inherit?

### Part 3: Test More Properties

Add these CSS properties to `<body>` one at a time and observe:

```css
body {
    text-align: center;    /* Does this inherit? */
    width: 600px;          /* Does this inherit? */
    padding: 20px;         /* Does this inherit? */
    background: yellow;    /* Does this inherit? */
    line-height: 1.6;      /* Does this inherit? */
}
```

### Part 4: Create a Reference Guide

Create `inheritance-guide.md` with two lists:

**Properties That Inherit:**
- color ✓
- font-size ✓
- [Add more you discovered]

**Properties That DON'T Inherit:**
- border ✗
- margin ✗
- [Add more you discovered]

### Part 5: Understanding Why

**Answer these questions:**
1. Why do text-related properties inherit?
2. Why don't layout properties (margin, border, padding) inherit?
3. How does this help you write less CSS?
4. What's the benefit of inheritance?

## ✅ Success Criteria

- [ ] Tested at least 10 different CSS properties
- [ ] Correctly identified which inherit
- [ ] Created a reference guide
- [ ] Understand WHY certain properties inherit
- [ ] Can predict inheritance behavior

## 💡 General Rules

**Usually Inherit:**
- Text properties: color, font-size, font-family, line-height
- Typography: text-align, text-transform, letter-spacing
- List properties: list-style-type

**Usually DON'T Inherit:**
- Box model: margin, padding, border
- Layout: width, height, display
- Positioning: position, top, left
- Background properties

**Why?**
- It makes sense for text styling to flow down
- It doesn't make sense for every child to have the same width/border!

---

**Time**: ~25 minutes

