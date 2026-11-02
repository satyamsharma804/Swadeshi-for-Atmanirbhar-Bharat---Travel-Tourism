// import React from "react";
import { useNavigate } from "react-router-dom";
import { accommodations } from "../data/Accomodation"; // Ensure correct file path

export default function Accommodation() {
  const navigate = useNavigate();

  const handleBooking = (accommodation) => {
    console.log("Storing in session:", accommodation); // Debugging log
    sessionStorage.setItem("selectedAccommodation", JSON.stringify(accommodation));
    navigate("/accomodation-details");
  };

  return (
    <section id="accommodation" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Accommodation
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((accommodation, index) => (
            <div
              key={index}
              className="accommodation-card bg-gray-900 p-8 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={accommodation.image}
                alt={accommodation.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                {accommodation.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4">{accommodation.subTitle}</p>
              <p className="text-sm text-gray-400"><strong>Location:</strong> {accommodation.location}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-400">
                  Rs.{accommodation.cost}
                </span>
                <span className="text-sm text-gray-400">{accommodation.duration}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-yellow-400">
                  ⭐ {accommodation.rating} ({accommodation.reviews} reviews)
                </span>
                <span className="text-sm text-gray-400">{accommodation.distance}</span>
              </div>
              <button
                className="mt-5 w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-xl"
                onClick={() => handleBooking(accommodation)}
              >
                Explore More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
