import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo } from '../store/todoSlice'

function TodoList() {
  const { todos, filter } = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

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
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="todo-checkbox"
          />
          <span className="todo-text">{todo.text}</span>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
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

