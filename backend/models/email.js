const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    subject: String,
    body: String,
    prediction: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', EmailSchema);
