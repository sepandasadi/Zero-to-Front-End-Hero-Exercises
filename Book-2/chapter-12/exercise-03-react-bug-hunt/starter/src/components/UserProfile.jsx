import { useState, useEffect } from 'react'

// BUG #2: Missing useEffect Dependencies
// SYMPTOM: User data doesn't update when userId prop changes

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ❌ BUG: Missing userId in dependency array!
  // When userId prop changes, effect doesn't re-run
  useEffect(() => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const userData = {
        1: { id: 1, name: 'Alice', email: 'alice@example.com' },
        2: { id: 2, name: 'Bob', email: 'bob@example.com' },
        3: { id: 3, name: 'Charlie', email: 'charlie@example.com' }
      }

      setUser(userData[userId])
      setLoading(false)
    }, 500)
  }, [])  // ❌ Missing userId dependency!

  if (loading) return <div className="component-box loading">Loading user...</div>

  return (
    <div className="component-box">
      <h3>User Profile (Bug: Missing Dependency)</h3>
      <div className="user-info">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name}&size=60`}
          alt={user?.name}
          className="avatar"
        />
        <div className="user-details">
          <h4>{user?.name || 'Unknown'}</h4>
          <p>{user?.email || 'No email'}</p>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => window.location.reload()}>
          Change User ID in props to test
        </button>
      </div>
    </div>
  )
}

export default UserProfile


