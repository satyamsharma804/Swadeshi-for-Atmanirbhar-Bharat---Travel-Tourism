import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const headings = [
    "Discover Your Next Adventure",
    "Find Hidden Gems Around You",
    "Let the Journey Begin",
    "Wander More, Worry Less",
  ];

  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 100;
  const pauseTime = 1500;

  useEffect(() => {
    let timer;

    if (charIndex < headings[wordIndex].length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + headings[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % headings.length);
      }, pauseTime);
    }

    return () => clearTimeout(timer);
  }, [charIndex, wordIndex]);

  const handleSearch = () => {
    if (destination.trim()) {
      navigate(`/recommend`);
    }
  };

  return (
    <section className="relative z-10 w-full h-screen flex flex-col md:flex-row items-center justify-between bg-richblack-900 text-white overflow-hidden px-6 md:px-16">
      {/* Parallax Background */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg')] bg-cover bg-center opacity-20 animate-parallax z-0"></div>

      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 animate-fade-in z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg">
          {displayText}
          <span className="animate-blink">..</span>
        </h1>
        <p className="text-lg md:text-2xl opacity-90 text-white/80 leading-relaxed">
          Explore breathtaking destinations curated just for you.
        </p>

        {/* Search Box */}
        <div className="mt-6 flex items-center space-x-4 bg-white/10 p-4 rounded-full shadow-xl backdrop-blur-md border border-white/20 animate-float-fast">
          <input
            type="text"
            placeholder="Where to next?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="px-5 py-3 flex-1 rounded-full bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-2xl hover:animate-glow"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Right Section (Image Gallery) */}
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 p-6 md:p-12 relative z-10">
        {[
          "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
          "https://images.pexels.com/photos/1450372/pexels-photo-1450372.jpeg",
          "https://www.india.com/wp-content/uploads/2024/11/Kupwara.jpg",
          "https://www.tripgiraffe.com/upload/media/0/fcaqu/sydney1.png",
        ].map((img, idx) => (
          <div
            key={idx}
            className={`relative group overflow-hidden rounded-3xl shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl animate-float delay-${idx * 100}`}
          >
            <img
              src={img}
              alt={`Destination ${idx + 1}`}
              className="w-full h-64 object-cover rounded-3xl transition-transform transform group-hover:scale-110 border-4 border-white"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 text-white text-lg font-bold">
              Explore More
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}