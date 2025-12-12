import { UserCard } from './UserCard'
import { useUsers } from '../hooks/useUsers'
import '../styles/users.css'

export function UserList() {
  const { users, loading, error } = useUsers()

  if (loading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

