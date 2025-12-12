// TODO: Import useSelector and useDispatch
// TODO: Import toggleTodo and deleteTodo actions

function TodoList() {
  // TODO: Get todos and filter from Redux state
  // TODO: Get dispatch function

  // TODO: Filter todos based on current filter
  const filteredTodos = [] // Replace with actual filtered todos

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
            onChange={() => {/* TODO: Dispatch toggleTodo */}}
            className="todo-checkbox"
          />
          <span className="todo-text">{todo.text}</span>
          <button
            onClick={() => {/* TODO: Dispatch deleteTodo */}}
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

