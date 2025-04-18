const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose'); // Commented out for now

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('✅ Server is running without DB connection!');
});

// --- MongoDB Setup (for later) ---
/*
const mongoURI = 'your-mongo-uri-here';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
*/

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
