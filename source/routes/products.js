var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController');

// Ruta para mostrar todos los productos

router.get('/', productsController.showDetail);

// // Ruta para mostrar un producto

// router.get('/detail', productsController.show);

// Ruta para mostrar el carrito de compras

router.get('/productCartl', productsController.showCart);

module.exports = router;

