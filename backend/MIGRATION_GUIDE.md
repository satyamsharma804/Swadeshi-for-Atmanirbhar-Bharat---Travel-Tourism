# Migration Guide: PHP to Node.js Backend

## 🔄 Overview

This document explains the migration from PHP backend to Node.js backend and how to update your frontend to work with the new API.

## 📋 What Changed

### 1. **Technology Stack**
- **Before:** PHP with MySQLi
- **After:** Node.js with Express and MySQL2

### 2. **Server Configuration**
- **Before:** Apache/XAMPP (PHP)
- **After:** Node.js server running on port 3000

### 3. **API Endpoints**

The endpoints have been reorganized with `/api/` prefix:

| Old PHP Endpoint | New Node.js Endpoint | Method |
|-----------------|---------------------|---------|
| `signup.php` | `/api/auth/signup` | POST |
| `login.php` | `/api/auth/login` | POST |
| `forgot_password.php` | `/api/auth/forgot-password` | POST |
| `verify_otp.php` | `/api/auth/verify-otp` | POST |
| `reset_password.php` | `/api/auth/reset-password` | POST |
| `get_user_data.php` | `/api/user/data` | GET |
| `update_user.php` | `/api/user/update` | POST |
| `save_booking.php` | `/api/booking/save` | POST |
| `get_user_bookings.php` | `/api/booking/user-bookings` | GET |
| `get_user_bookings_for_review.php` | `/api/booking/user-bookings-for-review` | GET |
| `get_recent_activities.php` | `/api/booking/recent-activities` | GET |
| `admin_get_users.php` | `/api/admin/users` | GET |
| `admin_get_bookings.php` | `/api/admin/bookings` | GET |
| `admin_update_booking.php` | `/api/admin/update-booking` | POST |
| `admin_delete_booking.php` | `/api/admin/delete-booking/:id` | DELETE |
| `admin_edit_user.php` | `/api/admin/edit-user` | POST |
| `admin_delete_user.php` | `/api/admin/delete-user/:id` | DELETE |
| `submit_review.php` | `/api/review/submit` | POST |
| `add_review.php` | `/api/review/add` | POST |
| `get_all_reviews.php` | `/api/review/all` | GET |
| `submit_query.php` | `/api/query/submit` | POST |
| `get_user_queries.php` | `/api/query/user-queries` | GET |
| `get_all_queries.php` | `/api/query/all` | GET |
| `reply_to_query.php` | `/api/query/reply` | POST |
| `get_top_destinations.php` | `/api/destination/top` | GET |
| `get_top_rated_destinations.php` | `/api/destination/top-rated` | GET |

## 🔧 Frontend Updates Required

### Step 1: Update Base URL

In your frontend, find where you define the API base URL and update it:

**Before:**
```javascript
const API_URL = 'http://localhost/Travel-Planner/backend/';
```

**After:**
```javascript
const API_URL = 'http://localhost:3000/api/';
```

### Step 2: Update API Calls

**Example - Login:**

**Before:**
```javascript
const response = await fetch('http://localhost/Travel-Planner/backend/login.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password })
});
```

**After:**
```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password })
});
```

### Step 3: Update DELETE Requests

DELETE endpoints now use URL parameters instead of request body:

**Before:**
```javascript
await fetch('http://localhost/Travel-Planner/backend/admin_delete_user.php', {
  method: 'POST',
  body: JSON.stringify({ id: userId })
});
```

**After:**
```javascript
await fetch(`http://localhost:3000/api/admin/delete-user/${userId}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### Step 4: Create a Configuration File

Create a file `src/config/api.js` in your frontend:

```javascript
// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  
  // User
  GET_USER_DATA: `${API_BASE_URL}/user/data`,
  UPDATE_USER: `${API_BASE_URL}/user/update`,
  
  // Bookings
  SAVE_BOOKING: `${API_BASE_URL}/booking/save`,
  GET_USER_BOOKINGS: `${API_BASE_URL}/booking/user-bookings`,
  GET_BOOKINGS_FOR_REVIEW: `${API_BASE_URL}/booking/user-bookings-for-review`,
  GET_RECENT_ACTIVITIES: `${API_BASE_URL}/booking/recent-activities`,
  
  // Admin
  GET_ALL_USERS: `${API_BASE_URL}/admin/users`,
  GET_ALL_BOOKINGS: `${API_BASE_URL}/admin/bookings`,
  UPDATE_BOOKING: `${API_BASE_URL}/admin/update-booking`,
  DELETE_BOOKING: (id) => `${API_BASE_URL}/admin/delete-booking/${id}`,
  EDIT_USER: `${API_BASE_URL}/admin/edit-user`,
  DELETE_USER: (id) => `${API_BASE_URL}/admin/delete-user/${id}`,
  
  // Reviews
  SUBMIT_REVIEW: `${API_BASE_URL}/review/submit`,
  ADD_REVIEW: `${API_BASE_URL}/review/add`,
  GET_ALL_REVIEWS: `${API_BASE_URL}/review/all`,
  
  // Queries
  SUBMIT_QUERY: `${API_BASE_URL}/query/submit`,
  GET_USER_QUERIES: `${API_BASE_URL}/query/user-queries`,
  GET_ALL_QUERIES: `${API_BASE_URL}/query/all`,
  REPLY_TO_QUERY: `${API_BASE_URL}/query/reply`,
  
  // Destinations
  GET_TOP_DESTINATIONS: `${API_BASE_URL}/destination/top`,
  GET_TOP_RATED_DESTINATIONS: `${API_BASE_URL}/destination/top-rated`,
};

export default API_ENDPOINTS;
```

Then update your `.env` file in the frontend:
```
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Running the New Backend

1. **Start the Node.js server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Access your application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## ✅ Testing the Migration

1. Test user registration and login
2. Test booking creation and retrieval
3. Test admin functionalities
4. Test review submission
5. Test query submission and replies


### Issue 3: Email Not Sending
**Solution:** Email configuration is optional. If not configured, emails will be logged to console instead. To enable:
1. Set up Gmail App Password
2. Update `.env` with email credentials

## 📊 Benefits of Node.js Migration

1. **Better Performance:** Non-blocking I/O operations
2. **Modern JavaScript:** ES6+ features, async/await
3. **Easier Deployment:** Can deploy to Heroku, Vercel, AWS, etc.
4. **Better Package Management:** npm ecosystem
5. **Real-time Capabilities:** Can easily add WebSockets if needed
6. **Unified Language:** JavaScript on both frontend and backend

## 🔐 Security Improvements

1. **Password Hashing:** Using bcrypt (same as PHP)
2. **SQL Injection Prevention:** Parameterized queries
3. **CORS Protection:** Configured origins
4. **Environment Variables:** Sensitive data in .env file

## 📝 Notes

- The old PHP files are still present and can be removed once migration is confirmed working
- Database schema remains the same
- All existing data is preserved
- Response formats are maintained for compatibility

## 🆘 Support

If you encounter any issues during migration, check:
1. Node.js and npm versions
2. MySQL is running
3. All environment variables are set correctly
4. Port 3000 is not in use by another application

## 🎉 Congratulations!

You've successfully migrated from PHP to Node.js backend! Your application now runs on modern technology stack with improved performance and maintainability.
