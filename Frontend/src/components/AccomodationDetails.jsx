import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaHeart,
  FaShare,
  FaUsers,
  FaWifi,
  FaSwimmingPool,
  FaShuttleVan,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { accommodations } from "../data/Accomodation";
import Testimonials from "./Testimonials";

export default function AccommodationDetail() {
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedAccommodation = sessionStorage.getItem("selectedAccommodation");
    if (storedAccommodation) {
      setAccommodation(JSON.parse(storedAccommodation));
    } else {
      navigate("/accommodation");
    }
  }, [navigate]);

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-xl font-semibold"
        >
          Loading your luxury stay...
        </motion.div>
      </div>
    );
  }

  // Mock data for multiple images
  const images = [
    accommodation.image,
    accommodation.image1,
    accommodation.image2,
    accommodation.image3,
    accommodation.image4,
  ];

  // Mock amenities data
  const amenities = [
    { icon: <FaWifi />, name: "Free Wi-Fi" },
    { icon: <FaSwimmingPool />, name: "Swimming Pool" },
    { icon: <FaShuttleVan />, name: "Airport Shuttle" },
    { icon: <FaUsers />, name: "24/7 Support" },
  ];

  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (checkInDate && checkOutDate) {
      const numNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      sessionStorage.setItem("numNights", numNights); // Store the correct number of nights
      sessionStorage.setItem("bookingDates", JSON.stringify({
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString()
      }));
      navigate("/booking");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-6 sm:px-10 md:px-16 lg:px-24">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Back Button */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center text-sm px-5 py-2.5 bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-700/60 hover:to-pink-700/60 rounded-full shadow-lg backdrop-blur-sm border border-pink-500/20 transition-all duration-300 group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </motion.button>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all"
              >
                <FaHeart className={isFavorite ? "text-pink-500" : "text-gray-400"} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShareModal(!showShareModal)}
                className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all"
              >
                <FaShare className="text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500"
            >
              {accommodation.title}
            </motion.h2>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-2"
            >
              <FaMapMarkerAlt className="text-pink-400" />
              <p className="text-gray-300">{accommodation.subTitle}</p>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="flex">
                {[...Array(Math.floor(accommodation.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                {accommodation.rating % 1 !== 0 && (
                  <FaStar className="text-yellow-400 opacity-50" />
                )}
              </div>
              <span className="text-gray-300">
                {accommodation.rating} ({accommodation.reviews} reviews)
              </span>
            </motion.div>
          </div>

          {/* Layout */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4 aspect-w-16 aspect-h-9">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={images[activeImageIndex]}
                  alt={accommodation.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Gallery navigation arrows */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    ❮
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    ❯
                  </motion.button>
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>
              
              {/* Thumbnail strip */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-pointer rounded-lg overflow-hidden h-20 w-32 flex-shrink-0 border-2 ${
                      activeImageIndex === index ? "border-pink-500" : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
              
              {/* Description Section */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  About This Luxury Stay
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {accommodation.description}
                </p>
                
                {/* Amenities */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-pink-400">
                    Amenities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((amenity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-2 bg-black/20 p-3 rounded-xl"
                      >
                        <div className="text-pink-400">{amenity.icon}</div>
                        <span className="text-gray-300 text-sm">{amenity.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Highlights */}
                {accommodation.highlights && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-pink-400">
                      Why You'll Love It
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {accommodation.highlights.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <div className="mt-1 text-purple-400">•</div>
                          <span className="text-gray-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Booking Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1 h-fit sticky top-6"
            >
              <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Book Your Stay
                </h3>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-black/30 px-5 py-4 rounded-xl flex items-center gap-3">
                    <FaMoneyBillWave className="text-green-400 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="font-bold text-xl">Rs. {accommodation.cost}</p>
                      <p className="text-xs text-gray-500">Includes taxes & fees</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 px-5 py-4 rounded-xl flex items-center gap-3">
                    <FaClock className="text-yellow-400 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-bold">{accommodation.duration}</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 px-5 py-4 rounded-xl flex items-center gap-3">
                    <FaMapMarkerAlt className="text-pink-400 text-2xl" />
                    <div>
                      <p className="text-sm text-gray-400">Distance</p>
                      <p className="font-bold">{accommodation.distance}</p>
                    </div>
                  </div>
                </div>
                
                {/* Date Selection */}
                <div className="mb-6">
                  <div className="bg-black/20 p-3 rounded-xl">
                    <label className="text-xs text-gray-400 block mb-1">Select Dates</label>
                    <DatePicker
                      selected={checkInDate}
                      onChange={handleDateChange}
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      selectsRange
                      minDate={new Date()}
                      monthsShown={2}
                      dateFormat="MMM dd, yyyy"
                      className="w-full bg-black/30 text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500"
                      calendarClassName="custom-calendar"
                      wrapperClassName="w-full"
                      placeholderText="Select check-in and check-out dates"
                    />
                  </div>
                  
                  <div className="mt-4 bg-black/20 p-3 rounded-xl">
                    <label className="text-xs text-gray-400 block mb-1">Stay Duration</label>
                    <div className="text-lg font-semibold">
                      {checkOutDate && checkInDate
                        ? `${Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))} nights`
                        : "Select dates"}
                    </div>
                  </div>

                  <div className="mt-4 bg-black/20 p-3 rounded-xl">
                    <label className="text-xs text-gray-400 block mb-1">Guests</label>
                    <select className="w-full bg-black/30 text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500">
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                      <option>2 Adults, 2 Children</option>
                    </select>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="bg-black/20 p-3 rounded-xl">
                    <label className="text-xs text-gray-400 block mb-1">Promo Code</label>
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full bg-black/30 text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
                
                {/* Call to Action Buttons */}
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookNow}
                    className={`w-full ${
                      checkInDate && checkOutDate
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                        : "bg-gray-600 cursor-not-allowed"
                    } text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20`}
                    disabled={!checkInDate || !checkOutDate}
                  >
                    Book Now <span className="ml-1">→</span>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gray-700/70 to-gray-800/70 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2"
                  >
                    <FaUsers className="text-purple-400" />
                    Get Group Discount
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Share Modal */}
          <AnimatePresence>
            {showShareModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
                onClick={() => setShowShareModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 p-8 rounded-2xl border border-white/10 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-2xl font-bold mb-4">Share This Property</h3>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {['Facebook', 'Twitter', 'WhatsApp', 'Email'].map((platform) => (
                      <motion.button
                        key={platform}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center justify-center bg-black/30 p-4 rounded-xl"
                      >
                        <div className="text-pink-400 mb-1">
                          {platform === 'Facebook' && '𝕗'}
                          {platform === 'Twitter' && '𝕏'}
                          {platform === 'WhatsApp' && '𝕎'}
                          {platform === 'Email' && '✉'}
                        </div>
                        <span className="text-xs">{platform}</span>
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value="https://luxstays.com/stay/mountain-retreat"
                      readOnly
                      className="flex-1 bg-black/30 p-3 rounded-l-lg text-sm"
                    />
                    <button className="bg-pink-500 hover:bg-pink-600 px-4 rounded-r-lg">
                      Copy
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      <Testimonials/>
    </section>
  );
}