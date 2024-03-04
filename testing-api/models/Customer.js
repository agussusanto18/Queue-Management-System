const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    queueNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: Object,
        properties: {
            name: {
                type: String
            },
            relationship: {
                type: String
            },
            phoneNumber: {
                type: String
            }
        }
    },
    insuranceInformation: {
        type: Object,
        properties: {
            provider: {
                type: String
            },
            policyNumber: {
                type: String
            }
        }
    },
    medicalHistory: {
        type: String
    },
    occupation: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String
    },
    counter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counter'
    },
    callId: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', customerSchema);