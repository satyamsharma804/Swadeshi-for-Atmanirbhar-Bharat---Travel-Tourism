import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination.js';
import { destinations as websiteDestinations } from '../Frontend/src/data/Recommend.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config();
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Additional curated Indian destinations to give comprehensive coverage across all states
const extraIndianDestinations = [
  {
    title: "Rann of Kutch",
    subTitle: "The Great White Salt Desert, vibrant Rann Utsav cultural carnival, and Kutchi handicrafts.",
    location: "Kutch, Gujarat, India",
    description: "Witness the surreal endless expanse of white salt under full moon skies, traditional Kutchi mud bhungas, and vibrant folk dance.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    cost: "17999",
    duration: "4 days",
    distance: "320 km from Ahmedabad",
    rating: 4.9,
    reviews: 4800,
    tripHighlights: [
      "Stargaze across the shimmering Great White Salt Desert on a full moon night",
      "Stay in authentic luxury tent cities and traditional decorated Bhungas at Dhordo",
      "Attend lively Gujarati garba, folk music, and desert camel cart rides",
      "Shop for intricate Rogan art, Bandhani sarees, and lacquer woodwork",
      "Visit the 4,500-year-old Harappan metropolis ruins at Dholavira"
    ],
    is_india: true
  },
  {
    title: "Gokarna & Om Beach",
    subTitle: "A peaceful coastal paradise with Om-shaped beaches, Western Ghats cliffside treks, and ancient Shiva shrines.",
    location: "Uttara Kannada, Karnataka, India",
    description: "An unhurried coastal getaway offering unspoiled crescent beaches, cliffside sea-view shacks, and sacred Mahabaleshwar temple.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80",
    cost: "11999",
    duration: "3 days",
    distance: "140 km from Goa",
    rating: 4.8,
    reviews: 3600,
    tripHighlights: [
      "Trek along the scenic coastal cliff trail connecting Kudle Beach to Half Moon Beach",
      "Unwind at the iconic Om Beach shaped naturally like the sacred 'ॐ' symbol",
      "Visit the 4th-century Mahabaleshwar Temple enshrining the Atmalinga",
      "Enjoy beach yoga sessions, sunset drum circles, and fresh coastal coconut curries",
      "Take a boat ride into the Arabian Sea to spot playful pods of wild dolphins"
    ],
    is_india: true
  },
  {
    title: "Khajuraho Monuments",
    subTitle: "UNESCO World Heritage temples renowned for exquisite medieval Nagara-style stone carvings and sculpture.",
    location: "Chhatarpur, Madhya Pradesh, India",
    description: "Marvel at the extraordinary craftsmanship of the Chandela dynasty with towering sandstone temples depicting art, life, and spirituality.",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b7d4?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1600100397608-f010f443b7d4?w=1200&auto=format&fit=crop&q=80",
    cost: "12999",
    duration: "3 days",
    distance: "375 km from Bhopal",
    rating: 4.9,
    reviews: 4100,
    tripHighlights: [
      "Admire the architectural perfection of the Kandariya Mahadeva Temple",
      "Watch the magnificent evening Light & Sound Show narrated by Amitabh Bachchan",
      "Explore the Lakshmana Temple, Matangeshwar Temple, and Jain temple complex",
      "Take an excursion to the stunning Raneh Falls and Ken River canyon",
      "Attend the world-renowned Khajuraho Dance Festival in February"
    ],
    is_india: true
  },
  {
    title: "Coorg (Kodagu)",
    subTitle: "The Scotland of India, famed for fragrant coffee plantations, misty hills, and authentic Kodava hospitality.",
    location: "Kodagu, Karnataka, India",
    description: "Nestled in the lush Western Ghats, Coorg charms visitors with endless green hills, gushing waterfalls, and single-origin estate coffee.",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&auto=format&fit=crop&q=80",
    cost: "14499",
    duration: "3 days",
    distance: "250 km from Bengaluru",
    rating: 4.8,
    reviews: 5200,
    tripHighlights: [
      "Stay inside a working 300-acre Arabica coffee and black pepper estate",
      "Bathe and feed gentle elephants at the Dubare Elephant Camp on Cauvery River",
      "Witness Abbey Falls cascading through dense spice and coffee shrubs",
      "Gaze at the sunset over rolling valleys from Raja's Seat pavilion in Madikeri",
      "Savor authentic spicy Pandi Curry, Akki Roti, and freshly brewed filter coffee"
    ],
    is_india: true
  },
  {
    title: "Munnar Tea Valleys",
    subTitle: "Rolling emerald tea gardens, mist-kissed mountain peaks, and the endangered Nilgiri Tahr.",
    location: "Idukki, Kerala, India",
    description: "Perched at 5,200 feet, Munnar is South India's premier hill station, carpeted with lush tea bushes and cascading waterfalls.",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&auto=format&fit=crop&q=80",
    cost: "15999",
    duration: "4 days",
    distance: "130 km from Kochi",
    rating: 4.9,
    reviews: 6700,
    tripHighlights: [
      "Spot the rare endangered mountain goat (Nilgiri Tahr) at Eravikulam National Park",
      "Tour the historic Tata Tea Museum and sample fresh single-estate green tea",
      "Gaze across the highest peak in South India: Anamudi Peak (2,695 meters)",
      "Boat on Mattupetty Dam surrounded by dense tea hills and eucalyptus woods",
      "Shout your name at Echo Point and visit scenic Kundala Lake"
    ],
    is_india: true
  },
  {
    title: "Jaisalmer (The Golden City)",
    subTitle: "Sonar Qila living fort, Thar Desert sand dunes, and opulent carved sandstone Havelis.",
    location: "Jaisalmer, Rajasthan, India",
    description: "A magical desert kingdom built entirely of honey-gold sandstone, rising like a mirage out of the rolling sands of the Thar Desert.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=80",
    cost: "16499",
    duration: "3 days",
    distance: "285 km from Jodhpur",
    rating: 4.9,
    reviews: 5800,
    tripHighlights: [
      "Explore the 800-year-old Jaisalmer Fort (Sonar Qila), where 4,000 residents still live",
      "Marvel at the intricate stone lattice windows (Jharokhas) of Patwon Ki Haveli",
      "Camp overnight in luxury desert tents at Sam Sand Dunes under star-studded skies",
      "Experience camel safaris and high-octane 4x4 dune bashing",
      "Boat on Gadisar Lake surrounded by delicate shrines and artistic chhatris"
    ],
    is_india: true
  },
  {
    title: "Amritsar & Golden Temple",
    subTitle: "Spiritual epicenter of Sikhism, sacred Amrit Sarovar, and heroic Wagah Border retreat ceremony.",
    location: "Punjab, India",
    description: "Experience the profound divine tranquility of Sri Harmandir Sahib, savor 24/7 world-largest community kitchen (Langar), and patriotic pride at Wagah.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1600100397608-f010f443b7d4?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    cost: "9999",
    duration: "3 days",
    distance: "230 km from Chandigarh",
    rating: 5.0,
    reviews: 8200,
    tripHighlights: [
      "Meditate beside the gleaming golden sanctum of Sri Harmandir Sahib (Golden Temple)",
      "Volunteer or partake in the sacred Guru ka Langar feeding over 100,000 people daily",
      "Feel the electric patriotic energy of the Beating Retreat ceremony at Wagah Border",
      "Pay solemn homage at the historic Jallianwala Bagh memorial",
      "Feast on authentic Amritsari Kulcha with melting butter and tall glasses of creamy lassi"
    ],
    is_india: true
  },
  {
    title: "Spiti Valley (The Middle Land)",
    subTitle: "High-altitude cold desert, ancient cliff-hanging gompas, and world's highest post office at Hikkim.",
    location: "Himachal Pradesh, India",
    description: "A barren yet spellbinding Himalayan wonderland featuring 1000-year-old Key Monastery, Chandratal lake, and untouched mountain culture.",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&auto=format&fit=crop&q=80",
    cost: "23999",
    duration: "7 days",
    distance: "410 km from Shimla",
    rating: 4.9,
    reviews: 4300,
    tripHighlights: [
      "Visit the fortress-like 1,000-year-old Key Gompa perched atop a cone-shaped hill",
      "Send a handwritten postcard from Hikkim, the world's highest post office at 14,567 ft",
      "Marvel at the Asia's highest motorable suspension bridge at Chicham (13,596 ft)",
      "Hunt for 500-million-year-old marine fossils in the high-altitude village of Langza",
      "Stargaze at the Milky Way galaxy in the unpolluted crystal skies of Kaza"
    ],
    is_india: true
  },
  {
    title: "Rameswaram & Dhanushkodi",
    subTitle: "Sacred island temple, architectural Pamban Sea Bridge, and the mystical ghost town of Dhanushkodi.",
    location: "Tamil Nadu, India",
    description: "Connected to mainland India via the engineering marvel Pamban Bridge, Rameswaram is a revered Char Dham pilgrimage site on the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&auto=format&fit=crop&q=80",
    cost: "13499",
    duration: "3 days",
    distance: "170 km from Madurai",
    rating: 4.9,
    reviews: 5100,
    tripHighlights: [
      "Walk through the third corridor of Ramanathaswamy Temple, the longest in the world",
      "Bathe in the 22 sacred teertham wells believed to possess curative powers",
      "Take a train or road drive across the century-old Pamban Bridge above ocean waves",
      "Drive to the tip of Dhanushkodi (Ram Setu point) where Bay of Bengal meets Indian Ocean",
      "Visit the memorial of beloved former President Dr. A.P.J. Abdul Kalam"
    ],
    is_india: true
  },
  {
    title: "Puri & Konark Sun Temple",
    subTitle: "Holy abode of Lord Jagannath, annual Ratha Yatra, and the monumental 13th-century Konark Sun Chariot.",
    location: "Odisha, India",
    description: "Experience the vibrant spiritual oceanfront of Puri Jagannath Dham and marvel at the UNESCO World Heritage Sun Temple designed as a celestial stone chariot.",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b7d4?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1600100397608-f010f443b7d4?w=1200&auto=format&fit=crop&q=80",
    cost: "11999",
    duration: "4 days",
    distance: "60 km from Bhubaneswar",
    rating: 4.9,
    reviews: 6200,
    tripHighlights: [
      "Take darshan at the 12th-century Jagannath Temple and taste the sacred Mahaprasad",
      "Admire the 24 massive stone wheels and seven horses of the Konark Sun Temple",
      "Relax on the clean Blue Flag certified Golden Beach along the Bay of Bengal",
      "Visit the artisan heritage village of Raghurajpur, famed for Pattachitra scroll art",
      "Cruise across Chilika Lake, Asia's largest brackish lagoon, to spot Irrawaddy dolphins"
    ],
    is_india: true
  },
  {
    title: "Sundarbans Mangrove Delta",
    subTitle: "UNESCO World Heritage biosphere, the world's largest tidal halophytic mangrove forest and tiger reserve.",
    location: "West Bengal, India",
    description: "Navigate tidal waterways and tangled mangrove roots on wooden houseboats to track the swimming Royal Bengal Tiger and saltwater crocodiles.",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1200&auto=format&fit=crop&q=80",
    cost: "14999",
    duration: "3 days",
    distance: "100 km from Kolkata",
    rating: 4.8,
    reviews: 3400,
    tripHighlights: [
      "Boat cruise through mysterious interconnected mangrove creeks (Sundari trees)",
      "Climb the Sajnekhali and Dobanki watchtowers with canopy canopy aerial walks",
      "Spot swimming Royal Bengal Tigers, spotted deer, and giant estuarine crocodiles",
      "Learn about honey collector (Mawali) folklore and worship of forest deity Bonbibi",
      "Taste fresh caught Hilsa fish curry, tiger prawns, and pure mangrove honey"
    ],
    is_india: true
  },
  {
    title: "Takht Sri Patna Sahib & Valmiki Tiger Reserve",
    subTitle: "Sacred Sikh birthplace of Guru Gobind Singh Ji and Bihar's pristine Himalayan foothills tiger reserve.",
    location: "Bihar, India",
    description: "Experience the spiritual grandeur of Takht Sri Patna Sahib on the holy Ganges and venture into the lush Sal forests of Valmiki Tiger Reserve.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    cost: "13999",
    duration: "4 days",
    distance: "Patna / West Champaran, Bihar",
    rating: 4.8,
    reviews: 3100,
    tripHighlights: [
      "Take blessings at Takht Sri Patna Sahib, the birthplace of the tenth Sikh Guru",
      "Safari through Valmiki National Park along the Gandak River on the Indo-Nepal border",
      "Spot tigers, leopards, Indian flying foxes, and diverse Himalayan migratory birds",
      "Visit the iconic Golghar granary and Bihar Museum in the capital city of Patna",
      "Taste traditional Champaran Handi Ahuna mutton and sweet Chandrakala"
    ],
    is_india: true
  },
  {
    title: "Deoghar (Baba Baidyanath Jyotirlinga)",
    subTitle: "Revered Jyotirlinga pilgrimage, sacred Shiva Ganga water tank, and Trikut Pahar aerial ropeway.",
    location: "Deoghar, Jharkhand, India",
    description: "One of the twelve sacred Jyotirlingas where millions of Kanwariyas bring holy water from Sultanganj. Features scenic granite hills and peaceful ashrams.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1600100397608-f010f443b7d4?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&auto=format&fit=crop&q=80",
    cost: "9499",
    duration: "3 days",
    distance: "250 km from Ranchi",
    rating: 4.9,
    reviews: 4900,
    tripHighlights: [
      "Offer holy prayers and Jalabhishek at the ancient Baba Baidyanath Jyotirlinga temple",
      "Take the aerial cable car to the three peaks of Trikut Pahar (Ravana's legendary spot)",
      "Visit Tapovan caves where Sage Valmiki and saintly ascetics meditated",
      "Taste the GI-tagged sweet Belgrami and authentic Deoghar Peda",
      "Explore Naulakha Temple, built with architecture resembling Belur Math"
    ],
    is_india: true
  },
  {
    title: "Ziro Valley & Dzukou Valley",
    subTitle: "UNESCO Apatani cultural landscape, bamboo groves, and the rolling flower carpet of Dzukou.",
    location: "Arunachal Pradesh & Nagaland, India",
    description: "Traverse high altitude pine plateaus, discover the sustainable wetland farming of the Apatani people, and trek the surreal Dzukou Valley.",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&auto=format&fit=crop&q=80",
    image1: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
    image3: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&auto=format&fit=crop&q=80",
    image4: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&auto=format&fit=crop&q=80",
    cost: "24999",
    duration: "6 days",
    distance: "Gateway via Guwahati / Dimapur",
    rating: 4.9,
    reviews: 3200,
    tripHighlights: [
      "Walk through peaceful Apatani villages admiring traditional facial tattoos and nose plugs",
      "Trek into Dzukou Valley, home to the rare Dzukou Lily and rolling bamboo slopes",
      "Camp under pristine unpolluted star-filled skies in high mountain meadows",
      "Taste local organic smoked pork, bamboo shoot curries, and rice brew",
      "Attend the world-famous Ziro Music Festival held amidst verdant paddy fields"
    ],
    is_india: true
  }
];

async function seedDestinations() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas!');

    // Combine website destinations + extra destinations
    const allDestinations = [...websiteDestinations, ...extraIndianDestinations];

    console.log(`📊 Total destinations to import: ${allDestinations.length}`);

    // Clean existing collection to ensure fresh, clean, consistent import
    const deleteResult = await Destination.deleteMany({});
    console.log(`🧹 Cleaned existing destinations (Removed: ${deleteResult.deletedCount})`);

    // Insert all destinations
    const insertResult = await Destination.insertMany(allDestinations.map(dest => ({
      title: dest.title,
      subTitle: dest.subTitle,
      location: dest.location,
      description: dest.description,
      image: dest.image,
      image1: dest.image1,
      image2: dest.image2,
      image3: dest.image3,
      image4: dest.image4,
      cost: String(dest.cost),
      duration: dest.duration,
      distance: dest.distance,
      rating: Number(dest.rating) || 4.8,
      reviews: Number(dest.reviews) || 1200,
      tripHighlights: Array.isArray(dest.tripHighlights) ? dest.tripHighlights : [],
      is_india: true
    })));

    console.log(`🎉 SUCCESS! Successfully imported ${insertResult.length} Indian destinations into MongoDB Atlas!`);

    // Print summary by state/region
    console.log('\n--- Imported Destination List ---');
    insertResult.forEach((d, idx) => {
      console.log(`${idx + 1}. ${d.title} (${d.location}) - Rs. ${d.cost} [${d.duration}]`);
    });

  } catch (error) {
    console.error('❌ Seeding destinations failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas.');
  }
}

seedDestinations();
