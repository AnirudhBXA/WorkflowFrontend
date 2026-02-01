import { useRef } from "react";
import { useNavigation } from "react-router-dom";

function LoginComponent(){

    const username = useRef("")
    const password = useRef("")

    // const navigate = useNavigation()

    async function handleLogin(){

        

        let payload = {
            "username" : username.current?.value,
            "password" : password.current?.value
        }

        fetch(loginUrl).then(
            (response) => response.json
        ).then(
            (date) => {
                console.log(data);

                // storing the keys in the cookies
                
                navigate("/dashboard")

            }
        ).catch()
    }

    function handleForgotPassword(){

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
          
          {/* Card */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-blue-700">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Please login to your account
              </p>
            </div>
    
            {/* Form */}
            <form className="space-y-5" onSubmit={handleLogin}>
              
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  ref={username}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
    
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  ref={password}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
    
              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
    
                <a onClick={handleForgotPassword} className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
    
              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      );
}

export default LoginComponent;