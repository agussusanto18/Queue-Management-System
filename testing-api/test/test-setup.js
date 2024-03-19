const mongoose = require('mongoose');
const config = require('../config/config-test'); // Adjust the path as needed

let isConnected = false;

// Setup function to establish MongoDB connection before running tests
async function setupTestEnvironment() {
    await mongoose.disconnect();
    if (isConnected == false) {
        await mongoose.connect(config.database.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
    }
}

// Teardown function to close MongoDB connection after all tests are completed
async function teardownTestEnvironment() {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
}

module.exports = {
    setupTestEnvironment,
    teardownTestEnvironment
};
