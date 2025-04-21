// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';

const ProtectedRoute = ({ children }) => {
  const { session, isLoading } = useSessionContext();

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
