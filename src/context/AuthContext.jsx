// context/AuthContext.js
import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  function login(accessToken, rememberMe, userObject) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("accessToken", accessToken);
    storage.setItem("user", JSON.stringify(userObject));
    setUser(userObject);
  }

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
