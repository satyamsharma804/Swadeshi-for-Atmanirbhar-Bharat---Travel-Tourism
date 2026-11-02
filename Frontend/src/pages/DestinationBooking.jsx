import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DestinationBooking() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSelectDestination = (destination) => {
    sessionStorage.setItem("selectedDestination", JSON.stringify(destination));
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Destination</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg p-6 transform hover:scale-105 transition" onClick={() => handleSelectDestination(destination)}>
            <img src={destination.image} alt={destination.title} className="w-full h-48 object-cover rounded-lg"/>
            <h3 className="text-xl font-bold text-center mt-3">{destination.title}</h3>
            <p className="text-center text-gray-600">{destination.duration}</p>
            <p className="text-center text-blue-600 font-bold mt-2">${destination.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
