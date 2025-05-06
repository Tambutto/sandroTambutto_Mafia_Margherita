

const { Category, Product } = require('../../database/models');

const categoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name'],
                include: [{
                    model: Product, // Asegúrate de que `Product` está correctamente importado
                     as: "products",
                    attributes: ['id'],
                    required: false
                }]
            });

            // Crear un objeto con el conteo de productos por categoría
            const countByCategory = categories.reduce((acc, category) => {
                acc[category.name] = category.products ? category.products.length : 0;
                return acc;
            }, {});

            return res.json({
                meta: { status: 200, total: categories.length },
                data: categories,
                countByCategory // Agregar conteo
            });

        } catch (error) {
            console.error("Error en API Categorías:", error.message);
            res.status(500).json({
                meta: { status: 500, message: "Error interno del servidor" }
            });
        }
    }
};


module.exports = categoriesController;