import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

// Import team member images
import ashutoshImage from '../assets/Dev.jpeg';
import satyamImage from '../assets/satyam.jpg';
import aryanImage from '../assets/Dev1.jpeg';
import princeImage from '../assets/prince.jpeg';

const MeetOurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Satyam Kumar",
      role: "Lead Developer",
      photo: satyamImage,
      bio: "Dev is our brilliant lead developer currently pursuing BTech CSE at LPU. With exceptional skills in PHP, JavaScript and React.js, he manages our development team and ensures we meet all project milestones on our travel planner web application.",
      social: {
        linkedin: "https://www.linkedin.com/in/satyam-kumar-51a413299/",
        github: "https://github.com/DEV-KUMAR51520",
        twitter: ""
      }
    },
    {
      id: 2,
      name: "Satyam",
      role: "UI/UX Designer",
      photo: satyamImage,
      bio: "Satyam is our creative UI/UX designer in his 3rd year of BTech CSE at LPU. His innovative approaches to user experience design and proficiency with Tailwind CSS and React.js have been crucial for creating intuitive and responsive interfaces in our travel planner project.",
      social: {
        linkedin: "https://www.linkedin.com/in/satyam-kumar-51a413299/",
        github: "https://github.com/satyamsharma804",
        twitter: ""
      }
    },
    {
      id: 3,
      name: "Satyam  Kumar",
      role: "Backend Developer",
      photo: satyamImage,
      bio: "Dev is our backend expert studying BTech CSE at LPU. His strong grasp of PHP, XAMPP, and database management has been instrumental in building robust backend systems and server architecture for our travel planner application in our 2nd year projects.",
      social: {
        linkedin: "https://www.linkedin.com/in/satyam-kumar-51a413299/",
        github: "https://github.com/satyamsharma804",
        twitter: ""
      }
    },
    {
      id: 4,
      name: "Satyam Kumar",
      role: "Frontend Developer",
      photo: satyamImage,
      bio: "Prince is our frontend wizard in his 3rd year of BTech CSE at LPU. With expertise in React.js and Tailwind CSS, he transforms designs into responsive interactive experiences while ensuring seamless integration with our PHP backend for our travel planner website.",
      social: {
        linkedin: "https://www.linkedin.com/in/satyam-kumar-51a413299/",
        github: "https://github.com/satyamsharma804",
        twitter: "https://x.com/devk51520"
      }
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Meet Our Amazing Team
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            We're a passionate group of professionals dedicated to creating the ultimate travel planning experience for our users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Card with glassmorphism effect */}
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 rounded-2xl"></div>
                
                {/* Card content */}
                <div className="relative z-10 p-6">
                  {/* Image container with gradient border */}
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
                  <p className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {member.role}
                  </p>
                  <p className="text-gray-300 mb-6 line-clamp-4 hover:line-clamp-none transition-all duration-300">
                    {member.bio}
                  </p>
                  
                  {/* Social media links */}
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      <FaTwitter size={20} />
                    </a>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl opacity-70"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-70"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
