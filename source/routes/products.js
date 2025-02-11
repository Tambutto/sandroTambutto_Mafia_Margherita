var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path'); 
// var productsController = require('../controllers/productsController');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



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

router.get('/listaProductos', lista);

// 2 ruta para formulario de creacion de productos

router.get('/productAdd', createForm);

// 3 ruta para mostrar un producto por su id

router.get('/productCartl/:id', detail);

// 4 Formulario de POST Acción de creación (a donde se envía el formulario)

router.post('/productAdd',upload.single('imagen'), create);

// 5 Formulario de edición de productos(GET)

router.get('/productEdit/:id', editForm);

// 6 Acción de edición (a donde se envía el formulario - PUT o update):

router.put('/update/:id', edit )

// 7 Acción de borrado (DELETE)

router.delete('/remove/:id', remove);

// router.search('/search', search);



// Ruta para mostrar el carrito de compras

router.get('/productCartl', showCart);

// Ruta para mostrar el detalle de los productos

router.get ('/', show);

module.exports = router;

