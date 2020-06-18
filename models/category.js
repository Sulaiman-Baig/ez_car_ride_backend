module.exports = (sequelize, type) => {
    return sequelize.define("category", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      name: type.STRING,
     
    });
  };
  