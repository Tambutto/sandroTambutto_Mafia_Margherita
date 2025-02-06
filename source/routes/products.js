var express = require('express');
var router = express.Router();
// var productsController = require('../controllers/productsController');
const { lista, 
        createForm, 
        detail, 
        create, 
        editForm, 
        edit, 
        remove, 
        showCart, 
        show 
    } = require('../controllers/productsController');


// 1 Ruta para mostrar todos los productos

router.get('/lista', lista);

// 2 ruta para formulario de creacion de productos

router.get('/productAdd', createForm);

// 3 ruta para mostrar un producto por su id

router.get('/detail/:id', detail);

// 4 Formulario de POST Acción de creación (a donde se envía el formulario)

router.post('/productAdd', create);

// 5 Formulario de edición de productos(GET)

router.get('/productEdit/:id', editForm);

// 6 Acción de edición (a donde se envía el formulario - PUT o update):

router.put('/productEdit/:id', edit )

// 7 Acción de borrado (DELETE)

router.delete('/remove/:id', remove);



// Ruta para mostrar el carrito de compras

router.get('/productCartl', showCart);

// Ruta para mostrar el detalle de los productos

router.get ('/', show);

module.exports = router;

