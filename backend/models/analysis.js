// routes/analysis.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Protected route example (fetch user info or analysis data.)
router.get('/data', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Example: You can modify this to return actual analysis
    res.status(200).json({
      message: 'Analysis data fetched successfully',
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
