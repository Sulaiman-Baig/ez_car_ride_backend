var express = require('express');
var router = express.Router();
const comissionController = require('../controllers/comission');
const isAuth = require('../middleware/check-auth');

router.post('/create', comissionController.createComissionRate);
 router.get('/getbyId/:id' , comissionController.getComissionRate);
 router.get('/getall' , comissionController.getAllComissionsRate);

module.exports = router;
