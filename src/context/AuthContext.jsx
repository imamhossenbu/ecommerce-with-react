import React, { createContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return null;
    }
  });

  
  const setUser = (userData) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(userData);
  };

  const setAuthData = (userData, token) => {
    setUser(userData); 
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout'); 
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login: setAuthData, 
      register: setAuthData, 
      logout, 
      setUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;