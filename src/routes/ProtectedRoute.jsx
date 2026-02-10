import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useContext(AuthContext);

  // Stop the redirect from happening while we are still checking storage
  if (loading) {
    return <div>Loading...</div>; // Or a Spinner
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
