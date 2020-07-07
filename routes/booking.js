var express = require('express');
var router = express.Router();
const bookingController = require('../controllers/booking');


router.post('/find-drivers', bookingController.findDrivers);


module.exports = router;

