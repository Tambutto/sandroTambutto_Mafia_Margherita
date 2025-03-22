'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Producto pertenece a una Categoría
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });

      // Un Producto tiene muchas Imágenes
      Product.hasMany(models.ImageProducts, { foreignKey: 'product_id', as: 'images' });

      // Un Producto puede tener muchos Ingredientes a través de ProductIngredients
      Product.belongsToMany(models.Ingredient, { through: 'ProductIngredients', foreignKey: 'product_id', as: 'ingredients' });

      // Un Producto puede tener muchos Tamaños a través de ProductSizes
      Product.belongsToMany(models.Size, { through: 'ProductSizes', foreignKey: 'productId', as: 'sizes' });

      // Un Producto puede estar relacionado con muchos Carritos a través de CartProducts
      Product.belongsToMany(models.Cart, { through: 'CartProducts', foreignKey: 'productId', as: 'carts' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    underscored: true
  });
  return Product;
};