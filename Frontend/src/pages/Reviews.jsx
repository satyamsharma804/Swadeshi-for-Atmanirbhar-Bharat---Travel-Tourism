import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaHistory, FaPaperPlane, FaMapMarkerAlt, FaHotel, FaCalendarAlt } from "react-icons/fa";
import { API_ENDPOINTS } from "../config/api";

export default function Reviews() {
  const navigate = useNavigate();
  const [pastBookings, setPastBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    
    if (!token || !userEmail) {
      navigate("/login");
      return;
    }
    
    // Fetch user's past bookings
    fetchPastBookings(userEmail);
  }, [navigate]);
  
  const fetchPastBookings = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.GET_BOOKINGS_FOR_REVIEW}?email=${email}`);
      const data = await response.json();
      
      if (data.success || data.status === "success") {
        // Make sure any image URLs are never empty strings
        const processedBookings = data.bookings.map(booking => ({
          ...booking,
          // If there are any image fields, ensure they have default values
          image: booking.image || null // Replace with default image path if needed
        }));
        setPastBookings(processedBookings);
      } else {
        setNotification({ 
          type: "error", 
          message: data.message || "Failed to load your bookings" 
        });
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setNotification({ 
        type: "error", 
        message: "Network error. Please check your connection and try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
    // Check if booking already has a review
    if (booking.has_review) {
      setRating(parseInt(booking.rating) || 0);
      setReviewText(booking.review_text || "");
      setNotification({
        type: "info",
        message: "You've already reviewed this booking. You can update your review if you wish."
      });
    } else {
      // Reset form for new review
      setRating(0);
      setReviewText("");
      setNotification({ type: "", message: "" });
    }
  };
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!selectedBooking) {
      setNotification({ type: "error", message: "Please select a booking to review" });
      return;
    }
    
    if (rating === 0) {
      setNotification({ type: "error", message: "Please select a star rating" });
      return;
    }
    
    setIsSubmitting(true);
    const userEmail = localStorage.getItem("userEmail");
    
    try {
      const response = await fetch(API_ENDPOINTS.SUBMIT_REVIEW, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: selectedBooking.booking_id,
          user_email: userEmail,
          rating: rating,
          review_text: reviewText,
          destination: selectedBooking.destination,
          accommodation: selectedBooking.accommodation
        }),
      });
      
      const data = await response.json();
      
      if (data.success || data.status === "success") {
        setNotification({ type: "success", message: data.message || "Review submitted successfully" });
        
        // Update the booking in pastBookings to show it has a review
        setPastBookings(pastBookings.map(booking => 
          booking.booking_id === selectedBooking.booking_id
            ? {...booking, has_review: true, rating: rating, review_text: reviewText}
            : booking
        ));
      } else {
        setNotification({ type: "error", message: data.message });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setNotification({ 
        type: "error", 
        message: "Failed to submit your review. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 12 + 4 + 'px',
              height: Math.random() * 12 + 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%'
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {/* Glowing blobs */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-600/30 rounded-full filter blur-[100px]"></div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-600/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute right-40 top-40 w-60 h-60 bg-blue-600/20 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Rate Your Experience
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-5"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Share your thoughts about your recent adventures to help other travelers plan their perfect trips.
          </p>
        </motion.div>
        
        {/* Notification */}
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 rounded-lg text-center ${
              notification.type === "success" ? "bg-green-500/20 border border-green-500/30" :
              notification.type === "error" ? "bg-red-500/20 border border-red-500/30" :
              "bg-blue-500/20 border border-blue-500/30"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Past Bookings Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-xl">
              <div className="flex items-center mb-5">
                <div className="p-2 bg-purple-900/50 rounded-lg">
                  <FaHistory className="text-purple-300 text-xl" />
                </div>
                <h2 className="ml-3 text-xl font-semibold text-white">Your Past Bookings</h2>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
              ) : pastBookings.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {pastBookings.map((booking) => (
                    <motion.div
                      key={booking.booking_id}
                      variants={itemVariants}
                      onClick={() => handleBookingSelect(booking)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedBooking?.booking_id === booking.booking_id
                          ? "bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-white/20"
                          : "bg-white/5 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{booking.destination}</h3>
                          <p className="text-sm text-gray-400">{booking.accommodation}</p>
                        </div>
                        {booking.has_review ? (
                          <div className="flex items-center text-yellow-400">
                            <FaStar />
                            <span className="ml-1 text-sm">{booking.rating}</span>
                          </div>
                        ) : (
                          <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
                            Not reviewed
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Booked on {new Date(booking.booking_date).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="mb-2">No past bookings found.</p>
                  <button 
                    onClick={() => navigate("/recommend")}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Make your first booking
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Review Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl h-full">
              {selectedBooking ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-white mb-2">Review Your Trip</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center bg-black/20 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-pink-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Destination</p>
                          <p className="text-white">{selectedBooking.destination}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-black/20 p-3 rounded-lg">
                        <FaHotel className="text-blue-400 mr-2" />
                        <div>
                          <p className="text-xs text-gray-400">Accommodation</p>
                          <p className="text-white">{selectedBooking.accommodation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-2">Your Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-3xl focus:outline-none"
                          >
                            <FaStar
                              className={`${
                                star <= (hoverRating || rating)
                                  ? "text-yellow-400"
                                  : "text-gray-500"
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-2">Your Review</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full bg-black/30 text-white p-4 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-40 resize-none"
                        placeholder="Share the details of your experience..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center ${
                          isSubmitting || rating === 0 ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" /> Submit Review
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-16">
                  <div className="text-6xl mb-6 text-gray-500">⭐</div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">Select a booking to review</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Choose one of your past bookings from the list to share your experience and help other travelers.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}