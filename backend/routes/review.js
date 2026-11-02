import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Submit review
router.post('/submit', async (req, res) => {
  try {
    const { booking_id, user_email, destination, accommodation, rating, review_text } = req.body;

    if (!booking_id || !user_email || !destination || !accommodation || !rating) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findOne({ booking_id });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Review already submitted for this booking'
      });
    }

    // Insert review
    const newReview = new Review({
      booking_id,
      user_email: user_email.toLowerCase(),
      destination,
      accommodation,
      rating,
      review_text: review_text || ''
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully'
    });
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit review',
      error: error.message
    });
  }
});

// Get all reviews
router.get('/all', async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedReviews = reviews.map(review => ({
      ...review,
      id: review._id,
      created_at: review.createdAt,
      updated_at: review.updatedAt
    }));

    res.json({
      success: true,
      reviews: formattedReviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: error.message
    });
  }
});

// Add review (alternative endpoint)
router.post('/add', async (req, res) => {
  try {
    const { bookingId, email, destination, accommodation, rating, review } = req.body;

    if (!bookingId || !email || !destination || !accommodation || !rating) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking_id: bookingId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this booking'
      });
    }

    // Insert review
    const newReview = new Review({
      booking_id: bookingId,
      user_email: email.toLowerCase(),
      destination,
      accommodation,
      rating,
      review_text: review || ''
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
});

export default router;
