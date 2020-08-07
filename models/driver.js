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
      frontImageURl: type.STRING,
      backImageURl: type.STRING,
      cardNumber: type.STRING,
      email: type.STRING,
      password: type.STRING,
      licencePlateFront: type.STRING,
      licencePlateBack: type.STRING,
      socialSecurityNumber: type.STRING,
      rating: type.DOUBLE,
      rating_no: type.DOUBLE,
      balance: type.INTEGER,
      isActive: type.BOOLEAN,
      isAvailable: type.BOOLEAN,
      isApproved: type.BOOLEAN,
      isPaymentRequested: type.BOOLEAN
 
     
    });
  };
  