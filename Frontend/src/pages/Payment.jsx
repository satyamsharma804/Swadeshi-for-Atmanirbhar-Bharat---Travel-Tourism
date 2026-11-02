import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [numNights, setNumNights] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [members, setMembers] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [costBreakdown, setCostBreakdown] = useState({
    destination: 0,
    accommodation: 0,
    activities: 0,
    serviceFee: 0
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedDestination = sessionStorage.getItem("selectedDestination");
    const storedAccommodation = sessionStorage.getItem("selectedAccommodation");
    const storedNights = sessionStorage.getItem("numNights");
    const storedMembers = sessionStorage.getItem("members");
    const storedActivities = sessionStorage.getItem("selectedActivities");

    if (storedDestination) setSelectedDestination(JSON.parse(storedDestination));
    if (storedAccommodation) setSelectedAccommodation(JSON.parse(storedAccommodation));
    if (storedNights) setNumNights(parseInt(storedNights, 10));
    if (storedMembers) setMembers(JSON.parse(storedMembers));
    if (storedActivities) setSelectedActivities(JSON.parse(storedActivities));

    if (storedDestination && storedAccommodation) {
      const destination = JSON.parse(storedDestination);
      const accommodation = JSON.parse(storedAccommodation);
      
      // Ensure all costs are parsed as numbers
      const destinationCost = parseFloat(destination.cost);
      const accommodationCostPerNight = parseFloat(accommodation.cost);
      const nights = storedNights ? parseInt(storedNights, 10) : 1;
      const accommodationCost = accommodationCostPerNight * nights;
      
      // Calculate activities cost with proper number parsing
      const activitiesCost = storedActivities
        ? JSON.parse(storedActivities).reduce((sum, activity) => sum + parseFloat(activity.price), 0)
        : 0;

      // Calculate base cost and service fee using proper number addition
      const baseCost = destinationCost + accommodationCost + activitiesCost;
      const serviceFee = Math.round(baseCost * 0.10); // 10% service fee with rounding

      setCostBreakdown({
        destination: destinationCost,
        accommodation: accommodationCost,
        activities: activitiesCost,
        serviceFee: serviceFee
      });

      // Set total cost ensuring we're adding numbers, not concatenating strings
      setTotalCost(baseCost + serviceFee);
    }
  }, []);

  const handlePayment = () => {
    sessionStorage.setItem("totalCost", totalCost);
    navigate("/paymentOption");
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Review Your Booking
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-center text-gray-400 mb-10"
        >
          Please review your booking details and proceed to payment
        </motion.p>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden shadow-lg border border-white/10 backdrop-blur-md">
          <div className="bg-gradient-to-r from-purple-900/70 to-indigo-900/70 p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Booking Summary</h2>
          </div>

          <div className="p-6">
            <div className="space-y-6 mb-8">
              {selectedDestination && (
                <motion.div variants={itemVariants} className="flex gap-4">
                  <img 
                    src={selectedDestination.image} 
                    alt={selectedDestination.title}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0" 
                  />
                  <div>
                    <h3 className="font-bold text-lg text-blue-400">{selectedDestination.title}</h3>
                    <p className="text-gray-400 text-sm">{selectedDestination.location}</p>
                    <p className="mt-2 text-white font-medium">Rs. {selectedDestination.cost}</p>
                  </div>
                </motion.div>
              )}
              
              {selectedAccommodation && (
                <motion.div variants={itemVariants} className="flex gap-4">
                  <img 
                    src={selectedAccommodation.image} 
                    alt={selectedAccommodation.title}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0" 
                  />
                  <div>
                    <h3 className="font-bold text-lg text-purple-400">{selectedAccommodation.title}</h3>
                    <p className="text-gray-400 text-sm">{selectedAccommodation.location}</p>
                    <div className="mt-1">
                      <span className="text-white">Rs. {selectedAccommodation.cost}</span>
                      <span className="text-gray-500"> × {numNights} nights</span>
                      <p className="text-white font-medium">Rs. {selectedAccommodation.cost * numNights}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedActivities && selectedActivities.length > 0 && (
                <motion.div variants={itemVariants} className="mt-6">
                  <h3 className="font-bold text-lg text-indigo-400 mb-3">Optional Activities</h3>
                  <div className="space-y-3 ml-2">
                    {selectedActivities.map((activity) => (
                      <motion.div 
                        key={activity.id} 
                        variants={itemVariants}
                        className="flex justify-between items-center py-2 border-b border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={activity.imageUrl} 
                            alt={activity.title}
                            className="w-12 h-12 rounded object-cover" 
                          />
                          <div>
                            <p className="font-medium text-white">{activity.title}</p>
                            <div className="flex items-center text-xs text-gray-400 gap-2">
                              <span>{activity.duration}</span>
                              <span>•</span>
                              <span>{activity.location}</span>
                            </div>
                          </div>
                        </div>
                        <span className="font-medium">Rs. {activity.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.div variants={itemVariants} className="mt-8 border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Destination Cost</span>
                <span>Rs. {costBreakdown.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Accommodation ({numNights} nights)</span>
                <span>Rs. {costBreakdown.accommodation}</span>
              </div>
              {costBreakdown.activities > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Activities</span>
                  <span>Rs. {costBreakdown.activities}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Service Fee (10%)</span>
                <span>Rs. {costBreakdown.serviceFee}</span>
              </div>
              <div className="flex justify-between border-t border-white/20 pt-2 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Rs. {totalCost}
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Travelers</h3>
              <p className="bg-white/5 px-4 py-3 rounded-lg">
                {members.length} {members.length === 1 ? 'Person' : 'People'}
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={handlePayment}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition duration-300"
              >
                Proceed to Payment
              </button>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-6 text-center text-sm text-gray-400"
        >
          By proceeding, you agree to our <a href="#" className="text-blue-400 hover:underline">cancellation policy</a> and <a href="#" className="text-blue-400 hover:underline">terms of service</a>.
        </motion.div>
      </div>
    </motion.div>
  );
}

