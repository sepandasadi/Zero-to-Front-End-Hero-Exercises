# Chapter 10 Quiz: The Document Object Model (DOM)

Test your understanding of the DOM concepts covered in Chapter 10.

---

## 📝 Quiz Questions

### 1. What is the DOM?

**a)** A programming language for building websites
**b)** A tree-like representation of an HTML document created by the browser
**c)** A CSS framework for styling web pages
**d)** A type of HTML tag

<details>
<summary>Show Answer</summary>

**Answer: b)** A tree-like representation of an HTML document created by the browser

**Explanation:** The Document Object Model (DOM) is the browser's internal representation of your HTML as a hierarchical tree of objects that JavaScript can interact with.

</details>

---

### 2. What does this code do?

```javascript
const heading = document.querySelector("h1");
```

**a)** Creates a new `<h1>` element
**b)** Selects all `<h1>` elements on the page
**c)** Selects the first `<h1>` element on the page
**d)** Deletes the first `<h1>` element

<details>
<summary>Show Answer</summary>

**Answer: c)** Selects the first `<h1>` element on the page

**Explanation:** `querySelector()` returns the first element that matches the given CSS selector. To select all matching elements, use `querySelectorAll()`.

</details>

---

### 3. What's the difference between `textContent` and `innerHTML`?

**a)** They do exactly the same thing
**b)** `textContent` treats everything as plain text; `innerHTML` interprets HTML tags
**c)** `innerHTML` is faster than `textContent`
**d)** `textContent` only works with paragraphs

<details>
<summary>Show Answer</summary>

**Answer: b)** `textContent` treats everything as plain text; `innerHTML` interprets HTML tags

**Explanation:**
- `textContent` is safe from XSS attacks and treats content as plain text
- `innerHTML` parses HTML tags, which is powerful but can be a security risk with untrusted data

</details>

---

### 4. How do you select an element with `id="menu"`?

**a)** `document.querySelector("#menu")`
**b)** `document.getElementById("menu")`
**c)** Both a and b
**d)** `document.selectId("menu")`

<details>
<summary>Show Answer</summary>

**Answer: c)** Both a and b

**Explanation:** Both methods work:
- `document.getElementById("menu")` - Classic method, slightly faster
- `document.querySelector("#menu")` - Modern method, more flexible

</details>

---

### 5. What does `element.classList.toggle("active")` do?

**a)** Adds the class "active" to the element
**b)** Removes the class "active" from the element
**c)** Adds the class if absent, removes it if present
**d)** Checks if the element has the class "active"

<details>
<summary>Show Answer</summary>

**Answer: c)** Adds the class if absent, removes it if present

**Explanation:** The `toggle()` method is like a switch—it adds the class if it's not there and removes it if it is. Perfect for showing/hiding or activating/deactivating elements.

</details>

---

### 6. Which of the following creates a new DOM element?

**a)** `document.createElement("div")`
**b)** `document.newElement("div")`
**c)** `document.addElement("div")`
**d)** `new Element("div")`

<details>
<summary>Show Answer</summary>

**Answer: a)** `document.createElement("div")`

**Explanation:** This creates a new `<div>` element in memory. You still need to add it to the DOM using methods like `appendChild()` or `append()` for it to appear on the page.

</details>

---

### 7. What event fires when a user clicks an element?

**a)** `tap`
**b)** `press`
**c)** `click`
**d)** `select`

<details>
<summary>Show Answer</summary>

**Answer: c)** `click`

**Explanation:** The `click` event fires when an element is clicked. You listen for it using:

```javascript
element.addEventListener("click", () => {
  // your code
});
```

</details>

---

### 8. What's wrong with this code?

```javascript
for (let i = 0; i < 1000; i++) {
  document.body.innerHTML += `<p>Item ${i}</p>`;
}
```

**a)** Nothing—it's perfectly fine
**b)** It updates the DOM 1000 times, which is very slow
**c)** The syntax is incorrect
**d)** You can't use template literals with innerHTML

<details>
<summary>Show Answer</summary>

**Answer: b)** It updates the DOM 1000 times, which is very slow

**Explanation:** Each `+=` operation completely rebuilds the entire innerHTML. This is extremely inefficient. Better to build the string first:

```javascript
let html = "";
for (let i = 0; i < 1000; i++) {
  html += `<p>Item ${i}</p>`;
}
document.body.innerHTML = html; // Single update
```

</details>

---

### 9. What is the relationship between HTML and the DOM?

**a)** They are the same thing
**b)** HTML is the source code; the DOM is the live representation created by the browser
**c)** The DOM is older than HTML
**d)** HTML can only be created by the DOM

<details>
<summary>Show Answer</summary>

**Answer: b)** HTML is the source code; the DOM is the live representation created by the browser

**Explanation:**
- **HTML** = Static text file you write
- **DOM** = Live, interactive tree structure the browser builds from your HTML

When JavaScript modifies the DOM, your HTML file doesn't change—only the browser's in-memory representation updates.

</details>

---

### 10. How do you add an event listener to a button?

**a)** `button.onClick = function() { ... }`
**b)** `button.addEventListener("click", () => { ... })`
**c)** `button.on("click", () => { ... })`
**d)** `button.listen("click", () => { ... })`

<details>
<summary>Show Answer</summary>

**Answer: b)** `button.addEventListener("click", () => { ... })`

**Explanation:** This is the modern, recommended way. While option (a) also works, `addEventListener()` allows multiple listeners on the same event and is more flexible.

</details>

---

### 11. What does `element.remove()` do?

**a)** Hides the element
**b)** Removes all text from the element
**c)** Completely removes the element from the DOM
**d)** Clears the element's attributes

<details>
<summary>Show Answer</summary>

**Answer: c)** Completely removes the element from the DOM

**Explanation:** The `remove()` method permanently deletes the element from the DOM. If you want to hide it instead, use CSS: `element.style.display = "none"`.

</details>

---

### 12. Why do frameworks like React use a "Virtual DOM"?

**a)** Because the real DOM doesn't work properly
**b)** To minimize expensive real DOM updates and improve performance
**c)** Because virtual DOMs are easier to write
**d)** To avoid using JavaScript

<details>
<summary>Show Answer</summary>

**Answer: b)** To minimize expensive real DOM updates and improve performance

**Explanation:** DOM manipulation is slow. Frameworks use virtual DOMs to calculate the minimal set of changes needed, then update the real DOM efficiently in batches.

</details>

---

### 13. How do you change the `src` attribute of an image?

**a)** `img.src = "new-image.jpg"`
**b)** `img.setAttribute("src", "new-image.jpg")`
**c)** Both a and b
**d)** `img.changeSrc("new-image.jpg")`

<details>
<summary>Show Answer</summary>

**Answer: c)** Both a and b

**Explanation:** Both methods work:
- `img.src = "new-image.jpg"` - Direct property access (more common)
- `img.setAttribute("src", "new-image.jpg")` - Generic method

</details>

---

### 14. What does the event object contain?

**a)** Information about the event that occurred
**b)** The CSS styles of the element
**c)** The HTML source code
**d)** Nothing useful

<details>
<summary>Show Answer</summary>

**Answer: a)** Information about the event that occurred

**Explanation:** The event object (often called `e` or `event`) contains details like:
- `event.target` - The element that triggered the event
- `event.type` - The type of event (e.g., "click")
- `event.preventDefault()` - Method to stop default behavior
- And much more depending on the event type

</details>

---

### 15. What's the best way to add multiple classes to an element at once?

**a)** `element.class = "class1 class2 class3"`
**b)** `element.classList.add("class1 class2 class3")`
**c)** `element.classList.add("class1", "class2", "class3")`
**d)** You can only add one class at a time

<details>
<summary>Show Answer</summary>

**Answer: c)** `element.classList.add("class1", "class2", "class3")`

**Explanation:** The `classList.add()` method accepts multiple arguments, adding all specified classes at once. This is cleaner and more efficient than adding them one by one.

</details>

---

## 📊 Scoring Guide

Count your correct answers:

- **13-15 correct**: 🌟 **DOM Master!** You have an excellent understanding of DOM manipulation
- **10-12 correct**: 💪 **Strong grasp!** You understand the core concepts well
- **7-9 correct**: 📚 **Good foundation!** Review the areas you missed and practice more
- **4-6 correct**: 🔄 **Needs review** - Re-read the chapter and try the exercises
- **0-3 correct**: 📖 **Start over** - Take your time with the chapter and examples

---

## 🎯 Next Steps

After completing the quiz:

1. **Review any incorrect answers** - Understanding why is more important than the score
2. **Complete the practice exercises** - Hands-on practice solidifies concepts
3. **Experiment in DevTools** - Inspect and modify real websites
4. **Build the challenge project** - Apply everything you've learned

**Keep learning! The DOM is the foundation of interactive web development.** 🚀

