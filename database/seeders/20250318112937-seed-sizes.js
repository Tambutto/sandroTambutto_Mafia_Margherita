'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', [
      {
        name: 'grande',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'mediana',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'chica',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'porcion',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};

