# Challenge Hints - Code Quality Refactor

## 💡 Progressive Hints

Use these hints if you get stuck. Try to solve on your own first!

---

## 🔍 Hint 1: Finding All the Issues

<details>
<summary>Click to reveal</summary>

### **Issues Checklist:**

**File Organization:**
- [ ] All components in `/components` (should be feature-based)
- [ ] No clear boundaries

**Component Issues:**
- [ ] TaskManager.jsx: 220+ lines
- [ ] Mixes logic with UI
- [ ] No separation of concerns

**DRY Violations (Code Duplication):**
- [ ] localStorage logic: App.jsx (line 12-16) + TaskManager.jsx (line 26-30)
- [ ] Validation: TaskManager.jsx (line 50-54) + (line 63-67) + LoginPage.jsx (line 16-33)
- [ ] Form handling: LoginPage.jsx + TaskManager.jsx form section
- [ ] Filtering: TaskManager.jsx (lines 84-100)
- [ ] Stats calculation: TaskManager.jsx (lines 108-114)

**SRP Violations:**
- [ ] `handleLogin` (App.jsx): validates + saves + stores
- [ ] `handleAdd` (TaskManager.jsx): validates + creates + saves + alerts
- [ ] `validate` (LoginPage.jsx): does all validation inline

**Naming Issues:**
- [ ] `x` should be `currentUser` (App.jsx)
- [ ] `data` should be `tasks` (TaskManager.jsx)
- [ ] `errs` should be `validationErrors` (LoginPage.jsx)

**Bugs:**
- [ ] Memory leak: TaskManager.jsx line 35-39 (missing cleanup)
- [ ] XSS: TaskManager.jsx line 177 (dangerouslySetInnerHTML)
- [ ] No validation: Missing maxLength, sanitization

**Missing Hooks:**
- [ ] useLocalStorage pattern repeated
- [ ] Form handling repeated
- [ ] Task operations should be in hook

</details>

---

## 🔍 Hint 2: Feature-First Structure

<details>
<summary>Click to reveal</summary>

### **Target Structure:**

```
src/
├── features/
│   ├── tasks/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskStats.jsx
│   │   │   └── TaskFilters.jsx
│   │   ├── containers/
│   │   │   ├── TaskListContainer.jsx
│   │   │   └── TaskFormContainer.jsx
│   │   ├── hooks/
│   │   │   ├── useTasks.js
│   │   │   └── useTaskFilters.js
│   │   ├── utils/
│   │   │   ├── taskValidation.js
│   │   │   ├── taskFilters.js
│   │   │   └── taskSorting.js
│   │   └── styles/
│   │       └── tasks.css
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.jsx
│   │   ├── containers/
│   │   │   └── LoginContainer.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── utils/
│   │   │   └── authValidation.js
│   │   └── pages/
│   │       └── LoginPage.jsx
│   │
│   └── shared/
│       ├── components/
│       │   ├── Button.jsx
│       │   ├── Input.jsx
│       │   └── ErrorMessage.jsx
│       └── hooks/
│           ├── useLocalStorage.js
│           ├── useFormInput.js
│           └── useDebounce.js
│
├── App.jsx
└── index.css
```

### **Migration Steps:**
1. Create all folders first
2. Move one file at a time
3. Update imports
4. Test after each move

</details>

---

## 🔍 Hint 3: Extracting useTasks Hook

<details>
<summary>Click to reveal</summary>

### **What to Extract:**

```javascript
// features/tasks/hooks/useTasks.js
import { useState } from 'react'
import { useLocalStorage } from '../../shared/hooks/useLocalStorage'
import { validateTask } from '../utils/taskValidation'

export function useTasks(userId) {
  const [tasks, setTasks] = useLocalStorage(`tasks_${userId}`, [])

  const addTask = (taskData) => {
    // Validation
    const errors = validateTask(taskData)
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    // Create task
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date()
    }

    setTasks([...tasks, newTask])
    return newTask
  }

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const toggleTask = (id) => {
    updateTask(id, {
      completed: !tasks.find(t => t.id === id)?.completed
    })
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  }
}
```

</details>

---

## 🔍 Hint 4: Extracting useLocalStorage Hook

<details>
<summary>Click to reveal</summary>

```javascript
// features/shared/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch (error) {
      console.error(`Error loading ${key}:`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key}:`, error)
    }
  }, [key, value])

  return [value, setValue]
}
```

</details>

---

## 🔍 Hint 5: Splitting TaskManager Component

<details>
<summary>Click to reveal</summary>

### **Break into These Components:**

**1. TaskListContainer** (Logic)
```javascript
function TaskListContainer({ userId }) {
  const { tasks, deleteTask, toggleTask } = useTasks(userId)
  const { filteredTasks, filter, setFilter, search, setSearch } = useTaskFilters(tasks)

  return (
    <>
      <TaskStats tasks={tasks} />
      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </>
  )
}
```

**2. TaskList** (Presentational)
```javascript
function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks found</p>
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
```

**3. TaskItem** (Presentational)
**4. TaskForm** (Presentational)
**5. TaskStats** (Presentational)
**6. TaskFilters** (Presentational)

</details>

---

## 🔍 Hint 6: Extracting Utilities

<details>
<summary>Click to reveal</summary>

### **Task Validation:**

```javascript
// features/tasks/utils/taskValidation.js

const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 500

export function validateTaskTitle(title) {
  if (!title || !title.trim()) {
    return 'Title is required'
  }
  if (title.trim().length < MIN_TITLE_LENGTH) {
    return `Title must be at least ${MIN_TITLE_LENGTH} characters`
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return `Title must be less than ${MAX_TITLE_LENGTH} characters`
  }
  return null
}

export function validateTaskDescription(description) {
  if (description && description.length > MAX_DESCRIPTION_LENGTH) {
    return `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`
  }
  return null
}

export function validateTask(taskData) {
  const errors = []

  const titleError = validateTaskTitle(taskData.title)
  if (titleError) errors.push(titleError)

  const descError = validateTaskDescription(taskData.description)
  if (descError) errors.push(descError)

  return errors
}
```

### **Task Filters:**

```javascript
// features/tasks/utils/taskFilters.js

export function filterByStatus(tasks, status) {
  if (status === 'active') {
    return tasks.filter(task => !task.completed)
  }
  if (status === 'completed') {
    return tasks.filter(task => task.completed)
  }
  return tasks
}

export function filterBySearch(tasks, searchTerm) {
  if (!searchTerm) return tasks

  const term = searchTerm.toLowerCase()
  return tasks.filter(task =>
    task.title.toLowerCase().includes(term) ||
    task.description?.toLowerCase().includes(term)
  )
}

export function applyFilters(tasks, { status, search }) {
  let filtered = tasks
  filtered = filterByStatus(filtered, status)
  filtered = filterBySearch(filtered, search)
  return filtered
}
```

</details>

---

## 🔍 Hint 7: Fixing the Memory Leak

<details>
<summary>Click to reveal</summary>

### **Problem:**
```javascript
// BAD - Memory leak!
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Checking tasks...', data.length)
  }, 5000)
  // Missing cleanup!
}, [data])
```

### **Solution:**
```javascript
// GOOD - Proper cleanup
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Checking tasks...', tasks.length)
  }, 5000)

  return () => {
    clearInterval(interval)
  }
}, [tasks])
```

Or better yet, **remove it entirely** if not needed!

</details>

---

## 🔍 Hint 8: Fixing XSS Vulnerability

<details>
<summary>Click to reveal</summary>

### **Problem:**
```javascript
// DANGEROUS - XSS vulnerability!
<div dangerouslySetInnerHTML={{ __html: task.description }} />
```

### **Solutions:**

**Option 1: Remove HTML rendering (simplest)**
```javascript
<div className="task-description">
  {task.description}
</div>
```

**Option 2: Sanitize if HTML needed**
```javascript
import DOMPurify from 'dompurify'

<div
  className="task-description"
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(task.description)
  }}
/>
```

**Recommended:** Use Option 1 unless you need HTML support.

</details>

---

## 🔍 Hint 9: useFormInput Hook

<details>
<summary>Click to reveal</summary>

```javascript
// features/shared/hooks/useFormInput.js
import { useState } from 'react'

export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  const clear = () => {
    setValue('')
  }

  return {
    value,
    onChange: handleChange,
    reset,
    clear
  }
}

// Usage:
const title = useFormInput('')
const description = useFormInput('')

<input {...title} placeholder="Title" />
<textarea {...description} placeholder="Description" />
```

</details>

---

## 🔍 Hint 10: useAuth Hook

<details>
<summary>Click to reveal</summary>

```javascript
// features/auth/hooks/useAuth.js
import { useLocalStorage } from '../../shared/hooks/useLocalStorage'
import { validateCredentials } from '../utils/authValidation'

export function useAuth() {
  const [currentUser, setCurrentUser] = useLocalStorage('user', null)

  const login = (credentials) => {
    const errors = validateCredentials(credentials)
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    const user = {
      id: Date.now(),
      name: credentials.email.split('@')[0],
      email: credentials.email
    }

    setCurrentUser(user)
    return user
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const isAuthenticated = currentUser !== null

  return {
    currentUser,
    login,
    logout,
    isAuthenticated
  }
}
```

</details>

---

## 🎯 Still Stuck?

Review these exercises for examples:
- **Exercise 01** - File organization patterns
- **Exercise 02** - Component architecture
- **Exercise 03** - Clean code refactoring examples
- **Exercise 04** - Naming convention examples
- **Exercise 05** - Custom hook extraction examples

**Good luck! You've got this!** 🚀

