var express = require('express');
var router = express.Router();
// var usersController = require('../controllers/usersController'); Esta es otra forma de traer los metodos sin destructuring

const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// module.exports = upload;



const { register, login, processRegister, processLogin, profile, logout, update } = require('../controllers/usersController');
const usersCheck = require('../middlewares/usersCheck');

// Users

// router.get('/register', usersController.register); Esta forma es sin destructurin

router.get('/register', register); // Con destructurin  Muestra el formulario de registro

router.post('/processRegister', upload.single('image'), processRegister) // adonde envia los datos el register, // Procesa el registro

router.get('/login', login); // Muestra el formulario de login

router.post('/processLogin', processLogin); // Procesa el login

router.get('/profile', usersCheck, profile); // Muestra el perfil del usuario

router.get('/logout',logout);  // Cierra sesión

// router.put('/update', upload.single('image'), update); // Actualiza el perfil del usuario


module.exports = router;
