import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Testimonials from "./Testimonials";
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaHeart, FaChevronLeft, FaChevronRight, FaShare } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { destinations } from "../data/Recommend";

export default function DestinationDetails() {
  const [destination, setDestination] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = sessionStorage.getItem("selectedDestination");
    if (data) {
      setDestination(JSON.parse(data));
      setIsFavorite(Math.random() > 0.5);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!destination) return (
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
        Loading your dream destination...
      </motion.div>
    </div>
  );

  // Sample images - replace with your actual destination images
  const images = [
    destination.image,
    destination.image1,
    destination.image2,
    destination.image3,
    // destination.image4,
   
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
          {/* Header with Back Button and Actions */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center text-sm px-5 py-2.5 bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-700/60 hover:to-pink-700/60 rounded-full shadow-lg backdrop-blur-sm border border-pink-500/20 transition-all duration-300 group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Destinations
            </motion.button>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorite}
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

          {/* Title Section */}
          <div className="mb-8">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500"
            >
              {destination.title}
            </motion.h1>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-2"
            >
              <FaMapMarkerAlt className="text-pink-400" />
              <p className="text-gray-300">{destination.subTitle}</p>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="flex">
                {[...Array(Math.floor(destination.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                {destination.rating % 1 !== 0 && (
                  <FaStar className="text-yellow-400 opacity-50" />
                )}
              </div>
              <span className="text-gray-300">
                {destination.rating} ({destination.reviews} reviews)
              </span>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Enhanced Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4 aspect-w-16 aspect-h-9">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={images[currentImageIndex]}
                  alt={`${destination.title} view ${currentImageIndex + 1}`}
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Gallery navigation arrows */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <FaChevronLeft className="text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <FaChevronRight className="text-white" />
                  </motion.button>
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
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
                      currentImageIndex === index ? "border-pink-500" : "border-transparent"
                    }`}
                    onClick={() => goToImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="h-full w-full object-cover" 
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Destination Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-pink-500 mr-2" />
                    <span className="font-semibold">Cost</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">Rs. {destination.cost}</p>
                  <p className="text-xs text-gray-400">per person</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaClock className="text-purple-500 mr-2" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{destination.duration}</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-400 mr-2" />
                    <span className="font-semibold">Distance</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{destination.distance}</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-2" />
                    <span className="font-semibold">Rating</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-2">{destination.rating}</span>
                    <span className="text-sm text-gray-400">({destination.reviews} reviews)</span>
                  </div>
                </motion.div>
              </div>

              {/* Highlights */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Trip Highlights
                </h3>
                <ul className="space-y-2">
                  {destination.tripHighlights && destination.tripHighlights.map((highlight, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-1.5 h-1.5 mt-2.5 mr-2 bg-pink-500 rounded-full"></span>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(219, 39, 119, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      navigate("/login");
                      return;
                    }
                    navigate("/booking");
                  }}
                >
                  <span>Book Now</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-8 py-4 rounded-xl font-semibold bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center"
                >
                  <IoIosPeople className="mr-2 text-lg" />
                  <span>Group Discount</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Additional Sections */}
          <div className="mt-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <Testimonials />
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
                  <h3 className="text-2xl font-bold mb-4">Share This Destination</h3>
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
                      value={`https://wanderlust.com/destination/${destination.title.toLowerCase().replace(/\s+/g, '-')}`}
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
    </section>
  );
}