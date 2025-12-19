import { createSlice } from '@reduxjs/toolkit'

// TODO: Implement localStorage load/save functions
const loadCart = () => {
  // Load cart from localStorage
  return []
}

const saveCart = (items) => {
  // Save cart to localStorage
}

const calculateTotal = (items) => {
  // Calculate cart total
  return 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      // TODO: Implement add to cart logic
      // Check if item exists, increment quantity or add new item
      // Update total
      // Save to localStorage
    },

    removeItem: (state, action) => {
      // TODO: Implement remove from cart
    },

    updateQuantity: (state, action) => {
      // TODO: Implement quantity update
    },

    clearCart: (state) => {
      // TODO: Implement clear cart
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

