import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  Lock,
  CheckCircle2,
  ShieldCheck,
  LayoutGrid,
  KeyRound,
  RefreshCcw,
} from "lucide-react";

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
      setError("Invalid or expired reset token. Please request a new link.");
    }
  }, [token]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleReset(e) {
    e.preventDefault();
    setError("");

    // Validations
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword: form.password,
      });
      setSuccess("Your password has been reset successfully.");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Link may be expired.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white">
      {/* LEFT SECTION: Branding (60%) */}
      <div className="hidden lg:flex lg:w-[60%] bg-[#F8F7FF] flex-col justify-between p-16 relative border-r border-indigo-50">
        {/* Logo */}
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-2xl relative z-10">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <span className="tracking-tight text-gray-900">
            Workflow<span className="text-indigo-600">Pro</span>
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-indigo-50">
            <KeyRound className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Secure your <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
              workspace access.
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Choose a strong password to ensure your projects and team data
            remain protected under enterprise-grade encryption.
          </p>

        </div>
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-indigo-200/50 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-75 h-75 bg-purple-200/40 rounded-full blur-[100px]"></div>
        </div>
      </div>

      {/* RIGHT SECTION: Form (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-10 text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Set new password
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Create a unique password for your account
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">
                New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm ${
                    form.confirmPassword &&
                    form.password !== form.confirmPassword
                      ? "border-red-300"
                      : "border-gray-200 focus:border-indigo-500"
                  }`}
                />
              </div>
              {form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-500 font-medium ml-1">
                    Passwords do not match yet.
                  </p>
                )}
            </div>

            {/* Status Messages */}
            {success && (
              <div className="bg-emerald-50 text-emerald-700 text-sm p-4 rounded-xl border border-emerald-100 flex items-center gap-3 font-medium animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !token || !!success}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 hover:shadow-indigo-200 disabled:opacity-70 active:scale-[0.98]"
            >
              {loading ? "Updating..." : "Update Password"}
              {!loading && <CheckCircle2 className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-10">
            By resetting your password, you agree to our security protocols and
            will be logged out of all other sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
