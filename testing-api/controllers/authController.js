const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errorHandlers = require('../errorHandlers');


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        errorHandlers.generalErrorHandler(res, 500);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user){
            errorHandlers.generalErrorHandler(res, 400, 'Invalid email or password');
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                errorHandlers.generalErrorHandler(res, 400, 'Invalid email or password');
            } else {
                const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '12h' });
                res.status(200).json({ token });
            }
        }
    } catch(error) {
        errorHandlers.generalErrorHandler(res, 500);
    }
}