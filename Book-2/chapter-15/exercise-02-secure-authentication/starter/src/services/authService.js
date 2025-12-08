// ❌ INSECURE: This authentication service has multiple security issues!

export const authService = {
  /**
   * Login user
   * ❌ ISSUE #1: Stores token in localStorage (vulnerable to XSS)
   */
  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token, user } = await response.json();

    // ❌ VULNERABLE: Token in localStorage can be stolen by XSS!
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  },

  /**
   * Logout user
   * ❌ ISSUE #2: Only clears localStorage, doesn't invalidate server session
   */
  logout: () => {
    // ❌ INSECURE: Server session still valid!
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get current token
   * ❌ ISSUE #3: Token accessible to JavaScript (XSS risk)
   */
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  /**
   * Get current user
   */
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

/**
 * Make API requests with auth token
 * ❌ ISSUE #4: No CSRF protection!
 */
export async function apiRequest(url, options = {}) {
  const token = authService.getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 401) {
    // Token expired or invalid
    authService.logout();
    window.location.href = '/login';
  }

  return response;
}

