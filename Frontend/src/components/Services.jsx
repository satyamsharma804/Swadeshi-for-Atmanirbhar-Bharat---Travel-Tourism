
import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export default function Services() {
  const data = [
    {
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrY5j0DtBHe4MEqcWSIAb0qeMDZ32zIjDHtA&s',
      title: 'Get Best Prices',
      subTitle:
        'Pay through our app and unlock thousands in savings with amazing rewards.',
    },
    {
      icon: 'https://media.istockphoto.com/id/1328621078/photo/housekeeper-with-protective-face-mask-cleaning-furniture-with-disinfecting-spray-in-hotel-room.jpg?s=612x612&w=0&k=20&c=FUr7AtpQ_HTGh83GDBe_WcQvLERNhMpT7xS5FJnDoDE=',
      title: 'Hygienic',
      subTitle:
        'Our hotels follow strict Covid safety measures to ensure a worry-free stay.',
    },
    {
      icon: 'https://e7.pngegg.com/pngimages/183/310/png-clipart-brand-logo-product-design-visa-electron-payment-method-logo-brand-thumbnail.png',
      title: 'Flexible Payment',
      subTitle:
        'Enjoy multiple payment options and get exclusive rewards on every transaction.',
    },
    {
      icon: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?cs=srgb&dl=pexels-vince-2265876.jpg&fm=jpg',
      title: 'Find The Best Near You',
      subTitle:
        'Discover the top-rated hotels, restaurants, and attractions nearby in one click.',
    },
  ];

  const headingText = "Why Choose Us?";
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 500;

  useEffect(() => {
    let timer;
    
    if (!isDeleting && index < headingText.length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + headingText[index]);
        setIndex(index + 1);
      }, typingSpeed);
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setIsDeleting(!isDeleting);
      }, pauseTime);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <section id="services" className="py-12 bg-gradient-to-r form-bg-gray-900 via-black to bg-gray-900 text-white  px-6">
      <div className="text-center mb-8">
        {/* Typing Effect for Heading */}
        <h2 className="text-4xl font-extrabold text-white">
          {displayText}
          <span className="animate-blink">|</span>
        </h2>
        <p className="text-white mt-2">
          We offer the best services to make your travel experience seamless and enjoyable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data.map((service, index) => (
          <HoverCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
}

function HoverCard({ service }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - left - width / 2,
      y: e.clientY - top - height / 2,
    });
  };

  return (
    <Tilt
      className="relative bg-gradient-to-br from-green-700 to-yellow-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.05}
    >
      <div
        className="relative group"
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic color glow effect */}
        <div
          className="absolute inset-0 bg-gradient-radial from-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.4), transparent)`,
          }}
        ></div>

        <div className="relative">
          {service.icon && service.icon.trim() !== "" ? (
            <>
              <img
                src={service.icon}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-4xl text-white">🎯</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
          <p className="text-white">{service.subTitle}</p>
        </div>
      </div>
    </Tilt>
  );
}
