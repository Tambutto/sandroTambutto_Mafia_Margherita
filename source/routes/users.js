var express = require('express');
var router = express.Router();
// var usersController = require('../controllers/usersController'); Esta es otra forma de traer los metodos sin destructuring


const { register, login, processRegister, processLogin, profile, logout, update } = require('../controllers/usersController');
const usersCheck = require('../middlewares/usersCheck');

// Users

// router.get('/register', usersController.register); Esta forma es sin destructurin

router.get('/register', register); // Con destructurin  Muestra el formulario de registro

router.post('/processRegister', processRegister) // adonde envia los datos el register, // Procesa el registro

router.get('/login', login); // Muestra el formulario de login

router.post('/processLogin', processLogin); // Procesa el login

router.get('/profile', usersCheck, profile); // Muestra el perfil del usuario

router.get('/logout',logout);  // Cierra sesión

// router.put('/update',update); // Actualiza el perfil del usuario


module.exports = router;
