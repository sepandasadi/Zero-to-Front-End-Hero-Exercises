import { useState } from 'react'

// Mock cart data
const MOCK_CART_ITEMS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
  { id: 2, name: 'Smart Watch', price: 199.99, quantity: 2 },
]

const MOCK_ORDERS = [
  {
    id: 1001,
    date: new Date('2024-01-15'),
    status: 'delivered',
    total: 359.97
  },
  {
    id: 1002,
    date: new Date('2024-01-20'),
    status: 'shipping',
    total: 129.99
  },
]

export function useCart() {
  const [items, setItems] = useState(MOCK_CART_ITEMS)
  const [orders, setOrders] = useState(MOCK_ORDERS)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  return {
    items,
    orders,
    itemCount,
    addItem,
    removeItem
  }
}

