# Exercise 04: Event Delegation

## 🎯 Objective

Master event delegation—the professional pattern for handling events on dynamic content. Learn to write scalable, performant event handlers that work with elements created after page load.

## 📚 What You'll Learn

- Event bubbling and propagation
- Event delegation pattern
- Using `event.target` and `event.currentTarget`
- `closest()` method for finding parent elements
- Performance benefits of delegation
- Handling events on dynamic content
- Best practices for event handling

## 🤔 The Problem

**Without delegation (BAD):**
```js
// Adding listener to each item individually
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// Problem: New items won't have listeners!
// Problem: 1000 items = 1000 listeners (slow!)
```

**With delegation (GOOD):**
```js
// One listener on parent handles all items
parent.addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e);
  }
});

// Solution: Works for current AND future items!
// Solution: 1 listener regardless of item count!
```

## 📋 Tasks

### Task 1: Basic Event Delegation

Create a list where clicking any item logs its text, using delegation.

**Requirements:**
- List of 10 items
- One click listener on the `<ul>`, not on each `<li>`
- Log the clicked item's text

**Your tasks:**
1. Create a list with multiple items
2. Add ONE event listener to the `<ul>` (parent)
3. Use `e.target` to identify which item was clicked
4. Log the item's text

---

### Task 2: Dynamic List with Actions

Build a list where you can add items dynamically and each has a delete button.

**Requirements:**
- Input to add new items
- Each item has a delete button
- Clicking delete removes that item
- Use event delegation (not individual listeners!)

**Your tasks:**
1. Create add functionality
2. Add ONE click listener to the list container
3. Check if clicked element is a delete button
4. Remove the correct item

**Hint:** Use `e.target.closest('.item')` to find the item to remove

---

### Task 3: Multiple Actions Per Item

Create a product list where each item has multiple actions: edit, delete, and favorite.

**Requirements:**
- Each item shows: product name, edit button, delete button, favorite button
- All actions handled with ONE listener
- Identify which button was clicked
- Perform the appropriate action

**Your tasks:**
1. Create product items with multiple buttons
2. Add ONE listener to the list
3. Identify action by button class or data attribute
4. Handle each action appropriately

---

### Task 4: Nested Elements

Handle clicks on nested elements correctly.

**Given structure:**
```html
<div class="card">
  <div class="card-header">
    <h3>Title</h3>
    <span class="badge">New</span>
  </div>
  <div class="card-body">
    <p>Content...</p>
  </div>
  <div class="card-footer">
    <button class="btn-primary">Action</button>
  </div>
</div>
```

**Requirements:**
- Clicking anywhere on card selects it (except buttons)
- Clicking button performs action (doesn't select card)
- Handle nested clicks correctly

**Your tasks:**
1. Add listener to container
2. Use `e.target.closest('.card')` to find card
3. Stop propagation on button clicks
4. Highlight selected card

---

### Task 5: Performance Comparison

Compare performance of individual listeners vs delegation.

**Your tasks:**
1. Create 1000 items
2. Add individual listeners to each (method 1)
3. Use delegation (method 2)
4. Measure and compare:
   - Time to add listeners
   - Memory usage (in dev tools)
   - Responsiveness when clicking

---

### Task 6: Event Delegation with Data Attributes

Use data attributes to pass information to the event handler.

**Example:**
```html
<button data-action="delete" data-id="123">Delete</button>
<button data-action="edit" data-id="123">Edit</button>
```

**Your tasks:**
1. Create items with data attributes
2. Use delegation to handle all clicks
3. Read `dataset` to determine action and ID
4. Perform action based on data

---

### Task 7: Keyboard Delegation

Apply delegation to keyboard events.

**Requirements:**
- List of editable items
- Press Enter to save
- Press Escape to cancel
- Press Delete to remove
- Use ONE keydown listener

---

### Task 8: Complex Real-World Example

Build a complete task manager with categories and tasks.

**Structure:**
```html
<div class="category">
  <h3>Work</h3>
  <ul class="task-list">
    <li class="task">Task 1 <button class="delete">×</button></li>
    <li class="task">Task 2 <button class="delete">×</button></li>
  </ul>
  <button class="add-task">+ Add Task</button>
</div>
```

**Requirements:**
- Multiple categories
- Add/delete tasks within each category
- Toggle task completion
- Expand/collapse categories
- Use delegation for ALL events

---

## ✅ Success Criteria

Your solution should:

1. ✅ Use event delegation (one listener on parent)
2. ✅ Handle events on dynamically created elements
3. ✅ Correctly identify clicked elements
4. ✅ Use `closest()` for nested elements
5. ✅ Stop propagation when needed
6. ✅ Be more performant than individual listeners
7. ✅ Work with data attributes
8. ✅ Handle edge cases (clicks on child elements)

## 💡 Hints

### Hint 1: Basic Delegation

```js
list.addEventListener('click', (e) => {
  // Check if clicked element is an item
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});
```

### Hint 2: Using closest()

```js
container.addEventListener('click', (e) => {
  // Find closest .item parent (even if clicked on child)
  const item = e.target.closest('.item');

  if (item) {
    console.log('Item clicked:', item);
  }
});
```

### Hint 3: Multiple Actions

```js
list.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('delete-btn')) {
    // Handle delete
    const item = target.closest('.item');
    item.remove();
  } else if (target.classList.contains('edit-btn')) {
    // Handle edit
    const item = target.closest('.item');
    editItem(item);
  }
});
```

### Hint 4: Data Attributes

```js
container.addEventListener('click', (e) => {
  const { action, id } = e.target.dataset;

  switch (action) {
    case 'delete':
      deleteItem(id);
      break;
    case 'edit':
      editItem(id);
      break;
  }
});
```

### Hint 5: Stop Propagation

```js
card.addEventListener('click', selectCard);

button.addEventListener('click', (e) => {
  e.stopPropagation();  // Don't select card
  performAction();
});
```

### Hint 6: Matches Method

```js
container.addEventListener('click', (e) => {
  // Check if target matches selector
  if (e.target.matches('.delete-btn')) {
    handleDelete(e);
  }
});
```

## 🎨 Design Tips

Make it clear what's clickable:

```css
.item {
  cursor: pointer;
  transition: background 0.3s;
}

.item:hover {
  background: #f0f0f0;
}

.item button {
  cursor: pointer;
}

.item button:hover {
  background: #e0e0e0;
}
```

## 🧪 Testing

Test your delegation:

1. **Create items dynamically** - Ensure events work on new items
2. **Click on nested elements** - Ensure parent is found
3. **Rapid clicking** - Ensure performance is good
4. **Multiple actions** - Ensure correct action is triggered
5. **Edge cases** - Click on padding, borders, etc.

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Tasks 1-2 (Basic delegation)
- 10 minutes: Task 3 (Multiple actions)
- 10 minutes: Task 4 (Nested elements)
- 5 minutes: Task 5 (Performance)
- 5 minutes: Task 6 (Data attributes)
- 10 minutes: Tasks 7-8 (Advanced)

## 🎯 Bonus Challenges

### Bonus 1: Custom Event System

Create a simple event bus using delegation:

```js
class EventBus {
  constructor(container) {
    this.container = container;
    this.handlers = {};
  }

  on(eventName, selector, handler) {
    // Use delegation to handle custom events
  }

  emit(element, eventName, data) {
    // Trigger custom event
  }
}
```

### Bonus 2: Sortable List

Create a drag-and-drop sortable list using delegation.

### Bonus 3: Context Menu

Create a right-click context menu using delegation.

### Bonus 4: Virtual Scrolling

Implement virtual scrolling with delegation (only render visible items).

## 📖 Resources

- [MDN: Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
- [MDN: Element.closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
- [MDN: Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
- [JavaScript.info: Event Delegation](https://javascript.info/event-delegation)

---

## 🎓 Why Event Delegation Matters

**Performance:**
- 1 listener instead of 1000 = Faster page load
- Less memory usage
- Easier to manage

**Functionality:**
- Works with dynamically added elements
- No need to re-attach listeners
- Cleaner, more maintainable code

**Real-World Usage:**
- React uses delegation (synthetic events)
- jQuery used delegation (`.on()`)
- Every major framework uses this pattern

**This is how professionals handle events!** 🚀

---

**Ready to master the pattern that frameworks use?** Event delegation is fundamental to modern web development. Let's practice! 💪

