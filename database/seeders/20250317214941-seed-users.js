'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Users', [

       { 
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan.perez@example.com",
        password: bcrypt.hashSync("123456", 10),
        image: "usuario1.jpg",
        token: null,
        is_validated: true,
        lock: false,
        role_id: 2, // Asociado con el rol "user"
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        first_name: "Ana",
        last_name: "Martínez",
        email: "ana.martinez@example.com",
        password: bcrypt.hashSync("123456", 10),
        image: "usuario2.jpg",
        token: null,
        is_validated: true,
        lock: false,
        role_id: 2, // Asociado con el rol "user"
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        first_name: "Sandro",
        last_name: "Tambutiyo",
        email: "sandrillo@mail.com",
        password: bcrypt.hashSync("123456", 10),
        image: "usuario3.jpg",
        token: null,
        is_validated: true,
        lock: false,
        role_id: 1,// Asociado con el rol "Admin
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        first_name: "ailen",
        last_name: "torres",
        email: "ailen@mail.com",
        password: bcrypt.hashSync("123456", 10),
        image: "usuario4.jpg",
        token: null,
        is_validated: true,
        lock: false,
        role_id: 2, // Asociado con el rol "user"
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        first_name: "emiliano",
        last_name: "martinez",
        email: "dibu@mail.com",
        password: bcrypt.hashSync("123456", 10),
        image: "image-1740497257095.webp",
        token: null,
        is_validated: true,
        lock: false,
        role_id: 2, // Asociado con el rol "user"
        createdAt: new Date(), 
        updatedAt: new Date()
      
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users');
    }
};
