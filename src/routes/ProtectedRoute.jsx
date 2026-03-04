import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader2 size={14} className="animate-spin" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toUpperCase();
  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
