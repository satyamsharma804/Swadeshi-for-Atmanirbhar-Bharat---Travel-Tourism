import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true
  },
  user_email: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  accommodation: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review_text: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for faster queries
reviewSchema.index({ booking_id: 1 });
reviewSchema.index({ user_email: 1 });
reviewSchema.index({ destination: 1 });
reviewSchema.index({ rating: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
