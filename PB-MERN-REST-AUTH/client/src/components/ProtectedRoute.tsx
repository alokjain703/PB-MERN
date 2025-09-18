// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const user = useAuthStore((state) => state.user);
  console.log("ProtectedRoute user:", user);

  // Check if user is logged in and has the required role
  if (!user || !user.roles || !user.roles.includes(requiredRole)) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;