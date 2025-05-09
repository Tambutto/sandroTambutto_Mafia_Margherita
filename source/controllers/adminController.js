const { Product } = require('../database/models'); // Importa el modelo Product


let adminController = {
    show: async (req, res) => {
         try {
                    const products = await Product.findAll({
                        include : ['category', 'sizes', 'ingredients']
                    }); // obtiene todos los productos

                    if (!req.session.userLogin) {
                        return res.redirect("/login"); // Si no hay usuario, redirigir a login
                    }
                    
                    res.render('admin/admin', {
                        title: 'Pizzería', products,
                        user: req.session.userLogin // 🔹 Envía el usuario a la vista 
                        });
                    } catch (error) {
                        console.error('Error al listar productos:', error);
                        res.status(500).send('Error del servidor');
                    }
    },  
    
    // show2: (req, res) => {
    //     res.render('admin/productAdd', { title: 'Nuevos Productos' });
    // }
}

module.exports = adminController;