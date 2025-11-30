# Exercise 4: Create and Remove Elements

**Difficulty**: ⭐⭐ Intermediate
**Concepts**: `createElement()`, `appendChild()`, `append()`, `remove()`, event listeners

---

## 🎯 Goal

Learn to dynamically create new DOM elements and remove existing ones. This is essential for building interactive lists, forms, and dynamic content!

---

## 📝 Instructions

Build a simple **"Item Manager"** where users can:

1. Add new items to a list by clicking a button
2. Remove individual items by clicking their delete button

---

## ✅ Requirements

### Part 1: Add Items

1. When the "Add Item" button is clicked:
   - Create a new `<li>` element
   - Set its text content to "Item #" where # is the item number (1, 2, 3...)
   - Append it to the `<ul id="item-list">`

2. Each item should be numbered automatically

**Example:**
- First click → "Item 1"
- Second click → "Item 2"
- Third click → "Item 3"

---

### Part 2: Delete Items

1. Each list item should have its own **"Delete"** button
2. When a delete button is clicked, remove that specific `<li>` from the DOM
3. The item should disappear from the page immediately

---

## 📋 Starter Code Structure

Your starter file includes:

- An "Add Item" button with `id="add-btn"`
- An empty `<ul>` with `id="item-list"`
- Basic styling

---

## 💡 Implementation Tips

### Creating Elements

```javascript
const li = document.createElement("li");
li.textContent = "Some text";
document.querySelector("ul").appendChild(li);
```

### Creating Delete Buttons

```javascript
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.addEventListener("click", () => {
  // Remove the parent <li> element
  li.remove();
});
li.appendChild(deleteBtn);
```

### Keeping Track of Item Numbers

Use a counter variable:

```javascript
let itemCount = 0;

function addItem() {
  itemCount++;
  const li = document.createElement("li");
  li.textContent = `Item ${itemCount}`;
  // ... rest of code
}
```

---

## ✔️ Completion Checklist

- [ ] "Add Item" button creates new list items
- [ ] Items are numbered sequentially
- [ ] Each item has a delete button
- [ ] Delete button removes only that specific item
- [ ] Items disappear from the DOM when deleted
- [ ] Code is clean and well-organized

---

## 🎓 Bonus Challenges

1. **Style the items:** Give each item a background color and padding
2. **Empty state message:** Show "No items yet" when the list is empty
3. **Confirm deletion:** Use `confirm()` to ask before deleting
4. **Add custom text:** Let users type text in an input field before adding
5. **Clear all button:** Add a button that removes all items at once
6. **Item counter:** Display the total number of items on the page

---

## 🎯 Expected Behavior

**Before clicking:**
```
[Add Item Button]
(empty list)
```

**After 3 clicks:**
```
[Add Item Button]
- Item 1 [Delete]
- Item 2 [Delete]
- Item 3 [Delete]
```

**After deleting Item 2:**
```
[Add Item Button]
- Item 1 [Delete]
- Item 3 [Delete]
```

---

**Build your solution in the starter file, then check the solution!**

