'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una categoria pertenece a muchos productos
      Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });

    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false // Especifica que el campo no puede ser nulo
    }
  }, {
    sequelize,
    modelName: 'Category',
    underscored: true
  });
  return Category;
};