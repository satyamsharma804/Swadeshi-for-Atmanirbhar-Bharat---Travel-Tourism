import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: show password
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Animation effect when page loads
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Countdown effect when password is shown
  useEffect(() => {
    if (step === 3 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (step === 3 && countdown === 0) {
      navigate("/login");
    }
  }, [step, countdown, navigate]);

  const handleSubmitEmail = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok && (data.success || data.status === "success")) {
        setMessage({ type: "success", text: "OTP sent to your email" });
        setStep(2);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to send OTP" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage({ type: "error", text: "Please enter the OTP" });
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log('Verify OTP Response:', data); // Debug log
      
      if (response.ok && (data.success || data.status === "success")) {
        console.log('Password received:', data.password); // Debug log
        setMessage({ type: "success", text: "OTP verified successfully. Your password is shown below." });
        setUserPassword(data.password); // Store the password returned from the server
        setStep(3); // Move to password display step
      } else {
        setMessage({ type: "error", text: data.message || "Invalid OTP" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className={`transform transition-all duration-500 delay-100 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 rounded-xl p-4 w-full text-lg text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300"
              />
            </div>
            <button
              onClick={handleSubmitEmail}
              className={`w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-purple-500/30 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Send OTP
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-gray-300 text-center animate-fadeIn">
              An OTP has been sent to your email. Please enter it below.
            </p>
            <div className="flex justify-center animate-fadeIn">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-white/20 rounded-xl p-4 w-full text-lg text-center tracking-wider text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300"
                maxLength={6}
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-purple-500/30 animate-fadeIn"
            >
              Verify OTP
            </button>
            <div className="text-center animate-fadeIn">
              <button 
                onClick={() => handleSubmitEmail()} 
                className="text-purple-400 hover:text-purple-300 transition-all duration-300"
              >
                Resend OTP
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-gray-300 text-center">
              Here's your password. Please remember it carefully.
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                readOnly
                value={userPassword}
                className="bg-white/20 rounded-xl p-4 w-full text-lg text-center tracking-wider text-gray-200 outline-none border-2 border-purple-500/50"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-yellow-400">
                This page will redirect to login in {countdown} seconds
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-purple-500/30"
            >
              Return to Login
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-richblack-900 via-purple-900/20 to-richblack-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-pink-600/20 blur-3xl -bottom-10 -right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-3xl bottom-20 left-1/4 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className={`w-full h-screen flex items-center justify-center p-6 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md relative">
          {/* Back button */}
          <button 
            onClick={() => navigate('/login')} 
            className="absolute left-0 -top-16 text-white/70 hover:text-white flex items-center gap-2 transition-all duration-300 group"
          >
            <span className="text-2xl transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span className="font-medium">Back to Login</span>
          </button>

          {/* Forgot Password Card */}
          <div className={`bg-white/10 backdrop-blur-lg p-8 shadow-2xl rounded-2xl flex flex-col items-center border border-white/20 transform transition-all duration-500 hover:shadow-purple-500/20 ${isPageLoaded ? 'translate-y-0' : 'translate-y-10'}`}>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {step === 1 ? "Recover Password" : step === 2 ? "Verify OTP" : "Your Password"}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-8"></div>

            {/* Progress indicator */}
            <div className="w-full flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step >= s 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent' 
                        : 'bg-transparent border-gray-500'
                    }`}
                  >
                    <span className={`text-sm font-bold ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                      {s}
                    </span>
                  </div>
                  <span className={`text-xs mt-2 ${step >= s ? 'text-purple-300' : 'text-gray-500'}`}>
                    {s === 1 ? 'Email' : s === 2 ? 'OTP' : 'Password'}
                  </span>
                </div>
              ))}
              {/* Connecting lines */}
              <div className={`h-0.5 absolute w-1/4 left-[21%] top-[7.5rem] transition-all duration-700 ${step > 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}></div>
              <div className={`h-0.5 absolute w-1/4 right-[21%] top-[7.5rem] transition-all duration-700 ${step > 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}></div>
            </div>

            {message.text && (
              <div 
                className={`w-full ${message.type === 'error' ? 'bg-red-500/20 border-red-500/30' : 'bg-green-500/20 border-green-500/30'} backdrop-blur-md border rounded-xl p-4 text-white text-center mb-6 animate-fadeIn`}
              >
                {message.text}
              </div>
            )}

            {renderStep()}

            {step !== 3 && (
              <div className={`mt-8 text-gray-300 text-center transform transition-all duration-500 delay-300 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Remember your password?
                <span
                  className="text-purple-400 cursor-pointer font-semibold hover:underline hover:text-purple-300 transition duration-300 ml-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
