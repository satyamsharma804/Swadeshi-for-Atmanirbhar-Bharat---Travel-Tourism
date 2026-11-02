import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tour_planner';

async function makeAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
      console.error('❌ Please provide an email address');
      console.log('\nUsage: node makeAdmin.js user@example.com');
      process.exit(1);
    }

    // Find the user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      console.log('\n💡 Available users:');
      const allUsers = await User.find({}, { email: 1, name: 1, is_admin: 1 });
      allUsers.forEach(u => {
        console.log(`   - ${u.email} (${u.name}) ${u.is_admin ? '[ADMIN]' : ''}`);
      });
      process.exit(1);
    }

    // Check if already admin
    if (user.is_admin) {
      console.log(`✅ User "${email}" is already an admin`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Update to admin
    await User.updateOne(
      { email: email.toLowerCase() },
      { $set: { is_admin: true } }
    );

    console.log(`✅ Successfully made "${email}" an admin!`);
    console.log(`\n📋 Login Credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: (your existing password)`);
    console.log(`\n💡 Now login at /login and select "Admin" login type`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();


