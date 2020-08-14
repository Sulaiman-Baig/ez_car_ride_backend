const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {    
    Customer
} = require('../database/database');
module.exports = {

    async createCustomer(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                address,
                city,
                country,
                phoneNo,
                cardName,
                cardNumber,
                csv,
                expirayYear,
                expirayMonth,
                email,
                password,

            } = req.body;
         

            Customer.findOne({
                where: {
                    email: email
                }
            }).then(isCustomerExist => {
                if (isCustomerExist) {
                    res.json({ message: "This Customer already exists" });
                } else {
                   
                    Customer.create({
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        city: city,
                        country: country,
                        phoneNo: phoneNo,
                        cardName: cardName,
                        cardNumber: cardNumber,
                        csv: csv,
                        expirayYear: expirayYear,
                        expirayMonth: expirayMonth,
                        password: hashedpassword.generate(password),
                        email: email,
                        isActive: false
                    });

                    return res.status(http_status_codes.CREATED).json({ message: "User created successfully" });
                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Customer"
            });
        }
    },

    signInCustomer(req, res, next) {
        Customer.findOne({
            where: {
                email: req.body.email
            }
        }).then(isCustomerExist => {
            if (isCustomerExist) {
                const verify_password = hashedpassword.verify(
                    req.body.password, isCustomerExist.password
                );
                if (verify_password) {
                    const token = jwt.sign({
                        email: req.body.email,
                        customerId: isCustomerExist.id
                    },
                        "very-long-string-for-secret", {
                        expiresIn: 3600
                    }
                    );

                    res.json({
                        message: "successfully login",
                        accessToken: token,
                        customer: isCustomerExist
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
            const customer = await Customer.findOne({ where: { id: req.params.id } });
            return res.status(http_status_codes.OK).json(customer);

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single user"
            })
        }
    },

    async isCustomerExistByEmail(req, res, next) {
        try {
            const {
                email
            } = req.body;

            const customer = await Customer.findOne({ where: { email: email } });
            if (customer) {
                return res.status(http_status_codes.OK).json({ message: 'Customer exists with this email', isExist: true });
            } else {
                return res.status(http_status_codes.OK).json({ message: 'Customer does not exist with this email', isExist: false });
            }
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in checking customer"
            })
        }
    },

    async getAll(req, res, next) {
        try {
            const customers = await Customer.findAll();
            return res.status(http_status_codes.OK).json(customers);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Customers"
            });
        }
    },

    async updateCustomer(req, res, next) {
        try {
            id = req.params.id;
            const {
                firstName,
                lastName,
                address,
                city,
                country,
                phoneNo
            } = req.body
            Customer.update({
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
            customerId = req.params.customerId;
            const {
                isActive
            } = req.body
            Customer.update({
                isActive: isActive
            }, {
                where: {
                    id: customerId
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

    async updateCustomerCardInfo(req, res, next) {
        try {
            id = req.params.id;
            const {
                cardName,
                cardNumber,
                csv,
                expirayYear,
                expirayMonth,
            } = req.body
            Customer.update({
                cardName: cardName,
                cardNumber: cardNumber,
                csv: csv,
                expirayYear: expirayYear,
                expirayMonth: expirayMonth
            }, {
                where: {
                    id: id
                }
            })
            .then((updatedCustomer) => {
                return res.status(http_status_codes.OK).json({
                    message: "Cart Info Updated sussessfully", customer: updatedCustomer
                })
            });
           
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
            Customer.update({
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

    async rating(req, res, next) {

        try {
            customerId = req.params.customerId;
            const customer = await Customer.findOne({ where: { id: req.params.customerId }, attributes: ['id', 'rating', 'rating_no'] });
            const {
                rating
            } = req.body;

            if (customer.rating_no === 0) {

                Customer.update({
                    rating: rating,
                    rating_no: 1
                }, {
                    where: {
                        id: customerId
                    }
                });
                return res.status(http_status_codes.OK).json({
                    message: "Rated Successfully"
                })

            } else if (customer.rating_no === 1) {

                Customer.update({
                    rating_no: (customer.rating_no + 1),
                    rating: (customer.rating + rating) / 2
                }, {
                    where: {
                        id: customerId
                    }
                });
                return res.status(http_status_codes.OK).json({
                    message: "Rated Successfully"
                })

            } else if (customer.rating_no > 1) {

                Customer.update({
                    rating_no: customer.rating_no + 1,
                    rating: ((customer.rating * customer.rating_no) + rating) / (customer.rating_no + 1)
                }, {
                    where: {
                        id: customerId
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

    async resetPassword(req, res, next) {
        try {
            const customerId = req.params.id;
            const oldpassword = req.body.oldpassword;
            const newpassword = req.body.newpassword;
            Customer.findOne({
                where: { id: customerId }
            })
                .then((isCustomer) => {
                    const isAuth = hashedpassword.verify(
                        oldpassword,
                        isCustomer.password
                    );
                    if (isAuth) {
                        // console.log(isAuth)
                        isCustomer.update({
                            password: hashedpassword.generate(newpassword)
                        })
                            .then(() => {
                                res.json({ message: 'Password updated successfully' });
                            })
                    } else if (!isAuth) {
                        res.json({ message: 'Oops Password not updated' });
                    }
                })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Approved"
            });
        }
    },

    async resetpassword_usingmail(req, res, next) {
        const reqData = req.body;
        Customer.findOne({
            where: { email: reqData.email }
        }).then(isCustomer => {
            if (isadmin) {
                // send email

                var customermail = req.body.email;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'Testermail018@gmail.com',
                        pass: 'gf87dgdf'
                    }
                });
                var mailOptions = {
                    from: ' ', // sender address
                    to: customermail, // list of receivers
                    subject: 'Admin Password Verification Code', // Subject line
                    text: 'Hi', // plain text body
                    html: 'Dear customer<br>Please verify your email using the link below. <b style="font-size:24px;margin-left:30px"> Your code - ' + (isCustomer.id) * 109786 + '<b>' // html body

                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            manager: isadmin,
                            verificationCode: (isCustomer.id) * 109786
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