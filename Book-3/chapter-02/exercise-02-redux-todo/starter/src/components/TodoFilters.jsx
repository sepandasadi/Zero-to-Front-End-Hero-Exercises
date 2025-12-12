// TODO: Import useSelector and useDispatch
// TODO: Import setFilter action

function TodoFilters() {
  // TODO: Get current filter from Redux state
  // TODO: Get dispatch function

  const filters = ['all', 'active', 'completed']

  return (
    <div className="todo-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => {/* TODO: Dispatch setFilter */}}
          className={`filter-btn ${/* TODO: add 'active' class if current filter */ ''}`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters

