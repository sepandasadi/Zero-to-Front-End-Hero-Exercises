# Exercise 1: DOM Tree Visualizer

**Difficulty**: ⭐ Beginner
**Concepts**: DOM tree structure, parent-child relationships, node types

---

## 🎯 Goal

Practice visualizing how HTML is converted into a DOM tree. This helps you understand how the browser interprets your code and how JavaScript navigates through elements.

---

## 📝 Instructions

Given the HTML below, draw or write out the complete DOM tree structure showing all parent-child relationships.

### HTML to Visualize

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Site</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <main>
    <p>Hello, world!</p>
  </main>
</body>
</html>
```

---

## 📊 What to Include

For each node in your tree, identify:

1. **The node type** (Document, Element, Text)
2. **Parent-child relationships** (which elements are nested inside others)
3. **Sibling relationships** (elements at the same level)

---

## 💡 Tips

- Start with the Document node at the top
- Use indentation or branches to show hierarchy
- Don't forget text nodes (the actual text inside elements)
- `<!DOCTYPE>` is not part of the DOM—start with `html`

---

## ✅ Example Format

You can structure your tree like this:

```
Document
 └── html
      ├── head
      │    └── ...
      └── body
           └── ...
```

Or draw it on paper/whiteboard and take a photo!

---

## 🎓 Bonus Questions

After drawing your tree, answer these:

1. What is the parent of the `<h1>` element?
2. What are the siblings of the `<nav>` element?
3. How many text nodes are in this document?
4. What is the deepest level of nesting in this tree?

---

## ✔️ Completion Checklist

- [ ] Drew the complete DOM tree
- [ ] Identified all element nodes
- [ ] Included text nodes for element content
- [ ] Showed parent-child relationships clearly
- [ ] Answered bonus questions
- [ ] Compared with the solution

---

**When you're done, check your answer in the `solution/` folder!**

