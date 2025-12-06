import { useState, useEffect } from 'react'

/**
 * CODE REVIEW SAMPLE 1: UserDashboard
 *
 * YOUR TASK: Review this code and identify issues
 *
 * Look for:
 * - Performance issues
 * - Memory leaks
 * - Code quality problems
 * - Missing best practices
 */

function UserDashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)

  // ISSUE: Missing cleanup for event listener
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }, [])

  // ISSUE: Creates new object every render
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch('/api/user')
      const userData = await userResponse.json()
      setUser(userData)

      const statsResponse = await fetch('/api/stats')
      const statsData = await statsResponse.json()
      setStats(statsData)
    }

    fetchData()
  }, [])

  // ISSUE: Function does too many things
  const handleUpdate = async (data) => {
    // Validate
    if (!data.name || data.name.length < 2) {
      alert('Name too short')
      return
    }
    if (!data.email || !data.email.includes('@')) {
      alert('Invalid email')
      return
    }

    // Transform
    const updated = {
      ...data,
      name: data.name.trim(),
      email: data.email.toLowerCase(),
      updatedAt: new Date()
    }

    // Save
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(updated)
      })

      if (!response.ok) throw new Error('Failed to update')

      const result = await response.json()
      setUser(result)

      // Show message
      alert('Profile updated!')

      // Refresh stats
      const statsResponse = await fetch('/api/stats')
      const statsData = await statsResponse.json()
      setStats(statsData)
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  // ISSUE: Magic numbers
  const level = stats?.points > 1000 ? 'gold' : stats?.points > 500 ? 'silver' : 'bronze'

  // ISSUE: Creates new array every render
  const actions = [
    { id: 1, label: 'Edit Profile', onClick: () => {} },
    { id: 2, label: 'Settings', onClick: () => {} },
    { id: 3, label: 'Logout', onClick: () => {} }
  ]

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ width: width < 768 ? '100%' : '80%' }}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Level: {level}</p>
      <p>Points: {stats?.points || 0}</p>

      {actions.map(action => (
        <button key={action.id} onClick={action.onClick}>
          {action.label}
        </button>
      ))}
    </div>
  )
}

export default UserDashboard

