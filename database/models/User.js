'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Un usuario tiene un rol
      User.belongsTo(models.Rol, { foreignKey: 'roleId', as: 'role' });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'firstName' // Mapea con la columna de la base de datos
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'lastName' // Mapea con la columna de la base de datos
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isValidated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'isValidated' // Mapea con la columna de la base de datos
      },
      lock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'roleId' // Mapea con la columna de la base de datos
      }
    },
    {
      sequelize,
      modelName: 'User',
      underscored: false
    }
  );
  return User;
};
