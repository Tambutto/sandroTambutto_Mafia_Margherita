'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una relación entre CartProduct y Cart
      CartProduct.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });

      // Una relación entre CartProduct y Product
      CartProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  CartProduct.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartProduct',
    underscored: false
  });
  return CartProduct;
};