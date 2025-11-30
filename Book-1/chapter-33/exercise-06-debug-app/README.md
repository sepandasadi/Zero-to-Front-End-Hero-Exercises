# Exercise 6: Debug the Broken App

**Difficulty**: Advanced
**Time**: 1-2 hours

## 🎯 Goal

Use DevTools to find and fix multiple bugs in a broken task manager app. This simulates real-world debugging—finding issues using breakpoints, console errors, and systematic investigation.

## 📋 Requirements

1. Browser with DevTools
2. Text editor
3. Understanding of HTML, CSS, JavaScript
4. Debugging skills from this chapter

## 🔨 The Broken App

**Create `broken-app.html`:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bug Hunt - Task Manager</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }

    h1 {
      color: #333;
      margin-bottom: 20px;
    }

    .input-section {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    #taskInput {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
    }

    #addBtn {
      padding: 12px 24px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    #addBtn:hover {
      background: #45a049;
    }

    #taskList {
      background: white;
      border-radius: 5px;
      padding: 10px;
      min-height: 200px;
    }

    .task {
      padding: 15px;
      margin: 10px 0;
      background: #f9f9f9;
      border-radius: 5px;
      border-left: 4px solid #4CAF50;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s;
    }

    .task:hover {
      background: #f0f0f0;
    }

    .task.completed {
      opacity: 0.6;
      border-left-color: #999;
    }

    .task.completed .task-text {
      text-decoration: line-through;
      color: #999;
    }

    .task-text {
      flex: 1;
      margin-right: 10px;
    }

    .task-buttons {
      display: flex;
      gap: 5px;
    }

    button.complete-btn,
    button.delete-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;
    }

    button.complete-btn {
      background: #2196F3;
      color: white;
    }

    button.complete-btn:hover {
      background: #0b7dda;
    }

    button.delete-btn {
      background: #f44336;
      color: white;
    }

    button.delete-btn:hover {
      background: #da190b;
    }

    .stats {
      margin-top: 20px;
      padding: 15px;
      background: white;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #4CAF50;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>📋 Task Manager</h1>

  <div class="input-section">
    <input
      type="text"
      id="taskInput"
      placeholder="Enter a new task..."
      autocomplete="off"
    >
    <button id="addBtn">Add Task</button>
  </div>

  <div id="taskList">
    <div class="empty-state">No tasks yet. Add one above!</div>
  </div>

  <div class="stats">
    <div class="stat">
      <div class="stat-number" id="totalTasks">0</div>
      <div class="stat-label">Total Tasks</div>
    </div>
    <div class="stat">
      <div class="stat-number" id="completedTasks">0</div>
      <div class="stat-label">Completed</div>
    </div>
    <div class="stat">
      <div class="stat-number" id="pendingTasks">0</div>
      <div class="stat-label">Pending</div>
    </div>
  </div>

  <script>
    // BUG 1: Typo in element ID
    const taskInput = document.getElementById('taskInpt');  // Wrong ID!
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    // Add task
    addBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();

      // BUG 2: Assignment operator instead of comparison
      if (taskText = '') {  // Should be ===
        alert('Please enter a task!');
        return;
      }

      // BUG 3: Not using proper unique IDs
      const task = {
        id: tasks.length,  // This breaks when deleting tasks!
        text: taskText,
        completed: false
      };

      tasks.push(task);
      renderTasks();
      taskInput.value = '';
    });

    // BUG 4: Function doesn't update stats
    function renderTasks() {
      if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
      }

      taskList.innerHTML = tasks
        .map(task => `
          <div class="task ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
              <button class="complete-btn" onclick="toggleComplete(${task.id})">
                ${task.completed ? 'Undo' : 'Complete'}
              </button>
              <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
          </div>
        `)
        .join('');

      // BUG 4: Missing updateStats() call
      // updateStats();  // This line is missing!
    }

    // BUG 5: This function is never called
    function updateStats() {
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      const pending = total - completed;

      document.getElementById('totalTasks').textContent = total;
      document.getElementById('completedTasks').textContent = completed;
      document.getElementById('pendingTasks').textContent = pending;
    }

    function toggleComplete(id) {
      // BUG 6: This finds by index, not by ID (breaks after deletions)
      const task = tasks[id];
      if (task) {
        task.completed = !task.completed;
        renderTasks();
      }
    }

    function deleteTask(id) {
      // BUG 7: Same issue - uses index instead of ID
      tasks.splice(id, 1);
      renderTasks();
    }

    // BUG 8: No localStorage persistence
    // Tasks are lost on page refresh!

    // BUG 9: No Enter key support
    // Users expect to press Enter to add task

    // BUG 10: No input validation for duplicates
    // Can add the same task multiple times
  </script>
</body>
</html>
```

## 🐛 Your Mission: Find and Fix All Bugs!

### Part 1: Identify Bugs Using DevTools

**Open the app in browser with DevTools Console open**

**Try to use the app:**
1. Try to add a task
2. Click "Complete" button
3. Click "Delete" button
4. Refresh page
5. Try pressing Enter to add task

**Document each bug you find:**
- [ ] Bug 1: Where is it? What's wrong?
- [ ] Bug 2: Where is it? What's wrong?
- [ ] Bug 3: Where is it? What's wrong?
- [ ] Bug 4: Where is it? What's wrong?
- [ ] Bug 5: Where is it? What's wrong?

### Part 2: Use Breakpoints to Debug

**Set breakpoints to investigate:**

1. **Set breakpoint in `addBtn` click handler**
   - Does `taskInput` exist? (hover over variable)
   - What is `taskText` value?
   - Does the `if` condition work correctly?

2. **Set breakpoint in `toggleComplete()`**
   - What is the `id` parameter?
   - Does `tasks[id]` find the correct task?
   - What happens after deleting a task?

3. **Set breakpoint in `deleteTask()`**
   - Same investigation as above

### Part 3: Fix the Bugs

**Fix each bug one at a time, testing after each fix:**

**Bug 1 Fix:**
```javascript
const taskInput = document.getElementById('taskInput');  // Fixed typo
```

**Bug 2 Fix:**
```javascript
if (taskText === '') {  // Changed = to ===
```

**Bug 3 Fix:**
```javascript
// Use timestamp for unique IDs
const task = {
  id: Date.now(),  // Always unique!
  text: taskText,
  completed: false
};
```

**Bug 4 Fix:**
```javascript
function renderTasks() {
  // ... existing code ...

  updateStats();  // Add this line!
}
```

**Bug 5 Fix:**
```javascript
// This function now gets called from renderTasks()
```

**Bug 6 Fix:**
```javascript
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);  // Find by ID, not index
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}
```

**Bug 7 Fix:**
```javascript
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);  // Filter out by ID
  renderTasks();
}
```

**Bug 8 Fix (Add localStorage):**
```javascript
// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
});

// Update renderTasks to save
function renderTasks() {
  // ... existing code ...

  // Save to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateStats();
}
```

**Bug 9 Fix (Add Enter key support):**
```javascript
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
```

**Bug 10 Fix (Prevent duplicates):**
```javascript
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Check for duplicates
  if (tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
    alert('This task already exists!');
    return;
  }

  // ... rest of code
});
```

### Part 4: Add Enhancements

**Now that bugs are fixed, add these features:**

1. **Edit Task Feature:**
```javascript
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim()) {
      task.text = newText.trim();
      renderTasks();
    }
  }
}

// Add edit button to task HTML
<button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
```

2. **Priority Levels:**
```javascript
// Add priority to task object
const task = {
  id: Date.now(),
  text: taskText,
  completed: false,
  priority: 'medium'  // low, medium, high
};

// Add different colors based on priority
```

3. **Due Dates:**
```javascript
// Add date picker
<input type="date" id="dueDateInput">

// Add to task object
dueDate: document.getElementById('dueDateInput').value
```

4. **Filter Tasks:**
```javascript
// Add filter buttons
<button onclick="filterTasks('all')">All</button>
<button onclick="filterTasks('active')">Active</button>
<button onclick="filterTasks('completed')">Completed</button>

function filterTasks(filter) {
  let filtered = tasks;

  if (filter === 'active') {
    filtered = tasks.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  }

  // Render filtered tasks
}
```

## ✅ Success Criteria

- [ ] Found all 10 bugs using DevTools
- [ ] Fixed each bug one at a time
- [ ] Tested after each fix
- [ ] App works perfectly:
  - Can add tasks
  - Can complete tasks
  - Can delete tasks
  - Stats update correctly
  - Tasks persist on refresh
  - Enter key works
  - No duplicate tasks
- [ ] Added at least 2 enhancements

## 🎓 What You Learned

- Systematic debugging approach
- Using Console to find errors
- Setting breakpoints effectively
- Understanding variable scope issues
- Finding logic errors
- Fixing ID vs index bugs
- Adding localStorage
- Event handling
- Input validation
- Code enhancement

## 💡 Debugging Checklist

**When debugging any app:**

1. **Check Console first** - Look for red errors
2. **Read error messages** - They tell you exactly what's wrong
3. **Set breakpoints** - Pause and inspect variables
4. **Check variable values** - Are they what you expect?
5. **Test one thing at a time** - Fix one bug, test, repeat
6. **Use console.log strategically** - Add breadcrumbs
7. **Check element exists** - Before using querySelector results
8. **Verify logic** - = vs === is common bug!
9. **Test edge cases** - Empty inputs, duplicates, etc.
10. **Test in different browsers** - Some bugs are browser-specific

## 📚 Additional Challenges

1. **Add undo functionality** - Restore deleted tasks
2. **Add task categories** - Work, Personal, Shopping
3. **Add search feature** - Filter tasks by keyword
4. **Add dark mode** - Toggle theme
5. **Add export feature** - Download tasks as JSON
6. **Add keyboard shortcuts** - Ctrl+E to edit, Delete to remove
7. **Add animations** - Smooth task additions/removals
8. **Add accessibility** - ARIA labels, keyboard navigation

---

**Congratulations! You've debugged a complex application using professional debugging techniques!** 🎉
