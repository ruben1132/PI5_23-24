"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  username: string;
  userRole: string;
}

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Retrieve user data from cookies on component mount
    const storedUser = Cookies.get('robdronego:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User) => {
      // store user data in local storage and update the state
      Cookies.set('robdronego:user', JSON.stringify(userData));
      setUser(userData);
  };

  const logout = () => {
      // remove user data cookie and update the state
      Cookies.remove('robdronego:user');
      setUser(null);
  };

  useEffect(() => {
     
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
