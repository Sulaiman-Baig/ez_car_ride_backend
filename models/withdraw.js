module.exports = (sequelize, type) => {
    return sequelize.define("withdraw", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },      
      amount: type.INTEGER,
      isPaid: type.BOOLEAN     
    });
  };