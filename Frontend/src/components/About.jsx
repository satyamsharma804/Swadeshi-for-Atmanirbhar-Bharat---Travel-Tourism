import React from 'react';
import MeetOurTeam from './MeetOurTeam';

const About = () => {
  return (
    <div>
      <section id="about" className="min-h-screen flex flex-col justify-center py-16 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center space-y-6 flex-grow">
          <h2 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            About Us 🌍
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6"></div>
          <p className="text-lg md:text-xl font-medium text-gray-300 max-w-3xl mx-auto">
            Welcome to our travel website! We provide the best travel experiences, helping you explore the world with ease. Whether you're looking for adventure, relaxation, or cultural immersion, we've got you covered.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="border border-white/20 rounded-xl p-3 max-w-3xl">
              <img 
                src="https://t3.ftcdn.net/jpg/00/93/76/02/360_F_93760221_KJMb5fQHdgai8y4mUF6TzLJWRJQQAO2K.jpg" 
                alt="About Us" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <MeetOurTeam/>
    </div>
  );
};

export default About;
