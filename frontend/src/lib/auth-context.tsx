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

interface AuthResult {
  user: User;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: (credential: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ user: {} as User }),
  loginWithGoogle: async () => ({ user: {} as User }),
  logout: async () => {},
});

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session via HttpOnly refresh cookie
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then((data: any) => { // justified: refresh response shape not typed yet
        setTokens(data.accessToken);
        return api('/auth/me');
      })
      .then((userData: User) => setUser(userData))
      .catch(() => clearTokens())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const data = await api('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }) as any; // justified: login response shape not typed yet
    setTokens(data.accessToken);
    setUser(data.user);
    return { user: data.user };
  };

  const loginWithGoogle = async (credential: string): Promise<AuthResult> => {
    const data = await api('/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    }) as any; // justified: google auth response shape not typed yet
    setTokens(data.accessToken);
    setUser(data.user);
    return { user: data.user };
  };

  const logout = async () => {
    try {
      if (getAccessToken()) {
        await api('/auth/logout', { method: 'POST' });
      }
    } catch (err) { console.error('Logout failed:', err); }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
