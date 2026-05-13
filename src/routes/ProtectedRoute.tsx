import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 technical-grid opacity-10" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-2 border-primary border-t-transparent animate-spin" />
          <div className="animate-pulse text-[10px] font-black uppercase tracking-[0.5em] text-primary">Initializing Command Center...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
