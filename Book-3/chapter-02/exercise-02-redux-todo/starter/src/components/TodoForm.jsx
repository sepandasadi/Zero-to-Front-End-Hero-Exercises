import { useState } from 'react'
// TODO: Import useDispatch hook
// TODO: Import addTodo action

function TodoForm() {
  const [text, setText] = useState('')
  // TODO: Get dispatch function

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      // TODO: Dispatch addTodo action with text
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

