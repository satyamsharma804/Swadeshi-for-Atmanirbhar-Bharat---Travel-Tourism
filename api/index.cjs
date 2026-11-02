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
const chatbotRoutes = require('../backend/routes/chatbot');

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

// Route Registration (Supporting both /endpoint and /api/endpoint)
const routes = [
  { path: '/auth', handler: authRoutes.default },
  { path: '/user', handler: userRoutes.default },
  { path: '/booking', handler: bookingRoutes.default },
  { path: '/admin', handler: adminRoutes.default },
  { path: '/review', handler: reviewRoutes.default },
  { path: '/query', handler: queryRoutes.default },
  { path: '/destination', handler: destinationRoutes.default },
  { path: '/chatbot', handler: chatbotRoutes.default }
];

routes.forEach(({ path, handler }) => {
  app.use(path, handler);
  app.use(`/api${path}`, handler);
});

// Health check and Root endpoints
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', message: 'Travel Planner API is running' });
});
app.get(['/', '/api'], (req, res) => {
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