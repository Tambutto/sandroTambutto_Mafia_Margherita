'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'clasicas',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'especiales',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'complementos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'bebidas',
        created_at: new Date(),
        updated_at: new Date()
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
