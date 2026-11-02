import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import { 
  FaTicketAlt,
  FaMapMarkerAlt, 
  FaHotel, 
  FaUserFriends,
  FaStar,
  FaCalendarAlt,
  FaCreditCard
} from 'react-icons/fa';
import { motion } from "framer-motion";

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }
    
    fetchUserBookings(userEmail);
  }, [navigate]);

  const fetchUserBookings = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.GET_USER_BOOKINGS}?email=${email}`);
      const data = await response.json();
      
      console.log('Bookings response:', data);
      
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data.status === "success" && data.bookings) {
        setBookings(data.bookings);
      } else if (data.status === "success" && data.booking) {
        setBookings([data.booking]);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'confirmed': 'bg-green-500/20 text-green-300 border-green-500/30',
      'pending': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'cancelled': 'bg-red-500/20 text-red-300 border-red-500/30',
      'completed': 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    };
    return statusColors[status?.toLowerCase()] || statusColors['pending'];
  };

  const getAdminStatusColor = (adminStatus) => {
    const statusColors = {
      'approved': 'bg-green-500/20 text-green-300',
      'pending': 'bg-yellow-500/20 text-yellow-300',
      'rejected': 'bg-red-500/20 text-red-300'
    };
    return statusColors[adminStatus?.toLowerCase()] || statusColors['pending'];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-200 text-lg font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4">
        <div className="text-center">
          <div className="mb-6">
            <FaTicketAlt className="text-6xl text-purple-400 mx-auto opacity-50" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h2>
          <p className="text-gray-400 mb-6">Start planning your next adventure!</p>
          <button
            onClick={() => navigate("/recommend")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:scale-105 transition-all"
          >
            Explore Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden p-4 md:p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-600 rounded-full filter blur-[100px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-gray-400">Manage and view all your travel bookings ({bookings.length})</p>
        </motion.div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Booking Header */}
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 border-b border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaTicketAlt className="text-purple-300" />
                      <span className="text-white font-mono font-bold">{booking.booking_id}</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Booked on {new Date(booking.booking_date || booking.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status || 'Pending'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAdminStatusColor(booking.admin_status)}`}>
                      Admin: {booking.admin_status || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6 space-y-4">
                {/* Destination */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-900/30 rounded-lg">
                    <FaMapMarkerAlt className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Destination</p>
                    <p className="text-lg font-semibold text-white">{booking.destination}</p>
                  </div>
                </div>

                {/* Accommodation */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-pink-900/30 rounded-lg">
                    <FaHotel className="text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Accommodation</p>
                    <p className="text-lg font-semibold text-white">{booking.accommodation}</p>
                  </div>
                </div>

                {/* Cost */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-900/30 rounded-lg">
                    <FaCreditCard className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Total Cost</p>
                    <p className="text-2xl font-bold text-green-400">₹{booking.total_cost?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Booked By */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <FaUserFriends className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Booked By</p>
                    <p className="text-white font-medium">{booking.booked_by}</p>
                  </div>
                </div>

                {/* Booking Date */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-900/30 rounded-lg">
                    <FaCalendarAlt className="text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Travel Date</p>
                    <p className="text-white font-medium">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-900/30 border-t border-white/10 flex gap-2">
                {booking.admin_status === 'approved' && (
                  <button
                    onClick={() => navigate(`/reviews`)}
                    className="flex-1 py-2 px-4 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg text-yellow-300 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaStar className="text-sm" />
                    Leave Review
                  </button>
                )}
                {booking.admin_status === 'pending' && (
                  <div className="flex-1 py-2 px-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg text-yellow-400 text-center text-sm">
                    Waiting for admin approval
                  </div>
                )}
                {booking.admin_status === 'rejected' && (
                  <div className="flex-1 py-2 px-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 text-center text-sm">
                    Booking rejected
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Booking Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => navigate("/recommend")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-lg transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
          >
            <FaTicketAlt className="inline mr-2" />
            Plan New Trip
          </button>
        </motion.div>
      </div>
    </div>
  );
}
