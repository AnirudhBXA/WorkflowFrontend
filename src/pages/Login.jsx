import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { Mail, Lock, Chrome, Github, ArrowRight } from "lucide-react";

function LoginComponent() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    // Front-end Validations
    if (!form.username || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.username.includes("@") && !isValidEmail(form.username)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", {
        identifier: form.username,
        password: form.password,
        rememberMe: form.remember,
      });

      const token = res.data.accessToken;
      if (form.remember) {
        localStorage.setItem("accessToken", token);
      } else {
        sessionStorage.setItem("accessToken", token);
      }

      login(token, form.remember, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex bg-white">
      <div className="hidden lg:flex w-3/5 bg-[#F5F3FF] flex-col justify-between p-12 relative overflow-hidden">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl relative z-10">
          <span className="admin-logo font-bold">darwinflow</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Manage your projects <br />
            <span className="text-indigo-600">with ease and precision.</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-md text-lg">
            The all-in-one workspace for your team to collaborate, plan, and
            execute flawlessly.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 items-center text-sm text-gray-500">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white"
              />
            ))}
          </div>
          <span>Join 10k+ teams managing work today.</span>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
            <p className="text-gray-500 mt-2">
              Enter your details to access your account
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700">
              <Chrome className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700">
              <Github className="w-5 h-5" /> GitHub
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                Keep me logged in
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9F5EA5] hover:bg-[#8a4e8f] text-white py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:shadow-none"
            >
              {loading ? "Verifying..." : "Sign In"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* <p className="text-center text-gray-500 text-sm mt-8">
            Don't have an account?{" "}
            <button className="text-indigo-600 font-semibold hover:underline">
              Create an account
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
