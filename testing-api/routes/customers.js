var express = require('express');
var router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/uncalled', customerController.getUncalledCustomers);

router.get('/called', customerController.getCalledCustomer);

router.get('', customerController.getAllCustomers);

router.post('', customerController.addCustomersToQueue);

router.delete('/:id', customerController.removeCustomeFromQueue);

router.get('/:id', customerController.getCustomerById);

router.get('/call/:id', customerController.callCustomer);

module.exports = router;
