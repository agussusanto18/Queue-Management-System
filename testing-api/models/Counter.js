const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    totalVisitor: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Counter', counterSchema);