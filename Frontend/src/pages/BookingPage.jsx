import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import activitiesData from "../data/Activities"; // Import activities data

export default function BookingPage() {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [bookingDates, setBookingDates] = useState(null);
  const [numNights, setNumNights] = useState(1);
  const [members, setMembers] = useState([{ name: "", age: "" }]);
  const [selectedActivities, setSelectedActivities] = useState([]); // Add state for selected activities

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => setMembers([...members, { name: "", age: "" }]);
  const removeMember = (index) => setMembers(members.filter((_, i) => i !== index));

  // Function to toggle activity selection
  const toggleActivity = (activity) => {
    if (selectedActivities.some(a => a.id === activity.id)) {
      setSelectedActivities(selectedActivities.filter(a => a.id !== activity.id));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Calculate total activities cost
  const activitiesTotalCost = selectedActivities.reduce((sum, activity) => sum + activity.price, 0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedDates = sessionStorage.getItem("bookingDates");
    if (storedDates) {
      const dates = JSON.parse(storedDates);
      setBookingDates(dates);
      const timeDiff = new Date(dates.checkOut) - new Date(dates.checkIn);
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setNumNights(nights > 0 ? nights : 1);
    }
    const storedDestination = sessionStorage.getItem("selectedDestination");
    const storedAccommodation = sessionStorage.getItem("selectedAccommodation");
    if (storedDestination) setSelectedDestination(JSON.parse(storedDestination));
    if (storedAccommodation) setSelectedAccommodation(JSON.parse(storedAccommodation));
  }, []);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      setBookingDates({
        checkIn: start.toISOString(),
        checkOut: end.toISOString()
      });
      const timeDiff = end - start;
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setNumNights(nights > 0 ? nights : 1);
      sessionStorage.setItem("bookingDates", JSON.stringify({
        checkIn: start.toISOString(),
        checkOut: end.toISOString()
      }));
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const datePickerSection = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Select Dates</label>
        <DatePicker
          selected={bookingDates ? new Date(bookingDates.checkIn) : null}
          onChange={handleDateChange}
          startDate={bookingDates ? new Date(bookingDates.checkIn) : null}
          endDate={bookingDates ? new Date(bookingDates.checkOut) : null}
          selectsRange
          minDate={new Date()}
          monthsShown={2}
          dateFormat="MMM dd, yyyy"
          className="w-full bg-black/30 text-white p-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholderText="Select check-in and check-out dates"
          calendarClassName="custom-datepicker"
        />
      </div>
    </div>
  );

  const accommodationContent = selectedAccommodation ? (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl">
        <img 
          src={selectedAccommodation.image}
          alt={selectedAccommodation.title}
          className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="px-3 py-1 text-xs font-medium bg-purple-600 text-white rounded-full">
            Premium
          </span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl font-bold">{selectedAccommodation.title}</h3>
          <button
            onClick={() => navigate("/accommodation")}
            className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 transition-colors text-sm flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Change Room</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {datePickerSection}
          
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300">Stay duration</p>
                <p className="text-xl font-bold">{numNights} {numNights === 1 ? 'night' : 'nights'}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300">Total price</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
                  Rs. {(selectedAccommodation.cost * numNights).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="w-24 h-24 rounded-full bg-purple-600/20 flex items-center justify-center">
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <p className="text-xl text-gray-300 text-center">
        Choose where you'd like to stay
      </p>
      <button
        onClick={() => navigate("/accommodation")}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition duration-300 transform hover:-translate-y-1"
      >
        Choose Accommodation
      </button>
    </div>
  );

  const styles = `
    .custom-datepicker {
      background-color: rgba(0, 0, 0, 0.8) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 0.75rem !important;
      color: white !important;
      font-family: inherit !important;
    }
    
    .custom-datepicker .react-datepicker__header {
      background-color: rgba(0, 0, 0, 0.5) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    
    .custom-datepicker .react-datepicker__day {
      color: white !important;
    }
    
    .custom-datepicker .react-datepicker__day:hover {
      background-color: rgba(219, 39, 119, 0.5) !important;
    }
    
    .custom-datepicker .react-datepicker__day--selected,
    .custom-datepicker .react-datepicker__day--in-range {
      background-color: rgb(219, 39, 119) !important;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="min-h-screen  bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
      >
        {/* Header Section */}
        <div className="w-full bg-black/30 backdrop-blur-md py-6 border-b border-white/10 shadow-xl mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Complete Your Booking
            </h1>
            <p className="text-gray-300 mt-2 text-lg">Just a few more steps to confirm your dream vacation</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Destination Card */}
            <motion.div variants={itemVariants} className="h-full">
              <div className="relative group h-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl border border-white/20 shadow-2xl transition duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="p-8">
                  <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                    Destination
                  </h2>
                  
                  {selectedDestination ? (
                    <div className="space-y-6">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img 
                          src={selectedDestination.image}
                          alt={selectedDestination.title}
                          className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-3xl font-bold">{selectedDestination.title}</h3>
                          <button
                            onClick={() => {
                              sessionStorage.removeItem("selectedDestination");
                              navigate("/recommend");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/30 transition-colors text-sm flex items-center gap-2"
                          >
                            <span>Change Destination</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center mt-2">
                          <svg className="w-5 h-5 text-blue-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <p className="text-blue-200">{selectedDestination.location}</p>
                        </div>
                        
                        <p className="mt-4 text-gray-300 leading-relaxed">
                          {selectedDestination.description}
                        </p>
                        
                        <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                          <div className="flex justify-between items-center">
                            <p className="text-gray-300">Price</p>
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
                              Rs. {selectedDestination.cost}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 space-y-6">
                      <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <p className="text-xl text-gray-300 text-center">
                        Pick your dream destination to continue
                      </p>
                      <button
                        onClick={() => navigate("/recommend")}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition duration-300 transform hover:-translate-y-1"
                      >
                        Choose Destination
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Accommodation Card */}
            <motion.div variants={itemVariants} className="h-full">
              <div className="relative group h-full overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-white/20 shadow-2xl transition duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="p-8">
                  <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
                    Accommodation
                  </h2>
                  
                  {accommodationContent}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Optional Activities Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 rounded-3xl bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Optional Activities</h2>
                  <p className="text-gray-300 text-sm">Enhance your travel experience with these activities</p>
                </div>
                
                <div className="ml-auto text-right">
                  <div className="text-gray-300">Total Added:</div>
                  <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
                    Rs. {activitiesTotalCost}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activitiesData.slice(0, 6).map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedActivities.some(a => a.id === activity.id) 
                        ? "bg-purple-600/30 border-purple-500" 
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => toggleActivity(activity)}
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{activity.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                          </svg>
                          {activity.location}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-indigo-300 font-semibold">Rs. {activity.price}</span>
                          <span className="text-xs text-gray-400">{activity.duration}</span>
                        </div>
                      </div>
                    </div>
                    {selectedActivities.some(a => a.id === activity.id) && (
                      <div className="mt-2 text-xs flex justify-end text-purple-300">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Selected
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button 
                  className="px-5 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 transition flex items-center"
                  onClick={() => navigate("/activities")}
                >
                  View All Activities
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Group Members Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Travel Companions</h2>
              </div>
              
              <div className="space-y-4">
                {members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-gray-400 mb-1 block">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div className="md:w-32">
                        <label className="text-xs font-medium text-gray-400 mb-1 block">Age</label>
                        <input
                          type="number"
                          placeholder="Age"
                          value={member.age}
                          onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => removeMember(index)}
                          className="w-full md:w-auto p-3 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 border border-red-500/30 transition focus:outline-none"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <button
                  onClick={addMember}
                  className="w-full py-3 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200 border border-blue-600/30 transition focus:outline-none group flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Travel Companion
                </button>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              className="py-4 px-8 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 transition font-medium flex items-center justify-center group"
              onClick={() => {
                setSelectedDestination(null);
                setSelectedAccommodation(null);
                setBookingDates(null);
                setSelectedActivities([]);
                sessionStorage.removeItem("selectedDestination");
                sessionStorage.removeItem("selectedAccommodation");
                sessionStorage.removeItem("bookingDates");
                sessionStorage.removeItem("selectedActivities");
              }}
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Selections
            </button>
            
            <button
              className={`py-4 px-8 rounded-xl font-medium flex items-center justify-center transition ${
                selectedDestination && selectedAccommodation && bookingDates
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1"
                  : "bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-700"
              }`}
              disabled={!selectedDestination || !selectedAccommodation || !bookingDates}
              onClick={() => {
                sessionStorage.setItem("members", JSON.stringify(members));
                sessionStorage.setItem("selectedActivities", JSON.stringify(selectedActivities));
                navigate("/payment");
              }}
            >
              <span>Proceed to Payment</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}


