import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAdminProps {
  children: ReactNode;
  fallbackPath?: string;
}

export default function RequireAdmin({ children, fallbackPath = "/" }: RequireAdminProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!user) {
    const returnTo = location.pathname + (location.search || "");
    return <Navigate to="/login" replace state={{ from: returnTo }} />;
  }

  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
