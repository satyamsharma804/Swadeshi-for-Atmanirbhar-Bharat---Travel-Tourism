# 🇮🇳 Swadeshi for Atmanirbhar Bharat — Travel & Tourism Planner

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://swadeshi-for-atmanirbhar-bharat-tra.vercel.app/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://swadeshi-for-atmanirbhar-bharat-travel.onrender.com)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Swadeshi Travel Planner** is a modern, enterprise-grade full-stack platform built to champion domestic Indian tourism under the national vision of **Atmanirbhar Bharat**. Pairing an interactive 3D frontend with a resilient cloud backend, the platform features an intelligent **AI Trip Planner Chatbot**, end-to-end booking configurations, simulated payments, email automation, cryptographic security, and a unified administrative control center.

---

## 🌐 Live Deployments

- 🚀 **Live Web Application (Frontend):** [https://swadeshi-for-atmanirbhar-bharat-tra.vercel.app/](https://swadeshi-for-atmanirbhar-bharat-tra.vercel.app/)
- ⚙️ **Live REST API (Backend):** [https://swadeshi-for-atmanirbhar-bharat-travel.onrender.com](https://swadeshi-for-atmanirbhar-bharat-travel.onrender.com)
- 🗄️ **Database Cluster:** MongoDB Atlas Cloud (`tour_planner`)

---

## 🚀 Key Features

### 🤖 1. Swadeshi AI Trip Planner Chatbot
- **Interactive Multi-Mode Assistant:** Floating AI travel assistant offering conversational planning and quick-form itinerary generation.
- **Custom Budget & Group Logic:** Tailors recommendations based on duration (days), party size, travel style (Budget / Moderate / Luxury), and transit modes (Train, Flight, Road Trip).
- **Day-by-Day Route Plans:** Automatically drafts daily morning/afternoon/evening schedules, highlights local culinary specialties, and calculates accurate expense estimates.

### 🎨 2. Modern 3D & Responsive Interface
- **React 19 + Tailwind CSS v4:** High-performance, responsive layout optimized across mobile, tablet, and widescreen monitors.
- **Three.js & Framer Motion:** Embedded 3D visuals using `@react-three/fiber` and `@react-three/drei` combined with spring animations, glassmorphic dropdowns, and parallax tilt effects.
- **Interactive Catalogs:** Curated tourist circuits, adventure activities (water sports, paragliding, river rafting), and heritage stay accommodations.

### 📅 3. Multi-Step Reservation Pipeline
- **Smart Date & Duration Calculation:** Calendar date-picker with automatic nights counter and per-night cost calculation.
- **Companion Registry:** Add and manage travel companions with dynamic age validation and activity add-ons.
- **Simulated Payment Gateway:** Multi-channel payment screen featuring instant UPI QR Code generation (`qrcode.react`), Cards, Net Banking, and instant booking ID dispatch.

### 🔐 4. Cryptographic Security & Privacy
- **Bcrypt Password Hashing:** All user passwords are salt-hashed using **bcryptjs (10 rounds)** before persisting to MongoDB.
- **Zero Plain-Text Storage:** Strict database schemas prevent plain passwords or sensitive credentials from ever being stored or exposed.
- **Protected Routing:** Token-based authentication and role-based route guards protecting `/admin` and private booking records.

### 📧 5. Automated Transactional Emails
- **Nodemailer Automation:** Immediate delivery of responsive HTML emails for:
  - Account welcome notifications
  - Instant booking confirmations with full reservation summary
  - Secure OTP password recovery tokens

### 🛡️ 6. Unified Administrative Control Center
- **Executive Metrics:** Real-time visibility into platform gross revenue, total reservations, verified customer reviews, and open queries.
- **Booking Management:** Review incoming booking requests with one-click **Approve** and **Reject** status transitions.
- **Query Resolution Desk:** Centralized support dashboard to review customer inquiries and send official admin responses.

---

## 🛠️ Tech Stack Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | **React 19**, **Vite 6**, **React Router v7** |
| **Styling & Animation** | **Tailwind CSS v4**, **Framer Motion**, Lucide React, React Icons |
| **3D & Visuals** | **Three.js**, `@react-three/fiber`, `@react-three/drei`, React Parallax Tilt |
| **Backend Runtime** | **Node.js (ES Modules)**, **Express.js** |
| **Cloud Database** | **MongoDB Atlas Cloud** with **Mongoose ODM** |
| **Authentication & Crypto**| **Bcrypt.js** (Salt factor 10), Token validation |
| **Notification Engine** | **Nodemailer** with custom HTML email dispatchers |
| **Hosting & CI/CD** | **Vercel** (Frontend edge + Proxy rewrites) & **Render** (Node.js Web Service) |

---

## 📊 Pre-Seeded Real-World Dataset

The production database is seeded with authentic Indian travel records via `backend/seedLargeDataset.js`:

| Category | Volume | Details |
| :--- | :---: | :--- |
| **Registered Travelers** | **84 Users** | Complete profiles with bcrypt password security |
| **Completed & Active Trips** | **120 Bookings** | Historic, confirmed, and upcoming bookings across Indian circuits |
| **Verified Reviews** | **66 Reviews** | Star ratings and authentic traveler feedback |
| **Support Desk Inquiries** | **50 Queries** | Customer support tickets with official admin replies |

---

## 📁 Repository Structure

```
├── Frontend/                 # React 19 + Vite 6 Client Application
│   ├── src/
│   │   ├── assets/           # Team photos, logos, static illustrations
│   │   ├── components/       # UI Components (Navbar, Hero, Chatbot, 3D Canvas, Footer)
│   │   ├── config/           # Centralized API routing config (api.js)
│   │   ├── data/             # Curated destination, stay, and activity catalogs
│   │   ├── pages/            # Page Views (BookingPage, AdminDashboard, Reviews, Auth)
│   │   └── App.jsx           # Main routing & React Context Provider
│   ├── package.json
│   └── vite.config.js        # Vite build configuration with development proxy
│
├── backend/                  # Node.js + Express.js REST API
│   ├── config/               # Database connection (Mongoose / MongoDB Atlas)
│   ├── models/               # Schemas: User.js, Booking.js, Query.js, Review.js
│   ├── routes/               # API route handlers: auth, booking, admin, chatbot, query
│   ├── utils/                # Nodemailer email dispatcher & HTML email templates
│   ├── server.js             # Standalone Express server entry point
│   ├── createAdmin.js        # CLI utility to create administrative accounts
│   ├── seedLargeDataset.js   # Production dataset seeder script
│   └── package.json
│
├── vercel.json               # Vercel proxy rewrites (/api/* -> Render Web Service)
├── netlify.toml              # Netlify serverless fallback configuration
└── README.md                 # Project documentation
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/satyamsharma804/Swadeshi-for-Atmanirbhar-Bharat---Travel-Tourism.git
cd Swadeshi-for-Atmanirbhar-Bharat---Travel-Tourism
```

### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables in `backend/.env`:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:5173

   # Optional: Email Service (Gmail / SMTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM="Swadeshi Travel <your-email@gmail.com>"
   ```

3. Seed the database with real-world dataset (optional):
   ```bash
   node seedLargeDataset.js
   ```

4. Start the Express server:
   ```bash
   npm run dev
   # Server running on http://localhost:3000
   ```

### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend:
   ```bash
   cd Frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   # Client running on http://localhost:5173
   ```

3. Open `http://localhost:5173` in your browser. The Vite proxy forwards all `/api/*` calls directly to `http://localhost:3000`.

---

## 🔑 Demonstration Credentials

For testing and grading purposes, you can log in using the pre-configured administrative account:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` | Full Dashboard & User Management (`/admin`) |
| **Traveler (User)** | `rajesh.kumar@example.com` | `password123` | Booking & Profile Access (`/profile`) |

---

## 👥 Meet Our Team

| Name | Role | Degree & Institution | Profile Links |
| :--- | :--- | :--- | :--- |
| **Satyam Kumar** | **Lead & Backend Developer** | B.Tech CSE (4th Year), Lovely Professional University | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/satyam-kumar-51a413299/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/satyamsharma804) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use and adapt for academic and community purposes.
