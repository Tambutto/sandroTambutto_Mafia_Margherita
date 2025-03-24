'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ImageProducts', [
      {
        imageUrl: 'images/imagen-1739819876160.webp', // Imagen de Pizza Margherita
        productId: 1, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/pepperoniFoto.webp', // Imagen de Pizza Pepperoni
        productId: 2, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/napoletana.webp', // Imagen de Napoletana
        productId: 3, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/Capricciosa.webp', // Imagen de Capricciosa
        productId: 4, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/pugliesefoto.webp', // Imagen de Pugliese
        productId: 5, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/Gorgoypera.webp', // Imagen de Pizza Gorgonzola y Pera
        productId: 6, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/vegetarianafoto.webp', // Imagen de Pizza Vegetariana
        productId: 7, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/ensaladaTricolore.jpg', // Imagen de Ensalada Tricolor
        productId: 8, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/ensaladaMixta.webp', // Imagen de Ensalada Mixta
        productId: 9, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/imagen-1739824354773.jpg', // Imagen de Gaseosa
        productId: 10, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/cerveza.jpg', // Imagen de Cerveza Artesanal
        productId: 11, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'images/imagen-1739824264319.jpg', // Imagen de Agua
        productId: 12, // ID del producto correspondiente
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Revertir los datos insertados por este seeder
    await queryInterface.bulkDelete('ImageProducts', null, {});
  }
};

