'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: "Pizza Margherita",
        price: 600,
        description: "La pizza Margherita es una clásica pizza italiana con salsa de tomate, mozzarella y albahaca fresca. Los ingredientes representan los colores de la bandera italiana: rojo, blanco y verde. Simple, deliciosa y tradicional.",
        category_id: 1, // Clasica
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pizza Pepperoni",
        price: 750,
        description: "La pizza Pepperoni es un clásico de la cocina italiana-americana que combina una base de masa crujiente y esponjosa con sabores intensos y deliciosos. Está cubierta con una capa de salsa de tomate condimentada, queso mozzarella derretido y abundantes rodajas de pepperoni",
        category_id: 1, // Clasica
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Napoletana",
        price: 700,
        description: "La simplicidad de la pizza Napoletana resalta la calidad de sus ingredientes frescos y locales. Es un platillo que captura la esencia de la cocina napolitana: auténtico, sencillo y lleno.",
        category_id: 1, // Clasica
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Capricciosa",
        price: 900,
        description: "Algunos chefs incluyen huevo cocido, salame o alcaparras, dependiendo de la región y las preferencias. La Pizza Caprichosa es un reflejo de la creatividad culinaria italiana, ideal para quienes disfrutan de una explosión de sabor.",
        category_id: 2, // Especial
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pugliese",
        price: 900,
        description: "La Pizza Pugliese es una opción perfecta para quienes buscan una experiencia sencilla pero sabrosa, donde los ingredientes locales brillan por sí mismos.",
        category_id: 2, // Especial
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pizza Gorgonzola y Pera",
        price: 1000,
        description: "La Pizza de Gorgonzola y Pera es una mezcla armoniosa de texturas y sabores, ideal para ocasiones especiales o para disfrutar con una copa de vino blanco o prosecco. Su perfil único la convierte en una experiencia inolvidable.",
        category_id: 2, // Especial
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pizza Vegetariana",
        price: 700,
        description: "La Pizza Vegetariana combina lo mejor de los ingredientes naturales, ofreciendo una experiencia sabrosa y versátil que encanta tanto a vegetarianos como a amantes de la comida saludable.",
        category_id: 2, // Especial
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Ensalada Tricolor",
        price: 500,
        description: "Se elabora de manera armoniosa, destacando los colores de cada ingrediente, y se aliña justo antes de servir. La Ensalada Tricolor es una celebración de los sabores mediterráneos, perfecta para quienes disfrutan de platos saludables y estéticamente atractivos.",
        category_id: 3, // Complemento
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Ensalada Mixta",
        price: 450,
        description: "La Ensalada Mixta es un plato equilibrado, saludable y adaptable, ideal para quienes buscan una opción ligera pero llena de sabor. Su simplicidad y frescura la convierten en una opción popular.",
        category_id: 3, // Complemento
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Gaseosa",
        price: 500,
        description: "Bebida gasificada", 
        category_id: 4, // Bebida
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Cerveza Artesanal",
        price: 900,
        description:"Bebida gasificada", 
        category_id: 4, // Bebida
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Agua",
        price: 5555,
        description: "Bebida sin gas", 
        category_id: 4, // Bebida
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

