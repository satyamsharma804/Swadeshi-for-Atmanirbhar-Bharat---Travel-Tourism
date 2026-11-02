import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import { sendEmail } from '../utils/mailer.js';
import { emailTemplates } from '../utils/emailTemplates.js';

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: 'email',
          foreignField: 'email',
          as: 'user_bookings'
        }
      },
      {
        $project: {
          id: '$_id',
          _id: 0,
          name: 1,
          email: 1,
          registration_date: '$createdAt',
          bookings_count: { $size: '$user_bookings' }
        }
      },
      {
        $sort: { registration_date: -1 }
      }
    ]);

    res.json({
      status: 'success',
      users: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedBookings = bookings.map(booking => ({
      ...booking,
      id: booking._id,
      booking_id: booking.booking_id,
      booked_by: booking.booked_by,
      email: booking.email,
      destination: booking.destination,
      accommodation: booking.accommodation,
      booking_date: booking.createdAt,
      total_cost: booking.total_cost,
      admin_status: booking.admin_status || 'pending',
      created_at: booking.createdAt
    }));

    res.json({
      status: 'success',
      bookings: formattedBookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Update booking
router.post('/update-booking', async (req, res) => {
  try {
    const { id, status, admin_status, booking_id } = req.body;

    // Accept either id (_id) or booking_id
    const bookingIdentifier = id || booking_id;

    if (!bookingIdentifier) {
      return res.status(400).json({
        status: 'error',
        message: 'Booking ID is required'
      });
    }

    const updateData = {};
    
    if (status) updateData.status = status.toLowerCase();
    if (admin_status) updateData.admin_status = admin_status.toLowerCase();

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No fields to update'
      });
    }

    // Try to find by _id first, if that fails, try by booking_id
    let query = {};
    if (mongoose.Types.ObjectId.isValid(bookingIdentifier)) {
      query = { _id: bookingIdentifier };
    } else {
      query = { booking_id: bookingIdentifier };
    }

    const result = await Booking.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Get booking details for notification
    if (admin_status) {
      const booking = await Booking.findOne(query).lean();

      if (booking) {
        // Send status notification email with beautiful template
        try {
          const htmlContent = emailTemplates.bookingStatusUpdate(booking, admin_status);
          await sendEmail(
            booking.email,
            `📋 Booking Status Update - Travel Planner`,
            `Dear ${booking.booked_by},\n\nYour booking status has been updated.\n\nBooking ID: ${booking.booking_id}\nDestination: ${booking.destination}\nNew Status: ${admin_status}\n\nThank you!`,
            htmlContent
          );
        } catch (emailError) {
          console.error('Email error:', emailError);
        }
      }
    }

    res.json({
      status: 'success',
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking',
      error: error.message
    });
  }
});

// Delete booking
router.delete('/delete-booking/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find by _id first, if that fails, try by booking_id
    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { booking_id: id };
    }

    const result = await Booking.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete booking',
      error: error.message
    });
  }
});

// Edit user
router.post('/edit-user', async (req, res) => {
  try {
    const { id, name, email, phone, location } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID is required'
      });
    }

    const updateData = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No fields to update'
      });
    }

    await User.updateOne({ _id: id }, { $set: updateData });

    res.json({
      status: 'success',
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Edit user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user',
      error: error.message
    });
  }
});

// Delete user
router.delete('/delete-user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await User.deleteOne({ _id: id });

    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

export default router;
