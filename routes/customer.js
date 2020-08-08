var express = require('express');
const {
    Customer    
} = require('../database/database');
var router = express.Router();
const customerController = require('../controllers/customer');
const isAuth = require('../middleware/check-auth');
const hashedpassword = require("password-hash");

router.post('/create', customerController.createCustomer);
router.post('/signin', customerController.signInCustomer);
router.post('/update/:id', customerController.updateCustomer);
router.post('/update-card-info/:id', customerController.updateCustomerCardInfo);
//  router.post('/updatepassword/:id' , customerController.updatePassword);
 router.post('/resetpassword/:id' , customerController.resetPassword);
 router.post('/mailsend' , customerController.resetpassword_usingmail);
 router.post('/change-availability-status/:customerId' , customerController.changeStatus);
 router.get('/getbyId/:id' , customerController.getbyId);
 router.post('/is-customer-exist-by-email' , customerController.isCustomerExistByEmail);
 router.get('/getall' , customerController.getAll);
 router.post("/updatepassword/:id", (req, res, next) => {
    Customer.update({
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
    Customer.findOne({
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
