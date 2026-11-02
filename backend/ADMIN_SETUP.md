# Admin Account Setup Guide

## Method 1: Using the Script (Easiest)

1. Navigate to backend folder:
   ```bash
   cd Planner-main/backend
   ```

2. Run the admin creation script:
   ```bash
   node createAdmin.js
   ```

   This creates an admin with default credentials:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`

3. To create admin with custom credentials:
   ```bash
   node createAdmin.js your-email@example.com your-password "Your Name"
   ```

## Method 2: Using MongoDB Compass/Atlas

1. **Open MongoDB Compass** or **MongoDB Atlas**
2. Connect to your database (`tour_planner`)
3. Go to `users` collection
4. Find your user document (or create a new one)
5. Edit the document:
   - Set `is_admin: true`
   - Make sure email and password fields are set
6. Save the document

## Method 3: Using MongoDB Shell

1. Open MongoDB shell:
   ```bash
   mongosh
   ```

2. Switch to your database:
   ```javascript
   use tour_planner
   ```

3. Update existing user to admin:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { is_admin: true } }
   )
   ```

4. Or create a new admin user:
   ```javascript
   db.users.insertOne({
     name: "Admin User",
     email: "admin@example.com",
     password: "admin123",
     hashed_password: "$2b$10$...", // You'll need to hash the password
     phone: "0000000000",
     location: "Admin Location",
     bio: "Administrator",
     gender: "other",
     dob: new Date("1990-01-01"),
     is_admin: true,
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

## Method 4: Convert Existing User via Admin API

If you have access to the admin routes, you can also update a user through the API (but you'd need admin access first, so this is circular).

## Default Admin Credentials (After Running Script)

After running `node createAdmin.js`:

- **Email:** `admin@example.com`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Change these credentials after first login for security!

## Login Steps

1. Go to your login page: `http://localhost:5173/login`
2. Select **"Admin"** login type
3. Enter your admin email and password
4. You'll be redirected to `/admin` dashboard

## Troubleshooting

**Problem:** Can't login as admin
- Make sure `is_admin: true` is set in the database
- Check that you selected "Admin" login type (not "User")
- Verify email and password are correct

**Problem:** Script fails to connect
- Make sure MongoDB is running
- Check your `.env` file has correct `MONGODB_URI`
- Verify database name matches

**Problem:** User exists but can't access admin
- Check `is_admin` field is `true` (not `false` or missing)
- Clear browser localStorage and try again
- Check browser console for errors


