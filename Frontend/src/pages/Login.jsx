import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { API_ENDPOINTS } from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [loginType, setLoginType] = useState("user"); // "user" or "admin"

  // Animation effect when page loads
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleLogin = async () => {
    setErrorMessage(""); // Clear previous errors
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debugging

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email); // Store email in localStorage

      if (loginType === "admin" && data.is_admin) {
        localStorage.setItem("isAdmin", "true");
        setIsLoggedIn(true); // Notify context about login
        setTimeout(() => {
          navigate("/admin", { replace: true }); // Delay navigation to ensure state updates
        }, 100); // Small delay to ensure state propagation
      } else if (loginType === "user" && !data.is_admin) {
        localStorage.setItem("isAdmin", "false");
        setIsLoggedIn(true); // Notify context about login
        navigate("/", { replace: true }); // Ensure navigation replaces the current page
      } else {
        throw new Error("Invalid login type for this account.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
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

      <div className={`w-full h-screen flex flex-col items-center justify-center p-6 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md relative">
          {/* Back button */}
          <button 
            onClick={() => navigate('/')} 
            className="absolute left-0 -top-16 text-white/70 hover:text-white flex items-center gap-2 transition-all duration-300 group"
          >
            <span className="text-2xl transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span className="font-medium">Back</span>
          </button>

          {/* Login Card */}
          <div className={`bg-white/10 backdrop-blur-lg p-8 shadow-2xl rounded-2xl flex flex-col items-center border border-white/20 transform transition-all duration-500 hover:shadow-purple-500/20 ${isPageLoaded ? 'translate-y-0' : 'translate-y-10'}`}>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-8"></div>

            {errorMessage && (
              <div className="w-full bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 text-white text-center mb-6 animate-fadeIn">
                {errorMessage}
              </div>
            )}

            {/* Dropdown for login type */}
            <div className="w-full mb-6">
              <select
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
                className="w-full bg-white/20 rounded-xl p-4 text-lg text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300"
              >
                <option value="user">User Login</option>
                <option value="admin">Admin Login</option>
              </select>
            </div>

            <div className="w-full flex flex-col gap-6">
              <div className={`transform transition-all duration-500 delay-100 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 rounded-xl p-4 w-full text-lg text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300"
                />
              </div>
              
              <div className={`relative w-full transform transition-all duration-500 delay-200 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 rounded-xl p-4 w-full text-lg text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className={`mt-4 text-gray-300 w-full text-right transform transition-all duration-500 delay-300 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span
                className="text-purple-400 cursor-pointer font-semibold hover:underline hover:text-purple-300 transition duration-300"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            <button
              className={`w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-purple-500/30 mt-8 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              onClick={handleLogin}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </span>
            </button>

            <div className={`mt-6 text-gray-300 text-center transform transition-all duration-500 delay-500 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Don't have an account?
              <span
                className="text-purple-400 cursor-pointer font-semibold hover:underline hover:text-purple-300 transition duration-300 ml-2"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </div>

            <div className={`mt-8 relative w-full transform transition-all duration-500 delay-600 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/20 backdrop-blur-sm text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className={`mt-6 flex gap-4 transform transition-all duration-500 delay-700 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {["google", "facebook", "github", "linkedin"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="p-3 border border-gray-600 rounded-full hover:bg-gradient-to-r from-purple-400 to-pink-400 hover:text-white hover:border-transparent transition duration-300 group"
                >
                  <i className={`bx bxl-${icon} text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
