const API_BASE_URL = 'https://fakestoreapi.com'

// Generic API call handler with error handling
async function apiCall(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Fetch all products
export async function fetchProducts() {
  return apiCall('/products')
}

// Fetch product by ID
export async function fetchProductById(id) {
  return apiCall(`/products/${id}`)
}

// Fetch all categories
export async function fetchCategories() {
  return apiCall('/products/categories')
}

// Fetch products by category
export async function fetchProductsByCategory(category) {
  return apiCall(`/products/category/${category}`)
}

// Simulate order submission (since API doesn't support POST)
export async function submitOrder(orderData) {
  // In a real app, this would POST to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `ORD-${Date.now()}`,
        orderData,
      })
    }, 1000)
  })
}

