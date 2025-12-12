// TODO: Import useAtom
// TODO: Import filterAtom

function TodoFilters() {
  // TODO: Get filter and setFilter from atom

  const filters = ['all', 'active', 'completed']

  return (
    <div className="todo-filters">
      {filters.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => {/* TODO: Set filter */}}
          className={`filter-btn`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters

