import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../store/todoSlice'

function TodoFilters() {
  const filter = useSelector(state => state.todos.filter)
  const dispatch = useDispatch()

  const filters = ['all', 'active', 'completed']

  return (
    <div className="todo-filters">
      {filters.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => dispatch(setFilter(filterOption))}
          className={`filter-btn ${filter === filterOption ? 'active' : ''}`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters

