import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../types';

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthenticationProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('jwt');
    const savedUser = localStorage.getItem('user');
    const savedUserId = localStorage.getItem('userId');

    if (savedToken && savedUserId) {
      setJwt(savedToken);
      setUser(savedUser);
      setUserId(savedUserId);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch('https://localhost:7117/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await res.json();

    if (res.status != 200) throw res.status;

    setJwt(data.token);
    setUser(data.username);
    setUserId(data.userId);
    localStorage.setItem('jwt', data.token);
    localStorage.setItem('user', data.username);
    localStorage.setItem('userId', data.userId);
    setLoading(false);
  };

  const register = async (user: User, password: string) => {
    const res = await fetch('https://localhost:7117/api/Auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, password }),
    });
    const data = await res.json();
    if (res.status != 200 && res.status != 201) throw data.message;
    return data;
  };

  const logout = () => {
    setJwt(null);
    setUser(null);
    setUserId(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  const value: AuthContextType = { user, jwt, login, logout, register, userId };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
