var express = require('express');
var router = express.Router();
const counterController = require('../controllers/counterController');

router.get('/', counterController.getAllCounters);

router.post('/', counterController.addCounter);

router.delete('/:id', counterController.removeCounter);

router.get('/:id', counterController.getCounterById);

module.exports = router;
