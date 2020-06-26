var express = require('express');
var router = express.Router();
const vehicleController = require('../controllers/vehicle');


router.post('/create/:driverId', vehicleController.createVehicle );
router.post('/update/:id', vehicleController.updateVehicle );
router.post('/delete/:id', vehicleController.deleteVehicle );
router.get('/get/:id', vehicleController.getVehicle );
router.get('/getall', vehicleController.getAllVehicles );



module.exports = router;