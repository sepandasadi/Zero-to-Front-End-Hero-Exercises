import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCartStore } from './cartStore'

/**
 * Wishlist Store - Manages saved/favorite products
 * Uses persist middleware to save wishlist to localStorage
 */
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      // State: array of wishlist items
      items: [],

      /**
       * Add product to wishlist
       * Prevents duplicates
       */
      addItem: (product) => set((state) => {
        // Check if already in wishlist
        const exists = state.items.some(item => item.id === product.id)
        if (exists) {
          return state // No change if already in wishlist
        }

        return {
          items: [...state.items, product]
        }
      }),

      /**
       * Remove product from wishlist
       */
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      /**
       * Move item from wishlist to cart
       * Adds to cart then removes from wishlist
       */
      moveToCart: (product) => {
        // Add to cart using cart store
        useCartStore.getState().addItem(product)

        // Remove from wishlist
        get().removeItem(product.id)
      },

      /**
       * Check if a product is in the wishlist
       * Useful for toggling heart icon in product cards
       */
      isInWishlist: (productId) => {
        const state = get()
        return state.items.some(item => item.id === productId)
      },

      /**
       * Clear all items from wishlist
       */
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage', // localStorage key
    }
  )
)

