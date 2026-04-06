'use client';

import React, { createContext, useContext, useState, type ReactNode } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export type UserRole = 'passenger' | 'driver' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, vehicleNumber?: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('go_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('go_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Login failed');
    }
    const userData = await response.json();
    setUser(userData);
    localStorage.setItem('go_user', JSON.stringify(userData));
  };

  const register = async (name: string, email: string, password: string, role: UserRole, vehicleNumber?: string) => {
    const response = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, vehicleNumber }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Registration failed');
    }
    const userData = await response.json();
    setUser(userData);
    localStorage.setItem('go_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('go_user');
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    const response = await fetch(`${API}/api/auth/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Update failed');
    const updatedUser = await response.json();
    setUser(updatedUser);
    localStorage.setItem('go_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
