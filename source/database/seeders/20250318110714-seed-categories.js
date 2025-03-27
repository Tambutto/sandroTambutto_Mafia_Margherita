'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'clasicas',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name: 'especiales',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name: 'complementos',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name: 'bebidas',
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Eliminar todas las categorías insertadas por este seeder
    await queryInterface.bulkDelete('Categories', {
      name: ['clasicas', 'especiales', 'complementos', 'bebidas']
    });
  }
};
