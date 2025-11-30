# Chapter 26: DOM Manipulation - Exercises

Welcome to Chapter 26 exercises! **This is where JavaScript becomes visible.** These exercises will teach you how to make web pages interactive, dynamic, and responsive to user actions. By the end, you'll be building real, working applications.

## 🎯 Learning Objectives

By completing these exercises, you will:

- Select elements using querySelector
- Read and change content dynamically
- Modify styles and toggle classes
- Create new elements from JavaScript
- Build interactive components
- Handle user events
- Use event delegation for performance
- Build complete applications

---

## 📚 Exercise Overview

### Exercise 1: Selecting and Changing ⭐
**Difficulty:** Beginner
**Time:** 30-40 minutes
**Focus:** Element selection, reading/changing content, modifying styles

Master the basics—find elements and change them. Build your first interactive pages with dynamic greetings, theme toggles, and content updates.

**Skills practiced:**
- querySelector and querySelectorAll
- textContent vs innerHTML
- classList methods (add, remove, toggle)
- Inline styles
- Reading and modifying attributes

---

### Exercise 2: Creating Elements ⭐⭐
**Difficulty:** Beginner-Intermediate
**Time:** 40-50 minutes
**Focus:** Building HTML from JavaScript

Learn to create elements dynamically. Build cards, lists, and complex structures entirely from JavaScript—no hardcoded HTML!

**Skills practiced:**
- document.createElement
- Setting properties (textContent, classList, attributes)
- append, prepend, before, after
- Building complex element structures
- DocumentFragment for performance

---

### Exercise 3: Interactive List ⭐⭐
**Difficulty:** Intermediate
**Time:** 40-50 minutes
**Focus:** Complete todo list application

Build a fully functional todo list with add, complete, and delete features. This is your first complete application!

**Skills practiced:**
- User input handling
- Creating elements on user action
- Event listeners
- Removing elements
- State management with DOM
- Input validation

---

### Exercise 4: Event Delegation ⭐⭐⭐
**Difficulty:** Intermediate-Advanced
**Time:** 40-50 minutes
**Focus:** Professional event handling pattern

Master event delegation—the pattern used by every professional framework. Build scalable, performant interactive lists.

**Skills practiced:**
- Event delegation pattern
- Event bubbling and targeting
- closest() for finding parent elements
- Handling dynamic content
- Performance optimization

---

### Challenge: Interactive Dashboard ⭐⭐⭐⭐
**Difficulty:** Advanced
**Time:** 2-3 hours
**Focus:** Complete interactive application

Build a multi-feature dashboard with tabs, modals, forms, and dynamic data visualization. This is your portfolio piece!

**Skills practiced:**
- Multiple interactive components
- Tab switching
- Modal windows
- Form handling and validation
- Dynamic charts/data display
- localStorage for persistence
- Professional code organization

---

## 🚀 Getting Started

### Prerequisites

Make sure you've completed:
- Chapter 25 exercises (Working with Data)
- Understand arrays, objects, and array methods
- Know basic HTML and CSS

### How These Exercises Work

**Unlike previous exercises**, DOM manipulation requires both HTML and JavaScript. Each exercise includes:

1. **HTML file** - The structure
2. **CSS file** - The styling
3. **JavaScript file** - The interactivity

**You'll edit the JavaScript file to make the HTML come alive!**

### Testing Your Code

**You MUST open the HTML file in a browser:**

1. Open the HTML file in your browser
2. Open the console (F12 or Cmd+Option+I)
3. Interact with the page
4. Watch for console logs and errors
5. Refresh after making changes

**You can't test this in Node.js** - it needs a browser!

---

## 💡 DOM Manipulation Quick Reference

### Selecting Elements

```js
// Single element (first match)
const heading = document.querySelector("h1");
const button = document.querySelector(".btn-primary");
const menu = document.querySelector("#main-menu");

// Multiple elements (all matches)
const buttons = document.querySelectorAll("button");
const items = document.querySelectorAll(".list-item");

// Loop through NodeList
buttons.forEach(button => {
  console.log(button.textContent);
});
```

### Reading and Changing Content

```js
const element = document.querySelector(".title");

// Read content
console.log(element.textContent);

// Change content (safe, plain text)
element.textContent = "New Title";

// Change HTML (careful with user input!)
element.innerHTML = "<strong>Bold Title</strong>";

// Get input value
const input = document.querySelector("input");
const userInput = input.value;
```

### Modifying Styles

```js
const box = document.querySelector(".box");

// Inline styles (not recommended)
box.style.backgroundColor = "blue";
box.style.padding = "20px";

// Classes (recommended!)
box.classList.add("highlighted");
box.classList.remove("hidden");
box.classList.toggle("active");

// Check if has class
if (box.classList.contains("active")) {
  console.log("Box is active!");
}
```

### Creating Elements

```js
// Create element
const div = document.createElement("div");

// Set content
div.textContent = "Hello!";

// Add classes
div.classList.add("card", "highlight");

// Set attributes
div.setAttribute("data-id", "123");
div.id = "my-card";

// Add to page
document.body.append(div);  // Add to end
document.body.prepend(div); // Add to beginning
```

### Removing Elements

```js
const element = document.querySelector(".remove-me");

// Remove from DOM
element.remove();

// Or remove all children
const container = document.querySelector(".container");
container.innerHTML = "";  // Fast way to clear
```

---

## 🎯 Event Handling Quick Reference

### Adding Event Listeners

```js
const button = document.querySelector("button");

// Click event
button.addEventListener("click", () => {
  console.log("Button clicked!");
});

// With function
function handleClick() {
  console.log("Clicked!");
}
button.addEventListener("click", handleClick);
```

### Getting Event Information

```js
button.addEventListener("click", (event) => {
  console.log(event.target);        // Element that was clicked
  console.log(event.currentTarget); // Element with listener
  console.log(event.type);          // "click"
});
```

### Event Delegation

```js
// Instead of adding listener to each item...
// Add ONE listener to the parent

const list = document.querySelector("#todo-list");

list.addEventListener("click", (event) => {
  // Check what was clicked
  if (event.target.matches(".delete-btn")) {
    const todoItem = event.target.closest(".todo-item");
    todoItem.remove();
  }
});
```

**Why delegation?**
- One listener instead of hundreds
- Works for elements added later
- Better performance

---

## 🔥 Common Patterns

### Pattern 1: User Input to DOM

```js
const input = document.querySelector("#input");
const button = document.querySelector("#add-btn");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
  const text = input.value.trim();

  if (text) {
    const li = document.createElement("li");
    li.textContent = text;
    list.append(li);

    input.value = "";  // Clear input
    input.focus();     // Focus for next entry
  }
});
```

### Pattern 2: Toggle Visibility

```js
const toggleBtn = document.querySelector("#toggle");
const content = document.querySelector(".content");

toggleBtn.addEventListener("click", () => {
  content.classList.toggle("hidden");

  // Update button text
  const isHidden = content.classList.contains("hidden");
  toggleBtn.textContent = isHidden ? "Show" : "Hide";
});
```

### Pattern 3: Building from Data

```js
const users = [
  { name: "Alice", role: "Admin" },
  { name: "Bob", role: "User" }
];

function renderUsers(users) {
  const container = document.querySelector("#users");
  container.innerHTML = "";  // Clear existing

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");

    const name = document.createElement("h3");
    name.textContent = user.name;

    const role = document.createElement("p");
    role.textContent = user.role;

    card.append(name, role);
    container.append(card);
  });
}

renderUsers(users);
```

---

## 🐛 Common Mistakes and Solutions

### Mistake 1: Element Not Found

```js
// ❌ Element is null because HTML hasn't loaded
const button = document.querySelector("button");
button.addEventListener("click", handleClick);  // Error!

// ✅ Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  button.addEventListener("click", handleClick);
});

// ✅ Or put script at end of <body>
```

### Mistake 2: Forgetting Event Parameter

```js
// ❌ Can't access event information
button.addEventListener("click", () => {
  console.log(event.target);  // Error: event is not defined
});

// ✅ Add event parameter
button.addEventListener("click", (event) => {
  console.log(event.target);  // Works!
});

// ✅ Or use 'e' (common shorthand)
button.addEventListener("click", (e) => {
  console.log(e.target);
});
```

### Mistake 3: Adding Listener in Loop

```js
// ❌ Inefficient - creates many listeners
items.forEach(item => {
  item.addEventListener("click", handleClick);
});

// ✅ Use event delegation
container.addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    handleClick(e);
  }
});
```

### Mistake 4: Not Validating Input

```js
// ❌ Adds empty items
button.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = input.value;  // Could be empty!
  list.append(li);
});

// ✅ Validate first
button.addEventListener("click", () => {
  const text = input.value.trim();

  if (!text) {
    return;  // Don't add empty items
  }

  const li = document.createElement("li");
  li.textContent = text;
  list.append(li);
});
```

---

## ✅ Completion Checklist

Track your progress:

- [ ] Complete Exercise 1: Selecting and Changing
- [ ] Complete Exercise 2: Creating Elements
- [ ] Complete Exercise 3: Interactive List
- [ ] Complete Exercise 4: Event Delegation
- [ ] Complete the Challenge: Interactive Dashboard
- [ ] Finish the chapter quiz
- [ ] Review all solutions
- [ ] Build your own DOM manipulation project

---

## 🎓 Best Practices

### 1. Always Check if Element Exists

```js
const element = document.querySelector(".my-element");

if (element) {
  element.textContent = "Found!";
} else {
  console.error("Element not found");
}
```

### 2. Use Semantic HTML

```html
<!-- ✅ Good - semantic -->
<button class="submit">Submit</button>

<!-- ❌ Bad - div pretending to be button -->
<div class="submit" onclick="submit()">Submit</div>
```

### 3. Separate Styling from Behavior

```js
// ❌ Bad - styling in JavaScript
element.style.backgroundColor = "red";
element.style.padding = "10px";

// ✅ Good - use classes
element.classList.add("error-state");
```

**Then in CSS:**
```css
.error-state {
  background-color: red;
  padding: 10px;
}
```

### 4. Use Event Delegation for Lists

```js
// ✅ Good - one listener
list.addEventListener("click", handleItemClick);

// ❌ Bad - many listeners
items.forEach(item => {
  item.addEventListener("click", handleItemClick);
});
```

### 5. Clear Input After Action

```js
button.addEventListener("click", () => {
  const text = input.value;

  // ... do something with text ...

  input.value = "";     // Clear
  input.focus();        // Ready for next input
});
```

---

## 🌟 After Completing These Exercises

### You'll Be Able To:

- Build interactive user interfaces
- Create dynamic content from data
- Handle user interactions
- Build complete applications (todo lists, forms, dashboards)
- Use professional patterns (event delegation)
- Optimize for performance
- Write production-quality DOM code

### Real-World Applications:

**Todo Apps:**
- Add, complete, delete tasks
- Filter by status
- Persistent storage

**E-commerce:**
- Product filtering
- Shopping cart updates
- Dynamic pricing

**Dashboards:**
- Real-time data updates
- Interactive charts
- Tab navigation

**Forms:**
- Validation feedback
- Dynamic fields
- Multi-step forms

---

## 📖 Additional Resources

**Documentation:**
- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN: Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

**Practice:**
- [JavaScript.info: Document](https://javascript.info/document)
- [JavaScript.info: Events](https://javascript.info/events)

---

## 💪 You're Ready!

DOM manipulation is what makes you a "frontend developer" instead of just a "JavaScript developer." These skills are **required** for every frontend job.

**Every interactive feature** you've ever used on a website was built with these exact techniques.

**Start with Exercise 1 and let's make pages come alive!** 🚀

---

**Important Note:** These exercises require opening HTML files in a browser. You can't run them in Node.js or just the console. Make sure you have a browser ready and know how to open the developer console!

**Let's build something amazing!** ✨

