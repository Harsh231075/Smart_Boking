# 🗓️ Slot Booking App - MERN Stack

A full-stack slot booking application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, view available slots, book or cancel them, and manage their own bookings. Authentication is handled via JWT and stored in localStorage.

---

## 🚀 Features

- User Registration (with token generation)
- Token-based Authentication
- View all slots with status (Available / Booked)
- Book a slot (if logged in)
- Cancel a slot (if booked)
- Context API for state management
- Protected UI logic (based on login status)
- Modern UI using Tailwind CSS

---

## 🛠️ Tech Stack

| Layer         | Tech                      |
| ------------- | ------------------------- |
| Frontend      | React, Tailwind CSS       |
| Backend       | Node.js, Express.js       |
| Database      | MongoDB (with Mongoose)   |
| Auth          | crypto (stored in localStorage) |
| Communication | Axios (REST APIs)         |

---

## 📁 Folder Structure

project-root
│
├── / frontend
│ ├── public
│ └── src
│ ├── components # Reusable UI components
│ ├── context # SlotContext for global state
│ ├── pages
│ └── App.jsx
│
├── / Backend
│ ├── model/User.js # Mongoose schema
| |---data
│ ├── routes/auth.js # Register route
│ ├── db/db.js # DB connection
│ └── index.js # Entry point
│
├── .env
├── .gitignore
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/slot-booking-app.git
cd slot-booking-app

```
Create .env file:
env
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
