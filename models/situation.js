'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Situation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Situation.hasMany(models.User, { foreignKey: 'situationId', as: 'users' });
    }
  }
  Situation.init({
    nameSituation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Situation',
  });
  return Situation;
};