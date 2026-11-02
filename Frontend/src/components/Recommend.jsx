import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { destinations } from "../data/Recommend"; // Corrected import
import { motion, AnimatePresence } from "framer-motion"; // For animations

export default function Recommend() {
  const [active, setActive] = useState(0);
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // Filter destinations based on the selected tab
  const filterDestinations = (index) => {
    setActive(index);
    if (index === 0) {
      setFilteredDestinations(destinations);
    } else if (index === 1) {
      setFilteredDestinations(destinations.filter((d) => parseInt(d.cost) < 50000));
    } else if (index === 2) {
      setFilteredDestinations(
        destinations.filter((d) => parseInt(d.cost) >= 50000 && parseInt(d.cost) <= 80000)
      );
    } else {
      setFilteredDestinations(destinations.filter((d) => parseInt(d.cost) > 80000));
    }
    setCurrentSlide(0); // Reset slider to the first slide when filtering
  };

  // Handle Explore More navigation
  const handleExploreMore = (destination) => {
    sessionStorage.setItem("selectedDestination", JSON.stringify(destination));
    navigate("/destination-details"); // Navigate to the details page
  };

  // Automatic slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredDestinations.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [filteredDestinations]);

  return (
    <section id="recommend" className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-gradient"
          >
            Recommended Destinations ✈️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 mt-3 text-lg font-light"
          >
            Explore stunning locations curated just for you.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mb-12 overflow-x-auto"
        >
          <ul className="flex list-none gap-3 px-2 flex-nowrap">
            {[
              "All Destinations",
              "Budget-Friendly (< Rs.50,000)",
              "Mid-Range (Rs.50,000 - Rs.80,000)",
              "Luxury Travel (> Rs.80,000)",
            ].map((pkg, index) => (
              <li
                key={index}
                className={`cursor-pointer px-5 py-2.5 text-sm rounded-full transition-all duration-300 ${
                  active === index
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => filterDestinations(index)}
              >
                {pkg}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Slider Container */}
        <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl mb-12">
          <AnimatePresence mode="wait">
            {filteredDestinations.map((destination, index) => (
              index === currentSlide && (
                <motion.div
                  key={index}
                  ref={sliderRef}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-3xl font-bold">{destination.title}</h3>
                      <p className="text-gray-300 mt-2">{destination.subTitle}</p>
                      <button
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-xl"
                        onClick={() => handleExploreMore(destination)}
                      >
                        Explore More
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <TiltCard key={index} destination={destination} handleExploreMore={handleExploreMore} />
          ))}
        </div>
      </div>
    </section>
  );
}

// TiltCard Component
const TiltCard = ({ destination, handleExploreMore }) => {
  const cardRef = useRef(null);
  const [cursorStyle, setCursorStyle] = useState({ top: "50%", left: "50%", opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (y - 0.5) * 10;
    const rotateY = (x - 0.5) * 10;

    const borderColorX = `rgba(147, 51, 234, ${x + 0.2})`;
    const borderColorY = `rgba(192, 38, 211, ${y + 0.2})`;

    card.style.borderTop = `2px solid ${borderColorY}`;
    card.style.borderBottom = `2px solid ${borderColorY}`;
    card.style.borderLeft = `2px solid ${borderColorX}`;
    card.style.borderRight = `2px solid ${borderColorX}`;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.boxShadow = `0px 20px 40px rgba(0, 0, 0, 0.3)`;

    setCursorStyle({
      top: `${y * 100}%`,
      left: `${x * 100}%`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.15)";
      card.style.border = "none";

      setCursorStyle({ top: "50%", left: "50%", opacity: 0 });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-b from-black via-gray-900 to-black rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-out transform hover:scale-105"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute w-[180px] h-[180px] bg-gradient-to-r from-purple-500 to-green-500 opacity-40 blur-[50px] transition-all duration-100 pointer-events-none"
        style={{
          top: cursorStyle.top,
          left: cursorStyle.left,
          transform: "translate(-50%, -50%)",
          opacity: cursorStyle.opacity,
        }}
      ></div>

      <div className="relative">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{destination.title}</h3>
        <p className="text-gray-300 mb-4 text-sm font-light">{destination.subTitle}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-purple-400 font-semibold text-xl">Rs.{destination.cost}</span>
          <span className="text-gray-300 text-sm">{destination.duration}</span>
        </div>
        <div className="flex justify-between items-center text-gray-300 mb-6 text-sm">
          <span>{destination.distance}</span>
          <span className="flex items-center">⭐ {destination.rating} ({destination.reviews} reviews)</span>
        </div>
        <button
          className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-xl"
          onClick={() => handleExploreMore(destination)}
        >
          Explore More
        </button>
      </div>
    </motion.div>
  );
};

// Correct Placement of PropTypes
TiltCard.propTypes = {
  destination: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
  handleExploreMore: PropTypes.func.isRequired,
};
