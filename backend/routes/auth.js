import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User.js';
import PasswordReset from '../models/PasswordReset.js';
import { sendEmail } from '../utils/mailer.js';
import { emailTemplates } from '../utils/emailTemplates.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, location, bio, gender, dob } = req.body;

    if (!name || !email || !password || !phone || !location || !bio || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      hashed_password: hashedPassword,
      phone,
      location,
      bio,
      gender: gender.toLowerCase(),
      dob
    });

    await newUser.save();
    
    // Trigger Welcome Email upon successful registration
    const welcomeHtml = emailTemplates.welcomeRegistration(newUser.name);
    await sendEmail(
        newUser.email,
        '🎉 Welcome to Swadeshi Travel Planner!',
        `Dear ${newUser.name},\n\nThank you for registering! Your journey begins now.`,
        welcomeHtml
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Welcome email sent.'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    let passwordVerified = false;
    
    if (user.hashed_password) {
      passwordVerified = await bcrypt.compare(password, user.hashed_password);
    }
    
    if (!passwordVerified && password === user.password) {
      passwordVerified = true;
    }

    if (!passwordVerified) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const token = crypto.createHash('md5').update(Date.now().toString()).digest('hex');

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      email: user.email,
      name: user.name,
      is_admin: user.is_admin || false
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      error: error.message
    });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await PasswordReset.deleteMany({ user_email: email.toLowerCase() });

    const passwordReset = new PasswordReset({
      user_id: user._id,
      user_email: email.toLowerCase(),
      otp,
      expiry
    });

    await passwordReset.save();

    const htmlContent = emailTemplates.passwordResetOTP(otp, user.name);
    await sendEmail(
      email,
      '🔐 Password Reset OTP - Travel Planner',
      `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 15 minutes.`,
      htmlContent
    );

    res.json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const passwordReset = await PasswordReset.findOne({
      user_email: email.toLowerCase(),
      otp,
      expiry: { $gt: new Date() }
    });

    if (!passwordReset) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully',
      password: user.password
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed',
      error: error.message
    });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required'
      });
    }

    const passwordReset = await PasswordReset.findOne({
      user_email: email.toLowerCase(),
      otp,
      expiry: { $gt: new Date() }
    });

    if (!passwordReset) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email: email.toLowerCase() },
      { 
        password: newPassword,
        hashed_password: hashedPassword 
      }
    );

    await PasswordReset.deleteMany({ user_email: email.toLowerCase() });

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
      error: error.message
    });
  }
});

export default router;