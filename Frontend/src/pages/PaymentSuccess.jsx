import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    setTimeout(() => {
      navigate("/"); // Redirect to home after countdown
    }, 4000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-richblack-900 to-richblack-800 text-white p-6 overflow-hidden">
      {/* Confetti Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="animate-pulse text-[100px] text-green-400 absolute top-10 left-1/4">🎉</div>
        <div className="animate-pulse text-[80px] text-yellow-400 absolute top-14 right-1/4">✨</div>
        <div className="animate-pulse text-[90px] text-blue-400 absolute top-28 left-1/3">🎊</div>
        <div className="animate-pulse text-[70px] text-pink-400 absolute top-40 right-1/3">💫</div>
        <div className="animate-pulse text-[60px] text-purple-400 absolute top-52 left-1/2">🎈</div>
      </motion.div>

      {/* Success Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-full shadow-2xl"
      >
        <FaCheckCircle className="text-white text-8xl" />
      </motion.div>

      {/* Success Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mt-8"
      >
        Payment Successful!
      </motion.h2>

      {/* Booking Confirmation Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-lg text-gray-200 mt-4 text-center"
      >
        Thank you for booking with us! ✈️ <br /> 
        We hope you have an amazing trip! 🌍✨
      </motion.p>

      {/* Redirect Countdown */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-gray-300 mt-4 text-lg"
      >
        Redirecting in{" "}
        <span className="text-green-400 font-semibold text-xl">{countdown}</span> seconds...
      </motion.p>

      {/* Additional Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-10 text-gray-400 text-sm"
      >
        Have a wonderful journey! 🚀🌟
      </motion.div>
    </div>
  );
}
