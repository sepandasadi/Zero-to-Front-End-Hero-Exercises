// TODO: Import useSelector and useDispatch
// TODO: Import clearCompleted action

function TodoStats() {
  // TODO: Get todos from Redux state
  // TODO: Get dispatch function

  // TODO: Calculate statistics
  const total = 0
  const completed = 0
  const active = 0

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <span>Total: {total}</span>
        <span>Active: {active}</span>
        <span>Completed: {completed}</span>
      </div>
      {completed > 0 && (
        <button
          onClick={() => {/* TODO: Dispatch clearCompleted */}}
          className="clear-btn"
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default TodoStats

