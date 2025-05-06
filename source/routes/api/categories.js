const express = require('express');
const router = express.Router();

//const Router = require('express').Router(); Esto es lo mismo que las dos lineas de arriba pero mas resumido.

const categoriesController = require('../../controllers/api/categoriesController');

router.get('/', categoriesController.getAllCategories); // Ruta para obtener todos los productos


module.exports = router;