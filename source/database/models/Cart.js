'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Un carrito pertenece a un usuario
        Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

        // Un carrito puede contener muchos productos a través de CartProducts
        Cart.belongsToMany(models.Product, { through: 'CartProducts', foreignKey: 'cartId', as: 'products' });
    }
  }
  Cart.init({
    status: DataTypes.ENUM('activo', 'comprado', 'cancelado'),
    totalPrice: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    underscored: false
  });
  return Cart;
};