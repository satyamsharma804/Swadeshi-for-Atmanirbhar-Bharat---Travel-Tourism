import { VscChromeClose } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMapMarkerAlt, FaUsers, FaHotel, FaLightbulb, FaCompass } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { UserContext } from "../App";
import MeetOurTeam from "./MeetOurTeam";


export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [navbarState, setNavbarState] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedImage = localStorage.getItem("profileImage");
    const storedName = localStorage.getItem("userName");

    setIsLoggedIn(!!token);
    // Only use storedImage if it's not empty, otherwise use default
    const defaultImage = "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg";
    setProfileImage((storedImage && storedImage.trim() !== "") ? storedImage : defaultImage);

    if (storedName) {
      const nameParts = storedName.split(" ");
      const initials =
        nameParts.length > 1
          ? nameParts[0][0] + nameParts[1][0]
          : nameParts[0][0];
      setUserInitials(initials.toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    navigate("/login");
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const exploreRoutes = {
    Destinations: () => isAuthenticated() && navigate("/recommend"),
    Activities: () => isAuthenticated() && navigate("/activities"),
    Accommodation: () => isAuthenticated() && navigate("/accommodation"),
    TravelTips: "/travel-tips", // No authentication required
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Accommodation", path: "/accommodation" },
    { name: "My Bookings", path: "/my-bookings" },
    // { name: "Meet Our Team", path: "/meet-our-team" },
  ];

  return (
    <nav className="w-full px-6 py-4 text-white bg-opacity-30 backdrop-blur-md border-b border-gray-500 shadow-lg relative z-50 ">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold uppercase tracking-wide hover:text-teal-400 transition duration-300"
        >
          <img src={Logo} alt="Logo" className="w-35 h-16 rounded-lg " />
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={() => setNavbarState(!navbarState)}>
          {navbarState ? (
            <VscChromeClose className="text-3xl cursor-pointer hover:text-teal-400 transition duration-300" />
          ) : (
            <GiHamburgerMenu className="text-3xl cursor-pointer hover:text-teal-400 transition duration-300" />
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center z-50">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-lg hover:text-teal-400 transition duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-lg flex items-center hover:text-teal-400 transition duration-300"
            >
              Explore
              <svg
                className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {dropdownOpen && (
              <motion.ul 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-full mt-2 w-40 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-xl shadow-xl overflow-hidden z-100"
              >
                {/* Enhanced glassmorphism background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-teal-600/10 rounded-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-teal-600/20 rounded-xl blur-md opacity-60"></div>
                <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                
                {/* Glowing edge effect */}
                <div className="absolute inset-0 border border-white/30 rounded-xl opacity-20 
                     [box-shadow:0_0_15px_rgba(255,255,255,0.3),inset_0_0_15px_rgba(255,255,255,0.1)] animate-pulse"></div>
                
                <div className="relative z-10">
                  {Object.keys(exploreRoutes).map((item, index) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative"
                    >
                      <button
                        onClick={() =>
                          typeof exploreRoutes[item] === "function"
                            ? exploreRoutes[item]()
                            : navigate(exploreRoutes[item])
                        }
                        className="relative z-10 w-full flex items-center space-x-2 px-3 py-2 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 
                              group-hover:from-purple-500/40 group-hover:to-teal-500/40 transition-all duration-300
                              shadow-[0_0_10px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                          {item === "Destinations" && <FaMapMarkerAlt className="text-purple-300 group-hover:text-purple-100 text-sm" />}
                          {item === "Activities" && <FaUsers className="text-blue-300 group-hover:text-blue-100 text-sm" />}
                          {item === "Accommodation" && <FaHotel className="text-teal-300 group-hover:text-teal-100 text-sm" />}
                          {item === "TravelTips" && <FaLightbulb className="text-amber-300 group-hover:text-amber-100 text-sm" />}
                        </span>
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">{item}</span>
                        
                        {/* Hover indicator line */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent 
                               group-hover:w-full transition-all duration-500"></span>
                      </button>
                    </motion.li>
                  ))}
                  
                  <div className="px-3 py-1.5 border-t border-white/20 bg-white/5">
                    <div className="text-xs text-white/60 flex items-center gap-1">
                      <FaCompass className="text-teal-400 animate-pulse text-xs" />
                      <span className="truncate">Explore destinations</span>
                    </div>
                  </div>
                </div>
              </motion.ul>
            )}
          </li>
        </ul>
          {/* <buttom className="text-bold">Meet our Team</buttom> */}
        {/* Profile / Login */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/booking">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md">
              Book Now
            </button>
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              {profileImage && profileImage.trim() !== "" ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:shadow-md transition duration-300"
                  onClick={() =>
                    setProfileDropdownOpen(!profileDropdownOpen)
                  }
                />
              ) : (
                <div 
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:shadow-md transition duration-300 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold"
                  onClick={() =>
                    setProfileDropdownOpen(!profileDropdownOpen)
                  }
                >
                  {userInitials || "U"}
                </div>
              )}
              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <motion.ul 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-xl shadow-xl overflow-hidden z-100"
                >
                  {/* Enhanced glassmorphism background layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 rounded-xl"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-md opacity-60"></div>
                  <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                  
                  {/* Glowing edge effect */}
                  <div className="absolute inset-0 border border-white/30 rounded-xl opacity-20 
                       [box-shadow:0_0_15px_rgba(255,255,255,0.3),inset_0_0_15px_rgba(255,255,255,0.1)] animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                      className="relative"
                    >
                      <Link
                        to="/profile"
                        className="relative z-10 w-full flex items-center space-x-2 px-3 py-2 hover:bg-white/10 transition-all duration-300 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                              group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300
                              shadow-[0_0_10px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                          <svg className="w-4 h-4 text-purple-300 group-hover:text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">My Profile</span>
                        
                        {/* Hover indicator line */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent 
                               group-hover:w-full transition-all duration-500"></span>
                      </Link>
                    </motion.li>
                    
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative"
                    >
                      <Link
                        to="/my-bookings"
                        className="relative z-10 w-full flex items-center space-x-2 px-3 py-2 hover:bg-white/10 transition-all duration-300 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 
                              group-hover:from-blue-500/40 group-hover:to-teal-500/40 transition-all duration-300
                              shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                          <svg className="w-4 h-4 text-blue-300 group-hover:text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">My Bookings</span>
                        
                        {/* Hover indicator line */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent 
                               group-hover:w-full transition-all duration-500"></span>
                      </Link>
                    </motion.li>
                    
                    {/* Add Ask Query option */}
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="relative"
                    >
                      <Link
                        to="/user-queries"
                        className="relative z-10 w-full flex items-center space-x-2 px-3 py-2 hover:bg-white/10 transition-all duration-300 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 
                              group-hover:from-amber-500/40 group-hover:to-orange-500/40 transition-all duration-300
                              shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                          <svg className="w-4 h-4 text-amber-300 group-hover:text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </span>
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">Ask Query</span>
                        
                        {/* Hover indicator line */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent 
                               group-hover:w-full transition-all duration-500"></span>
                      </Link>
                    </motion.li>
                    
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <button
                        onClick={handleLogout}
                        className="relative z-10 w-full flex items-center space-x-2 px-3 py-2 hover:bg-red-500/30 transition-all duration-300 group"
                      >
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 
                              group-hover:from-red-500/40 group-hover:to-orange-500/40 transition-all duration-300
                              shadow-[0_0_10px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                          <svg className="w-4 h-4 text-red-300 group-hover:text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </span>
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">Logout</span>
                        
                        {/* Hover indicator line */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-red-400 to-transparent 
                              group-hover:w-full transition-all duration-500"></span>
                      </button>
                    </motion.li>
                    
                    <div className="px-3 py-1.5 border-t border-white/20 bg-white/5">
                      <div className="text-xs text-white/60 flex items-center justify-center">
                        <span className="truncate text-center">{userInitials || "User"}</span>
                      </div>
                    </div>
                  </div>
                </motion.ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarState && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 bg-opacity-70 backdrop-blur-md shadow-lg border-t border-gray-700">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-lg hover:text-teal-400 transition duration-300"
                  onClick={() => setNavbarState(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <button className="px-6 py-2 text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 rounded-lg text-lg uppercase hover:shadow-md transition duration-300">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
