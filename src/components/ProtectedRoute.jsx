import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

function ProtectedRoute({ children }) {
  const user = authService.getAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
