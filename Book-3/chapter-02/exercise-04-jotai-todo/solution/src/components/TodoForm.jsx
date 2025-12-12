import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { todosAtom } from '../atoms/todoAtoms'

function TodoForm() {
  const [text, setText] = useState('')
  const setTodos = useSetAtom(todosAtom)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: text.trim(), completed: false }
      ])
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

