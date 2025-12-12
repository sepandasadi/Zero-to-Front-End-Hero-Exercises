import { formatUserName, getUserInitials } from '../utils/userHelpers'
import '../users.css'

export function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {getUserInitials(user)}
      </div>
      <div className="user-info">
        <h3>{formatUserName(user)}</h3>
        <p>{user.email}</p>
        <span className="user-role">{user.role}</span>
      </div>
    </div>
  )
}

