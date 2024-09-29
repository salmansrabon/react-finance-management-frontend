// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component wraps protected routes
const PrivateRoute = ({ children }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = localStorage.getItem('authToken'); // Check if user is logged in

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected routes)
  return children;
};

export default PrivateRoute;
