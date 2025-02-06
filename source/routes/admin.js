const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

 

// Rutas

router.get ('/', adminController.show);

// router.get('/producto/agregar', adminController.show2);



module.exports = router;