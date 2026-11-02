import express from 'express';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import Destination from '../models/Destination.js';
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    // Enable search filtering if a query is provided
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive
      // Use $or to search across multiple relevant fields
      filter.$or = [
        { title: searchRegex },
        { subTitle: searchRegex },
        { location: searchRegex },
        { description: searchRegex }
      ];
    }

    // Fetch destinations, sorted by rating then cost
    const destinations = await Destination.find(filter).sort({ rating: -1, cost: 1 });

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    console.error('Get all destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch destinations',
      error: error.message
    });
  }
});
// Get top destinations
router.get('/top', async (req, res) => {
  try {
    const destinations = await Booking.aggregate([
      {
        $group: {
          _id: '$destination',
          booking_count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          destination: '$_id',
          booking_count: 1
        }
      },
      {
        $sort: { booking_count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    console.error('Get top destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top destinations',
      error: error.message
    });
  }
});

// Get top rated destinations
router.get('/top-rated', async (req, res) => {
  try {
    const destinations = await Review.aggregate([
      {
        $group: {
          _id: '$destination',
          avg_rating: { $avg: '$rating' },
          review_count: { $sum: 1 }
        }
      },
      {
        $match: {
          review_count: { $gt: 0 }
        }
      },
      {
        $project: {
          _id: 0,
          destination: '$_id',
          avg_rating: 1,
          review_count: 1
        }
      },
      {
        $sort: { avg_rating: -1, review_count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    console.error('Get top rated destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top rated destinations',
      error: error.message
    });
  }
});

export default router;
