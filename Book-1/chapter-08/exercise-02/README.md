# Exercise 2: DOM Tree Visualization

## 🎯 Objective
Visualize HTML as a tree structure to understand parent-child relationships and document hierarchy.

## 📝 Instructions

### Part 1: Create an HTML Page

Create `dom-structure.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Tree Practice</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <article>
            <h2>Article Title</h2>
            <p>Article paragraph with <strong>emphasis</strong>.</p>
        </article>
    </main>
    <footer>
        <p>Copyright 2025</p>
    </footer>
</body>
</html>
```

### Part 2: Draw the DOM Tree

Create a visual representation (on paper or digitally):

```
Document
└── html
    ├── head
    │   └── title
    │       └── "DOM Tree Practice"
    └── body
        ├── header
        │   └── nav
        │       └── ul
        │           ├── li
        │           │   └── a
        │           │       └── "Home"
        │           └── li
        │               └── a
        │                   └── "About"
        ├── main
        │   └── article
        │       ├── h2
        │       │   └── "Article Title"
        │       └── p
        │           ├── "Article paragraph with "
        │           ├── strong
        │           │   └── "emphasis"
        │           └── "."
        └── footer
            └── p
                └── "Copyright 2025"
```

### Part 3: Analyze Relationships

Answer these questions in `dom-analysis.md`:

1. **What is the parent of `<nav>`?**
2. **What are the children of `<body>`?**
3. **What are the siblings of `<header>`?**
4. **What is the ancestor chain of the `<a>` element?**
5. **How many levels deep is the `<strong>` element?**

### Part 4: Create Your Own

Create a more complex HTML page and draw its DOM tree. Include:
- At least 4 levels of nesting
- Mix of semantic elements
- Some text content

## ✅ Success Criteria

- [ ] Drew complete DOM tree for the provided HTML
- [ ] Answered all relationship questions correctly
- [ ] Created own HTML and visualized its DOM
- [ ] Understand parent-child-sibling terminology
- [ ] Can "see" HTML as a tree structure

## 💡 Why This Matters

**CSS targets nodes in this tree:**
- `ul li` means "li inside ul"
- `article > h2` means "h2 direct child of article"
- Understanding the tree makes selectors intuitive!

**JavaScript manipulates this tree:**
- `parent.appendChild(child)`
- `element.parentNode`
- Everything is about navigating the tree!

---

**Time**: ~20 minutes

