const Sequelize = require('sequelize');

// MODELS


const AdminModel = require("../models/admin");
const CustomerModel = require("../models/customer");
const DriverModel = require("../models/driver");


// SEQUELIZE CONNECTION

const sequelize = new Sequelize("ez_car_ride", "root", "root1234", {
    host: "localhost",
    dialect: "mysql",
    // operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// MODELS CREATIONS WITH SWQUELIZE

const Admin = AdminModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Driver = DriverModel(sequelize, Sequelize);




//  RELATIONS



//TO UPDATE SCHEMA

sequelize.sync({ alter: true }).then(() => {
    console.log(`Database & tables created!`);
});



// EXPORT MODELS

module.exports = {
    Admin,
    Customer,
    Driver  

}; 