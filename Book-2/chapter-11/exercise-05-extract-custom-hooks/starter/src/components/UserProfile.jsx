import { useState, useEffect } from 'react'
import './UserProfile.css'

// TODO: Extract useFetch hook!
// This component has data fetching logic that's duplicated in PostList

function UserProfile() {
  // DUPLICATED: Same pattern as PostList
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setError(null)

    setTimeout(() => {
      try {
        // Mock user data
        const userData = {
          id: 1,
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&size=80'
        }
        setData(userData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 800)
  }, [])

  if (loading) return <div className="user-profile loading">Loading user...</div>
  if (error) return <div className="user-profile error">Error: {error}</div>
  if (!data) return <div className="user-profile">No user data</div>

  return (
    <div className="user-profile">
      <img src={data.avatar} alt={data.name} className="avatar" />
      <h3>{data.name}</h3>
      <p>{data.email}</p>
    </div>
  )
}

export default UserProfile

