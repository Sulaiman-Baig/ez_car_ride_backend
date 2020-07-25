const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {
    Driver,
    Vehicle
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
                frontImageURl,
                backImageURl,
                cardNumber,
                email,
                lattitude,
                longitude,
                password,
                carName,
                carModel,
                carYear,
                carSize,
                carNumberPlate,
                carSizeId
            } = req.body;

            Driver.findOne({
                where: {
                    email: email
                }
            }).then(isDriverExist => {
                if (isDriverExist) {
                    res.json({ message: "This Driver already exists" });
                } else {

                    Driver.create({
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        city: city,
                        country: country,
                        phoneNo: phoneNo,
                        lattitude: lattitude,
                        longitude: longitude,
                        backImageURl: backImageURl,
                        frontImageURl: frontImageURl,
                        cardNumber: cardNumber,
                        password: hashedpassword.generate(password),
                        isActive: false,
                        isApproved: false,
                        isAvailable: false,
                        email: email,
                        isPaymentRequested: false,
                        balance: 0,
                        rating: 0,
                        rating_no: 0
                    })
                        .then((driver) => {
                            Vehicle.create({
                                carName: carName,
                                carModel: carModel,
                                carYear: carYear,
                                carSize: carSize,
                                carNumberPlate: carNumberPlate,
                                driverId: driver.id,
                                carSizeId: carSizeId
                            })
                                .then(() => {
                                    return res.status(http_status_codes.CREATED).json({ message: 'Driver is Created and his Car is registered Successfully' });

                                })
                        })
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
            },
            include: [{ model: Vehicle }]
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

    async getBalance(req, res, next) {
        try {
            const driver = await Driver.findOne({ where: { id: req.params.id }, attributes: ['id', 'balance', 'firstName'] });
            return res.status(http_status_codes.OK).json(driver);

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching balance"
            })
        }
    },

    async isDriverExistByEmail(req, res, next) {
        try {
            const {
                email
            } = req.body;

            const driver = await Driver.findOne({ where: { email: email } });
            if (driver) {
                return res.status(http_status_codes.OK).json({ message: 'Driver exists with this email', isExist: true });
            } else {
                return res.status(http_status_codes.OK).json({ message: 'Driver does not exist with this email', isExist: false });
            }
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

    async locupd(req, res, next) {
        const reqData = req.body;
        Driver.update({
            lattitude: reqData.latitude,
            longitude: reqData.longitude
        }, {
            where: {
                id: req.body.id
            }
        }).then(resp => {
            res.json('okoko')
        })
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

    async changeStatus(req, res, next) {
        try {
            driverId = req.params.driverId;
            const {
                isActive
            } = req.body
            Driver.update({
                isActive: isActive
            }, {
                where: {
                    id: driverId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Status Updated sussessfully"
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured"
            })
        }
    },

    async rating(req, res, next) {
        
        try {
            driverId = req.params.driverId;
            const driver = await Driver.findOne({ where: { id: req.params.driverId }, attributes: ['id', 'rating', 'rating_no'] });
            const {
                rating
            } = req.body;

            if (driver.rating_no === 0) {

                Driver.update({
                    rating: rating,
                    rating_no: 1
                }, {
                    where: {
                        id: driverId
                    }
                });
                return res.status(http_status_codes.OK).json({
                    message: "Rated Successfully"
                })

            } else if (driver.rating_no === 1) {

                Driver.update({
                    rating_no: (driver.rating_no + 1),
                    rating: driver.rating + rating
                }, {
                    where: {
                        id: driverId
                    }
                });
                return res.status(http_status_codes.OK).json({
                    message: "Rated Successfully"
                })

            } else if (driver.rating_no > 1) {
               
                Driver.update({
                    rating_no: driver.rating_no + 1,
                    rating: ((driver.rating * driver.rating_no) + rating) / (driver.rating_no + 1)
                }, {
                    where: {
                        id: driverId
                    }
                });
                return res.status(http_status_codes.OK).json({
                    message: "Rated Successfully"
                })
            }

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured"
            })
        }
    },

    async approveDriver(req, res, next) {
        try {
            driverId = req.params.driverId;

            Driver.update({
                isApproved: true
            }, {
                where: {
                    id: driverId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Approved sussessfully",
                approvalStatus: true
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in approveDriver"
            })
        }
    },

    async disApproveDriver(req, res, next) {
        try {
            driverId = req.params.driverId;

            Driver.update({
                isApproved: false
            }, {
                where: {
                    id: driverId
                }
            })
            return res.status(http_status_codes.OK).json({
                message: "Disapproved sussessfully",
                approvalStatus: false
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured in disApproveDriver"
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