var express = require('express');
var router = express.Router();
const driverController = require('../controllers/driver');
const isAuth = require('../middleware/check-auth');

router.post('/create', driverController.createDriver);
router.post('/signin', driverController.signinDriver);
router.post('/update/:id', driverController.updateDriver);
 router.post('/updatepassword/:id' , driverController.updatePassword);
 router.post('/resetpassword/:id' , driverController.resetPassword);
 router.post('/mailsend' , driverController.resetpassword_usingmail);
 router.get('/getbyId/:id' , driverController.getbyId);
 router.get('/get-balance/:id' , driverController.getBalance);
 router.post('/is-driver-exist-by-email' , driverController.isDriverExistByEmail);
 router.get('/getall' , driverController.getAll);
 router.post('/locationupdator' , driverController.locupd);

module.exports = router;
