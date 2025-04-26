// models/User.js
const mongoose = require('mongoose');

// Email History Schema
const emailAnalysisSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  isSpam: {
    type: Boolean,
    required: true
  },
  spamProbability: {
    type: Number,
    required: true
  },
  categories: {
    phishing: Number,
    promotional: Number,
    scam: Number,
    legitimate: Number
  },
  keywords: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailHistory: [emailAnalysisSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);