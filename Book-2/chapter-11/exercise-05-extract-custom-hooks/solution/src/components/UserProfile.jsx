import { useFetch } from '../hooks/useFetch'
import './UserProfile.css'

// Mock data fetching function
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&size=80'
      })
    }, 800)
  })
}

// CLEAN VERSION - Uses useFetch hook!
function UserProfile() {
  const { data, loading, error } = useFetch(fetchUserData)

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

