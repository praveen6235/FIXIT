# FIXIT – Service Booking Platform (MERN Stack)

## Overview
FIXIT is a full-stack web application that connects users with service providers such as plumbers, electricians, and other home service professionals.  
Users can register, log in, browse available service providers, and book services.

This project is built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

---

# Live Deployment

Frontend (Vercel)  
https://fixit-nine-delta.vercel.app

Backend (Render)  

Database  
MongoDB Atlas

---

# Tech Stack

## Frontend
- React.js
- Axios
- CSS / Bootstrap / Tailwind

## Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (image upload)

## Database
- MongoDB Atlas
- Mongoose

## Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## User
- Register account
- Login / Logout
- Browse service providers
- Book services
- View bookings

## Provider
- Create provider profile
- Upload service images
- Manage service details

## Admin
- Manage users
- Manage providers
- Manage bookings

---

# Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

Process:

1. User registers
2. Password is hashed using bcrypt
3. Login verifies credentials
4. JWT token generated
5. Token used for protected routes

---

# Image Upload

Images are uploaded using **Multer** and stored in:

