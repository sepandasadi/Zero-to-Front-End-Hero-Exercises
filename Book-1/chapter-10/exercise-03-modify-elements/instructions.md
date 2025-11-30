# Exercise 3: Modify Elements

**Difficulty**: ⭐⭐ Intermediate
**Concepts**: `textContent`, `innerHTML`, `setAttribute()`, `classList`, `style`

---

## 🎯 Goal

Learn to dynamically change element content, attributes, classes, and styles using JavaScript. This is where the DOM becomes truly interactive!

---

## 📝 Instructions

1. Open `starter/index.html` in your browser
2. Open the browser console (F12 → Console)
3. Complete each task by writing JavaScript code
4. See your changes happen in real-time!

---

## ✅ Tasks

### Task 1: Change Text Content

Change the text of the `<h1>` element to **"DOM Master"**

**Method to use:** `textContent`

---

### Task 2: Change HTML Content

Change the content of the element with `id="intro"` to include **bold** text:

**New content:** `Welcome to <strong>DOM manipulation</strong>!`

**Method to use:** `innerHTML`

---

### Task 3: Change an Image Source

Change the `src` attribute of the `<img>` element to:

```
https://via.placeholder.com/300x200/3498db/ffffff?text=New+Image
```

**Methods to use:** Either `element.src = "..."` or `setAttribute()`

---

### Task 4: Add a CSS Class

Add the class `highlight` to the paragraph with `id="message"`.

**Method to use:** `classList.add()`

---

### Task 5: Remove a CSS Class

Remove the class `hidden` from the element with `id="secret"`.

**Method to use:** `classList.remove()`

---

### Task 6: Toggle a CSS Class

Toggle the class `active` on the button. Run your code twice to see it add and remove the class.

**Method to use:** `classList.toggle()`

---

### Task 7: Change Multiple Styles

Change the following styles on the element with `id="box"`:

- Background color: `lightblue`
- Padding: `20px`
- Border radius: `10px`
- Border: `2px solid navy`

**Method to use:** `element.style.propertyName`

---

### Task 8: Update Multiple Attributes

For the `<a>` link with `id="external-link"`, change:

- `href` to `"https://developer.mozilla.org"`
- `target` to `"_blank"` (opens in new tab)
- Text content to `"Visit MDN"`

---

## 💡 Tips

- Use `console.log()` after each change to verify the element was modified
- Refresh the page between attempts to reset everything
- Remember: CSS properties use camelCase in JavaScript (`backgroundColor` not `background-color`)
- `classList` is better than directly manipulating `className`

---

## ✔️ Completion Checklist

- [ ] Changed h1 text content
- [ ] Changed paragraph HTML content with bold text
- [ ] Changed image source
- [ ] Added a class to an element
- [ ] Removed a class from an element
- [ ] Toggled a class on an element
- [ ] Changed multiple style properties
- [ ] Updated link attributes and text

---

## 🎓 Bonus Challenges

1. **Change all paragraphs:** Select all `<p>` elements and change their color to red
2. **Add multiple classes:** Add both `highlight` and `important` to an element at once
3. **Read then modify:** Get the current text of an element, then append " (UPDATED)" to it
4. **Conditional styling:** Check if an element has a class, and if so, change its style

---

**Complete the starter file, then compare with the solution!**

