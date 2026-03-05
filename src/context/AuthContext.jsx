import React, { createContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const setAuthData = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout'); 
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login: setAuthData, register: setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;