import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add response interceptor for error handling
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    // Check for 401 and redirect to login if needed
    if (error.response?.status === 401) {
      // You might want to clear local storage here too
      localStorage.removeItem('hausasoft_user');
      localStorage.removeItem('hausasoft_token');
      // window.location.href = '/login'; // Or use navigate from react-router-dom if available outside components
    }
    return Promise.reject(error);
  }
);

// Types
type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string, confirmPassword: string, role: UserRole) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

// Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('hausasoft_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('hausasoft_user');
        localStorage.removeItem('hausasoft_token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    try {
      const response = await axios.post<{ access: string }>('/api/auth/token/', { email, password });
      const { access } = response.data;
      // Fetch user profile
      const userRes = await axios.get<User>('/api/users/me/', {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUser(userRes.data);
      localStorage.setItem('hausasoft_user', JSON.stringify(userRes.data));
      localStorage.setItem('hausasoft_token', access);
      setLoading(false);
      return { success: true, message: 'Login successful!' };
    } catch (error: any) {
      setLoading(false);
      let message = 'Invalid email or password. Please try again.';
      if (error.response?.data?.detail) message = error.response.data.detail;
      return { success: false, message };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    try {
      const response = await axios.post<{ success: boolean; message: string }>('/api/auth/register/', {
        name,
        email,
        password,
        confirmPassword,
        role
      });

      const { success, message } = response.data;
      setLoading(false);
      return { success: true, message: message || 'Registration successful! You can now log in.' };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         'Registration failed. Please try again.';
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hausasoft_user');
    localStorage.removeItem('hausasoft_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};