'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ImageProducts', [
      {
        image_url: 'images/imagen-1739819876160.webp', // Imagen de Pizza Margherita
        product_id: 1, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/pepperoniFoto.webp', // Imagen de Pizza Pepperoni
        product_id: 2, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/napoletana.webp', // Imagen de Napoletana
        product_id: 3, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/Capricciosa.webp', // Imagen de Capricciosa
        product_id: 4, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/pugliesefoto.webp', // Imagen de Pugliese
        product_id: 5, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/Gorgoypera.webp', // Imagen de Pizza Gorgonzola y Pera
        product_id: 6, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/vegetarianafoto.webp', // Imagen de Pizza Vegetariana
        product_id: 7, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/ensaladaTricolore.jpg', // Imagen de Ensalada Tricolor
        product_id: 8, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/ensaladaMixta.webp', // Imagen de Ensalada Mixta
        product_id: 9, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/imagen-1739824354773.jpg', // Imagen de Gaseosa
        product_id: 10, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/cerveza.jpg', // Imagen de Cerveza Artesanal
        product_id: 11, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'images/imagen-1739824264319.jpg', // Imagen de Agua
        product_id: 12, // ID del producto correspondiente
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Revertir los datos insertados por este seeder
    await queryInterface.bulkDelete('ImageProducts', null, {});
  }
};

