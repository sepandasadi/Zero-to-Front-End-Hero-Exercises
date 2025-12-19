import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// Load cart from localStorage
const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart')
    if (serializedCart === null) {
      return []
    }
    return JSON.parse(serializedCart)
  } catch (err) {
    console.error('Error loading cart from localStorage:', err)
    return []
  }
}

// Save cart to localStorage
const saveCart = (items) => {
  try {
    const serializedCart = JSON.stringify(items)
    localStorage.setItem('cart', serializedCart)
  } catch (err) {
    console.error('Error saving cart to localStorage:', err)
  }
}

// Calculate cart total
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Calculate total item count
const calculateItemCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    total: calculateTotal(loadCart()),
    itemCount: calculateItemCount(loadCart()),
  },
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, image, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
        toast.success(`Added ${quantity} more ${title} to cart`)
      } else {
        state.items.push({ id, title, price, image, quantity })
        toast.success(`${title} added to cart`)
      }

      state.total = calculateTotal(state.items)
      state.itemCount = calculateItemCount(state.items)
      saveCart(state.items)
    },

    removeItem: (state, action) => {
      const itemId = action.payload
      const item = state.items.find(item => item.id === itemId)

      if (item) {
        toast.info(`${item.title} removed from cart`)
      }

      state.items = state.items.filter(item => item.id !== itemId)
      state.total = calculateTotal(state.items)
      state.itemCount = calculateItemCount(state.items)
      saveCart(state.items)
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
          toast.info(`${item.title} removed from cart`)
        } else {
          item.quantity = quantity
        }

        state.total = calculateTotal(state.items)
        state.itemCount = calculateItemCount(state.items)
        saveCart(state.items)
      }
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      saveCart([])
      toast.success('Cart cleared')
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => state.cart.total
export const selectCartItemCount = (state) => state.cart.itemCount

export default cartSlice.reducer

