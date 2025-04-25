var express = require('express');
var router = express.Router();
// var usersController = require('../controllers/usersController'); Esta es otra forma de traer los metodos sin destructuring

const multer = require('multer');
const path = require('path');

const registerValidator = require('../validations/registerValidator');
const { Sequelize } = require('../database/models');

// const loginValidator = require('../validations/loginValidator');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
        return cb(null, true); // Archivo válido
    }
    cb(new Error('Solo se permiten imágenes en formato JPG, JPEG, PNG o GIF')); // Archivo inválido
};


const upload = multer({ storage: storage, fileFilter: fileFilter }); // Configuración de multer para subir imágenes de perfil de usuario
 
module.exports = upload;



const { register, login, processRegister, processLogin, profile, logout, update, deleteUser, editForm} = require('../controllers/usersController');
const usersCheck = require('../middlewares/usersCheck');
const { UUIDV4 } = require('sequelize');
const loginValidator = require('../validations/loginValidator');

// Users

// router.get('/register', usersController.register); Esta forma es sin destructurin

router.get('/register', register); // Con destructurin  Muestra el formulario de registro

// Defino la expresión regular como una variable para utilizarla en la validacion de la contraseña, 
// la contraseña debe tener al menos una letra minuscula, una mayuscula, un numero y un caracter especial


router.post('/processRegister', upload.single('image'),  registerValidator, processRegister) // adonde envia los datos el register, // Procesa el registro

router.get('/login', login); // Muestra el formulario de login

router.post('/processLogin', loginValidator, processLogin); // Procesa el login

router.get('/profile/:id', usersCheck, profile); // Muestra el perfil del usuario

router.get('/logout',logout);  // Cierra sesión

// router.put('/update', upload.single('image'), update); // Actualiza el perfil del usuario

router.get('/updateDelete/:id', usersCheck, editForm); // Muestra el formulario
router.put('/update/:id', upload.single('image'), update); // Procesa la edición
router.delete('/delete/:id', deleteUser);

module.exports = router;
