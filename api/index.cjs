// This file uses CommonJS (CJS) for maximum serverless stability.

const express = require('express');
const serverless = require('serverless-http');

// Require critical node modules
const cors = require('cors');
const dotenv = require('dotenv');

// Require configuration and route files (resolves to ESM defaults via .default)
const connectDB = require('../backend/config/database');
const authRoutes = require('../backend/routes/auth');
const userRoutes = require('../backend/routes/user');
const bookingRoutes = require('../backend/routes/booking');
const adminRoutes = require('../backend/routes/admin');
const reviewRoutes = require('../backend/routes/review');
const queryRoutes = require('../backend/routes/query');
const destinationRoutes = require('../backend/routes/destination');

dotenv.config();

const app = express();
let isConnected = false;

// Middleware Setup
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route Registration (Pointing to the 'default' export of each route file)
app.use('/auth', authRoutes.default);
app.use('/user', userRoutes.default);
app.use('/booking', bookingRoutes.default);
app.use('/admin', adminRoutes.default);
app.use('/review', reviewRoutes.default);
app.use('/query', queryRoutes.default);
app.use('/destination', destinationRoutes.default);

// Health check and Root endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Travel Planner API is running' });
});
app.get('/', (req, res) => {
  res.json({ message: 'Travel Planner API Root' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

// Helper to connect to DB only once per cold start
const dbConnect = async () => {
  if (isConnected) return;
  try {
    await connectDB.default(); // Use .default for the ESM exported function
    isConnected = true;
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error('CRITICAL: MongoDB connection error:', error);
    throw error;
  }
};

// Vercel Handler (Exports using CJS syntax)
module.exports = async (req, res) => {
  // Connect to DB as part of the request pipeline
  await dbConnect();
  return serverless(app)(req, res);
};