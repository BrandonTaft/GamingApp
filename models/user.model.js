module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
     password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
     profilePic: {
        type: Sequelize.STRING
      },
      isLoggedIn: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };