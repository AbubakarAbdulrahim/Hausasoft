import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Configure axios
axios.defaults.baseURL =
  process.env.REACT_APP_API_BASE_URL || "https://hausasoft.onrender.com";

// Add request interceptor to set Authorization header if token exists
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("hausasoft_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("hausasoft_user");
      localStorage.removeItem("hausasoft_token");
    }
    return Promise.reject(error);
  }
);

// Types
type UserRole = "student" | "instructor" | "admin";

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
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    confirm_password: string,
    role: UserRole
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

// Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedUser = localStorage.getItem("hausasoft_user");
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("hausasoft_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem("hausasoft_user");
        localStorage.removeItem("hausasoft_token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    try {
      const response = await axios.post<{ access: string }>(
        "/api/auth/token/",
        { email, password }
      );
      const { access } = response.data;
      const userRes = await axios.get<User>("/api/users/me/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUser(userRes.data);
      localStorage.setItem("hausasoft_user", JSON.stringify(userRes.data));
      localStorage.setItem("hausasoft_token", access);
      setLoading(false);
      return { success: true, message: "Login successful!" };
    } catch (error: any) {
      setLoading(false);
      const message =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Invalid email or password.";
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
      const response = await axios.post<{ success: boolean; message: string }>(
        "/api/auth/register/",
        {
          name,
          email,
          password,
          confirm_password: ConfirmPassword,
          role,
        }
      );

      const { success, message } = response.data;
      setLoading(false);
      return {
        success: true,
        message: message || "Registration successful! You can now log in.",
      };
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      return { success: false, message: errorMessage };
    }
    localStorage.removeItem("hausasoft_user");
    localStorage.removeItem("hausasoft_token");
  };
    if (axios.defaults.headers?.common?.Authorization) {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
