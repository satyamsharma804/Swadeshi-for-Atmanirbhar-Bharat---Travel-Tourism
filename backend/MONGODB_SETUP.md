# Travel Planner - MongoDB Setup Guide

## 🗄️ Database Migration: MySQL to MongoDB

This backend now uses **MongoDB** instead of MySQL for better scalability, flexibility, and modern NoSQL capabilities.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 MongoDB Installation

### Option 1: Local MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from https://www.mongodb.com/try/download/community

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tour_planner
   ```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` file:**
   ```env
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/tour_planner
   
   # OR for MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tour_planner
   ```

4. **Start MongoDB (if using local):**
   ```bash
   # macOS/Linux
   mongod
   
   # Or if installed via Homebrew
   brew services start mongodb-community
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

## 📊 MongoDB Collections

The application creates the following collections automatically:

### 1. **users**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String,
  hashed_password: String,
  phone: String,
  location: String,
  bio: String,
  gender: String (enum: 'male', 'female', 'other'),
  dob: Date,
  is_admin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **bookings**
```javascript
{
  _id: ObjectId,
  booking_id: String (unique),
  destination: String,
  accommodation: String,
  total_cost: Number,
  booking_date: Date,
  status: String (enum: 'pending', 'confirmed', 'cancelled', 'completed'),
  booked_by: String,
  email: String,
  admin_status: String (enum: 'pending', 'approved', 'rejected'),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **reviews**
```javascript
{
  _id: ObjectId,
  booking_id: String (unique),
  user_email: String,
  destination: String,
  accommodation: String,
  rating: Number (1-5),
  review_text: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. **queries**
```javascript
{
  _id: ObjectId,
  user_email: String,
  subject: String,
  message: String,
  status: String (enum: 'pending', 'answered'),
  admin_reply: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **passwordresets**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: 'User'),
  user_email: String,
  otp: String,
  expiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Data Migration from MySQL

If you have existing data in MySQL, you can migrate it to MongoDB:

### Manual Migration Steps:

1. **Export MySQL data:**
   ```bash
   mysqldump -u root tour_planner > mysql_backup.sql
   ```

2. **Use this Node.js script to migrate:**

Create a file `migrate-mysql-to-mongodb.js`:

```javascript
import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import User from './models/User.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';

const migrateData = async () => {
  try {
    // Connect to MySQL
    const mysqlConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tour_planner'
    });

    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/tour_planner');

    console.log('Connected to both databases');

    // Migrate Users
    const [users] = await mysqlConnection.query('SELECT * FROM users');
    for (const user of users) {
      await User.create({
        name: user.name,
        email: user.email.toLowerCase(),
        password: user.password,
        hashed_password: user.hashed_password,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        gender: user.gender,
        dob: user.dob,
        is_admin: user.is_admin || false,
        createdAt: user.created_at
      });
    }
    console.log(`Migrated ${users.length} users`);

    // Migrate Bookings
    const [bookings] = await mysqlConnection.query('SELECT * FROM bookings');
    for (const booking of bookings) {
      await Booking.create({
        booking_id: booking.booking_id,
        destination: booking.destination,
        accommodation: booking.accommodation,
        total_cost: booking.total_cost,
        booking_date: booking.booking_date,
        status: booking.status,
        booked_by: booking.booked_by,
        email: booking.email.toLowerCase(),
        admin_status: booking.admin_status || 'pending',
        createdAt: booking.created_at
      });
    }
    console.log(`Migrated ${bookings.length} bookings`);

    // Migrate Reviews
    const [reviews] = await mysqlConnection.query('SELECT * FROM reviews');
    for (const review of reviews) {
      await Review.create({
        booking_id: review.booking_id,
        user_email: review.user_email.toLowerCase(),
        destination: review.destination,
        accommodation: review.accommodation,
        rating: review.rating,
        review_text: review.review_text,
        createdAt: review.created_at
      });
    }
    console.log(`Migrated ${reviews.length} reviews`);

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateData();
```

Run the migration:
```bash
node migrate-mysql-to-mongodb.js
```

## 🎯 Advantages of MongoDB

1. **Flexible Schema**: Easy to add new fields without altering tables
2. **Better Performance**: Faster for read-heavy operations
3. **Scalability**: Horizontal scaling with sharding
4. **JSON-like Documents**: Natural fit for JavaScript/Node.js
5. **Rich Queries**: Powerful aggregation framework
6. **No JOINs**: Embedded documents eliminate complex joins
7. **Cloud-Ready**: Easy deployment to MongoDB Atlas

## 🔍 MongoDB Commands

**Connect to MongoDB Shell:**
```bash
mongosh
```

**Switch to database:**
```javascript
use tour_planner
```

**View all collections:**
```javascript
show collections
```

**Query examples:**
```javascript
// Find all users
db.users.find()

// Find user by email
db.users.findOne({ email: "user@example.com" })

// Count bookings
db.bookings.countDocuments()

// Find recent bookings
db.bookings.find().sort({ createdAt: -1 }).limit(10)

// Aggregation - Top destinations
db.bookings.aggregate([
  { $group: { _id: "$destination", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
])
```

## 🧪 Testing the API

All API endpoints remain the same as before. Test with:

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890",
    "location": "Mumbai",
    "bio": "Test bio",
    "gender": "male",
    "dob": "1990-01-01"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🐛 Troubleshooting

### Issue 1: Connection Failed
**Solution:** Make sure MongoDB is running
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod
# or
brew services start mongodb-community
```

### Issue 2: Authentication Failed (MongoDB Atlas)
**Solution:** 
1. Check your username and password
2. Whitelist your IP in Atlas dashboard
3. Ensure your connection string is correct

### Issue 3: Database Not Created
**Solution:** MongoDB creates databases automatically when you insert the first document. Just run the application and create your first user.

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/tour_planner` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

## 🎉 Benefits Over MySQL

- **No More SQL Queries**: Use JavaScript objects instead
- **Automatic Timestamps**: `createdAt` and `updatedAt` managed automatically
- **Better for Unstructured Data**: Perfect for evolving schemas
- **Built-in Indexing**: Automatic `_id` index on all documents
- **Aggregation Pipeline**: Powerful data processing
- **Cloud Native**: MongoDB Atlas for easy cloud deployment

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB University](https://university.mongodb.com/) - Free courses

## 🤝 Support

If you encounter any issues:
1. Check MongoDB is running: `mongosh`
2. Verify connection string in `.env`
3. Check server logs for detailed errors
4. Ensure port 27017 is not blocked

---

**Note**: The old PHP/MySQL backend files are still present in the `backend/` directory with `.php` extension. They can be removed once you confirm the MongoDB migration is working properly.
