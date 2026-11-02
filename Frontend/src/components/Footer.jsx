import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {

  return (
    <footer className="relative bg-gray-950 text-white">
      {/* 3D Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-24"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-blue-600 opacity-10"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            className="fill-amber-500 opacity-5"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-blue-500 opacity-10"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Section - spans 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">W</span>
              </div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-400 to-amber-500 bg-clip-text text-transparent">
                Wanderlust
              </h2>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover breathtaking destinations around the world, curated experiences, and exclusive travel deals. Let us guide you to create unforgettable memories on your journey.
            </p>
            
            <div className="pt-4">
              <div className="flex items-center space-x-3 mb-3">
                <FaMapMarkerAlt className="text-amber-500" />
                <span className="text-gray-300 text-sm">123 Traveler's Lane, Adventure City</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <FaEnvelope className="text-amber-500" />
                <span className="text-gray-300 text-sm">hello@wanderlust.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-amber-500" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                aria-label="Facebook" 
                className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:scale-110 group"
              >
                <FaFacebook className="text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram" 
                className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br from-purple-600 to-pink-500 hover:scale-110 group"
              >
                <FaInstagram className="text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter" 
                className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-blue-400 hover:scale-110 group"
              >
                <FaTwitter className="text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn" 
                className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-blue-700 hover:scale-110 group"
              >
                <FaLinkedin className="text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                aria-label="YouTube" 
                className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:scale-110 group"
              >
                <FaYoutube className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Company Links - spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> About Us
                </a>
              </li>
              <li>
                <a href="/our-team" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Our Team
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Destinations - spans 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Top Destinations
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="/destination/bali" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Bali
              </a>
              <a href="/destination/santorini" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Santorini
              </a>
              <a href="/destination/kyoto" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Kyoto
              </a>
              <a href="/destination/thailand" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Thailand
              </a>
              <a href="/destination/iceland" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Iceland
              </a>
              <a href="/destination/paris" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Paris
              </a>
              <a href="/destination/new-york" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> New York
              </a>
              <a href="/destination/machu-picchu" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span> Machu Picchu
              </a>
            </div>
          </div>

          {/* Newsletter Subscription - spans 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-6">Subscribe to receive exclusive travel deals, insider tips, and personalized recommendations.</p>
            
            <form className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 pl-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-3">Download Our App</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-gray-700/50 transition-all duration-300">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-gray-700/50 transition-all duration-300">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-400">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="py-10 px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-blue-500/20 rounded-2xl shadow-lg mb-12 overflow-hidden relative">
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Ready for Your Next Adventure?</h3>
              <p className="text-blue-100/80 mt-2 max-w-lg">Join thousands of travelers who have discovered their dream destinations with Wanderlust. Start your journey today!</p>
            </div>
            <a
              href="/recommend"
              className="group inline-flex items-center bg-white text-gray-900 font-medium px-8 py-3.5 rounded-xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10">Explore Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-500 to-amber-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Wanderlust Adventures. All rights reserved. Created by Aryan Singh.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}