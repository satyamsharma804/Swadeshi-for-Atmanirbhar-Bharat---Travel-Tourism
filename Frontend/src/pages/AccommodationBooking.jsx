import { useNavigate } from "react-router-dom";
import { accommodations } from "../data/Accomodation"; // Use relative path
import { useEffect } from "react";

export default function AccommodationBooking() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSelectAccommodation = (accommodation) => {
    sessionStorage.setItem("selectedAccommodation", JSON.stringify(accommodation));
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Accommodation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accommodations.map((accommodation, index) => (
          <div 
            key={index} 
            className="bg-white rounded-3xl shadow-lg p-6 transform hover:scale-105 transition cursor-pointer"
            onClick={() => handleSelectAccommodation(accommodation)}
          >
            <img 
              src={accommodation.image} 
              alt={accommodation.title} 
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-bold text-center mt-3">{accommodation.title}</h3>
            <p className="text-center text-gray-600">{accommodation.subTitle}</p>
            <p className="text-center text-blue-600 font-bold mt-2">${accommodation.cost}</p>
            <div className="flex justify-center items-center text-sm text-yellow-500 mt-2">
              ⭐ {accommodation.rating} ({accommodation.reviews} reviews)
            </div>
            <p className="text-center text-gray-500 mt-1">{accommodation.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
