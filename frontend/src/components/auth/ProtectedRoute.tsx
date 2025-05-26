import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ('student' | 'instructor' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'student') {
      return <Navigate to="/dashboard/student" replace />;
    } else if (user.role === 'instructor') {
      return <Navigate to="/dashboard/instructor" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;