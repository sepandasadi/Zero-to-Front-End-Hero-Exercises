import { useState } from 'react'
// TODO: Import useAtom or useSetAtom
// TODO: Import todosAtom

function TodoForm() {
  const [text, setText] = useState('')
  // TODO: Get setTodos from todosAtom

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      // TODO: Add new todo to atoms
      // New todo: { id: Date.now(), text, completed: false }
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm

