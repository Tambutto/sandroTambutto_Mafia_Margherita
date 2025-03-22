'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true
      },
      floor: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      apartment: {
        type: Sequelize.STRING(10),
        defaultValue: '-'
      },
      neighborhood: {
        type: Sequelize.STRING(60),
        defaultValue: '-'
      },
      state: {
        type: Sequelize.STRING(60),
        defaultValue: '-'
      },
      postalCode: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Addresses');
  }
};