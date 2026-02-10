import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}