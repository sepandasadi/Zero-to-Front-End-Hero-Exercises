import './UserProfile.css'

/**
 * UserProfile (Presentational/Dumb Component)
 *
 * Responsibilities:
 * - Receives user data and edit state via props
 * - Renders view/edit modes
 * - Calls callbacks for edit/save/cancel
 * - NO data fetching, NO business logic
 */
function UserProfile({
  user,
  loading,
  isEditing,
  formData,
  onEdit,
  onCancel,
  onSave,
  onChange,
}) {
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
          <button onClick={onEdit} className="profile-edit-btn">
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={onSave} className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={onChange}
              rows="4"
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="profile-save-btn">
              Save Changes
            </button>
            <button type="button" onClick={onCancel} className="profile-cancel-btn">
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

