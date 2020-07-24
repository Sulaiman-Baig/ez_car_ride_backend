module.exports = (sequelize, type) => {
    return sequelize.define("booking", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },      
      cost: type.INTEGER,
      pickup: type.STRING,     
      destination: type.STRING,     
    });
  };