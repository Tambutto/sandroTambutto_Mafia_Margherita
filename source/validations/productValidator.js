const { body } = require('express-validator');
// const { Products } = require('../database/models');
const { Size } = require('../database/models'); // Importa el modelo de la tabla `sizes`
const { Category } = require('../database/models'); // Importa el modelo de la tabla `categories`
const { Ingredient } = require('../database/models'); // Modelo de la tabla de ingredientes

module.exports = [
    // Validacion del campo name
    body('name')
      .notEmpty().withMessage('El campo no debe estar vacío').bail()
      .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres').bail(),

    body('description')
      .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres').bail(),
      
    body('image')  
      .custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debe subir una imagen');
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new Error('Solo se permiten imágenes en formato JPG, JPEG, PNG o GIF');
        }
        return true;
      }),
    
    // Validación de tamaños (sizes)
    body('sizes').custom(async (value) => {
      if (!value || !Array.isArray(value)) {
          throw new Error('Debe proporcionar al menos un tamaño válido');
      }

      // Validar que cada tamaño existe en la tabla `sizes`
      const sizePromises = value.map(async (sizeId) => {
          const sizeExists = await Size.findOne({ where: { id: sizeId } });
          if (!sizeExists) {
              throw new Error(`El tamaño con ID ${sizeId} no es válido`);
          }
      });

      await Promise.all(sizePromises); // Resolver todas las validaciones
      return true;
    }),
     // Validación de ingredientes (ingredients)
     body('ingredients').custom(async (value) => {
      if (!value || !Array.isArray(value)) {
          throw new Error('Debe proporcionar al menos un ingrediente válido');
      }

      // Validar que cada ingrediente exista en la tabla `ingredients`
      const ingredientPromises = value.map(async (ingredientId) => {
          const ingredientExists = await Ingredient.findOne({ where: { id: ingredientId } });
          if (!ingredientExists) {
              throw new Error(`El ingrediente con ID ${ingredientId} no es válido`);
          }
      });

      await Promise.all(ingredientPromises); // Resolver todas las validaciones
      return true;
  }),
  body('categoryId')
        .notEmpty().withMessage('Debe seleccionar una categoría').bail()
        .custom(async (value) => {
            const categoryExists = await Category.findOne({ where: { id: value } });
            if (!categoryExists) {
                throw new Error(`La categoría con ID ${value} no es válida`);
            }
            return true;
        }),
]

