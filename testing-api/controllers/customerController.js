const Counter = require('../models/Counter');
const Customer = require('../models/Customer');
const errorHandlers = require('../errorHandlers');

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('counter').sort({ queueNumber: 1 });
        res.status(200).json(customers);
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            errorHandlers.generalErrorHandler(res, 404, 'Customer not found');
        } else {
            res.status(200).json(customer);
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.addCustomersToQueue = async (req, res, next) => {
    try {
        const { name, phoneNumber, address, dateOfBirth, gender, emergencyContact, insuranceInformation, medicalHistory, occupation, maritalStatus, } = req.body;
        const latestCustomer = await Customer.findOne().sort({ queueNumber: -1 });
        const queueNumber = latestCustomer ? latestCustomer.queueNumber + 1 : 1;

        const getCounter = await Counter.findOne({ available: true }).sort({ totalVisitor: 1 });

        if (getCounter) {
            const customer = new Customer({
                name, phoneNumber, queueNumber, address, dateOfBirth, gender, emergencyContact, insuranceInformation, medicalHistory, occupation, maritalStatus, counter: getCounter._id
            });

            if (getCounter) {
                getCounter.totalVisitor += 1;
                await getCounter.save();
            }

            await customer.save();
            res.status(201).json(customer);
        } else {
            errorHandlers.generalErrorHandler(res, 400, 'Counter not found, please add a counter first!');
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.removeCustomeFromQueue = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            errorHandlers.generalErrorHandler(res, 404, 'Customer not found');
        } else {
            await customer.remove();
            res.status(200).json({ message: 'Customer removed from queue' });
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
};

exports.callCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            errorHandlers.generalErrorHandler(res, 404, 'Customer not found');
        } else {
            if (customer.callId > 0) {
                errorHandlers.generalErrorHandler(res, 400, 'This Customer has already been called');
            } else {
                const getCustomer = await Customer.findOne().sort({ callId: -1 });
                customer.callId = getCustomer.callId + 1;
                await customer.save();

                res.status(200).json(customer);
            }
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
}

exports.getUncalledCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ callId: 0 }).limit(4).populate('counter').sort({ queueNumber: 1 });
        res.status(200).json(customers);
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
}

exports.getCalledCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne().populate('counter').sort({ callId: -1 });
        if (!customer) {
            errorHandlers.generalErrorHandler(res, 404, 'Customer not found');
        } else {
            res.status(200).json(customer);
        }
    } catch (err) {
        errorHandlers.generalErrorHandler(res, 500);
    }
}
