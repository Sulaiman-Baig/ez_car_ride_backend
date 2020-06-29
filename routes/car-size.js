var express = require('express');
var router = express.Router();
const carSizeController = require('../controllers/car-size');


router.post('/create', carSizeController.createCarSize );
router.post('/update/:id', carSizeController.updateCarSize );
router.post('/delete/:id', carSizeController.deleteCarSize );
router.get('/get/:id', carSizeController.getCarSize );
router.get('/getall', carSizeController.getAllCarSizes );



module.exports = router;