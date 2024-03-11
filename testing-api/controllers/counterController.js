const Counter = require('../models/Counter');
const errorHandlers = require('../errorHandlers');


exports.getAllCounters = async (req, res) => {
    try {
        const counters = await Counter.find().sort({ queueNumber: 1 });
        res.json(counters);
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.getCounterById = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id);
        if (!counter) {
            errorHandlers.generalErrorHandler(res, 404, 'Counter not found');
        } else {
            res.status(200).json(counter);
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.addCounter = async (req, res) => {
    try {
        const { name, available } = req.body;
        const counter = new Counter({ name, available });
        await counter.save();
        res.status(201).json(counter);
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.removeCounter = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id);
        if (!counter) {
            errorHandlers.generalErrorHandler(res, 404, 'Counter not found');
        } else {
            await counter.remove();
            res.status(200).json({ message: 'Counter removed from queue' });
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};
