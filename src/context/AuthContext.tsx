/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../services/storageService';

export type UserRole = 'Admin' | 'Fleet Manager' | 'Driver' | 'Customer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string, forcedRole?: UserRole) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    let role: UserRole = forcedRole || 'Customer';
    if (!forcedRole) {
      if (email.includes('admin')) role = 'Admin';
      else if (email.includes('manager')) role = 'Fleet Manager';
      else if (email.includes('driver')) role = 'Driver';
    }

    const mockUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      role,
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
