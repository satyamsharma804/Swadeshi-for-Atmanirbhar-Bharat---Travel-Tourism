import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCreditCard, FaGooglePay, FaApplePay, FaQrcode, FaUniversity } from "react-icons/fa";
import { API_ENDPOINTS } from "../config/api";

export default function FakePaymentPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get user email from localStorage when component mounts
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      // If no email is found, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handlePayment = async () => {
    // Show processing state
    setIsProcessing(true);
    
    // Generate a booking ID with the same format as in MyBookings.jsx
    const generateBookingId = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let id = "BK";
      for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };

    const bookingId = generateBookingId();

    const formatDateForMySQL = (isoDate) => {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Get stored booking information
    const destination = JSON.parse(sessionStorage.getItem("selectedDestination")) || { title: "Unknown Destination" };
    const accommodation = JSON.parse(sessionStorage.getItem("selectedAccommodation")) || { title: "Unknown Accommodation" };
    const totalCost = sessionStorage.getItem("totalCost") || "0";
    const bookingDates = JSON.parse(sessionStorage.getItem("bookingDates")) || {};

    const bookingDetails = {
      destination: destination.title,
      accommodation: accommodation.title,
      totalCost: totalCost,
      date: formatDateForMySQL(new Date().toISOString()),
      status: "Confirmed",
      email: userEmail,
      bookingId: bookingId
    };

    try {
      // Step 1: Save booking to database
      const saveResponse = await axios.post(
        API_ENDPOINTS.SAVE_BOOKING,
        bookingDetails
      );

      console.log("Booking saved:", saveResponse.data);

      if (saveResponse.data.status === "success") {
        // Email confirmation is handled by the backend automatically
        console.log("Booking saved successfully:", saveResponse.data);
        
        // Save bookingId to sessionStorage for reference on success page
        sessionStorage.setItem("bookingId", bookingId);
        
        // Navigate to success page
        navigate("/success");
      } else {
        console.error("Error saving booking:", saveResponse.data.message);
        alert("There was an error processing your payment. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("There was an error processing your payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-richblack-900 text-white p-6">
      <div className="w-full max-w-lg bg-gray-800 text-white rounded-3xl shadow-2xl p-10 border border-gray-700">
        
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center mb-6 flex items-center justify-center gap-2">
          <FaQrcode className="text-blue-500 text-4xl" /> Secure Payment
        </h2>

        {/* QR Code Payment Option */}
        <div className="flex flex-col items-center mb-6">
          {/* Fixed QR code image URL with proper fallback */}
          <img 
            src="https://w7.pngwing.com/pngs/431/554/png-transparent-barcode-scanners-qr-code-2d-code-creative-barcode-miscellaneous-angle-text-thumbnail.png" 
            alt="QR Code" 
            className="w-40 h-40 rounded-lg shadow-lg"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://via.placeholder.com/150?text=QR+Code";
            }}
          />
          <p className="mt-2 text-gray-300 text-sm">Scan the QR Code to Pay</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-4"></div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
              <FaCreditCard className="mr-2" /> Credit / Debit Card
            </button>
            <button className="w-full flex items-center justify-center py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all">
              <FaGooglePay className="mr-2" /> UPI Apps
            </button>
            <button className="w-full flex items-center justify-center py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all">
              <FaUniversity className="mr-2" /> Net Banking
            </button>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          className={`w-full py-4 ${isProcessing ? 'bg-gray-500' : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'} text-white font-bold text-lg rounded-full shadow-lg transition-all flex justify-center items-center`}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
        
        {/* Added note about confirmation email */}
        <p className="text-center text-gray-400 text-sm mt-4">
          A confirmation email will be sent to your registered email address after successful payment.
        </p>
      </div>
    </div>
  );
}