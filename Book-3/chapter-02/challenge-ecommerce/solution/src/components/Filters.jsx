import { useProductsStore } from '../store/productsStore'
import './Filters.css'

/**
 * Filters Component
 * Allows users to search, filter by category, and sort products
 */
function Filters() {
  // Get filter state and actions from products store
  const {
    filter,
    searchQuery,
    sortBy,
    setFilter,
    setSearchQuery,
    setSortBy,
    getCategories
  } = useProductsStore()

  // Get unique categories for filter buttons
  const categories = getCategories()

  return (
    <div className="filters">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={() => setSearchQuery('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="category-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="sort-controls">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Default</option>
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default Filters

