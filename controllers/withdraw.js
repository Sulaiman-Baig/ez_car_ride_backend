const http_status_codes = require('http-status-codes');
const {
    Driver,
    Withdraw
} = require('../database/database');

module.exports = {

    async requestToWithdraw(req, res, next) {
        try {
            const {
                amount
            } = req.body;

            driverId = req.params.driverId;

            const driver = await Driver.findOne({ where: { id: driverId }, attributes: ['id', 'isPaymentRequested'] });

            if (driver.isPaymentRequested === true) {
                return res.status(http_status_codes.OK).json({
                    message: "You already requested, Please wait for funds clearance"
                });
            } else if (driver.isPaymentRequested === false) {

                const withdraw = await Withdraw.create({
                    amount: amount,
                    driverId: driverId,
                    isPaid: false
                });
                if (withdraw) {
                    driver.update({
                        isPaymentRequested: true
                    });
                }
                return res.status(http_status_codes.OK).json({ message: 'Withdraw Requested Successfully' });
            }
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Vehicle"
            });
        }
    },

    async getAllWithdrawRequests(req, res, next) {
        try {
            const withdraws = await Withdraw.findAll();
            return res.status(http_status_codes.OK).json(withdraws);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllWithdrawRequests"
            });
        }
    },

    async releaseFundsToWithdrawRequest(req, res, next) {
        try {
            withdrawId = req.params.id;
            const withdraw = await Withdraw.findOne({ where: { id: withdrawId }, attributes: ['id', 'driverId', 'amount'] });
            const driver = await Driver.findOne({ where: { id: withdraw.driverId }, include: { all: true } });
            let balanceToUpdate = driver.balance - withdraw.amount;
            Withdraw.update({
                isPaid: true
            }, {
                where: {
                    id: withdrawId
                }
            });

            driver.update({
                balance: balanceToUpdate,
                isPaymentRequested: false
            });

            return res.status(http_status_codes.OK).json({
                message: "Withdraw sussessfully",
                driver: driver
            })
        } catch (error) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "an error occured"
            })
        }
    },



};