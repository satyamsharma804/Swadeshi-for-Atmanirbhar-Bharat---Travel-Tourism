// backend/models/Destination.js
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subTitle: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  cost: { type: String, required: true },
  duration: { type: String },
  distance: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  tripHighlights: [{ type: String }],
  is_india: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;