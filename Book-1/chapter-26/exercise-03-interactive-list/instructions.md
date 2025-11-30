# Exercise 03: Interactive List

## 🎯 Objective

Build a fully functional todo list application with add, complete, and delete features. This is your first complete interactive application combining DOM manipulation and event handling!

## 📚 What You'll Learn

- Handling user input from forms
- Creating elements based on user actions
- Adding event listeners to dynamically created elements
- Removing elements from the DOM
- Toggling states (complete/incomplete)
- Basic state management
- Input validation
- Local storage (bonus)

## 📋 Tasks

### Task 1: Basic Todo List

Build a simple todo list with add and display functionality.

**Requirements:**
1. Input field for new todos
2. "Add" button
3. Display list of todos
4. Each todo shows the task text

**HTML Structure (provided):**
```html
<input id="todo-input" type="text" placeholder="Enter a new task...">
<button id="add-btn">Add Task</button>
<ul id="todo-list"></ul>
```

**Your tasks:**
1. Listen for click on "Add" button
2. Get value from input field
3. Create new `<li>` with the task text
4. Append to the list
5. Clear input field after adding

---

### Task 2: Delete Functionality

Add the ability to remove todos.

**Requirements:**
1. Each todo should have a "Delete" button
2. Clicking delete removes that todo from the list

**Your tasks:**
1. Modify your createTodo function to include a delete button
2. Add click listener to delete button
3. Remove the todo element when clicked

---

### Task 3: Complete/Incomplete Toggle

Add the ability to mark todos as complete.

**Requirements:**
1. Clicking a todo marks it as complete (strikethrough, grey color)
2. Clicking again marks it as incomplete
3. Visual feedback for complete state

**Your tasks:**
1. Add click listener to todo text
2. Toggle a "completed" class
3. Style the completed class with CSS

---

### Task 4: Input Validation

Prevent adding empty or invalid todos.

**Requirements:**
1. Don't add empty todos
2. Show error message for invalid input
3. Trim whitespace from input

**Your tasks:**
1. Validate input before adding
2. Display error message if invalid
3. Clear error when user types

---

### Task 5: Enhanced Features

Add professional features to your todo list.

**Features to implement:**
1. **Todo counter**: Show "X tasks remaining"
2. **Filter buttons**: Show All / Active / Completed
3. **Clear completed**: Button to remove all completed todos
4. **Edit functionality**: Double-click to edit a todo

---

### Task 6: Keyboard Support

Add keyboard shortcuts for better UX.

**Requirements:**
1. Press Enter in input field to add todo
2. Press Escape to cancel edit (if editing)
3. Press Delete key on todo to remove it

---

### Task 7: Data Persistence

Save todos to localStorage so they persist on page reload.

**Your tasks:**
1. Save todos array to localStorage when changed
2. Load todos from localStorage on page load
3. Keep todos in sync with localStorage

---

### Task 8: Advanced Interactions

Add drag-and-drop reordering (bonus challenge).

**Your tasks:**
1. Make todos draggable
2. Allow reordering by dragging
3. Update state after reorder

---

## ✅ Success Criteria

Your todo list should:

1. ✅ Add new todos from input field
2. ✅ Delete individual todos
3. ✅ Toggle complete/incomplete state
4. ✅ Validate input (no empty todos)
5. ✅ Show todo counter
6. ✅ Filter by status (all/active/completed)
7. ✅ Have clear UI feedback for all actions
8. ✅ Support keyboard interactions
9. ✅ (Bonus) Persist data with localStorage

## 💡 Hints

### Hint 1: Basic Structure

```js
function createTodoElement(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  return li;
}
```

### Hint 2: Toggle Complete

```js
todo.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') {
    todo.classList.toggle('completed');
  }
});
```

### Hint 3: Input Validation

```js
function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text === '') {
    showError('Please enter a task');
    return;
  }

  // Create and add todo
  input.value = '';
}
```

### Hint 4: Counter

```js
function updateCounter() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  counterElement.textContent = `${active} of ${total} tasks remaining`;
}
```

### Hint 5: localStorage

```js
// Save
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load
function loadTodos() {
  const stored = localStorage.getItem('todos');
  if (stored) {
    todos = JSON.parse(stored);
    renderTodos();
  }
}
```

### Hint 6: Filtering

```js
function filterTodos(status) {
  const allTodos = document.querySelectorAll('.todo-item');

  allTodos.forEach(todo => {
    switch(status) {
      case 'active':
        todo.style.display = todo.classList.contains('completed') ? 'none' : 'flex';
        break;
      case 'completed':
        todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
        break;
      default:
        todo.style.display = 'flex';
    }
  });
}
```

## 🎨 Design Tips

### CSS for Todo Items

```css
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}
```

## 🧪 Testing Checklist

Test your application thoroughly:

- [ ] Can add new todos
- [ ] Can delete todos
- [ ] Can mark todos as complete
- [ ] Cannot add empty todos
- [ ] Counter updates correctly
- [ ] Filters work (all/active/completed)
- [ ] Enter key adds todo
- [ ] Todos persist after page reload
- [ ] UI is responsive and looks good
- [ ] No console errors

## ⏱️ Estimated Time

**40-50 minutes**

- 10 minutes: Tasks 1-2 (Basic add/delete)
- 10 minutes: Task 3 (Complete toggle)
- 5 minutes: Task 4 (Validation)
- 10 minutes: Task 5 (Enhanced features)
- 5 minutes: Task 6 (Keyboard support)
- 10 minutes: Task 7 (localStorage)

## 🎯 Bonus Challenges

### Bonus 1: Due Dates

Add due dates to todos:
```js
{
  id: 1,
  text: "Finish project",
  completed: false,
  dueDate: "2024-12-31"
}
```

### Bonus 2: Priority Levels

Add priority levels (high/medium/low) with color coding.

### Bonus 3: Categories/Tags

Add ability to categorize todos:
```js
{
  id: 1,
  text: "Buy groceries",
  category: "personal",
  tags: ["shopping", "urgent"]
}
```

### Bonus 4: Subtasks

Allow todos to have subtasks:
```js
{
  id: 1,
  text: "Plan vacation",
  subtasks: [
    { id: 11, text: "Book flights", completed: false },
    { id: 12, text: "Reserve hotel", completed: true }
  ]
}
```

### Bonus 5: Search/Filter

Add a search box to filter todos by text.

### Bonus 6: Statistics

Show statistics:
- Total tasks
- Completed today
- Completion rate
- Average completion time

## 📖 Resources

- [MDN: Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN: classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Chapter 26: Interactive Applications

---

## 🎓 Why This Matters

**Todo lists are the "Hello World" of interactive apps:**

1. **Fundamental Patterns** - Add, edit, delete (CRUD operations)
2. **State Management** - Track data that changes over time
3. **User Input** - Handle forms and validation
4. **Data Persistence** - Save and load user data
5. **Real-World Practice** - Every app has lists and CRUD

**Master this, and you can build any CRUD application!** 🚀

### Real-World Applications

This exercise teaches patterns used in:
- **Project management tools** (Trello, Asana)
- **Note-taking apps** (Evernote, Notion)
- **Shopping lists** (Amazon wishlist)
- **Task trackers** (GitHub issues)
- **Any list-based interface**

---

**Ready to build your first complete application?** This is where you become a real web developer. Let's build! 💪

