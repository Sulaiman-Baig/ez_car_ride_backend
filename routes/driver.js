var express = require('express');
const {
    Driver    
} = require('../database/database');
var router = express.Router();
const driverController = require('../controllers/driver');
const isAuth = require('../middleware/check-auth');
const hashedpassword = require("password-hash");

router.post('/create', driverController.createDriver, );
router.post('/signin', driverController.signinDriver);
router.post('/update/:id', driverController.updateDriver);
//  router.post('/updatepassword/:id' , driverController.updatePassword);
 router.post('/resetpassword/:id' , driverController.resetPassword);
 router.post('/mailsend' , driverController.resetpassword_usingmail);
 router.post('/change-availability-status/:driverId' , driverController.changeStatus);
 router.post('/rating/:driverId' , driverController.rating);
 router.get('/getbyId/:id' , driverController.getbyId);
 router.get('/get-balance/:id' , driverController.getBalance);
 router.post('/is-driver-exist-by-email' , driverController.isDriverExistByEmail);
 router.get('/getall' , driverController.getAll);
 router.post('/locationupdator' , driverController.locupd);
 router.get('/approve-driver/:driverId' , driverController.approveDriver);
 router.get('/dis-approve-driver/:driverId' , driverController.disApproveDriver);
 router.post("/updatepassword/:id", (req, res, next) => {
    Driver.update({
        password: hashedpassword.generate(req.body.password),
    }, {
        where: {
            id: req.params.id
        }
    }).then(val => {
        res.json({
            message: "updated",
            resp: val
        });
    })
});

router.post("/forgot", (req, res, next) => {
    var reqData = req.body;
    var pa;
    Driver.findOne({
        where: {
            email: reqData.email
        }
    }).then(isAccountExist => {

        var password = generator.generate({
            length: 8,
            numbers: true
        })
        pa = password;
        if (isAccountExist) {
            res.json({
                message: 'Email exsists',
                pa,
                isAccountExist: isAccountExist
            });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dareme.coliseum@gmail.com',
                    pass: 'abuzar1047'
                }
            });

            var mailOptions = {
                from: 'NoReply@mazraati',
                to: req.body.email,
                subject: 'Your secret code is here.',
                text: pa,
                attachments: []
            };


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        } else {
            res.json({
                message: 'Email does not exsists'
            });
        }
    });
});


module.exports = router;
