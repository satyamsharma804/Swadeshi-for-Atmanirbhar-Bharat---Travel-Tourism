import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    // CRITICAL: Removed hardcoded defaults ('smtp.gmail.com' and 587)
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, 
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email function
export const sendEmail = async (to, subject, text, html = null) => {
  try {
    // CRITICAL: Simplified check to only rely on existence of USER/PASSWORD variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) { 
      console.log('📧 Email (Dev Mode) - Skipping actual send');
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Body: ${text.substring(0, 100)}...`);
      return { success: true, message: 'Email logged (dev mode)' };
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>')
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log('📧 Email error (non-critical):', error.message);
    // Don't throw error in development - just log it
    return { success: false, message: 'Email failed (dev mode)', error: error.message };
  }
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('⚠️  Email configuration not found in .env file');
      return false;
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration verified');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};