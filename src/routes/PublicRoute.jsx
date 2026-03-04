import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <Loader2 size={14} className="animate-spin" />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}
