import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Destination from './models/Destination.js';
import { destinations as websiteDestinations } from '../Frontend/src/data/Recommend.js';

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

async function seedDestinations() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas!');

    console.log(`📊 Total destinations to import: ${websiteDestinations.length}`);

    // Clean existing collection to ensure fresh, clean, consistent import
    const deleteResult = await Destination.deleteMany({});
    console.log(`🧹 Cleaned existing destinations (Removed: ${deleteResult.deletedCount})`);

    // Insert all destinations
    const insertResult = await Destination.insertMany(websiteDestinations.map(dest => ({
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

    console.log('\n--- Sample of Imported Destinations ---');
    insertResult.slice(0, 10).forEach((d, idx) => {
      console.log(`${idx + 1}. ${d.title} (${d.location}) - Rs. ${d.cost} [${d.duration}]`);
    });
    console.log(`... and ${insertResult.length - 10} more destinations.`);

  } catch (error) {
    console.error('❌ Seeding destinations failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas.');
  }
}

seedDestinations();
