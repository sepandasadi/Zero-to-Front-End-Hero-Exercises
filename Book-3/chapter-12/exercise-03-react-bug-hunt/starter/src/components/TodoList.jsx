import { useState } from 'react'

// BUG #6: Object Identity Issue
// SYMPTOM: Todos don't re-render when "completed" is toggled

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Debug bugs', completed: false },
    { id: 3, text: 'Build projects', completed: false }
  ])

  const toggleTodo = (id) => {
    // ❌ BUG: Mutating the object directly, same reference
    const todo = todos.find(t => t.id === id)
    todo.completed = !todo.completed  // Mutation!
    setTodos(todos)  // Same array reference, React doesn't detect change
  }

  return (
    <div className="component-box">
      <h3>Todo List (Bug: Object Identity)</h3>
      {todos.map(todo => (
        <div key={todo.id} style={{ marginBottom: '0.5rem' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{
            marginLeft: '0.5rem',
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </span>
        </div>
      ))}
      <p className="info-text">
        Bug: Click checkboxes. They don't update visually!
      </p>
    </div>
  )
}

export default TodoList


