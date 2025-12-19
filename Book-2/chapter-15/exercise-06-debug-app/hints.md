# Exercise 6 Hints: Debug the Broken App

## General Debugging Strategy

**Step-by-step approach:**
1. **Try to use the app** - What breaks?
2. **Open Console** - Are there errors?
3. **Read error messages** - They tell you exactly what's wrong
4. **Set breakpoints** - Pause code and inspect
5. **Fix one bug at a time** - Test after each fix
6. **Verify fix works** - Don't assume!

## Finding the Bugs

### Bug 1: Element Not Found

**Symptom:**
- Can't type in input
- Add button doesn't work
- Console shows: "Cannot read property 'value' of null"

**How to find:**
```javascript
const taskInput = document.getElementById('taskInpt');
console.log(taskInput);  // null
```

**Why it happens:**
- Typo in ID: 'taskInpt' instead of 'taskInput'
- JavaScript can't find the element
- Trying to use null element causes error

**How to fix:**
```javascript
// Change this:
const taskInput = document.getElementById('taskInpt');

// To this:
const taskInput = document.getElementById('taskInput');
```

**Lesson:** Always check element IDs match exactly!

### Bug 2: Assignment Instead of Comparison

**Symptom:**
- Can add empty tasks
- Alert doesn't show
- Empty div appears in list

**How to find:**
```javascript
if (taskText = '') {  // This ASSIGNS empty string!
  alert('Please enter a task!');
}
```

**Why it happens:**
- `=` is assignment
- `===` is comparison
- Assignment always succeeds, returns the value
- Empty string is falsy, so if block doesn't run

**Debugging technique:**
```javascript
// Add breakpoint or log
console.log('taskText:', taskText);
console.log('Is empty?:', taskText === '');

if (taskText = '') {  // Breakpoint here
  alert('Please enter a task!');
}
```

**How to fix:**
```javascript
// Change this:
if (taskText = '') {

// To this:
if (taskText === '') {
```

**Lesson:** `=` assigns, `===` compares. Never use `=` in conditionals!

### Bug 3: Non-Unique IDs

**Symptom:**
- Delete wrong task
- Complete wrong task
- Bugs appear after deleting tasks

**How to find:**
1. Add 3 tasks
2. Delete the middle one
3. Try to delete the last one
4. Wrong task gets deleted!

**Why it happens:**
```javascript
const task = {
  id: tasks.length,  // This breaks!
  text: taskText,
  completed: false
};

// Scenario:
// Add task 1: id = 0
// Add task 2: id = 1
// Add task 3: id = 2
// Delete task 2
// Add task 4: id = 2 (DUPLICATE!)
```

**Debug with console:**
```javascript
console.log('Current tasks:', tasks);
console.log('New task ID:', tasks.length);
```

**How to fix:**
```javascript
// Change this:
id: tasks.length

// To this:
id: Date.now()  // Always unique timestamp
```

**Lesson:** Use unique IDs, not array indices!

### Bug 4 & 5: Missing Function Call

**Symptom:**
- Task counts don't update
- Stats always show 0

**How to find:**
```javascript
function renderTasks() {
  // ... renders tasks ...

  // updateStats() should be here but isn't!
}

function updateStats() {
  // This function exists but is never called!
}
```

**Why it happens:**
- Function was written but forgot to call it
- Stats never update

**How to fix:**
```javascript
function renderTasks() {
  // ... existing code ...

  updateStats();  // Add this!
}
```

**Lesson:** Writing a function isn't enough—you must call it!

### Bug 6 & 7: Array Index vs ID

**Symptom:**
- After deleting a task, wrong tasks get toggled/deleted
- Tasks get corrupted

**How to find:**
```javascript
function toggleComplete(id) {
  const task = tasks[id];  // Using ID as array index!
  // ...
}

// Example:
// tasks = [
//   { id: 1670000001, text: "Task 1" },
//   { id: 1670000002, text: "Task 2" }
// ]
//
// Calling toggleComplete(1670000002)
// Looks at tasks[1670000002] → undefined!
```

**Debug technique:**
```javascript
function toggleComplete(id) {
  console.log('ID:', id);
  console.log('Task at index:', tasks[id]);
  console.log('All tasks:', tasks);

  // Add breakpoint here
  const task = tasks[id];
}
```

**How to fix:**
```javascript
// Change this:
function toggleComplete(id) {
  const task = tasks[id];  // Wrong!
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// To this:
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);  // Correct!
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}
```

**Same fix for deleteTask:**
```javascript
// Change this:
function deleteTask(id) {
  tasks.splice(id, 1);  // Wrong!
  renderTasks();
}

// To this:
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);  // Correct!
  renderTasks();
}
```

**Lesson:** Never confuse array index with ID!

## Using DevTools Effectively

### Console Debugging

**Add strategic logs:**
```javascript
// At function start
console.log('=== addTask called ===');

// Before operations
console.log('taskText:', taskText);

// After operations
console.log('tasks array:', tasks);

// In conditionals
console.log('Condition result:', taskText === '');
```

### Breakpoint Debugging

**How to set breakpoints:**
1. Open DevTools → Sources tab
2. Find your HTML file
3. Find the `<script>` section
4. Click line number to set breakpoint
5. Perform action (click button)
6. Code pauses at breakpoint

**What to do at breakpoint:**
- Hover over variables to see values
- Check "Scope" panel for all variables
- Use "Step Over" (F10) to go to next line
- Use "Step Into" (F11) to go into function
- Use "Resume" (F8) to continue

**Strategic breakpoint locations:**
```javascript
// Set breakpoint here
addBtn.addEventListener('click', () => {
  // Breakpoint #1
  const taskText = taskInput.value.trim();

  // Breakpoint #2
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Breakpoint #3
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  // Breakpoint #4
  renderTasks();
});
```

### Watch Expressions

**Add watches for:**
- `tasks` - See array state
- `tasks.length` - Number of tasks
- `taskInput.value` - Input value
- `tasks[0]` - First task

**How to add watch:**
1. Go to Sources tab
2. Find "Watch" panel
3. Click "+"
4. Type expression

## Common Debugging Mistakes

### Mistake 1: Not Reading Error Messages

**Bad:**
```
Console shows error → Ignore → Try random fixes
```

**Good:**
```
Console shows: "Cannot read property 'value' of null"
Read carefully: Something is null when we try to access .value
Look at line number
Find what could be null
Check if element exists
```

### Mistake 2: Fixing Multiple Bugs at Once

**Bad:**
```
Change 5 things → Test → Something still broken → No idea what worked
```

**Good:**
```
Change 1 thing → Test → Works? Good! → Change next thing
```

### Mistake 3: Not Using Console.log

**Bad:**
```javascript
if (taskText === '') {
  // Why doesn't this work??
}
```

**Good:**
```javascript
console.log('taskText:', taskText);
console.log('Is empty?:', taskText === '');

if (taskText === '') {
  console.log('Inside if block');
}
```

### Mistake 4: Assuming Instead of Verifying

**Bad:**
```
"I think taskInput exists" → Write code → Fails
```

**Good:**
```javascript
const taskInput = document.getElementById('taskInput');
console.log('taskInput:', taskInput);  // Verify!
if (!taskInput) {
  console.error('taskInput not found!');
}
```

## Testing Your Fixes

### Test Each Fix

**For Bug 1 (Element not found):**
```
1. Refresh page
2. Check console - no errors?
3. Try typing in input
4. Works? ✓ Fixed
```

**For Bug 2 (Assignment vs comparison):**
```
1. Try to add empty task
2. Does alert show?
3. Does empty task get added?
4. Both work correctly? ✓ Fixed
```

**For Bug 3 (Unique IDs):**
```
1. Add 3 tasks
2. Delete middle task
3. Add another task
4. Delete last task
5. Correct task deleted? ✓ Fixed
```

**For Bug 6 & 7 (Index vs ID):**
```
1. Add 3 tasks
2. Delete middle task
3. Try to complete remaining tasks
4. Correct task completes? ✓ Fixed
5. Try to delete tasks
6. Correct task deletes? ✓ Fixed
```

## Additional Bugs to Find

### Bug 8: No localStorage

**How to add:**
```javascript
// Load on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
});

// Save after any change
function renderTasks() {
  // ... existing code ...

  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateStats();
}
```

### Bug 9: No Enter Key Support

**How to add:**
```javascript
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
```

### Bug 10: No Duplicate Prevention

**How to add:**
```javascript
if (tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
  alert('This task already exists!');
  return;
}
```

## Still Stuck?

### Can't find a bug?
1. Read the code comments - they point out bugs!
2. Try using the app systematically
3. Check console for errors
4. Add `console.log` everywhere
5. Set breakpoints and step through

### Fix doesn't work?
1. Did you save the file?
2. Did you refresh the browser?
3. Check console for new errors
4. Verify your syntax is correct
5. Try the fix in isolation

### Not sure if fixed?
1. Test the specific functionality
2. Try edge cases
3. Check console for errors
4. Test in different scenarios

---

**Remember**: Debugging is a skill. Every bug you fix makes you better! 🐛➜🦋

