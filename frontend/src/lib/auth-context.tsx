'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setTokens, clearTokens, getAccessToken } from '@/lib/api';

interface User {
  id: string;
  email: string;
  role: 'manager' | 'teacher' | 'student' | 'parent';
  nameAr: string;
  nameEn: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      api('/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
        .then((data: any) => {
          setTokens(data.accessToken, refreshToken);
          return api('/auth/me');
        })
        .then((userData: User) => setUser(userData))
        .catch(() => clearTokens())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }) as any;
    setTokens(data.accessToken, data.refreshToken);
    setUser(data.user);
  };

  const loginWithGoogle = async (credential: string) => {
    const data = await api('/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    }) as any;
    setTokens(data.accessToken, data.refreshToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      if (getAccessToken()) {
        await api('/auth/logout', { method: 'POST' });
      }
    } catch {} // ignore errors
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
