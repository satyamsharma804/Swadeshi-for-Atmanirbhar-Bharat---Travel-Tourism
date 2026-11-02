import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Recommend from "./components/Recommend";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials"; // Fixed import
import ScrollToTop from "./components/ScrollToTop";
import About from "./components/About";
import Activities from "./components/Activities";
import Accommodation from "./components/Accomodation"; // Fixed spelling
import TravelTips from "./components/TravelTips";
import BookingPage from "./pages/BookingPage";
import DestinationBooking from "./pages/DestinationBooking";
import AccommodationBooking from "./pages/AccommodationBooking";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PaymentOption from "./pages/PaymentOption";
import Success from "./pages/PaymentSuccess";
import Profile from "./components/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import MyBookings from "./pages/MyBookings";
import DestinationDetails from "./components/DestinationDetails";
import AccommodationDetails from "./components/AccomodationDetails"; // ✅ Correct
import MeetOurTeam from "./components/MeetOurTeam"; // New import
import AdminDashboard from "./pages/AdminDashboard"; // New import
import UserQueries from "./pages/UserQueries"; // New import
import AdminQueryManagement from "./pages/AdminQueryManagement"; // New import
import Reviews from "./pages/Reviews"; // New import
import Chatbot from "./components/Chatbot"; // Swadeshi AI Travel Chatbot
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  // Get current path
  const currentPath = window.location.pathname;
  
  // Check if user is on admin page (improved check for all admin routes)
  const isAdminPage = currentPath === "/admin" || currentPath.startsWith("/admin/");

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
      <div className="font-sans scroll-smooth bg-black">
        <ScrollToTop />
        {/* Only show navbar if not on admin page */}
        {!isAdminPage && <Navbar />}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Recommend />
                <Testimonials />
              </>
            }
          />
          {/* Individual Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/select-destination" element={<DestinationBooking />} />
          <Route path="/select-accommodation" element={<AccommodationBooking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentOption" element={<PaymentOption />} />
          <Route path="/success" element={<Success />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/destination-details" element={<DestinationDetails />} />
          <Route path="/accomodation-details" element={<AccommodationDetails />} />
          <Route path="/meet-our-team" element={<MeetOurTeam />} />
          <Route path="/user-queries" element={<UserQueries />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* Admin Routes with protected access */}
          <Route 
            path="/admin" 
            element={
              isLoggedIn && localStorage.getItem("isAdmin") === "true" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/admin/queries" 
            element={
              isLoggedIn && localStorage.getItem("isAdmin") === "true" ? (
                <AdminQueryManagement />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          {/* 404 Page */}
        </Routes>
        {/* Only show footer if not on admin page */}
        {!isAdminPage && <Footer />}
        {/* Floating AI Trip Planner Chatbot */}
        {!isAdminPage && <Chatbot />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
