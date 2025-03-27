'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductSize', [
      // Relaciones para Pizza Margherita
      { productId: 1, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 1, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 1, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 1, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion

      // Relaciones para Pizza Pepperoni
      { productId: 2, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 2, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 2, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 2, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion

      // Relaciones para Napoletana
      { productId: 3, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 3, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 3, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 3, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion
      
      // Relaciones para Capricciosa
      { productId: 4, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 4, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 4, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 4, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion

      // Relaciones para Pugliese
      { productId: 5, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 5, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 5, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 5, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion

      // Relaciones para Pizza Gorgonzola y Pera
      { productId: 6, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 6, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 6, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 6, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion
      
      // Relaciones para Pizza Vegetariana
      { productId: 7, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 7, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 7, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica
      { productId: 7, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porcion

      // Relaciones para Ensalada Tricolor
      { productId: 8, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porción

      // Relaciones para Ensalada Mixta
      { productId: 9, sizeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Porción

      // Relaciones para Gaseosa
      { productId: 10, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 10, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 10, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica

      // Relaciones para Cerveza Artesanal
      { productId: 11, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 11, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 11, sizeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Chica

      // Relaciones para Agua
      { productId: 12, sizeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Grande
      { productId: 12, sizeId: 2, createdAt: new Date(), updatedAt: new Date() }, // Mediana
      { productId: 12, sizeId: 3, createdAt: new Date(), updatedAt: new Date() } // Chica
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductSize', null, {});
  }
};

