import { useState, useEffect } from 'react'
import './UserDashboard.css'

// TODO: This code is MESSY! Refactor it!
// Problems:
// - Functions doing too many things (SRP violation)
// - Deep nesting (KISS violation)
// - Repeated API patterns (DRY violation)
// - Poor naming

function UserDashboard() {
  const [d, setD] = useState(null)
  const [l, setL] = useState(true)

  // SMELL: Function does TOO MANY things (SRP violation)
  useEffect(() => {
    const f = async () => {
      setL(true)

      // Fetch user
      const r1 = await fetch('/api/user')
      const u = await r1.json()

      // Fetch stats
      const r2 = await fetch('/api/stats')
      const s = await r2.json()

      // Fetch orders
      const r3 = await fetch('/api/orders')
      const o = await r3.json()

      // Calculate metrics
      let total = 0
      for (let i = 0; i < o.length; i++) {
        total += o[i].total
      }

      let count = 0
      for (let i = 0; i < o.length; i++) {
        if (o[i].status === 'completed') {
          count++
        }
      }

      // Determine level (SMELL: deeply nested, magic numbers)
      let level = ''
      if (total > 1000) {
        if (total > 5000) {
          if (total > 10000) {
            level = 'platinum'
          } else {
            level = 'gold'
          }
        } else {
          level = 'silver'
        }
      } else {
        level = 'bronze'
      }

      // Set all data
      setD({
        user: u,
        stats: s,
        orders: o,
        totalSpent: total,
        completedOrders: count,
        level: level
      })

      setL(false)
    }

    // SMELL: Repeated pattern - should be extracted
    f().catch(err => {
      console.error(err)
      setL(false)
    })
  }, [])

  // SMELL: Function does too many things
  const handleO = async (id) => {
    // Find order
    const o = d.orders.find(order => order.id === id)

    // Validate
    if (!o) {
      alert('Order not found')
      return
    }

    // Check if can cancel (SMELL: complex nested logic)
    if (o.status === 'pending') {
      if (o.total < 100) {
        // Cancel order
        const r = await fetch(`/api/orders/${id}/cancel`, { method: 'POST' })
        if (r.ok) {
          // Update local state
          setD({
            ...d,
            orders: d.orders.map(order =>
              order.id === id ? { ...order, status: 'cancelled' } : order
            )
          })

          // Recalculate totals
          let total = 0
          for (let i = 0; i < d.orders.length; i++) {
            if (d.orders[i].status !== 'cancelled') {
              total += d.orders[i].total
            }
          }

          // Update level
          let level = ''
          if (total > 1000) {
            if (total > 5000) {
              if (total > 10000) {
                level = 'platinum'
              } else {
                level = 'gold'
              }
            } else {
              level = 'silver'
            }
          } else {
            level = 'bronze'
          }

          setD({ ...d, totalSpent: total, level: level })
          alert('Order cancelled')
        } else {
          alert('Failed to cancel order')
        }
      } else {
        alert('Cannot cancel orders over $100')
      }
    } else {
      alert('Can only cancel pending orders')
    }
  }

  // SMELL: Duplicated API pattern
  const refresh = async () => {
    setL(true)

    const r1 = await fetch('/api/user')
    const u = await r1.json()

    const r2 = await fetch('/api/stats')
    const s = await r2.json()

    const r3 = await fetch('/api/orders')
    const o = await r3.json()

    let total = 0
    for (let i = 0; i < o.length; i++) {
      total += o[i].total
    }

    let count = 0
    for (let i = 0; i < o.length; i++) {
      if (o[i].status === 'completed') {
        count++
      }
    }

    setD({
      user: u,
      stats: s,
      orders: o,
      totalSpent: total,
      completedOrders: count
    })

    setL(false)
  }

  if (l) return <div className="loading">Loading...</div>
  if (!d) return <div className="error">Failed to load</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {d.user?.name || 'User'}</h2>
        <button onClick={refresh}>Refresh</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Spent</h3>
          <p className="stat-value">${d.totalSpent?.toFixed(2) || '0.00'}</p>
        </div>

        <div className="stat-card">
          <h3>Completed Orders</h3>
          <p className="stat-value">{d.completedOrders || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Member Level</h3>
          <p className="stat-value">{d.level || 'bronze'}</p>
        </div>
      </div>

      <div className="orders-section">
        <h3>Recent Orders</h3>
        {d.orders && d.orders.length > 0 ? (
          d.orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <span>Order #{order.id}</span>
                <span className={`status-${order.status}`}>{order.status}</span>
                <span>${order.total}</span>
              </div>
              {order.status === 'pending' && order.total < 100 && (
                <button onClick={() => handleO(order.id)}>Cancel</button>
              )}
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  )
}

// Mock API (simulating backend)
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

