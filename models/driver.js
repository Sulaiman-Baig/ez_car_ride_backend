module.exports = (sequelize, type) => {
    return sequelize.define("driver", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      firstName: type.STRING,
      lastName: type.STRING,
      address: type.STRING,
      lattitude: type.STRING,
      longitude: type.STRING,
      city: type.STRING,
      country: type.STRING,
      phoneNo: type.STRING,
      imageURl: type.STRING,
      frontImageURl: type.STRING,
      backImageURl: type.STRING,
      cardName: type.STRING,
      cardNumber: type.STRING,
      csv: type.STRING,
      expirayDate: type.STRING,
      email: type.STRING,
      password: type.STRING,
      isActive: type.BOOLEAN,
      isApproved: type.BOOLEAN,
 
     
    });
  };
  