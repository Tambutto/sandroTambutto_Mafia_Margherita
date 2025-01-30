const express = require('express');
const router = express.Router();
const database = require('../data/pizzeria')

// Rutas

router.get ('/', function (req, res){
    return res.send(database.variedad)
});




module.exports = router;
