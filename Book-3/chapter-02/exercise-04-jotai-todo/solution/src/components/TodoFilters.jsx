import { useAtom } from 'jotai'
import { filterAtom } from '../atoms/todoAtoms'

function TodoFilters() {
  const [filter, setFilter] = useAtom(filterAtom)

  const filters = ['all', 'active', 'completed']

  return (
    <div className="todo-filters">
      {filters.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => setFilter(filterOption)}
          className={`filter-btn ${filter === filterOption ? 'active' : ''}`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters

