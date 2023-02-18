module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      name: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.TEXT
      },
      game: {
        type: DataTypes.STRING
      },
      gameId: {
        type: DataTypes.STRING
      }
    });
  
    return Comment;
  };