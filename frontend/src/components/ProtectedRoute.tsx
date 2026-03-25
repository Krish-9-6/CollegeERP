import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!isAuthenticated) {
    // `state` saves where they were trying to go
    // so after login you can redirect them back there
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
