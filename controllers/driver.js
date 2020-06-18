const http_status_codes = require('http-status-codes');
const hashedpassword = require("password-hash");
// const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const op = sequelize.Op;
const jwt = require("jsonwebtoken");

const {
    User,
    Employee,
    Campus
} = require('../database/database');
module.exports = {

    async createUser(req, res, next) {
        try {
            const {
                employeeId,
                role,
                username,
                password,
                is_active
            } = req.body;
            console.log(req.body);

            const employee = await Employee.findOne({ where: { id: employeeId } });

            User.findOne({
                where: {
                    email: employee.personal_email
                }
            }).then(isuserexist => {
                if (isuserexist) {
                    res.json({ message: "This Employee already has been converted into User" });
                } else {
                    User.create({
                        role: role,
                        username: username,
                        email: employee.personal_email,
                        password: hashedpassword.generate(password),
                        is_active: is_active,
                        employeeId: employeeId
                    });
                    Employee.update({
                        isUser: true
                    }, {
                        where: {
                            id: employee.id
                        }
                    });
                    return res.status(http_status_codes.CREATED).json({ message: "User created successfully" });
                }
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating User"
            });
        }
    },

    userSignin(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }, include: { model: Employee, attributes: ['id', 'full_name', 'image'], include: { model: Campus, attributes: ['id'] } }
        }).then(isUserexist => {
            if (isUserexist) {
                const verify_password = hashedpassword.verify(
                    req.body.password, isUserexist.password
                );
                if (verify_password) {
                    const token = jwt.sign({
                        email: req.body.email,
                        userId: isUserexist.id
                    },
                        "very-long-string-for-secret", {
                        expiresIn: 3600
                    }
                    );

                    res.json({
                        message: "successfully login",
                        accessToken: token,
                        user: isUserexist
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
            const user = await User.findOne({ where: { id: req.params.id }, include: [{ all: true }] });
            return res.status(http_status_codes.OK).json(user);

        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error occured in fetching single user"
            })
        }
    },

    async getall(req, res, next) {
        try {
            const users = await User.findAll(
                {
                    where: { role: { [op.not]: 'owner' } },
                    include: { model: Employee }
                }
            );
            return res.status(http_status_codes.OK).json(users);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All User"
            });
        }
    },

    async getallByCampus(req, res, next) {
        try {
            const users = await User.findAll({
                include: {
                    model: Employee,
                    where: {
                        [op.and]: [
                            { designation: { [op.not]: 'owner' } },
                            { campusId: req.params.campusId }
                        ]
                    },
                }
            });
            return res.status(http_status_codes.OK).json(users);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All User"
            });
        }
    },

    async getAllUsersBadgesByCampus(req, res, next) {
        try {
            const users = await User.findAll({
                include: {
                    model: Employee,
                    where: {
                        [op.and]: [
                            { designation: { [op.not]: 'owner' } },
                            { campusId: req.params.campusId }
                        ]
                    },
                },
                attributes: ['id']
            });
            
            return res.status(http_status_codes.OK).json(users.length);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching  getAllUsersBadgesByCampus"
            });
        }
    },



    async updateuser(req, res, next) {
        try {
            id = req.params.id;
            const {
                role,
                username,
            } = req.body
            User.update({
                role: role,
                username: username
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

    async updatepassword(req, res, next) {
        try {
            id = req.params.id;
            const {
                pass
            } = req.body
            User.update({
                password: hashedpassword.generate(pass)
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

    async resetpassword(req, res, next) {
        try {
            const reqUserId = req.params.id;
            const oldpassword = req.body.oldpassword;
            const newpassword = req.body.newpassword;
            User.findOne({
                where: { id: reqUserId }
            })
                .then((fetchedUser) => {
                    const isAuth = hashedpassword.verify(
                        oldpassword,
                        fetchedUser.password
                    );
                    if (isAuth) {
                        console.log(isAuth)
                        fetchedUser.update({
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
                message: "Error Occurd in Fetching All Approved"
            });
        }
    },

    // async resetpassword_usingmail(req, res, next) {
    //     const reqData = req.body;
    //     console.log(reqData);

    //     User.findOne({
    //         where: { email: reqData.email }
    //     }).then(isadmin => {
    //         if (isadmin) {
    //             // send email

    //             var usermail = req.body.email;
    //             var transporter = nodemailer.createTransport({
    //                 service: 'gmail',
    //                 auth: {
    //                     user: 'Testermail018@gmail.com',
    //                     pass: 'imrankamboh'
    //                 }
    //             });
    //             var mailOptions = {
    //                 from: ' ', // sender address
    //                 to: usermail, // list of receivers
    //                 subject: 'Admin Password Verification Code', // Subject line
    //                 text: 'Hi', // plain text body
    //                 html: 'Hi Admin<br>Please verify your email using the link below and get started building apps today! <b style="font-size:24px;margin-left:30px"> Your code - ' + (isUser.id) * 109786 + '<b>' // html body

    //             };

    //             transporter.sendMail(mailOptions, function (error, info) {
    //                 if (error) {
    //                     console.log(error);
    //                 } else {
    //                     res.json({
    //                         manager: isadmin,
    //                         verificationCode: (isUser.id) * 109786
    //                     });

    //                 }
    //             });


    //         } else {
    //             res.json({ message: "Email does not exit" });
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         res.json("Some Error Occured!");
    //     });
    // }




};