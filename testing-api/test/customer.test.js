const request = require('supertest');
const mongoose = require('mongoose');
const config = require('../config/config-test'); // Adjust the path as needed
const app = require('../app');
const Customer = require('../models/Customer');
const Counter = require('../models/Counter');

let isConnected = false;

async function connectToDatabase() {
    if (!isConnected) {
        await mongoose.connect(config.database.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
    }
}

// Close existing database connection before running tests
before(async () => {
    await mongoose.disconnect();
    await connectToDatabase();
    await setupData();
});

// Close database connection after running tests
after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe('Customer API Tests', function () {
    describe('GET /customers', function () {
        it('should return status 200 and an array of customers', function (done) {
            request(app)
                .get('/customers')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /customers/:id', function () {
        it('should return status 200 and an object of Customer', async function () {
            const customer = await Customer.findOne();
            await request(app)
                .get(`/customers/${customer._id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
        });
        it('should return status 404 and an object of error message', function (done) {
            request(app)
                .get('/customers/65e206c4f3c6ff42bce6fe2b')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
        it('should return status 500 and an object of error message', function (done) {
            request(app)
                .get('/customers/123')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
        });
    });

    describe('POST /customers', function () {
        it('should return status 201 and an object of Customer', function (done) {
            request(app)
                .post('/customers')
                .send(
                    {
                        "name": "Michael Johnson",
                        "phoneNumber": "5551234567",
                        "address": "789 Oak St, Anothertown, USA",
                        "dateOfBirth": "1978-08-10",
                        "gender": "Male",
                        "emergencyContact": {
                            "name": "Sarah Johnson",
                            "relationship": "Spouse",
                            "phoneNumber": "5559876543"
                        },
                        "insuranceInformation": {
                            "provider": "DEF Healthcare",
                            "policyNumber": "987654321"
                        },
                        "medicalHistory": "High blood pressure",
                        "occupation": "Doctor",
                        "maritalStatus": "Married"
                    }
                )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201, done);
        });
    });

    describe('DELETE /customers/:id', function () {
        let customer_id;

        it('should return status 200 and an object of success message', async function () {
            const customer = await Customer.findOne();
            customer_id = customer._id;

            await request(app)
                .delete(`/customers/${customer_id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
        });

        it('should return status 404 and an object of error message', function (done) {
            request(app)
                .delete(`/customers/${customer_id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return status 500 and an object of error message', function (done) {
            request(app)
                .delete(`/customers/123`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
        });
    });
});

async function setupData() {
    await Counter.create([
        {
            "name": "Counter 1",
            "available": true
        },
        {
            "name": "Counter 2",
            "available": true
        },
        {
            "name": "Counter 3",
            "available": true
        }
    ]);

    const counter = await Counter.find();
    
    await Customer.create([
        {
            "name": "John Doe",
            "phoneNumber": "1234567890",
            "queueNumber": 1,
            "address": "123 Main St, Anytown, USA",
            "dateOfBirth": "1985-05-20",
            "gender": "Male",
            "emergencyContact": {
                "name": "Jane Doe",
                "relationship": "Spouse",
                "phoneNumber": "0987654321"
            },
            "insuranceInformation": {
                "provider": "ABC Insurance",
                "policyNumber": "123456789"
            },
            "medicalHistory": "No significant medical history",
            "occupation": "Engineer",
            "maritalStatus": "Married",
            "counter": counter[0]._id,
        },
        {
            "name": "Jane Smith",
            "phoneNumber": "9876543210",
            "queueNumber": 2,
            "address": "456 Elm St, Othertown, USA",
            "dateOfBirth": "1990-12-15",
            "gender": "Female",
            "emergencyContact": {
                "name": "John Smith",
                "relationship": "Sibling",
                "phoneNumber": "1231231234"
            },
            "insuranceInformation": {
                "provider": "XYZ Health",
                "policyNumber": "987654321"
            },
            "medicalHistory": "Allergic to penicillin",
            "occupation": "Teacher",
            "maritalStatus": "Single",
            "counter": counter[1]._id,
        }
    ]);
}