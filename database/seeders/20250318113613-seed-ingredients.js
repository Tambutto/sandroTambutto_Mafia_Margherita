'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ingredients', [
      { name: 'Salsa de tomate', 
        created_at: new Date(),
        updated_at: new Date() },
      { name: 'Mozzarella de bufala', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Albahaca', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Aceite de oliva',
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Pepperoni', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Oregano', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Tomates pelados', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Champiñones', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Jamon', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Alcachofas', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Aceitunas', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Cebolla', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Queso gorgonzola', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Pera', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Pimientos', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Rucula', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Lechuga', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Zanahoria', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Pepino', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Cola', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Lima limon', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Naranja', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Lupulo', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Cebada', 
        created_at: new Date(), 
        updated_at: new Date() },
      { name: 'Agua con poco gas', 
        created_at: new Date(), 
        updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Elimina todos los ingredientes insertados por este seeder
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};

