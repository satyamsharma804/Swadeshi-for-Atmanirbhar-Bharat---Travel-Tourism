# Travel Planner - Node.js Backend

This is the Node.js backend for the Travel Planner application, migrated from PHP.

## 🚀 Features

- RESTful API architecture
- MySQL database integration
- User authentication (signup, login, password reset)
- Booking management
- Review system
- Query/Support ticket system
- Admin panel functionality
- Email notifications with nodemailer
- CORS support

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the database credentials and other settings in `.env`

3. **Set up the database:**
   - Run the SQL script from the root directory:
   ```bash
   mysql -u root -p < ../database_setup.sql
   ```

4. **Configure email (optional):**
   - Update email settings in `.env` file
   - For Gmail, you need to generate an App Password

## 🏃 Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### User
- `GET /api/user/data?email=<email>` - Get user data
- `POST /api/user/update` - Update user profile

### Bookings
- `POST /api/booking/save` - Create/update booking
- `GET /api/booking/user-bookings?email=<email>` - Get user bookings
- `GET /api/booking/user-bookings-for-review?email=<email>` - Get bookings without reviews
- `GET /api/booking/recent-activities` - Get recent booking activities

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings
- `POST /api/admin/update-booking` - Update booking status
- `DELETE /api/admin/delete-booking/:id` - Delete booking
- `POST /api/admin/edit-user` - Edit user details
- `DELETE /api/admin/delete-user/:id` - Delete user

### Reviews
- `POST /api/review/submit` - Submit a review
- `POST /api/review/add` - Add a review (alternative)
- `GET /api/review/all` - Get all reviews

### Queries
- `POST /api/query/submit` - Submit a query
- `GET /api/query/user-queries?email=<email>` - Get user queries
- `GET /api/query/all` - Get all queries (admin)
- `POST /api/query/reply` - Reply to a query

### Destinations
- `GET /api/destination/top` - Get top destinations
- `GET /api/destination/top-rated` - Get top rated destinations

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `DB_HOST` | Database host | localhost |
| `DB_USER` | Database user | root |
| `DB_PASSWORD` | Database password | (empty) |
| `DB_NAME` | Database name | tour_planner |
| `DB_PORT` | Database port | 3306 |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | Email username | - |
| `EMAIL_PASSWORD` | Email password | - |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js         # Database connection
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── user.js            # User routes
│   ├── booking.js         # Booking routes
│   ├── admin.js           # Admin routes
│   ├── review.js          # Review routes
│   ├── query.js           # Query routes
│   └── destination.js     # Destination routes
├── utils/
│   └── mailer.js          # Email utility
├── .env                   # Environment variables
├── .env.example           # Example environment file
├── server.js              # Main server file
└── package.json           # Dependencies
```

## 🔐 Security Notes

- Passwords are hashed using bcrypt
- CORS is configured to allow specific origins
- Input validation is performed on all endpoints
- SQL injection protection via parameterized queries

## 🐛 Debugging

The server logs all requests and errors to the console. Check the terminal output for debugging information.

## 📝 Migration from PHP

This backend has been migrated from PHP to Node.js with the following improvements:
- Modern async/await syntax
- Better error handling
- Connection pooling for database
- Modular route structure
- Environment-based configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
