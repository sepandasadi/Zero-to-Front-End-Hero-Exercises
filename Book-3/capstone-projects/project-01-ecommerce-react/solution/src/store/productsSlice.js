import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById, fetchCategories } from '../utils/api'

// Async thunks
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const data = await fetchProducts()
    return data
  }
)

export const loadProductById = createAsyncThunk(
  'products/loadProductById',
  async (id) => {
    const data = await fetchProductById(id)
    return data
  }
)

export const loadCategories = createAsyncThunk(
  'products/loadCategories',
  async () => {
    const data = await fetchCategories()
    return data
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    categories: [],
    loading: false,
    error: null,
    filters: {
      category: 'all',
      priceRange: [0, 1000],
      searchQuery: '',
      sortBy: 'default', // default, price-asc, price-desc, rating
    },
  },
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 1000],
        searchQuery: '',
        sortBy: 'default',
      }
    },
  },
  extraReducers: (builder) => {
    // Load all products
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // Load single product
    builder
      .addCase(loadProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // Load categories
    builder
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload]
      })
  },
})

export const {
  setCategory,
  setPriceRange,
  setSearchQuery,
  setSortBy,
  clearFilters,
} = productsSlice.actions

// Selectors
export const selectAllProducts = (state) => state.products.items
export const selectCurrentProduct = (state) => state.products.currentProduct
export const selectCategories = (state) => state.products.categories
export const selectFilters = (state) => state.products.filters
export const selectLoading = (state) => state.products.loading
export const selectError = (state) => state.products.error

// Filtered products selector
export const selectFilteredProducts = (state) => {
  let filtered = state.products.items

  // Apply category filter
  if (state.products.filters.category !== 'all') {
    filtered = filtered.filter(
      product => product.category === state.products.filters.category
    )
  }

  // Apply price filter
  filtered = filtered.filter(
    product =>
      product.price >= state.products.filters.priceRange[0] &&
      product.price <= state.products.filters.priceRange[1]
  )

  // Apply search filter
  if (state.products.filters.searchQuery) {
    const query = state.products.filters.searchQuery.toLowerCase()
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  const sortBy = state.products.filters.sortBy
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating.rate - a.rating.rate)
  }

  return filtered
}

export default productsSlice.reducer

