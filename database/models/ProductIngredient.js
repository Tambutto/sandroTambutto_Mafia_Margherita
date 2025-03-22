'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Definir relación con el modelo Product
      ProductIngredient.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

      // Definir relación con el modelo Ingredient
      ProductIngredient.belongsTo(models.Ingredient, { foreignKey: 'ingredientId', as: 'ingredient' });
    }
  }
  ProductIngredient.init({
    product_id: { 
      type: DataTypes.INTEGER,
      field: 'product_id'
   }, // Nombre de la columna en la base de datos
    ingredient_id: { 
      type: DataTypes.INTEGER,
      field: 'product_id' // Nombre de la columna en la base de datos
    },
  }, {
    sequelize,
    modelName: 'ProductIngredient',
    underscored: true
  });
  return ProductIngredient;
};