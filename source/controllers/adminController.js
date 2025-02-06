const products = require("../data/products");


let adminController = {
    show: (req, res) => {
        res.render('admin/admin',{ title: 'Pizzería', products });
    },  
    
    // show2: (req, res) => {
    //     res.render('admin/productAdd', { title: 'Nuevos Productos' });
    // }
}

module.exports = adminController;