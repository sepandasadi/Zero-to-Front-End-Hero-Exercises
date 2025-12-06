import { useState } from 'react'
import { getActiveItems, addTimestamp, hasItems } from '../utils'
import './UserManagement.css'

/**
 * UserManagement Component (CLEAN VERSION)
 *
 * Naming improvements:
 * - Descriptive variables (users, isEditMode, selectedUser)
 * - Clear functions (handleAddUser, handleUserDelete)
 * - Boolean prefixes (isEditMode, hasUsers, isAdmin)
 * - Proper event handlers (handleInputChange)
 */
function UserManagement() {
  // Clear, descriptive state variables
  const [users, setUsers] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Descriptive form data with full property names
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  })

  // Boolean variables with proper prefixes
  const hasUsers = users.length > 0
  const isLoggedIn = true
  const isAdmin = formData.role === 'admin'

  /**
   * Add a new user to the list
   * Function name clearly describes action
   */
  function handleAddUser() {
    if (formData.name && formData.email) {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        isActive: true
      }

      setUsers([...users, newUser])
      setFormData({ name: '', email: '', role: 'user' })
    }
  }

  /**
   * Delete a user by ID
   * Specific about what it deletes
   */
  function handleUserDelete(userId) {
    setUsers(users.filter(user => user.id !== userId))
  }

  /**
   * Start editing a user
   * Clear about the action
   */
  function handleEditUser(userId) {
    const userToEdit = users.find(user => user.id === userId)
    if (userToEdit) {
      setSelectedUser(userToEdit)
      setIsEditMode(true)
    }
  }

  /**
   * Save user changes
   * Clear about what it updates
   */
  function handleUserUpdate() {
    if (selectedUser) {
      setUsers(users.map(user =>
        user.id === selectedUser.id ? selectedUser : user
      ))
      setIsEditMode(false)
      setSelectedUser(null)
    }
  }

  /**
   * Handle form input changes
   * Specific about what changes
   */
  function handleInputChange(event) {
    const { name, value } = event.target

    if (isEditMode && selectedUser) {
      setSelectedUser({ ...selectedUser, [name]: value })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  /**
   * Cancel editing mode
   */
  function handleCancelEdit() {
    setIsEditMode(false)
    setSelectedUser(null)
  }

  return (
    <div className="user-management">
      <div className="user-form">
        <input
          name="name"
          value={isEditMode && selectedUser ? selectedUser.name : formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          name="email"
          value={isEditMode && selectedUser ? selectedUser.email : formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <select
          name="role"
          value={isEditMode && selectedUser ? selectedUser.role : formData.role}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {isEditMode ? (
          <>
            <button onClick={handleUserUpdate}>Update User</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddUser}>Add User</button>
        )}
      </div>

      {hasUsers && (
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>
              <div className="user-actions">
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleUserDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserManagement

