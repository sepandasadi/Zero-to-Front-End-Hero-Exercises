import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ❌ VULNERABILITY #9: Reading user from localStorage on mount
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user } = await authService.login(email, password);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}

