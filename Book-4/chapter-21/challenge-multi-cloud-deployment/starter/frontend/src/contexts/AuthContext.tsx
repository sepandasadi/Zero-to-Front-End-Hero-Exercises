import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
// TODO: Import Firebase auth functions

interface AuthContextType {
  user: User | null;
  loading: boolean;
  // TODO: Add login, register, logout functions
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Set up Firebase auth state listener
    setLoading(false);
  }, []);

  // TODO: Implement login function
  // TODO: Implement register function
  // TODO: Implement logout function

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

