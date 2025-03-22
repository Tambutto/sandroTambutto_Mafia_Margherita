'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    await queryInterface.bulkInsert('Roles', [

      { tipo: 'Admin', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { tipo: 'User', 
        created_at: new Date(),
        updated_at: new Date()
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
