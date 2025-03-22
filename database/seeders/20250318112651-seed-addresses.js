'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      {
        street: 'Main Street',
        number: 123,
        floor: 1,
        apartment: 'A',
        neighborhood: 'Downtown',
        state: 'California',
        postalCode: 90210,
        userId: 1, // Usuario 1
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        street: 'Maple Avenue',
        number: 456,
        floor: 2,
        apartment: 'B',
        neighborhood: 'Greenwood',
        state: 'Texas',
        postalCode: 73301,
        userId: 2, // Usuario 2
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        street: 'Elm Street',
        number: 789,
        floor: 3,
        apartment: 'C',
        neighborhood: 'Hill Valley',
        state: 'Nevada',
        postalCode: 89101,
        userId: 3, // Usuario 3
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        street: 'Oak Drive',
        number: 101,
        floor: 0,
        apartment: '-',
        neighborhood: 'Sunny Side',
        state: 'Florida',
        postalCode: 33101,
        userId: 4, // Usuario 4
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        street: 'Pine Road',
        number: 202,
        floor: 5,
        apartment: 'D',
        neighborhood: 'Old Town',
        state: 'New York',
        postalCode: 10001,
        userId: 5, // Usuario 5
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Elimina los registros insertados por este seeder
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};

