'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CartProducts', [
      {
        cartId: 1, // Relacionado con el carrito 1
        productId: 1, // Relacionado con el producto 1 (Pizza Margherita)
        quantity: 2, // Cantidad de productos
        price: 600, // Precio por unidad
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 1,
        productId: 2, // Producto 2 (Pizza Pepperoni)
        quantity: 1,
        price: 750,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 2, // Relacionado con el carrito 2
        productId: 3, // Producto 3 (Napoletana)
        quantity: 1,
        price: 700,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 2,
        productId: 4, // Producto 4 (Capricciosa)
        quantity: 2,
        price: 900,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 3, // Relacionado con el carrito 3
        productId: 5, // Producto 5 (Pugliese)
        quantity: 1,
        price: 900,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 3,
        productId: 6, // Producto 6 (Pizza Gorgonzola y Pera)
        quantity: 1,
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 4, // Relacionado con el carrito 4
        productId: 7, // Producto 7 (Pizza Vegetariana)
        quantity: 3,
        price: 700,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 4,
        productId: 8, // Producto 8 (Ensalada Tricolor)
        quantity: 1,
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 5, // Relacionado con el carrito 5
        productId: 9, // Producto 9 (Ensalada Mixta)
        quantity: 2,
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 5,
        productId: 10, // Producto 10 (Gaseosa)
        quantity: 1,
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CartProducts', null, {});
  }
};

