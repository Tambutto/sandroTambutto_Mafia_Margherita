const { body } = require('express-validator');
const { User } = require('../database/models');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('El campo no debe estar vacío').bail()
        .trim()
        .isLength({ min: 2 }).withMessage('El campo nombre debe contener al menos 2 caracteres'),

    body('lastName')
        .notEmpty().withMessage('El campo no debe estar vacío').bail()
        .trim()
        .isLength({ min: 2 }).withMessage('El campo apellido debe contener al menos 2 caracteres'),

    body('email')
        .notEmpty().withMessage('El campo email no debe estar vacío').bail()
        .isEmail().withMessage('Debe ser un formato de correo electrónico válido').bail()
        .custom(async (email) => {
            const usuario = await User.findOne({ where: { email } }); // Verificar en la base de datos
            if (usuario) {
                throw new Error('Las credenciales no son validas');
            }
            return true;
        }),

    body('password')
        .exists().withMessage('La contraseña es obligatoria').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
        .withMessage('La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)'),

     // Validación para la imagen
     body('image')
        .custom((value, { req }) => {
        // Verificar si la imagen fue subida
        if (!req.file) {
            throw new Error('Debe subir una imagen');
        }

        // Validar formato de la imagen
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new Error('Solo se permiten imágenes en formato JPG, JPEG, PNG o GIF');
        }

        return true; // Pasa la validación
    }),    

];
