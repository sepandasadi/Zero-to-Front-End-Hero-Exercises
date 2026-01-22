# Task Manager - Hints & Tips

## UUID Generation
```javascript
function generateId() {
  return 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}
```

## localStorage Pattern
```javascript
const STORAGE_KEY = 'taskManagerTasks';

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks:', e);
  }
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load tasks:', e);
    return [];
  }
}
```

## Multiple Filters Combined
```javascript
function getFilteredTasks() {
  return tasks
    .filter(t => currentFilters.category === 'all' || t.category === currentFilters.category)
    .filter(t => {
      if (currentFilters.status === 'all') return true;
      if (currentFilters.status === 'active') return !t.completed;
      if (currentFilters.status === 'completed') return t.completed;
    })
    .filter(t => {
      const searchLower = currentFilters.searchTerm.toLowerCase();
      return t.title.toLowerCase().includes(searchLower) ||
             t.description.toLowerCase().includes(searchLower);
    });
}
```

## Event Delegation
```javascript
document.getElementById('task-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const taskId = e.target.closest('.task-card').dataset.id;
    deleteTask(taskId);
  } else if (e.target.classList.contains('edit-btn')) {
    const taskId = e.target.closest('.task-card').dataset.id;
    editTask(taskId);
  } else if (e.target.type === 'checkbox') {
    const taskId = e.target.closest('.task-card').dataset.id;
    toggleComplete(taskId);
  }
});
```

## Debounced Search
```javascript
let searchTimeout;
document.getElementById('search-input').addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentFilters.searchTerm = e.target.value;
    renderTasks();
  }, 300);
});
```

## Render Tasks
```javascript
function renderTasks() {
  const filtered = getFilteredTasks();
  const sorted = sortTasks(filtered);
  const container = document.getElementById('task-list');
  
  if (sorted.length === 0) {
    container.innerHTML = '<div class="empty-state">No tasks found</div>';
    return;
  }
  
  container.innerHTML = sorted.map(task => createTaskHTML(task)).join('');
}

function createTaskHTML(task) {
  return `
    <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <div class="task-content">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span class="badge ${task.category}">${task.category}</span>
        <span class="priority priority-${task.priority}">${task.priority}</span>
      </div>
      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `;
}
```

## Edit Mode
```javascript
let editingTaskId = null;

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  // Populate form
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('category').value = task.category;
  document.getElementById('priority').value = task.priority;
  
  // Change button
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = 'Update Task';
  editingTaskId = id;
}

function handleSubmit(e) {
  e.preventDefault();
  
  const taskData = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    category: document.getElementById('category').value,
    priority: document.getElementById('priority').value,
  };
  
  if (editingTaskId) {
    updateTask(editingTaskId, taskData);
    editingTaskId = null;
    document.getElementById('submit-btn').textContent = 'Add Task';
  } else {
    addTask(taskData);
  }
  
  e.target.reset();
}
```
