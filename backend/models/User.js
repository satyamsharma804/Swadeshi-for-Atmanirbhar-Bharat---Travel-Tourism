import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  dob: {
    type: Date,
    required: true
  },
  profile_photo: {
    type: String,
    default: null
  },
  is_admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Index for faster queries
// userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;
