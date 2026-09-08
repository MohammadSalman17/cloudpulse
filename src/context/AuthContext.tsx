import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cloudpulse_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Demo auth - accept any credentials
    const demoUser = { id: 'usr_demo', name: email.split('@')[0] || 'User', email };
    setUser(demoUser);
    localStorage.setItem('cloudpulse_user', JSON.stringify(demoUser));
    return true;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    const newUser = { id: 'usr_' + Date.now(), name, email };
    setUser(newUser);
    localStorage.setItem('cloudpulse_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cloudpulse_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
