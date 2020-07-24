const Sequelize = require('sequelize');

// MODELS


const AdminModel = require("../models/admin");
const BookingModel = require("../models/booking");
const CarSizeModel = require("../models/car-size");
const CustomerModel = require("../models/customer");
const DriverModel = require("../models/driver");
const VehicleModel = require("../models/vehicle");
const WithdrawModel = require("../models/withdraw");


// SEQUELIZE CONNECTION

// const sequelize = new Sequelize("ez_car_ride", "root", "root1234", {
    
const sequelize = new Sequelize("ez_car_ride", "root", "Akfh77ja", {
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
const Booking = BookingModel(sequelize, Sequelize);
const CarSize = CarSizeModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Driver = DriverModel(sequelize, Sequelize);
const Vehicle = VehicleModel(sequelize, Sequelize);
const Withdraw = WithdrawModel(sequelize, Sequelize);




//  RELATIONS

Vehicle.belongsTo(Driver);
Driver.hasMany(Vehicle);

Vehicle.belongsTo(CarSize);
CarSize.hasMany(Vehicle);

Withdraw.belongsTo(Driver);
Driver.hasMany(Withdraw);

Booking.belongsTo(Driver);
Driver.hasMany(Booking);

Booking.belongsTo(Customer);
Customer.hasMany(Booking);



//TO UPDATE SCHEMA

sequelize.sync({ alter: true }).then(() => {
    console.log(`Database & tables created!`);
});

// test changing



// EXPORT MODELS

module.exports = {
    Admin,
    Booking,
    CarSize,
    Customer,
    Driver,
    Vehicle,
    Withdraw
}; 