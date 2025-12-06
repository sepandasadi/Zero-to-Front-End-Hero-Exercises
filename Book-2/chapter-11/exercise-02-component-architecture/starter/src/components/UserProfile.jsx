import { useState, useEffect } from 'react'
import './UserProfile.css'

// TODO: Refactor this component!
// Problem: Mixes data fetching, edit logic, and UI
// Solution: Split into UserProfileContainer (logic) + UserProfile (UI)

function UserProfile() {
  // State management (should go to Container)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  })

  // Data fetching (should go to Container)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 600))

      const userData = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Full-stack developer passionate about clean code',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=128',
      }

      setUser(userData)
      setFormData({
        name: userData.name,
        email: userData.email,
        bio: userData.bio,
      })
      setLoading(false)
    }

    fetchUser()
  }, [])

  // Business logic (should go to Container)
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Simulate API call
    setUser({ ...user, ...formData })
    setIsEditing(false)
    alert('Profile updated!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // UI rendering (should stay in Presentational)
  if (loading) {
    return <div className="profile-loading">Loading profile...</div>
  }

  if (!user) {
    return <div className="profile-error">User not found</div>
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt={user.name} className="profile-avatar" />
        {!isEditing && (
          <button onClick={handleEdit} className="profile-edit-btn">
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="profile-save-btn">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="profile-cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-bio">{user.bio}</p>
        </div>
      )}
    </div>
  )
}

export default UserProfile

