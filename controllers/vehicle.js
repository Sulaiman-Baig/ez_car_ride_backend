const http_status_codes = require('http-status-codes');
const {   
    Vehicle
} = require('../database/database');

module.exports = {

    async createVehicle(req, res, next) {
        try {
            const {
                carName,
                carModel,
                carYear,
                carSize,
                carNumberPlate
            } = req.body;   
            driverId = req.params.driverId;        
            const vehicle = await Vehicle.create({
                carName: carName,
                carModel: carModel,
                carYear: carYear,
                carSize: carSize,
                carNumberPlate: carNumberPlate,
                driverId: driverId
            });
            return res.status(http_status_codes.CREATED).json(vehicle);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Vehicle"
            });
        }
    },

    async updateVehicle(req, res, next) {
        try {
            const {
                carName,
                carModel,
                carYear,
                carSize,
                carNumberPlate
            } = req.body;
            vehicleId = req.params.id;
            const vehicle = await Vehicle.update({
                carName: carName,
                carModel: carModel,
                carYear: carYear,
                carSize: carSize,
                carNumberPlate: carNumberPlate,
                driverId: driverId               
            }, {
                where: {
                    id: vehicleId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Vehicle Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Vehicle"
            });
        }
    },

    async getVehicle(req, res, next) {
        try {
            vehicleId = req.params.id;
            const vehicle = await Vehicle.findOne({where: {id: vehicleId }});
            return res.status(http_status_codes.OK).json(vehicle);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Vehicle"
            });
        }
    },

    async getAllVehicles(req, res, next) {
        try {            
            const vehicles = await Vehicle.findAll();
            return res.status(http_status_codes.OK).json(vehicles);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Vehicle"
            });
        }
    },


    async deleteVehicle(req, res, next) {
        try {    
            vehicleId = req.params.id;        
            const vehicle = await Vehicle.destroy({where: {id: vehicleId}});
            return res.status(http_status_codes.OK).json({message: 'Vehicle Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Vehicle"
            });
        }
    }
};