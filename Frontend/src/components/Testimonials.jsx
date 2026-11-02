import React from "react";
import Slider from "react-slick";
import { FaUserCircle } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Shambhu",
    role: "Full Stack Developer",
    feedback:
      "This platform made my trip planning so easy! Everything was smooth and hassle-free.",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    feedback:
      "Absolutely love the services. The customer support was fantastic,  Highly recommended!",
  },
  {
    name: "Ananya Gupta",
    role: "Freelance Designer",
    feedback:
      "Had the best experience booking my trip through this platform. Highly recommended!",
  },
  {
    name: "Neha Sharma",
    role: "Marketing Manager",
    feedback:
      "Seamless booking process and excellent customer service. Would definitely use it again!",
  },
  {
    name: "Amit Kapoor",
    role: "Entrepreneur",
    feedback:
      "The platform saved me a lot of time. Everything was well-organized and easy to access.",
  },
];

export default function Testimonials() {
const TRANSITION_SPEED = 3000;

const settings = {
  dots: false,
  infinite: true,
  speed: TRANSITION_SPEED,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: false,
  pauseOnFocus: false,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};


  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>Happy Customers</h2>
        <p className="text-gray-300 mt-2 text-lg">See what our users have to say about us.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="relative max-w-sm mx-auto bg-gray-900 bg-opacity-40 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-500">
                <p className="text-gray-300 italic mb-4">"{testimonial.feedback}"</p>
                <div className="flex items-center gap-4">
                  <FaUserCircle className="w-14 h-14 text-purple-400" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <span className="text-purple-400 text-sm">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
