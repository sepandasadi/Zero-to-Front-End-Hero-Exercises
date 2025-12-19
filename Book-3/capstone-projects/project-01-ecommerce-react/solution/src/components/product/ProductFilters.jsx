import { useDispatch, useSelector } from 'react-redux'
import {
  setCategory,
  setSortBy,
  setSearchQuery,
  selectFilters,
  selectCategories,
} from '../../store/productsSlice'
import { capitalizeWords } from '../../utils/formatters'

function ProductFilters() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)
  const categories = useSelector(selectCategories)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold mb-2">Search</label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalizeWords(category)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters

