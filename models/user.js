'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Situation, { foreignKey: 'situationId', as: 'situation' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    // password é excluído do defaultScope — nunca retornado nas respostas da API
    password: DataTypes.STRING,
    recoverPassword: DataTypes.STRING,
    situationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      // Garante que password e recoverPassword NUNCA apareçam nas respostas
      attributes: { exclude: ['password', 'recoverPassword'] }
    },
    scopes: {
      // Use User.scope('withPassword') apenas internamente (ex: login, verificação)
      withPassword: {
        attributes: { include: ['password'] }
      }
    }
  });

  return User;
};