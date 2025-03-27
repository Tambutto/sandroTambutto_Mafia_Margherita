'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Define la relación con la tabla `Products`
      ProductSize.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

      // Define la relación con la tabla `Sizes`
      ProductSize.belongsTo(models.Size, { foreignKey: 'sizeId', as: 'size' });
    }
  }
  ProductSize.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false, // No puede ser nulo
      field:'productId',
      validate: {
        isInt: true // Verifica que sea un número entero
      }
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false, // No puede ser nulo
      field:'sizeId',
      validate: {
        isInt: true // Debe ser un número entero
      }
    }
  }, {
    sequelize,
    modelName: 'ProductSize',
    underscored: false,
    tableName : 'ProductSize'
  });
  return ProductSize;
};