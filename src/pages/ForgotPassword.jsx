// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";

// function ForgotPasswordComponent() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     email: "",
//     otp: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function sendOtp() {
//     try {
//       setLoading(true);
//       setError("");
//       await axiosInstance.post("/auth/request-reset", { email: form.email });
//       setMessage("Reset Link sent to your email");
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function verifyOtp() {
//     try {
//       setLoading(true);
//       setError("");
//       await axiosInstance.post("/auth/reset", {
//         email: form.email,
//         otp: form.otp,
//       });
//       setMessage("OTP verified");
//       setStep(3);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function resetPassword() {
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await axiosInstance.post("/auth/reset-password", {
//         email: form.email,
//         password: form.password,
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-indigo-100 px-4">
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100 space-y-5">
//         <h2 className="text-xl font-semibold text-center text-gray-800">
//           Reset Password
//         </h2>

//         {message && (
//           <p className="text-sm text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
//             {message}
//           </p>
//         )}
//         {error && (
//           <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
//             {error}
//           </p>
//         )}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={sendOtp}
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter OTP"
//               value={form.otp}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={verifyOtp}
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </>
//         )}

//         {step === 3 && (
//           <>
//             <input
//               type="password"
//               name="password"
//               placeholder="New password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm password"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={resetPassword}
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg"
//             >
//               {loading ? "Saving..." : "Reset Password"}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => navigate("/login")}
//           className="text-sm text-indigo-600 hover:underline w-full text-center"
//         >
//           Back to Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ForgotPasswordComponent;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function ForgotPasswordComponent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendResetLink() {
    try {
      setLoading(true);
      setError("");
      await axiosInstance.post("/auth/request-reset", {
        email: form.email,
      });
      setMessage("A password reset link has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100 space-y-5">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>

        {message && (
          <p className="text-sm text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendResetLink}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          onClick={() => navigate("/login")}
          className="text-sm text-indigo-600 hover:underline w-full text-center"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
