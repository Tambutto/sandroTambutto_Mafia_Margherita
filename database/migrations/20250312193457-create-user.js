'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'first_name' // Este nombre debe coincidir con la columna de la base de datos
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(150),
        
      },
      token: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      isValidated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_validated',
      },
      
      lock: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'role_id',
        references: {
          model: {
            tableName: 'Roles',
          },
          key: 'id'
        },
         onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};