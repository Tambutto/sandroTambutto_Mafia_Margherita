var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

// Ruta para login

router.get('/login', usersController.showLogin);

// Ruta para registro

router.get('/register', usersController.showRegister);


module.exports = router;
