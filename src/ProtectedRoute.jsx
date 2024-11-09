import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Make sure you're importing the context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access the authentication state

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children; // Return the protected route if authenticated
};

export default ProtectedRoute;
