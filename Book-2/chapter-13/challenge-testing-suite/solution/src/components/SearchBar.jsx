import { useTodoStore } from '../store/todoStore';
import './SearchBar.css';

/**
 * SearchBar Component
 * Search input for filtering todos by text
 */
function SearchBar() {
  const { searchQuery, setSearchQuery } = useTodoStore();

  return (
    <div className="search-bar" data-testid="search-bar">
      <input
        type="search"
        className="search-input"
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search todos"
        data-testid="search-input"
      />
      {searchQuery && (
        <button
          className="search-clear"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          data-testid="clear-search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;

