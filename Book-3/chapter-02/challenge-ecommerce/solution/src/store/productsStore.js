import { create } from 'zustand'
import { products as allProducts } from '../data/products'

/**
 * Products Store - Manages product filtering, searching, and sorting
 * Does NOT use persist since this is derived from product data
 */
export const useProductsStore = create((set, get) => ({
  // State
  products: allProducts, // All products from data file
  filter: 'all', // Current category filter
  searchQuery: '', // Current search query
  sortBy: 'default', // Current sort option

  /**
   * Set category filter
   * @param {string} category - Category to filter by ('all', 'Electronics', etc.)
   */
  setFilter: (category) => set({ filter: category }),

  /**
   * Set search query
   * @param {string} query - Search text
   */
  setSearchQuery: (query) => set({ searchQuery: query }),

  /**
   * Set sort option
   * @param {string} sortOption - How to sort ('default', 'price-low', 'price-high', 'name')
   */
  setSortBy: (sortOption) => set({ sortBy: sortOption }),

  /**
   * Get filtered and sorted products
   * This is a computed/derived value based on current filters
   * Returns: array of products matching current filter/search/sort criteria
   */
  getFilteredProducts: () => {
    const { products, filter, searchQuery, sortBy } = get()
    let result = [...products]

    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(product => product.category === filter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // 'default' - no sorting, keep original order
        break
    }

    return result
  },

  /**
   * Get unique categories from all products
   * Useful for building filter buttons
   */
  getCategories: () => {
    const { products } = get()
    const categories = [...new Set(products.map(p => p.category))]
    return categories.sort()
  },
}))

