'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Un Size puede estar asociado con muchos Products a través de la tabla intermedia ProductSizes
      Size.belongsToMany(models.Product, { through: 'productsize', foreignKey: 'sizeId', otherKey: 'productId', as: 'products' });
        }
  }
  Size.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100] // Ajusta la longitud máxima según sea necesario
      }
    }
  }, {
    sequelize,
    modelName: 'Size',
    underscored: false
  });
  return Size;
};