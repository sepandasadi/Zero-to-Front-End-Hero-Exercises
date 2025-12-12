import { useState, useEffect } from 'react'
import './TaskManager.css'

// ISSUE: MASSIVE COMPONENT (200+ lines) - violates SRP
// ISSUE: Mixes logic and presentation
// ISSUE: Duplicated code everywhere
// ISSUE: Poor naming
// ISSUE: Memory leaks
// ISSUE: Should extract custom hooks

function TaskManager({ user }) {
  // ISSUE: Bad naming - what is 'data'?
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Form state - ISSUE: Should use custom hook
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  // ISSUE: Duplicated localStorage logic (also in App.jsx)
  useEffect(() => {
    const saved = localStorage.getItem(`tasks_${user.id}`)
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [user.id])

  // ISSUE: Missing cleanup - Memory leak!
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Checking tasks...', data.length)
    }, 5000)
    // MISSING: return () => clearInterval(interval)
  }, [data])

  // ISSUE: Duplicated localStorage saving
  useEffect(() => {
    localStorage.setItem(`tasks_${user.id}`, JSON.stringify(data))
  }, [data, user.id])

  // ISSUE: Function does too many things (SRP violation)
  const handleAdd = () => {
    // Validation
    if (!title || title.length < 3) {
      alert('Title must be at least 3 characters')
      return
    }

    // ISSUE: XSS vulnerability - description not sanitized
    const task = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      completed: false,
      createdAt: new Date()
    }

    // Add to array
    setData([...data, task])

    // Clear form
    setTitle('')
    setDescription('')
    setPriority('medium')

    // Show message
    alert('Task added!')
  }

  // ISSUE: Duplicated validation logic
  const handleUpdate = (id, updates) => {
    if (updates.title && updates.title.length < 3) {
      alert('Title must be at least 3 characters')
      return
    }

    setData(data.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const handleDelete = (id) => {
    setData(data.filter(t => t.id !== id))
  }

  const handleToggle = (id) => {
    setData(data.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // ISSUE: Duplicated filtering logic (repeated 3 times below)
  const getFilteredTasks = () => {
    let result = data

    // Filter by status
    if (filter === 'active') {
      result = result.filter(t => !t.completed)
    } else if (filter === 'completed') {
      result = result.filter(t => t.completed)
    }

    // Filter by search
    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    return result
  }

  // ISSUE: Duplicated sorting logic
  const getSortedTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1
      if (a.priority !== 'high' && b.priority === 'high') return 1
      if (a.priority === 'medium' && b.priority === 'low') return -1
      if (a.priority === 'low' && b.priority === 'medium') return 1
      return 0
    })
  }

  // ISSUE: Duplicated calculation logic
  const getStats = () => {
    const total = data.length
    const completed = data.filter(t => t.completed).length
    const active = data.filter(t => !t.completed).length
    const high = data.filter(t => t.priority === 'high').length
    return { total, completed, active, high }
  }

  const filtered = getFilteredTasks()
  const sorted = getSortedTasks(filtered)
  const stats = getStats()

  // ISSUE: Massive JSX mixing UI and logic
  return (
    <div className="task-manager">
      {/* Stats Section */}
      <div className="stats">
        <div className="stat">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.high}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>

      {/* Add Task Form - ISSUE: Should be separate component */}
      <div className="add-task-form">
        <h2>Add Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="3"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* Filters - ISSUE: Should be separate component */}
      <div className="filters">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Task List - ISSUE: Should be separate component */}
      <div className="task-list">
        {sorted.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          sorted.map(task => (
            // ISSUE: Inline component - should be extracted
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-header">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                />
                <h3>{task.title}</h3>
                <span className={`priority ${task.priority}`}>
                  {task.priority}
                </span>
              </div>
              {/* ISSUE: XSS vulnerability - rendering raw HTML */}
              <div
                className="task-description"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
              <div className="task-actions">
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskManager

