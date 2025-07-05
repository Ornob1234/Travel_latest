// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('./config/db');
const multer = require('multer');

const app = express(); // ✅ Define app first

// Store images in 'uploads' folder
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Serve uploads statically
app.use('/uploads', express.static('uploads')); // ✅ Now safe to use

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/tours', require('./routes/tours'));
//app.use('/api/admin', require('./routes/admin'));
app.use('/uploads', express.static('public/uploads'));




// Serve frontend static files from the parent directory (travel-website/)
const frontendPath = path.join(__dirname, '../');
app.use(express.static(frontendPath));

// Optional fallback for unmatched frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'profile.html')); // Or 'index.html' if preferred
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
