-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS tour_planner;

-- Use the database
USE tour_planner;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Plain password (for compatibility with existing code)
    hashed_password VARCHAR(255) NOT NULL,  -- Properly hashed password
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create password_reset table for OTP functionality
CREATE TABLE IF NOT EXISTS password_reset (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    otp VARCHAR(10) NOT NULL,
    expiry DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) NOT NULL,  -- Added field for the booking reference
    destination VARCHAR(255) NOT NULL,
    accommodation VARCHAR(255) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    booking_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    booked_by VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,  -- Added email field
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    accommodation VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_booking_review (booking_id)
);
