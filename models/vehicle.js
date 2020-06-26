module.exports = (sequelize, type) => {
    return sequelize.define("vehicle", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      
      carName: type.STRING,
      carModel: type.STRING,
      carYear: type.STRING,
      carSize: type.STRING,
      carNumberPlate: type.STRING,     
    });
  };