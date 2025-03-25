'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un rol tiene muchos usuarios y un usuario solo un rol
      Role.hasMany(models.User, {
        foreignKey: 'roleId', as: 'users' 
      })
    }
  }
  Role.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: false
  });
  return Role;
};