import express from 'express';
import Query from '../models/Query.js';
import { sendEmail } from '../utils/mailer.js';
import { emailTemplates } from '../utils/emailTemplates.js';

const router = express.Router();

// Submit query
router.post('/submit', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Email, subject, and message are required'
      });
    }

    const newQuery = new Query({
      user_email: email.toLowerCase(),
      subject,
      message,
      status: 'pending'
    });

    await newQuery.save();

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully'
    });
  } catch (error) {
    console.error('Submit query error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit query',
      error: error.message
    });
  }
});

// Get user queries
router.get('/user-queries', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const queries = await Query.find({ user_email: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean();

    const formattedQueries = queries.map(query => ({
      ...query,
      id: query._id,
      created_at: query.createdAt,
      updated_at: query.updatedAt
    }));

    res.json({
      success: true,
      queries: formattedQueries
    });
  } catch (error) {
    console.error('Get user queries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch queries',
      error: error.message
    });
  }
});

// Get all queries (admin)
router.get('/all', async (req, res) => {
  try {
    const queries = await Query.find()
      .sort({ createdAt: -1 })
      .lean();

    const formattedQueries = queries.map(query => ({
      ...query,
      id: query._id,
      created_at: query.createdAt,
      updated_at: query.updatedAt
    }));

    res.json({
      success: true,
      queries: formattedQueries
    });
  } catch (error) {
    console.error('Get all queries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch queries',
      error: error.message
    });
  }
});

// Reply to query
router.post('/reply', async (req, res) => {
  try {
    const { queryId, reply } = req.body;

    if (!queryId || !reply) {
      return res.status(400).json({
        success: false,
        message: 'Query ID and reply are required'
      });
    }

    // Update query with reply
    await Query.updateOne(
      { _id: queryId },
      { 
        $set: { 
          admin_reply: reply, 
          status: 'answered' 
        } 
      }
    );

    // Get query details for email notification
    const query = await Query.findById(queryId).lean();

    if (query) {
      // Send email notification with beautiful template
      try {
        const htmlContent = emailTemplates.queryReply(query, reply);
        await sendEmail(
          query.user_email,
          `💬 Re: ${query.subject} - Travel Planner`,
          `Dear User,\n\nThank you for your query. Here is the response from our team:\n\n${reply}\n\nOriginal Query:\n${query.message}\n\nBest regards,\nTravel Planner Team`,
          htmlContent
        );
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    }

    res.json({
      success: true,
      message: 'Reply sent successfully'
    });
  } catch (error) {
    console.error('Reply to query error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message
    });
  }
});

export default router;
