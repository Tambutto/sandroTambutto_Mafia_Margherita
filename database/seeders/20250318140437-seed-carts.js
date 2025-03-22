'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts', [
      {
        status: 'activo',
        totalPrice: 1500,
        userId: 1, // Usuario 1
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status: 'comprado',
        totalPrice: 3200,
        userId: 2, // Usuario 2
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status: 'cancelado',
        totalPrice: 0,
        userId: 3, // Usuario 3
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status: 'activo',
        totalPrice: 2500,
        userId: 4, // Usuario 4
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        status: 'comprado',
        totalPrice: 800,
        userId: 5, // Usuario 5
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
