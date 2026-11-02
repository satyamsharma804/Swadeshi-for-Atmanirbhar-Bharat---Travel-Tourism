import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Index for expiry-based cleanup
passwordResetSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });
passwordResetSchema.index({ user_email: 1 });

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

export default PasswordReset;
