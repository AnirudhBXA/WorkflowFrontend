import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleReset() {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword: form.password,
      });
      setSuccess("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100 space-y-5">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Set New Password
        </h2>

        {success && (
          <p className="text-sm text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
            {success}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        <input
          type="password"
          name="password"
          placeholder="New password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleReset}
          disabled={loading || !token}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
