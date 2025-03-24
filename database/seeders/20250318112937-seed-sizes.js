'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', [
      {
        name: 'grande',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name: 'mediana',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name: 'chica',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name: 'porcion',
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};

