'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductIngredients', [
      // Pizza Margherita
      { productId: 1, ingredientId: 1, createdAt: new Date(), updatedAt: new Date() }, // Salsa de tomate
      { productId: 1, ingredientId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mozzarella de bufala
      { productId: 1, ingredientId: 3, createdAt: new Date(), updatedAt: new Date() }, // Albahaca
      { productId: 1, ingredientId: 4, createdAt: new Date(), updatedAt: new Date() }, // Aceite de oliva
      
      // Pizza Pepperoni
      { productId: 2, ingredientId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mozzarella de bufala
      { productId: 2, ingredientId: 1, createdAt: new Date(), updatedAt: new Date() }, // Salsa de tomate
      { productId: 2, ingredientId: 4, createdAt: new Date(), updatedAt: new Date() }, // Aceite de oliva
      { productId: 2, ingredientId: 6, createdAt: new Date(), updatedAt: new Date() }, // Oregano
      { productId: 2, ingredientId: 5, createdAt: new Date(), updatedAt: new Date() }, // Pepperoni
      
      // Napoletana
      { productId: 3, ingredientId: 7, createdAt: new Date(), updatedAt: new Date() }, // Tomates pelados
      { productId: 3, ingredientId: 3, createdAt: new Date(), updatedAt: new Date() }, // Albahaca
      { productId: 3, ingredientId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mozzarella
      { productId: 3, ingredientId: 4, createdAt: new Date(), updatedAt: new Date() }, // Aceite de oliva
      { productId: 3, ingredientId: 8, createdAt: new Date(), updatedAt: new Date() }, // Sal

      // Capricciosa
      { productId: 4, ingredientId: 1, createdAt: new Date(), updatedAt: new Date() }, // Tomate
      { productId: 4, ingredientId: 9, createdAt: new Date(), updatedAt: new Date() }, // Champiñones
      { productId: 4, ingredientId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mozzarella
      { productId: 4, ingredientId: 10, createdAt: new Date(), updatedAt: new Date() }, // Jamon
      { productId: 4, ingredientId: 11, createdAt: new Date(), updatedAt: new Date() }, // Alcachofas
      { productId: 4, ingredientId: 12, createdAt: new Date(), updatedAt: new Date() }, // Aceitunas

      // Pugliese
      { productId: 5, ingredientId: 1, createdAt: new Date(), updatedAt: new Date() }, // Tomate
      { productId: 5, ingredientId: 13, createdAt: new Date(), updatedAt: new Date() }, // Cebolla
      { productId: 5, ingredientId: 6, createdAt: new Date(), updatedAt: new Date() }, // Oregano
      { productId: 5, ingredientId: 12, createdAt: new Date(), updatedAt: new Date() }, // Aceitunas
      { productId: 5, ingredientId: 4, createdAt: new Date(), updatedAt: new Date() }, // Aceite de oliva
      { productId: 5, ingredientId: 8, createdAt: new Date(), updatedAt: new Date() }, // Sal

      // Pizza Gorgonzola y Pera
      { productId: 6, ingredientId: 14, createdAt: new Date(), updatedAt: new Date() }, // Queso gorgonzola
      { productId: 6, ingredientId: 15, createdAt: new Date(), updatedAt: new Date() }, // Pera
      { productId: 6, ingredientId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mozzarella

      // Pizza Vegetariana
      { productId: 7, ingredientId: 16, createdAt: new Date(), updatedAt: new Date() }, // Pimientos
      { productId: 7, ingredientId: 9, createdAt: new Date(), updatedAt: new Date() }, // Champiñones
      { productId: 7, ingredientId: 13, createdAt: new Date(), updatedAt: new Date() }, // Cebolla
      { productId: 7, ingredientId: 1, createdAt: new Date(), updatedAt: new Date() }, // Tomate
      { productId: 7, ingredientId: 2, createdAt: new Date(), updatedAt: new Date() }  // Mozzarella
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los registros insertados por este seeder
    await queryInterface.bulkDelete('ProductIngredients', null, {});
  }
};

