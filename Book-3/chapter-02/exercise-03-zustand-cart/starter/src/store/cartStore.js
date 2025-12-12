import { create } from 'zustand'
// TODO: Import persist middleware for localStorage

// TODO: Create cart store with create()
export const useCartStore = create(
  // TODO: Optionally wrap with persist() middleware
  (set, get) => ({
    // State
    items: [],

    // TODO: Add actions
    // addItem: (product) => { /* Add or increment quantity */ },
    // removeItem: (productId) => { /* Remove item from cart */ },
    // updateQuantity: (productId, quantity) => { /* Update item quantity */ },
    // clearCart: () => { /* Clear all items */ },

    // TODO: Add computed values (or use selectors in components)
    // getTotalItems: () => { /* Calculate total items */ },
    // getTotalPrice: () => { /* Calculate total price */ },
  })
)

