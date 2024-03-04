const Counter = require('../models/Counter');
const Customer = require('../models/Customer');

const handleServerError = (res, err) => {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('counter').sort({ queueNumber: 1 });
        res.json(customers);
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.addCustomersToQueue = async (req, res) => {
    try {
        const { name, phoneNumber, address, dateOfBirth, gender, emergencyContact, insuranceInformation, medicalHistory, occupation, maritalStatus, } = req.body;
        const latestCustomer = await Customer.findOne().sort({ queueNumber: -1 });
        const queueNumber = latestCustomer ? latestCustomer.queueNumber + 1 : 1;

        const getCounter = await Counter.findOne({ available: true }).sort({ totalVisitor: 1 });
        const counterId = getCounter ? getCounter._id : null;

        const customer = new Customer({
            name, phoneNumber, queueNumber, address, dateOfBirth, gender, emergencyContact, insuranceInformation, medicalHistory, occupation, maritalStatus, counter: counterId
        });

        if (getCounter) {
            getCounter.totalVisitor += 1;
            await getCounter.save();
        }

        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.removeCustomeFromQueue = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        await customer.remove();
        res.json({ message: 'Customer removed from queue' });
    } catch (err) {
        handleServerError(res, err);
    }
};

exports.callCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        if (customer.callId > 0) {
            return res.status(400).json({ message: 'This Customer has already been called' });
        }

        const getCustomer = await Customer.findOne().sort({ callId: -1 });
        customer.callId = getCustomer.callId + 1;
        await customer.save();

        res.status(200).json(customer);
    } catch (err) {
        handleServerError(res, err);
    }
}

exports.getUncalledCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ callId: 0 }).limit(4).populate('counter').sort({ queueNumber: 1 });
        res.json(customers);
    } catch (err) {
        handleServerError(res, err);
    }
}

exports.getCalledCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne().populate('counter').sort({ callId: -1 });
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        handleServerError(res, err);
    }
}
