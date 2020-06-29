const http_status_codes = require('http-status-codes');
const {   
    CarSize
} = require('../database/database');

module.exports = {

    async createCarSize(req, res, next) {
        try {
            const {
                size,
                price
            } = req.body;           
            const carSize = await CarSize.create({
                size: size,
                price: price
            });
            return res.status(http_status_codes.CREATED).json(carSize);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating CarSize"
            });
        }
    },

    async updateCarSize(req, res, next) {
        try {
            const {
                size,
                price
            } = req.body;
            carSizeId = req.params.id;
            const carSize = await CarSize.update({
                size: size,
                price: price               
            }, {
                where: {
                    id: carSizeId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'CarSize Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating CarSize"
            });
        }
    },

    async getCarSize(req, res, next) {
        try {
            carSizeId = req.params.id;
            const carSize = await CarSize.findOne({where: {id: carSizeId }});
            return res.status(http_status_codes.OK).json(carSize);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching CarSize"
            });
        }
    },

    async getAllCarSizes(req, res, next) {
        try {            
            const carSize = await CarSize.findAll();
            return res.status(http_status_codes.OK).json(carSize);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All CarSize"
            });
        }
    },


    async deleteCarSize(req, res, next) {
        try {    
            carSizeId = req.params.id;        
            const carSize = await CarSize.destroy({where: {id: carSizeId}});
            return res.status(http_status_codes.OK).json({message: 'CarSize Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting CarSize"
            });
        }
    }
};