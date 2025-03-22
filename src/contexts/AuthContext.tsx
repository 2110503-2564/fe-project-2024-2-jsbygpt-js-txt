'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  isAdmin: boolean;
};

type AuthContextType = {
  currentUser: User | null;
  register: (name: string, phone: string, email: string, password: string) => void;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from localStorage
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setLoading(false);
    }
  }, []);

  const register = (name: string, phone: string, email: string, password: string) => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = { id: Date.now(), name, phone, email, password, isAdmin: false };
    
    // Check if email already exists
    if (users.some((user: any) => user.email === email)) {
      throw new Error('Email already registered');
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === email && user.password === password);
    
    if (user) {
      // Don't store password in localStorage for security
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
      return userWithoutPassword;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    router.push('/login');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};