var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.register);
router.post('/signin', authController.login);

module.exports = router;
