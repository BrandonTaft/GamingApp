'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Games.hasMany(models.Comments, {
        foreignKey: 'game_id',
        sourceKey: 'game_id'
      });
  }
}
  Games.init({
    game_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    dates: DataTypes.STRING,
    metacritic: DataTypes.STRING,
    platform: DataTypes.STRING,
    genre: DataTypes.STRING,
    tags: DataTypes.STRING,
    released: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};