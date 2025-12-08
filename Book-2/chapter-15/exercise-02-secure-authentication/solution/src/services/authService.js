// ✅ SECURE: Authentication service with proper security

// ✅ No localStorage! Cookies are HttpOnly and handled by browser
let csrfToken = null;

export const authService = {
  /**
   * Login user
   * ✅ SECURE: Uses HttpOnly cookies instead of localStorage
   */
  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ Send cookies
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { user, csrfToken: token } = await response.json();

    // ✅ Store CSRF token in memory (not localStorage!)
    csrfToken = token;

    // ✅ Session cookie is HttpOnly - not accessible to JavaScript!
    return { user };
  },

  /**
   * Logout user
   * ✅ SECURE: Invalidates server session
   */
  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // ✅ Send cookies
        headers: {
          'X-CSRF-Token': csrfToken // ✅ CSRF protection
        }
      });
    } finally {
      // Clear CSRF token
      csrfToken = null;
    }
  },

  /**
   * Get current user from server
   * ✅ SECURE: Validates session on server
   */
  getCurrentUser: async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include', // ✅ Send cookies
        headers: {
          'X-CSRF-Token': csrfToken // ✅ CSRF protection
        }
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      csrfToken = data.csrfToken; // Update CSRF token
      return data.user;
    } catch (error) {
      return null;
    }
  },

  /**
   * Get CSRF token
   */
  getCsrfToken: () => csrfToken
};

/**
 * Make authenticated API requests
 * ✅ SECURE: Includes CSRF token and credentials
 */
export async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // ✅ Send HttpOnly cookies
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken // ✅ CSRF protection
    }
  });

  if (response.status === 401) {
    // Session expired or invalid
    csrfToken = null;
    window.location.href = '/login';
  }

  return response;
}

