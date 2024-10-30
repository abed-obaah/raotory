
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
