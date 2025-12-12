import { useState } from 'react'
import * as Sentry from "@sentry/react"

function UserContextDemo() {
  const [user, setUser] = useState(null)

  const loginUser = () => {
    const mockUser = {
      id: 12345,
      email: 'demo@example.com',
      username: 'demo_user',
      subscription: 'premium',
    }

    setUser(mockUser)

    // Set user in Sentry - will be attached to all future errors
    Sentry.setUser({
      id: mockUser.id,
      email: mockUser.email,
      username: mockUser.username,
    })

    // Add custom context
    Sentry.setContext('subscription', {
      tier: mockUser.subscription,
      since: '2024-01-01',
    })

    alert('User context set in Sentry! Future errors will include this info.')
  }

  const logoutUser = () => {
    setUser(null)

    // Clear user from Sentry
    Sentry.setUser(null)

    alert('User context cleared in Sentry.')
  }

  const triggerErrorWithUser = () => {
    throw new Error('Error with user context attached!')
  }

  return (
    <section className="section">
      <h2>4. User Context</h2>
      <p>Attach user information to errors for better debugging:</p>

      <div style={{ marginTop: '1rem' }}>
        {!user ? (
          <button onClick={loginUser}>
            Login (Set User Context)
          </button>
        ) : (
          <>
            <button onClick={logoutUser}>
              Logout (Clear User Context)
            </button>
            <button className="danger" onClick={triggerErrorWithUser}>
              Trigger Error (with user context)
            </button>
          </>
        )}
      </div>

      {user && (
        <div className="user-info">
          <h3>Current User (in Sentry):</h3>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Subscription:</strong> {user.subscription}</p>
        </div>
      )}

      <p className="info">
        💡 When you trigger an error while "logged in", Sentry will show:
        <br />• User ID, email, username
        <br />• Custom context (subscription info)
        <br />• This helps identify which users are affected by bugs
      </p>
    </section>
  )
}

export default UserContextDemo


