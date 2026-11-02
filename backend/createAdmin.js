import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tour_planner';

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: email.toLowerCase() });
    
    if (existingAdmin) {
      // Update existing user to admin
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        { email: email.toLowerCase() },
        { 
          is_admin: true,
          password: password,
          hashed_password: hashedPassword
        }
      );
      console.log(`✅ Updated existing user "${email}" to admin`);
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = new User({
        name: name,
        email: email.toLowerCase(),
        password: password,
        hashed_password: hashedPassword,
        phone: '0000000000',
        location: 'Admin Location',
        bio: 'Administrator Account',
        gender: 'other',
        dob: new Date('1990-01-01'),
        is_admin: true
      });

      await adminUser.save();
      console.log(`✅ Admin user created successfully!`);
    }

    console.log('\n📋 Admin Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n💡 You can now login to the admin dashboard at /admin');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();


