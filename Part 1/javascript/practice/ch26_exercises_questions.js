// Chapter 26 Exercises: DOM Manipulation (Questions Only)

// Exercise 1: Selectors and Content
// 1) Select the main heading (<h1>) and set its text to "DOM Practice".
// 2) Select all elements with class ".item" and log each element's textContent.

// Exercise 2: Create and Insert
// 1) Create a new <li class="item">New Item</li> and append it to the #list element.
// 2) Prepend a <li class="item">First Item</li> to the same #list element.
// 3) Insert a <p>Inserted after the list</p> right after #list using insertAdjacentHTML.

// Exercise 3: Classes and Styles
// 1) Toggle a "highlight" class on every other .item (0, 2, 4, ...).
// 2) Add an "active" class to #list if it has more than 3 children.
// 3) Set inline style marginTop = "16px" on #list.

// Exercise 4: Attributes and Data Attributes
// 1) Add aria-live="polite" to the #status element.
// 2) Add data-role="cta" to all buttons inside .toolbar.
// 3) Read back the data-role and log it for each button.

// Exercise 5: Event Delegation
// 1) Add a single click listener on #list that removes an item when a button with class ".remove" inside it is clicked.
// 2) Ensure the handler only acts when the closest <li> exists and the click originated from a .remove button.

// Exercise 6: Deep Traversal
// 1) Starting from a .card element, find its closest ancestor with class ".panel".
// 2) From that panel, select a header element (e.g., h2 or .panel__header) and change its text to "Updated Header".

// Exercise 7: Performance with DocumentFragment
// 1) Append 1000 <li> items to #big-list using a DocumentFragment, measuring the time using console.time / console.timeEnd.
// 2) Each item should be labeled "Item X" where X is the index.
