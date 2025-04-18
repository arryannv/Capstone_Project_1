const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

// Save a classified email
router.post('/save', async (req, res) => {
    try {
        const { subject, body, prediction } = req.body;
        const newEmail = new Email({ subject, body, prediction });
        await newEmail.save();
        res.json({ message: "Email saved successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save email." });
    }
});

// Get all classified emails
router.get('/', async (req, res) => {
    try {
        const emails = await Email.find().sort({ createdAt: -1 });
        res.json(emails);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch emails." });
    }
});

module.exports = router;
