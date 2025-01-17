const express = require('express');
const router = express.Router();
const productCartlControler = require('../controllers/productCartlController');

 

// Rutas

router.get ('/', productCartlControler.show);



module.exports = router;