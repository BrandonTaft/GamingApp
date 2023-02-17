'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Comments.belongsTo(models.Games, {
          foreignKey: 'game_id',
          targetKey: 'game_id'
        });
    }
  }
  Comments.init({
    comment: DataTypes.TEXT,
    game: DataTypes.STRING,
    game_id: DataTypes.INTEGER,
    user: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};