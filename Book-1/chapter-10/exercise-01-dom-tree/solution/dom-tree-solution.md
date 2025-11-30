# Exercise 1 Solution: DOM Tree Visualizer

## ✅ Complete DOM Tree

Here's the full DOM tree for the given HTML:

```
Document
 └── html (lang="en")
      ├── head
      │    └── title
      │         └── "My Site" [text node]
      │
      └── body
           ├── header
           │    ├── h1
           │    │    └── "Welcome" [text node]
           │    │
           │    └── nav
           │         ├── a (href="#home")
           │         │    └── "Home" [text node]
           │         │
           │         └── a (href="#about")
           │              └── "About" [text node]
           │
           └── main
                └── p
                     └── "Hello, world!" [text node]
```

---

## 📊 Explanation

### Key Observations:

1. **Document** is the root—everything starts here
2. **html** is the only child of Document
3. **head** and **body** are siblings (children of html)
4. **Text nodes** exist inside elements that contain text
5. **Attributes** (like `lang`, `href`) are properties of element nodes, not separate nodes in the tree structure (though technically they can be accessed as attribute nodes)

---

## 🎓 Bonus Question Answers

### 1. What is the parent of the `<h1>` element?

**Answer:** `<header>`

The `<h1>` is nested directly inside the `<header>` element.

---

### 2. What are the siblings of the `<nav>` element?

**Answer:** `<h1>`

Both `<h1>` and `<nav>` are children of `<header>`, making them siblings.

---

### 3. How many text nodes are in this document?

**Answer:** 5 text nodes

1. "My Site" (inside `<title>`)
2. "Welcome" (inside `<h1>`)
3. "Home" (inside first `<a>`)
4. "About" (inside second `<a>`)
5. "Hello, world!" (inside `<p>`)

**Important:** Text content inside elements becomes text nodes in the DOM!

---

### 4. What is the deepest level of nesting in this tree?

**Answer:** 5 levels

```
Document (level 0)
 └── html (level 1)
      └── body (level 2)
           └── header (level 3)
                └── nav (level 4)
                     └── a (level 5)
                          └── "Home" [text node] (level 6)
```

Actually, if you count text nodes, it goes to **6 levels deep**!

---

## 🔍 DOM Relationships Table

| Element | Parent | Children | Siblings |
|---------|--------|----------|----------|
| `html` | Document | `head`, `body` | None |
| `head` | `html` | `title` | `body` |
| `body` | `html` | `header`, `main` | `head` |
| `header` | `body` | `h1`, `nav` | `main` |
| `h1` | `header` | text node "Welcome" | `nav` |
| `nav` | `header` | two `<a>` elements | `h1` |
| `main` | `body` | `p` | `header` |
| `p` | `main` | text node "Hello, world!" | None |

---

## 💡 Key Takeaways

1. **Every element is a node** in the tree
2. **Text inside elements are separate text nodes**
3. **Attributes are properties** of element nodes
4. **Understanding the tree helps you navigate** with JavaScript methods like:
   - `parentElement`
   - `children`
   - `nextElementSibling`
   - `previousElementSibling`

---

## 🚀 Next Steps

Now that you understand the DOM tree structure, you're ready to:

- Select elements with JavaScript
- Navigate between parent, child, and sibling nodes
- Understand how CSS selectors map to this tree
- Build more complex DOM manipulation scripts

**Great work visualizing the DOM!** 🎉

