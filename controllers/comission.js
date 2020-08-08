const http_status_codes = require('http-status-codes');
const {   
    Comission
} = require('../database/database');

module.exports = {

    async createComissionRate(req, res, next) {
        try {
            const {
                customerComissionRate
            } = req.body;  

            const comissions = await Comission.findAll();
            if (comissions.length === 0) {
                const comission = await Comission.create({
                    customerComissionRate: customerComissionRate
                });
                return res.status(http_status_codes.CREATED).json(comission);
            } else if (comissions.length > 0) {
                Comission.update({
                    customerComissionRate: customerComissionRate
                }, {
                    where: {
                        id: comissions[0].id
                    }
                });
                return res.status(http_status_codes.OK).json({
                    message: "Updated sussessfully", comissions
                })
            }               
            
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Comission"
            });
        }
    },

   

    async getComissionRate(req, res, next) {
        try {
            comissionId = req.params.id;
            const comission = await Comission.findOne({where: {id: comissionId }});
            return res.status(http_status_codes.OK).json(comission);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Comission"
            });
        }
    },

    async getAllComissionsRate(req, res, next) {
        try {            
            const comissions = await Comission.findAll();
            return res.status(http_status_codes.OK).json(comissions);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Comission"
            });
        }
    },


  
};