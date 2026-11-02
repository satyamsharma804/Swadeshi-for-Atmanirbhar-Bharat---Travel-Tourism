import React from "react";
import { FaSuitcaseRolling, FaTint, FaLanguage, FaFileAlt, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const tips = [
  {
    icon: <FaSuitcaseRolling className="text-blue-400 text-7xl mb-4" />,
    title: "Pack Light",
    description: "Avoid overpacking and bring only the essentials. Rolling clothes instead of folding saves space and reduces wrinkles.",
  },
  {
    icon: <FaTint className="text-cyan-400 text-7xl mb-4" />,
    title: "Stay Hydrated",
    description: "Always carry a reusable water bottle and stay hydrated, especially when traveling to different climates.",
  },
  {
    icon: <FaLanguage className="text-purple-400 text-7xl mb-4" />,
    title: "Learn Key Phrases",
    description: "Learning a few local phrases like 'Hello,' 'Thank you,' and 'Where is the bathroom?' can be very helpful.",
  },
  {
    icon: <FaFileAlt className="text-yellow-400 text-7xl mb-4" />,
    title: "Keep Copies of Documents",
    description: "Make photocopies of important travel documents and store digital copies on your phone or cloud for security.",
  },
  {
    icon: <FaMapMarkedAlt className="text-pink-400 text-7xl mb-4" />,
    title: "Plan Ahead, Stay Flexible",
    description: "Having a plan is great, but allow time for spontaneous adventures and relaxation.",
  },
];

const TravelTips = () => {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>

      {/* Blurry Highlight Circles */}
      <div className="absolute top-10 left-10 w-44 h-44 bg-blue-500 opacity-30 blur-[90px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 opacity-30 blur-[80px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Travel Tips ✈️
        </h2>

        {/* Grid Layout */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center overflow-hidden 
                         transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-2 border-transparent hover:border-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glowing Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity rounded-xl"></div>

              {tip.icon}
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">{tip.title}</h3>
              <p className="text-gray-300">{tip.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TravelTips;
