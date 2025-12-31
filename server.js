// server.js
require('dotenv').config(); // Must be at the top
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const propertyRoutes = require('./routes/properties');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const limiter =rateLiimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// --- MongoDB Connection ---
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate';

// This simplified version removes the unsupported options
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate';

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected successfully'))
  .catch(err => console.error('❌ Database connection error:', err));

// --- Routes ---
app.use('/api/properties', propertyRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Real Estate API is running' });
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});