import { useState } from 'react'
import TodoList from '../components/TodoList'

/**
 * TodoListContainer (Smart Component)
 *
 * Responsibilities:
 * - Manages state (todos, newTodo)
 * - Handles business logic (add, toggle, delete)
 * - Passes data + callbacks to presentational component
 */
function TodoListContainer() {
  // State management
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Master clean code', completed: true },
  ])
  const [newTodo, setNewTodo] = useState('')

  // Business logic - Add todo
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

  // Business logic - Toggle completion
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // Business logic - Delete todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Render presentational component with all props
  return (
    <TodoList
      todos={todos}
      newTodo={newTodo}
      onNewTodoChange={setNewTodo}
      onAdd={handleAdd}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  )
}

export default TodoListContainer

