import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App.jsx";
import { system } from "./utils/theme.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Timesheets from "./pages/Timesheets.jsx";
import Leaves from "./pages/Leaves.jsx";
import Trainings from "./pages/Trainings.jsx";
import Interviews from "./pages/Interviews.jsx";
import Certifications from "./pages/Certifications.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import WorkflowPage from "./pages/WorkflowPage.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChakraProvider value={system}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="timesheet" element={<Timesheets />} />
            <Route path="leave" element={<Leaves />} />
            <Route path="trainings" element={<Trainings />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="profile" element={<UserProfile />} />
            <Route
              path="workflows"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "HR"]}>
                  <WorkflowPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>,
);
