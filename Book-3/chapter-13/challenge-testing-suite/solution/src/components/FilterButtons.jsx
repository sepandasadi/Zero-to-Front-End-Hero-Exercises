import { useTodoStore } from '../store/todoStore';
import './FilterButtons.css';

/**
 * FilterButtons Component
 * Buttons to filter todos by status (all/active/completed)
 */
function FilterButtons() {
  const { filter, setFilter } = useTodoStore();

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons" role="group" aria-label="Filter todos" data-testid="filter-buttons">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-button ${filter === value ? 'filter-button--active' : ''}`.trim()}
          onClick={() => setFilter(value)}
          aria-pressed={filter === value}
          data-testid={`filter-${value}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;

