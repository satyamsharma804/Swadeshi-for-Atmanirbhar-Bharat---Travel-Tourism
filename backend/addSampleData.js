import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';
import Query from './models/Query.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tour_planner';

// Sample users data
const sampleUsers = [
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    password: "password123",
    phone: "9876543210",
    location: "Mumbai, India",
    bio: "Travel enthusiast and adventure seeker",
    gender: "male",
    dob: new Date("1990-05-15"),
    is_admin: false
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    password: "password123",
    phone: "9876543211",
    location: "Delhi, India",
    bio: "Love exploring new places and cultures",
    gender: "female",
    dob: new Date("1992-08-20"),
    is_admin: false
  },
  {
    name: "Amit Patel",
    email: "amit.patel@example.com",
    password: "password123",
    phone: "9876543212",
    location: "Ahmedabad, India",
    bio: "Photography enthusiast and nature lover",
    gender: "male",
    dob: new Date("1988-03-10"),
    is_admin: false
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    password: "password123",
    phone: "9876543213",
    location: "Hyderabad, India",
    bio: "Foodie and travel blogger",
    gender: "female",
    dob: new Date("1995-11-25"),
    is_admin: false
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    password: "password123",
    phone: "9876543214",
    location: "Pune, India",
    bio: "Adventure sports enthusiast",
    gender: "male",
    dob: new Date("1991-07-12"),
    is_admin: false
  },
  {
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    password: "password123",
    phone: "9876543215",
    location: "Bangalore, India",
    bio: "Art and culture explorer",
    gender: "female",
    dob: new Date("1993-09-30"),
    is_admin: false
  },
  {
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    password: "password123",
    phone: "9876543216",
    location: "Surat, India",
    bio: "Business traveler and explorer",
    gender: "male",
    dob: new Date("1989-12-05"),
    is_admin: false
  },
  {
    name: "Kavya Nair",
    email: "kavya.nair@example.com",
    password: "password123",
    phone: "9876543217",
    location: "Kochi, India",
    bio: "Beach lover and sunset chaser",
    gender: "female",
    dob: new Date("1994-04-18"),
    is_admin: false
  },
  {
    name: "Arjun Joshi",
    email: "arjun.joshi@example.com",
    password: "password123",
    phone: "9876543218",
    location: "Dehradun, India",
    bio: "Mountain trekker and nature photographer",
    gender: "male",
    dob: new Date("1992-06-22"),
    is_admin: false
  },
  {
    name: "Meera Iyer",
    email: "meera.iyer@example.com",
    password: "password123",
    phone: "9876543219",
    location: "Chennai, India",
    bio: "Heritage and temple explorer",
    gender: "female",
    dob: new Date("1996-01-14"),
    is_admin: false
  },
  {
    name: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    password: "password123",
    phone: "9876543220",
    location: "Chandigarh, India",
    bio: "City explorer and food connoisseur",
    gender: "male",
    dob: new Date("1990-10-08"),
    is_admin: false
  },
  {
    name: "Divya Rao",
    email: "divya.rao@example.com",
    password: "password123",
    phone: "9876543221",
    location: "Mysore, India",
    bio: "Yoga enthusiast and wellness traveler",
    gender: "female",
    dob: new Date("1993-02-28"),
    is_admin: false
  }
];

// Sample bookings/trips data
const generateBookingId = () => {
  return "BK" + Date.now() + Math.floor(Math.random() * 10000);
};

const sampleBookings = [
  {
    booking_id: generateBookingId(),
    destination: "Goa",
    accommodation: "Beach Resort",
    total_cost: 19999,
    booking_date: new Date("2024-01-15"),
    status: "confirmed",
    booked_by: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Manali",
    accommodation: "Mountain View Hotel",
    total_cost: 14999,
    booking_date: new Date("2024-02-10"),
    status: "confirmed",
    booked_by: "Priya Sharma",
    email: "priya.sharma@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Kerala Backwaters",
    accommodation: "Houseboat",
    total_cost: 24999,
    booking_date: new Date("2024-03-05"),
    status: "confirmed",
    booked_by: "Amit Patel",
    email: "amit.patel@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Jaipur",
    accommodation: "Heritage Palace Hotel",
    total_cost: 15999,
    booking_date: new Date("2024-01-20"),
    status: "pending",
    booked_by: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Shimla",
    accommodation: "Hill Station Resort",
    total_cost: 12999,
    booking_date: new Date("2024-02-25"),
    status: "confirmed",
    booked_by: "Vikram Singh",
    email: "vikram.singh@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Taj Mahal",
    accommodation: "Luxury Hotel Agra",
    total_cost: 9999,
    booking_date: new Date("2024-03-12"),
    status: "confirmed",
    booked_by: "Ananya Desai",
    email: "ananya.desai@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Varanasi",
    accommodation: "Riverside Hotel",
    total_cost: 12999,
    booking_date: new Date("2024-01-30"),
    status: "confirmed",
    booked_by: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Goa",
    accommodation: "Beachside Villa",
    total_cost: 19999,
    booking_date: new Date("2024-02-15"),
    status: "pending",
    booked_by: "Kavya Nair",
    email: "kavya.nair@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Dharamshala",
    accommodation: "Mountain Retreat",
    total_cost: 9999,
    booking_date: new Date("2024-03-20"),
    status: "confirmed",
    booked_by: "Arjun Joshi",
    email: "arjun.joshi@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Mysore",
    accommodation: "Palace View Hotel",
    total_cost: 13999,
    booking_date: new Date("2024-02-08"),
    status: "confirmed",
    booked_by: "Meera Iyer",
    email: "meera.iyer@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Hampi",
    accommodation: "Heritage Stay",
    total_cost: 14999,
    booking_date: new Date("2024-03-18"),
    status: "pending",
    booked_by: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Pondicherry",
    accommodation: "French Quarter Hotel",
    total_cost: 15999,
    booking_date: new Date("2024-01-25"),
    status: "confirmed",
    booked_by: "Divya Rao",
    email: "divya.rao@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Kanyakumari",
    accommodation: "Seaside Resort",
    total_cost: 13999,
    booking_date: new Date("2024-02-28"),
    status: "confirmed",
    booked_by: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Chandratal Lake",
    accommodation: "Camping Site",
    total_cost: 12999,
    booking_date: new Date("2024-03-25"),
    status: "pending",
    booked_by: "Priya Sharma",
    email: "priya.sharma@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Goa",
    accommodation: "Beach Resort",
    total_cost: 19999,
    booking_date: new Date("2024-04-01"),
    status: "confirmed",
    booked_by: "Amit Patel",
    email: "amit.patel@example.com",
    admin_status: "approved"
  },
  // Additional trips
  {
    booking_id: generateBookingId(),
    destination: "Paris",
    accommodation: "Boutique Hotel",
    total_cost: 75000,
    booking_date: new Date("2024-04-15"),
    status: "confirmed",
    booked_by: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "New York City",
    accommodation: "Manhattan Hotel",
    total_cost: 80000,
    booking_date: new Date("2024-05-10"),
    status: "pending",
    booked_by: "Vikram Singh",
    email: "vikram.singh@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Santorini",
    accommodation: "Cliffside Villa",
    total_cost: 65000,
    booking_date: new Date("2024-04-20"),
    status: "confirmed",
    booked_by: "Ananya Desai",
    email: "ananya.desai@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Taj Mahal",
    accommodation: "Heritage Hotel",
    total_cost: 9999,
    booking_date: new Date("2024-03-28"),
    status: "confirmed",
    booked_by: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Manali",
    accommodation: "Snow View Resort",
    total_cost: 14999,
    booking_date: new Date("2024-05-05"),
    status: "pending",
    booked_by: "Kavya Nair",
    email: "kavya.nair@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Kerala Backwaters",
    accommodation: "Luxury Houseboat",
    total_cost: 24999,
    booking_date: new Date("2024-04-25"),
    status: "confirmed",
    booked_by: "Arjun Joshi",
    email: "arjun.joshi@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Jaipur",
    accommodation: "Royal Palace Hotel",
    total_cost: 15999,
    booking_date: new Date("2024-05-15"),
    status: "confirmed",
    booked_by: "Meera Iyer",
    email: "meera.iyer@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Shimla",
    accommodation: "Mall Road Hotel",
    total_cost: 12999,
    booking_date: new Date("2024-04-10"),
    status: "pending",
    booked_by: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Varanasi",
    accommodation: "Ghat View Hotel",
    total_cost: 12999,
    booking_date: new Date("2024-05-20"),
    status: "confirmed",
    booked_by: "Divya Rao",
    email: "divya.rao@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Goa",
    accommodation: "Beachside Resort",
    total_cost: 19999,
    booking_date: new Date("2024-06-01"),
    status: "confirmed",
    booked_by: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Dharamshala",
    accommodation: "Tibetan Guesthouse",
    total_cost: 9999,
    booking_date: new Date("2024-04-30"),
    status: "confirmed",
    booked_by: "Priya Sharma",
    email: "priya.sharma@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Mysore",
    accommodation: "Garden City Hotel",
    total_cost: 13999,
    booking_date: new Date("2024-05-25"),
    status: "pending",
    booked_by: "Amit Patel",
    email: "amit.patel@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Hampi",
    accommodation: "Archaeological Stay",
    total_cost: 14999,
    booking_date: new Date("2024-06-10"),
    status: "confirmed",
    booked_by: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Pondicherry",
    accommodation: "Colonial Bungalow",
    total_cost: 15999,
    booking_date: new Date("2024-05-30"),
    status: "confirmed",
    booked_by: "Vikram Singh",
    email: "vikram.singh@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Kanyakumari",
    accommodation: "Sunrise View Hotel",
    total_cost: 13999,
    booking_date: new Date("2024-06-15"),
    status: "pending",
    booked_by: "Ananya Desai",
    email: "ananya.desai@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Chandratal Lake",
    accommodation: "Mountain Camp",
    total_cost: 12999,
    booking_date: new Date("2024-07-01"),
    status: "confirmed",
    booked_by: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Great Wall of China",
    accommodation: "Beijing Hotel",
    total_cost: 499999,
    booking_date: new Date("2024-07-15"),
    status: "pending",
    booked_by: "Kavya Nair",
    email: "kavya.nair@example.com",
    admin_status: "pending"
  },
  {
    booking_id: generateBookingId(),
    destination: "Sydney Opera House",
    accommodation: "Harbor View Hotel",
    total_cost: 40000,
    booking_date: new Date("2024-08-01"),
    status: "confirmed",
    booked_by: "Arjun Joshi",
    email: "arjun.joshi@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Manali",
    accommodation: "Adventure Resort",
    total_cost: 14999,
    booking_date: new Date("2024-07-20"),
    status: "confirmed",
    booked_by: "Meera Iyer",
    email: "meera.iyer@example.com",
    admin_status: "approved"
  },
  {
    booking_id: generateBookingId(),
    destination: "Goa",
    accommodation: "Luxury Beach Villa",
    total_cost: 19999,
    booking_date: new Date("2024-08-10"),
    status: "pending",
    booked_by: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    admin_status: "pending"
  }
];

// Sample reviews data
const sampleReviews = [
  {
    user_email: "rajesh.kumar@example.com",
    destination: "Goa",
    accommodation: "Beach Resort",
    rating: 5,
    review_text: "Amazing experience! The beach resort was perfect, clean rooms, great food, and excellent service. Highly recommend!"
  },
  {
    user_email: "priya.sharma@example.com",
    destination: "Manali",
    accommodation: "Mountain View Hotel",
    rating: 4,
    review_text: "Beautiful location with stunning mountain views. The hotel was comfortable and staff was very helpful. Would visit again!"
  },
  {
    user_email: "amit.patel@example.com",
    destination: "Kerala Backwaters",
    accommodation: "Houseboat",
    rating: 5,
    review_text: "Absolutely magical experience! The houseboat was luxurious and the backwaters were serene. Best vacation ever!"
  },
  {
    user_email: "ananya.desai@example.com",
    destination: "Taj Mahal",
    accommodation: "Luxury Hotel Agra",
    rating: 5,
    review_text: "The Taj Mahal is breathtaking! The hotel was close to the monument and had excellent facilities. A must-visit destination!"
  },
  {
    user_email: "rahul.mehta@example.com",
    destination: "Varanasi",
    accommodation: "Riverside Hotel",
    rating: 4,
    review_text: "Spiritual and peaceful experience. The Ganga Aarti was mesmerizing. Hotel had good location near the ghats."
  },
  {
    user_email: "kavya.nair@example.com",
    destination: "Goa",
    accommodation: "Beachside Villa",
    rating: 5,
    review_text: "Perfect beach vacation! The villa was beautiful, right on the beach. Great for families and couples. Will definitely come back!"
  },
  {
    user_email: "arjun.joshi@example.com",
    destination: "Dharamshala",
    accommodation: "Mountain Retreat",
    rating: 4,
    review_text: "Peaceful and serene. The mountain retreat was cozy and the views were amazing. Great for meditation and relaxation."
  },
  {
    user_email: "meera.iyer@example.com",
    destination: "Mysore",
    accommodation: "Palace View Hotel",
    rating: 5,
    review_text: "Mysore Palace is magnificent! The hotel had perfect views and the service was excellent. Loved the heritage feel!"
  },
  {
    user_email: "divya.rao@example.com",
    destination: "Pondicherry",
    accommodation: "French Quarter Hotel",
    rating: 4,
    review_text: "Charming French colonial architecture. The hotel was beautiful and the location was perfect for exploring the French Quarter."
  },
  {
    user_email: "vikram.singh@example.com",
    destination: "Shimla",
    accommodation: "Hill Station Resort",
    rating: 4,
    review_text: "Great hill station experience! The resort was comfortable and the weather was perfect. Mall Road was fun to explore."
  },
  {
    user_email: "sneha.reddy@example.com",
    destination: "Jaipur",
    accommodation: "Heritage Palace Hotel",
    rating: 5,
    review_text: "Royal experience! The heritage hotel was stunning and the city's forts and palaces were incredible. Highly recommended!"
  },
  {
    user_email: "karan.malhotra@example.com",
    destination: "Hampi",
    accommodation: "Heritage Stay",
    rating: 4,
    review_text: "Fascinating historical site! The ruins were amazing and the heritage stay added to the experience. Great for history lovers!"
  },
  {
    user_email: "rajesh.kumar@example.com",
    destination: "Kanyakumari",
    accommodation: "Seaside Resort",
    rating: 5,
    review_text: "Beautiful sunrise and sunset views! The resort was excellent and the location was perfect. A unique experience!"
  },
  {
    user_email: "priya.sharma@example.com",
    destination: "Chandratal Lake",
    accommodation: "Camping Site",
    rating: 5,
    review_text: "Adventure of a lifetime! The lake is stunning and camping under the stars was magical. Perfect for adventure seekers!"
  },
  {
    user_email: "arjun.joshi@example.com",
    destination: "Sydney Opera House",
    accommodation: "Harbor View Hotel",
    rating: 5,
    review_text: "Iconic destination! The Opera House is magnificent and the harbor views from the hotel were breathtaking. Unforgettable trip!"
  }
];

// Sample queries data
const sampleQueries = [
  {
    user_email: "rajesh.kumar@example.com",
    subject: "Booking Cancellation Policy",
    message: "Hi, I would like to know about the cancellation policy for my booking. Can I get a full refund if I cancel 7 days before the trip?",
    status: "answered",
    admin_reply: "Thank you for your query. Yes, you can get a full refund if you cancel at least 7 days before your trip date. For cancellations between 3-7 days, 50% refund applies. Cancellations within 3 days are non-refundable. Please contact our support team for assistance."
  },
  {
    user_email: "priya.sharma@example.com",
    subject: "Travel Insurance",
    message: "Do you provide travel insurance with the bookings? What does it cover?",
    status: "answered",
    admin_reply: "Yes, we offer optional travel insurance. It covers medical emergencies, trip cancellations, lost baggage, and flight delays. The insurance costs 2% of your total booking amount. You can add it during the booking process or contact us to add it later."
  },
  {
    user_email: "amit.patel@example.com",
    subject: "Payment Options",
    message: "What payment methods do you accept? Can I pay in installments?",
    status: "answered",
    admin_reply: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. Yes, we offer EMI options for bookings above ₹50,000. You can choose installment plans during checkout. For more details, please contact our payment support team."
  },
  {
    user_email: "sneha.reddy@example.com",
    subject: "Group Booking Discount",
    message: "I'm planning a trip for 10 people. Do you offer any group discounts?",
    status: "pending",
    admin_reply: null
  },
  {
    user_email: "vikram.singh@example.com",
    subject: "Visa Assistance",
    message: "Do you help with visa processing for international destinations like Paris and New York?",
    status: "answered",
    admin_reply: "Yes, we provide visa assistance for international bookings. Our team will guide you through the visa application process and provide necessary documents. Visa processing fees are separate and vary by destination. Please contact our international travel desk for detailed information."
  },
  {
    user_email: "ananya.desai@example.com",
    subject: "Special Dietary Requirements",
    message: "I have specific dietary restrictions. Can the hotels accommodate vegetarian/vegan meals?",
    status: "answered",
    admin_reply: "Absolutely! Most of our partner hotels and accommodations can accommodate special dietary requirements including vegetarian, vegan, Jain, and other preferences. Please mention your dietary needs during booking or contact us at least 3 days before your trip so we can make necessary arrangements."
  },
  {
    user_email: "rahul.mehta@example.com",
    subject: "Early Check-in",
    message: "My flight arrives early in the morning. Can I check in early at the hotel?",
    status: "pending",
    admin_reply: null
  },
  {
    user_email: "kavya.nair@example.com",
    subject: "Transportation from Airport",
    message: "Do you provide airport pickup and drop services? What are the charges?",
    status: "answered",
    admin_reply: "Yes, we provide airport pickup and drop services for most destinations. The charges vary by location and vehicle type (sedan, SUV, or luxury). Airport transfers can be added during booking or booked separately. Standard charges range from ₹500-2000 depending on the destination."
  },
  {
    user_email: "arjun.joshi@example.com",
    subject: "Weather Information",
    message: "What's the best time to visit Manali? What should I pack?",
    status: "answered",
    admin_reply: "The best time to visit Manali is from March to June (spring/summer) and October to February (winter). Summers are pleasant (10-25°C) and winters are cold with snowfall (0-15°C). Pack warm clothes, comfortable shoes, and rain gear. We'll send you a detailed packing list after booking confirmation."
  },
  {
    user_email: "meera.iyer@example.com",
    subject: "Booking Modification",
    message: "Can I modify my booking dates after confirmation?",
    status: "pending",
    admin_reply: null
  },
  {
    user_email: "karan.malhotra@example.com",
    subject: "Adventure Activities",
    message: "Do you organize adventure activities like paragliding, river rafting, etc.?",
    status: "answered",
    admin_reply: "Yes! We offer various adventure activities at select destinations including paragliding, river rafting, trekking, bungee jumping, and more. These can be added to your booking or booked separately. All activities are conducted by certified instructors with proper safety measures."
  },
  {
    user_email: "divya.rao@example.com",
    subject: "Loyalty Program",
    message: "Do you have a loyalty or rewards program for frequent travelers?",
    status: "pending",
    admin_reply: null
  },
  {
    user_email: "rajesh.kumar@example.com",
    subject: "Photography Tours",
    message: "Are there any special photography tours available?",
    status: "answered",
    admin_reply: "Yes, we offer specialized photography tours at scenic destinations like Kerala Backwaters, Manali, and Goa. These tours include professional guides, best timing for photos, and access to exclusive locations. Photography tours can be added during booking or separately."
  },
  {
    user_email: "priya.sharma@example.com",
    subject: "Pet-Friendly Accommodations",
    message: "I want to travel with my pet. Do you have pet-friendly hotels?",
    status: "pending",
    admin_reply: null
  },
  {
    user_email: "amit.patel@example.com",
    subject: "Emergency Contact",
    message: "What is your 24/7 emergency helpline number?",
    status: "answered",
    admin_reply: "Our 24/7 emergency helpline is +91-1800-XXX-XXXX. This number is available for all travel-related emergencies, booking issues, or urgent assistance. You'll also receive this number in your booking confirmation email and SMS."
  }
];

async function addSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Add users
    console.log('\n📝 Adding users...');
    let usersAdded = 0;
    let usersSkipped = 0;

    for (const userData of sampleUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
        
        if (existingUser) {
          console.log(`⏭️  User ${userData.email} already exists, skipping...`);
          usersSkipped++;
          continue;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create user
        const user = new User({
          ...userData,
          email: userData.email.toLowerCase(),
          password: userData.password,
          hashed_password: hashedPassword
        });

        await user.save();
        usersAdded++;
        console.log(`✅ Added user: ${userData.name} (${userData.email})`);
      } catch (error) {
        console.error(`❌ Error adding user ${userData.email}:`, error.message);
      }
    }

    console.log(`\n📊 Users Summary: ${usersAdded} added, ${usersSkipped} skipped`);

    // Add bookings
    console.log('\n📝 Adding bookings/trips...');
    let bookingsAdded = 0;
    let bookingsSkipped = 0;

    for (const bookingData of sampleBookings) {
      try {
        // Generate unique booking ID if not already set
        if (!bookingData.booking_id || bookingData.booking_id.includes("Date.now()")) {
          bookingData.booking_id = generateBookingId();
        }
        
        // Check if booking already exists
        const existingBooking = await Booking.findOne({ 
          booking_id: bookingData.booking_id
        });
        
        if (existingBooking) {
          console.log(`⏭️  Booking ${bookingData.booking_id} already exists, skipping...`);
          bookingsSkipped++;
          continue;
        }

        // Create booking
        const booking = new Booking(bookingData);
        await booking.save();
        bookingsAdded++;
        console.log(`✅ Added booking: ${bookingData.destination} for ${bookingData.booked_by}`);
      } catch (error) {
        console.error(`❌ Error adding booking:`, error.message);
      }
    }

    console.log(`\n📊 Bookings Summary: ${bookingsAdded} added, ${bookingsSkipped} skipped`);

    // Add reviews
    console.log('\n📝 Adding reviews...');
    let reviewsAdded = 0;
    let reviewsSkipped = 0;

    // Get approved bookings to link reviews
    const approvedBookings = await Booking.find({ 
      admin_status: "approved",
      status: "confirmed"
    }).limit(15);

    for (let i = 0; i < sampleReviews.length && i < approvedBookings.length; i++) {
      try {
        const reviewData = sampleReviews[i];
        const booking = approvedBookings[i];

        // Check if review already exists for this booking
        const existingReview = await Review.findOne({ 
          booking_id: booking.booking_id 
        });

        if (existingReview) {
          console.log(`⏭️  Review for booking ${booking.booking_id} already exists, skipping...`);
          reviewsSkipped++;
          continue;
        }

        // Create review with booking_id
        const review = new Review({
          booking_id: booking.booking_id,
          user_email: reviewData.user_email.toLowerCase(),
          destination: reviewData.destination,
          accommodation: reviewData.accommodation,
          rating: reviewData.rating,
          review_text: reviewData.review_text
        });

        await review.save();
        reviewsAdded++;
        console.log(`✅ Added review for ${reviewData.destination} by ${reviewData.user_email}`);
      } catch (error) {
        console.error(`❌ Error adding review:`, error.message);
      }
    }

    console.log(`\n📊 Reviews Summary: ${reviewsAdded} added, ${reviewsSkipped} skipped`);

    // Add queries
    console.log('\n📝 Adding queries...');
    let queriesAdded = 0;
    let queriesSkipped = 0;

    for (const queryData of sampleQueries) {
      try {
        // Check if similar query already exists
        const existingQuery = await Query.findOne({ 
          user_email: queryData.user_email.toLowerCase(),
          subject: queryData.subject
        });

        if (existingQuery) {
          console.log(`⏭️  Query "${queryData.subject}" by ${queryData.user_email} already exists, skipping...`);
          queriesSkipped++;
          continue;
        }

        // Create query
        const query = new Query({
          user_email: queryData.user_email.toLowerCase(),
          subject: queryData.subject,
          message: queryData.message,
          status: queryData.status,
          admin_reply: queryData.admin_reply
        });

        await query.save();
        queriesAdded++;
        console.log(`✅ Added query: "${queryData.subject}" by ${queryData.user_email}`);
      } catch (error) {
        console.error(`❌ Error adding query:`, error.message);
      }
    }

    console.log(`\n📊 Queries Summary: ${queriesAdded} added, ${queriesSkipped} skipped`);

    // Final summary
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalQueries = await Query.countDocuments();

    console.log('\n🎉 Sample data addition completed!');
    console.log(`\n📈 Database Statistics:`);
    console.log(`   Total Users: ${totalUsers}`);
    console.log(`   Total Bookings: ${totalBookings}`);
    console.log(`   Total Reviews: ${totalReviews}`);
    console.log(`   Total Queries: ${totalQueries}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addSampleData();

