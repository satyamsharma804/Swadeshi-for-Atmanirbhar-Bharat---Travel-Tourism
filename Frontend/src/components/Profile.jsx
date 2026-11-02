import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsCloudMoon, BsCloudSun, BsSun } from "react-icons/bs";
import { FaMapMarkedAlt, FaPlane, FaGlobeAmericas, FaPassport, FaCompass } from "react-icons/fa";
import { API_ENDPOINTS } from "../config/api";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    gender: "",
    dob: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const locationRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [isSaving, setIsSaving] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "Hyderabad",
    "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore",
    "Bhopal", "Surat", "Vadodara", "Ludhiana", "Agra", "Varanasi", "Prayagraj",
    "Meerut", "Patna", "Ranchi", "Bhubaneswar", "Guwahati", "Dehradun",
    "Chandigarh", "Amritsar", "Jalandhar", "Faridabad", "Gurgaon", "Noida",
    "Ghaziabad", "Coimbatore", "Madurai", "Visakhapatnam", "Vijayawada",
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Mangaluru", "Mysuru",
    "Hubballi", "Belagavi", "Nashik", "Aurangabad", "Kolhapur", "Solapur",
    "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Gwalior", "Jabalpur",
    "Raipur", "Bilaspur", "Siliguri", "Durgapur", "Asansol", "Cuttack",
    "Jamshedpur", "Srinagar", "Jammu", "Shimla", "Manali", "Leh", "Panaji",
    "Margao", "Vasco da Gama"
  ];

  const travelIcons = [
    { icon: <FaPlane />, size: 24, speed: 20, delay: 0 },
    { icon: <FaMapMarkedAlt />, size: 30, speed: 35, delay: 5 },
    { icon: <FaGlobeAmericas />, size: 40, speed: 45, delay: 12 },
    { icon: <FaPassport />, size: 22, speed: 28, delay: 18 },
    { icon: <FaCompass />, size: 26, speed: 30, delay: 25 },
    { icon: <FaPlane />, size: 18, speed: 22, delay: 30 },
    { icon: <FaMapMarkedAlt />, size: 34, speed: 40, delay: 15 },
    { icon: <FaGlobeAmericas />, size: 28, speed: 32, delay: 8 },
  ];

  // Enhanced background scenes with more stunning images
  const backgroundScenes = [
    {
      url: "./assets/aurora-bg.jpg", // Northern lights background
      position: "center",
      opacity: 0.22,
      name: "Aurora Borealis"
    },
    {
      url: "./assets/paradise-beach.jpg", // Tropical paradise background
      position: "center",
      opacity: 0.18,
      name: "Tropical Paradise" 
    },
    {
      url: "./assets/mountain-sunset.jpg", // Mountain sunset background
      position: "bottom",
      opacity: 0.20,
      name: "Mountain Sunset"
    }
  ];

  const [selectedBackground, setSelectedBackground] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundScenes.length);
    setSelectedBackground(randomIndex);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = '';
    let icon = null;

    if (hour >= 5 && hour < 12) {
      greetingText = 'Good Morning';
      icon = <BsSun className="text-yellow-400 text-xl mr-2" />;
    } else if (hour >= 12 && hour < 17) {
      greetingText = 'Good Afternoon';
      icon = <BsCloudSun className="text-orange-400 text-xl mr-2" />;
    } else {
      greetingText = 'Good Evening';
      icon = <BsCloudMoon className="text-blue-400 text-xl mr-2" />;
    }

    setGreeting({ text: greetingText, icon });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsPageLoaded(true);

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get email from localStorage
        const email = localStorage.getItem("userEmail");
        
        if (!email) {
          throw new Error("User not logged in");
        }
        
        const response = await fetch(`${API_ENDPOINTS.GET_USER_DATA}?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUserData(data);
        
        // Load profile photo from database if available
        if (data.profile_photo) {
          setProfileImage(data.profile_photo);
          localStorage.setItem("profileImage", data.profile_photo);
        } else {
          // Fallback to localStorage if no photo in database
          const savedImage = localStorage.getItem("profileImage");
          if (savedImage) {
            setProfileImage(savedImage);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message || "Unable to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [locationRef]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (name === "location") {
      if (value) {
        const filteredSuggestions = cities.filter((city) =>
          city.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (city) => {
    setUserData((prev) => ({ ...prev, location: city }));
    setSuggestions([]);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        
        // Save to localStorage immediately for instant feedback
        localStorage.setItem("profileImage", base64Image);
        if (userData.name) {
          localStorage.setItem("userName", userData.name);
        }

        // Save to database
        try {
          const email = localStorage.getItem("userEmail");
          const response = await fetch(API_ENDPOINTS.UPDATE_USER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              profile_photo: base64Image
            }),
          });

          const data = await response.json();
          if (response.ok && (data.success || data.message)) {
            setMessage("Profile photo updated successfully!");
            window.dispatchEvent(new Event('profileImageUpdated'));
            setTimeout(() => setMessage(""), Number(3000));
          } else {
            throw new Error(data.message || "Failed to update profile photo");
          }
        } catch (err) {
          console.error("Error saving profile photo:", err);
          setError("Profile photo saved locally but failed to sync to server");
          setTimeout(() => setError(""), 5000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const saveDetails = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Update failed");
      }

      setMessage(data.message || "Profile updated successfully");
      setError("");

      localStorage.setItem("userName", userData.name);

      window.dispatchEvent(new Event('userDataUpdated'));

      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
      setMessage("");
      setIsSaving(false);
    }
  };

  const sectionStyle = "bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-white/15 transform perspective-1000";
  const headerStyle = "text-xl font-semibold text-purple-300 mb-3 flex items-center gap-2";
  const inputStyle = "bg-white/20 rounded-xl p-3 w-full text-sm text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/30 transition duration-300";

  return (
    <div className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-indigo-900/90 via-purple-800/90 to-pink-900/90">
      <div className="absolute inset-0 overflow-hidden -z-5">
        {/* Enhanced main background styling */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: backgroundScenes[selectedBackground].opacity }}
          transition={{ duration: 1.5 }}
          style={{ 
            backgroundImage: `url('${backgroundScenes[selectedBackground].url}')`,
            backgroundPosition: backgroundScenes[selectedBackground].position,
            transformOrigin: 'center',
            filter: 'saturate(1.4) contrast(1.2)'
          }}
        />

        {/* Enhanced gradient overlay for better contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-800/30 to-pink-800/50"></div>
        
        {/* Added subtle pattern overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://i.imgur.com/H6Msojh.png')] opacity-5 mix-blend-overlay"></div>
        
        {/* Animated particles effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                y: [null, '-100vh'],
                opacity: [null, 0]
              }}
              transition={{ 
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Enhanced spotlight effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-600/15 blur-[150px] rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.2, 0.15] 
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-pink-600/15 blur-[120px] rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15] 
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          ></motion.div>
        </div>
        
        {/* Scene selector controls with improved styling */}
        <div className="absolute bottom-6 right-6 flex space-x-3 z-10">
          {backgroundScenes.map((scene, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                selectedBackground === index 
                  ? 'bg-white/90 scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-transparent' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => setSelectedBackground(index)}
              aria-label={`Switch to ${scene.name} background`}
            />
          ))}
        </div>
        
        {/* Enhanced floating travel icons */}
        <div className="absolute inset-0 overflow-hidden">
          {travelIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-white/20"
              initial={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: 0.1 + Math.random() * 0.15
              }}
              animate={{ 
                x: ["0%", "100%", "50%", "80%", "20%", "0%"],
                y: ["0%", "50%", "100%", "70%", "30%", "0%"],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.1, 0.2, 0.1, 0.25, 0.1]
              }}
              transition={{ 
                duration: item.speed,
                ease: "linear",
                repeat: Infinity,
                delay: item.delay,
                repeatType: "reverse"
              }}
              style={{ 
                fontSize: item.size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced mouse-following effects */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-3xl -top-10 -left-10 animate-pulse"
          style={{ 
            x: mousePosition.x * -40,
            y: mousePosition.y * -40
          }}
        ></motion.div>
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-pink-600/10 blur-3xl -bottom-10 -right-10 animate-pulse" 
          style={{ 
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
            animationDelay: '2s' 
          }}
        ></motion.div>
        
        {/* Added shimmer effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className="absolute -inset-[10%] rotate-12 skew-y-12 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 0.05, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
      <div className={`w-full min-h-screen flex items-center justify-center p-6 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-10 transform transition-all duration-700"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            <div className="flex items-center justify-center mb-3">
              {greeting.icon}
              <h2 className="text-2xl font-bold text-white">{greeting.text}, {userData.name?.split(" ")[0] || "Traveler"}!</h2>
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent mb-4">
              Your Travel Profile
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Customize your profile for a personalized experience
            </p>
            <div className="w-40 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-5"></div>
          </motion.div>

          <motion.div
            className="mb-10 bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.15)" }}
          >
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <motion.div
                  className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500/30 cursor-pointer group"
                  onClick={triggerFileInput}
                  whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.5)" }}
                >
                  {profileImage ? (
                    <motion.img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                      <span className="text-4xl text-white/60">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : "T"}
                      </span>
                    </div>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span className="text-white text-sm font-medium">Change Photo</span>
                  </motion.div>
                </motion.div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">{userData.name || "Traveler"}</h3>
                  <p className="text-gray-400">{userData.email || "Email not available"}</p>
                  <p className="text-sm text-purple-300 mt-2">Click on the image to change your profile picture</p>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="w-full max-w-3xl mx-auto mb-6 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {error}
              </motion.div>
            )}
            {message && (
              <motion.div
                className="w-full max-w-3xl mx-auto mb-6 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-xl p-4 text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              className={sectionStyle}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">👤</span> Personal Information
              </h3>

              <div className="space-y-4">
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className={inputStyle}
                  whileFocus={{ scale: 1.02 }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.select
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                    className={`${inputStyle} cursor-pointer appearance-none`}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </motion.select>
                  <motion.input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={userData.dob}
                    onChange={handleInputChange}
                    className={inputStyle}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className={sectionStyle}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">📱</span> Contact Details
              </h3>
              <div className="space-y-4">
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={handleInputChange}
                  className={`${inputStyle} opacity-70`}
                  disabled
                  whileHover={{ scale: 1.02 }}
                />
                <motion.input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className={inputStyle}
                  whileFocus={{ scale: 1.02 }}
                />
                <div className="relative" ref={locationRef}>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={userData.location}
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                  {suggestions.length > 0 && (
                    <motion.div 
                      className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-black/80 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ position: 'absolute', top: '100%', left: 0 }}
                    >
                      {suggestions.map((city, index) => (
                        <motion.div
                          key={index}
                          className="p-3 cursor-pointer hover:bg-white/20 text-gray-200 text-sm transition-colors duration-200"
                          onClick={() => handleSuggestionClick(city)}
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          {city}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`${sectionStyle} col-span-1 lg:col-span-2`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className={headerStyle}>
                <span className="text-pink-400 text-2xl">✨</span> About You
              </h3>
              <div className="space-y-4">
                <motion.textarea
                  name="bio"
                  placeholder="Share your travel style, dream destinations, and favorite travel memories..."
                  value={userData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className={`${inputStyle} resize-none`}
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className={`w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 overflow-hidden relative`}
              onClick={saveDetails}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSaving}
            >
              {isSaving ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                >
                  <span className="text-xl">✅</span>
                  <span className="ml-2">Saved!</span>
                </motion.div>
              ) : (
                <>
                  <span className="text-xl">💾</span>
                  Save Changes
                </>
              )}
            </motion.button>

            <motion.button
              className="w-full sm:w-auto text-purple-400 hover:text-purple-300 transition-all duration-300"
              onClick={() => navigate('/')}
              whileHover={{ x: -5 }}
            >
              Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;