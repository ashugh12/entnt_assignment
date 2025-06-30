import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  
  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are specified and user doesn't have the required role
  if (roles && !roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    if (user.role === "Patient") {
      return <Navigate to="/patient-view" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return children;
}
