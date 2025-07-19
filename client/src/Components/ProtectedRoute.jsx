import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated: authIsAuthenticated, user: authUser, loading: authLoading } = useSelector((state) => state.auth);
  const { isAuthenticated: staffIsAuthenticated, user: staffUser, loading: staffLoading } = useSelector((state) => state.staffAuth);
  const location = useLocation();

  // Check if user is authenticated in either auth state
  const isAuthenticated = authIsAuthenticated || staffIsAuthenticated;
  const currentUser = authUser || staffUser;
  const isLoading = authLoading || staffLoading;

  // Show loading while authentication is being checked
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have required role, redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
    // Redirect based on user role
    if (currentUser?.role === 'Staff') {
      return <Navigate to="/staff/dashboard" replace />;
    } else if (currentUser?.role === 'Super_Admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 