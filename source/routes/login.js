const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

 

// Rutas

router.get ('/', loginController.show);



module.exports = router;