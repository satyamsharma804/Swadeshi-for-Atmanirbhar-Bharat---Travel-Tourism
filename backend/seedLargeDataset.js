import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';
import Query from './models/Query.js';
import Destination from './models/Destination.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

// 70 realistic users data
const rawUsersData = [
  { name: "Aarav Sharma", email: "aarav.sharma@gmail.com", phone: "9811234501", location: "New Delhi, India", bio: "Tech entrepreneur and weekend trekker.", gender: "male", dob: "1994-03-12" },
  { name: "Ananya Iyer", email: "ananya.iyer@yahoo.com", phone: "9822345602", location: "Chennai, India", bio: "Classical dancer exploring ancient temple architecture.", gender: "female", dob: "1996-07-24" },
  { name: "Rohan Kulkarni", email: "rohan.kulkarni@gmail.com", phone: "9833456703", location: "Pune, India", bio: "Biker and outdoor camping enthusiast.", gender: "male", dob: "1991-11-15" },
  { name: "Pooja Hegde", email: "pooja.hegde@outlook.com", phone: "9844567804", location: "Bengaluru, India", bio: "UI/UX designer who loves serene mountain retreats.", gender: "female", dob: "1995-02-18" },
  { name: "Vikram Malhotra", email: "vikram.m@gmail.com", phone: "9855678905", location: "Mumbai, India", bio: "Finance manager traveling to unwind by the sea.", gender: "male", dob: "1988-09-05" },
  { name: "Ishita Banerjee", email: "ishita.banerjee@gmail.com", phone: "9866789006", location: "Kolkata, India", bio: "Literature enthusiast and heritage walk explorer.", gender: "female", dob: "1993-04-30" },
  { name: "Kabir Mehra", email: "kabir.mehra@gmail.com", phone: "9877890107", location: "Gurugram, India", bio: "Product lead and wildlife safari fanatic.", gender: "male", dob: "1990-08-14" },
  { name: "Diya Patel", email: "diya.patel@yahoo.com", phone: "9888901208", location: "Ahmedabad, India", bio: "Food blogger discovering local cuisines across Bharat.", gender: "female", dob: "1997-12-09" },
  { name: "Aditya Verma", email: "aditya.verma@outlook.com", phone: "9899012309", location: "Lucknow, India", bio: "History buff visiting forts and monuments.", gender: "male", dob: "1992-06-21" },
  { name: "Sneha Nair", email: "sneha.nair@gmail.com", phone: "9812345610", location: "Kochi, India", bio: "Environmental researcher loving eco-resorts & backwaters.", gender: "female", dob: "1994-10-11" },
  { name: "Kunal Singhania", email: "kunal.singhania@gmail.com", phone: "9823456711", location: "Jaipur, India", bio: "Architect inspired by royal Rajasthani palaces.", gender: "male", dob: "1989-05-19" },
  { name: "Riya Sen", email: "riya.sen@yahoo.com", phone: "9834567812", location: "Guwahati, India", bio: "Nature lover promoting North-East ecotourism.", gender: "female", dob: "1996-01-27" },
  { name: "Siddharth Rao", email: "siddharth.rao@gmail.com", phone: "9845678913", location: "Hyderabad, India", bio: "Cloud consultant on a mission to visit all Jyotirlingas.", gender: "male", dob: "1991-09-17" },
  { name: "Tanvi Joshi", email: "tanvi.joshi@outlook.com", phone: "9856789014", location: "Dehradun, India", bio: "Himalayan valley hiker and landscape photographer.", gender: "female", dob: "1995-08-03" },
  { name: "Harsh Vardhan", email: "harsh.vardhan@gmail.com", phone: "9867890115", location: "Patna, India", bio: "Civil engineer traveling across coastal highways.", gender: "male", dob: "1993-11-28" },
  { name: "Megha Gupta", email: "megha.gupta@gmail.com", phone: "9878901216", location: "Indore, India", bio: "Passionate about yoga retreats and spiritual tourism.", gender: "female", dob: "1992-03-08" },
  { name: "Varun Chopra", email: "varun.chopra@yahoo.com", phone: "9889012317", location: "Chandigarh, India", bio: "Adventure sports enthusiast: river rafting & paragliding.", gender: "male", dob: "1990-12-14" },
  { name: "Kavita Deshmukh", email: "kavita.deshmukh@gmail.com", phone: "9890123418", location: "Nagpur, India", bio: "Wildlife volunteer frequenting Tadoba & Pench reserves.", gender: "female", dob: "1987-07-16" },
  { name: "Nikhil Bhatt", email: "nikhil.bhatt@outlook.com", phone: "9811234519", location: "Surat, India", bio: "Textile exporter balancing business with beach holidays.", gender: "male", dob: "1994-04-02" },
  { name: "Shalini Tripathi", email: "shalini.tripathi@gmail.com", phone: "9822345620", location: "Varanasi, India", bio: "Devoted spiritual traveler and documentary filmmaker.", gender: "female", dob: "1993-09-23" },
  { name: "Gaurav Saxena", email: "gaurav.saxena@gmail.com", phone: "9833456721", location: "Bhopal, India", bio: "History buff visiting UNESCO world heritage sites.", gender: "male", dob: "1989-02-14" },
  { name: "Shruti Mathur", email: "shruti.mathur@yahoo.com", phone: "9844567822", location: "Udaipur, India", bio: "Heritage hotel aficionado and wedding planner.", gender: "female", dob: "1995-10-06" },
  { name: "Alok Pandey", email: "alok.pandey@gmail.com", phone: "9855678923", location: "Kanpur, India", bio: "Solo backpacker exploring off-the-beaten-path villages.", gender: "male", dob: "1992-01-19" },
  { name: "Preeti Pillai", email: "preeti.pillai@outlook.com", phone: "9866789024", location: "Thiruvananthapuram, India", bio: "Ayurvedic wellness consultant exploring Kerala stays.", gender: "female", dob: "1991-06-30" },
  { name: "Abhishek Nambiar", email: "abhishek.nambiar@gmail.com", phone: "9877890125", location: "Kozhikode, India", bio: "Software architect who works remotely from hill stations.", gender: "male", dob: "1996-08-11" },
  { name: "Kiran Mazumdar", email: "kiran.mazumdar@gmail.com", phone: "9888901226", location: "Bhubaneswar, India", bio: "Culture preservationist documenting Odishan temple crafts.", gender: "female", dob: "1990-03-25" },
  { name: "Manish Chawla", email: "manish.chawla@yahoo.com", phone: "9899012327", location: "Amritsar, India", bio: "Culinary explorer and Golden Temple visitor.", gender: "male", dob: "1988-11-04" },
  { name: "Pallavi Gowda", email: "pallavi.gowda@gmail.com", phone: "9812345628", location: "Mysuru, India", bio: "Botanist who loves Coorg coffee estates and Wayanad forests.", gender: "female", dob: "1994-05-15" },
  { name: "Saurabh Mishra", email: "saurabh.mishra@outlook.com", phone: "9823456729", location: "Prayagraj, India", bio: "River tourism explorer fascinated by the holy Sangam.", gender: "male", dob: "1992-12-01" },
  { name: "Radhika Kothari", email: "radhika.kothari@gmail.com", phone: "9834567830", location: "Jodhpur, India", bio: "Desert camping enthusiast and camel safari lover.", gender: "female", dob: "1997-04-18" },
  { name: "Deepak Rawat", email: "deepak.rawat@gmail.com", phone: "9845678931", location: "Rishikesh, India", bio: "Certified river rafting guide & Himalayan trekking lead.", gender: "male", dob: "1991-07-22" },
  { name: "Simran Kaur", email: "simran.kaur@yahoo.com", phone: "9856789032", location: "Ludhiana, India", bio: "Fashion stylist traveling for handicraft exhibitions.", gender: "female", dob: "1995-11-13" },
  { name: "Tarun Reddy", email: "tarun.reddy@gmail.com", phone: "9867890133", location: "Visakhapatnam, India", bio: "Marine enthusiast fond of Araku valley and Rishikonda beach.", gender: "male", dob: "1993-02-27" },
  { name: "Aarti Shukla", email: "aarti.shukla@outlook.com", phone: "9878901234", location: "Noida, India", bio: "HR consultant planning family vacations across Himachal.", gender: "female", dob: "1989-10-09" },
  { name: "Mohit Jindal", email: "mohit.jindal@gmail.com", phone: "9889012335", location: "Faridabad, India", bio: "Car enthusiast taking cross-country road trips.", gender: "male", dob: "1994-08-16" },
  { name: "Rashi Agarwal", email: "rashi.agarwal@gmail.com", phone: "9890123436", location: "Agra, India", bio: "Mughal art historian and heritage promoter.", gender: "female", dob: "1996-06-05" },
  { name: "Pradeep Goswami", email: "pradeep.goswami@yahoo.com", phone: "9811234537", location: "Haridwar, India", bio: "Pilgrimage traveler and morning Ganga aarti devotee.", gender: "male", dob: "1987-12-30" },
  { name: "Sonali Bose", email: "sonali.bose@gmail.com", phone: "9822345638", location: "Siliguri, India", bio: "Darjeeling tea connoisseur and toy train lover.", gender: "female", dob: "1993-05-21" },
  { name: "Vivek Menon", email: "vivek.menon@outlook.com", phone: "9833456739", location: "Thrissur, India", bio: "Cultural festival traveler & traditional music recorder.", gender: "male", dob: "1990-09-14" },
  { name: "Komal Rathore", email: "komal.rathore@gmail.com", phone: "9844567840", location: "Kota, India", bio: "Chambal river sanctuary visitor and wildlife lover.", gender: "female", dob: "1995-03-17" },
  { name: "Sachin Tendulkar", email: "sachin.t@gmail.com", phone: "9855678941", location: "Thane, India", bio: "Sports travel fanatic and Konkan beach explorer.", gender: "male", dob: "1992-04-24" },
  { name: "Monika Sharma", email: "monika.s@yahoo.com", phone: "9866789042", location: "Shimla, India", bio: "Himachal native sharing hidden mountain gems.", gender: "female", dob: "1994-01-15" },
  { name: "Devendra Yadav", email: "devendra.yadav@gmail.com", phone: "9877890143", location: "Gwalior, India", bio: "Fort enthusiast and heritage music tourist.", gender: "male", dob: "1988-08-29" },
  { name: "Jyoti Maurya", email: "jyoti.m@outlook.com", phone: "9888901244", location: "Ranchi, India", bio: "Waterfall chaser in Jharkhand's scenic forests.", gender: "female", dob: "1996-10-20" },
  { name: "Ashish Tandon", email: "ashish.tandon@gmail.com", phone: "9899012345", location: "Bareilly, India", bio: "Handicrafts collector and rustic homestay lover.", gender: "male", dob: "1991-03-03" },
  { name: "Neetu Kashyap", email: "neetu.k@gmail.com", phone: "9812345646", location: "Jammu, India", bio: "Vaishno Devi and Patnitop nature lover.", gender: "female", dob: "1993-07-19" },
  { name: "Mayank Bhardwaj", email: "mayank.bhardwaj@yahoo.com", phone: "9823456747", location: "Meerut, India", bio: "Scuba diving certified enthusiast exploring Andamans.", gender: "male", dob: "1995-12-08" },
  { name: "Swati Hegde", email: "swati.hegde@gmail.com", phone: "9834567848", location: "Mangaluru, India", bio: "Coastal cuisine blogger and temple architecture researcher.", gender: "female", dob: "1992-09-02" },
  { name: "Arvind Swamy", email: "arvind.swamy@outlook.com", phone: "9845678949", location: "Madurai, India", bio: "Meenakshi temple historian and heritage walk organizer.", gender: "male", dob: "1989-06-16" },
  { name: "Renu Bala", email: "renu.bala@gmail.com", phone: "9856789050", location: "Jalandhar, India", bio: "Family holiday organizer visiting hill stations each summer.", gender: "female", dob: "1990-11-25" },
  { name: "Karthik Raja", email: "karthik.raja@gmail.com", phone: "9867890151", location: "Coimbatore, India", bio: "Western Ghats trekker and Ooty Nilgiri tea trail walker.", gender: "male", dob: "1994-08-28" },
  { name: "Smita Kulkarni", email: "smita.k@yahoo.com", phone: "9878901252", location: "Kolhapur, India", bio: "Panhala fort lover and traditional Kolhapuri cuisine explorer.", gender: "female", dob: "1991-04-10" },
  { name: "Ajay Dev", email: "ajay.dev@gmail.com", phone: "9889012353", location: "Panaji, India", bio: "Goan local promoting sustainable inland spice farm tours.", gender: "male", dob: "1993-01-05" },
  { name: "Suman Lata", email: "suman.lata@outlook.com", phone: "9890123454", location: "Rohtak, India", bio: "Spiritual tour enthusiast exploring Mathura, Vrindavan, Ayodhya.", gender: "female", dob: "1987-05-14" },
  { name: "Harish Chandra", email: "harish.c@gmail.com", phone: "9811234555", location: "Almora, India", bio: "Kumaon hill resident welcoming backpackers and stargazers.", gender: "male", dob: "1992-10-31" },
  { name: "Payal Mittal", email: "payal.mittal@gmail.com", phone: "9822345656", location: "Bathinda, India", bio: "Luxury resort reviewer and weekend wellness traveler.", gender: "female", dob: "1996-02-12" },
  { name: "Sandeep Baghel", email: "sandeep.baghel@yahoo.com", phone: "9833456757", location: "Mathura, India", bio: "Braj circuit expert documenting Krishna heritage sites.", gender: "male", dob: "1990-07-07" },
  { name: "Sunita Chauhan", email: "sunita.c@gmail.com", phone: "9844567858", location: "Solan, India", bio: "Pine forest homestay host and Apple orchard tender.", gender: "female", dob: "1989-12-22" },
  { name: "Bikash Pradhan", email: "bikash.pradhan@outlook.com", phone: "9855678959", location: "Gangtok, India", bio: "Sikkim eco-tourism ambassador and Kanchenjunga guide.", gender: "male", dob: "1994-06-18" },
  { name: "Anjali Bhattacharya", email: "anjali.b@gmail.com", phone: "9866789060", location: "Howrah, India", bio: "Sundarbans mangrove explorer and Bengal tiger observer.", gender: "female", dob: "1995-09-09" },
  { name: "Girish Murthy", email: "girish.murthy@gmail.com", phone: "9877890161", location: "Hubli, India", bio: "Hampi stone temple enthusiast and river coracle paddler.", gender: "male", dob: "1991-03-14" },
  { name: "Rupali Thorat", email: "rupali.t@yahoo.com", phone: "9888901262", location: "Nashik, India", bio: "Vineyard weekend visitor and Trimbakeshwar pilgrim.", gender: "female", dob: "1993-11-03" },
  { name: "Chandan Roy", email: "chandan.roy@gmail.com", phone: "9899012363", location: "Asansol, India", bio: "Railway heritage fan traveling on scenic mountain tracks.", gender: "male", dob: "1988-02-28" },
  { name: "Sheetal Rawat", email: "sheetal.rawat@outlook.com", phone: "9812345664", location: "Nainital, India", bio: "Lake lover and nature walk planner in Uttarakhand.", gender: "female", dob: "1997-07-04" },
  { name: "Manoj Tiwari", email: "manoj.tiwari@gmail.com", phone: "9823456765", location: "Gorakhpur, India", bio: "Kushinagar Buddhist circuit traveler and heritage enthusiast.", gender: "male", dob: "1990-01-20" },
  { name: "Leela Nair", email: "leela.nair@gmail.com", phone: "9834567866", location: "Alappuzha, India", bio: "Backwater cruise organizer and coastal fish culinary explorer.", gender: "female", dob: "1992-08-15" },
  { name: "Pawan Kalyan", email: "pawan.kalyan@yahoo.com", phone: "9845678967", location: "Vijayawada, India", bio: "Bhavani island visitor and Krishna river cruise fan.", gender: "male", dob: "1994-12-05" },
  { name: "Deepa Kurian", email: "deepa.kurian@gmail.com", phone: "9856789068", location: "Kottayam, India", bio: "Kumarakom bird sanctuary lover and tea planter family member.", gender: "female", dob: "1991-05-27" },
  { name: "Rajiv Bhatia", email: "rajiv.bhatia@outlook.com", phone: "9867890169", location: "Ambala, India", bio: "Spiti valley 4x4 road tripper and high altitude camper.", gender: "male", dob: "1989-10-14" },
  { name: "Divya Sengupta", email: "divya.sengupta@gmail.com", phone: "9878901270", location: "Durgapur, India", bio: "Shantiniketan Rabindra sangeet and handicrafts traveler.", gender: "female", dob: "1996-03-31" }
];

// Curated destinations and accommodations for realistic booking generation
const destinationsPool = [
  { dest: "Goa", acc: "Calangute Beachfront Villa", minCost: 15000, maxCost: 35000 },
  { dest: "Goa", acc: "South Goa Luxury Heritage Resort", minCost: 22000, maxCost: 45000 },
  { dest: "Manali", acc: "Himalayan Pine View Cottage", minCost: 12000, maxCost: 28000 },
  { dest: "Manali", acc: "Old Manali Riverside Homestay", minCost: 8000, maxCost: 18000 },
  { dest: "Kerala Backwaters", acc: "Deluxe Alleppey Houseboat", minCost: 18000, maxCost: 42000 },
  { dest: "Kerala Backwaters", acc: "Kumarakom Lakefront Ayurvedic Resort", minCost: 25000, maxCost: 55000 },
  { dest: "Jaipur", acc: "Royal Rajputana Heritage Haveli", minCost: 14000, maxCost: 38000 },
  { dest: "Jaipur", acc: "Pink City Boutique Palace Hotel", minCost: 19000, maxCost: 48000 },
  { dest: "Shimla", acc: "Mall Road Colonial British Suite", minCost: 11000, maxCost: 29000 },
  { dest: "Varanasi", acc: "Ganga Ghats View Heritage Haveli", minCost: 9000, maxCost: 24000 },
  { dest: "Taj Mahal Agra", acc: "Mughal Imperial Luxury Palace", minCost: 16000, maxCost: 39000 },
  { dest: "Udaipur", acc: "Lake Pichola Water View Palace", minCost: 26000, maxCost: 65000 },
  { dest: "Leh Ladakh", acc: "Pangong Lake Luxury Glamping Camp", minCost: 22000, maxCost: 48000 },
  { dest: "Rishikesh", acc: "Ganges Riverfront Wellness Retreat", minCost: 13000, maxCost: 31000 },
  { dest: "Ooty", acc: "Nilgiri Mountain Tea Estate Bungalow", minCost: 14000, maxCost: 32000 },
  { dest: "Darjeeling", acc: "Kanchenjunga Sunrise Heritage Lodge", minCost: 12500, maxCost: 27000 },
  { dest: "Hampi", acc: "Tungabhadra River Boulder View Homestay", minCost: 9500, maxCost: 21000 },
  { dest: "Pondicherry", acc: "French Quarter Colonial Heritage Villa", minCost: 15500, maxCost: 36000 },
  { dest: "Munnar", acc: "Cloud Valley Tea Plantation Resort", minCost: 13500, maxCost: 33000 },
  { dest: "Andaman Islands", acc: "Havelock Island Private Beachfront Resort", minCost: 35000, maxCost: 75000 },
  { dest: "Meghalaya", acc: "Cherrapunji Living Root Bridge Eco-Lodge", minCost: 12000, maxCost: 26000 },
  { dest: "Mysore", acc: "Royal Mysore Heritage Palace Stay", minCost: 10000, maxCost: 23000 }
];

const sampleReviewsPool = [
  "Breathtaking views and impeccable hospitality! The staff went above and beyond to make our stay comfortable.",
  "Truly an unforgettable Swadeshi travel experience. The authentic local cuisine and serene surroundings made our trip.",
  "Great location, very clean rooms, and courteous management. Highly recommend for both families and couples.",
  "Mesmerizing sunrise view right from the room balcony. Booking through the platform was completely seamless.",
  "Excellent amenities, warm hospitality, and reasonable pricing. Will definitely book through this planner again!",
  "Peaceful and serene ambiance away from the hustle of the city. The guided cultural tours arranged were top notch.",
  "Super comfortable stay with fantastic scenic backdrops. Everything mentioned in the itinerary was delivered accurately.",
  "The houseboat experience was pure bliss! Clean waters, delicious traditional meals, and peaceful cruising.",
  "Royal architecture, beautiful palace courtyards, and exceptional cultural music in the evenings. Truly magical!",
  "Great adventure activities arranged: trekking, river rafting, and camping under the stars. 5 stars all the way!"
];

const sampleQueriesPool = [
  { subj: "Snowfall timing and road status inquiry", msg: "Hi team, planning a family trip next month. Can you confirm if Rohtang pass is accessible and if heavy snow is expected?" },
  { subj: "Vegetarian / Jain food availability", msg: "Hello, we are a family of 4 requiring strictly pure vegetarian / Jain food. Can the resort chef customize meals accordingly?" },
  { subj: "Airport pickup and drop transfer booking", msg: "Kindly let us know if private airport taxi pickup from the airport to our hotel is included or can be added to the package." },
  { subj: "Rescheduling policy for emergency circumstances", msg: "Due to urgent official work, I may need to postpone my booking dates by 10 days. What is the rescheduling process?" },
  { subj: "Corporate group discount for 16 persons", msg: "We are planning an annual company team retreat for 16 colleagues. Do you offer custom corporate group tariffs?" },
  { subj: "Pet-friendly accommodation confirmation", msg: "I am traveling with my golden retriever. Could you please confirm if this particular resort has pet-friendly rooms and lawn area?" },
  { subj: "Senior citizen assistance and wheel-chair access", msg: "My elderly parents are traveling with us. Does the property have lift access and wheelchair ramps at tourist spots?" },
  { subj: "Early check-in request", msg: "Our flight lands early in the morning at 6:30 AM. Can we arrange an early check-in or luggage storage at the reception?" },
  { subj: "Invoice with GST details for business expense", msg: "I need a tax invoice with our company GSTIN for reimbursement. How can I download the formal invoice?" },
  { subj: "Custom adventure activities add-on", msg: "Can we include paragliding and river rafting directly in our customized package itinerary?" }
];

const adminRepliesPool = [
  "Namaste! Yes, the property management has been notified and all your requirements have been accommodated. Have a wonderful trip!",
  "Greetings! Our local destination coordinator has confirmed that pure vegetarian and customized meals will be prepared freshly for your family.",
  "Hello! Private sanitized AC taxi transfers have been arranged for your pickup and drop. The driver details will be shared on SMS/Email 24 hours prior.",
  "Hello! Date rescheduling is permitted with zero cancellation penalties when requested at least 7 days before check-in. Our support team will assist you.",
  "Namaste! We offer a special 15% group discount for parties of 10 or more. Our corporate relationship manager will reach out with the customized quote.",
  "Hello! Yes, the selected property is proudly pet-friendly. Please carry vaccination certificates during check-in for smooth registration."
];

async function seedData() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas:', mongoose.connection.name);

    // 1. Hash password once for performance
    console.log('🔐 Preparing secure credentials...');
    const commonHashedPassword = await bcrypt.hash('password123', 10);

    // 2. Insert 70 Users
    console.log(`\n👥 Inserting ${rawUsersData.length} Real-World Users...`);
    let usersAdded = 0;
    let usersSkipped = 0;
    const insertedUsers = [];

    for (const u of rawUsersData) {
      const existing = await User.findOne({ email: u.email.toLowerCase() });
      if (existing) {
        usersSkipped++;
        insertedUsers.push(existing);
      } else {
        const newUser = new User({
          name: u.name,
          email: u.email.toLowerCase(),
          hashed_password: commonHashedPassword,
          phone: u.phone,
          location: u.location,
          bio: u.bio,
          gender: u.gender,
          dob: new Date(u.dob),
          is_admin: false
        });
        await newUser.save();
        usersAdded++;
        insertedUsers.push(newUser);
      }
    }
    console.log(`✅ Users: ${usersAdded} added, ${usersSkipped} already existed.`);

    // 3. Generate 85 realistic bookings for these users
    console.log('\n✈️ Generating 85 Realistic Bookings across India & top tourist circuits...');
    let bookingsAdded = 0;
    let reviewsAdded = 0;

    const allActiveUsers = await User.find({ is_admin: { $ne: true } });

    for (let i = 0; i < 85; i++) {
      const user = allActiveUsers[i % allActiveUsers.length];
      const destInfo = destinationsPool[i % destinationsPool.length];
      const randomBookingId = `BK${Date.now().toString().slice(-6)}${1000 + i}`;
      
      const existingBooking = await Booking.findOne({ booking_id: randomBookingId });
      if (existingBooking) continue;

      // Varied dates across 2024, 2025, and 2026
      const monthOffset = (i * 7) % 24;
      const travelDate = new Date();
      travelDate.setMonth(travelDate.getMonth() - 12 + monthOffset);

      const isPast = travelDate < new Date();
      const status = isPast ? 'completed' : (i % 5 === 0 ? 'pending' : (i % 15 === 0 ? 'cancelled' : 'confirmed'));
      const adminStatus = status === 'cancelled' ? 'rejected' : (status === 'pending' ? 'pending' : 'approved');

      const costRange = destInfo.maxCost - destInfo.minCost;
      const calculatedCost = destInfo.minCost + Math.floor((i * 137) % costRange);

      const booking = new Booking({
        booking_id: randomBookingId,
        destination: destInfo.dest,
        accommodation: destInfo.acc,
        total_cost: calculatedCost,
        booking_date: travelDate,
        status: status,
        booked_by: user.name,
        email: user.email.toLowerCase(),
        admin_status: adminStatus
      });

      await booking.save();
      bookingsAdded++;

      // If completed or confirmed, generate review for 65% of bookings
      if ((status === 'completed' || status === 'confirmed') && i % 3 !== 0) {
        const existingReview = await Review.findOne({ booking_id: randomBookingId });
        if (!existingReview) {
          const rating = (i % 7 === 0) ? 3 : ((i % 4 === 0) ? 4 : 5);
          const reviewText = sampleReviewsPool[i % sampleReviewsPool.length];

          const review = new Review({
            booking_id: randomBookingId,
            user_email: user.email.toLowerCase(),
            destination: destInfo.dest,
            accommodation: destInfo.acc,
            rating: rating,
            review_text: reviewText
          });

          await review.save();
          reviewsAdded++;
        }
      }
    }
    console.log(`✅ Bookings: ${bookingsAdded} added.`);
    console.log(`⭐ Reviews: ${reviewsAdded} added.`);

    // 4. Insert 35 Queries
    console.log('\n💬 Inserting 35 Customer Queries & Support Tickets...');
    let queriesAdded = 0;

    for (let i = 0; i < 35; i++) {
      const user = allActiveUsers[(i * 3) % allActiveUsers.length];
      const qTemplate = sampleQueriesPool[i % sampleQueriesPool.length];
      const isAnswered = i % 4 !== 0;

      const query = new Query({
        user_email: user.email.toLowerCase(),
        subject: `${qTemplate.subj} (#${100 + i})`,
        message: qTemplate.msg,
        status: isAnswered ? 'answered' : 'pending',
        admin_reply: isAnswered ? adminRepliesPool[i % adminRepliesPool.length] : null
      });

      await query.save();
      queriesAdded++;
    }
    console.log(`✅ Queries: ${queriesAdded} added.`);

    // Print final database stats
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalQueries = await Query.countDocuments();

    console.log('\n==========================================');
    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('==========================================');
    console.log(`📊 Total Users in MongoDB Atlas:   ${totalUsers}`);
    console.log(`✈️ Total Bookings in Database:     ${totalBookings}`);
    console.log(`⭐ Total Reviews in Database:      ${totalReviews}`);
    console.log(`💬 Total Queries in Database:      ${totalQueries}`);
    console.log('==========================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedData();

