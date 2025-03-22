'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Una Imagen pertenece a un Producto
        ImageProducts.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      }
    }
    ImageProducts.init({
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'image_url' // Nombre exacto de la columna en la base de datos
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id' // Nombre exacto de la columna en la base de datos
      }
  }, {
    sequelize,
    modelName: 'ImageProducts',
    tableName: 'imageproducts', // Nombre exacto de la tabla en la base de datos
    underscored: true
  });
  return ImageProducts;
};