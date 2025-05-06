const express = require('express');
const router = express.Router();

//const Router = require('express').Router(); Esto es lo mismo que las dos lineas de arriba pero mas resumido.

const productsController = require('../../controllers/api/productsController');

router.get('/', productsController.getAllProducts); // Ruta para obtener todos los productos
router.get('/detail/:id', productsController.detail); // Ruta para obtener el detalle de un producto por su ID


module.exports = router;