'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Un Ingrediente puede estar en muchos Productos a través de ProductIngredients      
        Ingredient.belongsToMany(models.Product, { 
        through: 'ProductIngredients', 
        foreignKey: 'ingredientId', 
        as: 'products' 
      });
    }
  }
  Ingredient.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, // El campo es obligatorio
      validate: {
        notEmpty: true, // Asegura que no esté vacío
        len: [1, 100] // Longitud máxima de 100 caracteres
      }
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
    underscored: false
  });
  return Ingredient;
};