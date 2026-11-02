import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user data
router.get('/data', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    const user = await User.findOne(
      { email: email.toLowerCase() },
      { name: 1, email: 1, phone: 1, location: 1, bio: 1, gender: 1, dob: 1, profile_photo: 1, _id: 0 }
    );

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({
      error: 'Failed to fetch user data',
      message: error.message
    });
  }
});

// Update user data
router.post('/update', async (req, res) => {
  try {
    const { email, name, phone, location, bio, gender, dob, profile_photo } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Build update object
    const updateData = {};
    
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    if (bio) updateData.bio = bio;
    if (gender) updateData.gender = gender;
    if (dob) updateData.dob = dob;
    if (profile_photo !== undefined) updateData.profile_photo = profile_photo; // Allow null to remove photo

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    const result = await User.updateOne(
      { email: email.toLowerCase() },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

export default router;
