'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductIngredients', [
      // Pizza Margherita
      { product_id: 1, ingredient_id: 1, created_at: new Date(), updated_at: new Date() }, // Salsa de tomate
      { product_id: 1, ingredient_id: 2, created_at: new Date(), updated_at: new Date() }, // Mozzarella de bufala
      { product_id: 1, ingredient_id: 3, created_at: new Date(), updated_at: new Date() }, // Albahaca
      { product_id: 1, ingredient_id: 4, created_at: new Date(), updated_at: new Date() }, // Aceite de oliva

      // Pizza Pepperoni
      { product_id: 2, ingredient_id: 2, created_at: new Date(), updated_at: new Date() }, // Mozzarella de bufala
      { product_id: 2, ingredient_id: 1, created_at: new Date(), updated_at: new Date() }, // Salsa de tomate
      { product_id: 2, ingredient_id: 4, created_at: new Date(), updated_at: new Date() }, // Aceite de oliva
      { product_id: 2, ingredient_id: 6, created_at: new Date(), updated_at: new Date() }, // Oregano
      { product_id: 2, ingredient_id: 5, created_at: new Date(), updated_at: new Date() }, // Pepperoni
      
      // Napoletana
      { product_id: 3, ingredient_id: 7, created_at: new Date(), updated_at: new Date() }, // Tomates pelados
      { product_id: 3, ingredient_id: 3, created_at: new Date(), updated_at: new Date() }, // Albahaca
      { product_id: 3, ingredient_id: 2, created_at: new Date(), updated_at: new Date() }, // Mozzarella
      { product_id: 3, ingredient_id: 4, created_at: new Date(), updated_at: new Date() }, // Aceite de oliva
      { product_id: 3, ingredient_id: 8, created_at: new Date(), updated_at: new Date() }, // Sal

      // Capricciosa
      { product_id: 4, ingredient_id: 1, created_at: new Date(), updated_at: new Date() }, // Tomate
      { product_id: 4, ingredient_id: 9, created_at: new Date(), updated_at: new Date() }, // Champiñones
      { product_id: 4, ingredient_id: 2, created_at: new Date(), updated_at: new Date() }, // Mozzarella
      { product_id: 4, ingredient_id: 10, created_at: new Date(), updated_at: new Date() }, // Jamon
      { product_id: 4, ingredient_id: 11, created_at: new Date(), updated_at: new Date() }, // Alcachofas
      { product_id: 4, ingredient_id: 12, created_at: new Date(), updated_at: new Date() }, // Aceitunas

      // Pugliese
      { product_id: 5, ingredient_id: 1, created_at: new Date(), updated_at: new Date() }, // Tomate
      { product_id: 5, ingredient_id: 13, created_at: new Date(), updated_at: new Date() }, // Cebolla
      { product_id: 5, ingredient_id: 6, created_at: new Date(), updated_at: new Date() }, // Oregano
      { product_id: 5, ingredient_id: 12, created_at: new Date(), updated_at: new Date() }, // Aceitunas
      { product_id: 5, ingredient_id: 4, created_at: new Date(), updated_at: new Date() }, // Aceite de oliva
      { product_id: 5, ingredient_id: 8, created_at: new Date(), updated_at: new Date() }, // Sal

      // Pizza Gorgonzola y Pera
      { product_id: 6, ingredient_id: 14, created_at: new Date(), updated_at: new Date() }, // Queso gorgonzola
      { product_id: 6, ingredient_id: 15, created_at: new Date(), updated_at: new Date() }, // Pera
      { product_id: 6, ingredient_id: 2, created_at: new Date(), updated_at: new Date() }, // Mozzarella

      // Pizza Vegetariana
      { product_id: 7, ingredient_id: 16, created_at: new Date(), updated_at: new Date() }, // Pimientos
      { product_id: 7, ingredient_id: 9, created_at: new Date(), updated_at: new Date() }, // Champiñones
      { product_id: 7, ingredient_id: 13, created_at: new Date(), updated_at: new Date() }, // Cebolla
      { product_id: 7, ingredient_id: 1, created_at: new Date(), updated_at: new Date() }, // Tomate
      { product_id: 7, ingredient_id: 2, created_at: new Date(), updated_at: new Date() }  // Mozzarella
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los registros insertados por este seeder
    await queryInterface.bulkDelete('ProductIngredients', null, {});
  }
};

