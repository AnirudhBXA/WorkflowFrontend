// context/AuthContext.jsx
import { createContext, useState } from "react";
import { setAccessToken } from "../utils/axiosInstance";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(accessToken) {
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  }

  function logout() {
    setAccessToken(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
