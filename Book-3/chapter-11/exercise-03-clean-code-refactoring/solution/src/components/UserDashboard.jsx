import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import {
  findOrder,
  canCancelOrder,
  getCancellationError,
  updateOrderStatus,
  calculateTotalSpent,
  countCompletedOrders,
  ORDER_STATUS
} from '../utils/orderUtils'
import { getMembershipLevel } from '../utils/membershipUtils'
import './UserDashboard.css'

/**
 * UserDashboard Component (CLEAN VERSION)
 *
 * Improvements:
 * - Separated concerns using custom hooks (DRY)
 * - Simple, focused functions (SRP)
 * - Clear logic flow (KISS)
 * - Descriptive naming
 */
function UserDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Use custom hook for fetching (DRY - no more duplicated fetch patterns)
  const { data: userData } = useFetch('/api/user')
  const { data: statsData } = useFetch('/api/stats')

  // Load orders
  useEffect(() => {
    loadOrders()
  }, [])

  /**
   * Load orders from API
   * Single responsibility: fetch and set orders
   */
  async function loadOrders() {
    setLoading(true)
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle order cancellation
   * Simplified with extracted utilities
   */
  async function handleCancelOrder(orderId) {
    const order = findOrder(orders, orderId)
    const error = getCancellationError(order)

    if (error) {
      alert(error)
      return
    }

    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to cancel order')
      }

      // Update local state
      const updatedOrders = updateOrderStatus(orders, orderId, ORDER_STATUS.CANCELLED)
      setOrders(updatedOrders)

      alert('Order cancelled successfully')
    } catch (error) {
      alert(`Failed to cancel order: ${error.message}`)
    }
  }

  // Calculate metrics using utilities
  const totalSpent = calculateTotalSpent(orders, true) // exclude cancelled
  const completedOrders = countCompletedOrders(orders)
  const membershipLevel = getMembershipLevel(totalSpent)

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {userData?.name || 'User'}</h2>
        <button onClick={loadOrders}>Refresh</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Spent" value={`$${totalSpent.toFixed(2)}`} />
        <StatCard title="Completed Orders" value={completedOrders} />
        <StatCard title="Member Level" value={membershipLevel} />
      </div>

      <OrdersList
        orders={orders}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  )
}

/**
 * StatCard Component
 * Single responsibility: display a stat
 */
function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  )
}

/**
 * OrdersList Component
 * Single responsibility: display orders list
 */
function OrdersList({ orders, onCancelOrder }) {
  if (!orders || orders.length === 0) {
    return <p>No orders yet</p>
  }

  return (
    <div className="orders-section">
      <h3>Recent Orders</h3>
      {orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          onCancel={onCancelOrder}
        />
      ))}
    </div>
  )
}

/**
 * OrderCard Component
 * Single responsibility: display a single order
 */
function OrderCard({ order, onCancel }) {
  const showCancelButton = canCancelOrder(order)

  return (
    <div className="order-card">
      <div className="order-info">
        <span>Order #{order.id}</span>
        <span className={`status-${order.status}`}>{order.status}</span>
        <span>${order.total}</span>
      </div>

      {showCancelButton && (
        <button onClick={() => onCancel(order.id)}>
          Cancel
        </button>
      )}
    </div>
  )
}

// Mock API for demo purposes
if (typeof global !== 'undefined') {
  global.fetch = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    if (url === '/api/user') {
      return {
        json: async () => ({ id: 1, name: 'John Doe', email: 'john@example.com' })
      }
    }

    if (url === '/api/stats') {
      return {
        json: async () => ({ views: 1234, clicks: 567 })
      }
    }

    if (url === '/api/orders') {
      return {
        json: async () => ([
          { id: 1, total: 99, status: 'pending' },
          { id: 2, total: 149, status: 'completed' },
          { id: 3, total: 299, status: 'completed' },
        ])
      }
    }

    return { ok: true, json: async () => ({}) }
  }
}

export default UserDashboard

