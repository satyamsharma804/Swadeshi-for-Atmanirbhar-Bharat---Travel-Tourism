import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'answered'],
    default: 'pending'
  },
  admin_reply: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for faster queries
querySchema.index({ user_email: 1 });
querySchema.index({ status: 1 });

const Query = mongoose.model('Query', querySchema);

export default Query;
