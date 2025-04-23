// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('Token in PrivateRoute:', token);  // Check token

  // If no token, redirect to login
  if (!token) {
    console.log('No token found. Redirecting to login...');
    return <Navigate to="/" />;
  }

  // Else show the component (like Dashboard)
  return children;
};

export default PrivateRoute;
