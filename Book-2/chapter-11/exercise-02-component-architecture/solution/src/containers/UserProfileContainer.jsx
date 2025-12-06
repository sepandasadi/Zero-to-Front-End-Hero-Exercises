import { useState, useEffect } from 'react'
import UserProfile from '../components/UserProfile'

/**
 * UserProfileContainer (Smart Component)
 *
 * Responsibilities:
 * - Fetches user data
 * - Manages edit state
 * - Handles form data
 * - Handles save/cancel logic
 */
function UserProfileContainer() {
  // State management
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  })

  // Data fetching
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      // Simulate API call
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

  // Business logic - Start editing
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Business logic - Cancel editing
  const handleCancel = () => {
    setIsEditing(false)
    // Reset form to current user data
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio,
    })
  }

  // Business logic - Save changes
  const handleSave = (e) => {
    e.preventDefault()
    // In real app: call API to update user
    setUser({ ...user, ...formData })
    setIsEditing(false)
    alert('Profile updated!')
  }

  // Business logic - Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Render presentational component
  return (
    <UserProfile
      user={user}
      loading={loading}
      isEditing={isEditing}
      formData={formData}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
      onChange={handleChange}
    />
  )
}

export default UserProfileContainer

