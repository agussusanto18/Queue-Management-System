const request = require('supertest');
const app = require('../app');
const Counter = require('../models/Counter');

describe('Counter API Tests', function () {
    describe('GET /counters', function () {
        it('should return status 200 and an array of counters', function (done) {
            request(app)
                .get('/counters')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /counters/:id', function () {
        it('should return status 200 and an object of Counter', async function () {
            const counter = await Counter.findOne();
            await request(app)
                .get(`/counters/${counter._id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
        });
        it('should return status 404 and an object of error message', function (done) {
            request(app)
                .get('/counters/65e206c4f3c6ff42bce6fe2b')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
        it('should return status 500 and an object of error message', function (done) {
            request(app)
                .get('/counters/123')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500, done);
        });
    });

    describe('POST /counters', function () {
        it('should return status 201 and an object of Counter', function (done) {
            request(app)
                .post('/counters')
                .send(
                    {
                        "name": "Counter 1",
                        "available": true
                    }
                )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201, done);
        });
    });

    describe('DELETE /counters/:id', function () {
        let counter_id;

        it('should return status 200 and an object of success message', async function () {
            const customer = await Counter.findOne();
            counter_id = customer._id;

            await request(app)
                .delete(`/counters/${counter_id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
        });

        it('should return status 404 and an object of error message', function (done) {
            request(app)
                .delete(`/counters/${counter_id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return status 500 and an object of error message', function (done) {
            request(app)
                .delete(`/counters/123`)
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
}