
const { Product } = require('../../database/models'); // Importamos el modelo de productos desde la base de datos



const productsController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll({
                attributes: ["id", "name", "description"],
                include:[
                    { association: "category", attributes: ["name"] }, // Incluir la relación con Categoría
                    {association: "ingredients"},
                    // Incluimos las asociaciones de categoría e ingredientes
                ],
                order: [['id', 'DESC']] // asegura que el ultimo producto aparezca primero 
            })
             // Obtenemos todos los productos de la base de datos

            if (products.length === 0) { // Verificamos si no hay productos}
                return res.status(404).json({
                    meta: {
                        status: 404,
                        message: 'No hay productos disponibles',
                    },
                });
            }
            // Si hay productos, los enviamos como respuesta
             return res.json ({
                meta: {
                    status:200,
                    total: products.length, // Contamos la cantidad de productos
                    
                },
                products: products.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: typeof product.category === "object" ? product.category.name : product.category || "Sin categoría",
                    detail: `/api/products/${product.id}` // URL para obtener detalles individuales
                })),
                data: products // Enviamos los productos como respuesta
            })
        }
        catch (error) {
            console.error("Error en getAllProducts", error); 
            res.status(500).json({ 
                meta: {
                    status: 500,
                    message: 'Error al obtener los productos',
                    error: error.message // Enviamos el mensaje de error
                }
            })
        }


    },

    detail: async (req, res) => {
        try {
            const id = req.params.id // Obtenemos el ID del producto desde los parametos de la solicitud 
            if (!id || isNaN(Number(id))) { // Verificamos si el ID es un número y existe
                return res.status(400).json({
                    meta: {
                        status: 400,
                        message: 'EL ID debe ser un número'
                    }
                })
            }
            if (id <= 0) {
                return res.status(400).json({
                    meta: {
                        status: 400,
                        message: 'El ID debe ser mayor a 0'
                    }
                })
            }

            const product = await Product.findByPk(id,{
                attributes: ["id", "name", "description"],
                include:[
                    { association: "category", attributes: ["name"] }, // Incluir la relación con Categoría
                {association: "images"}, // Incluimos las asociaciones de categoría e imágenes
                {association: "ingredients"},
                   
               ]} ) // Buscamos el producto por su ID
            if (!product) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        message: 'Producto no encontrado por id especificado',
                    }
                })
            }
             return res.json({
                meta: {
                    status: 200,
                    total: 1,
                },
                data: {
                    ...product.toJSON(), // Enviamos el producto como respuesta
                    ingredients: product.ingredients ? product.ingredients.map(i => i.name) : [], 
                    images: product.images ? product.images.map(i => i.url) : [],
                 } // Enviamos las imágenes como respuesta
            });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ 
                meta: {
                    status: 500,
                    message: 'Error interno del servidor'
                }
            })
        }
    

   
    }
    
}


module.exports = productsController;
// Este es el controlador de productos, que se encarga de manejar la logica de negocio relacionada con los productos.
