import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'

function TodoForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text))
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

