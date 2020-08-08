module.exports = (sequelize, type) => {
    return sequelize.define("comission", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },      
      customerComissionRate: type.STRING     
    });
  };
  