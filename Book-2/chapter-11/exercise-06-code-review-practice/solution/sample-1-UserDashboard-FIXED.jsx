import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import { useWindowSize } from './hooks/useWindowSize'

/**
 * FIXED VERSION: UserDashboard
 *
 * Improvements:
 * - Fixed memory leak (proper cleanup)
 * - Extracted custom hooks
 * - Separated concerns (SRP)
 * - Removed magic numbers
 * - Optimized re-renders
 */

// Constants instead of magic numbers
const MEMBERSHIP_LEVELS = {
  GOLD: 1000,
  SILVER: 500,
  BRONZE: 0
}

const RESPONSIVE_BREAKPOINT = 768

// Extracted action definitions (won't recreate on every render)
const DASHBOARD_ACTIONS = [
  { id: 1, label: 'Edit Profile' },
  { id: 2, label: 'Settings' },
  { id: 3, label: 'Logout' }
]

// Separate concerns: validation
function validateUserData(data) {
  const errors = []

  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters')
  }

  if (!data.email || !data.email.includes('@')) {
    errors.push('Valid email is required')
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '))
  }
}

// Separate concerns: transformation
function transformUserData(data) {
  return {
    ...data,
    name: data.name.trim(),
    email: data.email.toLowerCase(),
    updatedAt: new Date()
  }
}

// Separate concerns: API calls
async function saveUserData(userData) {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    throw new Error('Failed to update user')
  }

  return response.json()
}

async function fetchUserStats() {
  const response = await fetch('/api/stats')
  if (!response.ok) {
    throw new Error('Failed to fetch stats')
  }
  return response.json()
}

// Utility: calculate membership level
function getMembershipLevel(points) {
  if (points >= MEMBERSHIP_LEVELS.GOLD) return 'gold'
  if (points >= MEMBERSHIP_LEVELS.SILVER) return 'silver'
  return 'bronze'
}

function UserDashboard() {
  // Custom hook handles data fetching
  const { data: user, setData: setUser, loading, error } = useFetch('/api/user')
  const { data: stats, setData: setStats } = useFetch('/api/stats')

  // Custom hook handles window size with proper cleanup
  const { width } = useWindowSize()

  const [updating, setUpdating] = useState(false)

  // Clean, focused update handler
  const handleUpdate = async (data) => {
    try {
      setUpdating(true)

      // Separate concerns
      validateUserData(data)
      const transformed = transformUserData(data)
      const updated = await saveUserData(transformed)

      // Update state
      setUser(updated)

      // Refresh stats
      const newStats = await fetchUserStats()
      setStats(newStats)

      alert('Profile updated!')
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setUpdating(false)
    }
  }

  // Derived state (no useEffect needed)
  const level = stats ? getMembershipLevel(stats.points) : 'bronze'
  const isResponsive = width < RESPONSIVE_BREAKPOINT

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user data</div>

  return (
    <div style={{ width: isResponsive ? '100%' : '80%' }}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Level: {level}</p>
      <p>Points: {stats?.points || 0}</p>

      {DASHBOARD_ACTIONS.map(action => (
        <button
          key={action.id}
          onClick={action.onClick}
          disabled={updating}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

export default UserDashboard

