import { useState, useEffect } from 'react'

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    stock: 15,
    onSale: true,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    stock: 8,
    onSale: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    stock: 0,
    onSale: false,
    image: 'https://via.placeholder.com/150'
  },
]

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600))
        setProducts(MOCK_PRODUCTS)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

