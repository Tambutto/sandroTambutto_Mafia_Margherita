const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/usersController');

router.get('/', usersController.listUsers); // Obtiene la lista de usuarios
router.get('/:id', usersController.getUserDetail); // Obtiene un usuario por ID

module.exports = router;