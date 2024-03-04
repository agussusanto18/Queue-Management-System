const Counter = require('../models/Counter');

const handleServerError = (res, err) => {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
};

exports.getAllCounters = async (req, res) => {
    try {
        const counters = await Counter.find().sort({ queueNumber: 1 });
        res.json(counters);
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.getCounterById = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id);
        if (!counter) {
            return res.status(404).json({ message: 'Counter not found' });
        }
        res.json(counter);
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.addCounter = async (req, res) => {
    try {
        const { name, available } = req.body;
        const counter = new Counter({ name, available });
        await counter.save();
        res.status(201).json(counter);
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.removeCounter = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id);
        if (!counter) {
            return res.status(404).json({ message: 'Counter not found' });
        }
        await counter.remove();
        res.json({ message: 'Counter removed from queue' });
    } catch (err) {
        handleServerError(res, err);
    }
};
