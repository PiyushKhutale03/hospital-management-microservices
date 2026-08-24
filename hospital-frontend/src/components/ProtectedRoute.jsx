import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, token } = useAuth();
  const location = useLocation();

  // 1. If not authenticated or no token -> Immediately redirect to Login page
  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If authenticated but lacks the required role -> Redirect to Login page with target info
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location, requiredRole: allowedRoles[0] }} replace />;
  }

  return children;
}
