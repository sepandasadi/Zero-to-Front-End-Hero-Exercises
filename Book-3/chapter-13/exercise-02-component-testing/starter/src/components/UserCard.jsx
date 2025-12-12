import './UserCard.css';

function UserCard({ user, onEdit, onDelete }) {
  const { name, email, avatar, verified } = user;

  return (
    <div className="user-card" data-testid="user-card">
      <div className="user-avatar">
        {avatar ? (
          <img src={avatar} alt={`${name}'s avatar`} />
        ) : (
          <div className="avatar-fallback" aria-label="No avatar">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="user-info">
        <div className="user-name">
          <h3>{name}</h3>
          {verified && (
            <span className="verified-badge" aria-label="Verified user">
              ✓ Verified
            </span>
          )}
        </div>
        <p className="user-email">{email}</p>
      </div>
      <div className="user-actions">
        <button onClick={onEdit} aria-label="Edit user">
          Edit
        </button>
        <button onClick={onDelete} className="danger" aria-label="Delete user">
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;

