import './TodoList.css'

/**
 * TodoList (Presentational/Dumb Component)
 *
 * Responsibilities:
 * - Receives data via props
 * - Renders UI
 * - Calls callbacks for user actions
 * - NO state, NO effects, NO business logic
 */
function TodoList({
  todos,
  newTodo,
  onNewTodoChange,
  onAdd,
  onToggle,
  onDelete,
}) {
  // Simple derived data is OK
  const activeTodos = todos.filter(t => !t.completed).length

  return (
    <div className="todo-list">
      <form onSubmit={onAdd} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => onNewTodoChange(e.target.value)}
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
              onChange={() => onToggle(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={() => onDelete(todo.id)}
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

