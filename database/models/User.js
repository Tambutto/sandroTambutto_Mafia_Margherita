'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Un usuario tiene un rol
      User.belongsTo(models.Rol, { foreignKey: 'role_id', as: 'role' });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name' // Mapea con la columna de la base de datos
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name' // Mapea con la columna de la base de datos
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
        field: 'is_validated' // Mapea con la columna de la base de datos
      },
      lock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'role_id' // Mapea con la columna de la base de datos
      }
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true
    }
  );
  return User;
};
