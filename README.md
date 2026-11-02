# 🇮🇳 Swadeshi for Atmanirbhar Bharat — Travel & Tourism Planner

A modern, full-stack travel planning and booking platform designed to promote and streamline tourism. Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Node.js / Express**, and **MongoDB**, featuring interactive 3D elements, real-time booking workflows, simulated payment gateways, automated email notifications, and a comprehensive admin management dashboard.

---

## 🚀 Key Features

- **🎨 Modern & Interactive UI/UX**:
  - Built with React 19, Tailwind CSS v4, and Framer Motion for smooth transitions.
  - 3D elements powered by `@react-three/fiber` and `@react-three/drei`.
  - Parallax scrolling, dynamic carousels, and responsive design across desktop and mobile.

- **🗺️ Discovery & Exploration**:
  - Explore handpicked tourist destinations, premium accommodations, and exciting local activities.
  - View detailed itineraries, cost estimates, travel durations, and user ratings.

- **📅 End-to-End Booking Workflow**:
  - Multi-step booking process: select destinations, choose stay durations, add travel companions, and customize activity add-ons.
  - Real-time cost calculation based on dates, nights, and group size.

- **💳 Multi-Method Payment Simulation**:
  - Interactive payment screen supporting Credit/Debit Cards, UPI with dynamic QR code generation (`qrcode.react`), Apple Pay, Google Pay, and Net Banking.
  - Instant booking ID generation and automated confirmation emails.

- **📧 Automated Email Notifications**:
  - Automated transactional emails powered by Nodemailer.
  - Formatted responsive HTML templates for welcome registrations, booking confirmations, and OTP password resets.

- **🔐 User Management & Support**:
  - User signup and authentication with bcrypt hashing.
  - Password recovery system via secure OTP verification.
  - Personalized profile dashboard and booking history (`/my-bookings`).
  - Integrated customer query/ticketing system (`/user-queries`).

- **🛡️ Comprehensive Admin Dashboard**:
  - Dedicated admin portal (`/admin`) with real-time statistics (total bookings, revenue, approved/pending statuses).
  - Manage users, review incoming bookings (approve/reject), and resolve customer support queries.
  - CLI administrative utilities for quick role management.

- **☁️ Cloud & Serverless Deployment Ready**:
  - Configured for both **Netlify Functions** (`netlify.toml`) and **Vercel** (`vercel.json`) serverless runtimes.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 6, Tailwind CSS v4, React Router v7, Framer Motion, Lucide React, React Icons |
| **3D & Visuals** | Three.js, `@react-three/fiber`, `@react-three/drei`, React Parallax Tilt |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB with Mongoose ODM |
| **Email Services** | Nodemailer with responsive HTML templates |
| **Deployment** | Vercel (`api/index.cjs`), Netlify (`netlify/functions/api.js`) |

---

## 📁 Repository Structure

```
├── Frontend/                 # Vite + React frontend application
│   ├── src/
│   │   ├── assets/           # Team photos, logos, static graphics
│   │   ├── components/       # Reusable components (Navbar, Hero, About, Footer, etc.)
│   │   ├── config/           # Centralized API endpoints configuration
│   │   ├── data/             # Curated destination, stay, and activity data
│   │   ├── pages/            # Page views (Booking, Dashboard, Admin, Profile, etc.)
│   │   └── styles/           # Global and component stylesheets
│   ├── package.json
│   └── vite.config.js        # Vite config with /api local proxy
│
├── backend/                  # Express REST API backend
│   ├── config/               # Database connection (Mongoose / MongoDB)
│   ├── models/               # MongoDB Mongoose schemas (User, Booking, Query, etc.)
│   ├── routes/               # API route definitions (auth, booking, admin, user, etc.)
│   ├── utils/                # Mailer & HTML email templates
│   ├── createAdmin.js        # CLI utility to create admin users
│   ├── makeAdmin.js          # CLI utility to promote users to admin
│   ├── addSampleData.js      # Script to populate mock destination data
│   └── server.js             # Local Express server entry point
│
├── api/                      # Serverless entry point for Vercel deployment
├── netlify/                  # Serverless function entry point for Netlify deployment
├── netlify.toml              # Netlify build and routing configuration
├── vercel.json               # Vercel serverless configuration
└── package.json              # Root package configuration
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

2. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tour_planner
   CORS_ORIGIN=http://localhost:5173

   # Optional: Email Notifications (Gmail / SMTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM="Travel Planner <your-email@gmail.com>"
   ```

3. (Optional) Create an Admin user:
   ```bash
   node createAdmin.js admin@example.com admin123 "Admin User"
   ```

4. Start the backend server:
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
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
   # Vite development server runs on http://localhost:5173
   ```

3. Open `http://localhost:5173` in your browser. The Vite proxy forwards `/api` calls directly to `http://localhost:3000`.

---

## 🌐 Deployment

### Deploying to Netlify
- Build Command: `npm install && cd Frontend && npm install && npm run build`
- Publish Directory: `Frontend/dist`
- Functions Directory: `netlify/functions`
- Environment Variables: Configure `MONGODB_URI`, `EMAIL_USER`, `EMAIL_PASSWORD` in your Netlify Site Settings.

### Deploying to Vercel
- The repo includes `vercel.json` configured to route `/api/*` to `api/index.cjs` and frontend requests to `Frontend/dist`.
- Set your environment variables in the Vercel Project Dashboard.

---

## 👥 Contributors

Developed with dedication for the **Swadeshi for Atmanirbhar Bharat** initiative.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

