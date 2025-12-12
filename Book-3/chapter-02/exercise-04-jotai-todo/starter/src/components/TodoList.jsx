// TODO: Import useAtom
// TODO: Import filteredTodosAtom, todosAtom

function TodoList() {
  // TODO: Get filtered todos from atom
  // TODO: Get setTodos to toggle/delete

  if (/* TODO: check if empty */ false) {
    return <div className="empty-state">No todos to display</div>
  }

  return (
    <ul className="todo-list">
      {/* TODO: Map through filtered todos */}
      <li className="todo-item">
        <input type="checkbox" className="todo-checkbox" />
        <span className="todo-text">Sample Todo</span>
        <button className="delete-btn">✕</button>
      </li>
    </ul>
  )
}

export default TodoList

