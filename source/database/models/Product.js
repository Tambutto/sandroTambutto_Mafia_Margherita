'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Un Producto pertenece a una Categoría
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });

      // Un Producto tiene muchas Imágenes
      Product.hasMany(models.ImageProducts, { foreignKey: 'productId', as: 'images' });

      // Un Producto puede tener muchos Ingredientes a través de ProductIngredients
      Product.belongsToMany(models.Ingredient, { through: 'ProductIngredients', foreignKey: 'productId', as: 'ingredients' });

      // Un Producto puede tener muchos Tamaños a través de ProductSizes
      Product.belongsToMany(models.Size, { through: 'productsize', foreignKey: 'productId', otherKey: 'sizeId', as: 'sizes' });

      // Un Producto puede estar relacionado con muchos Carritos a través de CartProducts
      Product.belongsToMany(models.Cart, { through: 'CartProducts', foreignKey: 'productId', as: 'carts' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'categoryId' // Mapea la columna de snake_case a camelCase
    }
  }, {
    sequelize,
    modelName: 'Product',
    underscored: false
  });
  return Product;
};
