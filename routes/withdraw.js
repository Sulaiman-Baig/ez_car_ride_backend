var express = require('express');
var router = express.Router();
const withdrawController = require('../controllers/withdraw');


router.post('/create/:driverId', withdrawController.requestToWithdraw );
router.post('/release-funds-to-withdraw-request/:id', withdrawController.releaseFundsToWithdrawRequest );
router.get('/getall', withdrawController.getAllWithdrawRequests );



module.exports = router;