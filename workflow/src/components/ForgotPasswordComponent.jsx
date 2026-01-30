import { useEffect, useRef, useState } from "react";
import { Button } from '@chakra-ui/react'

function ForgotPasswordComponent(){

    const email = useRef("");
    const otp = useRef("");
    const password = useRef("");
    const verifyPassword = useRef("");

    // const otpsent = useRef(false);
    // const otpVerified = useRef(false);

    const [otpsent, setOtpsent] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)

    useEffect(()=> {
        console.log(otpsent,otpVerified)
    },[])

    function verifyEmail(){
        setOtpsent(true)
    }

    function verifyOtp(){
        setOtpVerified(true)
    }

    function savePassword(){

    }

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
          
          {/* Card */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            
    
            {/* Form */}
            <div className="space-y-5">
              
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  ref={email}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
    
              {/* <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  ref={password}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
    
              {/* Button */}
              <button
                onClick={verifyEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
              >
                Send otp
              </button>
            </div>
            
              
            { (otpsent && !otpVerified) && (
            <>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Otp
                </label>
                <input
                  type="text"
                  placeholder="Enter the otp"
                  ref={otp}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
              >
                Send otp
              </button>
              </>
              )}

            { (otpVerified && (
                <>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                    </label>
                    <input
                    type="password"
                    ref={password}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                    Verify Password
                    </label>
                    <input
                    type="password"
                    ref={verifyPassword}
                    placeholder="Enter your password again"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <button
                        onClick={savePassword}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
                    >
                        save
                    </button>

                </>
            ))}

          </div>
        </div>
        </>
    )

}

export default ForgotPasswordComponent;