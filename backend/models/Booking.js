import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true
  },
  destination: {
    type: String,
    required: true
  },
  accommodation: {
    type: String,
    required: true
  },
  total_cost: {
    type: Number,
    required: true
  },
  booking_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  booked_by: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  admin_status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
bookingSchema.index({ booking_id: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ destination: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
