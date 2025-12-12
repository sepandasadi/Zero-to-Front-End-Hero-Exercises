// ✅ SECURE: Authentication service with HttpOnly cookies
let csrfToken = null;

export const authService = {
  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ Send/receive cookies
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Login failed');

    const { user, csrfToken: token } = await response.json();

    // ✅ Store CSRF token in memory (not localStorage!)
    csrfToken = token;

    return { user };
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': csrfToken // ✅ CSRF protection
        }
      });
    } finally {
      csrfToken = null;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });

      if (!response.ok) return null;

      const data = await response.json();
      csrfToken = data.csrfToken; // Update token
      return data.user;
    } catch (error) {
      return null;
    }
  },

  getCsrfToken: () => csrfToken
};

