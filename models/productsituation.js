'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSituation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductSituation.hasMany(models.Product, { foreignKey: 'productSituationId', as: 'products' });
    }
  }
  ProductSituation.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductSituation',
  });
  return ProductSituation;
};