var express = require('express');
var router = express.Router();
const customerController = require('../controllers/customer');
const isAuth = require('../middleware/check-auth');

router.post('/create', customerController.createCustomer);
router.post('/signin', customerController.signInCustomer);
router.post('/update/:id', customerController.updateCustomer);
 router.post('/updatepassword/:id' , customerController.updatePassword);
 router.post('/resetpassword/:id' , customerController.resetPassword);
 router.post('/mailsend' , customerController.resetpassword_usingmail);
 router.get('/getbyId/:id' , customerController.getbyId);
 router.get('/getall' , customerController.getAll);

module.exports = router;
