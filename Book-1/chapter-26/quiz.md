# Chapter 26: DOM Manipulation - Quiz

Test your understanding of DOM manipulation! This quiz covers element selection, content modification, creating elements, events, and best practices.

**Instructions:**
- Answer each question to the best of your ability
- Some questions have code examples—read them carefully!
- Try to answer without looking at the chapter first
- Answers with detailed explanations are at the bottom

---

## Questions

### 1. What does DOM stand for?

A) Data Object Model
B) Document Object Model
C) Dynamic Object Management
D) Document Oriented Markup

---

### 2. Which method finds the FIRST element matching a CSS selector?

A) `document.getElement()`
B) `document.querySelector()`
C) `document.findElement()`
D) `document.selectElement()`

---

### 3. What does `querySelectorAll()` return?

A) An array
B) A NodeList
C) An HTMLCollection
D) A single element

---

### 4. What's the safest way to change text content?

A) `element.innerHTML`
B) `element.innerText`
C) `element.textContent`
D) `element.text`

---

### 5. What will this code do?
```js
const heading = document.querySelector("h1");
heading.textContent = "Hello World";
```

A) Creates a new h1 element
B) Changes the text of the first h1
C) Changes all h1 elements
D) Returns "Hello World"

---

### 6. What's the preferred way to style elements from JavaScript?

A) Inline styles with `.style`
B) Using `.classList` to toggle classes
C) Setting `.className` directly
D) Using `.css()`

---

### 7. How do you add a class to an element?

A) `element.class.add("highlight")`
B) `element.className.add("highlight")`
C) `element.classList.add("highlight")`
D) `element.addClass("highlight")`

---

### 8. What does `classList.toggle()` do?

A) Removes all classes
B) Adds a class if missing, removes if present
C) Switches between two classes
D) Toggles element visibility

---

### 9. How do you create a new element?

A) `document.newElement("div")`
B) `document.createNode("div")`
C) `document.createElement("div")`
D) `document.create("div")`

---

### 10. What's the difference between `append()` and `prepend()`?

A) No difference
B) `append()` adds to end, `prepend()` adds to beginning
C) `append()` is faster
D) `prepend()` is deprecated

---

### 11. How do you remove an element from the DOM?

A) `element.delete()`
B) `element.remove()`
C) `document.remove(element)`
D) `element.destroy()`

---

### 12. What's wrong with this code?
```js
const button = document.querySelector("button");
button.addEventListener("click", handleClick());
```

A) Nothing is wrong
B) The function is called immediately, not on click
C) Should use `onClick` instead
D) Missing event parameter

---

### 13. How do you get the value of an input field?

A) `input.value`
B) `input.textContent`
C) `input.innerHTML`
D) `input.text`

---

### 14. What is event delegation?

A) Delegating events to the browser
B) Adding event listener to parent instead of children
C) Removing event listeners
D) Event priority system

---

### 15. Why is event delegation useful?

A) It's faster to write
B) Works for dynamically added elements
C) Uses less memory
D) Both B and C

---

### 16. What does `event.target` refer to?

A) The element with the event listener
B) The element that was actually clicked
C) The parent element
D) The document

---

### 17. What will this code do?
```js
const items = document.querySelectorAll(".item");
items.forEach(item => {
  console.log(item.textContent);
});
```

A) Error - can't use forEach
B) Logs content of all items
C) Logs only the first item
D) Returns an array

---

### 18. What's the security risk with `innerHTML`?

A) It's slower than textContent
B) XSS (Cross-Site Scripting) with user input
C) It doesn't work in all browsers
D) There is no risk

---

### 19. What does `closest()` do?

A) Finds the closest sibling
B) Finds nearest ancestor matching selector
C) Finds nearest child matching selector
D) Finds nearest element by distance

---

### 20. What's the purpose of DocumentFragment?

A) To delete fragments of HTML
B) To batch DOM updates for performance
C) To fragment large files
D) To create document sections

---

## Bonus Questions

### 21. What's the difference between `textContent` and `innerHTML`?

A) No difference
B) `textContent` treats content as plain text, `innerHTML` parses HTML
C) `innerHTML` is faster
D) `textContent` is deprecated

---

### 22. What will this code output?
```js
const div = document.createElement("div");
console.log(div.textContent);
```

A) "div"
B) `null`
C) `undefined`
D) Empty string

---

### 23. How do you prevent default form submission?

A) `return false`
B) `event.preventDefault()`
C) `event.stopSubmission()`
D) `form.preventSubmit()`

---

### 24. What's the proper place to put your script tag?

A) In the `<head>`
B) At the end of `<body>`
C) Doesn't matter
D) In a separate file only

---

### 25. What's the best practice for adding multiple elements?

A) Add them one by one
B) Use DocumentFragment
C) Use innerHTML with string concatenation
D) Add them in a loop

---

## Answer Key

### 1. B - Document Object Model

The DOM is a tree-like representation of your HTML that JavaScript can manipulate.

---

### 2. B - `document.querySelector()`

`querySelector()` finds the **first** element matching the CSS selector.

```js
const firstButton = document.querySelector("button");
const primaryBtn = document.querySelector(".btn-primary");
```

---

### 3. B - A NodeList

`querySelectorAll()` returns a NodeList (similar to an array, but not exactly).

```js
const items = document.querySelectorAll(".item");
items.forEach(item => {  // Can use forEach
  console.log(item);
});
```

---

### 4. C - `element.textContent`

`textContent` is safest because it treats content as plain text (no HTML parsing).

```js
element.textContent = userInput;  // Safe
element.innerHTML = userInput;    // Dangerous if user input contains <script>
```

---

### 5. B - Changes the text of the first h1

`querySelector()` finds the **first** matching element, then `textContent` changes its text.

```js
// Before: <h1>Old Title</h1>
heading.textContent = "Hello World";
// After: <h1>Hello World</h1>
```

---

### 6. B - Using `.classList` to toggle classes

**Best practice:** Keep styles in CSS, use JavaScript to toggle classes.

```js
// ❌ Bad - mixing concerns
element.style.backgroundColor = "red";

// ✅ Good - separate concerns
element.classList.add("error-state");
```

---

### 7. C - `element.classList.add("highlight")`

`classList` provides methods to manage classes.

```js
element.classList.add("highlight");
element.classList.remove("hidden");
element.classList.toggle("active");
```

---

### 8. B - Adds a class if missing, removes if present

`toggle()` is perfect for on/off states (like dark mode).

```js
button.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
```

---

### 9. C - `document.createElement("div")`

This creates a new element (it's not in the DOM yet!).

```js
const div = document.createElement("div");
div.textContent = "Hello";
div.classList.add("card");
document.body.append(div);  // Now it's in the DOM
```

---

### 10. B - `append()` adds to end, `prepend()` adds to beginning

```js
list.append(newItem);   // Add to end
list.prepend(newItem);  // Add to beginning
```

---

### 11. B - `element.remove()`

Modern and simple!

```js
const item = document.querySelector(".remove-me");
item.remove();  // Gone!
```

---

### 12. B - The function is called immediately, not on click

The parentheses `()` execute the function immediately.

```js
// ❌ Wrong - calls handleClick NOW
button.addEventListener("click", handleClick());

// ✅ Correct - passes the function to be called later
button.addEventListener("click", handleClick);

// ✅ Or use arrow function
button.addEventListener("click", () => handleClick());
```

---

### 13. A - `input.value`

```js
const input = document.querySelector("input");
const userInput = input.value;

// Set value
input.value = "New value";

// Clear input
input.value = "";
```

---

### 14. B - Adding event listener to parent instead of children

Instead of adding listeners to 100 items, add ONE listener to the parent.

```js
// ✅ Event delegation - one listener
list.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    e.target.closest(".item").remove();
  }
});
```

---

### 15. D - Both B and C

Event delegation:
- Works for elements added later (B)
- Uses less memory (C) - one listener instead of hundreds

---

### 16. B - The element that was actually clicked

```js
list.addEventListener("click", (event) => {
  console.log(event.target);        // Element clicked
  console.log(event.currentTarget); // Element with listener (list)
});
```

---

### 17. B - Logs content of all items

NodeLists have `forEach()` (arrays of actual elements don't need conversion).

```js
const items = document.querySelectorAll(".item");
items.forEach(item => {
  console.log(item.textContent);
});
```

---

### 18. B - XSS (Cross-Site Scripting) with user input

Never use `innerHTML` with untrusted content!

```js
// ⚠️ Dangerous
const userInput = getUserInput();
div.innerHTML = userInput;  // User can inject <script> tags!

// ✅ Safe
div.textContent = userInput;  // Treated as plain text
```

---

### 19. B - Finds nearest ancestor matching selector

`closest()` searches **up** the DOM tree.

```js
const button = document.querySelector(".delete-btn");
const card = button.closest(".card");  // Find parent card
```

---

### 20. B - To batch DOM updates for performance

Create many elements off-DOM, then add all at once.

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.append(li);  // Off-DOM
}

list.append(fragment);  // Single reflow!
```

---

### Bonus Answers

### 21. B - `textContent` treats content as plain text, `innerHTML` parses HTML

```js
element.textContent = "<b>Bold</b>";  // Shows: <b>Bold</b>
element.innerHTML = "<b>Bold</b>";    // Shows: **Bold**
```

---

### 22. D - Empty string

New elements start with empty text content.

```js
const div = document.createElement("div");
console.log(div.textContent);  // ""
console.log(div.innerHTML);    // ""
```

---

### 23. B - `event.preventDefault()`

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();  // Stop form submission

  // Handle form with JavaScript
});
```

---

### 24. B - At the end of `<body>`

This ensures HTML loads before JavaScript runs.

```html
<body>
  <h1>Hello</h1>
  <button>Click</button>

  <script src="script.js"></script>  <!-- At the end -->
</body>
```

**Alternative:** Use `DOMContentLoaded` event:
```js
document.addEventListener("DOMContentLoaded", () => {
  // Safe - DOM is loaded
});
```

---

### 25. B - Use DocumentFragment

For performance, batch your DOM operations.

```js
const fragment = document.createDocumentFragment();

items.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  fragment.append(li);  // Build off-DOM
});

list.append(fragment);  // Add all at once
```

---

## Scoring

- **23-25 correct**: Excellent! You've mastered DOM manipulation.
- **19-22 correct**: Great job! You understand the core concepts well.
- **15-18 correct**: Good! Review event delegation and best practices.
- **11-14 correct**: Decent foundation. Revisit Chapter 26 and practice more.
- **Below 11**: Take your time with Chapter 26. Focus on basics before advanced topics.

---

## Key Takeaways

1. **querySelector/querySelectorAll** - Modern way to select elements
2. **textContent** - Safe for text, innerHTML for HTML (careful!)
3. **classList** - add, remove, toggle, contains
4. **createElement** - Build elements, then append
5. **append/prepend** - Add to end/beginning
6. **remove()** - Delete elements
7. **Event listeners** - Pass function reference, not call it
8. **input.value** - Get/set input values
9. **Event delegation** - One listener on parent
10. **event.target** - What was clicked
11. **closest()** - Find ancestor
12. **DocumentFragment** - Batch operations for performance

---

## Next Steps

1. ✅ Review any questions you got wrong
2. 📚 Revisit relevant sections in Chapter 26
3. 💻 Complete the practice exercises
4. 🚀 Build interactive components
5. 🔄 Practice event delegation
6. 🎯 Build a complete application

---

**Great work completing the quiz!** DOM manipulation is the heart of frontend development. Keep practicing and you'll be building amazing interactive applications! 💪

**Ready for hands-on practice?** Head to Exercise 1 and start making pages interactive! 🚀

