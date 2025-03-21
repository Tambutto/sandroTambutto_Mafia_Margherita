'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un rol tiene muchos usuarios y un usuario solo un rol
      Rol.hasMany(models.User, {
        foreignKey: 'role_id', as: 'users' 
      })
    }
  }
  Rol.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    underscored: true
  });
  return Rol;
};