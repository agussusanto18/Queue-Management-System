const Counter = require('../models/Counter');

exports.getAllCounters = async (req, res) => {
    try {
        const counters = await Counter.find().sort({ queueNumber: 1 });
        res.json(counters);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getCounterById = async (req, res) => {
    try {
        const counters = await Counter.findById(req.params.id);
        if (!counters) {
            return res.status(400).json({ message: 'Counters not found'});
        }
        res.json(customer);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }
};

exports.addCounter = async (req, res) => {
    try {
        const { name, available } = req.body;
        const counter = new Counter({ name, available });
        await counter.save();
        res.status(201).json(counter);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.removeCounter = async (req, res) => {
    try {
        const counter = await Counter.findById(req.params.id);
        if (!counter) {
            return res.status(404).json({ message: 'Counter not found'});
        }
        await counter.remove();
        res.json({ message: 'Counter removed from queue'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};