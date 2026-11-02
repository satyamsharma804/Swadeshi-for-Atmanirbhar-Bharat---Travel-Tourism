import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    bio: '',
    gender: '',
    dob: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  
  // Location suggestions state and functionality
  const locationRef = useRef(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  
  // Animation states
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Predefined list of locations
  const predefinedLocations = [
    "New York, USA", "London, UK", "Tokyo, Japan", "Paris, France",
    "Mumbai, India", "Sydney, Australia", "Dubai, UAE", "Toronto, Canada",
    "Singapore", "Berlin, Germany", "Barcelona, Spain", "Hong Kong",
    "Amsterdam, Netherlands", "Istanbul, Turkey", "Bangkok, Thailand",
    "Rome, Italy", "Cairo, Egypt", "Johannesburg, South Africa", "Rio de Janeiro, Brazil",
    "Mexico City, Mexico", "Seoul, South Korea", "Beijing, China"
  ];

  // Set page as loaded for animations
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Filter suggestions based on user input
  useEffect(() => {
    if (form.location.trim() === '') {
      setLocationSuggestions(predefinedLocations);
    } else {
      const filtered = predefinedLocations.filter(loc => 
        loc.toLowerCase().includes(form.location.toLowerCase())
      );
      setLocationSuggestions(filtered);
    }
  }, [form.location]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [locationRef]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationClick = (location) => {
    setForm({ ...form, location });
    setShowLocationDropdown(false);
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      alert(result.message);
      if (result.success) navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Form section styling
  const sectionStyle = "bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-white/15";
  const headerStyle = "text-xl font-semibold text-purple-300 mb-3 flex items-center gap-2";
  const inputStyle = "bg-white/20 rounded-xl p-3 w-full text-sm text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300";

  return (
    <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-richblack-900 via-purple-900/20 to-richblack-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-pink-600/20 blur-3xl -bottom-10 -right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-3xl bottom-20 left-1/4 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className={`w-full h-full flex flex-col items-center justify-center p-6 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-6xl relative">
          {/* Back button - Without background */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }} 
            className="absolute left-4 top-4 z-50 text-white/80 hover:text-white flex items-center gap-2 transition-all duration-300 group"
          >
            <span className="text-2xl transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span className="font-medium">Back to Home</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8 transform transition-all duration-700">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent mb-4">
              Begin Your Journey
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Create your account to plan your next adventure and discover the world with us.
            </p>
            <div className="w-40 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-5"></div>
          </div>

          {/* Form sections with staggered entrance */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Personal Information */}
            <div className={`${sectionStyle} transform transition-all duration-700 delay-100 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">👤</span> Personal Information
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`${inputStyle} cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={form.dob}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`${sectionStyle} transform transition-all duration-700 delay-200 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">📱</span> Contact Details
              </h3>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <div className="relative" ref={locationRef}>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={form.location}
                    onChange={handleChange}
                    onFocus={() => setShowLocationDropdown(true)}
                    className={inputStyle}
                  />
                  {showLocationDropdown && locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-black/50 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg">
                      {locationSuggestions.map((location, index) => (
                        <div
                          key={index}
                          className="p-3 cursor-pointer hover:bg-white/20 text-gray-200 text-sm transition-colors duration-200"
                          onClick={() => handleLocationClick(location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className={`${sectionStyle} transform transition-all duration-700 delay-300 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">🔒</span> Security
              </h3>
              <div className="space-y-4">
                {["password", "confirmPassword"].map((field) => (
                  <div className="relative w-full" key={field}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name={field}
                      placeholder={field === "password" ? "Create Password" : "Confirm Password"}
                      value={form[field]}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className={`${sectionStyle} transform transition-all duration-700 delay-400 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">✨</span> About You
              </h3>
              <div className="space-y-4">
                <textarea
                  name="bio"
                  placeholder="Tell us about yourself and your travel preferences..."
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  className={`${inputStyle} resize-none`}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit button and login link */}
          <div className="flex flex-col items-center space-y-6 mt-4">
            <button
              className={`w-full max-w-md h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 bg-size-200 animate-gradient ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              onClick={handleSignup}
              style={{ transitionDelay: '600ms' }}
            >
              <span className="text-xl">✨</span>
              Start Your Adventure
            </button>

            <div className={`mt-6 text-gray-300 text-center transition-all duration-700 delay-700 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Already have an account?{' '}
              <span
                className="text-purple-400 cursor-pointer font-semibold hover:underline hover:text-purple-300 transition duration-300 ml-1"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
