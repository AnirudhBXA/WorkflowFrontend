import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);
  console.log("User role:", user.role, "Allowed:", allowedRoles);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toUpperCase();
  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    console.warn(`Access denied for role: ${userRole}. Allowed roles: ${allowedRoles.join(", ")}`);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
