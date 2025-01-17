const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

 

// Rutas

router.get ('/', adminController.show);



module.exports = router;