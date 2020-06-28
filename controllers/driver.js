const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {
    Driver
} = require('../database/database');
module.exports = {

    async createDriver(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                address,
                city,
                country,
                phoneNo,
                imageURl,
                frontImageURl,
                backImageURl,
                cardName,
                cardNumber,
                csv,
                expirayYear,
                expirayMonth,
                email,
                password
            } = req.body;

            Driver.findOne({
                where: {
                    email: email
                }
            }).then(isDriverExist => {
                if (isDriverExist) {
                    res.json({ message: "This Driver already exists" });
                } else {
                   const driver = await Driver.create({
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        city: city,
                        country: country,
                        phoneNo: phoneNo,
                        imageURl: imageURl,
                        backImageURl: backImageURl,
                        frontImageURl: frontImageURl,
                        cardName: cardName,
                        cardNumber: cardNumber,
                        csv: csv,
                        expirayYear: expirayYear,
                        expirayMonth: expirayMonth,
                        password: hashedpassword.generate(password),
                        is_active: false,
                        email: email
                    });

                    return res.status(http_status_codes.CREATED).json(driver);
                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating User"
            });
        }
    },

    signinDriver(req, res, next) {
        Driver.findOne({
            where: {
                email: req.body.email
            }
        }).then(isDriverExist => {
            if (isDriverExist) {
                const verify_password = hashedpassword.verify(
                    req.body.password, isDriverExist.password
                );
                if (verify_password) {
                    const token = jwt.sign({
                        email: req.body.email,
                        driverId: isDriverExist.id
                    },
                        "very-long-string-for-secret", {
                        expiresIn: 3600
                    }
                    );

                    res.json({
                        message: "successfully login",
                        accessToken: token,
                        user: isDriverExist
                    })
                } else {
                    res.json({
                        message: 'Invalid credentials'
                    })
                }
            } else {
                res.json({
                    message: 'Invalid credentials'
                })
            }
        })


    },

    async getbyId(req, res, next) {
        try {
            const driver = await Driver.findOne({ where: { id: req.params.id } });
            return res.status(http_status_codes.OK).json(driver);

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single driver"
            })
        }
    },

    async getAll(req, res, next) {
        try {
            const drivers = await Driver.findAll();
            return res.status(http_status_codes.OK).json(drivers);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All drivers"
            });
        }
    },





    async updateDriver(req, res, next) {
        try {
            id = req.params.id;
            const {
                firstName,
                lastName,
                address,
                city,
                country,
                phoneNo,

            } = req.body
            Driver.update({
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                country: country,
                phoneNo: phoneNo
             }, {
                where: {
                    id: id
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured"
            })
        }
    },

    async updatePassword(req, res, next) {
        try {
            id = req.params.id;
            const {
                password
            } = req.body
            Driver.update({
                password: hashedpassword.generate(password)
            }, {
                where: {
                    id: id
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured"
            })
        }
    },

    async resetPassword(req, res, next) {
        try {
            const driverId = req.params.id;
            const oldpassword = req.body.oldpassword;
            const newpassword = req.body.newpassword;
            Driver.findOne({
                where: { id: driverId }
            })
                .then((driver) => {
                    const isAuth = hashedpassword.verify(
                        oldpassword,
                        driver.password
                    );
                    if (isAuth) {

                        driver.update({
                            password: hashedpassword.generate(newpassword)
                        })
                            .then(() => {
                                res.json({ message: 'Password update successfully' });
                            })
                    } else if (!isAuth) {
                        res.json({ message: 'Oops Password not updated' });
                    }
                })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in reseting password"
            });
        }
    },

    async resetpassword_usingmail(req, res, next) {
        const reqData = req.body;

        Driver.findOne({
            where: { email: reqData.email }
        }).then(isDriver => {
            if (isDriver) {
                // send email

                var drivermail = req.body.email;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'Testermail018@gmail.com',
                        pass: 'kih76'
                    }
                });
                var mailOptions = {
                    from: ' ', // sender address
                    to: drivermail, // list of receivers
                    subject: 'Driver Password Verification Code', // Subject line
                    text: 'Hi', // plain text body
                    html: 'Hi Driver<br>Please verify your email using the link below <b style="font-size:24px;margin-left:30px"> Your code - ' + (isDriver.id) * 109786 + '<b>' // html body

                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            driver: isDriver,
                            verificationCode: (isUser.id) * 109786
                        });
                    }
                });
            } else {
                res.json({ message: "Email does not exit" });
            }
        }).catch(err => {
            console.log(err);
            res.json("Some Error Occured!");
        });
    }

};