module.exports = (sequelize, type) => {
    return sequelize.define("car_size", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      size: type.STRING,
      price: type.STRING,     

     
    });
  };
  