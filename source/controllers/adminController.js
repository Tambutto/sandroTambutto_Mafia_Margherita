const pizzeria = require("../db/pizzeria");

let adminController = {
    show: (req, res) => {
        res.render('admin/admin',{ title: 'Pizzería', pizzeria });
    }   

}

module.exports = adminController;