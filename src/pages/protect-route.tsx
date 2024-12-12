import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export default function ProtectRoute({ children }: ProtectRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
