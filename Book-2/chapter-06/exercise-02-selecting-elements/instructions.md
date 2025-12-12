# Exercise 2: Selecting DOM Elements

**Difficulty**: ⭐ Beginner
**Concepts**: `getElementById()`, `querySelector()`, `querySelectorAll()`, `getElementsByClassName()`, `getElementsByTagName()`

---

## 🎯 Goal

Learn and practice different methods for selecting elements from the DOM. Mastering element selection is the first step to DOM manipulation!

---

## 📝 Instructions

1. Open the `starter/index.html` file in your browser
2. Open the browser console (F12 or right-click → Inspect → Console)
3. Write JavaScript code that selects the requested elements
4. Print each selection to the console to verify it worked

---

## ✅ Tasks

Complete each selection task below. For each one, write JavaScript that:

### Task 1: Select by ID

Select the element with `id="main-title"` and log it to the console.

**Expected output:** The `<h1>` element

---

### Task 2: Select by Class (Single Element)

Select the **first** element with class `card` using `querySelector()`.

**Expected output:** The first `<div class="card">` element

---

### Task 3: Select All Elements with a Class

Select **all** elements with class `card` using `querySelectorAll()`.

**Expected output:** A NodeList containing all three card elements

---

### Task 4: Select by Tag Name

Select the first `<button>` element on the page.

**Expected output:** The button element

---

### Task 5: Select Nested Elements

Select all `<li>` elements that are inside the `<ul>` with `id="nav-menu"`.

**Hint:** Use a descendant selector: `"#nav-menu li"`

**Expected output:** NodeList of all list items in the navigation menu

---

### Task 6: Select with Multiple Classes

Select the element that has **both** classes `card` and `featured`.

**Hint:** `.card.featured` (no space between classes)

**Expected output:** The featured card element

---

### Task 7: Select by Attribute

Select all elements that have a `data-category` attribute.

**Hint:** Use attribute selector: `"[data-category]"`

**Expected output:** NodeList of elements with that attribute

---

## 💡 Tips

- Use `console.log()` to print your selections
- Use `console.dir()` to see all properties of an element
- Check `length` property on NodeLists: `elements.length`
- Remember: `querySelector()` returns the first match, `querySelectorAll()` returns all matches

---

## 🔬 Testing Your Code

After each selection, verify in the console:

```javascript
// Example for Task 1
const title = document.getElementById("main-title");
console.log(title);
console.log(title.textContent); // Should print the heading text
```

---

## ✔️ Completion Checklist

- [ ] Selected element by ID
- [ ] Selected first element by class
- [ ] Selected all elements by class
- [ ] Selected first button element
- [ ] Selected nested list items
- [ ] Selected element with multiple classes
- [ ] Selected elements by attribute
- [ ] Verified each selection in the console

---

## 🎓 Bonus Challenges

1. **Count the cards:** Log the total number of cards to the console
2. **Get text content:** Select the main title and log only its text (not the element)
3. **Check if element exists:** Write code that checks if an element with `id="footer"` exists
4. **Select by complex selector:** Select all links inside the navigation that have an `href` starting with "#"

---

**Start with the starter file, then check your solution against the provided solution!**

