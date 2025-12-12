import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Cart Store - Manages shopping cart state
 * Uses persist middleware to save cart to localStorage
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      // State: array of items in cart
      items: [],

      /**
       * Add item to cart
       * If item already exists, increment quantity
       * Otherwise, add new item with quantity 1
       */
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id)

        if (existingItem) {
          // Item exists - increment quantity
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        }

        // New item - add with quantity 1
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        }
      }),

      /**
       * Remove item completely from cart
       */
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      /**
       * Update item quantity
       * If quantity is 0 or less, remove the item
       */
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items
          .map(item =>
            item.id === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          )
          .filter(item => item.quantity > 0) // Remove items with 0 quantity
      })),

      /**
       * Clear all items from cart
       */
      clearCart: () => set({ items: [] }),

      /**
       * Get total number of items in cart
       * Sums up quantities of all items
       */
      getTotalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      /**
       * Get subtotal (sum of all item prices × quantities)
       */
      getSubtotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      /**
       * Calculate tax (8% of subtotal)
       */
      getTax: () => {
        const subtotal = get().getSubtotal()
        return subtotal * 0.08
      },

      /**
       * Calculate shipping cost
       * Free shipping over $50, otherwise $5.99
       */
      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal > 50 ? 0 : 5.99
      },

      /**
       * Get final total (subtotal + tax + shipping)
       */
      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = get().getTax()
        const shipping = get().getShipping()
        return subtotal + tax + shipping
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
)

