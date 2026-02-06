import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  Mail,
  ArrowLeft,
  LayoutGrid,
  ShieldQuestion,
  Send,
  CheckCircle,
} from "lucide-react";

function ForgotPasswordComponent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendResetLink(e) {
    e.preventDefault();

    if (!form.email) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email syntax (e.g., name@company.com).");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await axiosInstance.post("/auth/request-reset", {
        email: form.email,
      });
      setMessage("Success! We've sent a recovery link to your inbox.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't find an account with that email.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white">
      <div className="hidden lg:flex lg:w-[60%] bg-[#F8F7FF] flex-col justify-between p-16 relative border-r border-indigo-50">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-2xl relative z-10">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <span className="tracking-tight text-gray-900">DarwinFlow</span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-indigo-50">
            <ShieldQuestion className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Forgot your <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
              access keys?
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-lg">
            Don't worry, it happens to the best of us. Provide your registered
            email and we'll help you get back to your dashboard in minutes.
          </p>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-indigo-200/50 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-75 h-75 bg-purple-200/40 rounded-full blur-[100px]"></div>
        </div>
      </div>

      {/* RIGHT SECTION: The Reset Form (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </button>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Reset Password
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Enter the email associated with your account
            </p>
          </div>

          <form onSubmit={sendResetLink} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Status Messages */}
            {message && (
              <div className="bg-emerald-50 text-emerald-700 text-sm p-4 rounded-xl border border-emerald-100 flex items-center gap-3 font-medium">
                <CheckCircle className="w-5 h-5 shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || message}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 hover:shadow-indigo-200 disabled:opacity-70 active:scale-[0.98]"
            >
              {loading ? "Sending Link..." : "Send Recovery Link"}
              {!loading && <Send className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-1">
              Having trouble?
            </h4>
            <p className="text-sm text-gray-500">
              Contact our support team at{" "}
              <span className="text-indigo-600 font-semibold">
                support@darwinflow.io
              </span>{" "}
              for manual account recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
