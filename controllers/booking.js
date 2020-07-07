const http_status_codes = require('http-status-codes');
const sequelize = require("sequelize");
const op = sequelize.Op;
const {
    Driver,
    Vehicle
} = require('../database/database');

module.exports = {


    async findDrivers(req, res, next) {
        try {

            const {
                carSizeId,
                city

            } = req.body;
            const drivers = await Driver.findAll({
                
                where: {
                    [op.and]:
                        [
                            { city: city },
                            { isAvailable: true }
                        ]
                },
                include: [
                    {
                        model: Vehicle,
                        where: { carSizeId: carSizeId}
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(drivers);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in finding drivers"
            });
        }
    }
};