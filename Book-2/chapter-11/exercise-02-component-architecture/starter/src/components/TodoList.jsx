import { useState } from 'react'
import './TodoList.css'

// TODO: Refactor this component!
// Problem: Mixes business logic (state, handlers) with UI
// Solution: Split into TodoListContainer (logic) + TodoList (UI)

function TodoList() {
  // State management (should go to Container)
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Master clean code', completed: true },
  ])
  const [newTodo, setNewTodo] = useState('')

  // Business logic (should go to Container)
  const handleAdd = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ])
    setNewTodo('')
  }

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const activeTodos = todos.filter(t => !t.completed).length

  // UI rendering (should stay in Presentational)
  return (
    <div className="todo-list">
      <form onSubmit={handleAdd} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn">
          Add
        </button>
      </form>

      <div className="todo-stats">
        {activeTodos} active • {todos.length} total
      </div>

      <ul className="todo-items">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="todo-delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList

