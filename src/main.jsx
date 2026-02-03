import { StrictMode } from "react";
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider value={system}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="timesheet" element={<Timesheets />}></Route>
              <Route path="leave" element={<Leaves />}></Route>
              <Route path="trainings" element={<Trainings />}></Route>
              <Route path="interviews" element={<Interviews />}></Route>
              <Route path="certifications" element={<Certifications />}></Route>
              <Route path="profile" element={<UserProfile />}></Route>
              <Route path="admin" element={<AdminPage />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Routes>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
