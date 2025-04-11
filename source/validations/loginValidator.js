const { body } = require('express-validator');
const { User } = require('../database/models');

module.exports = [

    // validacion del input email
    // Se valida que el campo no esté vacio y que sea un email valido y que no exista en la base de datos
    body('email')
        .notEmpty().withMessage('El campo Email no debe estar vacio').bail()
        .isEmail().withMessage('Ingrese un formato de correo electronico válido').bail()
        .custom(async (email) => {
            const user = await User.findOne({ where: { email } }); // Busca el email en la base de datos
            if (!user) {
                throw new Error('El email no está registrado en nuestra base de datos');
            }
            return true; // Si existe, pasa la validación
        }),
    // Validacion del input password
    body('password')
        .notEmpty().withMessage('El campo Contraseña no debe estar vacío').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),    
]