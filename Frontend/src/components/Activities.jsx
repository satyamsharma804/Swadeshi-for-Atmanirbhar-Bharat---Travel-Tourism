// import React from 'react';
// import activitiesData from '../data/Activities'; // Import the data

// export default function Activities() {
//   return (
//     <section id="activities" className="py-20 bg-gradient-to-r form-bg-gray-900 via-black to bg-gray-900 text-white ">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//           Activities
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {activitiesData.map((activity) => (
//             <div
//               key={activity.id}
//               className="activity-card bg-gray-900 p-8 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl"
//             >
//               <img
//                 src={activity.imageUrl}
//                 alt={activity.title}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-2xl font-semibold text-blue-400 mb-4">{activity.title}</h3>
//               <p className="text-sm text-gray-300 mb-4">{activity.location}</p>
//               <p className="text-gray-300 mb-4">{activity.description}</p>
//               <div className="mt-4 flex justify-between items-center">
//                 <span className="text-lg font-bold text-blue-400">Rs.{activity.price}</span>
//                 <span className="text-sm text-gray-400">{activity.duration}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import activitiesData from '../data/Activities'; // Import the data

export default function Activities() {
  const navigate = useNavigate();

  return (
    <section id="activities" className="py-20 bg-gradient-to-r from-bg-gray-900 via-black to bg-gray-900 text-white ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Activities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activitiesData.map((activity) => (
            <div
              key={activity.id}
              className="activity-card bg-gray-900 p-8 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">{activity.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{activity.location}</p>
              <p className="text-gray-300 mb-4">{activity.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-400">Rs.{activity.price}</span>
                <span className="text-sm text-gray-400">{activity.duration}</span>
              </div>
              <button
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-xl mt-4"
                onClick={() => navigate(`/booking`)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}