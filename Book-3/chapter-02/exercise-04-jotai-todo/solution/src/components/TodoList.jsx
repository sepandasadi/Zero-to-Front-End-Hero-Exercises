import { useAtom, useAtomValue } from 'jotai'
import { filteredTodosAtom, todosAtom } from '../atoms/todoAtoms'

function TodoList() {
  const filteredTodos = useAtomValue(filteredTodosAtom)
  const [todos, setTodos] = useAtom(todosAtom)

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id))
  }

  if (filteredTodos.length === 0) {
    return <div className="empty-state">No todos to display</div>
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />
          <span className="todo-text">{todo.text}</span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="delete-btn"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList

