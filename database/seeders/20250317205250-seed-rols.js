'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    await queryInterface.bulkInsert('Roles', [

      { tipo: 'Admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { tipo: 'User', 
        createdAt: new Date(), 
        updatedAt: new Date()
     }
    ]);
  } catch (error) {
    console.error('Seeder error:', error);
}
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles');
  }
  
};
